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

The MapReduce layer consists of:

1. MapReduce Java API to write workflows
2. Services to manage these workflows and provide the scheduling, distribution and parallelizing.

### MapReduce jobs

1. Splits the data sets into independent chunks.
2. Data sets are processed by map tasks in parallel.
3. MapReduce sorts the output of map jobs and feeds them to reduce tasks.
4. Both input and output of map and reduce are stored on the file system.
5. Framework takes care of scheduling tasks, monitoring them and re-executing failed tasks.
6. MapReduce framework and HDFS are running on the same set of nodes. Tasks are scheduled on nodes where data is already present, hence yielding high bandwidth across the cluster.

### Inputs and Outputs of a MapReduce Job

- Exclusively operates on key-value pairs.
- Input is large scale data set which benefits from parallel processing and does not fit on a single machine.
- Input split into independent data sets and map function produces key-value pair for each record in the data set.
- Output of mappers is shuffled, sorted, grouped and passed to the reducers.
- Reducer function applied to sets of key-value pairs that share the same key. The reducer function often agregates the value for the pairs with the same key.

It is important to know that:

1. Almost all data can be mapped to a key-value pair using a map function.
2. Keys and values can be of any type. If using a custom type, the type must be implement a writable interface.
3. `MapReduce` cannot be used if a computation of a value depends on a previously computed value. Recursive funcs like Fibonnaci cannot be implemented using `MapReduce`.

This is an example of a word count `MapReduce` job.

![Example of MapReduce job](https://www.guru99.com/images/Big_Data/061114_0930_Introductio1.png)

The order of a job goes as the following:

1. Input
2. Splitting
3. Mapping
4. Shuffle
5. Reduce
6. Final Result

### Example Applications of MapReduce

1. Counting votes by processing data from each polling booth.
2. Aggregating electricy consumption from data points collected across a large geographical area.
3. Used by Google Maps to calculate nearest neighbour.
4. Performing statistical aggregate type functions on large data sets.
5. Counting number of href links in web log files for clickstream analysis.

### Writing and Running Hadoop MapReduce Jobs

Typicall jobs are written in Java, but can also be written using:

1. Hadoop Streaming: A utility which allows users to create an run MapReduce jobs with any executables.
2. Hadoop Pipes: C++ API to implement MapReduce applications

### Hadoop Job configurations

Consists of:

- Input and output locations on HDFS.
- Map and reduce functions via implementations of interfaces or abstract classes.
- Other job parameters.

A Hadoop job client submits the job (jar/executable) and configuration to the `ResourceManager` in `YARN` which distributes them to the workers and performs functions like scheduling, monitoring and providing status and diagnostic information.

## Yet Another Resource Negotiator (YARN)

Introduced in Hadoop 2.0, YARN provides a general processing platform not constrained to `MapReduce`.

`Global ResourceManager` is the authority that delegates resources among the applications in the system.

It has a `NodeManager` on each node that is responsible for containers, monitoring their resource usage (CPU, memory, disk, network) and reporting this data to the `ResourceManager`.

The `ResourceManager` has two components:

1. Scheduler - responsible for allocating resources the various running applications.
2. ApplicationsManager - responsible for accepting job-submissions, negotiating the first container for executing the application-specific `ApplicationMaster` and provides the service for restarting the `ApplicationMaster` on failure.

The `ApplicationMaster` has the responsibility of negotiating appropriate resource containers from the `Scheduler`, tracking their status and monitoring progress.

### Container

Note that for YARN, a `container` represents a collection of physical `resources`. Also could mean CPU cores, disk along with RAM.

## Hadoop Ecosystem

![Ecosystem](https://i.ytimg.com/vi/1WY63n2XRLM/maxresdefault.jpg)

5 functions of Hadoop ecosystem:

1. Data management using HDFS, HBase and YARN
2. Data access with MapReduce, Hive and Pig
3. Data ingestion and integration using Flume, Sqoop, Kafka and Storm
4. Data monitoring using Ambari, Zookeeper and Oozie
5. Data governance and security using Falcon, Ranger and Knox
