---
menu: DataDog
name: DataDog Basics
---

# DataDog Basics

> Warning: this is still a work in progres. Some of the current instructions around the CDK are currently left incomplete.

## Prerequistes

1. A DataDog account
2. Familiarity with the AWS CDK
3. LocalStack (optional)

Ensure you also have a Datadog client token. You can get them from [here](https://app.datadoghq.com/account/settings#api).

## Resources

1. [Data engineering roadmap](https://github.com/hasbrain/data-engineer-roadmap)
2. [AWS CDK DataDog integration](https://github.com/markusl/aws-cdk-datadog-ecs-integration)
3. [DataDog Learn]()

## Setting up the AWS CDK

```s
mkdir hello-datadog-fargate-stack
cd hello-datadog-fargate-stack
npx aws-cdk init sample-app --language=typescript
npm i --save-dev aws-cdk-datadog-ecs-integration dotenv
```

Update `lib/hello-datadog-fargate-stack.ts`:

```ts
import * as cdk from "@aws-cdk/core"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as ecs from "@aws-cdk/aws-ecs"
import * as iam from "@aws-cdk/aws-iam"
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2"
import "dotenv/config"

export class HelloDatadogFargateStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new ec2.Vpc(this, "MyVpc")

    // Application load balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, `alb`, {
      vpc,
      vpcSubnets: { subnets: vpc.publicSubnets },
      internetFacing: true,
    })

    // Target group to make resources containers dicoverable by the application load balencer
    const targetGroupHttp = new elbv2.ApplicationTargetGroup(
      this,
      "target-group",
      {
        port: 80,
        vpc,
        protocol: elbv2.ApplicationProtocol.HTTP,
        targetType: elbv2.TargetType.IP,
      }
    )

    // Health check for containers to check they were deployed correctly
    targetGroupHttp.configureHealthCheck({
      path: "/",
      protocol: elbv2.Protocol.HTTP,
    })

    // only allow HTTPS connections
    const listener = alb.addListener("alb-listener", {
      open: true,
      port: 80,
    })

    listener.addTargetGroups("alb-listener-target-group", {
      targetGroups: [targetGroupHttp],
    })

    // use a security group to provide a secure connection between the ALB and the containers
    const albSG = new ec2.SecurityGroup(this, "alb-SG", {
      vpc,
      allowAllOutbound: true,
    })

    albSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow http traffic"
    )

    alb.addSecurityGroup(albSG)

    // cluster to deploy resources to
    const cluster = new ecs.Cluster(this, "example-cluster", {
      clusterName: "example-cluster",
      vpc,
    })

    // the role assumed by the task and its containers
    const taskRole = new iam.Role(this, "task-role", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      roleName: "task-role",
      description: "Role that the api task definitions use to run the api code",
    })

    // A really basic task definition
    const taskDefinition = new ecs.TaskDefinition(this, "DataDogNodeJsTask", {
      family: "DataDogNodeJsTask",
      compatibility: ecs.Compatibility.FARGATE,
      cpu: "256",
      memoryMiB: "512",
      networkMode: ecs.NetworkMode.AWS_VPC,
      taskRole: taskRole,
    })

    taskDefinition.addContainer("NodejsContainer", {
      containerName: "web-app",
      image: ecs.ContainerImage.fromRegistry(
        "okeeffed/node-dd-tracing-example"
      ),
      memoryLimitMiB: 256,
      environment: {
        DD_AGENT_HOST: "datadog-agent",
        DD_TRACE_AGENT_PORT: "8126",
      },
      portMappings: [
        {
          containerPort: 80,
          hostPort: 80,
          protocol: ecs.Protocol.TCP,
        },
      ],
      dockerLabels: {
        "com.datadoghq.ad.instances": JSON.stringify([
          { host: "%%host%%", port: "<PORT_NUMBER>" },
        ]),
        "com.datadoghq.ad.check_names": JSON.stringify(["<CHECK_NAME>"]),
        "com.datadoghq.ad.init_configs": JSON.stringify([{}]),
      },
    })

    taskDefinition.addContainer("DataDogNodeJsTask", {
      containerName: "datadog-agent",
      image: ecs.ContainerImage.fromRegistry("datadog/agent:latest"),
      environment: {
        DD_API_KEY: process.env.DATADOG_CLIENT_TOKEN!,
        DD_APM_ENABLED: "true",
        ECS_FARGATE: "true",
        DD_SITE: "datadoghq.com",
        DD_APM_NON_LOCAL_TRAFFIC: "true",
      },
      memoryLimitMiB: 256,
      cpu: 10,
      portMappings: [
        {
          containerPort: 8126,
          hostPort: 8126,
          protocol: ecs.Protocol.TCP,
        },
      ],
    })

    // Security groups to allow connections from the application load balancer to the fargate containers
    const ecsSG = new ec2.SecurityGroup(this, "ecsSG", {
      vpc,
      allowAllOutbound: true,
    })

    ecsSG.connections.allowFrom(
      albSG,
      ec2.Port.allTcp(),
      "Application load balancer"
    )

    // The ECS Service used for deploying tasks
    const service = new ecs.FargateService(this, "service", {
      cluster,
      desiredCount: 1,
      taskDefinition,
      securityGroups: [ecsSG],
      assignPublicIp: true,
    })
    // add to a target group so make containers discoverable by the application load balancer
    service.attachToApplicationTargetGroup(targetGroupHttp)

    // new cdk.

    // BONUS: Autoscaling based on memory and CPU usage
    const scalableTaget = service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 5,
    })

    scalableTaget.scaleOnMemoryUtilization("ScaleUpMem", {
      targetUtilizationPercent: 75,
    })

    scalableTaget.scaleOnCpuUtilization("ScaleUpCPU", {
      targetUtilizationPercent: 75,
    })

    new cdk.CfnOutput(this, "LoadBalancerDNSName", {
      value: alb.loadBalancerDnsName,
    })
  }
}
```

To build and deploy:

```s
npm run cdk synth
npm run cdk deploy
```

On success, you should have a URL that you can run `curl -i <LOAD_BALANCER_ADDR>` and get back `Hello World`.

## Datadog Course

The course covers some key features:

1. The Datadog Agent
2. Integrations
3. Dashboards
4. Monitors
5. Application Performance Monitoring
6. Log Aggregation
7. Synthetics

## Introduction to using the Lab Environment

A lot of it is straight forward for showing the editor and terminal.

> Ensure you press the power button before refreshing if you need to.

## Installing the agent

Datadog connects data from the agent or from an integration.

We will look at installing the agent on Docker.

### Installing the agent on VM

The first example gets you to install the agent on a Ubuntu VM.

Once installed, we can run `datadog-agent status` to confirm the status.

We go through the process of displaying logs by updating the `datadog.yml` config file. After updating the config, we can run the following to confirm:

```s
$ systemctl restart datadog-agent
$ datadog-agent status
```

### Installing the agent on Docker
