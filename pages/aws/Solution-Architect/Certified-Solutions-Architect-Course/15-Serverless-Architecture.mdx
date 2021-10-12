# 15: Serverless Architecture

## Serverless Overview

We focus on the code and leave the management of the compute architecture to the cloud provider.

The benefits:

- Ease of use.
- Event-based - the resources are brought online in response to an event.
- Billing modal: pay-as-you-go in the most pure form.

Exam tips: go serverless. Favour moving away from unmanaged architecture like EC2. It is almost always better to select an answer that uses Lambda or containers rather than a traditional operating system.

## Computing with Lambda

Serverless compute that lets you run code without provisioning or managing the underlying servers. Like running code without computers.

Building a function:

1. Runtime: you'll need tp pick from the available runtimes or bring your own.
2. Permissions: if your Lambda function needs to make an AWS API call, you'll need to attach a role.
3. Networking: You can (optionally) define the VPC, subnet, and security groups your functions are a part of.
4. Resources: Defining the amount of available memory will allocate how much CPU and RAM your code gets.
5. Trigger: Define a trigger to kick start the function.

Exam notes:

- There is built-in logging and metrics with CloudWatch for Lambda funcs.
- The is a 15-minute runtime limit for lambda.
- Good to know common triggers.
- Lambda excels in running small and lightweight functions.
- Lambda plays a big role in the AWS ecosystem.
- Lambda can run inside or outside a VPC.

## Container Overview

Standard unit of software that packages up code and all its dependencies so the app runs quickly and reliably from one computing environment to another.

Some terminology:

- Dockerfile: text document that contains all the instructions to build a container image.
- Image: Immutable file that contains the code, libs, deps and config files needed to run an app.
- Registry: Stores images for distribution. Can be private/public.
- Container: Running copy of the image that has been created.

## Running Containers in ECS or EKS

The problem with containers is that is it hard to manage at scale.

### Why ECS

- Managing many containers at scale requires a managed service.
- ELB integration registers containers as they come online and offline.
- Containers can have individual roles attached to them, making security a breeze.
- Ease of use: extremely easy to set up and scale to handle any workload.

### Kubernetes

- Open-source alternative to ECS.
- Not always the easiest platform to get running, hence why the managed service EKS.

### ECS vs EKS

ECS:

- Ease-of-use: proprietry platform.
- Cannot work on-prem.

EKS:

- Best used when you're not all in on AWS.
- More work to configure and integrate with AWS.

Exam tips:

- In general, you'll be looking for ECS. Prefer AWS services over third-party.
- If they ask for on-prem or open-source, think EKS.

## Removing Servers With Fargate

Problem with servers:

- Managing updates, patches, etc.
- Scaling

### What is Fargate?

A serverless compute engine for containers that works with both ECS and EKS.

- Requires ECS or EKS.
- Linux only.

### EC2 vs Fargate

EC2:

- EC2 pricing model can save dollars.
- Long-running containers.
- You are responsible for underlying operating system.
- Multiple containers share the same host.

Fargate:

- No OS access.
- Pay based on resources allocated and time ran. Great for ephemeral tasks.
- Isolated environments.

### Fargate vs Lambda

Fargate:

- Select when you have more consistent workloads.
- Allows Docker use accross the org and a greater level of control by devs.

Lambda:

- Great for unpredictable or inconsistent workloads.
- Perfect for apps that can be expressed as a single function.

Exam tips:

- Lambda is for lightweight functions that can run quickly and be integrating into our AWS architecture.
- Fargate is for container that I don't need to run all the time.
- EC2 for containers running all the time.
- Fargate requires ECS or EKS. It doesn't work by itself.
- Fargate is more expensive, but easier to use.

## Amazon EventBridge (CloudWatch Events)

A serverless event buss that allows you to pass events from a source to an endpoint.

It is the glue that holds serverless apps together.

### Creating a rule

1. Define pattern: how do you want the rule invoked?
2. Select Event Bus: Is this an AWS-based event? Custom? Partner?
3. Select the target: do you trigger a Lambda func? Post to an SQS queue? Send an email?

Exam tips:

- EventBridge is the glue for our serverless architectures.
- Speed is the fastest way to respond to things happening in your environment.
- Common use case is triggering lambda funcs.
- Is the app right for containers?
- Do you need those servers? If possible, use managed services.
- Is the app AWS specific?
- How long does the code need to run?
