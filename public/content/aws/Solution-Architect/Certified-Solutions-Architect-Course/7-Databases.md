# 7: Databases

## RDS Overview

- Stored in tables
- Rows contains data items
- Colums are fields in the the table

Standard stuff.

The 6 different SQL engines:

1. SQL Server
2. Oracle
3. MySQL
4. PostgreSQL
5. MariaDB
6. Aurora

The advantages:

- Up and running in minutes. Essentially a EC2 instance without access.
- Multi-AZ
- Automated failover capability
- Automated backups

When to use RDS?

- Generally used for OLTP. Processes data from transactions in realtime. All about data processing and completing large numbers of small transactions in real time.
- Not used for OLAP. Processes complex queries to analyze historical data. All about data analysis with lots of data.
- OLAP should be done with a data warehouse like Redshift.

### Multi-AZ RDS

- Separate copy of your production database in another AZ.
- AWS handles this for you.
- All database types except Aurora can be configured for Multi-AZ. Aurora is always multi-AZ.
- In an unplanned failure or maintenance, Amazon handle all the DNS and point to the failover secondary.
- RDS will automatically fail over to the standby during a failure so database operations can resume quickly without administrative intervention.
- Multi-AZ is for disaster recovery, not for improving performance. For that, you need read replicas.

The exam tips:

1. Remember the 6 different database types.
2. RDS for OLTP workloads.
3. Not suitable for OLAP.

### Increasing Read Performance

- Read replica is a read-only copy of the primary database.
- Great for read-heavy workloads and takes the load off your primary database.
- Read replica can be cross-AZ and cross-region.
- Each read replica has its own DNS endpoint.
- Replica can be promoted to own database. This could be something you wanted to do for OLAP.
- Requires automated backups.
- Multiple read replicas supported.

Exam tips:

- Multi-AZ: Exact copy of prod in another AZ. Used for disaster recovery. In the event of failure ERS will automatically fail over to the standby instance.
- Read replica: read-only copy of primary db in same AZ, cross-AZ or cross-region. Used to increase/scale read performance.

## Amazon Aurora

- Amazon's propriatory database. MySQL/PostgresSQL-compatible relational db engine.
- Combines speed and availability of high-end commercial dbs with simplicity and cost-effectiveness of open-source dbs.
- 5x better performance than MySQl and 3x of PostgresQL.
- Starts with 10GB in size and scales in 10GB increments.
- Compute resources can scale up to 96 vCPUs and 768GB of memory.
- 2 copies of data are contained in each AZ, with a minimum of 3 AZs and 6 copies of your data.

### Scaling Aurora

- Transparently handle the loss of up to 2 copies of data without affecting database write availability and up to 3 copies without affecting read availability.
- Storage is self-healing. Data blocks and disks are continuously scanned for errors and repaired automatically.

### Aurora Read Replicas

- Aurora replicas: up to 15 read replicas.
- MySQL: Up to 5 read replicas.
- PostgresSQL: Up to 5 read replicas.

Things to note with Aurora vs MySQL replicas:

1. Replication for Aurora async (but ms), seconds for MySQL.
2. Perf impact is low for aurora but high for MySQL.
3. Replication in-region for Aurora, cross-region for MySQL.
4. Act as failover target (no data loss) with potential minutes for MySQL.
5. Automated failover for Aurora, not MySQL.
6. MySQL has support for user-defined replication delay and support for different data or schema, Aurora does not.

### Aurora Serverless

On-demand, auto-scaling configuration for the MySQL and PostgresSQL compatible editions of Amazon Aurora.

The cluster automatically starts up, shuts down and scales capacity up or down based on app needs.

Serverless use-cases: relatively simple, cost-effective option for infrequent, intermittent or unpredictable workloads.

The five exam tips:

1. 2 copies of data are contained in each AZ, with a min of 3 AZs and 6 copies.
2. Can share Aurora snapshots with other AWS accounts.
3. 3 types of replicas available: Aurora, MySQL and Postgres. Automate failover only available on Aurora.
4. Aurora has auto-backups turned on by default. You can also take snapshots with Aurora and share with other AWS accounts.
5. Use serverless for simple, cost-effective option for infrequent, intermittent or unpredicatable workloads.

## DynamoDB Overview

Fast and flexible NoSQL database. For apps that need consistent, single-digit millisecond latency at any scale.

It is a fully managed database and supports both document and key-value data models. Great for mobile, web, gaming, ad-tech, IoT and many other apps.

Facts:

- Stored on SSD storage.
- Spread across 3 geographically distinct data centers.
- Eventually consistent reads (default).
- Can opt-in for strongly consistent reads.

Eventual: Consistency reached within one second.
Strongly: Returns a result that reflects all writes that recieved a successful response prior to the read. Don't have to wait a second.

### DynamoDB Accelerator (DAX)

- Fully managed, highly available in-memory cache.
- 10x performance improvement.
- Reduces request time from ms to microsconds - even under load.
- No need for developers to manage caching logic.
- Compatible with DynamoDB API calls.

As opposed to usual cache mechanism where you check the cache first, then check the database, DAX will check database for you if data not in cache.

- Pay-per-request pricing.
- Balance cost and performance.
- No minimum capacity.
- Pay more per request than with provisioned capacity.
- Use for new product launches.

### DynamoDB Security

- Encryption at rest using KMS.
- Site-to-site VPN.
- Direct Connect (DX).
- IAM policies and roles.
- Fine-grained access.
- Intergrates with CloudWatch and CloudTrail.
- VPC endpoints.

Exam tips:

1. Stored on SSD storage.
2. Spread across 3 geographically distinct data centers.
3. Eventually consistent reads (default).
4. Can opt-in for strongly consistent reads.
5. Know difference between eventually consistent and strongly consistent reads.

## When to use DynamoDB Transactions

ACID for databases: Atomic, consistent, isolated, durable.

Basically with ACID you are going all or nothing.

To use ACID with DynamoDB, you need to use transactions.

The use cases:

- Processing financial transations.
- Fulfulling and managing orders.
- Building multiple game engines.
- Coordinating actions across distributed components and services.
- 3 options for reads: eventual consistency, strong consistency and transactional.
- 2 options for writes: standard and transactional.
- Up to 25 items per go or 4MB of data per transaction.

The tips:

- If you see ACID for Dynamo, think transactions.
- Transactions provide ACID across onr or more tables within a signle AWS account or region.
- All-or-nothing transactions.

## Saving data with DynamoDB

- On-demand backup and restore: full backups at any time.
- Zero impact on table perf or availability.
- Consistent within seconds and retained until deleted.
- Operates within same region as the source table.

### Point-In-Time Recovery (PITR)

- Protects against accidental writes or deletes.
- Restore to any point in the last 35 days.
- Incremental backups.
- Not enabled by default.
- Latest restorable: 5 mintues in the past.

## Taking data global with DynamoDB stream processing and global tables

- Streams are time-ordered sequence of item-level changes in a table.
- Stored for 24 hours.
- Stream is broken up into stream records which are broken up into shards.
- Streamed for inserts, updates and deletes.
- Combine with lambda functions for funcs like stored procedures.

### Global tables

Managed multi-master, multi-region replication.

- Great for globally distributed appiclations.
- Based on DynamoDB streams.
- Multi-region redundancy for disaster recovery or high availability.
- No application rewrites.
- Replication latency under 1 second.

Global tables in the console can be created from another already created table. Remember, Streams MUST be enabled.
