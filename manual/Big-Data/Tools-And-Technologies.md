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
- Following the `write once, read multiple` approach simplifying data coherency issues and enabling high throughput data access. Example is a web crawler application.
- Optimized for throughput rather than latency. This makes it suited for long batch operations on large scale data rather than interactive analysis on streaming data.
- Moving computation near the data reduces network congestion and increses throughput. HDFS provides interfaces or applications to move closer to data storage.
