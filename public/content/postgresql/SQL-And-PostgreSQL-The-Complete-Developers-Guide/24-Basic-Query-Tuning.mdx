# 24: Basic Query Tuning

## The Query Processing Pipeline

How do we evaluate what makes a good query and what makes a bad query?

1. Query is turning into a query tree by the parser.
2. The rewriting looks at the query tree and modifies it if it thinks it can improve it and also decompose views into underlying table references.
3. The planner is what we care about. It comes up with plans/strategies on how to get the info.
4. Finally the plan is executed.

The process that the planner goes through is what the following videos focus on.

## EXPLAIN and EXPLAIN ANALYZE

| Term            | Description                                           |
| --------------- | ----------------------------------------------------- |
| EXPLAIN         | Build a query plan and display info about it.         |
| EXPLAIN ANALYZE | Build a query plan, run it and display info about it. |

These are used for benchmarking + evaluating queries. You will never use them in for fetching real data.

You can also use the `explain analyze` dropdown option when running a query in PGAdmin.

## Solving an Explain Mystery

In the EXPLAIN output: any line that has an arrow `->` is known as a query node.

Note that the top line is also technically a query node, although there is no arrow.

A breakdown of one line `Hash Join (cost=0.00..1.00 rows=1 width=4)` is as follows:

1. `Hash Join` is how the node is generating the data.
2. `cost` is the amount of processing power required for this step.
3. `rows` is a guess at how many rows the step will produce.
4. `width` is a guess at the average number of bytes of each row.

How does Postgres make a guess at some of those numbers? It uses the `pg_stats` table.

You can see this with:

```sql
SELECT *
FROM pg_stats
WHERE tablename = 'users'
```

The data here helps Postgres make an educated guess.
