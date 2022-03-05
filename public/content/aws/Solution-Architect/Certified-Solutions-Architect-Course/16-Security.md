# 16: Security

## DDoS Overview

Distributed Denial of Service attack that make app or website unavailable to end users.

Achieved by multiple mechanisms:

- Large packet floods.
- Combination of reflection and amplification techniques.
- Using large botnets.

### Layer 4 DDoS Attack

Layer 4 DDoS attack is often referred to as a SYN (synchronization) flood operating at the transport layer (TCP).

- To establish a TCP connection, 3-way handshake takes place.
- The client sends a SYN packet to the server, the server replies with a SYN-ACK, and client then responds to that with an ACK.
- Normally after, the TCP connection is established.
- SYN floods uses the built in patience of the TCP stack to overwhelm a server by sending a large number of SYN packets and then ignoring the the SYN-ACKs returned by the server.
- There are only a certainly number of concurrent TCP connections that a web or app server can have open, so it eats through the allowed number and prevents legitimate requests from being answered.

> ACK = acknowledgement

### Amplification attack

Amplification/reflection attacks can include things such as:

- NTP (Network Time Protocol)
- SSDP (Simple Service Discovery Protocol)
- DNS (Domain Name System)
- CharGEN (Character Generator Protocol),
- SNMP attacks (Simple Network Management Protocol)
- And more...

An attacker may send a third-party server (such as an NTP server) a request using a spoofed IP address.

- Server then responds to request with a greater payload than the original request (usually around 28-54 times larger) to the spoofed IP.

### Layer 7 DDoS Attack

Occurs when a web server receives flood of GET or POST requests.

Usually a botnet or a large number of compromised computers.

Exam tips:

1. Remember what a DDoS is.
2. Common DDoS attacks included Layer 4 attacks such as SYN floods and NTP amplification attacks.
3. Common Layer 7 attacks include flood of GET/POST requests.

## Logging API Calls with CloudTrail

CloudTrail increases visibility into your user and resuorce activity by recording AWS Management Console actions and API calls.

You can identify which users and accounts use it.

It is like CCTV monitoring for your AWS account.

- RDP/SSH traffic is not logged.
- API calls are logged.

What is logged in CloudTrail?

- Metadata around API call.
- Identity of the API caller.
- The time of the API call.
- Source IP of API call.
- The request parameters.
- The response elements returned by the service.

Logs are stored in S3.

### What CloudTrail Allows

- After-the-fact incident investigation.
- Near real-time intrusion detection.
- Industry and regulatory compliance.

## Protecting Applications with Shield

Free DDos Protection.

- Protects all AWS customers on ELB, CloudFront and Route53.
- Protects against SYN/UDP floods, reflection attacks and other Layer 3 and Layer 4 attacks.

### AWS Shield Advanced

- AWS Shield Advanced offers enhanced protections for apps running on ELB, CF and Route53 from larger and more sophisticated attacks.
- Offers always-on, flow-based monitoring of network traffic and active application monitoring to provide near real-time notifications of DDoS attacks.
- 24/7 access to the DDoS Response Team (DRT) to help manage and mitigate application-layer DDoS attacks.
- Protects your AWS bill against higher fees due to spikes during a DDoS attack.

What are the costs? USD$3000 per month.

Exam tips:

- Shield protects again Layer 3 and Layer 4 only.

## Filtering Traffic with AWS WAF

A web app firewall that lets you monitor HTTP and HTTPS requests to CloudFront and ELB.

- Can configure conditions such as what IP addresses are allowed to make this request or what query string params need to be passed for the request to be allowed.
- Response will be content or 403.
- WAF operates at Layer 7.
- Can block DDoS attacks as well as SQL injections and cross-site scripting.

The 3 different behaviours:

1. Allow all requests except ones you specify.
2. Block all requests except ones you specify.
3. Count the requests that match the properties you specify.

## GuardDuty

A threat detection service using ML to continuously monitor for malicious behaviour.

- Unusual API calls, calls from a known malicious IP.
- Attempts to diable CloudTrail logging.
- Unauthorized deployments.
- Compromised instances.
- Reconnasissance by would-be attackers.
- Port-scanning and failed logins.

### GuardDuty Features

- Alerts appear in GuardDuty Console and CloudWatch Events.
- Receives feeds from third parties like Proofpoint and CrowdStrike, as well as AWS Security, about known malicious domains and IP addresses, etc.
- Monitors CloudTrail logs, VPC Flow Logs, and DNS logs.
- Centralize threat detection across multiple AWS accounts.
- Automated response using CloudWatch Events and Lambda.
- Machine learning and anomaly detection.

### Setting Up GuardDuty

- 7-14 days to set a baseline.
- Once active, you will see findings on the GuardDuty console and in CloudWatch Events only if GuardDuty detects behaviour it considers a threat.

### Pricing

30 days free. Then charges are based on:

- Quantity of CloudTrail events
- Volume of DNS and VPC flow logs data

## Monitoring S3 Buckets with Macie

PII is personally identifiable information.

This data could be exploited by criminals, used in identity theft and financial fraud.

Macie uses ML and pattern matching to discover sensitive data stored in S3.

- Alerts you about unencrypted buckets.
- Alerts you about public buckets.
- Can also alert you about buckets sahre with AWS accounts outside of those defined in your AWS organizations.
- Great for framewords like HIPAA and GDPR.

### Macie Alerts

- Can filter and search Macie alerts in the AWS console.
- Alerts sent to Amazon EventBridge can be integrated with your security incident and event management (SIEM) system.
- Can be integrated with AWS Security Hub for a broader analysis of your org's security posture.
- Can also be integrated with other AWS services, such as Step Functions, to automatically take remediation actions.

## Securing Operating Systems with Inspector

Automated security assessment service that helps improve the security and compliance of apps deploye on AWS.

Automatically assesses applications for vulnerabilities or deviations from best practices.

- After performing an assessment, it produces a detailed list of security findings prioritized by level of severity.
- These findings can be reviewed directly or as part of detailed assessment reports that are available via the Amazon Inspector console or API.

Two types of assessment:

1. Network Assessment: checks ports reachable from outside the VPC. Inspector agent not required.
2. Host Assessment: CVE, CIS Benchmarks and be security practices on hosts. Inspector agent is required.

### How does it work?

1. Create assessment target.
2. Install agents on EC2 instances. Automatically installed for instances that allow Systems Manager Run Command.
3. Create assessment template.
4. Perform assessment run.
5. Review findings against rules.

## Managing Encryption Keys with KMS and CloudHSM

### What is KMS?

Key Management Service: managed service to make it easy to create and control encryption keys used to encrypt data.

It integrates with other AWS services.

It has a centralized control over the lifecycle and permissions of your keys.

You can create new keys whenever you wish, and you can control who can manage keys separately from who can use them.

### CMK

Customer Master Key. A logicial representation of a master key.

Includes metadata such as the key ID, creation date, description and key state.

Also contains material to encrypt and decrypt data.

You can start using the service by requesting the creation of a CMK. You control the lifecycle of the CMK as well as who can use or manage it.

### HSM

Hardware Security Module. A physical device that safeguards and manages digital keys and performs encryption and decryption functions.

Contains one or more secure cryptoprocessor chips.

### 3 Ways to Generate a CMK

1. AWS creates it for you. Key material for CMK is generated within HSMs managed by AWS KMS.
2. Import key material from your own key management infrastructure and associate it with a CMK.
3. Have a key material generated and used in an AWS CloudHSM cluster as part of the custom key store feature in AWS KMS.

### Key Rotation

You can have KMS can automatically rotate CMKs every year, provided they were created by KMS's HSMs.

### Policies

The primary way to manage access to your AWS KMS CMKs is with policies: documents that describe who has access to what.

Policise attached to an IAM identity are called identity-based policies (or IAM policies). Policies attached to other kinds of resources are called resource-based policies.

### Key Policies

In AWS KMS, you must attach resource-based policies to your customer master keys (CMKs). These are called key policies.

All KMS CMKs have a key policy.

### Three Ways To Control Permissions

1. Use the key policy. Full scope of access to the CMK is defined in a single document.
2. Use IAM policies in combination with the key policy. Enables you to manage all the permissions for your IAM identities in IAM.
3. Use grants in combination with the key policy. Enables you to allow access to the CMK in the key policy, as well as allow users to delegate their access to others.

### CloudHSM

Cloud-based HSM that enables you to easily generate and use your own encryption keys on the AWS Cloud.

It is a physical device, entirely dedicated to you, that can be deployes in a highly available fashion.

### KMS vs CloudHSM

KMS:

- Shared tenancy of underlying hardware.
- Automatic key rotation.
- Automatic key generation.

CloudHSM:

- Dedicated HSM to you.
- Full control of underlying hardware.
- Full control of users, groups, keys, etc.
- No automatic key rotation.

## Storing Your Secrets in Secrets Manager

Secrets manager is a service that securely stores, encrypts and rotates your database credentials and other secrets.

- Encryption in transit and at rest using KMS.
- Autoatically rotates credentials.
- Apply fine-grained access control using IAM policies.
- Costs money but highly scalable.

### What else can SM do?

- App makes a call to SM to retrieve the secret programmatically.
- Reduces the risk of credentials being compromised.

### What can be stored?

- RDS credentials.
- Credentials for non-RDS DBs.
- Any other type of secret, provided you can store is as a key-value pair (SSH keys, API keys).

Important: if you enable rotation, SM immediately rotates the secret once to test the configuration. Ensure all apps that use these credentials are updated to retrieve the credentials from the secrets using SM.

## Storing Secrets in Parameter Store

Capability of AWS Systems Manager that provices secure,hierarchical storage for configuration data mangement and secrets management.

You can store data such as passwords, database strings, AMI IDs, license codes at parameter values. Can be stored as plain text or encrypted data.

It is free!

### 2 Big Limits to Parameter Store

- 10k limit for params.
- No key rotation.

## Temporarily Sharing S3 Objects Using Presigned URLs Or Cookies

The object owner can optionally share objects with others by creating a presigned URL, using their own security creds, to grant time-limited permissions to download the objects.

When you create a presigned URL for your object, you must provide your security creds, specify a bucket name and an object key and indicate the HTTP method (or GET to download the object) as well as expiration date and time.

Anyone who recieves the presigned URL can access the object for the duration of validity. Example: you could share a private video by generating a presigned URL.

### Presigned Cookies

Useful when you want to provide access to multiple restricted files.

Cookie will be saved to user's computer, and they will be able to browse the entire cntents of the restricted content.

In the demo, SSH'd into a EC2 instance that had S3 access. The AWS CLI was then used to presign the object.

## Advanced IAM Policy Documents

ARNs = Amazon Resource Name.

All ARNs begin with `arn:partition:service:region:account_id:`

It will end with:

- `resource`
- `resource_type/resource`
- `resource_type/resource/qualifier`
- `resource_type/resource:qualifier`
- `resource_type:resource`
- `resource_type:resource:qualifier`

### IAM Policies

- JSON document that defines permissions.
- Identity policy.
- Resource policy.
- No effect until attached.
- List of statements.

In the statement, there is a `Sid`, `Effect`, `Action`, `Resource`.

### Permission Boundaries

- Used to delegate administration to other users.
- Prevent privilege escalation or unnecessarily broad permissions.
- Control maximum permissions an IAM policy can grant.

Use cases:

- Devs creating roles for Lambda funcs.
- App owners creating roles for EC2 instances.
- Admins creating ad hoc users.

Exam tips:

- Not explicity allowed is denied.
- Explicit deny trumps everything.
- Only attached policies have effect.
- AWS joins all application policies.

## AWS Certificate Manager

Create, manage and deploy public and private SSL certs for use with other AWS services.

Benefits:

- Cost: no more paying for SSL certs.
- Automated Renewals and Deployments.
- Easier to set up.

Exam tips:

- Know what it is.
- Supported services: ELB, CloudFront, API Gateway.
- Know the benefits.
