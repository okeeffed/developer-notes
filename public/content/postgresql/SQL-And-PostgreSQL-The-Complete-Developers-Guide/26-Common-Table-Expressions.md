# 26: Common Table Expressions

"We want all users that were tagged in a caption or a photo before Jan 7th.""

```sql
SELECT users.username, tags.created_at
FROM users
JOIN (
	SELECT user_id, created_at FROM caption_tags
	UNION ALL
	SELECT user_id, created_at FROM photo_tags
) AS tags ON tags.user_id = users.id
WHERE tags.created_at < '2010-01-07';
```

It might be challenging to understand what is going on. Can we rewrite this another way to make it easier to understand?

## So what's a CTE?

```sql
-- this is our Common Table Expression
WITH tags AS (
	SELECT user_id, created_at FROM caption_tags
	UNION ALL
	SELECT user_id, created_at FROM photo_tags
)

SELECT users.username, tags.created_at
FROM users
JOIN tags ON tags.user_id = users.id
WHERE tags.created_at < '2010-01-07';
```

This query now makes it easier to read.
