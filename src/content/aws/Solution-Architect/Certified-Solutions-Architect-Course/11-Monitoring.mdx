# 11: Monitoring

## CloudWatch Overview

The analogy used for why we monitor: a car driving towards a cliff that we want to monitor if the brake works.

CloudWatch is a monitoring and observability platform that was esigned to give us insight into our AWS architecture. It allows us to monitor multiple levels of our applications and identify potential issues.

- System metrics: metrics you get out of the box. The more managed the service, the more you get. E.g. "my CPU is too high", "my memory usage is too much".
- Application Metrics: by installing the CloudWatch agent, you can get info from inside your EC2 instances.
- Alarms: alert you when something goes wrong.

There are two types of metrics:

- Default: Things out-of-the-box.
- Custom: When you need to install the agent.

When creating an alarm:

- Alarms for custom metrics can go down to check every 10 seconds, but default metrics minimum is 1 minute.
- To be notified, you can use SNS to let you know.

The tips:

1. Anytime monitoring comes up, think CloudWatch.
2. There are no defualt alarms. You must create them yourself.
3. Default vs. Custom: AWS cannot see past the hypervisor level for EC2 instances.
4. The more managed the service, the more you get out of the box.
5. The stardard metric interval is 5 minutes. Detailed is 1 minute that you need to opt into.

## Application Monitoring with CloudWatch Logs

What do we do with all our logs for our instances? CloudWatch Logs.

Part of the CloudWatch suite, CloudWatch Logs is a service that allows you to monitor, store and access log files from a variety of different sources.

It gives you the ability to query your logs to look for potential issues or data that is relevant to you.

### Terms

1. Log Event: The record of what happened. It contains a timestamp and the data.
2. Log Stream: A collection of log events from the same source create a log streams. Think of one continuous set of logs from a single instance.
3. Log Group: A collection of log streams. For example, you'd group all of your Apache web server logs across hosts together.

### CloudWatch Logs Features

- Filter Patterns: You can look for specific terms in your logs. E.g. searching for 400 errors.
- CloudWatch Logs Insights: Use SQL-like commands to search through all logs.
- Alarms: Alert you when something goes wrong.

### Installing the CloudWatch Agent

On an AMI that uses `yum`:

```s
$ sudo yum install amazon-cloudwatch-agent -y
# Prompts with questions, including a question about what log files to monitor.
```

Exam tips:

- Generally you will favour CloudWatch Logs unless the exam asks for a real-time solution.
- Alarms can be used to alert if the filter patterns are found.
- CloudWatch agent must be installed and configured. It's not automatic.
- If the question mentions SQL, think CloudWatch Logs Insights.
