# 29: Optimizing Queries With Materialized Views

## Materialized Views

Materialized views are a variation of a view.

- Views are a query that gets executed every time you refer to it.
- Materialized Views are queries that get executed at very specific times, but the results are saved and can be referenced without rerunning the query.

There is a parallel here between CTEs and Views.

Simple CTEs and Views are convenience tools, while Recursive CTEs and Materialized Views add major functionality.

## Grouping by week

"For each week, show the number of `likes` that posts and comments received. Use the post and comment `created_at` date, not when the like was received."

For us, say we want to group by dates like `2010-01-01`, `2010-01-08` etc.

## Reminder on left joins

This particular ask requires a three-way join, so we need a `LEFT OUTER JOIN`.

```sql
SELECT
	date_trunc('week', COALEASE(posts.created_at, comments.created_at)) AS week,
	COUNT(posts.id) AS num_likes_for_posts
	COUNT(comments.id) AS num_likes_for_comments
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.i = likes.comment_id
GROUP BY week
ORDER BY week
```

On a computer, Stephen notes that it takes him 2-3 seconds to run.

(You could run `EXPLAIN ANALYZE` to get more info on times).

## Creating and refreshing materialized views

You can create the materialized like so:

```sql
CREATE MATERIALIZED VIEW weekly_likes AS (
	SELECT
		date_trunc('week', COALEASE(posts.created_at, comments.created_at)) AS week,
		COUNT(posts.id) AS num_likes_for_posts
		COUNT(comments.id) AS num_likes_for_comments
	FROM likes
	LEFT JOIN posts ON posts.id = likes.post_id
	LEFT JOIN comments ON comments.i = likes.comment_id
	GROUP BY week
	ORDER BY week
) WITH DATA;
```

If we then run the query again with `SELECT * FROM weekly_likes`, it will be much faster (59ms on the demo).

The one downside is that if the data is modified, it won't modify the cached results. We need to tell Postgres to go back and run the code.

```sql
REFRESH MATERIALIZED VIEW weekly_likes;
```

You have to manually tell Postgres to re-run the views.
