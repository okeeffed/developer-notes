A list of the answers I wrote for the basics quiz.

## Task 1

```sql
SELECT *
FROM horoscope
WHERE (sign = 'Pisces' OR sign = 'Aquarius')
AND year BETWEEN 2010 AND 2014;
```

## Task 2

```sql
SELECT pet.name, pet.type, pet.year_born as pet_year_born, owner.name, owner.year_born as owner_year_born
FROM pet
JOIN owner
ON pet.owner_id = owner.id
WHERE pet.name LIKE 'M%';
```

## Task 3

```sql
SELECT person, COUNT(*) as number_of_essays, AVG(points) as avg_points
FROM essay
GROUP BY person
HAVING AVG(points) > 80;
```

## Task 4

```sql
SELECT *
FROM coach
LEFT OUTER JOIN player
ON player.id = coach.player_id;
```

## Task 5

```sql
SELECT *
FROM prison
WHERE id IN (
	SELECT prison_id
  	FROM prisoner
  	WHERE age >= 50
);
```

## Task 6

```sql
SELECT *
FROM gluten_free_product

INTERSECT

SELECT *
FROM vegetarian_product;
```

## Task 7

```sql
SELECT
	customer.id AS cus_id,
    customer.name AS cus_name,
    (
      SELECT id
	  FROM purchase
      WHERE customer_id = customer.id
      ORDER BY purchase.id DESC
      LIMIT 1
    ) as latest_purchase_id,
    (
      SELECT SUM(purchase_item.quantity)
      FROM purchase
      JOIN purchase_item
      ON purchase.id = purchase_item.purchase_id
      WHERE purchase.customer_id = customer.id
    ) as all_items_purchased
FROM customer;
```
