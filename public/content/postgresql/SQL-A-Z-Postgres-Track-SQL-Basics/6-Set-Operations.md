## UNION

```sql
SELECT *
FROM skating
WHERE year BETWEEN 2010 AND 2014

UNION

SELECT *
FROM cycling
WHERE year BETWEEN 2010 AND 2014;
```

Some caveats:

1. Both tables must have the **same number of columns** so that the results can be merged into one table.
2. Respective columns must have the same kind of information.

## UNION ALL

By default, `UNION` removes duplicate rows. `UNION ALL` can remedy this.

```sql
SELECT *
FROM cycling
WHERE country = 'Germany'

UNION ALL

SELECT *
FROM skating
WHERE country = 'Germany';

SELECT country
FROM cycling

UNION ALL

SELECT country
FROM skating;
```

## INTERSECT

`INTERSECT` only shows the rows which belong to **BOTH** tables.

```sql
SELECT year
FROM cycling
WHERE country = 'Germany'

INTERSECT

SELECT year
FROM skating
WHERE country = 'Germany';

SELECT person
FROM cycling

INTERSECT

SELECT person
FROM skating;
```

## EXCEPT

It shows all the results from the first (left) table with the **exception** of those that also appeared in the second (right) table.

```sql
SELECT person
FROM cycling
WHERE country = 'Germany'

EXCEPT

SELECT person
FROM skating
WHERE country = 'Germany';

SELECT country
FROM cycling

EXCEPT

SELECT country
FROM skating;
```
