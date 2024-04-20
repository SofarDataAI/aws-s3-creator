## 2024-04-20

### Added
- Updated the S3 bucket creation logic in the `AwsS3CreatorStack` class to support creating multiple S3 buckets based on the `S3_BUCKET_NAMES` environment variable.

### Changed
- Modified the `AwsS3CreatorStackProps` interface to use an array of bucket names instead of a single bucket name.
- Updated the example value for the `S3_BUCKET_NAMES` environment variable in the `.env.example` file.
- Updated the package version to `0.1.1` in both the `package-lock.json` and `package.json` files.