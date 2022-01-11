# 31: Managing Database Design With Schema Migrations

## A story on migrations

The story talks about Postgres hosted on your machine as well as the production version running on AWS.

The local working versions has changes to a column name of `contents` to `body`.

```sql
ALTER TABLE comments
RENAME COLUMN contents TO body;
```

If you run this command on the production version, you will start to run into issues eg. API server still referring to the old version, etc.

First we need to make sure that our database and client version deploy at the same time. But what happens if the deploy happens slowly and the API still takes time to reference things correctly?

The second example talks about two engineers making changes at the same time. That in itself brings up challenges.

Basically, the morale is the story is that you have an easy way to ensure that everyone's working environment and API layer is resolved at the same time.

## Migration files

Instead of directly altering tables, moving forward will use schema migration file.

Schema migration file can be written in any language you want.

There will be two sections:

- UP: Upgrades the structure of the DB.
- DOWN: Contains a statement to "undo" the up statement.

Generally when you start a project, you start with an initial migration file, then changes are further migration files moving forward.

## A few notes on migration libraries

There are a few different libraries for helping with migrations.

The example has `node-pg-migration`.

> Note: A quick note is that most libraries will have helpers to automatically create migrations for you. It is recommended to write these out yourself in SQL.

## Generating and writing migrations

With the example library, there is a migration file that has an export for function `up` and `down`.

```js
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
		CREATE TABLE comments (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
			contents VARCHAR(240) NOT NULL
		);
	`);
};

exports.down = (pgm) => {
  pgm.sql(`
		DROP TABLE comments;
	`);
};
```

## Applying and reverting migrations

Assuming you have a valid `DATABASE_URL` variable and a npm `migrate` script:

```s
$ npm run migrate up
# Runs changes up
$ npm run migrate down
# Run changes down
```

## Generating and applying a second migration

Here we will create a second migration.

```s
$ npm run migrate create rename contents to body
# creates a new migration
```

As for the code:

```js
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
		ALTER TABLE comments
		RENAME COLUMN contents TO body;
	`);
};

exports.down = (pgm) => {
  pgm.sql(`
		ALTER TABLE comments
		RENAME COLUMN body TO contents;
	`);
};
```
