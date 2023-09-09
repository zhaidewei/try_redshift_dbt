import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class MyVPCStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "myVPC", {
        subnetConfiguration: [
            {
                name: "isolated-subnet",
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                cidrMask: 22,
            },
        ],
        maxAzs: 2
    });
    // Need VPC endpoint because it is a private isolated subnet
    vpc.addGatewayEndpoint('S3Endpoint', {
      service: ec2.GatewayVpcEndpointAwsService.S3,
    });
  }
}
