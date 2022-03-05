# 36: Fast Parallel Testing

This section is more to learn two more things about Postgres.

The scenario is that we will be running three test files in parallel. This is a little atypical, but it saves time on the testing front.

The challenge is how we can get these tests running with the same database without conflicts.

## Issues with parallel tests

- The test command is run with `jest --no-cache` to ensure we are testing in parallel in our local scenario.

Running in parallel means trying to access the same table which leads to conflicts with mysterious failures.

## Isolation with schemas

Some options we have to fix this:

1. Each test gets its own database. Not a great solution.
2. Each test file gets its own schema. This is the preferred method.

What is a schema? You can think of it as similar to a folder on your file system.

We can create multiple schemas within one database.

When you create a database, you'll find that a `public` schema is created. Each `schema` can have its own separate copy of the table.

## Creating and accessing schemas

To create a schema:

```sql
CREATE SCHEMA test;
```

To create table within it:

```sql
CREATE TABLE test.users (
	id serial PRIMARY KEY,
	name varchar(255)
);
```

You need to explicitly use the `schema` name when you want to reference it.

Whenever you post to Postgres, it will try first attach to a `$user` schema before the public. You can check this on the `search_path` to `SELECT search_path;`.

## Strategy for isolation

Now that we understand the basics of schemas, we can start to understand how to access them in our tests.

The steps that we need to follow for this:

1. Connect to PG as normal.
2. Generate a random string of chars.
3. Create a new user (role) with that name.
4. Create a new schema with that name.
5. Tell our test file to connect to the DB with the name `asdf`.
6. Run the migration files.

## Programmatic schema generation

```js
const { randomBytes } = require("crypto");
const { default: migrate } = require("node-pg-migrate");
const format = require("pg-format");

beforeAll(async () => {
  // Random role name generation
  const roleName = "a" + randomBytes(4).toString("hex");

  // Connect to PG
  await pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: "asdf",
    password: "",
  });

  // Create a new role
  await pool.query(`
		CREATE ROLE ${roleName} LOGIN PASSWORD '${roleName}';
	`);

  // Create a schema with the same name
  await pool.query(`
		CREATE SCHEMA ${roleName} AUTHORIZATION ${roleName};
	`);

  // Disconnect entirely from PG
  await pool.close();

  // Run migrations
  await migrate({
    schema: roleName,
    direction: "up",
    log: () => {}, // silence the logs
    noLock: true, // by default, only meant to run migrations one at a time
    dir: "migrations",
    databaseUrl: {
      host: "localhost",
      port: 5432,
      database: "socialnetwork-test",
      user: roleName,
      password: roleName,
    },
  });

  // Connect to pg as newly created role
  return pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: roleName,
    password: roleName,
  });
});
```

## Escaping identifiers

The library example does not support identifiers for schemas, etc, so we can't do our normal escaping.

```js
const { randomBytes } = require("crypto");
const { default: migrate } = require("node-pg-migrate");
const format = require("pg-format");

beforeAll(async () => {
  // Random role name generation
  const roleName = "a" + randomBytes(4).toString("hex");

  // Connect to PG
  await pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: "asdf",
    password: "",
  });

  // Create a new role
  await pool.query(
    format(
      `
		CREATE ROLE %I LOGIN PASSWORD %L;
	`,
      roleName,
      roleName
    )
  );

  // Create a schema with the same name
  await pool.query(
    format(
      `
		CREATE SCHEMA %I AUTHORIZATION %I;
	`,
      roleName,
      roleName
    )
  );

  // Disconnect entirely from PG
  await pool.close();

  // Run migrations
  await migrate({
    schema: roleName,
    direction: "up",
    log: () => {}, // silence the logs
    noLock: true, // by default, only meant to run migrations one at a time
    dir: "migrations",
    databaseUrl: {
      host: "localhost",
      port: 5432,
      database: "socialnetwork-test",
      user: roleName,
      password: roleName,
    },
  });

  // Connect to pg as newly created role
  return pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: roleName,
    password: roleName,
  });
});
```

Although SQL injection wasn't really an issue for testing, now we can be 100% sure of it.

## Cleaning up schemas and roles

This is a method to clean up the role and schemas that we created.

```js
async close() {
	// Disconnect from PG
	await pool.close();

	// Reconnect as our root user
	await pool.connect({
    host: "localhost",
    port: 5432,
    database: "socialnetwork-test",
    user: "asdf",
    password: "",
  })

	// Delete the role and schema we created
	await pool.query(format('DROP SCHEMA %I CASCASDE', this.roleName))
	await pool.query(format('DROP ROLE %I', this.roleName))

	// Disconnect
	await pool.close()
}
```

Finally, the last method you can run to help with `beforeEach` is to add a `reset` method.
