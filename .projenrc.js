const { awscdk } = require('projen');
const { ReleaseTrigger } = require('projen/lib/release');

const PROJECT_NAME = 'cdk-s3-upload-presignedurl-api';
const PYTHON_MODULE_NAME = 'cdk_s3_upload_presignedurl_api';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Jerome Van Der Linden',
  authorAddress: 'jeromevdl@gmail.com',
  cdkVersion: '2.54.0',
  defaultReleaseBranch: 'main',
  name: PROJECT_NAME,
  packageName: PROJECT_NAME,
  description: 'API to get an S3 presigned url for file uploads',
  keywords: ['aws', 'cdk', 's3', 'upload', 'presigned', 'api gateway'],
  repositoryUrl: `https://github.com/jeromevdl/${PROJECT_NAME}.git`,

  licensed: true,
  license: 'Apache-2.0',
  gitpod: true,
  docgen: true,
  docgenFilePath: 'API.md',
  dependabot: true,
  eslint: true,
  mergify: true,

  githubOptions: {
    pullRequestLint: false,
  },

  // Build Trigger
  buildWorkflow: true,
  buildWorkflowTriggers: { pullRequest: {}, push: {} },

  // Publish to Npm
  releaseToNpm: true,
  packageName: PROJECT_NAME,

  // Publish to Pypi
  publishToPypi: {
    distName: PROJECT_NAME,
    module: PYTHON_MODULE_NAME,
  },

  // Publish to Maven Central
  publishToMaven: {
    javaPackage: 'io.github.jeromevdl.awscdk.s3uploadpresignedurlapi',
    mavenGroupId: 'io.github.jeromevdl.awscdk',
    mavenArtifactId: 's3-upload-presignedurl-api',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },

  // Release Trigger
  release: true,
  releaseEveryCommit: false,
  releaseTrigger: ReleaseTrigger.manual,
  defaultReleaseBranch: 'main',
  releaseWorkflow: true,

  devDeps: [
    'ts-node',
    '@jest/globals',
    'esbuild',
  ],

  tsconfig: {
    compilerOptions: {
      lib: ['es2020', 'dom'],
    },
  },
});

project.gitpod.addDockerImage({
  image: 'jsii/superchain:1-buster-slim-node14',
});

project.gitpod.addCustomTask({
  name: 'ConfigAlias',
  command: 'echo \'alias pj="npx projen"\' >> ~/.bashrc && echo \'alias cdk="npx cdk"\' >> ~/.bashrc',
});

project.gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
  'ms-azuretools.vscode-docker',
  'AmazonWebServices.aws-toolkit-vscode',
);

const common_exclude = ['.DS_Store', 'cdk.out'];

project.npmignore.exclude(...common_exclude, 'front', 'images');
project.gitignore.exclude(...common_exclude);

project.synth();