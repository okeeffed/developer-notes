---
name: Tools and Technologies
menu: Big Data
---

# Big Data Tools and Technologies

## Apache Hadoop

Hadoop is a very significant player in the Big Data landscape.

It's an open-sourced framework for distributed storage and processing of very large data sets.

Originally built in 2005 by a Yahoo engineer.

It was inspired by Google's `MapReduce` and the `Google File System` papers.

It was written in Java to implement the `MapReduce` programming model for scalable, reliable and distributed computing.

The framework is composed of:

1. Hadoop Common: Contains libraries and utilities needed by other Hadoop modules.
2. Hadoop Distributed File System (HDFS): A distributed file system that stores data on the commodity machines, providing very high aggregate bandwidth across the cluster.
3. Hadoop MapReduce: A programming model for large-scale data processing.
4. Hadoop YARN: A resource management platform responsible for managing compute resources in clusters and using them for the scheduling of users' applications.

## HDFS

- Structured like a regular Unix file system with data storage distributed across several machines in the cluster.
- Data service that sits atop regular file systems, allowing a fault tolerant, resilient clustered approach to storing and processing data.
- Fault-tolerant: Detection of faults and quick automatic recovery is a core architectural goal.
- Tuned to support large files. Typically a file is GB or TB and can support tens of millions of files by scaling to hundreds of nodes in a cluster.
- Follows `write once, read multiple` approach, simplifying data coherency issues and enabling high throughput data access. Example is a web crawler application.
- Optimized for throughput rather than latency. This makes it suited for long batch operations on large scale data rather than interactive analysis on streaming data.
- Moving computation near the data reduces network congestion and increses throughput. HDFS provides interfaces or applications to move closer to data storage.

### Architecture

1. Leader-follower architecture, where `Namenode` is the leader and `Datanodes` are slaves.
2. Files split into blocks, and blocks are stored on datanodes (generally one per node within cluster).
3. Datanodes manage storage attached to nodes that they run on.
4. Namenode controls all metadata, including what blocks make up a file and which datanode the blocks are stored on.
5. Namenode executres file system operations like opening, closing and renaming files and directories.
6. Datanodes serve read and write requests from the clients.
7. Datanodes perform block creation, deletion, replication upon instruction from the Namenode.
8. Namenode and Datanode are Java software designed to run on commodity hardware that supports Java.
9. Usually a cluster contains a single Namenode and multiple datanodes, one each for each node in the cluster.

![HDFS Architecture](https://hadoop.apache.org/docs/r1.2.1/images/hdfsarchitecture.gif)

The `Namenode` makes all decisions around replication of blocks for data durability. Periodically receives heartbeat and `BlockReport` from datanodes in the cluster. Receipt of heartbeat is the health check.

## Hadoop MapReduce

A framework that makes it easy to write applications which can consume huge amouts of data.

It allows processing in parallel on large clusters consisting of thousands of nodes in a manner that is reliable and fault tolerant.
