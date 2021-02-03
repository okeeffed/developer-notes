---
menu: Epic React
name: Testing React Apps
---

# Testing React Apps

## Simple Test with ReactDOM

> "The more your tests resemble the way your software is used, the more
> confidence they can give you." -
> [@kentcdodds](https://twitter.com/kentcdodds/status/977018512689455106)

To just get a basic component logging to our terminal during a test, we can have:

```js
import * as React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div');
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div);
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div);
  console.log(document.body.innerHTML);
});
```

To start validating messages from the div we created, we could do the following (for the example of the counter with a single text element):

```js
// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div');
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div);
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div);

  // 🐨 get a reference to the message div:
  const message = div.firstChild.querySelector('div');
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0');
});
```

To now test the clicking of the buttons, we can do the following:

```js
// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div');
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div);
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div);
  // 🐨 get a reference to the increment and decrement buttons:
  const [decrement, increment] = div.querySelectorAll('button');

  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const message = div.firstChild.querySelector('div');
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0');
  // 🐨 click the increment button (💰 increment.click())
  increment.click();
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1');
  // 🐨 click the decrement button (💰 decrement.click())
  decrement.click();
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0');
  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  div.remove();
});
```

But instead of `div.remove`, it is better for us to set a before hook. The reason being that if a test fails, it could cause subsequent failures at the clean up did not occur.

```js
beforeEach(() => (document.body.innerHTML = ''));
```

### Use dispatchEvent

To follow more closely with what happens when the user clicks in React, we change to use `dispatchEvent`:

```js
// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react';
import ReactDOM from 'react-dom';
import Counter from '../../components/counter';

beforeEach(() => (document.body.innerHTML = ''));

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  const div = document.createElement('div');
  // 🐨 append the div to document.body (💰 document.body.append)
  document.body.append(div);
  // 🐨 use ReactDOM.render to render the <Counter /> to the div
  ReactDOM.render(<Counter />, div);
  // 🐨 get a reference to the increment and decrement buttons:
  const [decrement, increment] = div.querySelectorAll('button');

  const incrementClickEvent = new MouseEvent('click', {
    // required for event delgation to work (required by React)
    bubbles: true,
    cancelable: true,
    button: 0,
  });

  const decrementClickEvent = new MouseEvent('click', {
    // required for event delgation to work (required by React)
    bubbles: true,
    cancelable: true,
    button: 0,
  });

  // 🐨 get a reference to the message div:
  //   💰 div.firstChild.querySelector('div')
  const message = div.firstChild.querySelector('div');
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0');
  increment.dispatchEvent(incrementClickEvent);
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 1');
  // 🐨 click the decrement button (💰 decrement.click())
  decrement.dispatchEvent(decrementClickEvent);
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0');
  //
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
  div.remove();
});
```

## Simple Test With React Testing Library

Liked the above example, but did not enjoy the boilerplate. Implementing `react-testing-library` looks like so:

```js
// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react';
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
import { render, fireEvent } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 swap ReactDOM.render with React Testing Library's render
  // Note that React Testing Library's render doesn't need you to pass a `div`
  // so you only need to pass one argument. render returns an object with a
  // bunch of utilities on it. For now, let's just grab `container` which is
  // the div that React Testing Library creates for us.
  const { container } = render(<Counter />);

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = container.querySelectorAll('button');
  const message = container.firstChild.querySelector('div');

  expect(message.textContent).toBe('Current count: 0');

  // 🐨 replace the next two statements with `fireEvent.click(button)`
  fireEvent.click(increment);
  expect(message.textContent).toBe('Current count: 1');
  fireEvent.click(decrement);
  expect(message.textContent).toBe('Current count: 0');
});
```

> One of the slight differences is that fireEvent is automatically wrapped in ReactTestUtils act() function. If you ever see an act warning, then that's absolutely something that you probably need to deal with, but you never need to wrap a call to fireEvent in act.
> The only reason I'm mentioning that to you is because I see it all the time. If you ever come across an act warning, your solution is not to wrap the fireEvent call in act. The solution will be something else entirely.

### Using jest-dom for better messages

We can import `@testing-library/jest-dom` into the file (or in a setup file) to extend our Jest assertions to include things such as `.toHaveTextContent` for better error messaging. Once done we can update our code to look like so:

```js
// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react';
// 🐨 import the `render` and `fireEvent` utilities from '@testing-library/react'
import { render, fireEvent } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 swap ReactDOM.render with React Testing Library's render
  // Note that React Testing Library's render doesn't need you to pass a `div`
  // so you only need to pass one argument. render returns an object with a
  // bunch of utilities on it. For now, let's just grab `container` which is
  // the div that React Testing Library creates for us.
  const { container } = render(<Counter />);

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = container.querySelectorAll('button');
  const message = container.firstChild.querySelector('div');

  expect(message).toHaveTextContent('Current count: 0');

  // 🐨 replace the next two statements with `fireEvent.click(button)`
  fireEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  fireEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});
```

## Avoid Implementation Details

> The implementation of your abstractions does not matter to the users of your abstraction and if you want to have confidence that it continues to work through refactors then **neither should your tests.**

Here's a React example of this:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>{count}</button>;
}
```

Here's one way you might access that `button` to click and assert on it:

```javascript
const { container } = render(<Counter />);
container.firstChild; // <-- that's the button
```

However, what if we changed it a bit:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(c => c + 1);
  return (
    <span>
      <button onClick={increment}>{count}</button>
    </span>
  );
}
```

Our tests would break!

The only difference between these implementations is one wraps the button in a
`span` and the other does not. The user does not observe or care about this
difference, so we should write our tests in a way that passes in either case.

So here's a better way to search for that button in our test that's
implementation detail free and refactor friendly:

```javascript
render(<Counter />);
screen.getByText('0'); // <-- that's the button
// or (even better) you can do this:
screen.getByRole('button', { name: '0' }); // <-- that's the button
```

In the example, we did the following change:

```js
// Avoid implementation details
// INITIAL CODE

import * as React from 'react';
// 🐨 add `screen` to the import here:
import { render, fireEvent } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />);
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  const [decrement, increment] = container.querySelectorAll('button');
  const message = container.firstChild.querySelector('div');

  expect(message).toHaveTextContent('Current count: 0');
  fireEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  fireEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});

// Avoid implementation details
// FIRST CHANGE

import * as React from 'react';
// 🐨 add `screen` to the import here:
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />);
  // 🐨 replace these with screen queries
  const decrement = screen.getByText('Decrement');
  const increment = screen.getByText('Increment');
  const message = screen.getByText('Current count: 0');

  expect(message).toHaveTextContent('Current count: 0');
  fireEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  fireEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});

// Avoid implementation details
// FINAL CHANGE

import * as React from 'react';
// 🐨 add `screen` to the import here:
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />);
  // 🐨 replace these with screen queries
  const decrement = screen.getByRole('button', { text: /decrement/i });
  const increment = screen.getByRole('button', { text: /increment/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent('Current count: 0');
  fireEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  fireEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});
```

The `screen` utility can be used to find computations based on attributes that can found using the `accessibility` tab.

There is information on priority for testing implementation details that can be found [here](https://testing-library.com/docs/queries/about/).

### Browser events (handling more than just a click)

If the implementation detail is changed for the event that fires it (by is a subtle relation to a click), our tests will break. To be resilient to this (or to test similar interactions) then we can do the following:

```js
// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react';
// 🐨 add `screen` to the import here:
import { render, userEvent, screen } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />);
  // 🐨 replace these with screen queries
  const decrement = screen.getByRole('button', { text: /decrement/i });
  const increment = screen.getByRole('button', { text: /increment/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent('Current count: 0');
  userEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  userEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});
```

All we need to change is `fireEvent` to `userEvent`. When running `click` with a `userEvent`, it will fire all kinds of events for us to test these different scenarions that a user may make.

## Form Testing

To test our form, we can first debug what is on the screen to render our the current HTML from the component that is rendered:

```js
// form testing
// http://localhost:3000/login

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/login';

test('submitting the form calls onSubmit with username and password', () => {
  render(<Login />);
  screen.debug();
});
```

We can assert that our form works as expected by updating the code to the following:

```js
// form testing
// http://localhost:3000/login

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/login';

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData;
  const handleSubmit = data => (submittedData = data);
  render(<Login onSubmit={handleSubmit} />);
  const username = 'chucknorris';
  const password = 'i need no password';

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(submittedData).toEqual({
    username,
    password,
  });
});
```

### Using a Jest Mock function

This is us listening and assert what the `onSubmit` function call is passed and how many times it is fired:

```js
// form testing
// 💯 use a jest mock function
// http://localhost:3000/login

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/login';

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  const username = 'chucknorris';
  const password = 'i need no password';

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### Generate test data

> "Something to keep in mind is that people are going to be reading this test in the future. They may not know the implementation of login and what decisions were made and what's important. Everything that they see in the test, they're going to assume it's important. They're going to assume that it's important that we render the login with an onSubmit prop."

We can use Faker to help the user know that the implementation value is not important.

```js
// form testing
// 💯 generate test data
// http://localhost:3000/login

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import Login from '../../components/login';

function buildLoginForm() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };
}

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### Allow for overrides

We just allow overrides so that a user can handle special cases.

```js
// form testing
// 💯 allow for overrides
// http://localhost:3000/login

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import Login from '../../components/login';

// overrides is the important part
function buildLoginForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  };
}

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### Use Test Data Bot

This is using a test data bot utility `@jackfranklin/test-data-bot` to help create test factories that can automatically be overriden.

```js
// form testing
// 💯 use Test Data Bot
// http://localhost:3000/login

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';
import Login from '../../components/login';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

## Mocking HTTP Requests

We use `msw` to intercept web requests.

We setup the server like so:

```js
const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({ message: 'password required' }));
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({ message: 'username required' }));
      }
      return res(ctx.json({ username: req.body.username }));
    },
  ),
);

beforeAll(() => server.listen());
afterAll(() => server.close());
```

The code provided can handle the route to intercept along with the return values.

```js
// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Login from '../../components/login-submission';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(ctx.status(400), ctx.json({ message: 'password required' }));
      }
      if (!req.body.username) {
        return res(ctx.status(400), ctx.json({ message: 'username required' }));
      }
      return res(ctx.json({ username: req.body.username }));
    },
  ),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});
```

### Mocked Responses

Essentially here we are abstracting the handlers to another file.

```js
// test/server-handlers.js
import { rest } from 'msw';

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;

const handlers = [
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      if (!req.body.password) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({ message: 'password required' }),
        );
      }
      if (!req.body.username) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({ message: 'username required' }),
        );
      }
      return res(ctx.delay(delay), ctx.json({ username: req.body.username }));
    },
  ),
];

export { handlers };
```

```js
// mocking HTTP requests
// 💯 reuse server request handlers
// http://localhost:3000/login-submission

import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';
import { setupServer } from 'msw/node';
import { handlers } from 'test/server-handlers';
import Login from '../../components/login-submission';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});
```

### Testing the unhappy path

```js
// mocking HTTP requests
// 💯 test the unhappy path
// http://localhost:3000/login-submission

import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';
import { setupServer } from 'msw/node';
import { handlers } from 'test/server-handlers';
import Login from '../../components/login-submission';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});

test('omitting the password results in an error', async () => {
  render(<Login />);
  const { username } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole('alert')).toHaveTextContent('password required');
});
```

## Use inline snapshots

It is not great to hardcode things such as "error messages" in case the error message ever changes.

```js
// mocking HTTP requests
// 💯 use inline snapshots for error messages
// http://localhost:3000/login-submission

import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';
import { setupServer } from 'msw/node';
import { handlers } from 'test/server-handlers';
import Login from '../../components/login-submission';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});

test('omitting the password results in an error', async () => {
  render(<Login />);
  const { username } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  );
});
```

### Using one-off server handlers

This is an ability to override the current handlers that have been implemented.

```js
// mocking HTTP requests
// 💯 use one-off server handlers
// http://localhost:3000/login-submission

import * as React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { build, fake } from '@jackfranklin/test-data-bot';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from 'test/server-handlers';
import Login from '../../components/login-submission';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByText(username)).toBeInTheDocument();
});

test('omitting the password results in an error', async () => {
  render(<Login />);
  const { username } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  // don't type in the password
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  );
});

test('unknown server error displays the error message', async () => {
  const testErrorMessage = 'Oh no, something bad happened';
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
      },
    ),
  );
  render(<Login />);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

  expect(screen.getByRole('alert')).toHaveTextContent(testErrorMessage);
});
```

## Mocking Browser APIs and Modules

> Mocking HTTP requests is one thing, but sometimes you have entire Browser APIs
> or modules that you need to mock. Every time you create a fake version of what
> your code actually uses, you're "poking a hole in reality" and you lose some
> confidence as a result (which is why E2E tests are critical). Remember, we're
> doing it and recognizing that we're trading confidence for some practicality or
> convenience in our testing. (Read more about this in my blog post:
> [The Merits of Mocking](https://kentcdodds.com/blog/the-merits-of-mocking)).
> To learn more about what "mocking" even is, take a look at my blog post
> [But really, what is a JavaScript mock?](https://kentcdodds.com/blog/but-really-what-is-a-javascript-mock)

An example is when Kent needed to mock the browser `window.resizeTo` and polyfill `window.matchMedia`:

```js
import matchMediaPolyfill from 'mq-polyfill';

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
  };
});
```

This allows to capability of continuing to test in Jest while not running in a browser.

Sometimes, a module is doing something you don't want to actually do in tests.
Jest makes it relatively simple to mock a module:

```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// __tests__/some-test.js
import { add, subtract } from '../math';

jest.mock('../math');

// now all the function exports from the "math.js" module are jest mock functions
// so we can call .mockImplementation(...) on them
// and make assertions like .toHaveBeenCalledTimes(...)
```

Additionally, if you'd like to mock only _parts_ of a module, you can provide
your own "mock module getter" function:

```javascript
jest.mock('../math', () => {
  const actualMath = jest.requireActual('../math');
  return {
    ...actualMath,
    subtract: jest.fn(),
  };
});

// now the `add` export is the normal function,
// but the `subtract` export is a mock function.
```

Mocking in action:

```js
// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import Location from '../../examples/location';

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };
  const { promise, resolve } = deferred();
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition));
    },
  );

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await act(async () => {
    resolve();
    await promise;
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  );
});
```

The act function is placed around the resolve (you'll see the error show up in the console) and it happens because the callback is updating the state in a 3rd-party component being used.

We need to ensure all the side-effects are flushed before we continuing with the tests (effects that may be inperceivable to us).

It will now ensure that UI is stable. It is one of the few places where you need to use the `act` API.

### Act Function

In the above.

```js
// mocking Browser APIs and modules
// 💯 test the unhappy path
// http://localhost:3000/location

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Location from '../../examples/location';

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  };
});

function deferred() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };
  const { promise, resolve } = deferred();
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition));
    },
  );

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await act(async () => {
    resolve();
    await promise;
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  );
});

test('displays error message when geolocation is not supported', async () => {
  const fakeError = new Error(
    'Geolocation is not supported or permission denied',
  );
  const { promise, reject } = deferred();

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    (successCallback, errorCallback) => {
      promise.catch(() => errorCallback(fakeError));
    },
  );

  render(<Location />);

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  await act(async () => {
    reject();
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();

  expect(screen.getByRole('alert')).toHaveTextContent(fakeError.message);
});
```

### Mock the module

This is an alternative way to solve the problem through mocking.

```js
// mocking Browser APIs and modules
// 💯 mock the module
// http://localhost:3000/location

import * as React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useCurrentPosition } from 'react-use-geolocation';
import Location from '../../examples/location';

jest.mock('react-use-geolocation');

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  };

  let setReturnValue;
  function useMockCurrentPosition() {
    const state = React.useState([]);
    setReturnValue = state[1];
    return state[0];
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition);

  render(<Location />);
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

  act(() => {
    setReturnValue([fakePosition]);
  });

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  );
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  );
});
```

## Context and Custom Render Method

How to test components that use context.

From the lesson:

A common question when testing React components is what to do with React
components that use context values. If you take a step back and consider the
guiding testing philosophy of writing tests that resemble the way our software
is used, then you'll know that you want to render your component with the
provider:

```javascript
render(
  <ContextProvider>
    <ComponentToTest />
  </ContextProvider>,
);
```

The one problem with this is if you want to re-render the `<ComponentToTest />`
(for example, to give it new props and test how it responds to updated props),
then you have to include the context providers:

```javascript
const { rerender } = render(
  <ContextProvider>
    <ComponentToTest />
  </ContextProvider>,
);

rerender(
  <ContextProvider>
    <ComponentToTest newProp={true} />
  </ContextProvider>,
);
```

This is kind of annoying, so instead, you can provide a `wrapper` option and
that will ensure that rerenders are wrapped as well:

```javascript
function Wrapper({ children }) {
  return <ContextProvider>{children}</ContextProvider>;
}

const { rerender } = render(<ComponentToTest />, { wrapper: Wrapper });

rerender(<ComponentToTest newProp={true} />);
```

📜 https://testing-library.com/docs/react-testing-library/api#wrapper

This `Wrapper` could include providers for all your context providers in your
app: Router, Theme, Authentication, etc.

To take it further, you could create your own custom render method that does
this automatically:

```javascript
import { render as rtlRender } from '@testing-library/react';
// "rtl" is short for "react testing library" not "right-to-left" 😅

function render(ui, options) {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// then in your tests, you don't need to worry about context at all:
const { rerender } = render(<ComponentToTest />);

rerender(<ComponentToTest newProp={true} />);
```

From there, you can put that custom render function in your own module and use
your custom render method instead of the built-in one from React Testing
Library. Learn more about this from the docs:

📜 https://testing-library.com/docs/react-testing-library/setup

A basic example of this in practise (not the custom setup):

```js
// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../components/theme';
import EasyButton from '../../components/easy-button';

test('renders with the light styles for the light theme', () => {
  const Wrapper = ({ children }) => (
    <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  );
  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper });
  const button = screen.getByRole('button', { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `);
});
```

### Render Method

This will be a special render function to encaspsulate the duplication.

```js
// testing with context and a custom render method
// 💯 create a custom render method
// http://localhost:3000/easy-button

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../components/theme';
import EasyButton from '../../components/easy-button';

function renderWithProviders(ui, { theme = 'light', ...options } = {}) {
  const Wrapper = ({ children }) => (
    <ThemeProvider value={[theme, () => {}]}>{children}</ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}

test('renders with the light styles for the light theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>);
  const button = screen.getByRole('button', { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `);
});

test('renders with the dark styles for the dark theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>, {
    theme: 'dark',
  });
  const button = screen.getByRole('button', { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `);
});
```

### App Test Utils

> _"Now, we want to swap the @testing-library/react module with our app-test-utils. What I recommend for every application that's using React Testing Library, your test should not import @testing-library/react._ > _"Instead, you should make your own module that re-exports everything from @testing-library/react and has a render() with providers type of function. We've already got this if we go to our test directory and then test-utils. Then right in here, we are doing something that looks a little familiar."_

```js
// testing with context and a custom render method
// 💯 swap @testing-library/react with app test utils
// http://localhost:3000/easy-button

import * as React from 'react';
import { render, screen } from 'test/test-utils';
import EasyButton from '../../components/easy-button';

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>, { theme: 'light' });
  const button = screen.getByRole('button', { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `);
});

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, { theme: 'dark' });
  const button = screen.getByRole('button', { name: /easy/i });
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `);
});
```

You can setup the relative path to be absolute if you setup you `jest.config.js` file correctly to handle it under `moduleDirectories`!

Docs can be found on the [Jest website](https://jestjs.io/docs/en/configuration)

## Testing Custom Hooks

> _"Testing custom hooks is probably something you shouldn't do. You should just test those components."_

Kent considers it to be more of an implementation detail.

Going with the first option of testing the component using it, we have the following code:

```js
// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useCounter from '../../components/use-counter';

function UseCounterHookExample() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

test('exposes the count and increment/decrement functions', () => {
  render(<UseCounterHookExample />);
  const increment = screen.getByRole('button', { name: /increment/i });
  const decrement = screen.getByRole('button', { name: /decrement/i });
  const message = screen.getByText(/current count/i);

  expect(message).toHaveTextContent('Current count: 0');
  userEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');
  userEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});
```

Kent mentions that this is the type of test that he would write.

### Using a fake component

This removes the use an example component altogether. This is useful for complicated custom hooks.

```js
// testing custom hooks
// 💯 fake component
// http://localhost:3000/counter-hook

import * as React from 'react';
import { render, act } from '@testing-library/react';
import useCounter from '../../components/use-counter';

test('exposes the count and increment/decrement functions', () => {
  let result;
  function TestComponent() {
    result = useCounter();
    return null;
  }
  render(<TestComponent />);
  expect(result.count).toBe(0);
  act(() => result.increment());
  expect(result.count).toBe(1);
  act(() => result.decrement());
  expect(result.count).toBe(0);
});
```

### Using a setup function and implementing more tests

This is for abstraction of reused faking.

We need to also ues `result.current` due to referential binding. Without it, each re-render for `TestComponent` would reset the `result` variable in setup.

```js
// testing custom hooks
// 💯 setup function
// http://localhost:3000/counter-hook

import * as React from 'react';
import { render, act } from '@testing-library/react';
import useCounter from '../../components/use-counter';

function setup({ initialProps } = {}) {
  const result = {};
  function TestComponent(props) {
    result.current = useCounter(props);
    return null;
  }
  render(<TestComponent {...initialProps} />);
  return result;
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup();
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test('allows customization of the initial count', () => {
  const result = setup({ initialProps: { initialCount: 3 } });
  expect(result.current.count).toBe(3);
});

test('allows customization of the step', () => {
  const result = setup({ initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
```

### Using React-Hooks Testing Library

The final option is to avoid all the complexity and just use the React-Hooks testing library:

```js
// testing custom hooks
// 💯 using react-hooks testing library
// http://localhost:3000/counter-hook

import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '../../components/use-counter';

test('exposes the count and increment/decrement functions', () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test('allows customization of the initial count', () => {
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 3 },
  });
  expect(result.current.count).toBe(3);
});

test('allows customization of the step', () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(2);
  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test('the step can be changed', () => {
  const { result, rerender } = renderHook(useCounter, {
    initialProps: { step: 3 },
  });
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(3);
  rerender({ step: 2 });
  act(() => result.current.decrement());
  expect(result.current.count).toBe(1);
});
```
