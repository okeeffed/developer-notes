---
menu: AWS
name: Adding Secrets Via CLI or CDK
---

# Adding Secrets Via CLI or CDK

## Resources

1. [Stack Overflow](https://stackoverflow.com/questions/52636929/specifying-a-custom-role-for-lambda-with-the-aws-cdk)

## Example

```ts
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda');
import cdk = require('@aws-cdk/core');
import assets = require('@aws-cdk/aws-s3-assets');
import iam = require('@aws-cdk/aws-iam');

require('dotenv').config();

type LambdaFn = { id: string; cron: string; relativeFunctionPath: string };
type LambdaCronStackProps = cdk.StackProps & {
  fns: Array<LambdaFn>;
};

/**
 * Update the LambdaAsset, functions path
 * and handler
 */
export class LambdaCronStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, props: LambdaCronStackProps) {
    super(app, id);

    for (const fn of props.fns) {
      // The following JavaScript example defines an directory
      // asset which is archived as a .zip file and uploaded to
      // S3 during deployment.
      // See https://docs.aws.amazon.com/cdk/api/latest/docs/aws-s3-assets-readme.html
      const myLambdaAsset = new assets.Asset(
        // @ts-ignore - this expects Construct not cdk.Construct :thinking:
        this,
        `${fn.id}CronJonBotAssetsZip`,
        {
          path: fn.relativeFunctionPath,
        },
      );

      const lambdaFn = new lambda.Function(this, `${fn.id}LambdaAssetFn`, {
        code: lambda.Code.fromBucket(
          // @ts-ignore
          myLambdaAsset.bucket,
          myLambdaAsset.s3ObjectKey,
        ),
        timeout: cdk.Duration.seconds(300),
        runtime: lambda.Runtime.NODEJS_12_X,
        handler: 'index.handler',
      });

      // Add policy for sending SES template
      lambdaFn.addToRolePolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['ses:SendTemplatedEmail'],
          resources: [
            'arn:aws:ses:us-east-1:178467697118:identity/hello@dennisokeeffe.com',
          ],
        }),
      );

      // Run every Sunday at 12:50PM UTC
      // See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
      const rule = new events.Rule(this, `${fn.id}Rule`, {
        schedule: events.Schedule.expression(fn.cron),
      });

      rule.addTarget(new targets.LambdaFunction(lambdaFn));
    }
  }
}
```
