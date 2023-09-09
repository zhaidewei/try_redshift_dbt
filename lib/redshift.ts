import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as redshift from '@aws-cdk/aws-redshift-alpha'// https://constructs.dev/packages/@aws-cdk/aws-redshift-alpha/v/2.80.0-alpha.0/api/Cluster?lang=typescript

interface MyredshiftStackProps extends cdk.StackProps {
  vpc: ec2.Vpc,
}

export class MyredshiftStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MyredshiftStackProps) {
    super(scope, id, props);
    
    const redshiftRole = new iam.Role(this, 'RedshiftRole', {
      assumedBy: new iam.ServicePrincipal('redshift.amazonaws.com'),
      description: 'Role that allows Redshift to interact with other services',
    });

    const cluster = new redshift.Cluster(this, 'RedshiftCluster', {
      masterUser: {
        masterUsername: 'redshiftadmin',
        masterPassword: cdk.SecretValue.unsafePlainText('Redshiftpwd123#'), // for demo purposes only
      },
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC, // use Network ACL to only allow my IP
      },
      classicResizing: false,
      clusterType: redshift.ClusterType.SINGLE_NODE, // for demo purposes only
      enhancedVpcRouting: true,
      nodeType: redshift.NodeType.RA3_XLPLUS, 
      preferredMaintenanceWindow: 'Sun:23:45-Mon:00:15',
      publiclyAccessible: true, // for demo purposes only
      removalPolicy: cdk.RemovalPolicy.DESTROY, // for demo purposes only
      roles: [redshiftRole],
    });
  }
}
