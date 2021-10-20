import { RestApi, EndpointType, MethodLoggingLevel, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { Tracing } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs/lib/function';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { Bucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export interface IS3UploadSignedUrlProps {
  /**
   * Optional bucket where files should be uploaded to.
   * Must contains the CORS configuration (PUT method and your origin at least)
   *
   * @default - No bucket
   */
  readonly existingBucketObj?: Bucket;

  /**
   * Optional CORS allowedOrigins. 
   * Should allow your domain(s) as allowed origin to request the API
   *
   * @default ['*']
   */
  readonly allowedOrigins?: string[];

  /**
   * Optional expiration time in second. Time before the signed url expires.
   *
   * @default 300
   */
  readonly expiration?: number;
}

export class S3UploadSignedUrl extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props?: IS3UploadSignedUrlProps) {
    super(scope, id);

    var bucket = props?.existingBucketObj || new Bucket(this, 'uploadBucket');

    const getS3SignedUrlLambda = new NodejsFunction(this, 'getS3SignedUrl', {
      entry: 'functions/getSignedUrl/index.js',
      description: 'Function that creates a presigned URL to upload a file into S3',
      environment: {
        UPLOAD_BUCKET: bucket.bucketName,
        URL_EXPIRATION_SECONDS: (props?.expiration || 300).toString(),
      },
      tracing: Tracing.ACTIVE,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
    });

    bucket.grantPut(getS3SignedUrlLambda);

    let restapi = new RestApi(this, 'S3SignedUrlApi', {
      description: 'API that retrieves a presigned URL to upload a file into S3',
      endpointTypes: [EndpointType.REGIONAL],
      deployOptions: {
        metricsEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        tracingEnabled: true,
        stageName: 'prod',
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ['*'],
        allowOrigins: props?.allowedOrigins || ['*'],
        allowMethods: ['OPTIONS', 'GET'],
        allowCredentials: true,
      },
    });

    restapi.root.addMethod('GET', new LambdaIntegration(getS3SignedUrlLambda), {
      requestParameters: {
        'method.request.querystring.contentType': true,
      },
      requestValidatorOptions: {
        requestValidatorName: 'validate-request-param',
        validateRequestBody: false,
        validateRequestParameters: true,
      },
    });
  }
}