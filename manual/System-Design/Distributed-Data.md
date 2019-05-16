---
menu: System Design
name: Distributed Data
---

# Distributed Data

With distributed data, we want to aim to provide/ "Scalability, Fault Tolerance/High Availability, Latency (think for global network requests)"

These topics cover the following:

1. Replication/Partitioning (Sharding)
2. Failover: electing a new leader during the process but handling potential issues with asynchronous writes & discarding writes.
3. "Split Brain" in the scenario when 2 nodes think they are the leadeer.
