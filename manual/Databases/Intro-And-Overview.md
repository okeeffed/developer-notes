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
6. [BASE: Eventual consistency](https://en.wikipedia.org/wiki/Eventual_consistency)
7. [NewSQL Databases](https://en.wikipedia.org/wiki/NewSQL)
8. [Top NewSQL DBs](https://en.wikipedia.org/wiki/NewSQL)
9. [Column-Oriented DBMS](https://en.wikipedia.org/wiki/Column-oriented_DBMS)
10. [DB Rankings](https://db-engines.com/en/ranking)
11. [Express Response Times Example](https://github.com/node-influx/node-influx/tree/master/examples/express_response_times)

### Books

- [Designing Data-Intensive Applications](https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications)
- [Database Internals](https://www.goodreads.com/book/show/44647144-database-internals)

## Key-Value databases

Key-value stores are probably the simplest form of database management systems. They can only store pairs of keys and values, as well as retrieve values when a key is known.

These simple systems are normally not adequate for complex applications. On the other hand, it is exactly this simplicity, that makes such systems attractive in certain circumstances. For example resource-efficient key-value stores are often applied in embedded systems or as high performance in-process databases.

An extended form of key-value stores is able to sort the keys, and thus enables range queries as well as an ordered processing of keys.

Many systems provide further extensions so that we see a fairly seamless transition to document stores and wide column stores.

Note: MemSQL and VoltDB also falls under this category but is denoted under `NewSQL`.

- [Redis](https://redis.io/): Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster. The name Redis means REmote DIctionary Server.
- [etcd](https://github.com/etcd-io/etcd): etcd is a distributed reliable key-value store for the most critical data of a distributed system, with a focus on being simple, secure, fast and reliable.

## Graph databases

Graph DBMS also called graph-oriented DBMS or graph database represent data in graph structures as nodes and edges, which are relationships between nodes. They allow easy processing of data in that form and simple calculation of specific properties of the graph - such as the number of steps needed to get from one node to another node.

Graph DBMSs usually don't provide indexes on all nodes, direct access to nodes based on attribute values is not possible in these cases.

- [Neo4j](https://github.com/neo4j/neo4j): Neo4j is the world’s leading Graph Database. It is a high performance graph store with all the features expected of a mature and robust database, like a friendly query language and ACID transactions. The programmer works with a flexible network structure of nodes and relationships rather than static tables — yet enjoys all the benefits of enterprise-quality database. For many applications, Neo4j offers orders of magnitude performance benefits compared to relational DBs.
- OrientDB

## Time-Series databases

A Time Series DBMS is a database management system that is optimized for handling time series data: each entry is associated with a timestamp.

For example, time series data may be produced by sensors, smart meters or RFIDs in the so-called Internet of Things, or may depict the stock tickers of a high frequency stock trading system.

Time Series DBMS are designed to efficiently collect, store and query various time series with high transaction volumes. Although time series data can be managed with other categories of DBMS (from key-value stores to relational systems), the specific challenges often require specialized systems.

E.g. a query like 'SELECT SENSOR1_CPU_FREQUENCY / SENSOR2_HEAT' joins two time series based on the overlapping areas of time for each and outputs a single composite time series.

- [InfluxDB](https://en.wikipedia.org/wiki/InfluxDB): InfluxDB is an open-source time series database (TSDB) developed by InfluxData. It is written in Go and optimized for fast, high-availability storage and retrieval of time series data in fields such as operations monitoring, application metrics, Internet of Things sensor data, and real-time analytics. It also has support for processing data from Graphite.
- [Prometheus](https://github.com/prometheus/prometheus): Prometheus, a Cloud Native Computing Foundation project, is a systems and service monitoring system. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays the results, and can trigger alerts if some condition is observed to be true.

## Search Engine databases

Search engines are NoSQL database management systems dedicated to the search for data content.

- [Splunk](https://en.wikipedia.org/wiki/Splunk): Splunk (the product) captures, indexes, and correlates real-time data in a searchable repository from which it can generate graphs, reports, alerts, dashboards, and visualizations.
- [ElasticSearch](https://en.wikipedia.org/wiki/Elasticsearch): Elasticsearch can be used to search all kinds of documents. It provides scalable search, has near real-time search, and supports multitenancy. "Elasticsearch is distributed, which means that indices can be divided into shards and each shard can have zero or more replicas. Each node hosts one or more shards, and acts as a coordinator to delegate operations to the correct shard(s). Rebalancing and routing are done automatically". Related data is often stored in the same index, which consists of one or more primary shards, and zero or more replica shards. Once an index has been created, the number of primary shards cannot be changed. Elasticsearch is developed alongside a data collection and log-parsing engine called Logstash, an analytics and visualisation platform called Kibana, and Beats, a collection of lightweight data shippers. The four products are designed for use as an integrated solution, referred to as the "Elastic Stack" (formerly the "ELK stack").
- Solr

## Document databases

Document stores, also called document-oriented database systems, are characterized by their schema-free organization of data.

That means:

1. Records do not need to have a uniform structure, i.e. different records may have different columns.
2. The types of the values of individual columns can be different for each record.
3. Columns can have more than one value (arrays).
4. Records can have a nested structure.
5. Document stores often use internal notations, which can be processed directly in applications, mostly JSON.

- [DynamoDB](https://en.wikipedia.org/wiki/Amazon_DynamoDB): Amazon DynamoDB is a fully managed proprietary NoSQL database service that supports key-value and document data structures and is offered by Amazon.com as part of the Amazon Web Services portfolio. DynamoDB exposes a similar data model to and derives its name from Dynamo, but has a different underlying implementation. Dynamo had a multi-master design requiring the client to resolve version conflicts and DynamoDB uses synchronous replication across multiple data centers for high durability and availability.
- [Couchbase](https://en.wikipedia.org/wiki/Couchbase_Server): Couchbase Server, originally known as Membase, is an open-source, distributed (shared-nothing architecture) multi-model NoSQL document-oriented database software package that is optimized for interactive applications. These applications may serve many concurrent users by creating, storing, retrieving, aggregating, manipulating and presenting data. In support of these kinds of application needs, Couchbase Server is designed to provide easy-to-scale key-value or JSON document access with low latency and high sustained throughput. It is designed to be clustered from a single machine to very large-scale deployments spanning many machines.

## Wide column store databases

Wide column stores, also called extensible record stores, store data in records with an ability to hold very large numbers of dynamic columns. Since the column names as well as the record keys are not fixed, and since a record can have billions of columns, wide column stores can be seen as two-dimensional key-value stores.

- [Cassandra](https://cassandra.apache.org/): Apache Cassandra is a highly scalable, high-performance distributed database designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. A top level Apache project born at Facebook and built on Amazon’s Dynamo and Google’s BigTable, is a distributed database for managing large amounts of structured data across many commodity servers, while providing highly available service and no single point of failure. Apache Cassandra offers capabilities that relational databases and other NoSQL databases simply cannot match such as: continuous availability, linear scale performance, operational simplicity and easy data distribution across multiple data centers and cloud availability zones.
- HBase

## Relational databases

Relational database management systems (RDBMS) support the relational (=table-oriented) data model. The schema of a table (=relation schema) is defined by the table name and a fixed number of attributes with fixed data types. A record (=entity) corresponds to a row in the table and consists of the values of each attribute. A relation thus consists of a set of uniform records.

The table schemas are generated by normalization in the process of data modeling.

Certain basic operations are defined on the relations:

- Classical set operations (union, intersection and difference)
- Selection (selection of a subset of records according to certain filter criteria for the attribute values)
- Projection (selecting a subset of attributes / columns of the table)
- Join: special conjunction of multiple tables as a combination of the Cartesian product with selection and projection.

- [Postgres](https://github.com/postgres/postgres): PostgreSQL is an advanced object-relational database management system that supports an extended subset of the SQL standard, including transactions, foreign keys, subqueries, triggers, user-defined types and functions. This distribution also contains C language bindings.
- [MySQL](https://en.wikipedia.org/wiki/MySQL):
- [MariaDB](https://en.wikipedia.org/wiki/MariaDB): MariaDB is a community-developed, commercially supported fork of the MySQL relational database management system (RDBMS), intended to remain free and open-source software under the GNU General Public License. Development is led by some of the original developers of MySQL, who forked it due to concerns over its acquisition by Oracle Corporation in 2009. MariaDB intended to maintain high compatibility with MySQL, ensuring a drop-in replacement capability with library binary parity and exact matching with MySQL APIs and commands. However, new features diverge more. It includes new storage engines like Aria, ColumnStore, and MyRocks.
- [Amazon Redshift](https://en.wikipedia.org/wiki/Amazon_Redshift): Amazon Redshift is a data warehouse product which forms part of the larger cloud-computing platform Amazon Web Services. Redshift differs from Amazon's other hosted database offering, Amazon RDS, in its ability to handle analytic workloads on big data data sets stored by a column-oriented DBMS principle.
- [Amazon RDS](https://en.wikipedia.org/wiki/Amazon_Relational_Database_Service): Amazon Relational Database Service (or Amazon RDS) is a distributed relational database service by Amazon Web Services (AWS). It is a web service running "in the cloud" designed to simplify the setup, operation, and scaling of a relational database for use in applications. Administration processes like patching the database software, backing up databases and enabling point-in-time recovery are managed automatically. Scaling storage and compute resources can be performed by a single API call as AWS does not offer an ssh connection to RDS instances.

## NewSQL databases

NewSQL is a class of relational database management systems that seek to provide the scalability of NoSQL systems for online transaction processing (OLTP) workloads while maintaining the ACID guarantees of a traditional database system.

- [MemSQL](https://www.memsql.com/): A modern relational database for cloud and on-premises that delivers immediate insights for modern applications and analytical systems. MemSQL also comes with tiered storage. Most NoSQL databases are disk-first, with some support for in-memory operations. MemSQL includes both and allows you to flexibly manage memory vs. disk usage.
- [CockroachDB](https://github.com/cockroachdb/cockroach): CockroachDB is a distributed SQL database built on a transactional and strongly-consistent key-value store. It scales horizontally; survives disk, machine, rack, and even datacenter failures with minimal latency disruption and no manual intervention; supports strongly-consistent ACID transactions; and provides a familiar SQL API for structuring, manipulating, and querying data.
- [VoltDB](https://www.voltdb.com/): VoltDB is an in-memory database designed by Michael Stonebraker (who earlier designed Ingres and PostgreSQL), Sam Madden, and Daniel Abadi. It is an ACID-compliant RDBMS that uses a shared nothing architecture. VoltDB is a NewSQL relational database that supports SQL access from within pre-compiled Java stored procedures. The unit of transaction is the stored procedure, written in Java interspersed with SQL. VoltDB relies on horizontal partitioning down to the individual hardware thread to scale, k-safety (synchronous replication) to provide high availability, and a combination of continuous snapshots and command logging for durability (crash recovery).

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

### Atomicity

Transactions are often composed of multiple statements. Atomicity guarantees that each transaction is treated as a single "unit", which either succeeds completely, or fails completely: if any of the statements constituting a transaction fails to complete, the entire transaction fails and the database is left unchanged. An atomic system must guarantee atomicity in each and every situation, including power failures, errors and crashes. A guarantee of atomicity prevents updates to the database occurring only partially, which can cause greater problems than rejecting the whole series outright. As a consequence, the transaction cannot be observed to be in progress by another database client. At one moment in time, it has not yet happened, and at the next it has already occurred in whole (or nothing happened if the transaction was cancelled in progress).

An example of an atomic transaction is a monetary transfer from bank account A to account B. It consists of two operations, withdrawing the money from account A and saving it to account B. Performing these operations in an atomic transaction ensures that the database remains in a consistent state, that is, money is neither lost nor created if either of those two operations fail.

### Consistency

Consistency ensures that a transaction can only bring the database from one valid state to another, maintaining database invariants: any data written to the database must be valid according to all defined rules, including constraints, cascades, triggers, and any combination thereof. This prevents database corruption by an illegal transaction, but does not guarantee that a transaction is correct. Referential integrity guarantees the primary key – foreign key relationship.

### Isolation

Transactions are often executed concurrently (e.g., multiple transactions reading and writing to a table at the same time). Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially. Isolation is the main goal of concurrency control; depending on the method used, the effects of an incomplete transaction might not even be visible to other transactions.

### Durability

Durability guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure (e.g., power outage or crash). This usually means that completed transactions (or their effects) are recorded in non-volatile memory.

## BASE: Eventual Consistency

(From Wikipedia)

Eventual consistency is a consistency model used in distributed computing to achieve high availability that informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that item will return the last updated value. Eventual consistency, also called optimistic replication, is widely deployed in distributed systems, and has origins in early mobile computing projects. A system that has achieved eventual consistency is often said to have converged, or achieved replica convergence. Eventual consistency is a weak guarantee – most stronger models, like linearizability are trivially eventually consistent, but a system that is merely eventually consistent does not usually fulfill these stronger constraints.

Eventually-consistent services are often classified as providing BASE (Basically Available, Soft state, Eventual consistency) semantics, in contrast to traditional ACID (Atomicity, Consistency, Isolation, Durability) guarantees. In chemistry BASE is opposite to ACID, which helps remembering the acronym. According to the same resource, these are the rough definitions of each term in BASE:

- (B)asically (A)vailable: basic reading and writing operations are available as much as possible (using all nodes of a database cluster), but without any kind of consistency guarantees (the write may not persist after conflicts are reconciled, the read may not get the latest write).
- (S)oft state: without consistency guarantees, after some amount of time, we only have some probability of knowing the state, since it may not yet have converged.
- (E)ventually consistent: If the system is functioning and we wait long enough after any given set of inputs, we will eventually be able to know what the state of the database is, and so any further reads will be consistent with our expectations.

Eventual consistency is sometimes criticized as increasing the complexity of distributed software applications. This is partly because eventual consistency is purely a liveness guarantee (reads eventually return the same value) and does not make safety guarantees: **an eventually consistent system can return any value before it converges.**

## Column-oriented DBMS

A column-oriented DBMS (or columnar database management system) is a database management system (DBMS) that stores data tables by column rather than by row. Practical use of a column store versus a row store differs little in the relational DBMS world. Both columnar and row databases can use traditional database query languages like SQL to load data and perform queries.

Both row and columnar databases can become the backbone in a system to serve data for common extract, transform, load (ETL) and data visualization tools. However, by storing data in columns rather than rows, the database can more precisely access the data it needs to answer a query rather than scanning and discarding unwanted data in rows. Query performance is increased for certain workloads.
