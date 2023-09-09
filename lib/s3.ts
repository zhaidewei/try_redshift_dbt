import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyS3Stack extends cdk.Stack {
  public readonly s3BucketName: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3bucket = new s3.Bucket(this, 'myDemoRedshiftBucketahskjfsahfk');
    this.s3BucketName = s3bucket.bucketName;
    new cdk.CfnOutput(this, 's3BucketName', { value: this.s3BucketName });
  }

}
