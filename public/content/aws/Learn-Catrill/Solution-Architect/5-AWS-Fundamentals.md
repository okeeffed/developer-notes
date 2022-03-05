# 5: AWS Fundamentals

## Public vs Private Services

- All about networking.
- No permissions by default.
- An AWS public service is a service that is available from any unrestricted internet connection.

"Just because you can connect to a public service does not mean that you can access it."

> By default, private AWS services cannot be accessed from the public internet. If you opt to allow connections to it, you can think of it as project part of the services to the AWS public zone.

## CloudWatch Basics

- Collects and manages operational data.

You can think of CloudWatch as 3 products in 1:

### 1: Metrics - AWS Products, Apps, on-prem.

- Some metrics like CPU utilization come out-of-the-box.
- Other metrics requires the installation of the CloudWatch agent.

To view available metrics by namespace, dimension or metric you can use the AWS CLI. Here is an example by namespace.

```s
$ aws cloudwatch list-metrics --namespace AWS/EC2
{
  "Metrics" : [
    ...
    {
        "Namespace": "AWS/EC2",
        "Dimensions": [
            {
                "Name": "InstanceId",
                "Value": "i-1234567890abcdef0"
            }
        ],
        "MetricName": "NetworkOut"
    },
    {
        "Namespace": "AWS/EC2",
        "Dimensions": [
            {
                "Name": "InstanceId",
                "Value": "i-1234567890abcdef0"
            }
        ],
        "MetricName": "CPUUtilization"
    },
    {
        "Namespace": "AWS/EC2",
        "Dimensions": [
            {
                "Name": "InstanceId",
                "Value": "i-1234567890abcdef0"
            }
        ],
        "MetricName": "NetworkIn"
    },
    ...
  ]
}
```

To see the available metrics for your system, you can follow the details on the link ["List the available CloudWatch metrics for your instances"](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html).

Some instance metrics:

- `CPUUtilization`
- `DiskReadOps`
- `DiskWriteOps`
- `DiskReadBytes`
- `DiskWriteBytes`
- `MetadataNoToken`
- `NetworkIn`
- `NetworkOut`
- `NetworkPacketsIn`
- `NetworkPacketsOut`

Metrics that you can get from the CloudWatch agent can be found here on ["Metrics collected by the CloudWatch agent"](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/metrics-collected-by-CloudWatch-agent.html).

### 2: CloudWatch Logs - AWS Products, Apps, on-prem

Note that for anything specific on-prem, custom logs or logs that do not come out of the box, you will need to install the CloudWatch Logs agent.

See ["Quick Start: Install and configure the CloudWatch Logs agent on a running EC2 Linux instance"](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/QuickStartEC2Instance.html) for more info.

### 3: CloudWatch Events - AWS Services & Schedules

- Can generate an event based on something that happens.
- Can generate an event based on a schedule.

Note: Amazon EventBridge is the preferred way to manage your events. CloudWatch Events and EventBridge are the same underlying service and API, but EventBridge provides more features. Changes you make in either CloudWatch or EventBridge will appear in each console. For more information, see Amazon EventBridge.

You can find more information on the events here on ["What Is Amazon CloudWatch Events?"](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html).

### More on CloudWatch

- CloudWatch manages a lot of metrics.
- Based on what data is stored, you can create alarms.
- You can view stats on the console or via the API.

### Namespace

Think of it as a "container for monitoring data".

All AWS data goes into a namespace `AWS/service` eg. `AWS/EC2`, so that style of naming is reserved.

Namespaces contain related metrics.

### Metrics

Metrics are a time ordered set of data points:

- CPU Usage
- Network IN/OUT
- Disk IO

> A metric is not for a specific server.

### Datapoint

This is a distinct data point that makes up the many data points that make up a metric.

- Timestamp
- Value

### Dimension

Dimensions separate datapoints for different thing or perspectives within the same metric.

A dimension enables us to differentiate the difference producers (e.g. three EC2 instances) from the same metric (e.g. CPUUtilization).

For example, as data comes in, the data can also have a `InstanceId` dimension and a `InstanceType` dimension.

Dimensions are very powerful.

### Alarms

Enable us to take actions based on a metric (e.g. turn on an EC2 instance).

There is an `ok` state and a `alarm` state. The `alarm` state is when an action or SNS message is sent.

> There is also a `insufficient data` state early in the life of an alarm.

### Demo

The example deploys an EC2 instance to show how to use CloudWatch.

By default, CloudWatch takes metrics in 5 minute periods. You can enable "Detailed Monitoring" which enables the collection of metrics at 1 min intervals.

- A `tag` was also added under `Name` with a basic description of the instance as the value.
- After launching the EC2 instance, the `monitoring` tab was demonstrated to show the metrics.
- The demo set an alarm for >15% `CPUUtilization`.
- The `stress` utility was installed and used to stress the instance.

## High Availability (HA) vs Fault Tolerance (FT) vs Disaster Recovery (DR)

### High Availability

Aims to ensure an agreed level of operational performance, usually uptime, for a higher than normal period.

We are not aiming to stop failure or prevent 100% of outages. It is a system designed to keep the system components up running as often as possible.

It is about maximising a systems online time.

User disruption is "okay", but we want it to be minimised.

> The analogy used here was a 4WD that has a spare tyre and the tools to change it.

Sometimes HA means having redundant databases or redundant servers ready for a quick change with down time.

### Fault Tolerance

The property that enables a system to continue operating properly in the event of a failure of some (one or more faults within) of its components.

The analogy used is about an injured patient being prepped for a surgical procedure under anaesthetic being monitored about how much anaesthetic to give.

In a HA environment, a server monitoring the patient that goes down could be swapped out with another, but that disruption could be catastrophic. HA is not enough.

Fault tolerance enables the system to continue to function in the event of a failure of one or more of its components with no disruption.

- HA is not about operating through failure. It is about minimising downtime from failure.
- FT is what it means to operate through failure.
- FT is more expensive.

> The analogy here was not about a 4WD, it was about a plane. A plane comes with fault tolerance through spare engines etc. to continue operating through a failure.

### Disaster Recovery

A set of policies, tools or procedures to enable the recvery or continuation of vital technology infrastructure and systems following a natural of human-induced disaster.

DR is about what to plan for or do when an outage occurs.

- There is pre-planning.
- There is the actual disaster recovery process.

An example that is given is the analogy of a fire disaster plan.

## Domain Name System (DNS)

- A discovery service.
- Translates machine into human and vice-vera.
- `www.amazon.com` => 104.98.34.131.

DNS is a distributed, resilient database. DNS has to accomodate all IPv4 and IPv6 addresses.

A single DNS Zone will have a Zone File that contains the DNS records for the address like `amazon.com`.

These zone files are hosted by a Nameserver (NS).

The zone file can be in a NS hosted anywhere out of the entire distributed network.

One of the services DNS provides is for a DNS Resolver to find the zone so that once located it can be queried, get the result and use result to access the website.

Some important terms to review:

- DNS Client: your laptop, phone, tablet, PC.
- Resolver: Software on the DNS client or a server which queries DNS on your behalf.
- Zone: A part of the DNS database (what the data is).
- Zonefile: physical database for a zone (how it is physically stored).
- Nameserver: where zonefiles are hosted.

### DNS Root

DNS needs a starting point, and that is the `DNS Root` (also know as the `DNS Root Zone`).

For an example `www.amazon.com.`, it is read right-to-left with the right-most period `.` being the root.

There are 13 entity DNS Root Servers (server could distributed) that host the root zones.

A `DNS Resolver Server` uses a Root Hints file that is a pointer to the root zone on the root servers.

The `root zone` is managed by IANA.

This is a simplified explanation.

Once something is trusted in DNS, it is an authority (it is authoritative).

The root zone can delegate a part of itself to another zone (just for the part of the root zone that is delegated). It then becomes authoritative.

The Root Zone Database has a list of top-level domains (managed by IANA) which is essentially a list of delegations.

There are different registries that will manage top-level domains like `.com` etc.

The name servers listed for the TLD become authoritative.

Within the nameserver for that TLD, there is a zonefile for the `amazon.com` which has more records and delegates authority.

The process of looking for this detailed answer is known as "walking the tree".

Understand with DNS: information is distributed.

Concepts to remember:

- Root Hints: config points at the root servers IPs and addresses.
- Root Server: hosts the DNS root zone.
- Root Zone: points at TLD authoritative servers.
- gTLD: Generic Top Level Domain.
- ccTLD: Country Code Top Level Domain.

## DNS Record Types

- NS: As mentioned, they allow delegation to occurs in DNS.
- A & AAAA: Do the same thing. Given a DNS zone, those records map host names to IP addresses. The A record is for IPv4 and the AAAA record is for IPv6. Generally you'll create two records with the same name.
- CNAME: Canonical name - let's you create the equivalent of a host-to-host record. They're used to redirect a host name to another host name (like the A or AAAA).
- MX: Mail Exchange - MX value can be just a host or a fully qualified domain name. Lower values for the priority field is higher priority. You may have an A record pointing to an IP address and a MX record pointing to a host name which it will deliver the email using SMTP.
- TXT: Allows you to store arbitrary text to a domain. This could be things like proving domain ownership. It can also be used to fight spam.

DNS TTL is a value (in seconds) that can be set on DNS records.

Once you get an "authoritative answer" from walking the tree, you can use the TTL to cache the result of that authoritative answer at the DNS resolver.

If you get a cached answer, this is known as getting back a Non-Authoritative answer from the DNS resolver cached results.

An admin at the DNS resolver can manually set it to bypass/invalidate the cache value.

If doing any work on changing DNS records, then ensure to lower the TTL value.
