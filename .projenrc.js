const { AwsCdkConstructLibrary } = require('projen');

const PROJECT_NAME = 'cdk-s3-upload-signed-url';

const project = new AwsCdkConstructLibrary({
  author: 'Jerome Van Der Linden',
  authorAddress: 'jeromevdl@gmail.com',
  cdkVersion: '1.125.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  name: PROJECT_NAME,
  packageName: PROJECT_NAME,
  description: 'API to get an S3 presigned url for file uploads',
  repositoryUrl: 'https://github.com/jeromevdl/cdk-s3-upload-signed-url.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-cognito',
  ],
  // python: {
  //   distName: PROJECT_NAME,
  //   module: PROJECT_NAME,
  // },
  // publishToMaven: {
  //   javaPackage: 'com.github.jeromevdl.awscdk.s3uploadsignedurl',
  //   mavenGroupId: 'com.github.jeromevdl.awscdk',
  //   mavenArtifactId: PROJECT_NAME,
  // },
  // cdkTestDependencies: undefined,  /* AWS CDK modules required for testing. */
  deps: [

  ],
  devDeps: [
    'ts-node',
    '@jest/globals',
  ], /* Build dependencies for this module. */
  // release: undefined,              /* Add release management to this project. */
  dependabot: false,
  cdkDependenciesAsDeps: false,
});
project.synth();