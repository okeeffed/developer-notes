# 30: Handling Concurrency And Reversibility With Transactions

## What are transactions used for?

Say we are developing a database for a bank. One thing that we might need to do and transfer an account from one person to another. We need to ensure the database is ACID-compliant.

## Opening and closing transactions

We connect to Postgres using a "connection". Every time we open multiple windows to PG Admin, we open a new connection.

In the example, we slowly walk through the fact that a BEGIN statement in one workspace and update the database won't be reflected in another connection and workspace that isn't part of the transaction.

```sql
BEGIN; -- start a transaction
```

To run the transaction, we can use some key words:

To make those changes back into the main data pool, we can run `COMMIT` or `ROLLBACK` if we don't want to save any changes.

> Note: whenever there is an error in a separate transaction workspace, it is in an aborted state and you need to manually run `ROLLBACK`.

```sql
COMMIT; -- save changes
```

## Transaction cleanup on crash

In this example, while a transaction was running then a connection was manually closed within PG Admin.

```sql
BEGIN;
SELECT * FROM made_up_table; -- will throw error
SELECT * FROM real_data; -- Error still persists, you are in an aborted state.
ROLLBACK; -- return to previous state
```
