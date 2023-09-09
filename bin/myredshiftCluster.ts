#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyredshiftStack } from '../lib/redshift';
import { MyVPCStack } from '../lib/vpc';
import { MyS3Stack } from '../lib/s3';

const app = new cdk.App();

const defaultEnv = { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION };

const vpc = new MyVPCStack(app, 'MyVPCStack', {
  env: defaultEnv,
});

const supportBucket = new MyS3Stack(app, 'MyS3Stack', {
  env: defaultEnv,
});


new MyredshiftStack(app, 'MyRedshiftStack', {
  
  vpc: vpc.vpc,
  env: defaultEnv,
  s3BucketName: supportBucket.s3BucketName,
});

