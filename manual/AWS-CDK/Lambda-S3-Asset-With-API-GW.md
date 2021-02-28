---
menu: AWS CDK
name: Lambda S3 Asset + API Gateway with the AWS CDK
---

# Lambda S3 Asset + API Gateway with the AWS CDK

```ts
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as assets from "@aws-cdk/aws-s3-assets";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as path from "path";

export class HelloLambdaFromS3Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The following JavaScript example defines an directory
    // asset which is archived as a .zip file and uploaded to
    // S3 during deployment.
    // See https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html
    const myLambdaAsset = new assets.Asset(
      // @ts-ignore - this expects Construct not cdk.Construct :thinking:
      this,
      `HelloLambdaAssetsZip`,
      {
        path: path.join(__dirname, "../functions/hello-dynamo-zip"),
      }
    );

    const fn = new lambda.Function(this, `HelloLambdaAssetFn`, {
      code: lambda.Code.fromBucket(
        // @ts-ignore
        myLambdaAsset.bucket,
        myLambdaAsset.s3ObjectKey
      ),
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
    });

    // API Gateway
    const api = new apigw.RestApi(this, "myapi", {});
    const helloWorldLambdaIntegration = new apigw.LambdaIntegration(fn);
    const helloResource = api.root.addResource("hello");
    helloResource.addMethod("GET", helloWorldLambdaIntegration);

    // required for local dev
    new cdk.CfnOutput(this, "Endpoint", {
      value: `http://localhost:4566/restapis/${api.restApiId}/prod/_user_request_${helloResource.path}`,
    });
  }
}
```