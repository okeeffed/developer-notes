---
menu: React Query
name: Queries Course
---

# Queries Course

## Basic queries

Getting started with queryies will focus on the `useQuery` function.

`useQuery` needs a unique key and a function that will go and grab some data.

Tanner prefers using `axios` instead of `fetch` as it can be cumbersome.

```jsx
// with fetch
import React from "react";
import { useQuery } from "react-query";

export default function App() {
  const queryInfo = useQuery("pokemon", () =>
    fetch("https://pokeapi.co/api/v2/pokemon").then((res) =>
      res.json().then((json) => json.results)
    )
  );

  return <div>Hello</div>;
}

// with axios
import React from "react";
import { useQuery } from "react-query";

export default function App() {
  const queryInfo = useQuery("pokemon", () =>
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results)
  );

  return <div>Hello</div>;
}
```

If we log out the `queryInfo`, we can see a few logs occur as the state changes.

This includes values such as the data, loading and error state information.

`queryInfo` includes `status` which could be `loading` | `error` | `success`. There is also a `isLoading`, `isError` and `isSuccess` value.

## React Query DevTools

To install, run `npm i --save-dev react-query-devtools`.

```jsx
// with axios
import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

export default function App() {
  const queryInfo = useQuery("pokemon", () =>
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results)
  );

  return (
    <div>
      Hello
      <ReactQueryDevtools />
    </div>
  );
}
```

> Note: with v3 the tools are built-in. See [here](https://react-query.tanstack.com/devtools) for more info.

## Configuration object

Out-of-the-box, React Query tries to keep things up to date for you. You can see refetches happen as you head back to the page.

We can update this by using the third `options` solution for React Query.

```js
useQuery(
  "pokemon",
  () =>
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results),
  { refetchOnWindowFocus: false }
);
```

## Query Refetching Indicators

What if we want an indicator to show that something is happening?

```jsx
// with axios
import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

export default function App() {
  const queryInfo = useQuery("pokemon", () =>
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results)
  );

  return (
    <div>
      <p>
        {queryInfo.data.map((res) => (
          <p key={result.name}>{result.name}</p>
        ))}
      </p>
      {queryInfo.isFetching ? "Updating..." : null}
      <ReactQueryDevtools />
    </div>
  );
}
```

## Configure Query Stale Time

React Query has aggressive stale times. Initially, data is stale as soon as it has been fetched. We can change the refetch times to change how often things go stale.

```js
useQuery(
  "pokemon",
  () =>
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results),
  {
    staleTime: 5000,
  }
);
```

## Configuring Query Cache Time

There is a `inactive` state for data when it is not shown. It also updates in the background to make sure it is up to date in the background.

If we use the `cacheTime`, there will be a "garbage collection" that happens when cache data is inactive and unused.

```js
useQuery(
  "pokemon",
  () =>
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results),
  {
    cacheTime: 5000,
  }
);
```

## Query Keys and Caching

What happens when you have two different keys but for the same data?

We end up with different queries in our cache even though they're fetching the same data.

If both used the same user key, you'll notice that there is only one fetch that happens.

Out-of-the-box with the same key will only use that data and request once.

## Using Custom Hooks to Share and Resuse Queries

We can clean up how we use our hooks for multiple components.

```jsx
function usePokemon() {
  return useQuery("pokemon", () =>
    axios("https://pokeapi.co/api/v2/pokemon").then((res) => res.data.results)
  );
}
```

## Parallel Queries

Both calls are made in parallel out-of-the-box.

## Using Dynamic Keys

This allows you to pass props or state to the query. This is useful for things such as a search box.

This is also useful to show data instantly when searches look up old queries already stored.

## Diabling and Enabling Queries

This can be useful to ensure no fetches are made without data.

```jsx
function usePokemon({ pokemon }) {
  return useQuery(
    pokemon,
    () =>
      axios("https://pokeapi.co/api/v2/pokemon").then(
        (res) => res.data.results
      ),
    {
      enabled: pokemon,
    }
  );
}
```

## Multi-part Query Keys

What happens when you have heaps of pokemon in a query key?

React Query knows how to stringify query keys to make more descriptive labels.

```jsx
function usePokemon({ pokemon }) {
  return useQuery(
    ["pokemon", pokemon],
    () =>
      axios("https://pokeapi.co/api/v2/pokemon").then(
        (res) => res.data.results
      ),
    {
      enabled: pokemon,
    }
  );
}
```

## Automatic Query Retries

This is another configuration option. React Query auto-retries to see if it can get the data.

It retries with something known as "exponential backoff".

We can change retries with the `retry` key.

```jsx
function usePokemon({ pokemon }) {
  return useQuery(
    ["pokemon", pokemon],
    () =>
      axios("https://pokeapi.co/api/v2/pokemon").then(
        (res) => res.data.results
      ),
    {
      enabled: pokemon,
      retry: 1,
    }
  );
}
```

You can also change the retry delay with the `retryDelay` configuration option. You can also use a function instead of a number for `retryDelay` to be more specific.

You can pass retry to be `0` or `false` to stop retries.

## Query Cancellation

If there is a request going out for everything you type, you can cancel the cancellation.

One option is to debounce. Out-of-the-box, React Query knows not to add the key to the store.

You can wire up query cancellation to help with this.

```jsx
import axios, { CancelToken } from "axios";
function usePokemon({ pokemon }) {
  return useQuery(
    ["pokemon", pokemon],
    () => {
      const source = CancelToken.source();
      const promise = axios
        .get("https://pokeapi.co/api/v2/pokemon", { cancelToken: source.token })
        .then((res) => res.data.results);

      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
      };

      return promise;
    },
    {
      enabled: pokemon,
      retry: 1,
    }
  );
}
```

For fetch:

```jsx
function usePokemon({ pokemon }) {
  return useQuery(
    ["pokemon", pokemon],
    () => {
      const controller = new AbortController();
      const signal = controller.signal;
      const promise = fetch("https://pokeapi.co/api/v2/pokemon", {
        method: "get",
        signal,
      }).then((res) => res.json());

      promise.cancel = () => {
        controller.abort();
      };

      return promise;
    },
    {
      enabled: pokemon,
    }
  );
}
```

## Dependent Queries

If we have queries that must run sequentially, we essentially need to make sure that `enabled` is set for the dependent value.

Dependent query will need to make sure we have `isIdle` sorted as well.

```jsx
import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

// user email:
// https://jsonplaceholder.typicode.com/users?email=${email}

// https://jsonplaceholder.typicode.com/posts?userId=${userId}

const email = "Sincere@april.biz";

function MyPosts() {
  const userQuery = useQuery("user", () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then((res) => res.data[0])
  );

  const postsQuery = useQuery(
    "posts",
    () =>
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data.id}`
        )
        .then((res) => res.data),
    {
      enabled: userQuery.data?.id,
    }
  );

  return userQuery.isLoading ? (
    "Loading user..."
  ) : (
    <div>
      User Id: {userQuery.data.id}
      <br />
      <br />
      {postsQuery.isIdle ? null : postsQuery.isLoading ? (
        "Loading posts..."
      ) : (
        <div>Post Count: {postsQuery.data.length}</div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <MyPosts />
      <ReactQueryDevtools />
    </div>
  );
}
```

## Initial Data

This is just a config option:

```js
const userQuery = useQuery(
  "user",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then((res) => res.data[0]);
  },
  {
    initialData: existingUser,
  }
);
```

### Marking Initial Data As Stale

Initial data is not stale by default

```js
const userQuery = useQuery(
  "user",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then((res) => res.data[0]);
  },
  {
    initialData: existingUser,
    initialStale: true,
  }
);
```

## Querying Related Lists and Items

This would be "fetching" a list of posts and then clicking on the post and having an individual item fetched.

```jsx
import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

function Posts({ setPostId }) {
  const postsQuery = useQuery("posts", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data);
  });

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? "..." : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data.map((post) => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Post({ postId, setPostId }) {
  const postQuery = useQuery(["post", postId], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.data);
  });

  return (
    <div>
      <a onClick={() => setPostId(-1)} href="#">
        Back
      </a>
      <br />
      <br />
      {postQuery.isLoading ? (
        "Loading..."
      ) : (
        <>
          {postQuery.data.title}
          <br />
          <br />
          {postQuery.isFetching ? "Updating..." : null}
        </>
      )}
    </div>
  );
  //
}

export default function App() {
  const [postId, setPostId] = React.useState(-1);

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools />
    </div>
  );
}
```

## Seeding Initial Query Data From Other Queries

```jsx
import { useQuery, queryCache } from "react-query";

// ... code omitted

const postQuery = useQuery(
  ["post", postId],
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.data);
  },
  {
    initialData: () =>
      queryCache.getQueryData("posts")?.find((post) => post.id === postId),
    initialStale: true,
  }
);
```

## Using Query Data to Seed Future Queries

To use more of a "push" mentality to preset the queries:

```jsx
const postsQuery = useQuery('posts', async () => {
await new Promise(resolve => setTimeout(resolve, 1000))
    const posts = await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.data)

    posts.forEach(post => {
        queryCache.setQueryData(['post', post.id], post)
    })

    return posts
})
```

This "pushes" the data from a larger fetch to preset the data for checking individual Posts later based on the key.

It is worth noting that `setQueryData` is consideres stale immediately.

## Query Side-Effects

There are callback functions that we can add to create side-effects. This could also be quite useful for state management.

```jsx
const [count, increment] = React.useReducer(d => d + 1, 0)

const postsQuery = useQuery('posts', fetchPosts, {
    onSuccess: data => {
        increment()
    },
    onError: error => {},
    onSettled: (data, error) => {},
})
```

Note that this happens per-instance. Mutiple calls to this `useQuery` will result in multiple `onSuccess` calls.

## Scroll Restoration

Thanks to the query cache, we have out-of-the-box scroll restoration to bring us back to where we were on a particular page.

If you do set the `cacheTime` and the query cache is garbage collected, then you'll notice that you are not brought down to the particular page that we want.

## Query Polling with Refetch Intervals

We can use `refetchInterval` and `refetchIntervalInBackground` to poll.

```jsx
import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function Posts() {
  const timeQuery = useQuery(
    'posts',
    async () => {
      return axios.get('/api/time').then(res => res.data)
    },
    {
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  )

  return (
    <div>
      <h1>Server Time {timeQuery.isFetching ? '...' : null}</h1>
      <div>
        {timeQuery.isLoading
          ? 'Loading time...'
          : new Date(timeQuery.data.time).toLocaleString()}
      </div>
    </div>
  )
}
```

`refetchIntervalInBackground` is not a great idea if you don't want to keep polling while on other tabs etc.