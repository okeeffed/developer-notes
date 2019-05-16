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

### Partitioning

There are a few kinds:

1. Key-range partitioning: keys are sorted and partition owns all keys from some minimum to some maximum. The advantage of efficient range queries, but hot spots occur when frequently accessed keys are close together. Key-range partitions also rebalance dynamically.
2. Hash partitioning: hash function applied to a key and partition owns a range of hashes. Destroys ordering of keys, but more balanced.

### Relationships with the secondary indexes

1. Document-partitioned indexes: secondary index stored in some part as primary key & value. Single partition updated on write, but read of secondary requires scatter/gather across all partitions.
2. Term-partitioned indexes: secondary indexes partitioned seperately but read can happen from single partition.

## Transactions

- Without transactions, susceptible to process crashes, network interruptions, power outages, disk full and unexpected concurrency.
- Transactions help prevent certain race conditions:
  - Dirty reads
  - Dirty writes
  - Read skew
  - Write skew
  - Lost updates
  - Phantom reads

To prevent many of the race conditions, you can create serializable transactions:

1. Execution in serial order.
2. Two-phase locking.
3. Serializable snapshot isolation (SSI).
