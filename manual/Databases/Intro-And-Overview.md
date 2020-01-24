---
menu: Databases
name: Intro and Overview
---

# Intro and Overview

This sections covers some of the concepts behind databases and the ins + outs.

## Resources

### Websites

1. [Awesome Databases](https://github.com/numetriclabz/awesome-db)
2. [Popular Databases](https://www.keycdn.com/blog/popular-databases)
3. [Relational vs Non-Relational](https://www.dataversity.net/review-pros-cons-different-databases-relational-versus-non-relational/)
4. [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem)
5. [ACID properties](https://en.wikipedia.org/wiki/ACID)

### Books

- [Designing Data-Intensive Applications](https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications)
- [Database Internals](https://www.goodreads.com/book/show/44647144-database-internals)

## Different Databases

## In-memory cache databases

- [Redis](https://redis.io/): Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

## Relational databases

- [Postgres](https://github.com/postgres/postgres): PostgreSQL is an advanced object-relational database management system that supports an extended subset of the SQL standard, including transactions, foreign keys, subqueries, triggers, user-defined types and functions. This distribution also contains C language bindings.

## Non-relational wide column store databases

- [Cassandra](https://cassandra.apache.org/): Apache Cassandra is a highly scalable, high-performance distributed database designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. A top level Apache project born at Facebook and built on Amazon’s Dynamo and Google’s BigTable, is a distributed database for managing large amounts of structured data across many commodity servers, while providing highly available service and no single point of failure. Apache Cassandra offers capabilities that relational databases and other NoSQL databases simply cannot match such as: continuous availability, linear scale performance, operational simplicity and easy data distribution across multiple data centers and cloud availability zones.

## CAP Theorem

(From Wikipedia)

In theoretical computer science, the CAP theorem, also named Brewer's theorem after computer scientist Eric Brewer, states that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees:

1. Consistency: Every read receives the most recent write or an error
2. Availability: Every request receives a (non-error) response, without the guarantee that it contains the most recent write
3. Partition tolerance: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes

When a network partition failure happens should we decide to:

1. Cancel the operation and thus decrease the availability but ensure consistency
2. Proceed with the operation and thus provide availability but risk inconsistency

The CAP theorem implies that in the presence of a network partition, one has to choose between consistency and availability. Note that consistency as defined in the CAP theorem is quite different from the consistency guaranteed in ACID database transactions.

## ACID Properties

(From Wikipedia)

[ACID](https://en.wikipedia.org/wiki/ACID) (atomicity, consistency, isolation, durability) is a set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc. In the context of databases, a sequence of database operations that satisfies the ACID properties (and these can be perceived as a single logical operation on the data) is called a transaction. For example, a transfer of funds from one bank account to another, even involving multiple changes such as debiting one account and crediting another, is a single transaction.
