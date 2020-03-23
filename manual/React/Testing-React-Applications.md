---
menu: React
name: Testing-React-Applications
---

# Testing React Applications

## Resources

1. [Frontend Masters course](https://frontendmasters.com/courses/testing-react/)

## Introduction

The introduction takes us through testing without the help of extenal libraries using `React` and `ReactDOM`.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../Component';

test('renders "no items" when no items are given', () => {
  const container = document.createElement('div');
  ReactDOM.render(<Component />, container);

  expect(container.textContent).toMatch('no items');
});
```

In tests, we actually look to lose fidelity in exchange for a better experience of checking the user experience.

## Jest JSDOM

By default, Jest loads JSDOM. If we don't want to run JSDOM, we can add package.json config for Jest:

```json
"jest": {
  "testEnvironment": "node" // doesn't use JSDOM
}
```

## CSS Imports

Node cannot import CSS, so we need to add more Jest configuration. Let's change our package.json config and abstract that to `jest.config.js`:

```javascript
module.exports = {
  moduleNameMapper: {
    // make a file to map it to module.exports = {}
    '\\.css$': require.resolve('./test/style-mock'),
  },
};
```

> Note: JavaScript string regex `\\.css$` === `/\.css$`

We can use `identity-module-proxy` with CSS to help with our mocked object. `yarn add identity-obj-proxy`:

```javascript
module.exports = {
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    // make a file to map it to module.exports = {}
    '\\.css$': require.resolve('./test/style-mock'),
  },
};
```

The module name mappers are useful for so much more too (GraphQL etc).

## Handling Dynamic Imports

Ensure you have the correct babel plugin added. Kent adds in a file that simulates the `localStorage` getItem/setItem etc.

```javascript
module.exports = {
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    // make a file to map it to module.exports = {}
    '\\.css$': require.resolve('./test/style-mock'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework'),
};
```

## Adding Coverage Reports

`jest --coverage` will give you a neat report on coverage.

To ensure that our coverage doesn't include supporting test files:

```javascript
module.exports = {
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    // make a file to map it to module.exports = {}
    '\\.css$': require.resolve('./test/style-mock'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework'),
  // takes glob
  collectCoverageFrom: ['**/src/**.js'],
  // enforces code coverage
  coverageThreshold: {
    global: {
      // based on lcov
      statements: 18,
      branches: 10,
      functions: 19
      lines: 18
    }
  }
};
```

## Projects Key

You can run multiple projects in parallel with the `projects` key:

```javascript
module.exports = {
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    // make a file to map it to module.exports = {}
    '\\.css$': require.resolve('./test/style-mock'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework'),
  // takes glob
  collectCoverageFrom: ['**/src/**.js'],
  // enforces code coverage
  coverageThreshold: {
    global: {
      // based on lcov
      statements: 18,
      branches: 10,
      functions: 19
      lines: 18
    }
  },
  projects: ['./client', './server']
};
```

## React Testing Library

Interesting tips:

```javascript
await wait(() => getByTestId('greeting-text'));
// snapshotting
expect(container.firstChild).toMatchSnapshot();
// great for a11y
getByLabelText('a11y title');
```

If it isn't reasonable to use specific queries, you should use `getByTestId`.

When it comes to data attributes, should we sanitised? To be honest, it will not be the bottleneck. There is also a Babel plugin `babel-plugin-react-remove-properties` where you could remove these properties from production.

## Component Testing Q&A

A nice tidbit here was using `jest.useFakeTimers()` to ensure all timers runout. In the test, `jest.runAllTimers()` is used to do just this.

## Jest Snapshots

Take a snapshot of an object at a particular time. Worth noting that `.toMatchSnapshot` does have to be used on components themselves - it is very handy for specific values etc too.

You can also use Jest's custom snapshot serializer to customise what you can do. In the config, this comes up `snapshotSerializers`.

## Cypress Setup

To use, `yarn add --dev cypress`. It installs an app and pops it in the node modules.

Then we can run `npx cypress open` and it will open up the chrome browsers and start running the tests.

## Cypress Configuration

In `cypress.json`:

```javascript
{
  "baseUrl": "http://localhost:8080/"
  "integrationFolder": "cypress/e2e"
}
```

Example then of a Cypress test:

```javascript
// e2e/calculator.js
describe('calculator', () => {
  it('can visit the app', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId('display');
  });
});
```

To use the `getByText` etc we need to install `cypress-testing-library`. Then we can add this inside of the `support` folder.

Setting it up with scripts to run in our `package.json` file:

```json
"test:e2e:dev": "npm-run-all --parallel dev cy:open",
"cy:open": "cypress open",
"test:e2e": "npm-run-all --parallel --race start cy:run",
"cy:open": "cypress run"
```

## Testing Trophy

Bottom should include `static` through typing etc, then unit and e2e should make a small part but integration should be the major part.
