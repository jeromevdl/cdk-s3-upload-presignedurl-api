import { haveResource } from '@aws-cdk/assert/lib/assertions/have-resource';
import { expect } from '@aws-cdk/assert/lib/expect';
import * as cognito from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';
import { expect as expectjest } from '@jest/globals';
import { S3UploadSignedUrlApi } from '../src/index';

test('default config should create API / Lambda and User Pool', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new S3UploadSignedUrlApi(stack, 'TestStackDefault');

  expect(stack).to(haveResource('AWS::Lambda::Function'));
  expect(stack).to(haveResource('AWS::ApiGateway::RestApi'));
  expect(stack).to(haveResource('AWS::S3::Bucket'));
  expect(stack).to(haveResource('AWS::Cognito::UserPool'));
  expect(stack).to(haveResource('AWS::Cognito::UserPoolClient'));
});

test('open config should not create User Pool', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new S3UploadSignedUrlApi(stack, 'TestStackNotSecured', { secured: false });

  expect(stack).to(haveResource('AWS::Lambda::Function'));
  expect(stack).to(haveResource('AWS::ApiGateway::RestApi'));
  expect(stack).to(haveResource('AWS::S3::Bucket'));
  expect(stack).notTo(haveResource('AWS::Cognito::UserPool'));
  expect(stack).notTo(haveResource('AWS::Cognito::UserPoolClient'));
});

test('config with existing User Pool should not create new User Pool', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new S3UploadSignedUrlApi(stack, 'TestStackExistingUserPool', {
    existingUserPoolObj: new cognito.UserPool(stack, 'userpool'),
  });

  expect(stack).to(haveResource('AWS::Lambda::Function'));
  expect(stack).to(haveResource('AWS::ApiGateway::RestApi'));
  expect(stack).to(haveResource('AWS::S3::Bucket'));
  expect(stack).notTo(haveResource('AWS::Cognito::UserPool', { id: 'CognitoUserPool' }));
  expect(stack).notTo(haveResource('AWS::Cognito::UserPoolClient', { id: 'CognitoUserPoolClient' }));
});

test('config with existing User Pool and not secured should throw an error', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  expectjest(() => new S3UploadSignedUrlApi(stack, 'TestStackExistingUserPool', {
    existingUserPoolObj: new cognito.UserPool(stack, 'userpool'),
    secured: false,
  })).toThrowError();
});