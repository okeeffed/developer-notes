---
menu: System Design
name: Distributed Data
---

# Distributed Data

With distributed data, we want to aim to provide/ "Scalability, Fault Tolerance/High Availability, Latency (think for global network requests)"

These topics cover the following:

1. Replication/Partitioning (Sharding)
2. Failover: electing a new leader during the process but handling potential issues with asynchronous writes & discarding writes.
3. "Split Brain" in the scenario when 2 nodes think they are the leader.

## Replication

The purpose of replication is to provide high availability, disconnected operation, latency and scalability.

There are a number of approaches to replication:

1. Single Leader
2. Multi Leader (all nodes can handles writes)
3. Leaderless

In leaderless replication, clients write to several nodes and write from several nodes in parallel in order to detect & correct nodes with stale data.

Multi leader + leaderless have benefits for facility nodes, network interruptions & latency spikes. The cost for using these is a weak consistency guarentee.

### Sync/Async Replication

Replication can be synchronous/asynchronous.

The help with consistency, there are a few models:

1. Read-after-write consistency
2. Monotonic reads
3. Consistent prefix reads
