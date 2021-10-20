# 21: NoSQL DBs and DynamoDB

- NoSQL Public Database-as-a-Service (DBaaS) - Key/Value & Document.
- Simple key/value data or data with a structure (like a document model).
- "Wide-column key/value" database.
- No self-managed server or infrastructure.
- Manual/Automatic provisioned performance IN/OUT or On-Demand.
- Highly resilient. Across AZs and optionally global.
- Really fast. Single-digit millisecond access (SSD based).
- Backups, point-in-time recovery, encryption at rest.
- Event-Driven integration. Do things when data changes.

### DynamoDB Tables

"It is more like a database-as-a-table product."

A table is a grouping of items with the same primary key.

- Can have simple (partition) primary key.
- Can be a composite (partition & sort) primary key.
- It MUST have a unique PK and SK.
- Item max size is 400KB.
- Capacity in DynamoDB means SPEED.
- Billed as RCU, WCU, Storage and features. In addition you are able to purchase reserved allocations.

### Provisioned Capacity

- Writes: 1 WCU = 1KB per second.
- Reads: 1 RCU = 4KB per second.

### DynamoDB Backups

- On-Demand Backup: Full Copy of Table - Retained until Removed.
- Restore: Same or Cross-Region, With or Without Indexes, Adjust Encryption Settings.

Point-in-Time Recovery:

- No Enabled by Default.
- Continuous record of changes allows replay at any point in the window (35-day window).
- Restoring can happen with 1-second granularity.

## DynamoDB Operations

### Reading and writing

- On-Demand: unknown, unpredictable, low admin. Price per million R or W units.
- Provisioned: RCU and WCU set on a per table basis. Every operation on a DynamoDB table consumes at least 1RCU/WCU.
- 1 RCU = 4KB/s read.
- 1 WCU = 1KB/s write.
- Every table has a RCU and WCU burst pool (300 seconds). When setting RCU/WCU, you are setting for the sustained average.

### Query

- Accepts a single primary key value and optionally a SK or range.
- Capacity consumed is the size of all returned iterms.
- Further filtering discards data, but capacity is still consumed.
- Can ONLY query on PK or PK and SK.

### Scan

More flexible operations, but least efficient operation.

- Scan moves through the table item by item.
- Consumes the capacity of every item.
- You have complete control on what data is selected.
- Any attributes can be used and any filters applied but SCAN consumes capacity for every item scanned through.

### DynamoDB Consistency Model

There are two different read modes:

1. Eventually Consistent. (0.5 RCU)
2. Strongly Consistent. (1 RCU)

- DynamoDB has multiple storage nodes.
- One will be the leader and there will be replicas with the same data.
- Writes are always directed at the leader node. The leader node will then be consistent.
- The leader node then begins the process of replication.
- In eventually consistent mode, it is possible with a read that you might get older versions of data.
- Strongly consistent reads connect to the leader node to get the most up-to-date copy of data.

### WCU Calculation

- 1 WCU = 1KB/s read.
- WCU = ROUNDUP(ITEMSIZE / 1KB) \* average number per second

Same calulation every time.

### RCU Calculation

- For strongly read: RCU = ROUNDUP(ITEM SIZE / 4KB) \* average number per second
- For eventually consistent: RCU = ROUNDUP(ITEM SIZE / 4KB) \* average number per second / 2 (half RCU required for strongly consistent reads)

## DynamoDB Streams & Triggers

- Stream is a time ordered list of item changes in a table.
- 24-hour rolling window.
- Enabled on a per table basis.
- Records INSERTS, UPDATES and DELETES.
- Different view types influence what is in the stream.

Four view types:

1. KEYS_ONLY - Only the primary key attributes are included in the stream record.
2. NEW_IMAGE - The entire item, as it appears after the update, is included in the stream record.
3. OLD_IMAGE - The entire item, as it appeared before the update, is included in the stream record.
4. NEW_AND_OLD_IMAGES - Both the new and the old item images are included in the stream record.

### Trigger Concepts

- ITEM change generates an EVENT.
- That event contains the data which changed.
- An action is taken using that date.
- Lambda function is invoked by stream.
- Useful for reporting and analytics.
- Great for data aggregation, messaging, notifications.

The following comes from ["Using AWS Lambda with Amazon DynamoDB"](https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html).

Lambda polls shards in your DynamoDB stream for records at a base rate of 4 times per second. When records are available, Lambda invokes your function and waits for the result. If processing succeeds, Lambda resumes polling until it receives more records.

By default, Lambda invokes your function as soon as records are available in the stream. If the batch that Lambda reads from the stream only has one record in it, Lambda sends only one record to the function. To avoid invoking the function with a small number of records, you can tell the event source to buffer records for up to five minutes by configuring a batch window. Before invoking the function, Lambda continues to read records from the stream until it has gathered a full batch, or until the batch window expires.

## DynamoDB Local and Global Secondary Indexes

Two types:

1. Local Secondary Indexes
2. Global Secondary Indexes

Things to know to understand this:

- Query is the most efficientoperation in DDB.
- Query can only work 1 PK value at a time.
- Optionally a single, or range of SK values.

Indexes are alternative views on table data.

- Different SK (LSI) or Different PK and SK (GSI).
- You have the ability to choose some or all attributes (projection).

### Local Secondary Indexes (LSI)

- LSI is an alternative view for a table.
- MUST be created with a table.
- 5 LSIs per base table.
- Alternative SK on the table.
- Shares the RCU and WCU with the table.
- Attributes to project into the secondary index - ALL, KEYS_ONLY & INCLUDE.
- Indexes are sparse, so only items which have the value in the index alternative sort key are added to the index. This can also help us for scan operations for capacity cost.

### Global Secondary Indexes (GSI)

- Can be created at any time.
- Default limit of 20 per base table.
- Alternative PK and SK.
- GSIs have their own RCU and WCU allocations.
- Attributes to project into the secondary index - ALL, KEYS_ONLY & INCLUDE.
- GSIs are ALWAYS eventually consistent. Replication between base and GSI is asynchronous.

### LSI and GSI Considerations

- Careful with projection (KEYS_ONLY, INCLUDE, ALL).
- Queries on attributes NOT projected are expensive.
- Use GSIs as default, LSI only when strong consistency is required.
- Use indexes for alternative access patterns.

## DynamoDB Global Tables

- Multi-master, cross-region replication.
- Tables are creates in multiple regions and added to the same global table (becoming replica tables).
- Last writer wins is used for conflict resolution.
- Reads and Writes can occur to any region.
- Generally sub-second replication between regions.
- Strongly consistent reads ONLY in same region as writes.
- Provides HA, Global RC/BC (Business continuity).

## DynamoDB Accelerator (DAX)

An in-memory cache designed specifically for DynamoDB. It should be your default choic for any DynamoDB caching related questions.

- DAX handles the cache check and missed requests.
- Less complexity for app developer.
- DAX is a cluster service where nodes are highly available.

There are two caches:

1. Item cache holds results of (Batch)GetItem.
2. The query cache holds data based on the query/scan parameters.

DAX is accessed via an endpoint. Cache HITS are returned in microseconds - misses in milleseconds.

DAX can use write-through caching for when writing to the database.

### DAX Considerations

- Primary Node (writes) and replicas (read).
- Nodes are highly available. Primary failure = election.
- In-Memory cache. Scaling - much faster reads, reduced costs.
- Scale UP and OUT (bigger or more).
- Supports write-through.
- DAX deployed within a VPC (private service).
