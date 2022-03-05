---
menu: React Query
name: Getting Started With React Query
---

# Getting Started With React Query

## Resources

1. [React Query](https://react-query.tanstack.com/)
2. [Handling Errors](<(https://react-query.tanstack.com/guides/query-functions#handling-and-throwing-errors)>)

## Handling and throwing errors

Check the [docs](https://react-query.tanstack.com/guides/query-functions#handling-and-throwing-errors) for more information.

The tl;dr is that you want to return a promise or throw an error.

```js
const { isLoading, error, data } = useQuery('todoListData', async () => {
  const result = await fetch('/api/v1/todos');

  if (!result.ok) {
    throw new Error(result.statusText);
  }
  return result.json();
});
```

## Setting up a new project

```js
import React, { useEffect } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppChildren />
    </QueryClientProvider>
  );
}

export default App;
```

## Setting up for testing

If using with a library such as React Testing Library, be sure to create a custom render util:

```tsx
// test/test-utils.tsx
import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    // Force the cache to clear to ensure responses
    // are as expected for each test.
    queries: {
      cacheTime: 0,
      retry: false,
    },
  },
});

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
```

## Custom hooks

To abstract logic, it would be recommended to abstract the hook:

```ts
function useTodoList() {
  const [status, setStatus] = React.useState<Status>(Status.pending);
  const { isLoading, error, data } = useQuery('todoListData', async () => {
    const result = await fetch('/api/v1/todos');

    if (!result.ok) {
      throw new Error(result.statusText);
    }
    return result.json();
  });

  useEffect(() => {
    if (isLoading) {
      setStatus(Status.pending);
    }

    if (error) {
      // handle error reporting ... Sentry.sendErr(error)
      setStatus(Status.failed);
    } else if (data) {
      setStatus(Status.success);
    }
  }, [isLoading, error, data]);

  return { status, data };
}
```
