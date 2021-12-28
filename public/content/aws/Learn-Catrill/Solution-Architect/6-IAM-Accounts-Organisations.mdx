# 6: IAM, Accounts and Organisations

## IAM Identity Policies

- Identities are users, groups and roles.
- Policies are attached to identities.
- IAM Policy Documents are writting in JSON.
- In policy documents, DENY overrides.

### IAM Policy

1. Explicit DENY always overrules.
2. Explicit ALLOW take effect UNLESS there is an explicit DENY.
3. By default, there is an implicit DENY.

Policies are all collected and evaluated at the same time. An example of this collection may be:

1. User policies.
2. Group policies.
3. Resource policies.

All are aggregated and follow the evaluation rules given above.

### Policy Types

1. Managed policies.
2. Inline policies.

If you add policies to individual users, you would be writing three inline policies.

A managed policy is its own object that then you then attach to an identity.

> Inline policies are for exceptional or special cases.

For managed policies, there are AWS Managed Policies and Customer Managed Policies.

## IAM Users and ARNs

- IAM Users are an identity used for anything requiring long-term AWS access e.g. Humans, Applications or service accounts.
- Principal: an identity that can be used to perform actions on AWS resources.
- A principal authenticates using a username + password or access keys.

### Amazon Resource Name (ARN)

Uniquely identify resources within any AWS accounts or a group using a wildcard `*`.

```sh
arn:aws:s3:::catgifs # bucket
arn:aws:s3:::catgifs/* # objects in the bucket but not the bucket itself
```

### Limits to know

- 5,000 IAM users per account.
- IAM user can be a member of 10 groups.
- This has systems design impacts... if you have more than 5k, then IAM users is probably not that you want to use.

## IAM Groups

Groups are containers for users.

- They are to make life easier for managing users.
- When a user is part of multiple groups, then all group policies are aggregated for the allow/deny evaluation.
- Groups cannot be nested.
- Groups cannot be logged into and have no credentials.
- Groups are NOT a true identity. They cannot be referenced as a `principal` in a policy.

## IAM Roles

- A type of `identity` that sits in an account (the other being the IAM user).
- Role is best used by an unknown number or principals. E.g. unknown number of internal/external users, applications or services.
- Roles are assumed on a temporary basis. You become that role. There are temporary security credentials that are provided to perform actions.
- Roles can be assumed by multiple principals.
- Temporary credentials are provided by AWS STS (Security Token Service).

Roles have permissions policies and trust policies, whether they are inline or managed.

1. Trust policies: Who can assume that role?
2. Permissions policies: What can the role do?

## When to use IAM Roles

- Lambda Execution Role for Lambda to have permission to access other AWS services.
- Roles are useful for an emergency or out-of-the-usual scenarios.
- Adding AWS into an existing corporate environment (SSO or > 5k identities - external accounts can't be used in AWS directly).
- Architecture for a popular architecture that has 1m+ users. Web IAM can use IAM roles. No AWS credentials on the app and uses existing custom logins. Can scale to 100m+ users.
- Cross-account access: IAM roles can be used to grant access to resources in other AWS accounts. You can assume a role in the other account.

## AWS Organisations

Larger business can manage multiple AWS accounts with little overhead.

AWS Organisations takes a standard AWS Account and you create an organisation. This standard account then becomes the "management account".

Using the management account, you can invite exist other existing accounts to join the organisations as a member account.

- The Organization Root is a container for AWS accounts that exists at the top of an organizational structure.
- The Organization Root can also contain other contains which are other Organisational Units (OUs). You can create a complex organizational structure.
- Billing gets passed to the management account (sometimes referred to as a payer account).
- Consolidated billing can get benefits from tier-usage costs. Consoidated reservations as well.
- Organisations also feature a service call "Service Control Policies"

As well being able to invite other organisations, you can also create new organisations within it without the requirement for a confirmation.

Organisations changes what is best practise for IAM.

- Instead of IAM users for each account, it is best practice to have one management account to log into (or at least a single AWS account to log into) and then use the IAM roles to manage the other accounts.
- You could also confirm AWS to use Identity Federation.

## Service Control Policies

The demo creates an S3 bucket in the "production" account, uploads a photo and opens the photo to prove you can view it.

At this stage, we want to restrict things using the "service control policies".

From within the management organisation, under "AWS Organizations" then you can enable service control policies.

It adds a `FullAWSOrganisation` policy to the management account. This first policy does nothing, but we can create new policies to start restricting member accounts.

The example give is a SCP that adds a `Deny` policy to making actions to `S3`.

Service Control Policies can override administrator access in the member accounts.
