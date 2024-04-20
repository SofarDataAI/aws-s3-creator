# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

## Setup

Before you begin, make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

After installing Node.js, you need to install AWS CDK. You can do this using npm:

```bash
npm install -g aws-cdk
```

## Deployment

To deploy this project to AWS using the CDK CLI, follow these steps:

1. Configure your AWS credentials (if not already done):
   ```bash
   aws configure
   ```
2. Compile the TypeScript source to JavaScript:
   ```bash
   npm run build
   ```
3. Deploy the stack to your default AWS account/region:
   ```bash
   npx cdk deploy
   ```


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
