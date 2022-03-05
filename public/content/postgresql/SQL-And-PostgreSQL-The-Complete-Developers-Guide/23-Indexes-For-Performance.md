# 23: Indexes For Performance

## Full Table Scans

We are imagining that we have a heap file with two blocks. In the first block is users Nancy and Alf. In the second is Jia and Riann.

Imagine we are running through the following query:

```sql
SELECT *
FROM users
WHERE username = 'Riann';
```

Postgres cannot just read a file in place. The heap files need to be loaded into memory.

So the first thing Postgres will do is load up those users.

A `Full Table Scan` is when PG has to load many (or all) rows from the heap file to memory. This is frequently (but not always) poor performance.

So what's the alternative? We can use an index.

## What's an index?

Indexes help us to answer the question, "Which block and index is user X at?". You can think of them like a phone book.

Indexes are a data structure that efficiently tells us what block/index a record is stored at.

The index helps us to know what block we need to load into memory to get the data.

## How an Index Works

This is not exactly what happens in Postgres, but the steps will be close enough to demonstrate what happens.

1. Decide what column we want a fast lookup on. In the example, it was the `username`.
2. Extract only the property we want to do fast lookups by and the block/index for each. In our case, we extract the `username` and record where we found it.
3. We sort the data that was extracted in some kind of meaningful way. Alphabetical for text, value for number etc.
4. Organize into a tree data structure. Evenly distribute values in the leaf nodes in order left to right.
5. Add helpers to the root node of the tree. These helpers "give directions".

## Creating an Index

How do we create one? Simply, we run the following command the Postgres handles the rest behind the scenes.

```sql
CREATE INDEX ON users (username);
-- CREATE INDEX users_username_idx ON users (username); if you wanted to name it yourself
DROP INDEX users_username_idx;
```

## Benchmarking Queries

A keyword to help with benchmarking `EXPLAIN ANALYZE`.

```sql
EXPLAIN ANALYZE SELECT *
FROM users
WHERE username = 'Emil30';
```

The `execution` time is the data point that we want to look at.

With the index in place, we see a time of `0.075ms`.

With the index dropped, we see the time drop to `1.5ms`. This is still quick, but it is way slower than the index.

## Downsides of Indexes

We DO NOT want to create an index on every column. Why?

1. There is a storage cost just to store the index.
2. Slows down insert/update/delete - the index has to be updated.
3. Index might not actually be used.

We can find out the size of a table like `users` with the following:

```sql
-- sizes for examples
SELECT pg_size_pretty(pg_relation_size('users')); -- 880kB
SELECT pg_size_pretty(pg_relation_size('users_username_idx')); -- 184kB
```

As the sizes begin the scale, you could be talking about HUGE indexes.

If you are using services like RDS, then you need to note that the cost of storage is quite high.

## Index Types

There are several types of indexes we can create. Most of the time you will want the B-Tree index. General purpose that you'll want 99% of the time.

A list:

| Index type | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| B-Tree     | General purpose index. Wanted 99% of use cases.                    |
| Hash       | Speeds up simple equality checks.                                  |
| GiST       | Geometry, full-text-search.                                        |
| SP-GiST    | Clustered data such as dates - many rows might have the same year. |
| GIN        | For columns that contain arrays of JSON data.                      |
| BRIN       | Specialized for really large datasets.                             |

## Automatically generated indexes

- Postgres automatically creates an index for the primary key column of every table. `[table]_pkey`.
- Postgres automatically creates an index for any `unique` constraint. `[table]_[uniqueColName]_key`.

Note: These don't get listed under `indexes` in PGAdmin. To see them, you will to check `SELECT relname, relkind FROM pg_class WHERE relkind = 'i';`.

## Behind the scene of indexes

The order in memory of our B-Tree goes:

1. Meta Page
2. Root Block/Page
3. Leaf Block(s)/Page(s)

If you want to inspect some extra information about indexes, you can run the following:

```sql
CREATE EXTENSION pageinspect;
```

Afterwards, we could do the following to get info about the index `users_username_idx`:

```sql
SELECT *
FROM bt_metap('users_username_idx'); -- bt_metap = B-Tree Metapage
```

Within the results, there is a `data` column where in our actual index, if we satisfy the data within, then we go to the value at column `ctid`.

In the root node, we go through a comparison process of checking the data and then if satisfied following the `ctid` to the leaf node.

The `ctid` for a leaf node is a little different. It tells us what page and what index within the page to find the data (in tuple format `(uint, uint)`).

When you get to a particular size, then you may have additional layers where there are parent nodes in between the root node and the leaf nodes.
