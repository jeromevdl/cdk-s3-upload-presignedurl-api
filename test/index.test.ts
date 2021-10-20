import * as cdk from '@aws-cdk/core';
import { S3UploadSignedUrl } from '../src/index';
import '@aws-cdk/assert/jest';

test('create app', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new S3UploadSignedUrl(stack, 'TestStack');

  expect(stack).toHaveResource('AWS::Lambda::Function');
  expect(stack).toHaveResource('AWS::ApiGateway::RestApi');
  expect(stack).toHaveResource('AWS::S3::Bucket');
});
