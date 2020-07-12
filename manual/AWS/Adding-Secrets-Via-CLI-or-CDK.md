---
menu: AWS
name: Adding Secrets Via CLI or CDK
---

# Adding Secrets Via CLI or CDK

## Resources

1. [AWS Tutorial](https://docs.aws.amazon.com/secretsmanager/latest/userguide/tutorials_basic.html)
2. [AWS CLI secretsmanager](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/index.html)
3. [AWS CDK Secrets Manager](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-secretsmanager-readme.html)

## Creating the Secret

```s
aws secretsmanager create-secret --name tutorials/MyFirstTutorialSecret --description "The secret I created for the first tutorial"
```

The response will look something like so:

```json
{
  "ARN": "&region-arn;secretsmanager:us-west-2:123456789012:secret:tutorials/MyFirstTutorialSecret-a1b2c3",
  "Name": "tutorials/MyFirstTutorialSecret"
}
```

## Describing the Secret

```s
aws secretsmanager describe-secret --secret-id tutorials/MyFirstTutorialSecret
```

You'll get back:

```json
{
  "ARN": "&region-arn;secretsmanager:region:123456789012:secret:tutorials/MyFirstTutorialSecret-jiObOV",
  "Name": "tutorials/MyFirstTutorialSecret",
  "Description": "My First Secret",
  "LastChangedDate": 1522680794.8,
  "LastAccessedDate": 1522627200.0,
  "VersionIdsToStages": {
    "EXAMPLE1-90ab-cdef-fedc-ba987EXAMPLE": ["AWSCURRENT"]
  }
}
```

## Retrieving the Secret

```s
aws secretsmanager get-secret-value --secret-id tutorials/MyFirstTutorialSecret --version-stage AWSCURRENT
```

You'll get back:

```json
{
  "ARN": "&region-arn;secretsmanager:region:123456789012:secret:tutorials/MyFirstTutorialSecret-jiObOV",
  "Name": "tutorials/MyFirstTutorialSecret",
  "VersionId": "EXAMPLE1-90ab-cdef-fedc-ba987EXAMPLE",
  "SecretString": "{\"username\":\"myserviceusername\",\"password\":\"MyVerySecureP@ssw0rd!\"}",
  "VersionStages": ["AWSCURRENT"],
  "CreatedDate": 1522680764.668
}
```

## With the CDK

This example shows
