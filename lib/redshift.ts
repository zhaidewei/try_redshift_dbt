import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {Role,ServicePrincipal} from 'aws-cdk-lib/aws-iam';
import { Cluster, ClusterType, NodeType } from '@aws-cdk/aws-redshift-alpha'// https://constructs.dev/packages/@aws-cdk/aws-redshift-alpha/v/2.80.0-alpha.0/api/Cluster?lang=typescript

interface MyredshiftStackProps extends cdk.StackProps {
  vpc: ec2.Vpc,
}

export class MyredshiftStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MyredshiftStackProps) {
    super(scope, id, props);
    
    const redshiftRole = new Role(this, 'RedshiftRole', {
      assumedBy: new ServicePrincipal('redshift.amazonaws.com'),
      description: 'Role that allows Redshift to interact with other services',
    });
    const redshiftSecurityGroup = new ec2.SecurityGroup(this, 'RedshiftSecurityGroup', {
      vpc: props.vpc,
      description: 'Allow JDBC access to Redshift',
      allowAllOutbound: true,
    });

    redshiftSecurityGroup.addIngressRule(
      ec2.Peer.ipv4(props.vpc.vpcCidrBlock),
      ec2.Port.tcp(5439),
      'Allow JDBC access from VPC'
    );
    
    const cluster = new Cluster(this, 'RedshiftCluster', {
      masterUser: {
        masterUsername: 'redshiftadmin',
        masterPassword: cdk.SecretValue.unsafePlainText('Redshiftpwd123#'), // for demo purposes only
      },
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      classicResizing: false,
      clusterType: ClusterType.SINGLE_NODE, // for demo purposes only
      enhancedVpcRouting: true,
      nodeType: NodeType.RA3_XLPLUS, 
      preferredMaintenanceWindow: 'Sun:23:45-Mon:00:15',
      publiclyAccessible: false, // Will use EC2 in same VPC to access.
      removalPolicy: cdk.RemovalPolicy.DESTROY, // for demo purposes only
      roles: [redshiftRole],
      securityGroups: [redshiftSecurityGroup]
    });

    const ec2SecurityGroup = new ec2.SecurityGroup(this, 'EC2SecurityGroup', {
      vpc: props.vpc,
      description: 'Security group for EC2',
      allowAllOutbound: true,
    });

    ec2SecurityGroup.addIngressRule(
      ec2.Peer.securityGroupId(redshiftSecurityGroup.securityGroupId),
      ec2.Port.allTraffic(),
      'Allow all traffic from Redshift security group'
    );
    
    // Create an EC2 instance as DB client
    // https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.Instance.html
    const ec2Client = new ec2.Instance(this, 'RedshiftClient', {
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      instanceType: new ec2.InstanceType('t2.micro'), // Free tier eligible instance type
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2, // Using Amazon Linux 2
      }),
      keyName: 'my_keypair', // created manually.
      ssmSessionPermissions: true,
      securityGroup: ec2SecurityGroup,
    });

    new cdk.CfnOutput(this, 'ecInstanceId', {
      value: ec2Client.instanceId,
    });
  }
}
