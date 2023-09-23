---
menu: SQL A-Z PostgreSQL Track
name: SQL Basics in Postgres
---

## Useful links

- [PostgreSQL SQL Syntax docs](https://www.postgresql.org/docs/16/sql-syntax-lexical.html)
- [LearnSQL course](https://learnsql.com/course/postgresql-queries-basics/)

## Basic syntax example

```sql
SELECT name, graduation_year, birth_year
FROM student
WHERE graduation_year >= 2014
ORDER BY birth_year DESC;
```

## Example stories and mnemonics

1.  **SELECT Statement**: _Vivid Imagery_: Imagine the SQL SELECT statement as a "magnifying glass" that zooms in on specific data in your database table. Just like a magnifying glass helps you see tiny details, SELECT helps you see specific data. _Storytelling_: Create a story where you are searching for treasures (data) in a vast library (database). You use a SELECT statement to pick the books (columns) you want to read.
2.  **INSERT Statement**: _Vivid Imagery_: Visualize the INSERT statement as a "conveyor belt" that adds new items (rows) to your database table. Each item is carefully placed on the conveyor belt and added to the table. _Mnemonic_: Think of "INSERT" as putting something "IN"to the table.
3.  **UPDATE Statement**: _Vivid Imagery_: Picture the UPDATE statement as a "paintbrush" that allows you to change the color (data) of specific parts of your table. Just as an artist uses a paintbrush to modify a painting, you use UPDATE to modify data. _Storytelling_: Tell a story where you're a detective solving a case (database issue). You have a magnifying glass (SELECT) to gather clues, and when you find something wrong, you use a paintbrush (UPDATE) to fix it.
4.  **DELETE Statement**: _Vivid Imagery_: Imagine the DELETE statement as a "scissors" that cuts out specific rows from your table. Just as scissors remove unwanted parts from a piece of paper, DELETE removes unwanted rows. _Mnemonic_: Think of "DELETE" as saying, "I want this data DELETED."
5.  **JOIN Clause**: _Vivid Imagery_: Visualize a JOIN as a "puzzle piece" that connects two tables based on a common attribute. Just as puzzle pieces fit together to create a complete picture, JOIN combines data from different tables. _Mnemonic_: Think of a JOIN as "joining" two tables together like connecting puzzle pieces.
6.  **GROUP BY Clause**: _Vivid Imagery_: Picture a GROUP BY as a "bookshelf" that arranges your data into groups based on a specific criterion (column). Just as books are grouped by genre on a shelf, your data is grouped by a common attribute. _Mnemonic_: Think of GROUP BY as "grouping" data like books on a shelf.
7.  **ORDER BY Clause**: _Vivid Imagery_: Imagine an ORDER BY as a "sorting hat" from the Harry Potter series. It magically arranges your data in ascending or descending order. Just like the hat assigns houses to students, ORDER BY assigns order to data. _Mnemonic_: Remember that ORDER BY is like telling your database to put the data in a specific "ORDER."
8.  **COUNT Function**: _Vivid Imagery_: Visualize the COUNT function as a "counter" that counts how many items are in a set. Imagine someone counting coins in their hand to find out how much money they have. _Mnemonic_: Think of COUNT as "counting" the number of items in a dataset.
9.  **SUM Function**: _Vivid Imagery_: Picture the SUM function as a "pile of money" that adds up the values in a column. You're stacking dollar bills to calculate the total amount. _Mnemonic_: Think of SUM as "summing up" the values to get a total.
10. **AVG Function**: _Vivid Imagery_: Imagine the AVG function as a "pizza slicer" that divides a pizza (total value) into equal slices. Each slice represents the average value. _Mnemonic_: Think of AVG as "averaging" out the values to find the average.

### Clauses

SELECT-INSERT-UPDATE-DELETE: Selectively inserting and updating documents.

Picture someone at a file cabinet pulling out documents, inserting documents, tearing documents up.

### SELECT ... FROM ... WHERE workflow helpers

1. SELECT: A detective with a magnifying glass looking for something...
2. FROM: He finds a file cabinet for table "X" e.g. "People" which is where he wants to grab information from.
3. WHERE: From within the file cabinet, he searches through the specific section he is looking for.
4. OR: He is looking for multiple qualifiers for the case.
5. AND: Another logical operator for a qualifier.
6. BETWEEN ... AND ...: Another way to write an AND operator for a specific value.
7. NOT BETWEEN ... AND ...: Negation to above.
8. LIKE: Finding a predicate by similarity.
9. JOIN: Wants he finds what he wants, he goes to another cabinet (table "Y" e.g. "Purchases") and uses the documents from there to find what he needs.
10. GROUP BY: He grabs the documents and groups them together by a specific value (like name)
11. ORDER BY: Once he finds the documents, he needs to should those shuffle them into order.

## Conditional operations

- `<` (less than),
- `>` (greater than),
- `<=` (less than or equal),
- `>=` (greater than or equal).
- `=` (equal to)
- `!=` or `<>` (inequality sign)

For examples:

```sql
SELECT brand, model, production_year
FROM car
WHERE price <= 11300.00;

SELECT *
FROM user
WHERE age NOT BETWEEN 20 AND 30;

SELECT *
FROM user
WHERE age NOT BETWEEN 20 AND 30;

SELECT id, name
FROM user
WHERE (age > 70 OR age < 13)
  AND height >= 180;

SELECT vin
FROM car
WHERE (price < 4000.00 OR price > 10000.00)
AND production_year NOT BETWEEN 1999 and 2005;
```

### Selecting text

For a where clause, the clause text **must be within single quotes**. For example:

```sql
SELECT *
FROM car
WHERE brand = 'Ford';
```

There is also a `LIKE` operator. . The percentage sign applied in the example **matches any number (zero or more) of unknown characters**.

```sql
SELECT *
FROM user
WHERE name LIKE 'A%';
```

As a result, we'll obtain all users whose name begins with the letter `'A'`.

There `%` sign can be put anywhere between the single quotes and as many times as it's necessary.

```sql
SELECT *
FROM user
WHERE name LIKE '%A%';
```

Where can use an **underscore `_`** where we just want to replace one letter.

```sql
SELECT *
FROM user
WHERE name LIKE '_atherine';
```

### Null values

Where can use clauses like:

- `WHERE ... IS NOT NUll;`
- `WHERE ... IS NULL;`

Null effectively means "something is missing or unknown". `NULL = NULL` is never true in SQL.

## Simple mathematics

In this way, you can add (`+`), subtract (`-`), multiply (`*`) and divide (`/`) numbers.

```sql
select *
from car
where (price * 0.2) > 2000;
```

## Bringing it all together

Select all columns of those cars that:

- were produced between 1999 and 2005,
- are not Volkswagens,
- have a model that begins with either `'P'` or `'F'`,
- have their price set.

```sql
SELECT *
FROM car
WHERE production_year BETWEEN 1999 and 2005
AND brand != 'Volkswagen'
AND (model like 'P%' OR model like 'F%')
AND price IS NOT NULL;
```
