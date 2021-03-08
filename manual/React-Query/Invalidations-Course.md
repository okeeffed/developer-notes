---
menu: React Query
name: Invalidations Course
---

# Invalidations Course

## Invalidating Queries

We can use this to invalidate a query and tell the query that we need to refetch.

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function Posts() {
  const randomQuery = useQuery('random', async () => {
    return axios.get('/api/random').then(res => res.data)
  })

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
      <div>
        <button onClick={() => queryCache.invalidateQueries('random')}>
          Invalidate Random Number
        </button>
      </div>
    </div>
  )
}
```

This will invalidate our query in the background. It will invalidate anything that begins with the key given.

## Invalidating Without Refetching Active Queries

We can use `refetchActive` to override the default of true. It won't automatically refetch in the background, but will put the query in a stale state.

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function Posts() {
  const randomQuery = useQuery(
    'random',
    async () => {
      return axios.get('/api/random').then(res => res.data)
    },
    {
      staleTime: Infinity,
    }
  )

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
      <div>
        <button
          onClick={() =>
            queryCache.invalidateQueries('random', {
              refetchActive: false,
            })
          }
        >
          Invalidate Random Number
        </button>
      </div>
    </div>
  )
}
```

## Invalidating and Refetching Inactive Queries

If something is not mounted, then invalidation will only be marked as stale as opposed to refetching. We can change `refetchInactive` to true, we can still fetch from the server.

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function App() {
  const [show, toggle] = React.useReducer(d => !d, true)
  return (
    <div>
      <button onClick={toggle}>Toggle Random</button>
      <button
        onClick={() =>
          queryCache.invalidateQueries('random', {
            refetchInactive: true,
          })
        }
      >
        Invalidate Random Number
      </button>
      {show ? <RandomNumber /> : null}
    </div>
  )
}

function RandomNumber() {
  const randomQuery = useQuery(
    'random',
    async () => {
      return axios.get('/api/random').then(res => res.data)
    },
    {
      staleTime: Infinity,
    }
  )

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
    </div>
  )
}
```

## Invalidating Multiple Queries With Similar Keys

We can invalidate multiple queries with the default action of matching multiple prefixes.

We can use out array hierarchy to invalidate individual queries.

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function App() {
  return (
    <div>
      <button onClick={() => queryCache.invalidateQueries('random')}>
        Invalidate Random Number
      </button>
      <button
        onClick={() => queryCache.invalidateQueries(['random', 'A'])}
      >
        Invalidate A
      </button>
      <button
        onClick={() => queryCache.invalidateQueries(['random', 'B'])}
      >
        Invalidate B
      </button>
      <button
        onClick={() => queryCache.invalidateQueries(['random', 'C'])}
      >
        Invalidate C
      </button>
      <RandomNumber subKey="A" />
      <RandomNumber subKey="B" />
      <RandomNumber subKey="C" />
    </div>
  )
}

function RandomNumber({ subKey }) {
  const randomQuery = useQuery(
    ['random', subKey],
    async () => {
      return axios.get('/api/random').then(res => res.data)
    },
    {
      staleTime: Infinity,
    }
  )

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
    </div>
  )
}
```