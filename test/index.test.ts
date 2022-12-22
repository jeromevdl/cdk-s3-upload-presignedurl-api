import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { UserPool } from 'aws-cdk-lib/aws-cognito';

import { Bucket } from 'aws-cdk-lib/aws-s3';
import { S3UploadPresignedUrlApi } from '../src';

test('default config should create API / Lambda and User Pool', () => {
  const app = new App();
  const stack = new Stack(app);
  new S3UploadPresignedUrlApi(stack, 'TestStackDefault');

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Description: 'Function that creates a presigned URL to upload a file into S3',
  });
  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Description: 'API that retrieves a presigned URL to upload a file into S3',
  });
  template.resourceCountIs('AWS::S3::Bucket', 2);
  template.resourceCountIs('AWS::Cognito::UserPool', 1);
  template.resourceCountIs('AWS::Cognito::UserPoolClient', 1);
});

test('open config should not create User Pool', () => {
  const app = new App();
  const stack = new Stack(app);
  new S3UploadPresignedUrlApi(stack, 'TestStackDefault', { secured: false });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::Cognito::UserPool', 0);
  template.resourceCountIs('AWS::Cognito::UserPoolClient', 0);
});

test('config with existing User Pool should not create new User Pool', () => {
  const app = new App();
  const stack = new Stack(app);
  new S3UploadPresignedUrlApi(stack, 'TestStackDefault', {
    existingUserPoolObj: new UserPool(stack, 'userpool'),
  });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::Cognito::UserPool', 1);
  template.resourceCountIs('AWS::Cognito::UserPoolClient', 0);
});

test('config with existing S3 Bucket should not create new Bucket', () => {
  const app = new App();
  const stack = new Stack(app);
  new S3UploadPresignedUrlApi(stack, 'TestStackDefault', {
    existingBucketObj: new Bucket(stack, 'bucket'),
    secured: false,
  });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1);
});
