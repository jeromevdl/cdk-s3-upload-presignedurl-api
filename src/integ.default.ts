import * as cdk from '@aws-cdk/core';
import { S3UploadSignedUrlApi } from './index';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new S3UploadSignedUrlApi(stack, 'S3UploadSignedUrl');