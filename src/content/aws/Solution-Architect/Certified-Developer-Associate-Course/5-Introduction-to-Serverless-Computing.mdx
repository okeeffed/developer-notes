# 5: Introduction to Serverless Computing

## API Gateway

The analogy about APIs used was to think of a restaurant information where the role of a waiter is similar to an API.

### What is API Gateway?

1. Publish, Maintain and Monitor Secure APIs at scale.
2. A Front Door: access data, business logic, or functionality from backend services e.g. apps running on EC2, Lambda.
3. Supported API Types: RESTful APIs are optimized for stateless, sererless workloads.
4. Websocket APIs are for real-time, two-way, stateful comunication e.g. chat apps.

- Supports multiple endpoints and targets.
- Supports multiple versions.
- Serverless.
- Integrates with CloudWatch.
- Helps with throttling.

### RESTful APIs

- Representational State Transfer
- Optimized for serverless and web apps
- Stateless
- Supports JSON

## Lambda Versions

- When you create lambda func, there is only one version `$LATEST`.
- Subsequent uploads will become `$LATEST` version.
- You can create multiple versions of your function code and use aliases to reference the version you want to use as part of the ARN.
- In dev env, you might want to maintain a few versions of the same func as you develop and test your code.
- An `alias` is like a pointer to a specific version of the fn code.

## Concurrent Lambda

- Not necessary to memoize lots of limits.
- Be aware there is a concurrent limit per region.
- Safety feature to limit the number of concurrent executions across all functions in a given region per account.
- Default limit is 1k per region (`TooManyRequestException` - 429). You can increase it via request to AWS.
- `Reserved concurrency` guarantees a set number of executions which will always be available for your critical function, however this also acts as a limit.

## Lambda and VPC Access

- Examples: requiring read/write to RDS, shutting down a compromised EC2 instance.
- To enable this, you need to allow the fn to connect to the private subnet.
- Lambda needs the following VPC Config info so that it can connect to the VPC: Pricate subnet ID, SG ID (with required access). Lambda uses this info to set up ENIs using an available IP address from your private subnet.
- You could enable this for a Lambda func from the command line.

## Step Functions

A visual interface for serverless apps, which enable you to build and run serverless apps as a series of steps.

Each step in you app executes in order. Provider orchestration for serverless apps.

- The first example given is using different lambda functions as `tasks` within a `state machine`.
- The second example has an example of a parallel workflow that is co-ordinated.
- The third is a branching workflow that coordinates step functions.

## Understanding X-Ray

X-Ray is a tool which helps developers analyze and debug distributed applications.

It allows you to troubleshoot the root cause of perf issues and errors.

- The X-Ray Service Map shows a diagram of your architecture to help with troubleshooting.
- Can use with EC2, Elastic Container Service, Lambda, Elastic Beanstalk, SNS, SQS, DynamoDB, ELB and APIGW.
- Can also integrate it with web applications.
- API Calls: X-Ray SDK automatically captures metadata for API calls made to AWS services using the AWS SDK.

To get X-Ray working:

1. You'll need to install the X-Ray Agent (if on EC2).
2. Instrument application using X-Ray.
3. X-Ray SDK gathes info from req and res headers, the code in your app and metadata about AWS resources on which it runs and sends this trace data to X-Ray.

## X-Ray Demo

The demo deploys an example Java application to Elastic Beanstalk pre-configured to give a demonstrated of some XRay data.

The second demo is a more complex tic tac toe game. There is purposefully an error in the code to demonstrate the XRay data around permissions. The service map shows up with an amber indicator, and clicking through to view the trace allowed us to debug and see that we did not have the required permissions to send a message to an SNS topic.

## X-Ray Config

- AWS X-Ray SDK sends data to X-Ray daemon which buffers segments in a queue and uploads them to X-Ray in batches.
- You need both the X-Ray SDK and X-Ray daemon on your systems.
- You use the SDK to instrument (aka configure) your application to send the required data.
- Note: for ECS, ensure that the X-Ray daemon is installed in its own Docker container on your ECS cluster alongside your app.

### Annotations and Indexing

- Annotations: When instrumenting the app, you can record additional info about requests by using annotations.
- Key-value pairs: Annotations are simple key-value pairs that are indexed for use with filter expressions, so that yo ucan search for traces that contain specific data and group related traces together in the console.

## Advanced API Gateway

### Importing APIs into API Gateway

- Import API definitions with the supported protocols (OpenAPI).
- Create new and update existing.

### Legacy Protocols

Things you can do for SOAP.

1. You can configure API Gateway as a SOAP web service passthrough.
2. You can use API Gateway to transform the XML response to JSON.

## API Gateway Caching and Throttling

1. Caches you endpoint responses: reduces number of calls made to endpoint and can also import latecy for requests to API.
2. TTL: When you enable aching, API Gateway caches responses for a specified TTL.
3. API Gateway returns the Cached Response.

### API Throttling

- By default, API GW limits the steady-state req rate to 10k reqs/second, per Region.
- Concurrent requests maximum is 5k across all APIs, per region. Can increase this limit.
- If limit is reached, you'll get the 429 `TooManyRequests` response.

Remember: throttling default is 10k RPS and 5k concurrent requests.
