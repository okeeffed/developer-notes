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

````s
aws secretsmanager create-secret --name tutorials/MyFirstTutorialSecret --description "The secret I created for the first tutorial" --secret-string SUPERSECRET

The response will look something like so:

```json
{
  "ARN": "&region-arn;secretsmanager:us-west-2:123456789012:secret:tutorials/MyFirstTutorialSecret-a1b2c3",
  "Name": "tutorials/MyFirstTutorialSecret"
}
````

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

```ts
import secretsManager = require('@aws-cdk/aws-secretsmanager');

// ... further down
new Function(this, `teams-bot-${props.farm}`, {
  projectName: props.projectName,
  functionName: `${props.projectName}-teams-bot-${props.farm}`,
  code: lambda.Code.fromAsset('../path/to/func.zip'),
  runtime: lambda.Runtime.NODEJS_12_X,
  handler: 'index.handler',
  environment: {
    ...props.functionEnvVars,
    MICROSOFT_APP_ID: `${
      secretsManager.Secret.fromSecretArn(
        this,
        'ms-app-id',
        `/${props.projectName}/ms-app-id`,
      ).secretValue
    }`,
    MICROSOFT_APP_PASSWORD: `${
      secretsManager.Secret.fromSecretArn(
        this,
        'ms-app-password',
        `/${props.projectName}/ms-app-password`,
      ).secretValue
    }`,
    OAUTH_CLIENT_ID: `${
      secretsManager.Secret.fromSecretArn(
        this,
        'oauth-client-id',
        `/${props.projectName}/oauth-client-id`,
      ).secretValue
    }`,
    OAUTH_CLIENT_SECRET: `${
      secretsManager.Secret.fromSecretArn(
        this,
        'oauth-client-secret',
        `/${props.projectName}/oauth-client-secret`,
      ).secretValue
    }`,
    NEW_RELIC_APP_NAME: `${props.projectName}-teams-bot-${props.farm}`,
  },
  timeout: cdk.Duration.seconds(60),
  memorySize: 256,
  vpc: this.cultureAmpEnvironment.vpcRef(this, SubnetType.Services),
  securityGroups: [sg],
});
```
