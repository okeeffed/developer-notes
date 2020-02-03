---
menu: SQL
name: Indexing Example
---

# Indexing Example

The following is done on PostgresSQL 12.

## Resources

1. [DB Fiddle](https://www.db-fiddle.com/)

## Without Indexing

```sql
CREATE TABLE test (
  id INT,
  count INT
);
INSERT INTO test (id, count) VALUES (1,1);
INSERT INTO test (id, count) VALUES (2,2);
INSERT INTO test (id, count) VALUES (3,3);

CREATE TABLE test_two (
  id INT,
  count INT
);
INSERT INTO test_two (id, count) VALUES (1,1);
INSERT INTO test_two (id, count) VALUES (2,2);
INSERT INTO test_two (id, count) VALUES (3,3);
CREATE INDEX ON test_two(count)

EXPLAIN ANALYZE
SELECT * FROM test JOIN test_two ON (test.id = test_two.id)
```

The QUERY PLAN returns:

```sql
Merge Join (cost=317.01..711.38 rows=25538 width=16) (actual time=0.050..0.052 rows=3 loops=1)
Merge Cond: (test.id = test_two.id)
-> Sort (cost=158.51..164.16 rows=2260 width=8) (actual time=0.029..0.030 rows=3 loops=1)
Sort Key: test.id
Sort Method: quicksort Memory: 25kB
-> Seq Scan on test (cost=0.00..32.60 rows=2260 width=8) (actual time=0.005..0.005 rows=3 loops=1)
-> Sort (cost=158.51..164.16 rows=2260 width=8) (actual time=0.018..0.018 rows=3 loops=1)
Sort Key: test_two.id
Sort Method: quicksort Memory: 25kB
-> Seq Scan on test_two (cost=0.00..32.60 rows=2260 width=8) (actual time=0.006..0.006 rows=3 loops=1)
Planning Time: 0.301 ms
Execution Time: 0.132 ms
```

## With Indexing

```sql
CREATE TABLE test (
  id INT,
  count INT
);
INSERT INTO test (id, count) VALUES (1,1);
INSERT INTO test (id, count) VALUES (2,2);
INSERT INTO test (id, count) VALUES (3,3);

CREATE TABLE test_two (
  id INT,
  count INT
);
INSERT INTO test_two (id, count) VALUES (1,1);
INSERT INTO test_two (id, count) VALUES (2,2);
INSERT INTO test_two (id, count) VALUES (3,3);
CREATE INDEX ON test_two(count)

EXPLAIN ANALYZE
SELECT * FROM test JOIN test_two ON (test.id = test_two.id)
```

The QUERY PLAN returns:

```sql
Hash Join (cost=1.07..42.48 rows=34 width=16) (actual time=0.058..0.059 rows=3 loops=1)
Hash Cond: (test.id = test_two.id)
-> Seq Scan on test (cost=0.00..32.60 rows=2260 width=8) (actual time=0.003..0.004 rows=3 loops=1)
-> Hash (cost=1.03..1.03 rows=3 width=8) (actual time=0.011..0.011 rows=3 loops=1)
Buckets: 1024 Batches: 1 Memory Usage: 9kB
-> Seq Scan on test_two (cost=0.00..1.03 rows=3 width=8) (actual time=0.001..0.002 rows=3 loops=1)
Planning Time: 0.443 ms
Execution Time: 0.121 ms
```
