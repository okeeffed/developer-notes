# 2: JavaScript Mocking Fundamentals

## Intro to JavaScript Mocking Fundamentals

Tasking Jest Mock functionality and looking at how to implement it in user land (like Node.js).

The examples denoted here would be doing things like mocking out modules. It is about clarifying the process behind it.

## Overriding Object Properties to Mock with Monkey-patching in JavaScript

In `src/no-framework/monkey-patching.js`:

```js
const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

// Mocking it out
const original = utils.getWinner;
utils.getWinner = (p1, p2) => p1;

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");

// Cleaning up the monkey patch
utils.getWinner = original;
```

By mocking out the `getWinner` function, we have made our test deterministic.

## Ensure Functions are Called Correctly With JavaScript Mocks

```js
const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
  const original = utils.getWinner;
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
  expect(winner).toBe("Kent C. Dodds");
  expect(utils.getWinner).toHaveBeenCalled(2);
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    1,
    "Kent C. Dodds",
    "Ken Wheeler"
  );
  expect(utils.getWinner).toHaveBeenNthCalledWith(
    2,
    "Kent C. Dodds",
    "Ken Wheeler"
  );

  // cleanup
  utils.getWinner = original;
});
```

If you inspect the mock, you can see a whole bunch of properties on it that can be used.

For example, there is a `calls` property that we could use to change the assertions:

```js
const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
  const original = utils.getWinner;
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
  expect(winner).toBe("Kent C. Dodds");
  expect(utils.getWinner.mock.calls).toEqual([
    ["Kent C. Dodds", "Ken Wheeler"],
    ["Kent C. Dodds", "Ken Wheeler"],
  ]);

  // cleanup
  utils.getWinner = original;
});
```

What happens if we wanted to create our own `jest.fn` function?

```js
const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

function fn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = { calls: [] };
  return mockFn;
}

// Mocking it out
const original = utils.getWinner;
utils.getWinner = (p1, p2) => p1;

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Kent C. Dodds", "Ken Wheeler"],
  ["Kent C. Dodds", "Ken Wheeler"],
]);

// Cleaning up the monkey patch
utils.getWinner = original;
```

## Restore the Original Implementation of a Mock JavaScript Function with jest.spyOn

Keeping track of and cleaning up our function can be annoying. We can use `jest.spyOn` to simplify this.

```js
const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("returns winner", () => {
  jest.spyOn(utils, "getWinner");
  utils.getWinner.mockImplementation((p1, p2) => p1);

  const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
  expect(winner).toBe("Kent C. Dodds");
  expect(utils.getWinner.mock.calls).toEqual([
    ["Kent C. Dodds", "Ken Wheeler"],
    ["Kent C. Dodds", "Ken Wheeler"],
  ]);

  // cleanup
  utils.getWinner.mockRestore();
});
```

In our own implementation:

```js
const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = { calls: [] };
  mockFn.mockImplementation = (newImpl) => (impl = newImpl);
  return mockFn;
}

function spyOn(obj, prop) {
  const originalValue = obj[prop];
  obj[prop] = fn();
  obj[prop].mockRestore = () => (obj[prop] = originalValue);
}

// Mocking it out
spyOn(utils, "getWinner");
utils.getWinner.mockImplementation((p1, p2) => p1);

const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
assert.strictEqual(winner, "Kent C. Dodds");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Kent C. Dodds", "Ken Wheeler"],
  ["Kent C. Dodds", "Ken Wheeler"],
]);

// Cleaning up the monkey patch
utils.getWinner.mockRestore();
```
