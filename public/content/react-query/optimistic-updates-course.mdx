---
menu: React Query
name: Optimistic Updates Course
---

# Optimistic Updates Course

We can use the `onMutate` callback:

```jsx
const [createPost, createPostInfo] = useMutation(
  (values) => axios.post("/api/posts", values),
  {
    onMutate: (values) => {
      // Used to prevent outgoing requests are in flight
      // from causing race conditions.
      queryCache.cancelQueries("posts");

      const oldPosts = queryCache.getQueryData("posts");

      queryCache.setQueryData("posts", (oldPosts) => {
        return [
          ...oldPosts,
          {
            ...values,
            id: Date.now(),
          },
        ];
      });

      // required for rollback.
      return () => queryCache.setQueryData("posts", oldPosts);
    },
    onError: (error, values, rollback) => {
      // window.alert(error.response.data.message)
      // Rollback if required
      if (rollback) {
        rollback();
      }
    },
    onSettled: () => queryCache.invalidateQueries("posts"),
  }
);
```

The `rollback` call is used to help rollback to the previous state on an error.

Whatever is returned from the `onMutate` becomes available for our `onError` as the third value.

## Optimistic Updates for Single Entity Relations

Here is the example as code:

```jsx
const [savePost, savePostInfo] = useMutation(
  (values) =>
    axios.patch(`/api/posts/${values.id}`, values).then((res) => res.data),
  {
    onMutate: (values) => {
      queryCache.cancelQueries(["post", String(values.id)]);

      const oldPost = queryCache.getQueryData(["post", String(values.id)]);

      queryCache.setQueryData(["post", String(values.id)], values);

      return () =>
        queryCache.setQueryData(["post", String(values.id)], oldPost);
    },
    onError: (error, values, rollback) => {
      if (rollback) {
        rollback();
      }
    },
    onSuccess: (data, values) => {
      queryCache.setQueryData(["post", String(values.id)], data);
    },
    onSettled: (data, error, values) => {
      queryCache.invalidateQueries(["post", String(values.id)]);
    },
  }
);
```
