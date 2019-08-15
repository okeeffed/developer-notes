---
menu: Kafka
name: Kafka At A Glance
---

# Kafka At A Glance

Kafka cluster is a hub that you can plug into that can process millions of messages at a time.

It is a publish/subscribe mechanisms. The nodes of the Kafka cluster are known as brokers. Kafka can also be used for tracking, stream processing, decoupling of components of the databases etc.

## Key terms

| Term             | Definition                                 |
| ---------------- | ------------------------------------------ |
| Producer         | Sends messages to Kafka                    |
| Consumer         | Retrieves messages from Kafka              |
| Stream Processor | Producing messages into output streams     |
| Connector        | Connecting topics to existing applications |

## Messages and Schemas

Message delivery can take at least one of the following methods:

1. At least once: Producer can send the same message more than once. If the message fails or is not acknowledged, the producer can send the message again. The consumer may have to eliminate duplicate messages.
2. At most once: Producer may send a message once and never retry. If the message fails or is not acknowledged, the producer will never send the message again.
3. Exactly once: Even if a producer sends a message more than once, the consumer will only receive the message once.

Kafka can process millions of messages per second. Different consumers may access the same message. This allows you to move away from batch processing and scale infinitely. Another benefit is being able to utilize the data in real time versus keeping it sitting on spinning disk.

## Topics and Partitions

Messages in Kafka are called `Topics`. Topics are divided into partitions, with each message receiving an incremental ID called the offset.

When a message is written:

- Kept for one week (by default)
- Cannot be altered or changed in any way
- ID will increment infinitely (never start over at zero)
- Randomly assigned to a partition, unless key is provided

## Producers and Consumers

A producer is a client that writes data to the cluster in order to eventually get consumed.

Consumer is the application that consumes or reads the messages. The consumer subscribes to one or more topics and reads the messages in the order in which they were produced.

- Acks: Producers can choose whether to receive a confirmation of delivery by setting "acks" (acknowledgements)
- Key: Producers specify a key, indicating that a message will go to the same partition every time
- Consumer Group: To ensure multiple consumers aren't reading the same message, consumer groups map reads to consumers

## Brokers and Clusters

A `broker` receives messages from the producer, assigns offsets, and stores the messages on disk.

Brokers are designed to operate in a cluster, in which one broker is assigned the `controller`.

Brokers will also replicate data across brokers in order to create `fault tolerance`.
