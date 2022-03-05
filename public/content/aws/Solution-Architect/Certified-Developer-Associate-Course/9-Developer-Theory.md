# 9: Developer Theory

## What is CI/CD?

Continuous Integration, Continuous Deployment.

1. Best practice.
2. Makesmall changes and automate everything.

### An example workflow

1. Shared Code Repository with frequently merging or integrating code updates.
2. Automated build of the new code from a trigger.
3. Run automated tests to check the code locally before it is commited into the master code repository.

The deployment workflow.

1. Merged on successful build.
2. Prepared for deployment.
3. Merged either by manual decision or fully automated.

### Developer Tools

1. CodeCommit: Source and version control.
2. CodeBuild: Automated build tool.
3. CodeDeploy: Automated deployment to any instance.
4. CodePipeline: Manages the workflow. Integrates with all other tools.

## CodeCommit 101

- A central code repository. Like GitHub, GitLab.
- Enables collaboration.
- Version control.

In the demo:

- A new repo was created with a new file.
- A new branch was created.
- The file was updated, and the branch was merged.

## CodeDeploy 101

- Automated deployment service.
- Works with EC2 instances, on-prem and lambdas.

### Deployment Approaches

1. In-Place: The app is stopped on each instance and the new release is installed (also known as a rolling update).
2. Blue/Green: New instances are provisioned and the new release is installed on the new instances. Blue represents the active deployment, green is the new release.

Example deployment (assuming 3 instances behind ELB):

1. App is stopped on the first instance.
2. Instance will be out of service during the deployment so capacity is reduced.
3. You should configure your ELB to stop sending requests to the instance.
4. New instance is provisioned and added known as a "revision". This happens for each instance as one comes back online.

Rolling back has no quick fix - you will need to re-deploy the previous version which can be time consuming.

- With the blue/green, you stand up all the instances and re-point the ELB to all new instances at once.
- Blue is deregistered.
- Rollback is quick - just re-point the ELB to the blue group.
- Blue/green is more expensive. It is safer though.

### Configuring CodeDeploy with the AppSpec file

- Config file defins the params to be used during a CodeDeploy deployment.
- For EC2 and on-prem systems, YAML only.
- Lambda subpports YAML and JSON. File structure depends on whether you are deploying to Lambda or EC2.

The file stucture:

- `version` - The version of the config - currently only allowed `0.0`.
- `os` - OS version you are using e.g. linux, windows.
- `files` - location of any app files that need to be copied and where they should be copied to.
- `hooks` - lifecycle event hooks. Scripts that need to runs at specific times in a specific order. Examples are unzipping files, running tests, dealing with load balancer registrations.

The typical folder setup:

```s
appspec.yaml
/Scripts
/Config
/Source
```

> `appspec.yaml` MUST be at the root.

The three phases of the deployment:

1. De-register instances from a Load Balancer.
2. Nuts and bolts of app deployment.
3. De-register instances with the Load Balancer.

The run order for an in-place deployment:

1. `BeforeBlockTraffic` - tasks you want to run on instances before they are de-registered from a Load Balancer.
2. `BlockTraffic` - de-register instances from a Load Balancer.
3. `AfterBlockTraffic` - tasks you want to run on instances after they are de-registered from a Load Balancer.

Other lifecycle hooks for in-place:

- `ApplicationStop` - gracefully stop the app.
- `DownloadBundle` - CodeDeploy agent copies the app revision files to a temporary location.
- `BeforeInstall` - Pre-install scripts e.g. backing up current version, decrypting files.
- `Install` - Copy app revision files to final location.
- `AfterInstall` - Post-install scripts e.g. config, file permissions.
- `ApplicationStart` - Start any services that were stopped during `ApplicationStop`.
- `ValidateService` - run tests to vaildate the service.

Exam tips:

- Run order - lifecycle event hook order.
- In-place deployment: broadly those three phases noted above.
- Understand the logical flow.

## CodePipeline 101

Fully managed CI/CD service.

It orcehstrates build, test and deploy.

Code pipline integrates with those AWS services we mentioned before as well as third party applications.

Example workflow:

1. CodePipeline: Workflow is defined.
2. CodeCommit: Starts on new code appearance.
3. CodeBuild: builds and tests.
4. CodeDeploy: deploys.

## Elastic Container Service

Why for microservices:

- Highly scalable
- Fault tolerant
- Easy to maintain

### Fargate or EC2?

1. Cluster of VMs.
2. Fargate for Serverless. No need to worry about underlying instances.
3. EC2 for more control.

First thing you'll want to do, it create an Elastic Container Registry.

Cool services that use ECS:

- Amazon Sagemaker.
- Amazon Lex.
- amazon.com is running on ECS.

## Docker and Elastic Beanstalk

Elastic Beanstalk also supports the deployment of Docker Containers.

EB handles the capacity provisioning, load balancing, sclaing and app health monitoring.

- Using EB, you can deploy your Docker container to a single EC2 instance.
- You can also deploy multiple Docker instances to an EC2 cluster.
- To deploy a Docker app, just upload code bundle to Elastic Beanstalk.

## CloudFormation

1. Written in YAML or JSON template.
2. CF reads the template and makes the API calls on your behalf.
3. After creating the template, you upload it to CF using S3.
4. The resulting set of resources that CF builds from your template is called a "Stack".

Remember:

- The resources section is mandatory.
- The transform section is for referencing additional code (stored in S3) as well as allowing for code-reuse. Eg. Lambda coe or template snippests/resusable pieces of CloudFormation code.
- Mappings allow custom mappings like `Region : AMI`.
- Conditions: provision resources based on environment.
- Parameters: Input custom values.

## Serverless Application Model (SAM)

- CloudFromation for Serverless.
- Simplified syntax.
- Uses the SAM CLI to package and deploy code.

```s
$ sam package
$ sam deploy
```

## CloudFormation Nested Stacks

"Stacks that create other stacks". Enables re-use of CF code for common use cases. Basically a template within a template.

It falls under `Type: AWS::CloudFormation::Stack` with a `TemplateURL` parameter which points to S3.
