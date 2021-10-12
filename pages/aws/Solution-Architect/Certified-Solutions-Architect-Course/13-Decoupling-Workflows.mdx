# 13: Decoupling Workflows

Tight coupling occurs when one instance is directly talking to another client.

Loose coupling helps with redundancy as we put load balances in front of our layers that ensure that we can handle failed instances within a layer to keep the end user happy.

Load balancers aren't always the answer, so we can look at some other tools to help with decoupling applications.

1. Simple Queue Service: Enables you to decouple and scale microservices, distributed systems and serverless applications.
2. Simple Notification Service: The goto tool to push our notifications. Great for Application-to-Application (A2A) and Application-To-Person (A2P) communication.
3. API Gateway: Fully managed service that makes it easy for developers to create, publish, maintain, monitor and secure APIs at any scale.

Exam tips:

- Never tightly couple. While simpler from an architecture POV, it doesn't offer any meaningful benefits over loose coupling.
- Always loosely couple.
- Loosely couple internal and external.
- There is no one single way to decouple.

## Messaging with SQS

### Poll-based messaging

Requires other services to poll the queue to take things off the queue.

SQS allows asynchronous processing of work.

### SQS Settings

- Delivery delay: default is 0, can be set to 15 minutes. E.g. delay in sending a message to users that the order was received.
- Message size: Can be up to 256KB of text in any format.
- Encryption: messaging in-transit are encrypted by default. Can be opt-in to encrypt at rest.
- Message retention: default is 4 days. Can be set between 1 minute and 14 days.
- Polling types: there is short and long. Short is a quick check for messages, long is a long check for messages. Long = connect and wait for a little bit.
- Queue depth: can be a trigger for autoscaling.

### Visibility Timeout

- You can have a message in the queue that is hidden for X amount of time (30s by default). This is the visability timeout.
- If the backend EC2 instance is down before the message is processed, the message will not be removed from the queue if there is no success message within that timeout window.

Exam tips:

- On the exam, look for long polling.
- It is vital to understand the SQS settings. Why would I make that change?
- 14 day maximum.
- Know how to troubleshoot based on the settings.
- Know difference between long and short term polling.
- Size: Message is 256KB of text in any format.

## Sidelining Messages With Dead-Letter Queue

What happens if the happy user made a mistake and the FE didn't validate that payload before it was sent to the queue?

You can instead set up a dead-letter queue. It allows us to temporarily sideline our problematic messages and keep it out of our main queue.

Exam tips:

- The receive count also moves over to the dead-letter queue.
- It is import to set up a CloudWatch alarm to monitor queue depth on the dead letter queue.
- DLQs are just special SQS queues.
- Same retention window. Messages will be help up to 14 days.
- Usable with SNS. You can use SQS DLQ for SNS topics.

## Ordered Messages with a FIFO Queue

First in, first out.

There are two big gotchas with SQS:

1. By default, SQS is best-effort ordering. It is possible to get duplicates and messages out of order.
2. SQS FIFO guarantees ordering and no dupicates.

### Standard vs FIFO

For Standard:

- Best-effort ordering.
- Duplicate messages.
- Nearly unlimited transactions per second.

For FIFO:

- Guaranteed ordering.
- No message duplication.
- 300 messages per second.
- Costs more money.

Exam tips:

- FIFO is the only option for message ordering or avoiding duplications.
- FIFO does not have same level of performance.
- Not the only way to order the messages. You could manage this yourself on your app.
- Message Group ID ensures messages are processes one by one.
- Cost is a bit more to deduplicate and order those messages.

## Deliverying Messages with SNS

SNS is push-based messaging.

- It can deliver information on our behalf to endpoints subscribed to it.
- We have to set up our subscribers e.g. Firehose, SQS, Lambda, email, HTTP(S), SMS, platform app endpoint.
- Message limit 256KB.
- DLQ support. Failed messages delivered to an SQS DLQ.
- FIFO or Standard support. FIFO only supports SQS.
- Encryption in-transit, but also can opt-in for at-rest.
- Access Policy: resource policy can be added to a topic, similar to S3.
- Compares to SQS, won't be so heavily featured on the exam.
- Can do "fan-out" when pushing a message to multiple SQS queues.

Exam tips:

- Push: think SNS.
- CloudWatch and SNS are best friends for alerts that something happened.
- You'll need to know all subscriber options.
- No do-overs. Only HTTP(S) has retry capability.

Don't be tricked into using SES - this is more for marketing or bulk emails.

## Fronting Applications with API Gateway

A fully managed service that allows you to easily publish, create, maintain, monitor and secure your API.

It allows us to put a safe "front door" on your application.

Features to know:

- Security: allows you to easily protect your endpoints by attaching a Web Application Firewall (WAF)
- Stop Abuse: easily implement a rate limiting mechanism.
- Ease of use: easy to setup.

Exam tips:

- Whenever you hear creating or managing API, think about the API Gateway.
- Helps with DDoS thanks to the WAF.
- Multiple versions of the API with staging.
- No baking: stops you from putting your AWS credentials into the code.
