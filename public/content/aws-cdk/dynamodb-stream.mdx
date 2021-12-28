---
menu: AWS CDK
name: DynamoDB Streams with the AWS CDK
---

# DynamoDB Streams with the AWS CDK

```ts
import * as cdk from "@aws-cdk/core";
// import * as s3 from "@aws-cdk/aws-s3";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import { DynamoEventSource } from "@aws-cdk/aws-lambda-event-sources";

const awsLambdaOutput = `exports.handler = function(event, context, callback) {
    console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
    });
    callback(null, "message");
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

export class HelloDynamoDBStreamsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // new s3.Bucket(this, "MyFirstBucket", {
    //   versioned: true,
    // });

    const fn = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromInline(awsLambdaOutput),
      handler: "index.handler",
    });

    const table = new dynamodb.Table(this, "Table", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_IMAGE,
    });

    fn.addEventSource(
      new DynamoEventSource(table, {
        startingPosition: lambda.StartingPosition.LATEST,
      })
    );
  }
}
```