---
menu: SQL
name: SQL Tuning
---

# SQL Tuning

- [SQL Tuning](#sql-tuning)
  - [Resources](#resources)
  - [Quick Understandings](#quick-understandings)
  - [Basic Guide to indexing](#basic-guide-to-indexing)
  - [Writing SQL queries](#writing-sql-queries)
  - [Only Retrieve The Data You Need](#only-retrieve-the-data-you-need)
  - [Limit Your Results](#limit-your-results)
  - [Data type conversions](#data-type-conversions)
  - [Keep queries as simple as possible](#keep-queries-as-simple-as-possible)
    - [When you use the `OR` operator in your query, it’s likely that you’re not using an index](#when-you-use-the-or-operator-in-your-query-its-likely-that-youre-not-using-an-index)
    - [Alternatives to NOT](#alternatives-to-not)
    - [Alternatives to AND](#alternatives-to-and)
    - [Alternatives top ANY and ALL Operators](#alternatives-top-any-and-all-operators)
    - [Isolate Columns in Conditions](#isolate-columns-in-conditions)
  - [JOINS](#joins)
  - [HAVING](#having)
  - [Set-based versus Procedural Approaches to Querying](#set-based-versus-procedural-approaches-to-querying)
  - [EXISTS() vs COUNT()](#exists-vs-count)
  - [Query Optimisation](#query-optimisation)
  - [EXPLAIN](#explain)
  - [Other Scan Algorithms](#other-scan-algorithms)
  - [Time Complexities](#time-complexities)
    - [O(1): Constant Time](#o1-constant-time)
    - [Linear Time: O(n)](#linear-time-on)
    - [Logarithmic Time: O(log (n))](#logarithmic-time-olog-n)
    - [Quadratic Time: O(n^2)](#quadratic-time-on2)
  - [SQL Tuning Summary](#sql-tuning-summary)

## Resources

1. [SQL DB Tuning for developers](https://www.toptal.com/sql-server/sql-database-tuning-for-developers)
2. [SQL Tutorial - Querying - DataCamp](https://www.datacamp.com/community/tutorials/sql-tutorial-query)
3. [SQL Optimisation Techniques](https://intellipaat.com/blog/sql-optimization-techniques/)

## Quick Understandings

1. What is query processing in a DBMS? Database management systems like SQL Server have to translate the SQL queries you give them into the actual instructions they have to perform to read or change the data in the database. After processing, the database engine then also attempts to automatically optimize the query where possible.
2. What is query optimization in SQL Server? Query optimization is when a developer, or the database engine, changes a query in such a way that SQL Server is able to return the same results more efficiently. Sometimes it's a simple as using EXISTS() instead of COUNT(), but other times the query needs to be rewritten with a different approach.
3. What is performance tuning in SQL Server? Performance tuning includes query optimization, SQL client code optimization, database index management, and in another sense, better coordination between developers and DBAs.
4. What is the use of an index in SQL? An index tracks a targeted subset of a table's data so that selecting and ordering can be done much faster, without the server having to look through every last bit of data for that table.
5. Why is `EXISTS()` faster than `COUNT()`? EXISTS() stops processing as soon as it finds a matching row, whereas COUNT() has to count every row, regardless of whether you actually need that detail in the end.

## Basic Guide to indexing

![Basic diagram for structuring queries](https://uploads.toptal.io/blog/image/127624/toptal-blog-image-1543510737731-3f314025b86047a3034060ed3153319d.png)

Note that if your tables are constantly hammered by INSERT, UPDATE, and DELETE, you should be careful when indexing — you could end up decreasing performance as all indexes need to be modified after these operations.

Further, DBAs often drop their SQL indexes before performing batch inserts of million-plus rows to speed up the insertion process. After the batch is inserted, they then recreate the indexes. Remember, however, that dropping indexes will affect every query running in that table; so this approach is only recommended when working with a single, large insertion.

## Writing SQL queries

An ideal starting point is to think of "spots" within your queries where issues might sneak in. And, in general, there are four clauses and keywords where newbies can expect performance issues to occur:

1. The `WHERE` clause
2. Any `INNER JOIN` or `LEFT JOIN` keywords
3. The `HAVING` clause

## Only Retrieve The Data You Need

> The mindset of "the more data, the better" isn’t one that you should necessarily live by when you’re writing SQL queries: not only do you risk obscuring your insights by getting more than what you actually need, but also your performance might suffer from the fact that your query pulls up too much data.

Watch for the SELECT statement, the DISTINCT clause and the LIKE operator.

1. Keep SELECT as compact as possible

In case you have correlated subqueries that have EXISTS, you should try to use a constant in the SELECT statement of that subquery instead of selecting the value of an actual column. This is especially handy when you’re checking the existence only.

Don't:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE EXISTS
  (SELECT '1'
  FROM Fines
  WHERE fines.driverslicensenr = drivers.driverslicensenr);
```

Do:

```sql
SELECT driverslicensenr, name
FROM drivers
INNER JOIN fines ON fines.driverslicensenr = drivers.driverslicensenr;
```

2. Avoid DISTINCT where possible

The SELECT DISTINCT statement is used to return only distinct (different) values. DISTINCT is a clause that you should definitely try to avoid if you can. As you have read in other examples, the execution time only increases if you add this clause to your query. It’s therefore always a good idea to consider whether you really need this DISTINCT operation to take place to get the results that you want to accomplish.

3. When you use the LIKE operator in a query, the index isn’t used if the pattern starts with `%` or `_`

It will prevent the database from using an index (if it exists). Of course, from another point of view, you could also argue that this type of query potentially leaves the door open to retrieve too many records that don’t necessarily satisfy your query goal.

## Limit Your Results

When you cannot avoid filtering down on your SELECT statement, you can consider limiting your results in other ways. Here’s where approaches such as the LIMIT clause and data type conversions come in.

You can add the LIMIT or TOP clauses to your queries to set a maximum number of rows for the result set.

```sql
SELECT TOP 3 *
FROM Drivers;
```

Note that you can further specify the PERCENT, for instance, if you change the first line of the query by SELECT TOP 50 PERCENT `*`.

```sql
SELECT driverslicensenr, name
FROM Drivers
LIMIT 2;
```

Additionally, you can also add the ROWNUM clause, which is equivalent to using LIMIT in your query:

```sql
SELECT *
FROM Drivers
WHERE driverslicensenr = 123456 AND ROWNUM <= 3;
```

## Data type conversions

You should always use the most efficient, that is, smallest, data types possible. There’s always a risk when you provide a huge data type when a smaller one will be more sufficient.

However, when you add data type conversion to your query, you only increase the execution time.

An alternative is to avoid data type conversion as much as possible. Note also here that it’s not always possible to remove or omit the data type conversion from your queries, but that you should definitely aim to be careful in including them and that when you do, you test the effect of the addition before you run the query.

## Keep queries as simple as possible

### When you use the `OR` operator in your query, it’s likely that you’re not using an index

Remember that an index is a data structure that improves the speed of the data retrieval in your database table, but it comes at a cost: there will be additional writes, and additional storage space is needed to maintain the index data structure. Indexes are used to quickly locate or look up data without having to search every row in a database every time the database table is accessed. Indexes can be created by using one or more columns in a database table.

Avoid:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE driverslicensenr = 123456
OR driverslicensenr = 678910
OR driverslicensenr = 345678;
```

Do:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE driverslicensenr IN (123456, 678910, 345678);
```

Another alternative is to use two SELECT statements with a UNION. You need to be careful not to unnecessarily use the UNION operation because you go through the same table multiple times. At the same time, you have to realize that when you use a UNION in your query, the execution time will increase. Alternatives to the UNION operation are: reformulating the query in such a way that all conditions are placed in one SELECT instruction, or using an OUTER JOIN instead of UNION.

Note that questies that do use an `OR` statement may likely not be using an index as index lookups aren't always preferred.

### Alternatives to NOT

When your query contains the NOT operator, it’s likely that the index is not used, just like with the OR operator. This will inevitably slow down your query.

Example:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE NOT (year > 1980);
```

The above will definitely run slower than you would maybe expect, mainly because it’s formulated a lot more complex than it could be: in cases like this one, it’s best to look for an alternative. Consider replacing NOT by comparison operators, such as >, <> or !>; The example above might indeed be rewritten and become something like this:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE year <= 1980;
```

### Alternatives to AND

The AND operator is another operator that doesn’t make use of the index, and that can slow your query down if used in an overly complex and inefficient way:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE year >= 1960 AND year <= 1980;
```

It is better in the above example to use BETWEEN:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE year BETWEEN 1960 AND 1980;
```

### Alternatives top ANY and ALL Operators

ANY and ALL prevents use of indexes. Alternatives that will come in handy are aggregative functions ie SUM, AVG, MIN, MAX. Be aware of the fact that all aggregation functions like SUM, AVG, MIN, MAX over many rows can result in a long-running query. In such cases, try to either minimize the number of rows to handle or pre-calculate these values.

### Isolate Columns in Conditions

In cases where a column is used in a calculation or in a scalar function, the index isn’t used. A possible solution would be to simply isolate the specific column so that it no longer is a part of the calculation or the function.

Don't:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE year + 10 = 1980;
```

Do:

```sql
SELECT driverslicensenr, name
FROM Drivers
WHERE year = 1970;
```

## JOINS

1. Order of tables: When you join two tables, you might want to rewrite your query so that the biggest table is placed last in the join.
2. Redundant Conditions on Joins: When you add too many conditions to your joins, you obligate SQL to choose a particular path. It could be, though, that this path isn’t always the more performant one.

## HAVING

The HAVING clause was initially added to SQL because the WHERE keyword could not be used with aggregate functions. HAVING is typically used with the GROUP BY clause to restrict the groups of returned rows to only those that meet certain conditions. However, if you use this clause in your query, the index is not used, which - as you already know - can result in a query that doesn’t really perform all that well.

Don't:

```sql
SELECT state, COUNT(*)
FROM Drivers
GROUP BY state
HAVING state IN ('GA', 'TX')
ORDER BY state
```

Do:

```sql
SELECT state, COUNT(*)
FROM Drivers
WHERE state IN ('GA', 'TX')
GROUP BY state
ORDER BY state
```

The first query uses the WHERE clause to restrict the number of rows that need to be summed, whereas the second query sums up all the rows in the table and then uses HAVING to throw away the sums it calculated. In these types of cases, the alternative with the WHERE clause is obviously the better one, as you don’t waste any resources.

You see that this is not about limiting the result set, but instead about limiting the intermediate number of records within a query.

Note that the difference between these two clauses lies in the fact that the WHERE clause introduces a condition on individual rows, while the HAVING clause introduces a condition on aggregations or results of a selection where a single result, such as MIN, MAX, SUM... has been produced from multiple rows.

## Set-based versus Procedural Approaches to Querying

The set-based approach of querying is also the one that most top employers in the data science industry will ask of you to master! You’ll often need to switch between these two types of approaches.

Note that if you ever find yourself with a procedural query, you should consider rewriting or refactoring it.

## EXISTS() vs COUNT()

This SQL optimization technique concerns the use of EXISTS(). If you want to check if a record exists, use EXISTS() instead of COUNT(). While COUNT() scans the entire table, counting up all entries matching your condition, EXISTS() will exit as soon as it sees the result it needs. This will give you better performance and clearer code.

Don't:

```sql
IF (SELECT COUNT(1) FROM EMPLOYEES WHERE FIRSTNAME LIKE '%JOHN%') > 0
    PRINT 'YES'
```

Do:

```sql
IF EXISTS(SELECT FIRSTNAME FROM EMPLOYEES WHERE FIRSTNAME LIKE '%JOHN%')
    PRINT 'YES'
```

## Query Optimisation

Some tools will be able to provide you with a textual description of the query plan. One example is the EXPLAIN PLAN statement in Oracle, but the name of the instruction varies according to the RDBMS that you’re working with. Elsewhere, you might find EXPLAIN (MySQL, PostgreSQL) or EXPLAIN QUERY PLAN (SQLite).

Note that if you’re working with PostgreSQL, you make the difference between EXPLAIN, where you just get a description that states the idea of how the planner intends to execute the query without running it, while EXPLAIN ANALYZE actually executes the query and returns to you an analysis of the expected versus actual query plans. Generally speaking, a real execution plan is one where you actually run the query, whereas an estimated execution plan works out what it would do without executing the query.

## EXPLAIN

```sql
EXPLAIN
SELECT *
FROM one_million;

QUERY PLAN
____________________________________________________
Seq Scan on one_million
(cost=0.00..18584.82 rows=1025082 width=36)
(1 row)
```

You see that the cost of the query is `0.00..18584.82` and that the number of rows is `1025082`. The width of number of columns is then `36`.

You can then renew your statistical information with the help of ANALYZE.

```sql
ANALYZE one_million;
EXPLAIN
SELECT *
FROM one_million;

QUERY PLAN
____________________________________________________
Seq Scan on one_million
(cost=0.00..18334.00 rows=1000000 width=37)
(1 row)
```

Retrieving the actual execution time:

```sql
EXPLAIN ANALYZE
SELECT *
FROM one_million;

QUERY PLAN
___________________________________________________________
Seq Scan on one_million
(cost=0.00..18334.00 rows=1000000 width=37)
(actual time=0.015..1207.019 rows=1000000 loops=1)
Total runtime: 2320.146 ms
(2 rows)
```

Up until now, all the algorithms you have seen is the Seq Scan (Sequential Scan) or a Full Table Scan: this is a scan made on a database where each row of the table under scan is read in a sequential (serial) order, and the columns that are found are checked for whether they fulfill a condition or not. Concerning performance, the Sequential Scan is definitely not the best execution plan out there because you’re still doing a full table scan. However, it’s not too bad when the table doesn’t fit into memory: sequential reads go quite fast even with slow disks.

## Other Scan Algorithms

There will also be index scan, hash join, merge join.

NOTE: Even though the following examples say that `Hash Join` happens without an index and `Merge Join` with, my tests on DB Fiddle say the opposite happens. It makes more sense to me if a hash join is used for an index given how hash maps would work.

```sql
EXPLAIN ANALYZE
SELECT *
FROM one_million JOIN half_million
ON (one_million.counter=half_million.counter);
QUERY PLAN
_________________________________________________________________
Hash Join (cost=15417.00..68831.00 rows=500000 width=42)
(actual time=1241.471..5912.553 rows=500000 loops=1)
Hash Cond: (one_million.counter = half_million.counter)
    -> Seq Scan on one_million
    (cost=0.00..18334.00 rows=1000000 width=37)
    (actual time=0.007..1254.027 rows=1000000 loops=1)
    -> Hash (cost=7213.00..7213.00 rows=500000 width=5)
    (actual time=1241.251..1241.251 rows=500000 loops=1)
    Buckets: 4096 Batches: 16 Memory Usage: 770kB
    -> Seq Scan on half_million
    (cost=0.00..7213.00 rows=500000 width=5)
(actual time=0.008..601.128 rows=500000 loops=1)
Total runtime: 6468.337 ms
```

You see that the query optimizer chose for a Hash Join here! Remember this operation, as you’ll need this to estimate the time complexity of your query. For now, note that there is no index on half_million.counter, which you could add in the next example:

```sql
CREATE INDEX ON half_million(counter);
EXPLAIN ANALYZE
SELECT *
FROM one_million JOIN half_million
ON (one_million.counter=half_million.counter);
QUERY PLAN
________________________________________________________________
Merge Join (cost=4.12..37650.65 rows=500000 width=42)
(actual time=0.033..3272.940 rows=500000 loops=1)
Merge Cond: (one_million.counter = half_million.counter)
    -> Index Scan using one_million_counter_idx on one_million
    (cost=0.00..32129.34 rows=1000000 width=37)
    (actual time=0.011..694.466 rows=500001 loops=1)
    -> Index Scan using half_million_counter_idx on half_million
    (cost=0.00..14120.29 rows=500000 width=5)
(actual time=0.010..683.674 rows=500000 loops=1)
Total runtime: 3833.310 ms
(5 rows)
```

By creating the index, the query optimizer has now decided to go for a `Merge join` where `Index Scans` are happening.

Note the difference between the index scan and the full table scan or sequential scan: the former, which is also called "table scan", scans the data or index pages to find the appropriate records, while the latter scans each row of the table.

## Time Complexities

Note, though, that there are different types of indexes, different execution plans and different implementations for various databases to consider, so that the time complexities listed below are very general and can vary according to your specific setting.

### O(1): Constant Time

An algorithm is said to run in constant time if it requires the same amount of time regardless of the input size. When you’re talking about a query, it will run in constant time if it requires the same amount of time irrespective of the table size.

These type of queries are not really common, yet here’s one such an example:

```sql
SELECT TOP 1 t.*
FROM t
```

The time complexity is constant because you select one arbitrary row from the table. Therefore, the length of the time should be independent of the size of the table.

### Linear Time: O(n)

An algorithm is said to run in linear time if its time execution is directly proportional to the input size, i.e. time grows linearly as input size increases. For databases, this means that the time execution would be directly proportional to the table size: as the number of rows in the table grows, the time for the query grows.

An example is a query with a WHERE clause on a un-indexed column: a full table scan or Seq Scan will be needed, which will result in a time complexity of `O(n)`. This means that every row needs to be read to find the one with the right ID. You don’t have a limit at all, so every row does need to be read, even if the first row matches the condition.

Consider also the following example of a query that would have a complexity of `O(n)` if there’s no index on i_id:

```sql
SELECT i_id
FROM item;
```

The previous also means that other queries, such as count queries like `COUNT(*) FROM TABLE;` will have a time complexity of O(n), because a full table scan will be required unless the total row count is stored for the table. Then, the complexity would be more like `O(1)`.

Closely related to the linear execution time is the execution time for execution plans that have joins in them. Here are some examples:

A hash join has an expected complexity `O(M + N)`. The classic hash join algorithm for an inner join of two tables first prepares a hash table of the smaller table. The hash table entries consist of the join attribute and its row. The hash table is accessed by applying a hash function to the join attribute. Once the hash table is built, the larger table is scanned and the relevant rows from the smaller table are found by looking in the hash table.

Merge joins generally have a complexity of `O(M+N)` but it will heavily depend on the indexes on the join columns and, in cases where there is no index, on whether the rows are sorted according to the keys used in the join:

If both tables that are sorted according to the keys that are being used in the join, then the query will have a time complexity of `O(M+N)`.

If both tables have an index on the joined columns, then the index already maintains those columns in order, and there’s no need to sort. The complexity will be `O(M + N)`.
If neither table has an index on the joined columns, a sort of both tables will need to happen first so that the complexity will look more like `O(M log M + N log N)`.
If only one of the tables has an index on the joined columns, only the one table that doesn’t have the index will need to be sorted before the merge step can happen so that the complexity will look like `O(M + N log N)`.

For nested joins, the complexity is generally `O(MN)`. This join is efficient when one or both of the tables are extremely small (for example, smaller than 10 records), which is a very common situation when evaluating queries because some subqueries are written to return only one row.

Remember: a nested join is a join that compares every record in one table against every record in the other.

### Logarithmic Time: O(log (n))

An algorithm is said to run in logarithmic time if its time execution is proportional to the logarithm of the input size; For queries, this means that they will run if the execution time is proportional to the logarithm of the database size.

This logarithmic time complexity is true for query plans where an Index Scan or clustered index scan is performed. A clustered index is an index where the leaf level of the index contains the actual data rows of the table. A clustered is much like any other index: it is defined on one or more columns. These form the index key. The clustering key is then the key columns of a clustered index. A clustered index scan is then basically the operation of your RDBMS reading through for the row or rows from top to bottom in the clustered index.

Consider the following query example, where the there’s an index on i_id and which would generally result in a complexity of `O(log(n))`:

```sql
SELECT i_stock
FROM item
WHERE i_id = N;
```

Note that without the index, the time complexity would have been O(n).

### Quadratic Time: O(n^2)

An algorithm is said to run in quadratic time if its time execution is proportional to the square of the input size. Once again, for databases, this means that the execution time for a query is proportional to the square of the database size.

A possible example of a query with quadratic time complexity is the following one:

```sql
SELECT *
FROM item, author
WHERE item.i_a_id=author.a_id
```

The minimum complexity would be `O(n log(n))`, but the maximum complexity could be `O(n^2)`, based on the index information of the join attributes.

![Big-O Complexity Chart](http://community.datacamp.com.s3.amazonaws.com/community/production/ckeditor_assets/pictures/672/content_bigo.png)

## SQL Tuning Summary

1. Replace unnecessary large-table full table scans with index scans.
2. Make sure that you’re applying the optimal table join order.
3. Make sure that you’re using the indexes optimally; and
4. Cache small-table full table scans.
