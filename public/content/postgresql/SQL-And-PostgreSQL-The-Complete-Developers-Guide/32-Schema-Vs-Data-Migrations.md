# 32: Schema Vs Data Migrations

"Say we want to merge our lat and lng columns into a single loc column."

The process that we may want is follow:

1. Add column loc.
2. Copy lat/lng to loc.
3. Drop columns lat/lng.

One of these steps are more complicated than we initially thought.

Steps (1) and (3) are forms of schema migrations, while (2) is a data migration.

## Dangers around data migrations

Everything in single migration vs split over separate migrations.

If we try do everyone in one step, we can run into trouble right away.

The schema migrations don't take any time at all, however moving data can take a lot of time.

We probably should always run a migration within a transaction. However, when there are transactions, the data migration gets a copy at a point in time.

Given that schema migrations want to be run within transactions, our data migration might not copy all the additional posts.

## Properly running data and schema migrations

The recommended approach is 5-Step Process.

The steps would be the following:

1. Add column `loc`
2. Deploy new version of API that will write values to both lat/lng and loc.
3. Copy lat/lng to loc. This will backfill all the previous files. This does not have to be in the form of a schema migration file.
4. Update API code to only write to loc column and read from loc.
5. Drop columns lat/lng.

Step (3) is more nuanced then you will think. That will be covered in the next section.

## Transaction locks

Solution one: use client library in another language. Things to note.

- Might have many rows - Node server could crash if we try to load up millions of posts all at once.
- Batching could fail halfway through, leaves us in a halfway-between state.
- Requires us to manually connect to the DB from a Node environment.
- We can run complex business logic/validation on the records before doing the update.

Solution two: SQL only.

- No moving info between DB and Node - as fast as possible.
- Harder to implement validation/business logic.

### Issues with both approaches of the transaction locks

This happens with hundreds of thousands of records or more.

We might want to run the entire update inside of one single transaction. But there are issues with long-running transactions.

When you update a value during the transaction, that row is LOCKED. It cannot be updated by any other transaction until this particular transaction completes.

There is a way to get around this is the batch update (set a limit at each time). The downside of course is that there must be a series of transactions completed.

## Dropping the column

For the final migration, we have a `up` for dropping the table and `down` for bring the columns back.
