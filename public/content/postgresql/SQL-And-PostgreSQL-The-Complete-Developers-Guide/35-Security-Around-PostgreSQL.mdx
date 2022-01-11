# Security around PostgreSQL

## SQL Injection Exploits

When a valid SQL string is taken and used without proper escaping, it can be used to inject SQL commands into the database.

## Handing injections with prepared statements

- Option 1: Sanitize user-provided values to our app.
- Option 2 (preferred): Rely on Postgres to sanitize values for us.

Postgres we essentially need to set a statement as a string and have values passed that are subbed in.

## Preventing SQL Injection

Don't do this:

```js
const { rows } = await pool.query(`
	SELECT * FROM users WHERE id = ${id};
`);
```

Do this:

```js
const { rows } = await pool.query(
  `
	SELECT * FROM users WHERE id = $1;
`,
  [id]
);
```
