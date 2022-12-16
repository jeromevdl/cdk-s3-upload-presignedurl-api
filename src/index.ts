import { Duration, CfnOutput } from 'aws-cdk-lib';
import { AccessLogFormat, AuthorizationType, Authorizer, CfnMethod, CognitoUserPoolsAuthorizer, EndpointType, LambdaIntegration, LogGroupLogDestination, MethodLoggingLevel, RestApi, RestApiProps } from 'aws-cdk-lib/aws-apigateway';
import { CfnUserPool, UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { Tracing } from 'aws-cdk-lib/aws-lambda';
// import { Tracing } from 'aws-cdk-lib/aws-lambda';
// import { NodejsFunction, Charset } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { IndexFunction } from './index-function';

export interface IS3UploadSignedUrlApiProps {
  /**
   * Optional bucket where files should be uploaded to. Should contains the CORS properties
   *
   * @default - Default Bucket is created
   */
  readonly existingBucketObj?: Bucket;

  /**
   * Optional Cognito User Pool to secure the API. You should have created a User Pool Client too.
   *
   * @default - Default User Pool (and User Pool Client) are created
   */
  readonly existingUserPoolObj?: UserPool;

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
  readonly apiGatewayProps?: RestApiProps | any;

  /**
   * Optional boolean to specify if the API is secured (with Cognito) or publicly open
   *
   * @default true
   */
  readonly secured?: boolean;

  /**
   * Optional log retention time for Lambda and API Gateway
   *
   * @default one week
   */
  readonly logRetention?: RetentionDays;
}

export class S3UploadPresignedUrlApi extends Construct {

  public readonly bucket: Bucket;
  public readonly restApi: RestApi;
  public readonly userPool?: UserPool | any = undefined;
  public readonly userPoolClient?: UserPoolClient | any = undefined;

  constructor(scope: Construct, id: string, props?: IS3UploadSignedUrlApiProps) {
    super(scope, id);

    const securedApi : boolean = props?.secured === undefined ? true : props.secured;

    if (!securedApi && props?.existingUserPoolObj) {
      throw new Error('You don\'t need to pass a User Pool if the API is not secured');
    }

    this.bucket = props?.existingBucketObj || new Bucket(this, 'uploadBucket', {
      cors: [
        {
          allowedMethods: [HttpMethods.HEAD, HttpMethods.GET, HttpMethods.PUT],
          allowedOrigins: props?.allowedOrigins || ['*'],
          allowedHeaders: ['Authorization', '*'],
        },
      ],
    });

    // Lambda function in charge of creating the PreSigned URL
    const getS3SignedUrlLambda = new IndexFunction(this, 'getS3SignedUrlLambda', {
      description: 'Function that creates a presigned URL to upload a file into S3',
      environment: {
        UPLOAD_BUCKET: this.bucket.bucketName,
        URL_EXPIRATION_SECONDS: (props?.expiration || 300).toString(),
        ALLOWED_ORIGIN: props?.allowedOrigins?.join(',') || '*',
      },
      tracing: Tracing.ACTIVE,
      logRetention: props?.logRetention || RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      memorySize: 256,
    });

    this.bucket.grantPut(getS3SignedUrlLambda);

    // Rest API
    const apiLogGroup = new LogGroup(this, 'S3SignedUrlApiLogGroup', {
      retention: props?.logRetention || RetentionDays.ONE_WEEK,
    });

    let apiProps: RestApiProps = props?.apiGatewayProps || {
      description: 'API that retrieves a presigned URL to upload a file into S3',
      endpointTypes: [EndpointType.REGIONAL],
      deployOptions: {
        accessLogDestination: new LogGroupLogDestination(apiLogGroup),
        accessLogFormat: AccessLogFormat.jsonWithStandardFields(),
        loggingLevel: MethodLoggingLevel.INFO,
        metricsEnabled: true,
        tracingEnabled: true,
        dataTraceEnabled: false,
        stageName: 'prod',
      },
      defaultMethodOptions: securedApi ? { authorizationType: AuthorizationType.COGNITO } : undefined,
    };

    this.restApi = new RestApi(this, 'S3SignedUrlApi', apiProps);

    // Adding security on the API if needed
    var apiGatewayAuthorizer: Authorizer | any = undefined;

    if (securedApi) {
      if (!props?.existingUserPoolObj) {
        this.userPool = new UserPool(this, 'CognitoUserPool');
        this.userPoolClient = new UserPoolClient(this, 'CognitoUserPoolClient', {
          userPool: this.userPool,
        });
        const cfnUserPool = this.userPool.node.findChild('Resource') as CfnUserPool;
        cfnUserPool.userPoolAddOns = {
          advancedSecurityMode: 'ENFORCED',
        };

        new CfnOutput(this, 'User Pool Id', { value: this.userPool.userPoolId });
        new CfnOutput(this, 'User Pool Client Id', { value: this.userPoolClient.userPoolClientId });
      } else {
        this.userPool = props.existingUserPoolObj;
      }

      apiGatewayAuthorizer = new CognitoUserPoolsAuthorizer(this, 'CognitoAuthorizer', {
        cognitoUserPools: [this.userPool],
        identitySource: 'method.request.header.Authorization',
      });
      apiGatewayAuthorizer._attachToApi(this.restApi);
    }

    // Adding GET method on the API
    this.restApi.root.addMethod('GET', new LambdaIntegration(getS3SignedUrlLambda), {
      requestParameters: {
        'method.request.querystring.contentType': true,
      },
      requestValidatorOptions: {
        requestValidatorName: 'validate-request-param',
        validateRequestBody: false,
        validateRequestParameters: true,
      },
    });

    // CORS configuration for the API
    this.restApi.root.addCorsPreflight({
      allowHeaders: ['Authorization', '*'],
      allowOrigins: props?.allowedOrigins || ['*'],
      allowMethods: ['OPTIONS', 'GET'],
      allowCredentials: true,
    });

    if (securedApi) {
      this.restApi.methods.forEach(method => {
        const cfnmethod = method.node.defaultChild as CfnMethod;
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