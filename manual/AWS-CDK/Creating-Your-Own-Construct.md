---
menu: AWS CDK
name: Creating Your Own Constructs with the AWS CDK
---

# Creating Your Own Constructs with the AWS CDK

```ts
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as assets from "@aws-cdk/aws-s3-assets";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as path from "path";

export interface HelloSimpleLambdaAPIFromS3Props {
  lambdaPath: string;
  lambdaHandler?: string;
}

export class HelloSimpleLambdaAPIFromS3 extends cdk.Construct {
  public readonly lambdaAsset: assets.Asset;
  public readonly lambdaFunction: lambda.Function;
  public readonly restApi: apigw.RestApi;
  public readonly lambdaIntegration: apigw.LambdaIntegration;

  constructor(
    scope: cdk.App,
    id: string,
    props: HelloSimpleLambdaAPIFromS3Props
  ) {
    super(scope, id);

    // The following JavaScript example defines an directory
    // asset which is archived as a .zip file and uploaded to
    // S3 during deployment.
    // See https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html
    this.lambdaAsset = new assets.Asset(
      // @ts-ignore - this expects Construct not cdk.Construct :thinking:
      this,
      `HelloLambdaS3Asset`,
      {
        path: props.lambdaPath,
      }
    );

    this.lambdaFunction = new lambda.Function(this, `HelloLambda`, {
      code: lambda.Code.fromBucket(
        this.lambdaAsset.bucket,
        this.lambdaAsset.s3ObjectKey
      ),
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: props.lambdaHandler ?? "index.handler",
    });

    // API Gateway
    this.restApi = new apigw.RestApi(this, `HelloLambdaRestApi`, {});
    const helloWorldLambdaIntegration = new apigw.LambdaIntegration(
      this.lambdaFunction
    );
    const helloResource = this.restApi.root.addResource("hello");
    helloResource.addMethod("GET", helloWorldLambdaIntegration);

    // required for local dev
    new cdk.CfnOutput(this, "Endpoint", {
      value: `http://localhost:4566/restapis/${this.restApi.restApiId}/prod/_user_request_${helloResource.path}`,
    });
  }
}
```

Being used in a parent stack:

```ts
import * as cdk from "@aws-cdk/core";
import { HelloSimpleLambdaAPIFromS3 } from "../common/hello-simple-lambda-api-from-s3";
import * as path from "path";

export class HelloLambdaService extends cdk.Stack {
  public readonly helloLambdaService: HelloSimpleLambdaAPIFromS3;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.helloLambdaService = new HelloSimpleLambdaAPIFromS3(
      // @ts-expect-error
      this,
      "HelloSimpleLambdaAPIFromS3",
      {
        lambdaPath: path.join(__dirname, "../../functions/hello-dynamo-zip"),
      }
    );
  }
}
```

Finally, in use with the app:

```ts
#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { HelloLambdaService } from "./../lib/helloLambdaService/hello-lambda-service";

const app = new cdk.App();
const appName = "HelloLambdaService";
const stage = app.node.tryGetContext("stage");
if (!stage) {
  throw new Error("--context stage=[stage] required");
}
const org = "Acme";

const lambdaStack = new HelloLambdaService(app, `${org}-${appName}-${stage}`);
cdk.Tags.of(lambdaStack).add("app", appName);
cdk.Tags.of(lambdaStack).add("stage", stage);

// example log from built construct
new cdk.CfnOutput(lambdaStack, "RestApiName", {
  value: lambdaStack.helloLambdaService.restApi.restApiName,
});
```