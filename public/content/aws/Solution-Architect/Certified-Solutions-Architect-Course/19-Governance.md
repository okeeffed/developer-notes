# 19: Governance

## Managing Accounts With Organisations

AWS Organizations is a free governance tool that allows you to create and manage multiple AWS accounts.

With it, you can control your accounts from a single location rather than jumping form account to account.

### Key Features in Organisations

- Logging Accounts: Best practice to create a specific account dedicated to logging. CloudTrail supports logs aggregation.
- Programmatic Creation: Easily create and destroy new AWS accounts.
- Reserved Instances: RIs can be shared across accounts.
- Consolidated Billing: Primary account pays the bills.
- Service Control Policies: SCPs can limit users' permissions.

## Service Control Policies

SCP uses the same data structure as IAM policies.

- Once implemented, these policies will be applied to every single resource inside an account.
- They are the ultimate way to restrict permissions and even apply to the root account.

The example has some powerful rules that prevent a certain uses for stopping and terminating instances.

- With SCP `Allow` statements, they instruct ONLY what you are allowed to use. This may be contrary to what you would think.

> Service Control Policies never give you permissions. They only take it away.

You can attach and remove from specific accounts in the dashboard.

Exam tips:

- You'll be given scenarios about wanting to ensure logs are centralized and no one can edit or delete them.
- SCPs are the most powerful way to restrict accounts.
- Billing can easily roll up to a single account for payment.
- CloudTrail: It's important to know you can designate a single AWS account to hold your logs.
- Sharing RIs can be shared across accounts. This allows you to have one "billing" account to hold the RIs.

## Sharing Resources with AWS RAM (Resource Access Manager)

Free service that allows you to share AWS resources with other accounts within your organisation.

Allows you to easily share resources rather than have to create duplicate copies in your different accounts.

### What can you share?

- Transit gateways
- VPC subnets
- License Manager
- Route53 Resolver
- Dedicated hosts
- Many more...

The demo showed the sharing of a subnet that was ping'able from one account (although the secondary EC2 instance only showed up in the second account).

When to use RAM vs VPC Peering?

- Are you sharing resources within the same region? Use RAM.
- Are you sharing resources across regions? Use VPC peering.

Some exam tips:

- RAM is free, but the user creating the architecture pays.
- Sharing resources means you don't have to duplicate them.
- VPC Peering: Execls when you're connecting 2 separate networks.
- Organizations: RAM easily allows orgs to share architecture.

## Setting up Cross-Account Role Access

As the number of your account increases, you need to set up cross-account access.

Duplicating IAM accounts creates a security vulnerability. Cross-account role access gives you the ability to set up temporary access you can easily control.

### Steps to Set It Up

1. Create an IAM role to be assumed.
2. Grant access to that role.
3. User just makes the call to do that.

Exam tips:

- Roles are you friend.
- Preferred to create cross-account roles than additional accounts.
- Any temporary employees get role access and that's it.
- You cannot permanently assume a role.

## Inventory Management with AWS Config

Inventory management and control tool. Allows you to show the history of your infra along with creating rules to make sure it conforms to the best practices you've laid out.

What does it allow you to do?

1. Query: Easy discover what architecture you have in your account. You can query by resource type, tag and even see deleted infra.
2. Enforce: Rules can be created to flag when something is going wrong. Whenever a rule is violated, you can be alerted or even have it automatically fixed.
3. Learn: What is the history of your environment? When did something change? Who made that call?

In the demo:

- Something interesting is the timeline! Shows what things look likes.
- You can even see configuration changes.
- You can see what resources are non-compliant to rules.
- There are also remediation actions provided for non-compliant rules

> Be mindful that AWS Config is NOT a free service.

Exam tips:

- You should be looking for Config if the question lays out any type of standard that needs to be managed across your accounts. For example you'd use Config to ensure your S3 buckets aren't publicly readable or your users are using the approved AMI in their EC2 instances.
- Config is the best way to check what standards are applied to your architecture.
- You can track previously deleted AWS resources using Config.
- You can use Automation documents (runbooks) or Lambda to enforce your standards.

## Offloading Active Directory to Directory Service

Fully managed version of Active Directory.

Allows you to run AD without the heavy setup.

### Why use it?

- Managed Microsoft AD: This is the entire AD suite. You can easily build out AD in AWS.
- AD Connector: Creates a tunnel between AWS and your on-prem AD.
- Simple AD: Standalone directory powered by Linux Samba Actice Directory-compatible server.

Know that there are two primary types: Managed Microsoft AD and AD Connector.

## Exploring with Cost Explorer

Cost Explorer is an easy-to-use tool to visualize cloud costs.

You can generate reports based on a variety of factors, including resource tags.

What can we do?

1. Service: Easily break down costs on a service-by-service basis.
2. Time: What was your bill last month? How about next month?
3. Filter: Where is the spend coming from? Filter on tag, categories, etc.

Note: for using tags, you need to opt-in on a per-tag basis.

- Forecasting can be enabled to display what it would expect to spend.

Exam tips:

- Cost explorer and Budgets go hand-in-hand.
- Tags are one of the most important ways to track your spend.
- Cost Explorer can estimate your spend for the upcoming month.

## AWS Budgets

Budgets allow organizations to plan and set expectations around cloud costs.

You can easily track your ongoing spend and create alerts to let users know when they're close to exceeding their alloted spend.

### 4 Types of Budgets

1. Cost budgets: How much are we spending?
2. Usage budgets: How much are we using?
3. Reservation budgets: Are we being efficient with our RIs?
4. Savings Plans budgets: Is what we're going covered by our savings plan?

You can play around with the different budgets and see how they work through the dashboard.

- For alerts, you can also use SNS to alert you.
- You can also kick off actions to do things like shutdown instances when the budget is exceeded.
- You get two budgets for free per month.

## Auditing with Trusted Advisor

It is an auditing tool provided by AWS.

It will scan 5 different parts of your accoutn and look for places where you could improve your adoption of the recommended best practices by AWS.

### What can we look for?

1. Cost optimization: are you spending money on resources not needed?
2. Performance: are you services configured properly?
3. Security: Is you AWS architecture full of vulnerabilities?
4. Fault Tolerance: Are you protected when something fails?
5. Service Limits: Do you have room to scale?

Technically the service is free, but some things require you to pay for the AWS Support Plan.

Out of the box, you can get some things. Security has a few for you.

Exam tips:

- Automate a response. It doesn't have to fix the issue, but it should at least alert a user.
- Set up alerts.
- It is free, but most useful checks are behind a Business or Enterprise Support plan.
- Limits: Trusted advisor will not fix this for you.
- Automate: Use EventBridge to kick off Lambda to solve the problem for you.
