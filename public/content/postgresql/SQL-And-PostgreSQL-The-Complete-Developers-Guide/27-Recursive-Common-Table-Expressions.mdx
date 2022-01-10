# 27: Recursive Common Table Expressions

- Very different from CTEs.
- Most useful when dealing with graph or tree data structures.
- Must use a 'union' keyword - simple CTEs don't have to use a UNION.
- Very advanced, best to at least know they exist.

An example:

```sql
WITH RECURSIVE countdown(val) AS (
	SELECT 3 as val
	UNION
	SELECT val - 1 FROM countdown WHERE val > 0
)
SELECT *
FROM countdown;
--- returns values 3, 2, 1
```

## Recursive CTEs Step by Step

Why would we want to use this?

```sql
WITH RECURSIVE countdown(val) AS (
	SELECT 3 as val -- Initial, non-recursive query
	UNION
	SELECT val - 1 FROM countdown WHERE val > 0 -- recursive query
)
SELECT *
FROM countdown;
--- returns values 3, 2, 1
```

The steps that this runs by:

1. Define the results and working tables.
2. Run the initial non-recursive statement, put them into the results table and working table.
3. Run the recursive statement replacing the table name 'countdown' with a reference to the working table.
4. If recursive statement returns some rows, append them to the results table and run recursion again.
5. If recursive statement returns no rows, stop recursion.

## Why use Recursive CTEs?

A more practical in our use case would be things like "Instagram suggestions".

```sql
WITH RECURSIVE suggetions(leader_id, follower_id, depth) AS (
		SELECT leader_id, follower_id, 1 AS depth
		FROM followers
		WHERE follower_id = 1000
	UNION
		SELECT followers.leader_id, followers.follower_id, depth + 1
		FROM followers
		JOIN suggetions ON followers.leader_id = suggetions.follower_id
		WHERE depth < 3
)
SELECT DISTINCT users.id, users.username
FROM suggestions
JOIN users ON users.id = suggestions.leader_id
WHERE depth > 1
LIMIT 5;
```
