---
name: Certified Solutions Architect Professional
---

# Certified Solutions Architect Professional

> The AWS Certified Solutions Architect Professional (CSA-Pro) exam reaches far beyond testing in-depth knowledge of the AWS platform and delves into your ability to make decisions in ambiguous situations, wrestle with sub-optimal trade-offs, and tease-out minute details from paragraphs of text.

## Resources

1. [Online Course](https://acloud.guru/learn/aws-certified-solutions-architect-professional)
2. [Bloom's Taxonomy](https://www.teachthought.com/learning/what-is-blooms-taxonomy-a-definition-for-teachers/)

## About the Exam

- Recommend `Certified Solutions Architect Associate` prior to attempting this.
- 170 min, ~74 questions
- Multiple-choice and multiple-answer
- No partial credit for questions
- Score between 100 and 1000 with min passing score of 750
- Scaled scoring model used
- Every exam is unique
- New products/services need to be available for at least 6 months before appearing on the certification exam

> AWS will try to tick you with red herrings.

## About this course

Assumes you are a CSA associate.

AWS architectures follow [Bloom's Taxonomy](https://www.teachthought.com/learning/what-is-blooms-taxonomy-a-definition-for-teachers/) for learning.

AWS worded the questions so that they can be tricky for people to understand and they want to make sure they understand the analyze and evaulate parts.

The also word the questions to comply with the Duning-Kruger Effect.

> The less experience in an area you have, the more likely you are confident in that area. "The less you know, the more you think you know."

There is also a warning for "the valley of despair" as they learn more and realising the breadth and depth of knowledge required.

### Exam aspects

1. Knowledge of AWS
2. Contextual Reasoning
3. Time Management
4. Comprehension Skills
5. Coping Under Pressure

### Chapter Format

1. Architectural concepts
2. Dive into AWS Services and Capabilities
3. Resources for additional study
4. What should I know for the exam? (Pro tips)
5. Domain challenges

## About the Labs

> Using the analogy of using the Geolocation finder - its about the journey and it is about playing around.

The aim with the course is to venture from things that seem to easy and then venture out to the scenic route.

Given the expert task, you will need to venture out on your own path.

## Data Stores

### Data Persistence

- Persistent Data Store: Data is durable and sticks around after reboots, restarts or power cycles. Example: Glacier, RDS.
- Transient Data Store: Data is temporarily stored and passed along to another process or persistent store. Example: SQS, SNS.
- Ephimeral data store: Data is lost when stopped. Example EC2 instance store, memcached.

### IOPS vs Throughput

- IOPS (Input/Output Operations per second): Measure how fast we can read/write to a device (think of a sports car).
- Throughput: Measure of how much data can be moved at a time (think loading truck).

### Consistency

"Keeping things in order" - ground rules that a data store will work by.

### ACID & BASE Consistency Models

- ACID
  - Atomicity: Transactions are "all or nothing".
  - Consistent: Transactions must be valid.
  - Isolated: Transactions can't mess with one another.
  - Durable: Completed transaction must stick around.
- BASE
  - Basic Availability: Values availability even if stale.
  - Soft-state: Might not be instantly consistent across stores.
  - Eventual consistency: Will achieve consistency at some point.

> Look for these in the services of S3 vs Dynamo.

### S3

- One of the first AWS services (2006)
- S3 is an Object Store
- Used directly and behind-the-scenes in other AWS services
- Max object size of 5TB; largest object in a single PUT is 5GB
- Recommended to use multi-part uploads if larger than 100MB

While S3 may look like a file system, it has more in common with databases. S3 paths are a key, not a file path.

| AWS Documentation Statement                                                             | What S3 is thinking                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S3 provides read-after-write consistency for PUTSs of new objects                       | Never seen this object, no-one has asked about it before. Welcome, new object. You can read it immediately.                                                                                                                                                                |
| HEAD or GET reqs of the key before an object exists will result in eventual consistency | Wait, someone asked for the key and I said "never saw it". I remember that, and need to honor that response until I completely write this new object and fully replicate it. I'll let you read it eventually.                                                              |
| S3 offers eventual consistency for overwrite PUTs and DELETEs                           | You want to update or delete an object. Let's make sure we get that update or delete completed locally, then we can replicate it to other places. Until then, I have to serve up the current file. I'll serve up the update/delete once its fully replicated - eventually. |
| Updates to a single key are atomic                                                      | Only one person can update this object at a time. If I get two requests, I'll process them in order of their timestamp and you'll see the updates as soon as I replicate elsewhere.                                                                                        |

### S3 Security

- Resource Based (Object ACL, Bucket Policy)
- User-based (IAM policies)
- Optional Multi-factor Authentication before Delete

### S3 Data Protection

S3 offers versioning.

- New version with each write
- Enables "roll-back" and "un-delete" capabilities
- Old versions count as billable size until they are permanently deleted
- Integrated with Lifecycle Management

You can optionally require multi-factor auth:

- Safeguard against accidental deletion of an object
- Change the versioning state of your bucket

S3 also offers cross-region replication for:

- Security
- Compliance
- Latency

### S3 Lifecycle Management

- Optimize storage costs
- Adhere to data retention policies
- Keep S3 volumes well-maintained

> This can enable to the ability to transition to archive etc after a certain timeframe based on things such as tags.

### S3 Analytics

| Concept                         | Services                              |
| ------------------------------- | ------------------------------------- |
| Data Lake Concept               | Athena, Redshift Spectrum, QuickSight |
| IoT Streaming Data Repository   | Kinises Firehose                      |
| Machine Learning and AI Storage | Rekognition, Lex, MXNet               |
| Storage Class Analysis          | S3 Management Analytics               |

### S3 Encryption at REST

| Encryption Option | Meaning                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| SSE-S3            | S3's existing encryption key for AES-256                                               |
| SSE-C             | Upload your own AES-256 key which S3 uses when it writes to objects                    |
| SSE-KMS           | Use a key generated and managed by AWS Key Management Service                          |
| Client-Side       | Encrypt objects using your own local encryption before uploading to S3 (PGP, GPG, etc) |

### More nifty S3 Tricks

| Trick                 | Does                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Transfer Acceleration | Speed up data uploading using CloudFront in reverse                                                |
| Requester Pays        | Requester rather than the bucket owner pays for requests and data transfer                         |
| Tags                  | Assign tags to objects for use in costing, billing, security etc                                   |
| Events                | Trigger notifications to SNS, SQS or lambda when certain events happen                             |
| Static Web Hosting    | Simple and massively scalable static website hosting                                               |
| BitTorrent            | Use BitTorrent protocol to retrieve any publicly available object by auto-generate a .torrent file |

## Amazon Glacier

- Really cheap
- Slow to respond
- Should be seldom used
- Used by AWS Storage Gateway Virtual Tape Library
- "Cold storage"
- Integrated with S3 via lifecycle management feature
- Faster retrieval speeds if you want to pay more (recent at time)

Glacier is a service by itself with its own API and you don't need S3 to access it.

There is the Glacier Vault that contains archives (file, zip, tar etc max size 40TB, immutable), and can be accessed through policies with a "Glacier Vault Lock" (different to vault access policy, enforce rules like no delete or MFA, immutable) and IAM access.

You need to understand the "policy" and the "access".

- Policy: Rules that it must obey by.
- Access: This is giving roles to individual people to administer the vault or do something to the Glacier Vault Lock.

A small note on the vault lock process. You create a "Glacier Vault Lock" and you initiate the vault lock. You have 24 hours to "abort" or "complete" the vault lock. This is by design.

## Amazon Elastic Block Storage

The example given was Othello. Think of it like a big field of play. In the example, we could pay for 64 blocks but only start using 4. Then we update more to have 12 blocks. We still pay for 64 blocks but less are available now.

- Think "virtual hard drives"
- Can only be used with EC2
- Tied to a single AZ (incredibly important)
- Variety of Optimized choices for IOPS, Throughput and Cost
- Snapshots are great!

### Comparing EBS to Instance storage

Instance:

- Temporary
- Ideal for caches, buffers, work areas
- Data goes away when EC2 is stopped or terminated
- Locked to EC2 instances
- Better performance

EBS:

- Attach/Detach to EC2 instances
- Can create snapshots

### EBS Snapshots

- Cost-effective and easy backup strategy
- Share data sets with other users or accounts
- Migrate a system to a new AZ or Region
- Convert unenrypted volume to encrypted volume

> With the Othello snapshot example, our first snapshot may contain the 4/64 blocks. Once we've added more data, once we take another snapshot it will only snapshot the added data. If we then removed a "chip", the next snapshot will record that. It is cost-effective because each snapshot doesn't not equate to the full size of your volume.

If a snapshot is delete, we cannot replicate that snapshot. Think of them as a collection of pointers to data which is stored in S3. Thanks to AWS magic, if you deleted snap one, it will help bring the changes from that into the next snap.

### EBS Lifecycle Manager

- Schedule snapshots for volumes or instances every X hours
- Retention rules to remove stale snapshots

## Amazon Elastic File System

In 1984, Sun released a version of their SunOS as a distrubted file system known as Network File Storage (NFS) and this is what AWS took as inspiration to create EFS.

- Implementation of NFS file share
- Elastic storage capacity, and pay for only what you use (in contrast to EBS)
- Multi-AZ metadata and data storage
- Configure mount-point in one, or many, AZs
- Can be mounted from on-prem systems (caution here)

> NFS itself is not considered a secure protocol. You coukd use Amazon DataSync instead that uses a purpose-built protocol securely. It can also use EFSSync to keep multiple EFS in sync.

Remember: EFS is 3x expensive than EBS and 20x more expensive than S3. There are also some NFS v4 features that are not supported (check docs).

An example given here for was that with multi-AZ web entrypoints that connect to a mount point, we could use AWS DataSync to sync that up to an on-premises staging. This will given scalability and redundancy across AZs.

## Amazon Storage Gateway

- Virtual Machine that you run on-premises with VMWare of HyperV OR via a specially configured Dell hardware appliance.
- Provides local storage resources back by AWS S3 + Glacier.
- Often used in disaster recovery preparedness to sync to AWS.
- Useful in cloud migrations. It can act as a "lazy" way to slowly sync a bunch of data over time.

### Different operation modes

New Name | Old Name | Interface | Function
File gateway | N/A | NFS, SMB | Allow on-prem or EC2 instances to store objects in S3 via NFS or SMB mount point
Volume Gateway Stored Mode | Gateway-stored Volumes | iSCSI | Async replication of on-prem data to S3
Volume Gateway Cached Mode | Gateway-cached Volumes | iSCSI | Primary data stored in S3 with frequently accessed data cached locally on-prem
Tape Gateway | Gateway-Virtual Tape Library | iSCSI | Virtual media changer and tape library for use with existing backup software

It contains a feature called "bandwidth throttling" which is a great feature to ensure remote offices aren't smashed.

## Amazon WorkDocs

Amazon's version of Dropbox or Google Drive.

- Secure, fully managed file collaboration service
- Can integrate with AD for SSO
- Web, mobile and native clients (no Linux client)
- HIPAA, PCI DSS and ISO compliance requirements

## EC2 Databases

- You can run any database with full control and ultimate flexibility
- Must manage everything like backups, redundancy, patching scale
- Good option if you require a database not yet supported by RDS (such as IBM DB2 or SAP HANA)
- Good option if it is not feasible to migrate to AWS-managed database

## Amazon RDS

- Managed database option for MySQL, Maria, PostgresSQL, Microsoft SQL Server, Oracle and MySQL-compliant Aurora.
- Best for structured, relational data store needs.
- Aims to be drop-in replacement for existing on-prem instances of same databases
- Automated backups and patching in customer-degined maintenance windows
- Push-button scaling, replication and redundancy

If you can use it, you should. It will help your Database administrator.

### RDS Anti-Patters

| If you need                            | Don't use RDS, use |
| -------------------------------------- | ------------------ |
| Lots of large binary objects (BLOBs)   | S3                 |
| Automated scalbility                   | DynamoDB           |
| Name/Value Data structure              | DynamoDB           |
| Data no well structured/unpredicatable | DynamoDB           |
| Other DB Platform not supported        | EC2                |
| Need complete control                  | EC2                |

The example has Multi-AZ RDS with read-replicas used to serivce regional users.

Note: non-transactional sotrage engines like MyISAM don't support replicated, you must use InnoDB (or XtraDB or Maria).

> The Read-Replicas use async replication, while the stand-by DBs use sync replication.

## Amazon DynamoDB

A massively scalable key-value storage system.

- Managed, multi-AZ NoSQL data store with Cross-Region Replication option.
- Default to eventual consistency reads but can request strongly consistent read via SDK parameter (get latest update).
- Provision read and write capacity in anticipation of need.
- Autoscale capacity adjustd per configured min/max levels.
- On-Demand capacity for flexible capacity at a small premium cost.
- Option to achieve ACID-compliance with DynamoDB Transactions. This opens DynamoDB up to new capabilities and use case.

### Relational vs NoSQL

Relational is great for related across a strong schema. NoSQL have their strength in key-value pairs.

The `key-value` is an attribute where the whole record is known as an `item`. DynamoDB has a Primary Key. You can use a composite primary key known as a partition key and sort key. We can have occurences of the same partition key as long as the sort keys are unique.

### Secondary Indexes

| Index Type             | Description                                                         | How to remember                                                                                        |
| ---------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Global Secondary Index | Partition key and sort key can be different from those on the table | I'm not restricted to just the partitioning set forth by the partition key, I'm global!                |
| Local Secondary Index  | Same partiton key as the table but different sort key               | I have to stay local and respect the table's partition key, but I can choose whatever sort key I want. |

Use the Global Secondary Index when you want a fast query of attributes outside the primary key - without having to do a table scan (read everything sequentially). "I'd like to query Sales Orders by Customer number rather than Sales Order Number".

Use the Local Secondary Index when you already know the partition key and want to quickly query on some other attribute. "I have the Sales Order Number, but I'd like to retrieve only those records with a certain Material Number."

Using the secondary indexes, you can use `projections` to have fast access to data attributes.

| If you need                                          | Consider                                                                         | Cost                                        | Benefit                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| Access just a few attributes in fastest way possible | Projecting those few attributes in a global secondary index                      | Minimal                                     | Lowest possible latency access for non-key items     |
| Frequently access some non-key attributes            | Projecting those attributes in a global secondary index                          | Moderate; aim to offset cost of table scans | Lowest possible latency access for non-key items     |
| Frequently access most non-key attributes            | Projecting those attributes or even the entire table in a global secondary index | Up to double                                | Maximum flexibility                                  |
| Rarely query but write or update frequentky          | Projecting keys only for the global secondary index                              | Minimal                                     | Very fast write or updates for non-partion-key items |

### DynamoDB Design Best Practices

In a NoSQL world, we can use tricks to improve performance and do things that look different to the relational world.

In the example given, we have the `Partition` and `Sort` key defined, but we could put global secondary index on `Attribute 1` and `Attribute 2` (where we could say Period and TotalPurchases are the values respectively) then we could update or pull total purchases fast and query or sort by period date.

Another strategy is to leverage `sparse indexes`. Not every item might have `period`, so DynamoDB has ways to make sure the index only includes those items with the attribute used for the global secondary index.

We can also use global secondary index to create table replicas, we just have to use the same partition key and sort key. When might we use this? Imagine two different tier of customers, we might let premium customers do their writes against tables with a higher RCU/WCU (Read Capacity Unit/Write Capacity Unit) limit.

The last use case is for performance reasons where we want high write capacity limits on the first table, and another that has a high read capacity.

> Remember, the replica is eventually consistent.

## Amazon Redshift

- Fully managed, clustered peta-byte scale data warehouse
- Extremely cost-effective as compared to some other on-prem data warehouse platforms
- PostgreSQL compatible with JDBC and ODBC drivers available; compatible with most BI tools out of the box
- Features parallel processing and columnar data stores which are optimized for complex queries
- Option to query directly from data files on S3 via RedShift Spectrum

### Data Lake

Large repository for a variety of data which you put a framework or technology on-top of to make use of it. The idea is to shorten the path to take this data and make use of it. This is a way to get around the older method of extract-transform-load to then make sense of it.

- Query raw data without extensive pre-processing
- Lessen time from data collection to data value
- Identify correlations between diparate data sets

We can use S3 to dump a bunch of this data to for which we can point Amazon Redshift Spectrum to in order to query that data.

## Amazon Neptune

- Fully-managed graph database
- Supports open graph APIs for both Gremlin and SPARQL

Graph databases are optimized to work with relations. Think social media networks, product recommendations etc.

> Don't expect Neptune questions on the exam.

## Amazon Elasticache

- Fully managed implementations of two popular in-memory data stores - Redis and Memcached
- Push-button scalability for memory, writes and reads
- In memory key-value store - not persistent in the traditional sense
  - This makes them really, really fast (faster than DynamoDB)
- Billed by node size and hours of use

| Use                       | Benefit                                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web session store         | In cases with load-balanced web servers, store web session info in Redis so if a server is lost, the session info is not lost and another web server can pick-up |
| Database Caching          | Use Memcache in front of AWS RDS to cache popular queries to offload work from RDS and return results faster to users                                            |
| Leaderboards              | Use Redis to provide a live leaderboard for millions of users of your mobile app                                                                                 |
| Streaming data dashboards | Provide a landing spot for streaming sensor data on the factory floor, providing live real-time dashboard displays                                               |

> VPC only supports unicast, not multicast

### Memcached vs Redis

Memcached:

- Simple, no-frills, straight-forward
- You need to scale out and in as demand changes
- You need to run multiple CPU cores and threads
- You need to cache objects (ie like db queries)

Redis:

- You need encryption
- You need HIPAA compliance
- Support for clustering
- You need complex data types
- You need high-availability (replication)
- Pub-Sub capability
- Geospacial indexing
- Backup and Restore
- The are "persistence" options but remember the purpose of a cache

> A cache is a cache. Use the right tool for the job.

## Other Database Options

In recent years, AWS has released a whole suite of DB options.

### Amazon Athena

- SQL engine overlaid on S3 base on Presto
- Query raw data objects as they sit in an S3 bucket
- Use or concert data to Parquet format if possible for a big performance jump
- Similar in concept to Redshift Spectrum, but Athena is for when data lives mostly on S3 without need to perform joins with other data sources. Redshift Spectrum is to join S3 with existing RedShift tables or create union products.

### Amazon Quantum Ledger

- Based on blockchain concepts
- Provides immutable and transparent journal as a service without having to setup and maintain an entire blockchain framework
- Centralized design (as opposed to decentralized) allows for higher performance and scalability
- Append-only concept where each record contributes to the integrity of the chain
  - Hash use to produce each subsequent record helps with validating the integrity
- Great if you only need an immutable ledger

### Amazon Managed Blockchain

- Fully managed blockchain framework supporting open source frameworks of Hyperledger Fabric and Ethereum
- Distributed consensus-based concept consisting of a network, members (other AWS accounts), nodes (instances) and potentially applications
- Uses the Amazon QLDB ordering service to maintain complete history of transactions

### Amazon Timestream Database

- Fully managed DB specifically built for storing and analyzing time-series data
- Alternative to DynamoDB or Redshift and includes some built-in analytics like interpolation and smoothing
- Use cases include industrial machinery, sensor networks, equipment telemetry

### Amazon DocumentDB

- "with MongoDB compatibility" (compatible with their APIs).
- AWSs invention that emulates the MongoDB API so it acts like MongoDB to existing clients and drivers.
- Fully managed with all the good stuff (multi-AZ HA, scalable, integrated with KMS, backed up by S3).

### Amazon ElasticSearch

- Not to be confused with ElastiCache
- Mostly a search engine but also a document store (caution here)
- Amazon ElasticSearch Service components are sometimes referred to as ELK stack (ElasticSearch, LogStash, Kibana for Search and Storage, Intake and Analytics respectively)
- Intake can also be CloudWatch, Firehose, IoT
- More useful as an analytics tool or for search

Example given was to build some real-time dashboards based on IoT devices in a manufacturing environment.

> As with other AWS services, there are functional overlap but you need to make the decisions behind the choices and why.

## Comparing Database Options

| DB          | Use Case                                                                                |
| ----------- | --------------------------------------------------------------------------------------- |
| DB on EC2   | Ultimate control or preferred DB not under RDS                                          |
| RDS         | Traditional DB for OLTP. Data well-formed and structured                                |
| DynamoDB    | Name/value pair data or unpredictable data structure. In-mem performance w/ persistence |
| Redshift    | Massive amounts of data. Primarily OLAP.                                                |
| Neptune     | Relationships between objects a major portion of data value                             |
| Elasticache | Fast temp storage for small amounts of data. Highly volatile.                           |

## Storage Exam Tips

- Read the `AWS Storage Options` white paper and note anti-patterns
- Know when to use various data sources

| DB       | Use when...                                                                             |
| -------- | --------------------------------------------------------------------------------------- |
| RDS      | Traditional relational data models, existing apps requiring RDBMS, OLTP, ACID-compliant |
| DynamoDB | High I/O needs, Scale dynamically                                                       |
| S3       | BLOBs                                                                                   |
| EC2      | DB not supported under RDS, need complete control                                       |
| Redshift | OLAP                                                                                    |

> For further study, the suggestions are that the AWS whitepapers are absolutely required, and the re:Invent videos are optional but recommended. A lot of the time the speakers will use real-world examples that may apply directly to what you want to do. Note that the context on Acloud Guru has the links in the current lesson section for this part.

## Storage Pro Tips

- Archiving and Backup often a great "pilot" to build AWS business case
- Make use of the S3 endpoints within your VPC (not leaving the VPC and entering through an internet route)
- Learn to properly secure your S3 bucket
- Encrypt, encrypt, encrypt
- Consider Aurora for your production MySQL/Maria or PostgresSQL needs. It has extra optimisations built in that might be an improvement to performance, cost etc.
- Consider NoSQL if you don't need relational database features.
- Databases on EC2 cost less on the surface than RDS, but remember to factor in management (backups, patching, OS-level hardening).
- There can be a performance hit when RDS backups run if you have only a single AZ instance.

## Networking

Focused on both understanding security requirements but now on designing networks for complex organisations.

There are some aspects that also touch on migrating from on-prem into the cloud.

## Amazon Networking Refresher

You should already know:

1. Physical layout AZs and Regions
2. VPC concept and how to create
3. Create private and public subnets
4. What a NAT is and what "Disable Source/Destination Checks" means
5. Route table and routing terminology (default routes, local routes)
6. IPv4 Addressing and Subnet Mask Notation (/16, /24 etc) (don't worry too much on IPv6)
7. Intermediate Networking Terminology (MAC address, port, gateway vs router)

> Seek first to understand and then apply.

### OSI Model

Open Systems Intercommunication model. This describes how to think about network operations. If one layer has problems, your message is not going to get through.

| Layer | Name         | Example                                          | Mnemonic |
| ----- | ------------ | ------------------------------------------------ | -------- |
| 7     | Application  | Web Browser                                      | Away     |
| 6     | Presentation | TLS/SSL, Compression                             | Pizza    |
| 5     | Session      | Setup, Negotiation, Teardown                     | Sausage  |
| 4     | Transport    | TCP                                              | Throw    |
| 3     | Network      | IP, ARP                                          | Not      |
| 2     | Data Link    | MAC                                              | Do       |
| 1     | Physical     | CAT5, fiber optic cable, 5GHz, carrier frequency | Please   |

> Use as a mental checklist. Please do not throw sausage pizza away.

AWS responsibility is general for layer 1-2, where the rest are the customer's responsibility. This is why there is the term "shared responsibility model".

One of the limitations that AWS (and other cloud providers) enforce is no multicast.

Unicast is like a direct photo call between two people, whereas multicast is sending a message to everyone on the network (like a megaphone). Since this is done on the MAC level, it is a level 2 activity (and AWS is multi-tenet).

### TCP vs UDP cs ICMP

| Protocol                  | Characteristics                                             | Layman's Terms                                                                     | Uses                      |
| ------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------- |
| TCP (Layer 4)             | Connection-based, stateful, acknowledges receipt            | After everything I say, I want you to confirm you received it                      | Web, Email, File Transfer |
| UDP (Layer 4)             | Connectionless, stateless, simple, no retransmission delays | I'm going to start talking and it's okay if you miss some words                    | Streaming media, DNS      |
| ICMP (officially layer 3) | Used by network devices to exchange info                    | We routes can keep in touch about the health of the network using our own language | traceroute, ping          |

### Ephemeral Ports

- Short-lived transport protocol ports used in IP communications
- Above the "well-known" ports (above 1024)
- "Dynamic ports"
- Suggested range 49152 to 65535 but...
  - Linux kernels generally use 32568 to 61000
  - Windows platforms default from 1025
- NACL and Security Group implications

> UDP preferred for media so the server can continually send the client data

### Reserved IP Addresses

AWS uses certain IP addresses in each VPC as reserved.

- 5 IPs are reserved in every VPC subnet (example 10.0.0.0/24)
  - 10.0.0.0: Network address
  - 10.0.0.1: Reserved by AWS for the VPC router
  - 10.0.0.2: Reserved by AWS for Amazon DNS
  - 10.0.0.3: Reserved by AWS for future use
  - 10.0.0.255: VPCs don't support boardcast so AWS reserves this address

### AWS Availability Zones

The Physical to Logical assignment of AZs is done at the Account level (mind-blown).

## NEED TO CONTINUE CHAPTER 3 HERE

(starting from network to VPC connectivity)

## Architecting to Scale

### Architectural Patterns

> Suggested ways to help design architectures.

An example of this is a loosely-coupled architecture: "Components can stand independently and require little or no knowledge of the inner workings of the other components."

They have some good benefits when it comes to abstraction.

- Layers of abstraction
- Permits more flexibility
- Interchangeable components
- More atomic functional units (independent)
- Can scale components independently

> An example is given about given more resources for a loosely coupled architecture to a particular process that may be time-expensive beforehand.

### Horizontal vs Vertical Scaling

| Horizontal                                       | Vertical                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| Add more instances as demand increases           | Add more CPU and/or RAM to existing instance as demand increases |
| No downtime required to scale up or down         | Requires restart to scale up or down                             |
| Automatically supported with Auto-scaling groups | Requires script to automate                                      |
| (Theoretically) unlimited                        | Limited by instance size                                         |

More terms:

- Scale in: Reduce horizontal scale
- Scale down: Reduce vertical scale

With scaling, you should scale to match demand. We can scale in and scale out based on demands. The example shows the potential savings over a month based to auto-scaling.

### Type of Auto-Scaling

- AWS Auto Scaling
- EC2 Auto Scaling
- Application Auto scaling

#### EC2 Auto Scaling

Focused on EC2. Why? Setup scaling groups for EC2 instances; health checks to remove unhealthy instances.

- Automatically provides horizontal scaling (scale-out) for your landscape.
- Triggered by an event or scaling action to either launch or terminate instances.
- Availability, Cost and System Metrics can all factor into scaling.
- Four scaling options:
  1. Maintain: Keep a specific or minimum number of instances running
  2. Manual: Use max, min or specified number of instances
  3. Schedule: Increase or decrease instances based on schedule
  4. Dynamic: Scale based on some metric

When creating, you need to set some launch configurations:

- Specifiy VPC amd subnets for scaled instances
- Attach to a ELB
- Define a Health Check Grace Period

Here you can also define the scaling policies:

| Scaling                | What                                                                             | When                                                              |
| ---------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Target Tracking Policy | Scale based on a predefined or custom metric in relation to a target value       | "When CPU utilization gets to 70% on current instances, scale up" |
| Simple Scaling Policy  | Waits until health check and cool down period expires before evaluating new need | Let's add new instances slow and steady                           |
| Step Scaling Policy    | Responds to scaling needs with more sophistication and logic                     | "AGG! Add ALL the instances!"                                     |

There is a "cooldown" period for EC2:

- Default is 300s. Gives your scaling a chance to "come up to speed" and absorb load.
- Automatically applies to dynamic scaling and optionally to manual scaling but **not supported for scheduled scaling**.
- Can override default cooldown via scaling-specific cool down.

#### Application Auto Scaling

API used to control scaling for resources other than EC2 like Dynamo, ECS, EMR. Why? Provides a common way to interact with the scalability of other services.

#### AWS Auto Scaling

Provides centralized way to manage scalability for whole stacks; Predictive scaling feature. Why? Console that can manage both of the above from a unified standpoint.

Provides a holistic way to scale and it provides some high-level scaling strategies that are phrased in business terms, but if you want you can still get into the details.

| Scaling                  | What                                                                                  | When                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Target Tracking Policy   | Initiates scaling events to try to track as closely as possible a given target metric | "I want my ECS hosts to stay at or below 70% CPU utilization"                                    |
| Step Scaling Policy      | Based on a metric, adjusts capacity iven certain defined thresholds                   | "I want to increase my EC2 Spot Fleet by 20% every time I add another 10k connections to my ELB" |
| Scheduled Scaling Policy | Initiates scaling events based on a predefined time, day or date                      | "Every Monday at 0800, I want to increase the Read Capacity Units of my DynamoDB Table to 20k"   |

#### Autoscaling based SQS

Scaling can be based based on SQS. The lambda function can check capacity and emits a custom metric (using a CloudWatch alarm).

#### AWS Predictive Scaling

Can be used to dynamically scale based on load and calculating expected capacity.

Without dynamic scaling, you can just use the data to adjust your own scaling policies.

You can also opt-out of this if you don't want AWS collecting this data.

## AWS Kinesis

- Collection of services for processing streams of various types.
- Data processed in "shards" -- each shared able to ingest 1000 records per second.
- A default limit of 500 shards, but you can increate to unlimited.
- Record consists of Partition Key, Sequence Number and Data Blog (up to 1MB).
- Transient Data Store - default of 24 hours but can be configured for 7 days.

There are different "flavours" of Kinesis (like video streams).

For the exam, focus on data stream. With Kinises, we can even do analytics then and there.

Firehose also allows us to automatically send it to "landing spaces" (if we don't have to process it then and there).

### Kinises Key concepts

- The more "shards" you have, the more data that can go through. Data is divided up between shards and eventually ends up in Firehose or a Consumer App.
- Shards have their own partition key.

## DynamoDB Scaling

The axis (x,y) illustrate (throughput, size) where throughput consists of read/write capacity units and size consists of "max item size (400KB here)".

- Under the hood, Dynamo scales out by partition. It does this by capacity or by size (ie `MAX(capabity, size)`).
- While AWS allows "burst", generally the RCU/WCU is evely distributed.

In the example given for "hot key" issue, the problem is illustrated when you load WCU for a particular partition if you used a partition key with something like "date" which is unbalanced.

### Autoscaling for Dynamo DB

- Using Target Tracking method to stay close to target utilization.
- Currently does not scale down if consumption drops to zero
- Workaround 1: Send reqs to table until it auto scales down.
- Workaround 2: Manually reduce max capacity to be the same as min capacity.
- Autoscaling supports Global Secondary Indexes - think of them like a copy of the index.

### On-Demand Scaling

- Gives you capacity whenever you need it.
- Costs more than traditional provisioning and auto-scaling.
- Maybe a good idea if you do not have metrics.
- DynamoDB Accelorator (DAX) cache is something that sits in front of DynamoDB that can give microsecond response instead of millisecond. Good if you require the fastest possible time (read-intensive applications).

## CloudFront Part 2

- Deliver content faster through caching static AND dynamic content at edge locations.
- Dynamic content delivery achieved using HTTP cookies forwarded from origin.
- Support's Adobe Flash Media Server's RTMP protocol but must choose that delivery method.
- Supports media streaming and live streaming but uses HTTP or HTTPS.
- Origins can be S3, EC2, ELB or another web server.
- Multiple origins possiblbe. Behaviours can configure content based on URL path.

### Invalidation

- Delete file from origin and wait for TTL.
- Use AWS console to request invalidation.
- Use CloudFront API.
- Several 3rd party tools to invalidate cache.
- Supports Zone Apex entries (no subdomain).
- Supports geo restrictions.

## Amazon Simple Notification Service

- Enables pub/sub design patterns.
- Topics = channel to publish notifications.
- Subscriptions = configuring an endpoint to receive messages publish on the topic.
- Endpoint protocols include HTTP(S), Email, SMS, SQS, Amazon Device Message (push notifications) and Lambda.

> SNS useful for when we need several processes to run in parallel. A great way to achieve loosely-coupled architecture.

## SQS

- Reliable, highly-scalable, hosted message queueing service.
- Available for KMS integration (encrypted messaging).
- Transient storage (default 4 days, max 14 days).
- Optionally supports FIFO queue ordering.
- Max size 256KB but using a special Java SQS SDK, you can have as large as 2GB.

> A standard queue does not guarantee FIFO.

### vs Amazon MQ

- MQ is an implementation of Apache ActiveMQ, a message broker.
- Functions similar, but with a different implementation of a messaging queue.
- Fully managed and highly available within a region.
- Supports ActiveMQ API, JMS, NMS, MQTT, WebSocket.
- Designed as a drop-in replacement for on-premise message brokers.

The tl;dr:

- Use SQS if you are creating a new application from scratch.
- Use MQ if you want an easy low-hassle path to migrate to the cloud.

## AWS Lambda, Serverless, Application Manager and EventBridge

- Allows you to run code on demand without infrastructure.
- Supports a bunch: Common are NodeJS, Python, Java, Go and C#. You can even write your own interpreter.
- Purpose built for serverless architecture.
- Code is stateless and executed on an event basis.
- No fundamental limits to scaling a function since AWS dynamically allocates capacity in relation to events.

### AWS Serverless Application Model

- Opensource framework for building serverless apps on AWS.
- Uses YAML as the configuraton language.
- Includes AWS CLI-like functonality to create, deploy and update serverless apps.
- Enables local testing and debugging of apps using a Lambda-like emulator via Docker.
- Extension of CF.

### AWS Serverless App Repo

A set of apps that AWS provides for you to fork or use as a basis for your own applications.

### AWS SAM vs Serverless Framework

Similar, but serverless framework supports multi-cloud.

### Amazon EventBridge

A service designed to hook up various event sources, apply some rules and then pass it to other targets.

Why use it? Primarily designed to link AWS and 3rd party applications ie ZenDesk, OneLogin, PagerDuty etc.

## AWS Simple Workflow Service

- Create distributed async systems as workflows.
- Supports both sequential and parallel processing.
- Tracks the state of your workflow which you interact and update via API.
- Best suited for human-enabled workflows like order fulfilment or procedural steps.
- AWS recommends to look at Step Functions over SWF.

### What is involved with SWF

- Activity worker: interacts with SWF service to get tasks, process tasks and return results.
- Decider: controls coordination of tasks, such as their ordering, concurrency and scheduling.

## AWS Step Functions

- Managed workflow and orchestration platform
- Scalable and highly available
- Define your app as a state machine
- Create tasks, sequential steps, parallel steps, branching paths or timers
- Amazon State Language declarative JSON
- Apps can interact or update the stream via Step Function API
- Visual interface describes flow and realtime status
- Detailed logs of each step execution

### When to use step functions?

- Out-out-the-box coordination of AWS service components.
- Use SWS if you need to support external processes or specialized execution logic (ie manual review steps).
- Use SQS for message queues; Store and forward patterns (like image resizing).
- Batch when scheduled or reoccurding taks that do not require heavy logic (ie logs daily)

## AWS Batch

There is still a need for batch processing. AWS Batch helps with this.

Tool to help batching on EC2 instances.

You can create a computer environment: managed or unmanaged, spot of on-demand, vCPUs.

Then you can create a Job Queue with a priority and assign it to job env.

You then create a job definiton: script of JSON, env vars, mount points, IAM role, container image, etc.

Finally, you schedule the job.

## Elastic MapReduce

### What is it?

Elastic MapReduce **is not one product**. It is a collecton of open source projects.

EMR helps to make this collection more of a "push button".

At the core is `Hadoop HDFS` and `Hadoop MapReduce`.

HDFS is the distribution of the file system, MapReduce for the processing and ZooKeeper which handles resource co-ordinaton.

Oozie is a workflow framework. Pig is a scripting framework. Hive is a SQL framework for the Hadoop landscape.

Mahout is for ML, HBase is Columnar Datastore for storing Hadoop data.

Flume is used to ingest application and sys logs. Sqoop facililtates import of data from our databases/sources.

Laying over the top is Ambari which is for management and monitoring.

### Back to AWS EMR

- Managed Hadoop framework for processing huge amounts of data.
- Also supports Apache Spark, HBase, Presto and Flink.
- Most commonly used for log analysis, financial analysis or extract, translate and loading (ETL) activities.
- A "Step" is a programmatic task performed on the data (ie count words sent into EMR).
- A "Cluster" is a collection of EC2 instances provisioned by EMR to run your Steps. Has a master node, core nodes (attached to HDPS) and task nodes that can be used to work on the steps.
