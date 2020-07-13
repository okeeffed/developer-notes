---
menu: AWS
name: Lambda Edge CDK
---

# Lambda Edge CDK

```ts
// Origin request handler.
const myOriginRequestHandler = new lambdaNodejs.NodejsFunction(
  this,
  'OriginRequestHandler',
  {
    entry: 'src/lambda/myOriginRequestHandler.ts',
    handler: 'myOriginRequestHandler',
    runtime: lambda.Runtime.NODEJS_10_X,
  },
);

// A numbered version to give to cloudfront
const myOriginRequestHandlerVersion = new lambda.Version(
  this,
  'OriginRequestHandlerVersion',
  {
    lambda: myOriginRequestHandler,
  },
);

// A bucket to serve content from
const myBucket = new s3.Bucket(this, 'OriginBucket');

// Origin access identity for cloudfront to access the bucket
const myCdnOai = new cloudfront.OriginAccessIdentity(this, 'CdnOai');
myBucket.grantRead(myCdnOai);

// The CDN web distribution
new cloudfront.CloudFrontWebDistribution(this, 'Cdn', {
  originConfigs: [
    {
      s3OriginSource: {
        s3BucketSource: myBucket,
        originAccessIdentity: myCdnOai,
      },
      behaviors: [
        {
          isDefaultBehavior: true,
          lambdaFunctionAssociations: [
            {
              eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
              lambdaFunction: myOriginRequestHandlerVersion,
            },
          ],
        },
      ],
    },
  ],
});
```

I believe you need to mix it in with this to get things going:

```ts
new cdk.CfnOutput(this, 'DistributionId', {
  value: distribution.distributionId,
});

// Route53 alias record for the CloudFront distribution
new route53.ARecord(this, 'SiteAliasRecord', {
  recordName: siteDomain,
  target: route53.RecordTarget.fromAlias(
    new targets.CloudFrontTarget(distribution),
  ),
  zone,
});
```

## Resources

1. [AWS Issue - Docs on Lambda@edge](https://github.com/aws/aws-cdk/issues/6259)
