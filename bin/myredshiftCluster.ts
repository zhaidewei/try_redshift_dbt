#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyredshiftStack } from '../lib/redshift';
import { MyVPCStack } from '../lib/vpc';
import { MyS3Stack } from '../lib/s3';

const app = new cdk.App();

const vpc = new MyVPCStack(app, 'MyVPCStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

new MyredshiftStack(app, 'MyRedshiftStack', {
  
  vpc: vpc.vpc,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  
});
