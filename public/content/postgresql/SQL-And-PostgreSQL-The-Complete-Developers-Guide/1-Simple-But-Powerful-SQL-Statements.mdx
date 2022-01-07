# 1: Simple But Powerful SQL Statements

## Challenges of Postgres

1. Writing efficient queries to retrieve information.
2. Designing the schema, or structure, or the database.
3. Understanding when to use advanced features.
4. Managing the database in a production environment.

## Database Design

In the example provided, we will store a [list of the world's largest cities](https://en.wikipedia.org/wiki/List_of_largest_cities) in a database.

### Database design process?

1. What kind of thing are we storing?
2. What properties does this thing have?
3. What type of data does each of those properties contain?

For the list of cities:

1. We are storing a list of cities.
2. Each city has a name, country, population and area.
3. What type of data does each of those properties contain? i.e. name is a string, country is a string etc.

From this, we should take the following actions:

1. Create a table called "cities".
2. The table should have columns for name, country, population and area.
3. Each column should indicate the type of data that it is going to store.

## Creating Tables

To get started, we can use [pg-sql.com](https://www.pg-sql.com/) to create a table without installing Postgres onto our machine..

To create a table:

```sql
CREATE TABLE cities (
	name VARCHAR(50),
	country VARCHAR(50),
	population INTEGER,
	area INTEGER
);

-- CREATE successful!
```

Note:

- Keywords are written in all uppercase. This is not required.
- Identifiers like `cities` are lowercase.

## Inserting data into a table

```sql
INSERT INTO cities (name, country, population, area)
VALUES ('Tokyo', 'Japan', 38505000, 8223);

-- INSERT successful!
-- 1 row(s) inserted
```

You can insert multiple value:

```sql
INSERT INTO cities (name, country, population, area)
VALUES
	('Dehli', 'India', 28125000, 2240),
	('Shanghai', 'China', 22125000, 4015),
	('Sao Paulo', 'Brazil', 20935000, 3043);

-- INSERT successful!
-- 3 row(s) inserted
```

## Retrieving data with SELECT

```sql
SELECT * FROM cities;
```

The result:

| name      | country | population | area |
| --------- | ------- | ---------- | ---- |
| Tokyo     | Japan   | 38505000   | 8223 |
| Dehli     | India   | 28125000   | 2240 |
| Shanghai  | China   | 22125000   | 4015 |
| Sao Paulo | Brazil  | 20935000   | 3043 |

## Calculated Columns

This is about us performing calculations before we pull it out of the table.

For example, what if we want population density (`population / area`)?

We can do so like this:

```sql
SELECT name, population / area AS density FROM cities;
```

This gives us the following:

| name      | density |
| --------- | ------- |
| Tokyo     | 4682    |
| Dehli     | 12555   |
| Shanghai  | 5510    |
| Sao Paulo | 6879    |

## String Operators and Functions

Some helpers:

| Operator/Function | Does                      |
| ----------------- | ------------------------- |
| \|\|              | Join two strings          |
| CONCAT()          | Join two strings          |
| LOWER()           | Gives a lower case string |
| LENGTH()          | Number of chars in string |
| UPPER()           | Uppercase                 |

A list of functions can be found on the [official website](https://www.postgresql.org/docs/14/functions.html).

Example:

```sql
SELECT UPPER(CONCAT(name, ', ', country)) as location FROM cities;
```
