# 10: Advanced IAM

## Web Identity Federation

Simplifies authentication and authorization for web apps.

- User Access to AWS Resources: Users get access after successfully auth'ing with a web-based identity provider like Facebook, Amazon or Google.
- Authentication: Users will get a successful auth code.
- Authorization: Users trade auth code for temp AWS security creds, authorizing access to AWS resources.

### Web ID Federation with Amazon Cognito

- Provides web ID federation, including sign-up and sign-in fucntionality for your app, and access for guest users.
- Cognito acts as an identity broker. You don't need to write any additional code.
- Cognito supports multiple devices.
- It is recommended for all mobile apps that use AWS services.
- Temporary credentials map to an IAM role.
- Cognito is secure and seamless. No need for the app to embed or store AWS creds locally on the device.

### Cognito User Pools and Identity Pools

- User Pools: User directories used to manage sign-up and sign-in functionality for mobile and web applications.
- Sign-in: Users can sign-in directly to the User Pool, or using Facebook, Amazon or Google.
- Identity Pools: Enable you to provide temporary AWS credentials enabling access to AWS services like S3 or DynamoDB.

> User Pools are all about sign-in/sign-out, while Identity Pools are about temporary IAM roles.

### User Pool and Identity Pool Workflow

1. User signs in with the `User Pool`.
2. The `User Pool` returns a JWT token.
3. That JWT token is traded with `Identity Pool` for AWS credentials that map to a IAM role.

### Cognito Push Synchronization

- Devices: Cognito tracks the association between user identity and the various different devices they sign-in from.
- Seamless: Cognito uses Push Synchronization to push updates and synchronize user data across multiple devices.
- Under the hood, it is using SNS Silent notifications.

## Cognito User Pools Demo

Objectives:

1. Create a Cognito User Pool.
2. Configure Sign-Up and Sign-In.
3. Sign up a User.
4. View the JWT Token.

After creating the User Pool, you can configure the following:

1. Add `App Client`. We use it to call all the various APIs on our behalf. Make sure `Generate App Client Secret` is selected on.
2. Now click `App client settings`, set it for `Cognito User Pool`, and you'll need to configure the Callback URL and sign-out url.
3. Under `Allowed OAuth Flows`, the demo selected `Authorization code grant` and `Implicit grant`. The later provides the JWT.
4. Under `Allowed OAuth Scopes`, all the value were selected.
5. Under `Domain name`, a domain is created.
6. Afterwards, the domain could be visited with query params `response_type=token` and `client_id=<your-app-client-id>` and `redirect_uri=<your-callback-url>`.

> Configuraing the app client is out of scope for this exam.

After all of this was done, the last few things demonstrated:

1. Under `Users and groups`, it was demonstrated how to create groups for what certain users could access.
2. Under `Identity providers`, there was a demonstration of the provider values possible.

## Cognito Identity Pools Demo

In part one, there was a DynamoDB Table and EC2 instance.

In this part, a Cognito Identity Pool and IAM Role are created. It will give access to unauth'd users.

## STS AssumeRoleWithWebIdentity

- `assume-role-with-web-identity` is an API provide by STS (Security token service).
- Returns temporary security credentials for users authenticated by a mobile or web app or using a web ID provider like Amazon, Facebook, Google, etc.
- Regular web apps can use `assume-role-with-web-identity`. For mobile, it is recommended to use Cognito.

## Cross-Account Access

Delegate access to resources in different AWS accounts that you own.

- Manage resources in other accounts
- IAM role in one account to allow access and grant permissions to users in a different account.
- Switch roles within the AWS management console. No password required.
