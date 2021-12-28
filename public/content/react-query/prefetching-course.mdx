---
menu: React Query
name: Prefetching Course
---

# Prefetching Course

## Basic Query Prefetching

We can prefetch queries by using the `queryCache` method `prefetchQuery`.

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

export default function App() {
  const [show, toggle] = React.useReducer(d => !d, false)

  React.useEffect(() => {
    queryCache.prefetchQuery('posts', fetchPosts)
  }, [])

  return (
    <div>
      <button onClick={toggle}>Show Posts</button>
      {show ? <Posts /> : null}
    </div>
  )
}

async function fetchPosts() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data.slice(0, 10))
}

function Posts({ setPostId }) {
  const postsQuery = useQuery('posts', fetchPosts)

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? '...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map(post => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
```

## Hover-based Prefetching

We can use the `onMouseHover` function to apply this.

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

function Posts({ setPostId }) {
  const postsQuery = useQuery('posts', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data.slice(0, 10))
  })

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? '...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map(post => {
              return (
                <li
                  key={post.id}
                  onMouseEnter={() => {
                    queryCache.prefetchQuery(['post', post.id], () =>
                      fetchPost(post.id)
                    )
                  }}
                >
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
```

## Prefetching and Stale Time

Each list item resolves, becomes stale and then continually fetches. There is a lot of bandwidth that we do not technically need. We can set the prefetch option of `staleTime`.

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

function Posts({ setPostId }) {
  const postsQuery = useQuery('posts', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data.slice(0, 10))
  })

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? '...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map(post => {
              return (
                <li
                  key={post.id}
                  onMouseEnter={() => {
                    queryCache.prefetchQuery(
                      ['post', post.id],
                      () => fetchPost(post.id),
                      {
                        staleTime: Infinity,
                      }
                    )
                  }}
                >
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
```

## Forced Prefetching

We can force the prefetching to happen to with a `force` call. This can help you bypass a query regardess of whether or not it is stale.****

```jsx
import React from 'react'
import { useQuery, queryCache } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import axios from 'axios'

function Posts({ setPostId }) {
  const postsQuery = useQuery('posts', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data.slice(0, 10))
  })

  return (
    <div>
      <h1>Posts {postsQuery.isFetching ? '...' : null}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map(post => {
              return (
                <li
                  key={post.id}
                  onMouseEnter={() => {
                    queryCache.prefetchQuery(
                      ['post', post.id],
                      () => fetchPost(post.id),
                      null,
                      {
                        force: true,
                      }
                    )
                  }}
                >
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
```