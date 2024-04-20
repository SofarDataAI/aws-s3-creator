#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { Aspects } from 'aws-cdk-lib';
import { ApplyTags } from '../utils/apply-tag';
import { AwsSolutionsChecks } from 'cdk-nag';
import { checkEnvVariables } from '../utils/check-environment-variable';
import { AwsS3CreatorStack } from '../lib/aws-s3-creator-stack';
import { AwsS3CreatorStackProps } from '../lib/AwsS3CreatorStackProps';

dotenv.config(); // Load environment variables from .env file
const app = new cdk.App();
const appAspects = Aspects.of(app);

// check environment variables
checkEnvVariables('APP_NAME', 'OWNER', 'CDK_DEPLOY_REGION', 'ENVIRONMENT', 'S3_BUCKET_NAME');

const { CDK_DEFAULT_ACCOUNT: account, CDK_DEFAULT_REGION: region } = process.env;

const cdkRegion = process.env.CDK_DEPLOY_REGION!;
const deployEnvironment = process.env.ENVIRONMENT!;


const appName = process.env.APP_NAME!;
const owner = process.env.OWNER!;
const s3BucketName = process.env.S3_BUCKET_NAME!;

// apply tags to all resources
appAspects.add(new ApplyTags({
  environment: deployEnvironment as 'development' | 'staging' | 'production' | 'demonstration',
  project: appName,
  owner: owner,
}));

// security check
appAspects.add(new AwsSolutionsChecks());

const stackProps: AwsS3CreatorStackProps = {
  resourcePrefix: `${appName}-${deployEnvironment}`,
  env: {
    region: cdkRegion,
    account,
  },
  deployRegion: cdkRegion,
  deployEnvironment,
  appName,
  s3BucketName,
};
new AwsS3CreatorStack(app, `AwsS3CreatorStack`, {
  ...stackProps,
  stackName: `${appName}-${deployEnvironment}-${cdkRegion}-AwsS3CreatorStack`,
  description: `AwsS3CreatorStack for ${appName} in ${cdkRegion} ${deployEnvironment}.`,
});

app.synth();
