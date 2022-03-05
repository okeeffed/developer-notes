# 13: PostgreSQL Complex Datatypes

## Data Types

See more on the [website](https://postgresql.org/docs/14/interactive/datatype.html).

Some important notes:

- `VARCHAR` with no arg is a string of any length.
- `TEXT` is same as `VARCHAR` with no arg.
- Boolean can cast certain values if a boolean data type is expected - worth noting it is more than 0/1, false/true.

You can also play around in PGAdmin to test out things like casting for `DATE` or `TIME`.

```sql
SELECT ('12:01'::TIME);
SELECT ('APR 22 1992'::DATE);
SELECT ('20:34 AEST'::TIME WITH TIME ZONE);
SELECT ('20:34 PM'::TIME WITHOUT TIME ZONE);
SELECT ('20:34 AEST'::TIME WITH TIME ZONE);
SELECT ('APR 22 1992 20:34 AEST'::TIMESTAMP WITH TIME ZONE);
```

Times and dates is very flexible for the interpretation of the data.

## Interval

```sql
SELECT ('1 D'::INTERVAL);
SELECT ('1 D 20 H 30 M 45 S'::INTERVAL);
```

Interval can be useful in how it is able to have operations made to compare them.
