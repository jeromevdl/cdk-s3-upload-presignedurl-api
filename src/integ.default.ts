import { App, Stack } from 'aws-cdk-lib';
import { S3UploadPresignedUrlApi } from './index';

const env = {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  };

const app = new App();
const stack = new Stack(app, 'TestS3UploadSignedUrl', { env });

new S3UploadPresignedUrlApi(stack, 'S3UploadSignedUrl');