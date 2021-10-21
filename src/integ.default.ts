import * as cdk from '@aws-cdk/core';
import { S3UploadPresignedUrlApi } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new S3UploadPresignedUrlApi(stack, 'S3UploadSignedUrl');