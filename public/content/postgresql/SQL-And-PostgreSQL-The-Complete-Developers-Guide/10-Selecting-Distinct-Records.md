# 10: Selecting Distinct Records

`DISTINCT` is always placed with a `SELECT` statement.

It will give us unique values in our result set.

Example:

```sql
SELECT DISTINCT department
FROM products;
```

A good use of this is to `COUNT` the unique values over one column.

You can use `GROUP BY` in place of `DISTINCT` but you cannot use `DISTINCT` in place of `GROUP BY`.
