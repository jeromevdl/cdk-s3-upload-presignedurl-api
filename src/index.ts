/**
 *  Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */
import * as api from '@aws-cdk/aws-apigateway';
import * as cognito from '@aws-cdk/aws-cognito';
import * as lambda from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs/lib/function';
import * as logs from '@aws-cdk/aws-logs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { CfnOutput } from '@aws-cdk/core';

export interface IS3UploadSignedUrlApiProps {
  /**
   * Optional bucket where files should be uploaded to.
   *
   * @default - Default Bucket is created
   */
  readonly existingBucketObj?: s3.Bucket;

  /**
   * Optional Cognito User Pool to secure the API. You should have created a User Pool Client too.
   *
   * @default - Default User Pool (and User Pool Client) are created
   */
  readonly existingUserPoolObj?: cognito.UserPool;

  /**
   * Optional CORS allowedOrigins.
   * Should allow your domain(s) as allowed origin to request the API
   *
   * @default ['*']
   */
  readonly allowedOrigins?: string[];

  /**
   * Optional expiration time in second. Time before the presigned url expires.
   *
   * @default 300
   */
  readonly expiration?: number;

  /**
   * Optional user provided props to override the default props for the API Gateway.
   *
   * @default - Default props are used
   */
  readonly apiGatewayProps?: api.RestApiProps | any;

  /**
   * Optional boolean to specify if the API is secured (with Cognito) or publicly open
   *
   * @default true
   */
  readonly secured?: boolean;
}


export class S3UploadSignedUrlApi extends cdk.Construct {

  public readonly restApi: api.RestApi;
  public readonly userPool?: cognito.UserPool | any = undefined;
  public readonly userPoolClient?: cognito.UserPoolClient | any = undefined;

  /**
   *
   */
  constructor(scope: cdk.Construct, id: string, props?: IS3UploadSignedUrlApiProps) {
    super(scope, id);

    const securedApi : boolean = props?.secured === undefined ? true : props.secured;

    if (!securedApi && props?.existingUserPoolObj) {
      throw new Error('You don\'t need to pass a User Pool if the API is not secured');
    }

    const bucket = props?.existingBucketObj || new s3.Bucket(this, 'uploadBucket');

    // Lambda function in charge of creating the PreSigned URL
    const getS3SignedUrlLambda = new NodejsFunction(this, 'getS3SignedUrlLambda', {
      entry: 'functions/getSignedUrl/index.js',
      description: 'Function that creates a presigned URL to upload a file into S3',
      environment: {
        UPLOAD_BUCKET: bucket.bucketName,
        URL_EXPIRATION_SECONDS: (props?.expiration || 300).toString(),
      },
      tracing: lambda.Tracing.ACTIVE,
      logRetention: logs.RetentionDays.ONE_WEEK,
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
    });

    bucket.grantPut(getS3SignedUrlLambda);

    // Rest API
    const apiLogGroup = new logs.LogGroup(this, 'S3SignedUrlApiLogGroup', {
      retention: logs.RetentionDays.ONE_WEEK,
    });

    let apiProps: api.RestApiProps = props?.apiGatewayProps || {
      description: 'API that retrieves a presigned URL to upload a file into S3',
      endpointTypes: [api.EndpointType.REGIONAL],
      deployOptions: {
        accessLogDestination: new api.LogGroupLogDestination(apiLogGroup),
        accessLogFormat: api.AccessLogFormat.jsonWithStandardFields(),
        loggingLevel: api.MethodLoggingLevel.INFO,
        metricsEnabled: true,
        tracingEnabled: true,
        dataTraceEnabled: false,
        stageName: 'prod',
      },
      defaultMethodOptions: securedApi ? { authorizationType: api.AuthorizationType.COGNITO } : undefined,
    };

    this.restApi = new api.RestApi(this, 'S3SignedUrlApi', apiProps);

    this.restApi.root.addCorsPreflight({
      allowHeaders: ['*'],
      allowOrigins: props?.allowedOrigins || api.Cors.ALL_ORIGINS,
      allowMethods: ['OPTIONS', 'GET'],
      allowCredentials: true,
    });

    // Adding security on the API if needed
    var apiGatewayAuthorizer: api.Authorizer | any = undefined;

    if (securedApi) {
      if (!props?.existingUserPoolObj) {
        this.userPool = new cognito.UserPool(this, 'CognitoUserPool');
        this.userPoolClient = new cognito.UserPoolClient(this, 'CognitoUserPoolClient', {
          userPool: this.userPool,
        });
        const cfnUserPool = this.userPool.node.findChild('Resource') as cognito.CfnUserPool;
        cfnUserPool.userPoolAddOns = {
          advancedSecurityMode: 'ENFORCED',
        };

        new CfnOutput(this, 'User Pool Id', { value: this.userPool.userPoolId });
        new CfnOutput(this, 'User Pool Client Id', { value: this.userPoolClient.userPoolClientId });
      } else {
        this.userPool = props.existingUserPoolObj;
      }

      apiGatewayAuthorizer = new api.CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
        cognitoUserPools: [this.userPool],
        identitySource: 'method.request.header.Authorization',
      });
      apiGatewayAuthorizer._attachToApi(this.restApi);
    }

    // Adding GET method on the API
    this.restApi.root.addMethod('GET', new api.LambdaIntegration(getS3SignedUrlLambda), {
      requestParameters: {
        'method.request.querystring.contentType': true,
      },
      requestValidatorOptions: {
        requestValidatorName: 'validate-request-param',
        validateRequestBody: false,
        validateRequestParameters: true,
      },
    });

    if (securedApi) {
      this.restApi.methods.forEach(method => {
        const cfnmethod = method.node.defaultChild as api.CfnMethod;
        if (method.httpMethod == 'OPTIONS') {
          cfnmethod.addPropertyOverride('AuthorizationType', 'NONE');
        } else {
          cfnmethod.addPropertyOverride('AuthorizationType', 'COGNITO_USER_POOLS');
          cfnmethod.addPropertyOverride('AuthorizerId', apiGatewayAuthorizer.authorizerId);
        }
      });
    }
  }
}