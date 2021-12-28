---
menu: AWS CDK
name: SQS Event Sourcing Using Lambda with the AWS CDK
---

# SQS Event Sourcing Using Lambda with the AWS CDK

```ts
import * as cdk from "@aws-cdk/core";
// import * as s3 from "@aws-cdk/aws-s3";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sqs from "@aws-cdk/aws-sqs";
import { SqsEventSource } from "@aws-cdk/aws-lambda-event-sources";

const inlineCode = `exports.main = async function (event, context) {
  for (const record of event.Records) {
    console.log(JSON.parse(record.body))
  }
};`;

// RUNNING FN { Records:
//   >    [ { body: '{data: "hello!"}',
//   >        receiptHandle:
//   >         'nfiuxkhiskaeqprzuqupofuohnyfevhsgnzonsueisuxdvwgmaqrmcqysmubgyvfkenjqbtmfqmmcqpcokddmhjthlgmjcskprietsnzfbirixmdeaplfzmiysxjskxjqbfxvnzciuxifsmpdhzhqksorotypvxwacwsaxpgobmovhbrxpejnyoml',
//   >        md5OfBody: '66bcbedf1399ffbe5622958a0f2527a4',
//   >        eventSourceARN: 'arn:aws:sqs:us-east-1:000000000000:queue-dc64dcb7',
//   >        eventSource: 'aws:sqs',
//   >        awsRegion: 'us-east-1',
//   >        messageId: 'e322d104-a4a3-45c3-47ac-e1dca94436ed',
//   >        attributes: [Object],
//   >        messageAttributes: {},
//   >        md5OfMessageAttributes: null,
//   >        sqs: true } ] }

export class HelloSqsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new s3.Bucket(this, "MyFirstBucket", {
    //   versioned: true,
    // });

    const fn = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromInline(inlineCode),
      handler: "index.main",
    });

    const queue = new sqs.Queue(this, "MyQueue");

    fn.addEventSource(
      new SqsEventSource(queue, {
        batchSize: 1, // default
      })
    );
  }
}
```