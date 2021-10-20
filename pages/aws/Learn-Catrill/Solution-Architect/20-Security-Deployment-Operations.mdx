# 20: Security Deployment and Operations

## AWS Secrets Manager

AWS Secrets manager is a product which can manage secrets within AWS. There is some overlap between it and the SSM Parameter Store - but Secrets manager is specialised for secrets.

SSM Parameter Store is where you create secure strings where you can store secure strings.

- SM shares functionality with the parameter store.
- SM is designed for secrets (password, API Keys)
- SM is designed to be integrated with other AWS services.
- Supports automation rotation - lambda.
- Direct integration with some AWS products (RDS).

This product focuses on storage and rotation of secrets.

An example application:

1. App uses SM SDK to retrieve database credentials.
2. SDK uses IAM credentials for Authorisation.
3. App uses secrets then obtained from SM to securely access the Database.

So far, everything could be provided using SSM Parameter Store.

What sets this apart, is that the SM can rotate credentials periodically via a lambda function. Lambda requires permissions that it gets from an execution role.

The information inside RDS and SM are rotated in sync.

Secrets are secured using KMS. KMS also ensures role separation - you will need access to both KMS and SM.

Exam tip: If it mentions "secrets", "rotation", "integration" or "RDS" then it is likely to be a Secrets Manager product.

## AWS WAF & Shield

These two products feature more often and pop up more often in the current edition of the exams.

### AWS Shield

["What is a DDoS attack"](https://www.cloudflare.com/en-au/learning/ddos/what-is-a-ddos-attack/).

- Protects against DDOS attacks.
- Shield Standard: free with Route53 and CloudFront.
- Protection against Layer 3 and Layer 4 DDoS Attacks.
- Shield Advanced: USD$3000/month. Includes EC2, ELB, CloudFront, Global Accelerator & Route 53 protection.
- Advanced includes access to DDoS team and Financial Insurance.

### AWS WAF

- Layer 7 Firewall (HTTP/S).
- Normally firewalls operate at Layer 3, 4 and 5.
- WAF protects against complex Layer 7 attack: SQL injection, XSS, Cross Site Scripting, Cross Site Request Forgery, etc. and has Geo Blocks and Rate Awareness.
- Provides a Web ACL integrated with ALB, API Gateway and CloudFront.
- Rules are added to a WEBACL and evaluated when traffic arrives.

### Usage of WAF and Shield

- Commonly for DDoS and Layer 7 protection is to use both.
- Both are forms of perimeter shield protection.

## AWS CloudHSM

- KMS is AWS managed. It is a shared service. AWS also have a certain level of access. Behind the scenes KMS use HSM hardware.
- CloudHSM is a true "single tenant" hardware security module (HSM). CloudHSM is hosted by AWS.
- AWS provision the HSM and are responsible for maintenance, but have no access to the part where the keys are stored and managed. It is fully customer managed.
- CloudHSM is required to achieve compliance with certain security standards such as FIPS 140-2 Level 3. KMS is FIPS 140-2 Level 2.
- If you need FIPS 140-2 Level 3, you must used CloudHSM or on-prem HSM.
- KMS uses AWS standard API for all operations and controlled IAM. CloudHSM is accessed with industry standard APIs (PKCS#11, JCE, CNG).
- KMS can use Custom Key Store which can use CloudHSM.

### CloudHSM in practice

- CloudHSM operates on nodes within a AWS-managed VPC.
- Interfaces are added to customer VPCs.
- HSMs keep keys and policies in sync when nodes are added or removed.
- AWS CloudHSM Client needs to be installed on EC2 instances.

It is really important to remember AWS cannot access the area where CloudHSM stores the keys. They can only do maintenance tasks.

### CloudHSM Use Cases

- CloudHSM has no native AWS integration e.g. no S3 SSE.
- Offload the SSL/TLS Processing for Web Servers.
- Enable Transparent Data Encryption (TDE) for Oracle Databases.
- Protect Private Keys for Issuing Certificate Authority (CA).
- If you need FIPS 140-2 Level 3.

At an associate level, there will unlikely be many questions on CloudHSM.

## AWS Config

People often misunderstand what it does.

Two main jobs:

1. Record changes over time on resources on an AWS account.
2. Auditing of changes, compliance with standards.

AWS Config does not prevent changes happening - there is no protection.

- AWS Config is a Regional Service. It can be configured for cross-region and account aggregation.
- Changes can generate SNS notifications and near-realtime events via EventBridge & Lambda.

[AWS Config vs AWS CloudTrail](https://www.sumologic.com/blog/aws-config-vs-cloudtrail/).

- Config rules evaluate resources against a defined standard and are "compliant" or "non-compliant".
- Config Rules Changes can also trigger EventBridge to invoke Lambda fns based on AWS Config events to perform automatic resource remediation.

## AWS Macie

- Data Security and Data Privacy Service
- Discover, Monitor and Protect Data stored in S3 buckets.
- Automated discovery of data i.e. PII, PHI, Finance.
- Managed Data Identifiers - Built-in ML/Patterns. Used for almost all common types.
- Custom Data Identifiers - Proprietary - Regex Based.
- Integrates with Security Hub & "finding events" to EventBridge.
- MACIE uses a multi-account architecture. It is centrally managed. Can be done either by AWS Organisations or Macie Account Inviting.

[AWS Security Hub vs AWS Detective vs AWS Inspector](https://portal.tutorialsdojo.com/forums/discussion/difference-between-security-hub-detective-and-inspector/)

### Data Discovery Jobs

- "Data discovery jobs" are the jobs you run in Macie.
- Macie discovery job can output findings or send a Finding Event to EventBridge.
- Managed data identifiers is a growing list of common sensitive data types.
- "Keywords", "Maximum Match Distance" and "Ignore Words" are refinements you can use for Custom Data Identifier regex patterns.
- There are "Policy Findings" or "Sensitive data" findings.
