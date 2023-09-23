Subqueries have been introduced to help you with such examples. They are **"queries inside queries"** and they are always put in parentheses.

```sql
SELECT name
FROM city
WHERE rating = (
  SELECT rating
  FROM city
  WHERE name = 'Paris'
);
```

The database will first check the subquery (in the parentheses), then return the result of the query (in this case, the number 5) in place of the subquery and then check the final query.

```sql
SELECT *
FROM city
WHERE area = (
	SELECT area
  	FROM city
  	WHERE name = 'Paris'
);

SELECT name
FROM city
WHERE city.population < (
	SELECT population
  	FROM city
  	WHERE city.name = 'Madrid'
);

SELECT *
FROM trip
WHERE price > (
	SELECT AVG(price)
  	FROM trip
);
```

## IN operator

```sql
SELECT *
FROM city
WHERE rating IN (3, 4, 5);

SELECT *
FROM hiking_trip
WHERE difficulty IN (1,2,3);

SELECT *
FROM trip
WHERE city_id IN (
  SELECT id
  FROM city
  WHERE area > 100
);
```

## ALL operator

Can be used with logical operators.

`> ALL` means "greater than every other value from the parentheses".

```sql
SELECT *
FROM city
WHERE population < ALL (
	SELECT population
  	FROM country
);

SELECT *
FROM trip
WHERE price = ANY (
	SELECT price
  	FROM hiking_trip
);
```

## Correlated queries

```sql
SELECT *
FROM country
WHERE area <= (
  SELECT MIN(area)
  FROM city
  WHERE city.country_id = country.id
);

SELECT *
FROM country
WHERE population <= (
  SELECT MIN(population)
  FROM city
  WHERE city.country_id = country.id
 );
```

More examples

```sql
SELECT *
FROM city AS main_city
WHERE rating > (
	SELECT AVG(rating)
  	FROM city as avg_city
  	WHERE avg_city.country_id = main_city.country_id
);

SELECT *
FROM trip
WHERE trip.city_id IN (
	SELECT id
  	FROM city
  	WHERE city.rating < 4
);
```

## EXISTS

`EXISTS` is a new operator. It checks **if there are any rows that meet the condition**.

```sql
SELECT *
FROM city
WHERE EXISTS (
  SELECT
    *
  FROM trip
  WHERE city_id = city.id
);

SELECT *
FROM country
WHERE EXISTS (
	SELECT *
  	FROM mountain
  	WHERE country_id = country.id
);

SELECT *
FROM city
WHERE NOT EXISTS (
  SELECT
    *
    FROM trip
    WHERE city_id = city.id
);

SELECT *
FROM mountain
WHERE NOT EXISTS (
	SELECT *
  	FROM hiking_trip
  	WHERE hiking_trip.mountain_id = mountain.id
)

SELECT *
FROM hiking_trip AS main_trip
WHERE main_trip.length >= ALL (
  SELECT length
  FROM hiking_trip AS sub_trip
  WHERE main_trip.mountain_id = sub_trip.mountain_id
);

SELECT *
FROM trip
WHERE trip.days < ANY (
  SELECT days
  FROM hiking_trip
  WHERE hiking_trip.price = trip.price
);
```

## Subqueries in the FROM clause

```sql
SELECT *
FROM
	mountain,
    (
      SELECT *
      FROM country
      WHERE population > 50000
    ) AS large_country
WHERE large_country.id = mountain.country_id;

SELECT length, height
FROM hiking_trip,
	(
      SELECT *
      FROM mountain
      WHERE mountain.height >= 3000
     ) AS tall_mountains
WHERE tall_mountains.id = hiking_trip.mountain_id
```

## Subqueries in SELECT

Awesome! Subqueries can also be used within the column list in a `SELECT` clause. Here it's important that the subquery returns **exactly one row and column**.

```sql
SELECT
	name,
    (
      SELECT COUNT(*)
      FROM hiking_trip
      WHERE mountain.id = hiking_trip.mountain_id
    ) as COUNT
FROM mountain;

```
