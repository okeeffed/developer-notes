---
menu: Kafka
name: Kafka Advanced Config
---

# Kafka Advanced Config

## Advanced Producers

Topics on advanced use for producers.

## Idempotent Producers

To eliminate the possibility of duplicate messages, you cam set `enable.idempotence` to `true` and the consumer will delete duplicate messages.

### Impotent Producer Config

- ENABLE_IDEMPOTENCE=TRUE
- ACKS=ALL
- RETRIES=MAX_VALUE
- MAX_IN_FLIGHT_REQUESTS=5

There are over 50 producer configs. Kafka docs indicates whether certain configurations are high importance or low.

Idempotence is listed as low importance due to its effect on efficiency. However, you can use this to ensure your messages arrive in their entirety if safety is a concern.

## Batch Compression

Sending a batch as opposed to individual messages is very important in Kafka. Sending larger batches with compression will significantly improve throughput.

### Batch Size and Timing

When multiple records are sent to the same partition, the producer can batch them together. The `batch.size` config controls the amount of memory used for each batch. The `linger.ms` config will help increase the batch size to get the best compression and throughput.

## Serializer

Custom serialization can be used to translate your data in a format that can be stored, transmitted and retrieved.

- Avro serializer: io.confluent.kafka.serializers.KafkaAvroSerializer
- org.apachage.kafka.common.serialization.StringSerializer

The producer serializers, while the consumer deserializers.

## Producer Buffer Memory

If producer is producing messages faster than the broker can receive those messages, the messages will be sent to a bugger memory on the producer.

- max.block.ms: IF producer is sending messages to the broke and the broker is not responding for 60 seconds, you will receive an exception error. This can occur if the broker's buffer is filled or the broker is down.

## Advanced Consumers

Topics on advanced use for consumers.

## Reading Duplicate Messages

- fetch.min.bytes/fetch.max.bytes: Min and max batch size of the request from the consumer. The default are 1 byte and 50 MB.
- max.poll.records: The maximum number of messages the consumer receives when polling. The default is 500.
- max.partition.fetch.bytes: The max amount of data the broker returns to the consumer. The default is 1MB.

```java
// enable.auto.commit=true
while (true) {
  List<Records> batch = consumer.poll(Duration.ofMillis(100));
  doSomethingSynchronous(batch);
}

// enable.auto.commit=false
while (true) {
  batch += consumer.poll(Duration.ofMillis(100));
  if (isReady(batch)) {
    doSomethingSynchronous(batch);
    consumer.commitSync();
  }
}
```

## Tracking Offsets

When a consumer updates its current position in the partition, it's called a `commit`. A consumer produces a message to the `__consumer_offsets` topic. If the consumer crashes, it triggers a rebalance and the consumer may be assigned a new set of partitions.

## Partition Rebalancing

Types for a topic with 8 partitions could be `Round Robin` or `Range`.

Moving partition ownership from one consumer to another is called a rebalance. This allows us to easily and safely add and remove consumers. Outside of adding or removing consumers, we don't want to to rebalance.

## Consumer Group Coordinator

One of the brokers in the Kafka cluster is established as a consumer group coordinator. That broker continuously reaches out to all consumers and checks if they have a heartbeat.

This broker is also responsible for making the appropriate adjustments when a consumer fails or a new consumer joins the group.

Example could be that the first consumer reads messages on brokers 1 & 3 while another consumer reads from broker 2. Broker 3 coordinates all of this.
