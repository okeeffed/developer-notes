# 25: Advanced Query Tuning

## Developing an Intuitive Understanding of Cost

Not super accurate, but good enough for now:

> Amount of time to execute some part of the query plan.

This is working definition at this stage.

For our planner, how do we compare the cost of different plans? More simply, it is a direct comparison of cost.

> Note: Loading data from random spots off a hard drive usually takes more time than loading data sequentially. We assign a different "cost" factor to sequential vs. random access.

## Calculating Cost By Hand

The cost of our SEQ SCAN is calculated as `(# pages) * 1.0 + (# rows) * 0.01`.

If you put in the numbers from the information we get from the `EXPLAIN ANALYZE`, we can manually calculate the cost.

## A Touch More On Costs

Some hard rules:

```
cost = (# pages) * seq_page_cost
			+ (# pages read at random) * random_page_cost
			+ (# rows scanned) * cpu_tuple_cost
			+ (# index entries scanned) * cpu_index_tuple_cost
			+ (# times function/operator evaluated) * cpu_operator_cost
```

A useful page of constant values can be found [here](https://postgresql.org/docs/14/interactive/runtime-config-query.html#RUNTIME-CONFIG-QUERY-CONSTANTS).

## Startup vs Total Costs

Why does cost have two numbers?

1. The first is the cost to produce the first row.
2. The second is to produce all rows.

## Costs Flow Up

This may have been noticeable already, but all the costs from the plan flow up to get the total cost.

## Use My Index!

In this example, there is a demonstration of the `likes` table when getting all likes. The first is done without an index, the second is.

There is a dramatic change in the index `EXPLAIN` when we use `>` instead of `<`. Why?

It uses a sequential scan use because we are trying to find a tremendous amount of data. Using an index for that sort of query won't help us at all.
