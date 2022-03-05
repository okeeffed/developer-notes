# 2: Filtering Records

## Filtering Rows with "Where"

What if we wanted to find all the records in our table that have an area greater that 4000?

```sql
SELECT name, area FROM cities WHERE area > 4000;
```

How is the statement interpreted? It is best not to thing of it as left to right.

The order for our statement:

1. FROM cities
2. WHERE area > 4000
3. SELECT name, area

So we have filtered before we have selected.

The are many [comparison operators](https://www.postgresql.org/docs/14/functions-comparison.html) that we could have used instead of area.

An example of a more complicated comparison:

## Compound WHERE clauses

We can make some more complicated queries:

```sql
SELECT name, area FROM cities WHERE area BETWEEN 2000 AND 4000;
```

To make a compound comparison, we can use `AND`:

```sql
SELECT name, area FROM cities WHERE area BETWEEN 2000 AND 4000 AND name = 'Dehli';
```

You can combine as many `AND` and `OR` statements as required.

## Calculations in WHERE clauses

You can in fact do calculations in the WHERE clause. Note: you need to consider the order of operations for this:

```sql
SELECT name, population / area AS density FROM cities WHERE population / area > 6000;
```

## Updating Records

```sql
UPDATE cities SET population = 39505000 WHERE name = 'Tokyo';
```

## Deleting Records

```sql
DELETE FROM cities WHERE name = 'Dehli';
```
