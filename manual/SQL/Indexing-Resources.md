---
menu: SQL
name: Indexing Resources
---

# Indexing Resources

## Resources

1. [Things every developer absolutely, positively needs to know about database indexing](https://www.youtube.com/watch?v=HubezKbFL7E)
2. [How to design indexes, really](https://www.slideshare.net/billkarwin/how-to-design-indexes-really)
3. [More Mastering the Art of Indexing](https://www.slideshare.net/matsunobu/more-mastering-the-art-of-indexing)
4. [A visual explanation of SQL joines](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/)

## A Script Walking Throw Different Explanations

```sql
CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(225), company_id INT NOT NULL, rating INT, postcode INT NOT NULL);

CREATE TABLE user_ratings (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, rated_user_id INT NOT NULL, rating INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, FOREIGN KEY (rated_user_id) REFERENCES users (id) ON DELETE CASCADE);

INSERT INTO users (name, company_id, rating, postcode)
SELECT CONCAT("username_", n), ROUND((RAND() * 9999) +1), ROUND((RAND() * 6) +1), ROUND((RAND() * 6999) + 1)
  FROM
(
select a.N + b.N * 10 + c.N * 100 + d.N * 1000 + e.N * 10000 + f.N * 100000 + 1 N
from (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) a
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) b
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) c
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) d
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) e
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) f
) t;


INSERT INTO user_ratings (user_id, rated_user_id, rating)
SELECT ROUND((RAND() * 999999) + 1), ROUND((RAND() * 999999) +1), ROUND((RAND() * 6) + 1)
  FROM
(
select a.N + b.N * 10 + c.N * 100 + d.N * 1000 + e.N * 10000 + f.N * 100000 + 1 N
from (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) a
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) b
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) c
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) d
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) e
      , (select 0 as N union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) f
) t;


UPDATE users SET rating = null WHERE rating = 4;

CREATE INDEX company_id_idx ON users(company_id);

# explain order by field that isn't indexed
EXPLAIN ANALYZE(SELECT * FROM users WHERE company_id = 5 ORDER BY rating ASC);

SELECT * FROM users where postcode=5082;

# demonstrate all

explain(SELECT * FROM users where postcode=5082);


CREATE INDEX postcode_idx ON users(postcode);

# demonstrate REF, uses an index with non-unique values and grabs appropriate rows. This is preeettty good

EXPLAIN(SELECT * FROM users where postcode=5082);

# const & eq_ref (for joins) basically if you see this, stop optimising. You've ensured a unique result back.
EXPLAIN(SELECT * FROM users where id=1);

# Demonstrate index range - navigating down the index, then using those doubly linked lists to pull out the values in the range.
EXPLAIN(SELECT * FROM users where postcode BETWEEN 5082 AND 6000);


# it does have a bound at where its more effiecient to full table scan
EXPLAIN(SELECT * FROM users where postcode BETWEEN 5082 AND 6500);

# Multi column index
CREATE INDEX company_id_rating_postcode ON users(company_id, rating, postcode);

# Explain left most prefix rule
DROP INDEX postcode_idx ON users;

# left most prefix rule
EXPLAIN(SELECT * FROM users WHERE postcode = 5082);

# Whilst there's clearly still work to be done here, the drop is significant.

# can see index utilisation
EXPLAIN(SELECT * FROM users WHERE company_id = 5082);

# using just the index ( a full index scan if you like)

EXPLAIN(SELECT company_id, rating FROM users );

# covering index retrieving the data from just the index
EXPLAIN(SELECT company_id, rating, postcode FROM users WHERE company_id = 5 AND rating = 3 AND postcode = 5082);

# ref scan - prettty good, esp if the rows count is low

EXPLAIN(SELECT * FROM users WHERE company_id = 5082 AND rating IS NULL);


# usage of range means rest of indexed columns arent utilised we can see our row count jumps up and filtered % drops.
# its doing an index range scan as opposed to an index lookup
# cardinality of rating index discuss only ever a max of 7 not a good index on its own
EXPLAIN(SELECT * FROM users WHERE company_id BETWEEN 5082 AND 5090 AND rating =  4);

CREATE INDEX rating_company_id_idx ON users(rating, company_id);


# still doing range scan but filtered result set and rows are much more optimised
EXPLAIN(SELECT * FROM users WHERE rating = 4 AND company_id BETWEEN 5082 AND 5090);

# or conditions

EXPLAIN(SELECT * FROM users WHERE company_id = 5082 OR rating IS NULL);

DROP INDEX company_id_rating_postcode ON users;

CREATE INDEX postcode_idx ON users(postcode);

CREATE INDEX company_id_idx ON users(company_id);

# index merge with union
EXPLAIN(SELECT * FROM users WHERE company_id = 5082 OR postcode = 5082);

# index merge with intersect

EXPLAIN(SELECT * FROM users WHERE company_id = 5082 AND postcode = 5082);

# Be mindful of the search space here, sometimes this optimisation can actually lead to a larger # of total rows to search and kill performance

# Now lets do some joins

EXPLAIN(SELECT * FROM users JOIN user_ratings ON user_ratings.user_id = users.id);

# What's going on here? Why are we doing a full table scan on an indexed field?
# Let's use analyze to build a better understanding
# We can see that we need to do a nested loop, which makes sense if you think about it, our users may have many ratings not necessarily in order in the joined table so we need to go through and find each record.
# if we look closely we can see that the users table is the one doing the looping, which also makes sense because the users table is in sorted order by user id :)
# pulling our records out of a sorted list is much more efficient than an unsorted list
```
