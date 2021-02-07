---
menu: Mock Service Worker
name: msw with React
---

# msw with React

## Resources

1. [React MSW Example - GitHub](https://github.com/mswjs/examples/tree/master/examples/rest-react)
2. [Stop mocking fetch - Kent C Dodds](https://kentcdodds.com/blog/stop-mocking-fetch)

## Setting up

You need to have msw generate a `mockServiceWorker.js` file for you in the `public` directory.

```s
npx msw init public
```

## Creating you mock handlers

Create file `src/mocks/handlers.js`

```js
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/todos', (_, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.json([
        {
          id: '1',
          title: 'Mocked API',
          done: false,
        },
        {
          id: '2',
          title: 'Task Two',
          done: false,
        },
        {
          id: '3',
          title: 'Task Three',
          done: false,
        },
      ]),
    );
  }),

  rest.post('/api/v1/todos', (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.json({
        ...req.body,
        id: generatedId(),
      }),
    );
  }),
];
```

## Setting up for the browser

Create file `src/mocks/browser.js`

```js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

Within your index file for the React application:

```js
// ...

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// ...
```

## Setting up for Node (and testing)

Create file `src/mocks/server.js`:

```js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup requests interception using the given handlers.
export const server = setupServer(...handlers);
```

When setting up for tests, you'll need to setup some Jest config in `src/setupTests.ts`.

```js
// src/test/setup-env.js

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// test/setup-env.js
// add this to your setupFilesAfterEnv config in jest so it's imported for every test file
import { server } from './mocks/server.js';

beforeAll(() => server.listen());
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

An example test of running a lifecycle that is being stubbed by `msw` looks like the following:

```js
import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';

describe('rendering the App component', () => {
  describe('rendering the Todo List', () => {
    test('shows todo items on successful state cycle', async () => {
      render(<App />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      expect(screen.getByText(/mocked api/i)).toBeInTheDocument();
    });
  });
});
```

For overriding tests with a different response, we can inline the server:

```js
import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '../test/test-utils';
import { TodoList } from './App';
import { rest } from 'msw';
import { server } from './mocks/server';

describe('rendering the App component', () => {
  describe('rendering the Todo List', () => {
    test('shows todo items on successful state cycle', async () => {
      render(<TodoList />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      expect(screen.getByText(/mocked api/i)).toBeInTheDocument();
    });

    test('shows a failed request message when server request fails', async () => {
      server.use(
        rest.get('/api/v1/todos', (_, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Internal error' }));
        }),
      );

      render(<TodoList />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
      expect(screen.getByText(/request failed/i)).toBeInTheDocument();
      screen.debug();
    });
  });
});
```
