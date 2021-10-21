const { AwsCdkConstructLibrary } = require('projen');

const PROJECT_NAME = 'cdk-s3-upload-presignedurl-api';

const project = new AwsCdkConstructLibrary({
  author: 'Jerome Van Der Linden',
  authorAddress: 'jeromevdl@gmail.com',
  cdkVersion: '1.125.0',
  cdkVersionPinning: true,
  defaultReleaseBranch: 'main',
  name: PROJECT_NAME,
  packageName: PROJECT_NAME,
  description: 'API to get an S3 presigned url for file uploads',
  repositoryUrl: `https://github.com/jeromevdl/${PROJECT_NAME}.git`,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-cognito',
  ],
  python: {
    distName: PROJECT_NAME,
    module: PROJECT_NAME,
  },
  publishToMaven: {
    javaPackage: 'com.github.jeromevdl.awscdk.s3uploadpresignedurlapi',
    mavenGroupId: 'com.github.jeromevdl.awscdk',
    mavenArtifactId: PROJECT_NAME,
  },
  // cdkTestDependencies: []],
  // deps: [],
  devDeps: [
    'ts-node',
    '@jest/globals',
  ],
  gitignore: [
    'yarn.lock',
    '.DS_Store',
    'cdk.out',
  ],
  // release: undefined,              /* Add release management to this project. */
  dependabot: false,
  cdkDependenciesAsDeps: false,
});
project.addPackageIgnore('.DS_Store');
project.addPackageIgnore('cdk.out');
project.addPackageIgnore('yarn.lock');
project.synth();