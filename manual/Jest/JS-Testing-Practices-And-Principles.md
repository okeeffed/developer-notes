---
menu: Jest
name: JS-Testing-Practices-And-Principles
---

# JS-Testing-Practices-And-Principles

## Resources

1. [Online Course](https://frontendmasters.com/courses/testing-practices-principles/jest-testing-framework/)
2. [Jest CLI docs](https://jestjs.io/docs/en/cli)
3. [Jest-in-case library](https://github.com/atlassian/jest-in-case)
4. [Why Pure Modules](https://kentcdodds.com/blog/pure-modules/)

## Jest Intro

### CLI

Running `jest -o` will look for related files since last commit. When running, you can use shortcuts to run certain tests. Read the watch usage for more info.

### Commands

- `toBe` will compare memory allocation
- `toEqual` will deep equal object values etc
- `toMatchObject` checks if all expected object matches what is in the actual object
- `toHaveBeenCalled` is used to help with mock functons
- `toHaveBeenCalledTimes` is mock called how many times
- `toHaveBeenCalledWith` to check what argument is passed

With `toEqual`, `toMatchObject` and `toHaveBeenCalledWith` you can match a schema. Eg:

```javascript
test('example', () => {
  const bday = {
    day: 22,
    month: 4,
    year: 1992,
    meta: { display: '22nd April 1992' },
  };

  const schema = {
    day: expect.any(Number),
    month: expect.any(Number),
    year: expect.any(Number),
    meta: {
      display: expect.stringContaining('1992'),
    },
    // there's also expect.arrayContaining or expect.objectContaining
  };
  expect(birthday).toEqual(schema);
});
```

This is useful for generated data.

## Test Factories and Colocating Tests Q&A

Creating a test factory is a good approach to testing a pure function.

```javascript
describe('isPasswordAllowed', () => {
  const allowedPasswords = ['allowed'];
  const disallowedPasswords = ['disallowed'];

  allowedPasswords.forEach(pwd => {
    test(`"${pwd}" should be allowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(true);
    });
  });

  disallowedPasswords.forEach(pwd => {
    test(`"${pwd}" should be allowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(false);
    });
  });
});
```

There was a reference here to Atlassian's `jest-in-case` library that you can see [here](https://github.com/atlassian/jest-in-case).

"Colocating" your tests essentially is the idea of putting your test in the same folder as where the source code is. Its a more relevant position for updates etc.

## Code coverage

Istanbul is a standard coverage tool for JS testing.

The code coverage report helps you identify lines of code that haven't been covered during testing.

## Monkey Patch a mock

Monkey patching is updating 3rd party software to fit our needs - in this case, changing a func.

```javascript
import thumbWar from '../thumb-war';
import * as utils from '../utils';

test('returns winner', () => {
  utils.getWinner = (p1, p2) => p2;

  const winner = thumbWar('Ken Wheeler', 'Kent C Dodds');
  expect(winner).toBe('Kent C Dodds');
});
```

## Assert calling a mock

```javascript
import thumbWar from '../thumb-war';
import * as utils from '../utils';

test('returns winner', () => {
  const originalGetWinner = utils.getWinner;
  utils.getWinner = (...args) => {
    util.getWinner.mock.calls.push(args);
    return args[1];
  };
  utils.getWinner.mock = { calls: [] };

  const winner = thumbWar('Ken Wheeler', 'Kent C Dodds');
  expect(winner).toBe('Kent C Dodds');
  expect(utils.getWinner.mock.calls).toEqual([
    ['Ken Wheeler', 'Kent C Dodds'],
    ['Ken Wheeler', 'Kent C Dodds'],
  ]);

  utils.getWinner = originalGetWinner;
});
```

## Jest spyOn

When calling `spyOn`, it just wraps the function and "spies" on it with a mock function to allow it to keep running.

Once you do that, we can mock the implementation to enable the test to run our fake one:

```javascript
import thumbWar from '../thumb-war';
import * as utils from '../utils';

test('returns winner', () => {
  jest.spyOn(utils, 'getWinner');
  utils.getWinner.mockImplementation((p1, p2) => p2);

  const winner = thumbWar('Ken Wheeler', 'Kent C Dodds');
  expect(winner).toBe('Kent C Dodds');
  expect(utils.getWinner.mock.calls).toEqual([
    ['Ken Wheeler', 'Kent C Dodds'],
    ['Ken Wheeler', 'Kent C Dodds'],
  ]);

  util.getWinner.mockRestore();
});
```

## Jest Mock

Jest Mock prevents us running into the namespace issues that `spyOn` can give us which stops us from busting ES6 modules.

Jest will swap out whatever is in that file with a mock.

The callback allows you to mock specific functions.

```javascript
import thumbWar from '../thumb-war';
import * as utils from '../utils';

jest.mock('../utils', () => {
  // to mock the actual file
  const actualUtils = require.requireActual('../utils');

  return {
    // if we want to keep base utils
    ...actualUtils,
    getWinner: jest.fn((p1, p2) => p2),
  };
});

beforeEach(() => {
  // ensure mocks are cleared before each test
  utils.getWinner.mockClear();
});

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C Dodds');
  expect(winner).toBe('Kent C Dodds');
  expect(utils.getWinner.mock.calls).toEqual([
    ['Ken Wheeler', 'Kent C Dodds'],
    ['Ken Wheeler', 'Kent C Dodds'],
  ]);

  util.getWinner.mockRestore();
});
```

There is a convention by Jest to store mocks in a `__mocks__` folder which is also colocated with the file to mock.

If we don't provide a mock, it will go to the `__mocks__` folder to check if there is an implementation there.

```javascript
import thumbWar from '../thumb-war';
import * as utils from '../utils';

// no implementation - go check '../__mocks__/utils'
jest.mock('../utils');

beforeEach(() => {
  // ensure mocks are cleared before each test
  utils.getWinner.mockClear();
});

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'Kent C Dodds');
  expect(winner).toBe('Kent C Dodds');
  expect(utils.getWinner.mock.calls).toEqual([
    ['Ken Wheeler', 'Kent C Dodds'],
    ['Ken Wheeler', 'Kent C Dodds'],
  ]);

  util.getWinner.mockRestore();
});
```

To mock modules, you put a mock at the root dir (example has `src/__mocks__`) and Jest will pick those up automatically.

```javascript
// checks for `src/__mocks__/axios.js`
import axiosMock from 'axios';

// if we don't want to mock module
jest.unmock('axios');
```

> An interesting point here on pure modules is that Jest has a `resetModules` method that you can run after each test if there is impurity (ie variables declared at the top-level of the file).

## Using a `__mocks__` directory

```javascript
import * as usersController from '../users';
import { db, initDb } from 'db-utils';

beforeEach(() => {
  // an example just initialising the db here
  initDb();
});

test('getUsers returns all users in the database', async () => {
  const req = {};
  const res = {
    json: jest.fn(),
  };

  await usersController.getUsers(req, res);
  expect(res.json).toHaveBeenCalledTimes(1);
  console.log(res.json.mock.calls[0]); // passes back array called in func [{users:[]}]

  // for testing
  const actualUsers = await db.getUsers();
  expect(users).toEqual(actualUsers.map(safeUser));
});
```

The example that Kent C Dodds users here is a util to generate random users.

## Test Factories

> Something to note throughout the tests is that Kent uses a `setup` top-level function to get the data required during test runtime instead of initialising at the top-level.

```javascript
function setup() {
  const req = {};
  const res = {};
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this;
      }.bind(res),
    ),
    json: jest.fn(
      function status() {
        return this;
      }.bind(res),
    ),
    send: jest.fn(
      function status() {
        return this;
      }.bind(res),
    ),
  });
  return { req, res };
}
```

> Doing cleanup ahead of tests can be useful instead of after. This helps inspect the database at the time of failure to help debug.

## Conclusion

Kent mentions that you should use the `testing trophy`. He mentions that generally he focuses mainly on integration test over unit and e2e as they are more expensive time and money wise.
