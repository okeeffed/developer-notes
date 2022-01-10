# 16: Requirements of a like system

## Polymorphic associations

Possible solutions to have a generic like system.

Polymorphic association is generally not recommended.

The table for `likes` to have handle posts and comments becomes:

| id  | user_id | liked_id | liked_type |
| --- | ------- | -------- | ---------- |
| 1   | 1       | 1        | post       |
| 2   | 1       | 2        | comment    |

This is a **bad** idea because of how foreign keys are handled. `liked_id` could not be used as a foreign key.

## Polymorphic associations alternative implementation

An alternative is that we now have a `post_id` and `comment_id` column which both allow null values.

| id  | user_id | post_id | comment_id |
| --- | ------- | ------- | ---------- |
| 1   | 1       | 1       | NULL       |
| 2   | 1       | NULL    | 2          |

With this approach, you will likely want a check to make sure that only one of the two is set and at least one of the two is set.

This strategy was the one chosen for the example.

## The simplest alternative

Just have two (or more) tables.

Have table `posts_likes` and `comments_likes`.

The one downside to this approaching is aggregating all the likes. It can still be done with a UNION or a VIEW.

Views are covered later in this application.
