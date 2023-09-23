---
menu: SQL A-Z PostgreSQL Track
name: Querying multiple tables
---

## Data from multiple tables

You can select all data from multiple tables like so:

```sql
SELECT * FROM movie, director;
```

In this case, SQL will take every movie and join it with every possible director. SQL doesn't know what to do with the results, so it returns all possible connections.

To fix this, we can use a `WHERE` clause:

```sql
SELECT *
FROM movie, director
WHERE director.id = movie.director_id;
```

## The JOIN keyword

For a basic join, the nomenclature is `JOIN ... ON`.

```sql
SELECT *
FROM movie
JOIN director
ON movie.director_id = director.id;

select director.name, movie.title
from movie
join director
on movie.director_id = director.id;
```

> If the name of the column is unique, you can omit the table name

## Renaming a column with AS

The AS keyword should be self-explanatory. It renames the column in the returned values.

```sql
SELECT
  title as movie_title,
  name
FROM movie
JOIN director
  ON director_id = director.id;
```

## Filtering joined tables

We can take everything we already know, but we must also define the table name in the WHERE clause.

```sql
select *
from movie
join director
on movie.director_id = director.id
where production_year > 2000;

select *
from movie
join director
on movie.director_id = director.id
where director.name = 'Steven Spielberg';

select movie.title, movie.production_year, director.birth_year as born_in, director.name
from movie
join director
on movie.director_id = director.id
where (movie.production_year - director.birth_year < 40);
```

## Putting it all together

```sql
select
	movie.id,
    movie.title,
    movie.production_year as produced_in,
    director.name,
    director.birth_year as born_in
from movie
join director
on movie.director_id = director.id
where movie.title like '%a%' and movie.production_year > 2000
or director.birth_year between 1945 and 1995;
```
