---
menu: React Query
name: Mutations Course
---

# Mutations Course

While queries are mainly for reading data, we now want to talk about mutations ie create, update and delete requests.

It is the modification of data.

Mutations are necessary to think about as serverside data is always changing.

Handling mutations in a reliable way is incredibly important for our applications.

## Basic Mutations

The basic experience is not the best. The first thing we can do to make it better is to use the `useMutation` hook.

The `useMutation` hook returns two things as a tuple: the mutation call and the information about the post.

We can also use callbacks to help with the invalidation of queries.

```jsx
const [createPost, createPostInfo] = useMutation(
  (values) => axios.post("/api/posts", values),
  {
    onSuccess: () => {
      queryCache.invalidateQueries("posts");
    },
  }
);
```

## Mutation Side-Effects

We can also use the callbacks for other side-effects:

```jsx
const [createPost, createPostInfo] = useMutation(
  (values) => axios.post("/api/posts", values),
  {
    onError: (error) => {
      window.alert(error.response.data.message);
    },
    onSettled: () => queryCache.invalidateQueries("posts"),
  }
);
```

`onSettled` will always run regardless of success or error.

## Updating Query Data With Mutation Responses

Imagine that we are updating a value with a patch request. We may want to let the cache know that the data has changed.

We can do this with the callback functions.

```jsx
const [savePost, savePostInfo] = useMutation(
  (values) =>
    axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
  {
    onSuccess: (data, values) => {
      console.log(data);
      queryCache.setQueryData(["post", String(values.id)], data);
      // Only if necessary.
      // Only required if server has specific changes ie timestamps etc.
      // Aims for eventual consistency
      queryCache.invalidateQueries(["post", String(values.id)]);
    },
  }
);
```
