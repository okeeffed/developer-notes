---
menu: Kafka
name: Kafka Administration
---

# Kafka Administration

## File Formats and Indexes

Log Segments are stored at `/data/kafka`. Within message logs, you see individual segment files accrue as messages are produced.

To maintain this over time, you can set file compaction.

You can also delete indexes, and they will populate automatically.

## File Management

The segment we are currently writing to is called the `active segment`. By default, the segment is deleted when it reaches a size of 1 GB or has been inactive for 1 week (whichever comes first).

The Broker has an open file handle to each segment in every partition, even inactive segments. Make sure your operating system can handle so many open files at once.

## Storage Structures

1. Batch Processing and Operational Workloads (Lambda Architecture): View real-time and historical data. This adds difficulty due to the many simultaneous interfaces.
2. Version 1 and Version 2 in parallel (Kappa Architecture): Switch your view as a cut-over. This helps with migration or transitions to continuous jobs.
3. Multi-Cluster (Multiple Consumption): Replicate clusters for scale, ingesting data from different Kafka clusters. The potential upside is bandwidth savings.

## Stream Processing

Stream is a sequence of events. Because Kafka does not rely on an external process framework, any type of stream can exist.

- Credit card transactions
- Stock trades
- Package deliveries
- Network events
- Sensor events in manufacturing equipment
- Emails sent
- Moves in a game

## Data Replication

Multi-Cluster architectures include:

- Hub-And-Spoke: Example being Central Kafka Cluster that connects a London, New York and AWS Kafka Cluster.
- Active-Active: Communication between a US-based Kafka Cluster and EU-based Kafka Cluster.
- Active-Standby: Production Kafka Cluster that connects to a Failover Kafka Cluster.

## MirrorMaker

Can be used for replicating data between two data centers. It's a collection of consumers in a consumer group.

The group reads data from the set of topics you specify. Then MirrorMaker creates the thread and sends it to the target cluster. It creates one thread per consumer.

For configuration, MirrorMaker has a few options. You typically install it as a service and run it at the destination data center. The biggest task is monitoring lag to ensure the destination cluster is not falling behind the source.

## Cluster and Broker Monitoring

Metrics can be accessed from:

- Java Management Extensions (JMX)
- Yammer Metrics

`get /brokers/ids/3`

Use an Intelligent Platform Management Interface (IPMI) to monitor hardware health.

## Monitoring the Overall Health

Problems:

- Under-replicated partitions
- Hardware failures

## Broker Metrics to Follow

| Name                       | To ask                                           |
| -------------------------- | ------------------------------------------------ |
| ACTIVE CONTROLLER COUNT    | Is the broker the controller?                    |
| REQUEST HANDLER IDLE RATIO | How much load is the broker under?               |
| ALL TOPICS BYTES IN        | Do I need to scale up the number of brokers?     |
| ALL TOPICS BYTES OUT       | How high is consumer traffic?                    |
| ALL TOPICS MESSAGES IN     | How many messages per second?                    |
| PARTITION COUNT            | How many partitions are assigned to be a broker? |
| LEADER COUNT               | How many partitions is this broker a leader for? |
| OFFLINE PARTITIONS         | How many brokers have no leader                  |
| REQUEST METRICS            | How many requests are going to the broker?       |
