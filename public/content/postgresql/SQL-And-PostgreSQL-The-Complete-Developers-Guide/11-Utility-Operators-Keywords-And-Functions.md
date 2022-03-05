# 11: Utility Operators Keywords And Functions

## The Greatest Value in a List

```sql
SELECT GREATEST(200, 10, 40); -- returns 200
```

An example of needing this might be to calculate shipping costs.

```sql
SELECT name, weight, GREATEST(30, 2 * weight) AS shipping_cost
FROM products;
```

## The Least Value in a List

```sql
SELECT LEAST(200, 10, 40); -- returns 10
```

## The CASE keyword

"If price > 600 then 'high, if price > 300 then 'medium' else 'cheap'"

```sql
SELECT name, price,
CASE price
	WHEN 600 THEN 'high'
	WHEN 300 THEN 'medium'
	ELSE 'cheap'
END AS price_category
FROM products;
```
