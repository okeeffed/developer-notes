---
menu: Kafka
name: Kafka Advanced Config
---

# Kafka Advanced Config

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
