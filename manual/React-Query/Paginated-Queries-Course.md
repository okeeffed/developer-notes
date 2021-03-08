---
menu: React Query
name: Paginated Queries Course
---

# Paginated Queries Course

We can use local state and axios to help us with pagination:

```jsx
const [page, setPage] = React.useState(0);

const postsQuery = usePaginatedQuery(["posts", { page }], () =>
  axios
    .get("/api/posts", {
      params: {
        pageSize: 10,
        pageOffset: page,
      },
    })
    .then((res) => res.data)
);
```

As a note, our query will get back `resolvedData` and `latestData` as properties on the query. You likely will want to use `resolvedData`.

## Prefetching Paginated Queries

We can prefetch using effects!

```jsx
import React from "react";
import axios from "axios";
import { usePaginatedQuery, queryCache } from "react-query";

const fetchPosts = (_, { page }) =>
  axios
    .get("/api/posts", {
      params: {
        pageSize: 10,
        pageOffset: page,
      },
    })
    .then((res) => res.data);

export default function Posts() {
  const [page, setPage] = React.useState(0);

  const postsQuery = usePaginatedQuery(["posts", { page }], fetchPosts);

  React.useEffect(() => {
    queryCache.prefetchQuery(
      ["posts", { page: postsQuery.latestData?.nextPageOffset }],
      fetchPosts
    );
  }, [postsQuery.latestData?.nextPageOffset]);

  return (
    <div>
      {postsQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
          <ul>
            {postsQuery.resolvedData.items.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <br />
        </>
      )}
      <button onClick={() => setPage((old) => old - 1)} disabled={page === 0}>
        Previous
      </button> <button
        onClick={() => setPage((old) => old + 1)}
        disabled={!postsQuery.latestData?.nextPageOffset}
      >
        Next
      </button> <span>
        Current Page: {page + 1} {postsQuery.isFetching ? "..." : ""}
      </span>
    </div>
  );
}
```

## Infinite Queries

This is an example of fetching on a singular page instead of multiple pages.

It will use the `useInfiniteQuery` function which has a method `getFetchMore`. 

```jsx
import React from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchPosts = (_, page = 0) =>
  axios
    .get("/api/posts", {
      params: {
        pageOffset: page,
        pageSize: 10,
      },
    })
    .then((res) => res.data);

export default function Posts() {
  const postsQuery = useInfiniteQuery("posts", fetchPosts, {
    getFetchMore: (lastPage) => lastPage.nextPageOffset,
  });

  return (
    <div>
      {postsQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
          <ul>
            {postsQuery.data.map((page, index) => {
              return (
                <React.Fragment key={index}>
                  {page.items.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </React.Fragment>
              );
            })}
          </ul>
          <br />
        </>
      )}
      <button
        onClick={() => postsQuery.fetchMore()}
        disabled={!postsQuery.canFetchMore}
      >
        Fetch More
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
```

Note: You also only to need to invalidate the one query on this page.