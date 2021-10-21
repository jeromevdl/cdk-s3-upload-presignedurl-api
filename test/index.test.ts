import { haveResource } from '@aws-cdk/assert/lib/assertions/have-resource';
import { expect } from '@aws-cdk/assert/lib/expect';
import * as cdk from '@aws-cdk/core';
import { S3UploadSignedUrlApi } from '../src/index';

test('default config', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new S3UploadSignedUrlApi(stack, 'TestStackDefault');

  expect(stack).to(haveResource('AWS::Lambda::Function'));
  expect(stack).to(haveResource('AWS::ApiGateway::RestApi'));
  expect(stack).to(haveResource('AWS::S3::Bucket'));
  expect(stack).to(haveResource('AWS::Cognito::UserPool'));
  expect(stack).to(haveResource('AWS::Cognito::UserPoolClient'));
});

test('open config', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new S3UploadSignedUrlApi(stack, 'TestStackNotSecured', { secured: false });

  expect(stack).to(haveResource('AWS::Lambda::Function'));
  expect(stack).to(haveResource('AWS::ApiGateway::RestApi'));
  expect(stack).to(haveResource('AWS::S3::Bucket'));
  expect(stack).notTo(haveResource('AWS::Cognito::UserPool'));
  expect(stack).notTo(haveResource('AWS::Cognito::UserPoolClient'));
});
