---
name: Kafka Basic Terms
menu: Kafka
---

# Kafka Basic Terms

## Messages

The base unit of data within Kafka is called a message. You could think of this as a `row` or `record` if you are familiar with databases. A message is simply an array of bytes as far as Kafka is concerne, so it does not need to be a specific format.

A message can have an optional `key` which again is simply an array of bytes. This key is used when messages are to be writting ot partitions in a more controlled manner.

## Batches

For efficiency, messages are written into Kafka in batches. A `batch` is just a collection of messages, all of which are being produced to the same `topic` and `partition`. This of course is a tradeoff between latency and throughput.

The larger the batch, the more messages per unit of time that can be handled but the longer it takes for the propagation of an individual message.

Batches are typically compressed for more efficient data transfer and storage at the cost of processing power.

## Schemas

While messages are byte arrays to Kafka, it is recommended to add additional structure in the form of a schema to be imposed on the message content so it can be easily understood.

There are many options for this depending on application needs. JSON and XML are easy and human readable but lack features such as robust type handling and compatibility between schema versions.

Most Kafka devs favour the use of Apache Avro - a serialization framework originally designed for Hadoop. Avro has compact serialisation, schemas separate from message payloads and strong data typing and schema evolution with backward/forward compatibility.

It is an imperative to choose a consistent data format.

## Topics

Topics are the categorisation of messages. Thing of this as a database table or folder in a filesystem.

## Partitions

Topics are additionally broken down into a number of `partitions`. Consider this analagous to the "commit log" where messages are written to it in an append-only fashion. A topic typically has multiple partitions, so there is no guarantee of message time-ordering across the entire topic - just within a single partition.

Partitions are also used to provide redundancy and scalability.

Each partition itself can be run from a separate server to enable horizontal scalability and improve performance.

## Streams

`Stream` is often used when discussing data within systems like Kafka. Often a stream is considered to be a single topic of data, irrespective of the number of partitions. This represents a stream of data going from producers to consumers.

## Producers

Producers create new messages. In alternative pub/sub systems, these can also be name `publishers` or `writers`. In general, a message is produced to a specific topic. By default, the producer does not care what partition a specific message is written to and will balance messages over all partitions of a topic evenly.

There are cases when a producer will direct a message to a particular partition, normally makig use of the message key and a partitioner that will generate a hash of the key and map it to a specific partition to ensure all messages produced with a specific key will map to a specific partition.

## Consumers

Consumers read messages. These can also be referred to as `subscribers` or `readers` in other pub/sub systems.

These guys subscribe to one or more topics and reads messages in order they were produced. Each message in a given partition has a unique offset, and by storing that offset of the last consumed message for each partition in either Zookeeper or Kafka itself, a consumer can stop and restart without losing its place.

## Consumer Group

Consumers work as part of a `consumer group`, which is one of more consumers that work together to consume a topic. This group assures that each partition is only consumed by one member.

## Ownership

This occurs when the mapping a consumer to a partition. In this way, consumers can scale horizontally to consume topics with a large number of messages. Additionally, if a consumer fails then there is redundancy.

## Brokers

A single Kafka server is referred to as a `broker`. The broker receives messages from producers, assigns offets to them and commits the messages to storage on disk.

The broker also service consumers. It respons to fech requests for partionans and respones with messages that have been committed to disk. A single broker could easily handle thousands of partitions and millions of messages per second pending the level of hardware.

## Clusters

Kafka brokers are designed to operate as part of a `cluster`.

## Controller

Within a cluster of brokers, one broker will also function as a cluster `controller` (elected automatically). The controller is responsible for administrative operations:

- Assigning partitions to brokers
- Monitoring health of brokers

A partition is owned by a single broker in the cluster and that broker is called the `leader` of the partition. A partition may be assigned to multiple brokers, which will result in the partition being replaced. This provides redundancy of messages in the partition - such that another broker can take over leadership if there is a broker failure. However, all `consumers` and `producers` operating on that cluster must connect to the leader.

## Retention

This is a key feature of Kafka. Brokers are configured with a default retention for topics, either some period of time or size in bytes. If limits are reached, messaged are expired and deleted so that the retention configured is a minimum amount of data available at any time.

Retention settings can also be set for individual topics. Example: tracking topic might be retained for days, application metrics only for a few hours.

## Log Compacted Retention

If a topic is configured as `log compacted`, it means Kafka will retain only the last message produced with a particular key. This can be useful for data where only the last update is relevant.

## Multiple Clusters

The benefits:

- Segregation of types of data
- Isolation for security requirements
- Multiple datacenters (disaster recovery)

With multiple datacenters, Kafka includes a tool called `MirrorMaker` used for the purpose of copying messages between datacenters. At the core, it is simply a Kafka consumer and producer linked together with a queue. Messages are consumed from one Kafka cluster and produced for another.
