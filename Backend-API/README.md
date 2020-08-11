<!--
title: 'AWS Serverless GraphQL API with DynamoDB store example in Python'
description: 'This example demonstrates how to setup a GraphQL Endpoints allowing you to create, list, get, update and delete Todos. DynamoDB is used to store the data.'
framework: v1
platform: AWS-AppSync
language: Python3.8
-->
# Serverless GraphQL API Using AWS AppSync

This example demonstrates how to setup a [GraphQL Endpoints in AWS Appsync](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html) allowing you to create, list, get, update and delete Todos. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the todo operations. 
The idea behind the `todos` directory is that in case you want to create a service containing multiple resources e.g. users, notes, comments you could do so in the same service. While this is certainly possible you might consider creating a separate service for each resource. It depends on the use-case and your preference.

## Use-cases

- GraphQL Queries & Mutations for a Web Application
- GraphQL Queries & Mutations for a Mobile Application

## Setup

```bash
npm install -g serverless
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
AppSync Plugin: GraphQl schema valid
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service appsync.zip file to S3 (12.63 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.............
Serverless: Stack update finished...
Service Information
service: appsync
stage: dev
region: ap-south-1
stack: appsync-dev
resources: 17
api keys:
  None
appsync api keys:
  *****************************
endpoints:
  None
appsync endpoints:
  https://***************.appsync-api.ap-south-1.amazonaws.com/graphql
functions:
  graphql: appsync-dev-graphql
layers:
  None
Serverless: Removing old service artifacts from S3...

**************************************************************************************************************************************
Serverless: Announcing Metrics, CI/CD, Secrets and more built into Serverless Framework. Run "serverless login" to activate for free..
**************************************************************************************************************************************

```

## Scaling

### AWS AppSync

AWS AppSync simplifies application development by letting you create a flexible API to securely access, manipulate, and combine data from one or more data sources. AppSync is a managed service that uses GraphQL to make it easy for applications to get exactly the data they need. [link](https://aws.amazon.com/appsync/)

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```
