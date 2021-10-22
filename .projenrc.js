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
  keywords: ['aws', 'cdk', 's3', 'upload'],
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
  // deps: [],
  devDeps: [
    'ts-node',
    '@jest/globals',
  ],
  // release: undefined,              /* Add release management to this project. */
  python: {
    distName: PROJECT_NAME,
    module: PROJECT_NAME,
  },
  publishToMaven: {
    javaPackage: 'com.github.jeromevdl.awscdk.s3uploadpresignedurlapi',
    mavenGroupId: 'com.github.jeromevdl.awscdk',
    mavenArtifactId: PROJECT_NAME,
  },
  tsconfig: {
    compilerOptions: {
      lib: ['es2019', 'dom'],
    },
  },
  dependabot: false,
  cdkDependenciesAsDeps: false,
});

const common_exclude = ['yarn.lock', '.DS_Store', 'cdk.out'];

project.npmignore.exclude(...common_exclude, 'front', 'images');
project.gitignore.exclude(...common_exclude);

project.synth();