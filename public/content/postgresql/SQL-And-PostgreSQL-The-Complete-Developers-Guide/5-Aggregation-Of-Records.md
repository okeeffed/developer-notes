# 5: Aggregation Of Records

## Aggregating and Grouping

Grouping:

- Reduces many rows down to fewer rows.
- Done by `GROUP BY` keyword.
- Visualizing the result is key to use.

Aggregates:

- Reduces many values down to one.
- Done by using 'aggregate functions'.

## Picturing Group By

```sql
SELECT user_id
FROM comments
GROUP BY user_id;
```

Our query is trying to find the unique values of our `user_id`.

There is a big catch. We cannot select any columns from our original table that is not a GROUPED column. If you do not, you will get an error.

## Aggregate Functions

Some examples of aggregate functions are `COUNT()`, `MAX()`, `MIN()`, `SUM()`, `AVG()`.

```sql
SELECT MAX(id) FROM comments; -- 100
SELECT MIN(id) FROM comments; -- 1
```

You cannot aggregate on a column and select that column at the same time.

## Combining GROUP BY and Aggregate Functions

When using GROUP BY, you can actually select the results of aggregate functions.

The following would work.

```sql
SELECT user_id, MAX(id)
FROM comments
GROUP BY user_id;
```

A good use case of this is COUNT.

```sql
SELECT user_id, COUNT(id) as num_comments_created
FROM comments
GROUP BY user_id;
```

## A Gotcha With COUNT

If you use `COUNT` on columns, `NULL` values **ARE NOT COUNTED** by default. You are best to use `COUNT(*)` to count up the number of rows.

## Filtering Groups With Having

The difference between `WHERE` and `HAVING` is that `WHERE` will filter on the set of rows while `HAVING` filters the set of groups.

You will never see a `HAVING` without a `GROUP BY`.

"Find the number of comments for each photo where the `photo_id` is less than 3 and the photo has more than 2 comments."

```sql
SELECT comments.photo_id, COUNT(*) as num_of_comments
FROM comments
WHERE comments.photo_id < 3
GROUP BY comments.photo_id
HAVING COUNT(*) > 2;
```
