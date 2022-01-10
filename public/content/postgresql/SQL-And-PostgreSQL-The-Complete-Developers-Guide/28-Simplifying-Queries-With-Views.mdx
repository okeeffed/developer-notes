# 28: Simplifying Queries With Views

## Most Popular Users

"Find the most popular users - users who were tagged the most."

We could do another union between `post_tags` and `caption_tags` like we have done prior. Then we could join between `users` and `tags`.

```sql
SELECT username, COUNT(*) AS num_tags
FROM users
JOIN (
	SELECT user_id
	FROM post_tags
	UNION
	SELECT user_id
	FROM caption_tags
) AS tags
ON tags.user_id = users.id
GROUP BY username
ORDER BY COUNT(*) DESC
```

If we run it, what is awkward about it? The awkward part is that once again we needed to do a UNION between these two tags tables.

How can we improve this situation?

## A possible solution for merging

What are the possible solutions?

1. Merge the two tables, delete the original ones. BUT we cannot copy the IDs of `photo_tags` and `caption_tags` since they must be unique. If we delete the original tables, we break any existing queries that refer to them.
2. Create a view.

## Create a VIEW

- You can think of a view as a "fake table" that has rows from other tables.
- You can think of views as similar to CTEs.
- These can be exact rows as they exist on another table or a computed value.
- Can reference the view in any place where we'd normally reference a table.
- View doesn't actually create a new table or move any data around.
- Doesn't have to be used for a union! Can compute absolutely any values.

To create a new view.

```sql
CREATE VIEW tags AS (
	SELECT id, created_at, user_id, post_id, 'photo_tag' AS type FROM photos_tags
	UNION ALL
	SELECT id, created_at, user_id, post_id, 'caption_tag' AS type FROM photos_tags
);

SELECT * FROM tags; -- will return all type
```

## When to use a view

Another example: "Find the 10 most recent posts".

```sql
CREATE VIEW recent_posts AS (
	SELECT *
	FROM posts
	ORDER BY created_at DESC
	LIMIT 10
);

SELECT * FROM recent_posts;
```

Now if we want to 10 most recent users from the recent posts:

```sql
SELECT username
FROM recent_posts
JOIN users ON users.id = recent_posts.user_id
```

## Deleting and changing views

```sql
CREATE OR REPLACE VIEW recent_posts AS (
	SELECT *
	FROM posts
	ORDER BY created_at DESC
	LIMIT 15
);
```

Deleting a view:

```sql
DROP VIEW recent_posts;
```
