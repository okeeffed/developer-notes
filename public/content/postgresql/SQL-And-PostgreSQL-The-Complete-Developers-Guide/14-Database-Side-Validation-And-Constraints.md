# 14: Database Side Validation And Constraints

## Creating and Viewing Tables in PGAdmin

Essentially the code from section (6) was used to create the tables in the database.

You can then validate the call like so:

```sql
SELECT *
FROM public.products
ORDER BY id ASC;
```
