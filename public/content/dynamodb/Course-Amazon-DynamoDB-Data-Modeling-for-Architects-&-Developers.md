# Course: Amazon DynamoDB Data Modeling for Architects & Developers

## Author's note

I skipped a few chapters on this as I specifically wanted to dive into some specific topics.

## Section 2: Tools, Local Development Environment

### NoSQL Workbench walkthrough

- It went through a sample data model at first.
- There were updates made to the local version of the NoSQL Workbench.
- You did not need to connect to a table for the NoSQL Workbench data being added (at least initially for the table).
- You can also run PartiQL operations against DynamoDB.

## Section 3: Amazon DynamoDB Fundamentals

### Table capacity modes

> A more advanced look at this is done in a later section "Capacity Management".

- Looks at the write request units and read request units.
- Speaks to when the table grows exponentially (the example is due to a bad manager).

There are two capacity modes:

1. On-demand: Use as much capacity as needed.
2. Provisioned: Set the upper limit on RCU & WCU. This form is also cheaper than on-demand.

An example of provisioned is that you can set a maximum RCU and WCU per second (eg. 10 RCU & 5 WCU would set those limits per second).

Capacity is also distributed uniformly across partitions.

You can also switch between both at any given time.

## Section 7: PartiQL Queries

### CRUD with PartiQL Queries

It's a SQL compatible query language.

DynamoDB uses a subset of PartiQL.

> Be wary, looks to use some form of [scanning](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.select.html).

## Section 9: Single Table Design

There are two phases:

1. Requirements: Start with the ERD. List out access patterns.
2. Iterative process: Decide on the primary keys, decide on the attributes for each entity (here we also denormalise the table). You need to also think of integrity given the data changes.

For the iterative process, you should also apply "sample data" and look at "design patterns" as part of the iterative process. Finally, you need to "ensure extensibility".

Some best practices:

- Keep future requirements in mind: additional access patterns, entities, changes to data types and business logic changes which require changes in design.

## Section 16: Preventing hot partitions

This will look at the sharing patterns.

First, what is a hot partition?

> In DynamoDB, a partition key that doesn't have a high
cardinality can result in many requests targeting only a
few partitions and resulting in a hot partition. A hot
partition can cause throttling if the partition limits of 3000 RCU or 1000 WCU (or a combination of both) per
second are exceeded.

How can we help with hot partitions through sharing?

1. Natural key adjustment: this would be using things like a subcategory for enhancing keys. For example, an initial PK of `CAT#ART` and SK `CRYSTAL#201` could be adjusted to be `CAT#ART#CRYSTAL` and SK `201`.
2. Calculated suffix: use another item attribute to calculate the suffix. For example, `hashFn(Item Subcategory)`.
3. Fix prefix for shard#. For example PK `CAT#ART` might become `SHARD1#CAT#ART`, and another might become `SHARD2#CAT#ART`.
4. Random number suffix to increase cardinality: just suffixing with a random number e.g. `CAT#ART_1`. To query, you would need `batchGetItem` with specific `suffixFrom`.

(1) and (2) are more natural, with (3) and (4) being artificial.

You should look to use (1), (2) or (4) as preferential order.

My own thoughts:

- To help prevent the hot partitions, we can also put some throttling into our application to better understand our needs.

## Section 18: ACID Transactions

DynamoDB transactions execute multiple all-or-nothing actions within & across tables. Across tables is important (can only be done as long as tables are within the same region).

The cost is two phase, so the costs are double of a standard write. This is the same for reads.

The APIs used are `TransactWriteItems` and `TransactGetItems`.

Why use them? Depends on the use cases.

For business:

- Financial transactions.
- eCommerce.
- Gaming.

For technical reasons:

- Multi-table updates with consistency.
- Counters/Sequences.
- Attribute uniqueness.

For best practices:

1. Use transactions only if needed.
2. Avoid conflicts by way of appropriate table design.
3. Avoid using transactions for bulk data upload.
4. Ensure that there is enough provisioned capacity.

Please note: there are other limitations around this as well.