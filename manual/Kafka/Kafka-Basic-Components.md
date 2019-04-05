---
name: Kafka Basic Components
menu: Kafka
---

# Kafka Basic Components

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
