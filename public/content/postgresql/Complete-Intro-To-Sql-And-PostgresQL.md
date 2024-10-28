---
menu: PostgresQL
name: Complete Intro to SQL and PostgresQL
---

This only covers the parts of the course that felt like I needed to have a re-hash of.

## Links and resources

- https://frontendmasters.com/courses/sql/
- https://sql.holt.courses/

## 3 SQL Commands

## 3.1 Inserting data and managing conflicts

The following excerpt comes from the course notes:

From the previous lesson we have an ingredients table in our recipeguru database. It's basically an empty spreadsheet at this point. It's a repository of data with nothing in it. Let's add our first bit of data into it.

```sql
INSERT INTO ingredients (
 title, image, type
) VALUES (
  'red pepper', 'red_pepper.jpg', 'vegetable'
);
```

This is the standard way of doing an insert. In the first set of parens you list out the column names then in the values column you list the actual values you want to insert.

Big key here which will throw JS developers for a loop: you _must_ use single quotes. Single quotes in SQL means "this is a literal value". Double quotes in SQL mean "this is an identifier of some variety".

```sql
INSERT INTO "ingredients" (
 "title", "image", "type" -- Notice the " here
) VALUES (
  'broccoli', 'broccoli.jpg', 'vegetable' -- and the ' here
);
```

**It is really important to know this difference as it will likely trip you up.**

For inserting many values with nothing on conflict:

```sql
INSERT INTO ingredients ( title, image, type ) VALUES ( 'avocado', 'avocado.jpg', 'fruit' ), ( 'banana', 'banana.jpg', 'fruit' ), ( 'beef', 'beef.jpg', 'meat' ), ( 'black_pepper', 'black_pepper.jpg', 'other' ), ( 'blueberry', 'blueberry.jpg', 'fruit' ), ( 'broccoli', 'broccoli.jpg', 'vegetable' ), ( 'carrot', 'carrot.jpg', 'vegetable' ), ( 'cauliflower', 'cauliflower.jpg', 'vegetable' ), ( 'cherry', 'cherry.jpg', 'fruit' ), ( 'chicken', 'chicken.jpg', 'meat' ), ( 'corn', 'corn.jpg', 'vegetable' ), ( 'cucumber', 'cucumber.jpg', 'vegetable' ), ( 'eggplant', 'eggplant.jpg', 'vegetable' ), ( 'fish', 'fish.jpg', 'meat' ), ( 'flour', 'flour.jpg', 'other' ), ( 'ginger', 'ginger.jpg', 'other' ), ( 'green_bean', 'green_bean.jpg', 'vegetable' ), ( 'onion', 'onion.jpg', 'vegetable' ), ( 'orange', 'orange.jpg', 'fruit' ), ( 'pineapple', 'pineapple.jpg', 'fruit' ), ( 'potato', 'potato.jpg', 'vegetable' ), ( 'pumpkin', 'pumpkin.jpg', 'vegetable' ), ( 'raspberry', 'raspberry.jpg', 'fruit' ), ( 'red_pepper', 'red_pepper.jpg', 'vegetable' ), ( 'salt', 'salt.jpg', 'other' ), ( 'spinach', 'spinach.jpg', 'vegetable' ), ( 'strawberry', 'strawberry.jpg', 'fruit' ), ( 'sugar', 'sugar.jpg', 'other' ), ( 'tomato', 'tomato.jpg', 'vegetable' ), ( 'watermelon', 'watermelon.jpg', 'fruit' ) ON CONFLICT DO NOTHING;
```

`ON CONFLICT DO NOTHING` means not to worry about doing anything if there is a conflict.

Alternatively, you could do an upsert: insert if it doesn't exist, update if it does:

```sql
INSERT INTO ingredients ( title, image, type ) VALUES ( 'watermelon', 'banana.jpg', 'this won''t be updated' ) ON CONFLICT (title) DO UPDATE SET image = excluded.image;
```

This is what many of us would call an "upsert". Insert if that title doesn't exist, update if it does. If you try to run that query (or the previous one) without the ON CONFLICT statement, it will fail since we asserted that title is a UNIQUE field; there can only be one of that exact field in the database.

### 3.2 Updating and deleting data

Updating:

```sql
UPDATE ingredients SET image = 'watermelon.jpg' WHERE title = 'watermelon';
```

Deleting:

```sql
DELETE FROM ingredients WHERE image='different.jpg' RETURNING *;
```

### 3.4 Using LIKE, ILIKE & SQL functions

- ILIKE is case insenstive

Using `LIKE` is very limited on it's own. There is more we can do with indexes (that we will get to later).

As for the use of `%` vs `_`, "b%t" will match "bt", "bot", "but", "belt", and "belligerent".

There also exists `_` which will match 1 and only one character. "b_t" will match "bot" and "but" but not "bt", "belt", or "belligerent".

### 3.5 SQL injection

I won't go into this since I know it, but spend time to get to know it.

## 4 Joins and Constraints

This image sums it all up:

![Joins](https://commons.wikimedia.org/wiki/File:SQL_Joins.svg)

## 4.1 Understanding relationships & joins

The example has a many-to-many relationship between recipes and tomatoes as an ingredient.

Starting with one-to-many, we map a recipes to recipes photos.

```sql
SELECT r.title, r.body, rp.url FROM recipes_photos rp INNER JOIN recipes r ON rp.recipe_id = r.recipe_id;
```

## 4.2 Left, Right and Outer joins

This will include values even if they are null. Again, look at the graphic to get a better idea.

## Joins Extra Credit

**Understanding SQL Joins: Connecting the Dots Between Data Tables**

Imagine you're hosting a grand reunion and have two guest lists:

1. **List A**: People who RSVP'd "Yes."
2. **List B**: People who sent gifts.

You want to combine these lists in different ways to get various insights. SQL joins work similarly by combining rows from two or more tables based on related columns.

Let's explore the different types of SQL joins using this analogy.

---

#### 1. **INNER JOIN** (The Intersection)

**Analogy:** Guests who both RSVP'd "Yes" **and** sent gifts.

**Explanation:**

- An **INNER JOIN** returns records that have matching values in both tables.
- It's like finding common elements between two lists.

**Use Case:**

- **When you need strict matches.**
  - Example: Getting a list of customers who **placed an order** and **made a payment**.
- **SQL Syntax:**
  ```sql
  SELECT *
  FROM TableA
  INNER JOIN TableB ON TableA.common_field = TableB.common_field;
  ```


#### 2. **LEFT JOIN** (Left Table Priority)

**Analogy:** All guests who RSVP'd "Yes," whether or not they sent gifts.

**Explanation:**
- A **LEFT JOIN** returns all records from the left table and matched records from the right table.
- If there's no match, the result is NULL on the right side.

**Use Case:**
- **When you need all records from the primary table regardless of matches.**
  - Example: Listing all students and their grades, including students who haven't received grades yet.
- **SQL Syntax:**
  ```sql
  SELECT *
  FROM TableA
  LEFT JOIN TableB ON TableA.common_field = TableB.common_field;
  ```


#### 3. **RIGHT JOIN** (Right Table Priority)

**Analogy:** All guests who sent gifts, whether or not they RSVP'd "Yes."

**Explanation:**
- A **RIGHT JOIN** returns all records from the right table and matched records from the left table.
- If there's no match, the result is NULL on the left side.

**Use Case:**
- **When you need all records from the secondary table.**
  - Example: Getting all products, including those that have never been ordered.
- **SQL Syntax:**
  ```sql
  SELECT *
  FROM TableA
  RIGHT JOIN TableB ON TableA.common_field = TableB.common_field;
  ```


#### 4. **FULL OUTER JOIN** (The Union)

**Analogy:** All guests who RSVP'd "Yes," sent gifts, or both.

**Explanation:**
- A **FULL OUTER JOIN** returns all records when there's a match in either left or right table.
- Rows without a match in the other table will have NULLs for the missing matches.

**Use Case:**
- **When you need a complete view of both tables.**
  - Example: Combining customer and supplier contact lists to create a full mailing list.
- **SQL Syntax:**
  ```sql
  SELECT *
  FROM TableA
  FULL OUTER JOIN TableB ON TableA.common_field = TableB.common_field;
  ```


#### 5. **CROSS JOIN** (Cartesian Product)

**Analogy:** Pairing every guest who RSVP'd "Yes" with every guest who sent a gift.

**Explanation:**
- A **CROSS JOIN** returns the Cartesian product of the two tables.
- Every row in the first table is combined with every row in the second table.

**Use Case:**
- **When you need all possible combinations.**
  - Example: Generating all possible product and color combinations for inventory.
- **SQL Syntax:**
  ```sql
  SELECT *
  FROM TableA
  CROSS JOIN TableB;
  ```

#### 6. **SELF JOIN** (Table Joins Itself)

**Analogy:** Matching guests to their plus-ones within the same list.

**Explanation:**
- A **SELF JOIN** is when a table is joined with itself.
- Useful for comparing rows within the same table.

**Use Case:**
- **When you need to compare records in the same table.**
  - Example: Finding employees who are managers of other employees.
- **SQL Syntax:**
  ```sql
  SELECT A.*
  FROM TableA A
  JOIN TableA B ON A.common_field = B.common_field;
  ```


#### 7. **NATURAL JOIN** (Implicit Join)

**Explanation:**
- A **NATURAL JOIN** automatically joins tables based on columns with the same names and data types.
- It simplifies the query but can be less explicit.

**Use Case:**
- **When tables have obvious matching columns.**
  - Example: Quickly joining tables with standard foreign keys.
- **Caution:** Can lead to unintended results if not all similarly named columns are intended for joining.

**Remembering the Joins:**

- **INNER JOIN**: Think "intersection" – only what's common.
- **LEFT JOIN**: Think "all from left" – everything from the first table.
- **RIGHT JOIN**: Think "all from right" – everything from the second table.
- **FULL OUTER JOIN**: Think "all together now" – everything from both tables.
- **CROSS JOIN**: Think "all combinations" – every possibility.
- **SELF JOIN**: Think "mirror" – the table joins itself.

**Practical Tips:**

- **Choose the join based on your data retrieval needs.**
- **Be cautious with CROSS and FULL OUTER JOINS** as they can produce large result sets.
- **Always specify join conditions** to avoid unintended results.

By visualizing joins through real-world analogies, you can better understand how to combine data effectively in SQL. Happy querying!

### 4.4 Foreign keys

An example of adding foreign keys:

```sql
CREATE TABLE recipe_ingredients ( recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE NO ACTION, ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE NO ACTION, CONSTRAINT recipe_ingredients_pk PRIMARY KEY (recipe_id, ingredient_id) );
```

The REFERENCES portion means it's going to be a foreign key. You tell it what it's going to match up to. In our case `recipes` is the table and `recipe_id` is the name of the column it'll match. In our case those are the same name, but it doesn't have to be. It must be the primary key of the other table.

If you try to add something that doesn't exist, you'll get an error due to the foreign key constraint.

### 4.6 Using the CHECK constraint

Some constraints:

- NOT NULL
- UNIQUE

Another constraint comes with CHECK which could enforce enumerated types.

### 4.7 Using the DISTINCT statement

This ensures that you only get one unique value for what distinct is called on.

## 5 JSONB

For almost everything we're going to show here you could use either. If you want a one liner: always use JSONB, in almost every case it's better. The JSON datatype is a text field that validates it's valid JSON, and that's it. It doesn't do any compression, doesn't validate any of the interior values datatypes, and a few other benefits. The B in JSONB literally stands for "better".

A blog on it https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/

An example of adding JSONB to a table:

```sql
ALTER TABLE recipes ADD COLUMN meta JSONB;

UPDATE recipes SET meta='{ "tags": ["chocolate", "dessert", "cake"] }' WHERE recipe_id=16; UPDATE recipes SET meta='{ "tags": ["dessert", "cake"] }' WHERE recipe_id=20; UPDATE recipes SET meta='{ "tags": ["dessert", "fruit"] }' WHERE recipe_id=45; UPDATE recipes SET meta='{ "tags": ["dessert", "fruit"] }' WHERE recipe_id=47;
```


Now how could we select tags?

```sql
SELECT meta -> 'tags' FROM recipes WHERE meta IS NOT NULL;
```

The `->` is an accessor. In JS terms, this is like saying `meta.tags`. If we were accessing another layer of nesting, you just use more `->`. Ex. `SELECT meta -> 'name' -> 'first'`.

Let's try selecting just the first element of each one using that.

```sql
SELECT meta -> 'tags' ->> 0 FROM recipes WHERE meta IS NOT NULL;
```

Not that there are few important "keywords" that are important:

- `->`
- `->>`
- `?`
- `@>` 

I haven't covered them here, so be sure to double check the course notes or other values.

## 6 Aggregation

This part covers GROUP BY and HAVING.

## 7 Functions Triggers and Procedures

### 7.1 Storing queries with functions

Creating a function:

```sql
CREATE OR REPLACE FUNCTION 
	get_recipes_with_ingredients(low INT, high INT) 
RETURNS 
	SETOF VARCHAR 
LANGUAGE 
	plpgsql 
AS 
$$ 
BEGIN 
	RETURN QUERY SELECT r.title 
	FROM recipe_ingredients ri 
	INNER JOIN recipes r 
	ON r.recipe_id = ri.recipe_id 
	GROUP BY r.title 
	HAVING COUNT(r.title) between low and high; 
END; 
$$;
```

The above example uses a sql-like programming language.

Why would you want to use `$$`? It prevents you from having to escape strings.

For more, you can see:

- https://www.geeksforgeeks.org/postgresql-dollar-quoted-string-constants/
- https://www.postgresql.org/docs/current/plpgsql-development-tips.html

To invoke the query, you could use:

```sql
SELECT * FROM get_recipes_with_ingredients(2, 3);
```

For the *trusted* JS extension for PostgresQL, see https://plv8.github.io/

To drop a function:

```sql
DROP FUNCTION get_recipes_with_ingredients(low int, high int)
```

There is also a comment about how Hasura makes use of functions for GraphQL at the Postgres level.

### 7.2 Function vs procedures

https://sql.holt.courses/lessons/functions-triggers-and-procedures/procedures

- Functions can do more than procedures.
- *A procedure is designed to do an action of some variety. It's explictly not for returning data (and cannot return data) whereas a function can return data (but does not have to.)*

Something that procedures are very good for could be for creating a procedure where you update NULL values. Like running a job to update existing values. It could be a background job, etc.

Here is how to create a procedure:

```sql
CREATE PROCEDURE
	set_null_ingredient_images_to_default() 
LANGUAGE 
	SQL 
AS 
$$ 
UPDATE ingredients SET image = 'default.jpg' WHERE image IS NULL; $$;
```

You could then invoke the procedure with `CALL`:

```sql
CALL set_null_ingredient_images_to_default();
```

### 7.3 Calling functions with triggers

This example had a table to track updated recipes:

```sql
CREATE TABLE updated_recipes ( id INT GENERATED ALWAYS AS IDENTITY, recipe_id INT, old_title VARCHAR (255), new_title VARCHAR (255), time_of_update TIMESTAMP );
```

Creating the function:

```sql
CREATE OR REPLACE FUNCTION log_updated_recipe_name()
	RETURNS
		TRIGGER
	LANGUAGE
	plpgsql
	AS
$$
BEGIN
	IF OLD.title < NEW.title THEN
		INSERT INTO
			updated_recipes (recipe_id, old_title, new_title, time_of_update)
		VALUES
			(NEW. recipe_id, OLD.title, NEW.title, NOW());
		END IF;
	RETURN NEW;
END:
$$:
```

To create the trigger:

```sql
CREATE OR REPLACE TRIGGER updated_recipe_trigger 
AFTER UPDATE ON recipes 
	FOR EACH ROW EXECUTE PROCEDURE log_updated_recipe_name();
```

Note that only functions can made as triggers, not procdures.

## 8 The movie database

This section operates with a database that has been designed as a good data set to work with https://www.omdb.org/en/us

## 9 Query Performance

### 9.1 Analyzing queries with EXPLAIN

Examples of using `EXPLAIN ANALYZE`:

```sql
EXPLAIN ANALYZE SELECT * FROM movies WHERE name='Tron Legacy'; EXPLAIN ANALYZE SELECT * FROM movies WHERE id=21103;
```

### 9.2 Identifying what to index

This part had some interesting callouts. For starters, indexes will be elected to not be used for small data sets.

It checks out what's within the query planner to see what the cost is.

Remember that indexes are not free and there is a cost involved with using them.

### 9.3 Creating an index

In this example, it made an index on the name to improve the query time.

It used a BITMAP INDEX SCAN as opposed to an INDEX SCAN since there could be multiple matches for a name.

This used CREATE INDEX and DROP INDEX for creating and dropping. It would also improve scenarios like ORDER BY etc to. Be to look that up if required.

A couple of other notable indexes that were called out:

- Hash - Useful for when you're doing strict equality checks and need it fast and in memory. Can't handle anything other than `=` checks.
- GiST - Can also be used for full text search but ends up with false positives sometimes so GIN is frequently preferred.
- SP-GiST - Another form of GiST. Both GiST and SP-GiST offer a variety of different searchable structures and are much more special-use-case. I've never had to use either. SP-GiST is most useful for clustering types of search and "nearest neighbor" sorts of things.
- BRIN - BRIN is most useful for extremely large tables where maintaing a b-tree isn't feasible. BRIN is smaller and more compact and therefore makes larger table indexing more feasible.

[This page from the docs about index types](https://www.postgresql.org/docs/current/indexes-types.html) is helpful to glance at.

### 9.4 Using a GIN index

This is another index that can be used for full text search. It's a generalised inverted index.

```sql
CREATE INDEX ON movie_reviews USING gin(scores); EXPLAIN ANALYZE SELECT * FROM movie_reviews WHERE scores ? 'rolling_stone'; EXPLAIN ANALYZE SELECT * FROM movie_reviews WHERE scores @> '{"nytimes": 98}'
```

The example had some cached values so seq scan was elected (at least in theory), and this link was shared to help with explaining things a bit more https://www.postgresql.org/docs/current/sql-explain.html

In the next part, we spoke about performing full text search with **trigrams** which helps with breaking things down into smaller, searchable pieces. This is one way to handle full text search:

```sql
SELECT SHOW_TRGM('star wars');
```

We could use that with the following on the table:

```sql
EXPLAIN ANALYZE SELECT * FROM movies WHERE name ILIKE '%star wars%'; 
CREATE INDEX ON movies USING gin(name gin_trgm_ops); EXPLAIN ANALYZE SELECT * FROM movies WHERE name ILIKE '%star wars%';
```

The `gin_trgm_ops` specifies the kind of indexing we want to do here and we're saying we want `trgm` or trigram operations. This is what you do for full text search.

### 9.5 Creating a partial index

Let's say we're _mostly_ querying just the English tags and don't need to refer to the other languages as much. Instead of indexing _everything_ wastefully, we can do a partial index.

```sql
CREATE INDEX idx_en_category_names ON category_names(language) WHERE language = 'en'; 
EXPLAIN ANALYZE SELECT * FROM category_names WHERE language='en' AND name ILIKE '%animation%' LIMIT 5; 
EXPLAIN ANALYZE SELECT * FROM category_names WHERE language='de' AND name ILIKE '%animation%' LIMIT 5;
```

### 9.6 Indexing a derivative value

*Let's say you have a view where you want to see the biggest different between revenue and budget (more-or-less profit but keep in mind it's all [Hollywood accounting](https://en.wikipedia.org/wiki/Hollywood_accounting) anyway).*

*This is a derived value. It's the budget column subtracted from the revenue column. If you run this query as is it's really expensive.*

```sql
EXPLAIN ANALYZE SELECT name, date, revenue, budget, COALESCE((revenue - budget), 0) 
AS profit 
FROM movies 
ORDER BY profit 
DESC LIMIT 10;
```

Do index the derived value, we can do the following:

```sql
CREATE INDEX idx_movies_profit ON movies (COALESCE((revenue - budget), 0)); 
EXPLAIN ANALYZE SELECT name, date, revenue, budget, COALESCE((revenue - budget), 0) AS profit 
FROM movies 
ORDER BY profit 
DESC LIMIT 10;
```


## 10 Views, Subqueries and Arrays

### 10.1 Creating views & inserting data

*In the previous lesson we saw a way to make a partial index on the category_names table on only the English category names. What if we could make a mini-table of just those category names so we didn't have to add a `WHERE language='en'` on every single query we do? This what views are: they're lens we can query through that we can treat as if they were just normal tables.*

```sql
CREATE VIEW english_category_names AS SELECT category_id, name, language FROM category_names WHERE language='en';
```

Now you can do:

```sql
SELECT * FROM english_category_names LIMIT 5;
```

- It's useful for convenience and security, not performance.
- You can also insert into a view.
- Views can use the underlying index.
- You can do views for joins.

**Warning:** Views can still be very expensive.

### 10.3 Optimising queries with materialised views

Materialised views **are** a tool for performance.

```sql
CREATE MATERIALIZED VIEW actor_categories 
AS SELECT arm.person_name, ecn.name AS keyword, COUNT(*) as count 
FROM actors_roles_movies arm 
INNER JOIN movie_keywords mk 
ON mk.movie_id = arm.movie_id 
INNER JOIN english_category_names ecn 
ON ecn.category_id = mk.category_id 
GROUP BY arm.person_name, ecn.name 
WITH NO DATA;
```

`WITH NO DATA` doesn't populate the data yet.

When to use them? Some examples:

- You want to show users cool graphs with data from your database
- The query to get this data is expensive
- The data itself doesn't update too often. Only a few movies release per week and an actor/actress is only releasing a few movies a year
- This is a good place to use some sort of caching strategy

Some options for settings the data:

- `REFRESH MATERIALIZED VIEW actor_categories;` - this goes faster but it locks the table so queries in the mean time won't work.
- `REFRESH MATERIALIZED VIEW CONCURRENTLY actor_categories;` - this works far slower but doesn't lock the table in the process. Useful if you can't afford downtime on the view.

### 10.4 Indexing materialised views

`CREATE INDEX idx_actor_categories ON actor_categories(count DESC NULL LAST);`

### 10.5 Using subqueries

Here is an example of a subquery:

```sql
SELECT p.name 
FROM casts c 
INNER JOIN people p 
ON c.person_id = p.id 
WHERE c.movie_id = ( 
	SELECT id 
	FROM movies 
	WHERE name = 'Tron Legacy' 
);
```

### 10.6 Creating an array from a subquery

- Array is a datatype in PostgreSQL. Here we're using that to aggregate our answers into one response.
- These kinds of queries can get very expensive very quickly. We essentially made a loop with SQL where every row gets its own SELECT subquery. If the outer query returns a lot of rows and the inner query is expensive this will get out of hand quickly.

```sql
SELECT m.name, 
ARRAY( 
	SELECT ecn.name 
	FROM english_category_names ecn 
	INNER JOIN movie_keywords mk 
	ON mk.category_id = ecn.category_id 
	WHERE m.id = mk.movie_id 
	LIMIT 5 
) AS keywords 
FROM movies m 
WHERE name ILIKE '%star wars%';
```

## 11 Transactions, Window Functions, and Self Join

### 11.1 Transactions

`BEGIN` is how you start a transaction, `COMMIT` is how you run all of them.

```sql
BEGIN; 

INSERT INTO ingredients (title, type) 
VALUES ('whiskey', 'other'); 

INSERT INTO ingredients (title, type) VALUES ('simple syrup', 'other'); 

INSERT INTO recipes (title, body) VALUES ('old fashioned', 'mmmmmmm old fashioned'); 

INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
	VALUES 
	( 
		(SELECT recipe_id FROM recipes where title='old fashioned'), 
		(SELECT id FROM ingredients where title='whiskey') ), 
	( 
		(SELECT recipe_id FROM recipes where title='old fashioned'), 
		(SELECT id FROM ingredients where title='simple syrup') 
	); 
COMMIT;
```

You can use `ROLLBACK` to not run the queries.

`BEGIN` is short for `BEGIN WORK` or `BEGIN TRANSACTION`.

To return values:

```sql
BEGIN WORK; 
DO $$ 
DECLARE champagne INTEGER; 
DECLARE orange_juice INTEGER; 
DECLARE mimosa INTEGER; 

BEGIN 
INSERT INTO ingredients (title, type) 
VALUES ('champage', 'other') RETURNING id INTO champagne; 

INSERT INTO ingredients (title, type) 
VALUES ('orange_juice', 'other') RETURNING id INTO orange_juice; 

INSERT INTO recipes (title, body) 
VALUES ('mimosa', 'brunch anyone?') RETURNING recipe_id INTO mimosa; 

INSERT INTO recipe_ingredients (recipe_id, ingredient_id) 
VALUES (mimosa, champagne), (mimosa, orange_juice); 

END $$; 

COMMIT WORK;
```

### 11.2 Window functions

They are good for getting insight into the current row.

```sql
SELECT name, kind, vote_average, AVG(vote_average) 
OVER (PARTITION BY kind) 
AS kind_average 
FROM movies 
LIMIT 50;
```

For the entire result set, you can use `OVER ()`.

In the example, he also gave some examples of "not equals" which was using the `<>` notation.

#### 11.2 Window functions extra credit

Window functions in SQL (including PostgreSQL) are a powerful feature that allow you to perform calculations across a set of rows that are related to the current row. They operate on a window, or a subset of rows, defined by a partition and an ordering within that partition.

Here's a concise explanation of how window functions work:

1. They perform calculations across a set of table rows that are somehow related to the current row.
2. Unlike regular aggregate functions, window functions don't cause rows to become grouped into a single output row.
3. The window is defined in the OVER clause of the function.
4. Common uses include running totals, rankings, moving averages, and accessing values from other rows.

Imagine you're in a tall office building, and each floor represents a row in your SQL table. You're standing at a window on your floor, looking out at the other floors.

1. The building is your entire dataset.
2. Your floor is the current row.
3. The window you're looking through is your window function.
4. What you can see through the window (other floors above and below) is your defined partition.

Depending on how you set up your window function:

- You might be able to see all the floors (rows) in the building.
- You might only see floors in your department (a subset of rows based on a partition).
- You might focus on the five floors above and below you (a moving frame within the partition).

Just as you can count the number of people on the visible floors, calculate the average number of employees per floor you can see, or determine your floor's rank in terms of employee count, window functions allow you to perform similar operations on your data, all while staying on your current "floor" (row).

### 11.3 Self join

This is simply joining on your own table.
