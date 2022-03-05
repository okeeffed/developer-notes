---
menu: Mock Service Worker
name: MSW with GraphQL
---

# MSW with GraphQL

## Resources

1. [GraphQL API](https://mswjs.io/docs/getting-started/mocks/graphql-api)

## tl;dr

The GraphQL call:

```graphql
query AllCategories {
  allCategories {
    nodes {
      name
    }
  }
}
```

The corelating code:

```ts
// src/mocks/handlers.js
import { graphql } from "msw"

export const handlers = [
  graphql.query("AllCategories", (_req, res, ctx) => {
    return res(
      ctx.data({
        allCategories: {
          nodes: [
            {
              name: "Testing",
            },
          ],
        },
      })
    )
  }),
]
```
