In this part, you'll learn how to compute **statistics**, **group** rows, and **filter** such groups. Such operations are extremely important for preparing **reports** and always come in handy in big tables.

## ORDER BY

```sql
select *
from employees
order by salary;
```

By default, `ORDER BY ...` is `ORDER BY ... ASC`.

You can also order by `DESC`.

## LIMIT

Limit the number of results.

```sql
SELECT *
FROM orders
LIMIT 10;
```

> By default, PostgreSQL considers `NULL` values to be **larger than** any non-`NULL` value. Ensure to check for `IS NOT NULL` where required.

```sql
SELECT salary, position
FROM employees
WHERE salary IS NOT NULL
ORDER BY salary DESC
LIMIT 10;
```

## DISTINCT

Gets distinct values.

```sql
SELECT DISTINCT customer_id
FROM orders;
```

You can also use it over a group of columns to get distinct combinations.

```sql
SELECT DISTINCT
  customer_id,
  order_date
FROM orders;
```

## COUNT

```sql
SELECT COUNT(*)
FROM orders;
```

Specifying a count for a column **will not count null values** whereas it will for `*`.

You can also compose functions.

```sql
SELECT COUNT(DISTINCT customer_id) AS distinct_customers
FROM orders;
```

## MIN/MAX/AVG/SUM

These are other functions to help get to greatest/smallest values.

```sql
SELECT MIN(total_sum)
FROM orders;

SELECT SUM(salary)
FROM employees
WHERE year = 2014
AND department = 'Marketing';

SELECT department, COUNT(*) as employees_no
FROM employees
WHERE year = 2013
GROUP BY department;

SELECT department, MIN(salary), MAX(salary)
FROM employees
WHERE year = 2014
GROUP BY department;

SELECT department, AVG(salary)
FROM employees
WHERE year = 2015
GROUP BY department;

SELECT last_name, first_name, AVG(salary)
FROM employees
GROUP BY last_name, first_name;
```

## Filter groups

In this section, we'll have a look at how groups can be filtered. There is a special keyword `HAVING` reserved for this.

```sql
SELECT
  customer_id,
  order_date,
  SUM(total_sum)
FROM orders
GROUP BY customer_id, order_date
HAVING SUM(total_sum) > 2000;

SELECT last_name, first_name, COUNT(DISTINCT year) as years
FROM employees
GROUP BY last_name, first_name
HAVING COUNT(DISTINCT year) > 2;

select department, avg(salary)
from employees
where year = 2012
group by department
having avg(salary) > 3000;

select last_name, first_name, sum(salary)
from employees
group by last_name, first_name
order by sum(salary) desc;

select last_name, first_name, avg(salary) as average_salary, count(distinct year) as years_worked
from employees
group by last_name, first_name
having count(distinct year) > 2
order by avg(salary) desc;
```
