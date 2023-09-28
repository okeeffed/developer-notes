## Concatenation

Can be done with `||`. E.g., for `name-type` you could do:

```sql
SELECT name, type, name || '-' || type as slogan_type
FROM item;
```

## CONCAT

You can also use the `CONCAT` function to do this:

```sql
SELECT CONCAT('ID ', id, ' is ', name, '.') 
AS item_name
FROM item;
```

The different is that `||` returns NULL, whereas `CONCAT` converts NULL to an empty string.

## LENGTH

```sql
SELECT 
	id,
    text,
LENGTH(text) as len
FROM slogan;

SELECT id
FROM item
WHERE LENGTH(name) > 8;
```

## LOWER/UPPER

```sql
SELECT id, LOWER(text) as trendy_slogan
FROM slogan
WHERE type = 'newspaper ad' OR type = 'Internet ad';
```

## INITCAP

This will change the first letter of each word of text to **upper case** and the rest of the characters to **lower** e.g. `INITCAP(olivier sMITH)` will result in `Olivier Smith`.

```sql
SELECT id, name as old_name, INITCAP(name) as new_name
FROM item;
```

## LTRIM() and RTRIM()

SELECT LTRIM(' Sophie '); = `Sophie ` and SELECT RTRIM(' Sophie '); = ` Sophie`.

```sql
SELECT 
	CONCAT('No trim:', name) as before_ltrim,
	CONCAT('Trim:', LTRIM(name)) as after_ltrim
FROM item;
```

## TRIM

Does both sides. `SELECT TRIM(' Martin Smith      from England   .   ');` will result in `'Martin Smith      from England   .'`

```sql
SELECT
  '*' || name || '*' AS before_trim,
  CONCAT('*', TRIM(name), '*') AS after_trim
FROM item;
```

## SUBSTRING

The long form: `SUBSTRING(text FROM start FOR length)`.
The shorter form: `SUBSTRING(text, start, length)`.

Note that is not zero-indexed. The first character is available at `0`.

For example:

```sql
SELECT SUBSTRING(name, 5, 4) AS substring_name
FROM item;

-- Example code
SELECT name, SUBSTRING(TRIM(name), 1, 4) as new_name
FROM item;
```