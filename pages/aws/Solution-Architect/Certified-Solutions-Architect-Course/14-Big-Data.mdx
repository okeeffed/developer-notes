# 14: Big Data

## Exploring Large Redshift Databases

### The 3 Vs of Big Data

1. Volume: TBs to PBs of data.
2. Variety: Data from a wide range of sources and formats.
3. Velocity: Businesses require speed. Data needs to be collected, stored, processed and analyzed within a short period of time.

### Redshift

Redshift is a fully managed, petabyte-scale data warehouse service in the cloud.

It's a very large relational database traditionally used in big data applications.

- Redshift is big. Can hold up to 16PB of data. This is nice, because you don't need to split up data.
- Relational. You can use your standar SQL and BI tools to interact with it.
- Usage. While Redshift is a fantastic tool for BI apps, it is not a replacement for standard RDS databases.

## Processing Data with EMR (Elastic MapReduce)

### What is ETL?

Extract, transform, load. There was an accompanying example of gold mining for how ETL works.

- Extract from source
- Transform into a format we can use
- Load into data source

### What is EMR?

A managed big data platform that allows you to process vast amounts of data using open-source tools such as Spark, Hive, HBase, Flink, Hudi and Presto.

It is AWS's ETL tool.

### EMR Architecture

When you spin up a EMR cluster, it will live inside of a VPC. The focus is running it on EC2 instances, although it can also run on EKS or Outpost.

EMR will spin up the instances and manage them for us, and store the processed values in S3.

In the dashboard after spinning up the cluster, you can access the application user interface to find the relevant UIs corresponding to the cluster.

From there, you could start organising your ETL workloads.

If you look at the EC2 setup, you'll see that there are 4 EC2 instances (one is a bastion).

Exam tip: it is a collection of open source services. It is managed architecture that AWS helps you get up and running.

Other tips:

- EC2 rules apply: can use RIs and spot instances to reduce costs.
- High level: Understand that EMR is used to process and move data.
- VPC: The architecture lives inside a VPC.

## Streaming Data with Kinesis

### What is Kinesis?

Allows you to ingest, process and analyze real-time streaming data.

> Analogy given was to think of a highway to get you from point A to point B.

There are two major forms:

1. Data Streams: real-time streaming for ingesting data. You're responsible for creating the consumer and scaling the stream.
2. Data Firehose: data transfer tool to get information to S3, Redshift, Elasticsearch or Splunk. Near real-time (within 60s). Plug and play with AWS architecture.

### Kinesis Data Stream

When provisioning data streams, you need to provision and scale how many shards are required to handle messages from the producers.

You also need to manage all the consumers. Consumers are something that take that data in, process it and put it somewhere that you want it.

### Kinesis Data Firehose

Data Firehose is simpler.

- Handles building out the consumer.
- Handles building out the shards.

With Firehose, you send data to the service and it will send it to the services that it supports.

### Kinesis Data Analytics and SQL

This can help with analysing the data as it goes through.

- It is simple to tie Data Analytics into your Kinesis pipeline. It is directly supported by both formats.
- No servers to manage: it is fully managed,real-time serverless service. It will automatically handle scaling and provisioning of needed resources.
- Cost: only pay for what you use.

### Kinesis vs SQS

If we're looking for a message broker, which do we pick?

SQS is a messaging broker that is simple to use and doesn't require much configuration. It doesn't offer real-time message delivery.

Kinesis is more complicated to configure and it mostly used in big data apps. It does provided real-time communication.

Exam tips:

- Real-time, think Kinesis. It it is near-real time, likely more Firehose.
- Transforming Data: Data Analytics is the easiest way to process data going through Kinesis using SQL.
- Scaling: Data Streams does not automatically scale. Data Firehose does.

## Amazon Athena and AWS Glue

### What is Athena?

An interactive query service that makes it easy to analyze data in S3 using SQL.

This allows you to directly query data in your S3 bucket without loading it into a database.

### What is Glue?

A serverless data integration service that makes it easy to discover, prepare and combine data.

It allows you to perform ETL workloads without managing underlying servers. Effectively, it replaces EMR.

### How do they work together?

The architecture diagram for this is simple.

Basically it is an `S3 datalake -> AWS Glue Crawlers -> AWS Glue Data Catalog`.

From here, we have a few options. One is `Amazon Redshift Spectrum`, the other is `Amazon Athena -> Amazon QuickSight`.

Exam tips:

- If you've faced with a serverless SQL option to query out of your bucket, think Athena.
- Both solutions are fully managed serverless solutions.
- Knowing the 3,000-foot view of these services is good enough for this exam.
- While Athena can work by itself, Glue candesign a schema for your data.

## Visualizing data with QuickSight

### What is QuickSight?

Fully managed BI data visualization service. Easily make dashboards and share them with your company.

Where does it fit in? It sits in front of Athena.

The exam tips:

1. If you see a question that talks about sharing your data, interpreting that data or anything related to BI, look for an answer that mentions QuickSight.
2. Need to visualise? Use QuickSight.
3. 3,000-foot view is good enough.

## Analyzing Data with Elasticsearch

### What is Elasticsearch?

Fully managed version of the open-source application Elasticsearch.

It allows you to quickly search over your stored data and analyze the data you get back. Commonly used as part of the ELK stack.

### What can it do?

1. There is input from log files, messages, metrics, config info, documents etc.
2. Elasticsearch allows us to search over all of that content.
3. We can output app monitoring, security info and even management (SIEM), search, infra monitoring.

The exam tips:

1. Elasticsearch = search = logs.
2. Open Source, fully managed service.
