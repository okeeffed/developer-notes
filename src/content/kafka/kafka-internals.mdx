---
menu: Kafka
name: Kafka Internals
---

# Kafka Internals

## Broker

Each broker is assigned an ID. When there are multiple brokers in a cluster (best practice), one is selected as the `Controller`. The Controller will be responsible for electing the leader of the partition.

## Broker Config

| Term                          | Path                                                                       |
| ----------------------------- | -------------------------------------------------------------------------- |
| Broker Config                 | `kafka/config/server.properties`                                           |
| Server Logs                   | `kafka/logs/server.log`                                                    |
| Messages Logs                 | `kafka/data/kafka`                                                         |
| View Nodes in Zookeeper Shell | `kafka/bin/zookeeper-shell.sh zookeeper1:2181/kafka && ls get /controller` |

## Replicas

`Replicas` provide guarantees for the availability of the data. The replicator `factor` provides a way for the Kafka administrator to control the availability of that data in the event of failure. For example, if the replication factor is set to 3, you will have 3 copies of each partition spread across the brokers.

What are the goals for placement of replicas?

- Spread evenly amongst brokers
- Each partition is on a different broker
- Put replicas on different racks

## Handling Requests

Producer or consumer sends request to the Broker and the Broker handles the request in the following way:

1. Acceptor Thread: Creates the connection from client to Broker.
2. Processor Thread: Takes requests from clientss and places them into the request queue.
3. IO Thread: Processes the requests in the requests queue.
4. Request Queue: Requests waiting to be processed.
5. Response Queue: Requests waiting to be sent back to the clients.

## Partitions

Within a broker, a topic can be broken down into multiple partitions (with n-1 partitions being replicas).

- Partitions within a topic are split between brokers.
- Partitions themselves will never be split up.
- Partitions will continue to get larger as the number of messages grow.
- Messages will never be removed from the partition, only appended.
- Messages are stored in the directory specified in the `server.properties` file (log.dirs).
