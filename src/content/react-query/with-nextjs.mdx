---
menu: React Query
name: React Query With NextJS Course
---

# React Query With NextJS Course

It is required for our `getServerSideProps` function before we render the page.

```jsx
import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = async () => {
  await new Promise((r) => setTimeout(r, 500));
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data.slice(0, 10));
};

export const getServerSideProps = async () => {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
};

export default function Posts({ posts }) {
  const postsQuery = useQuery("posts", fetchPosts, {
    initialData: posts,
    // this depends on whether you want to
    // refetch stale or not
    initialStale: true,
  });

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
              <ul>
                {postsQuery.data.map((post) => (
                  <Link href="/[postId]" as={`/${post.id}`} key={post.id}>
                    <a>
                      <li key={post.id}>{post.title}</li>
                    </a>
                  </Link>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
```

We can do something similar for individual posts:

```jsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";

//

const fetchPost = async (id) => {
  await new Promise((r) => setTimeout(r, 500));
  return axios
    .get("https://jsonplaceholder.typicode.com/posts/" + id)
    .then((res) => res.data);
};

export const getServerSideProps = async ({ params: { postId } }) => {
  const post = await fetchPost(postId);

  return {
    props: {
      post,
    },
  };
};

export default function Post({ post }) {
  const {
    query: { postId },
  } = useRouter();

  const postQuery = useQuery(["post", postId], () => fetchPost(postId), {
    initialData: post,
    initialStale: true,
  });

  return (
    <>
      {postQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <Link href="/">
            <a>Back</a>
          </Link>
          <h3>
            {postQuery.data.title} {postQuery.isFetching ? "..." : null}
          </h3>
          <p>
            <small>Post ID: {postQuery.data.id}</small>
          </p>
          <p>{postQuery.data.body}</p>
        </div>
      )}
    </>
  );
}
```
