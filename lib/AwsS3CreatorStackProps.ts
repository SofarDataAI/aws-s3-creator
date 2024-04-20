import { StackProps } from "aws-cdk-lib";

export interface AwsS3CreatorStackProps extends StackProps {
    /**
     * A prefix used for naming resources to ensure uniqueness across deployments.
     */
    readonly resourcePrefix: string;
    /**
     * The AWS region where resources will be deployed. Can be undefined for default region.
     */
    readonly deployRegion: string | undefined;
    /**
     * The deployment environment (e.g., dev, prod) for resource tagging and logical separation.
     */
    readonly deployEnvironment: string;
    /**
     * The name of the application, used for resource naming and tagging.
     */
    readonly appName: string;
    /**
     * The name of the S3 bucket to create.
     */
    readonly s3BucketName: string;
}
