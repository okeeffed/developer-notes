---
menu: PostgresSQL
name: psql tips
---

# psql tips

## Useful Links

- http://www.postgresqltutorial.com/psql-commands/

## tl;dr

Connect with `psql --user=postgres --host=0.0.0.0 --port=5432`.

| Command            | Action                          |
| ------------------ | ------------------------------- |
| \c dbname username | Change to database              |
| \l                 | List available databases        |
| \dt                | List tables in current database |
| \d table_name      | Describe table                  |
