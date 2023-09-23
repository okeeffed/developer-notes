# Your First Arel Query

## Resources and link

- https://blog.saeloun.com/2021/10/19/rails-arel-primer.html

## The Primer

Writing queries in Rails without SQL:

```sql
SELECT "user".* FROM "users" WHERE "users"."role" = 'admin'
```

Writing with the model:

```rb
User.where(role: :admin)
```

Under the hood, Rails is usin the Arel library to build out the SQL queries. Arel is a powerful SQL AST manager that lets us appropriately combine selection statements for simple to very complicated queries.

Be cautioned: Arel is still a private API provided by Rails. Future versions can be subject to change.

Taking the same query and writing it in Arel:

```rb
# The partial query
User.arel_table['role'].eq('admin').to_sql

# Chaining that partial query to the table
User.where(User.arel_table['role'].eq('admin')).to_sql
=> SELECT "users".* FROM "users" WHERE "users"."role" = 'admin'
```

## Arel 101

```rb
# Arel table
users = User.arel_table

# Arel fields
users[:role]

# Where queries
users[:id].in([1,2,3]).to_sql
users[:id].gt(2).to_sql
users[:id].eq(3).to_sql

# Project queries...
users.where(users[:role].eq(:admin)).project(:email).to_sql
# ... to execute
ActiveRecord::Base.connection.exec_query users.where(users[:role].eq(:admin)).project(:email).to_sql

# Aggregates
users.project(users[:age].sum)
users.project(users[:age].average)
users.project(users[:id].count)

# Order
users.order(users[:name], users[:age].desc)

# Limit & Offset
users.take(5)
=> 'SELECT * FROM users LIMIT 5'
users.skip(4)
=> 'SELECT * FROM users OFFSET 4'

# Joins
photos = Photo.arel_table
users.join(photos)
# Specifying the relationship
users.join(photos, Arel::Nodes::OuterJoin).on(users[:id].eq(photos[:user_id]))
# Conditions
users.joins(:photos).merge(Photo.where(published: true))
```
