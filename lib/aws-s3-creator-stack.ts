import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { AwsS3CreatorStackProps } from './AwsS3CreatorStackProps';

/**
 * Represents a CloudFormation stack that creates an S3 bucket with specific properties based on the deployment environment.
 * This stack is tailored for managing S3 buckets with features like encryption, versioning, and access controls.
 */
export class AwsS3CreatorStack extends cdk.Stack {
  /**
   * Constructs a new instance of the AwsS3CreatorStack.
   *
   * @param scope The parent construct.
   * @param id An identifier for the stack.
   * @param props Configuration properties for the stack, including resource prefixes, bucket names, and deployment environment.
   */
  constructor(scope: Construct, id: string, props: AwsS3CreatorStackProps) {
    super(scope, id, props);

    const removalPolicy = props.deployEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;
    const bucketName = `${props.resourcePrefix}-${props.s3BucketName}`;

    // define an S3 bucket
    const s3Bucket = new s3.Bucket(this, bucketName, {
      bucketName: bucketName,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: false,
      removalPolicy: removalPolicy,
      autoDeleteObjects: removalPolicy === cdk.RemovalPolicy.DESTROY,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      versioned: true, // Enable versioning
    });

    // export s3Bucket name
    new cdk.CfnOutput(this, `${props.appName}-${props.deployEnvironment}-s3BucketName`, {
      value: s3Bucket.bucketName,
      exportName: `${props.appName}-${props.deployEnvironment}-s3BucketName`,
      description: 'The name of the S3 bucket.',
    });
  }
}
