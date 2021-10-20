import * as cdk from '@aws-cdk/core';
import { S3UploadSignedUrl } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new S3UploadSignedUrl(stack, 'S3UploadSignedUrl', {
  allowedOrigins: ['http://localhost:8080'],
});