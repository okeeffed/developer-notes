# 9: Assembling Queries With Subqueries

## What's a Subquery

"List the name and price of all products that are more expensive than all products in the 'Toys' department."

```sql
SELECT name, price
FROM products
WHERE price > (
	SELECT MAX(price)
	FROM products
	WHERE department = 'Toys'
);
```

## Thinking About the Structure of Data

Subqueries can be used as:

- A source of a value. Eg. `SELECT COUNT(*) FROM products`.
- A source of rows. Eg. `SELECT * FROM order`.
- A source of a column. Eg. `SELECT id FROM order`.

## Subqueries in a SELECT

```sql
SELECT name, (
	SELECT COUNT(*) from example
) as count
FROM users;
```

## Subqueries in a FROM

```sql
SELECT name, price_weight_ratio
FROM (
	SELECT name, price / weight AS price_weight_ratio FROM products
) AS p
WHERE price_weight_ratio > 5;
```

> Note: a subquery must have an alias applied to it in a FROM clause.

## FROM subqueries that return a value

```
SELECT *
FROM (
	SELECT MAX(price) FROM products) AS p;
);
```

## Example of a subquery in a FROM

"Find the average number of orders for all users."

We can use a subquery to find the average number of orders for all users (although it is still an INTEGER in our case so far).

```sql
SELECT AVG(order_count)
FROM (
-- Using GROUP BY
SELECT user_id, COUNT(*) AS order_count
FROM orders
GROUP BY user_id
) AS p;
```

Note: There are far easier ways to do this than a subquery. Take notice of performance when writing these.

## Subqueries in a JOIN clause

Here is a contrived example of a subquery in a JOIN clause.

```sql
SELECT first_name
FROM users
JOIN (
  SELECT user_id
  FROM orders
  WHERE product_id = 3
) AS o
ON o.user_id = users.id;
```

> Note: requires alias as well.

## More useful - subqueries with WHERE

Here is another contrived example.

"Show the id of order that involve a product with a price/weight ration greater than 5."

```sql
SELECT id
FROM orders
WHERE product_id
IN (
	SELECT id
  FROM products
  WHERE price / weight > 50
);
```

> Note: it was brought up here about performance and that rewriting this as a JOIN statement might actually end up the same with Performance thanks to how Postgres interprets the query.

## Data structure with WHERE subqueries

- For most operators, it will return a single value.
- `IN` and `NOT IN` will return a single column, as well as operators with the `ALL/SOME/ANY` keyword.

A contrived example from the quiz:

```sql
SELECT name, price
FROM phones
WHERE price > (
    SELECT price
  	FROM phones
    WHERE name = 'S5620 Monte' AND manufacturer = 'Samsung'
);
```

# The NOT IN operator with a list

```sql
SELECT name
FROM products
WHERE department NOT IN (
	SELECT department
	FROM products
	WHERE price < 100
);
```

## A New Where Operator

"Show the name, department and price of products that are more expensive than all products in the 'Industrial' department".

The following is a contrived example to make use of the `> ALL` keyword.

```sql
SELECT name, department, price
FROM products
WHERE price > ALL (
	SELECT price
	FROM products
	WHERE department = 'Industrial'
);
```

## Finally SOME

`SOME` does as you might expect where you want the clause like `50 < SOME` to evaluate such that _at least_ one value is less than 50.

## Probably too much about Correlated Subqueries

"Show the name, department and price of the most expensive product in each department."

```sql
SELECT name, department, price
FROM products AS p1
WHERE p1.price = (
	SELECT MAX(price)
	FROM products AS p2
	WHERE p2.department = p1.department
);
```

Correlated subqueries makes use of aliases to help with reducing complexity.

We are referring to a row in our top query in our subquery.

## More on correlated subqueries

"Without using a join or a group by, print the number of orders for each product."

We can make use of correlated subqueries within select too!

```sql
SELECT name, (
	SELECT COUNT(*)
	FROM orders AS o1
	WHERE o1.product_id = p1.id
) AS num_orders
FROM products AS p1
```

## A SELECT without a FROM?

```sql
SELECT (
	SELECT MAX(price)
	FROM products
) AS max;
```

Why would we ever do this? Maybe when we want to calculate one value from multiple operations.

A contrived example:

```sql
SELECT (
	SELECT MAX(price)
	FROM products
) / (
	SELECT MIN(price)
	FROM products
) AS max_div_min;
```
