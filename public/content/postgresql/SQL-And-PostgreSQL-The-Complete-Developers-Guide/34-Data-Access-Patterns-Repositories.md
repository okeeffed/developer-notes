# 34: Data Access Patterns - Repositories

In this example, we already have a table that interacts with our table using the `Repository Pattern` in Nodejs.

## The Repository Pattern

The repository pattern can be applied when running a query.

With the repository pattern, we can create an object that will interact with the database. As an example, here is an example of a `User Repository` for the `users` table.

| Function   | Goal                                                         |
| ---------- | ------------------------------------------------------------ |
| `find`     | Return an array of objects, each object representing a user. |
| `findById` | Find a user with the provided ID                             |
| `insert`   | Add a user with some provided properties                     |
| `update`   | Update a user with the provided ID                           |
| `delete`   | Delete the user with the provided ID                         |

> Note: There can be more functions than this.

## Creating a Repository

In `src/repos/user-repo.js`:

```js
const pool = require("../pool");

module.exports = {
  find() {
    // implementation details
  },
  findById() {
    // implementation details
  },
  // ... etc
};
```

This could obviously also be a class or in JS-world just some exported functions.

The course used a class with static methods.
