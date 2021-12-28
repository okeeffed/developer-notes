---
menu: React Query
name: React Query v2 vs v3
---

# React Query v2 vs v3

## Selectors

```ts
const { 
    isLoading, 
    isSuccess, 
    error, 
    isError, 
    data: username 
  } = useQuery("user", fetchUser,{
       select: (user) => user.username
  });
  ```

## useQueries

Now you can use multiple querying in an array:

```ts
const results = useQueries([
 { queryKey: ['user', 1], queryFn: fetchUser },
 { queryKey: ['user', 2], queryFn: fetchUser },
 { queryKey: ['user', 3], queryFn: fetchUser },
 { queryKey: ['user', 4], queryFn: fetchUser },
])
```

## useMutation Retries

```ts
const mutation = useMutation(addUser, {retry: 3});
```

## Persist Mutation

This is great for when things are offline.

See [here](https://react-query.tanstack.com/guides/mutations#persist-mutations) for more information.

```ts
 const queryClient = new QueryClient()
 
 // Define the "addTodo" mutation
 queryClient.setMutationDefaults('addTodo', {
   mutationFn: addTodo,
   onMutate: async (variables) => {
     // Cancel current queries for the todos list
     await queryClient.cancelQueries('todos')
 
     // Create optimistic todo
     const optimisticTodo = { id: uuid(), title: variables.title }
 
     // Add optimistic todo to todos list
     queryClient.setQueryData('todos', old => [...old, optimisticTodo])
 
     // Return context with the optimistic todo
     return { optimisticTodo }
   },
   onSuccess: (result, variables, context) => {
     // Replace optimistic todo in the todos list with the result
     queryClient.setQueryData('todos', old => old.map(todo => todo.id === context.optimisticTodo.id ? result : todo))
   },
   onError: (error, variables, context) => {
     // Remove optimistic todo from the todos list
     queryClient.setQueryData('todos', old => old.filter(todo => todo.id !== context.optimisticTodo.id))
   },
   retry: 3,
 })
 
 // Start mutation in some component:
 const mutation = useMutation('addTodo')
 mutation.mutate({ title: 'title' })
 
 // If the mutation has been paused because the device is for example offline,
 // Then the paused mutation can be dehydrated when the application quits:
 const state = dehydrate(queryClient)
 
 // The mutation can then be hydrated again when the application is started:
 hydrate(queryClient, state)
 
 // Resume the paused mutations:
 queryClient.resumePausedMutations()
 ```