# 6: Test React Components with Jest and React Testing Library

## What's changed in Test React Components with Jest and React Testing Library

This is just an update on some of the material. There are some minor changes with big impact.

First of all, there is a `kentcdodds/react-testing-library-course` repo available.

We no longer accept a return value, but use `screen` for assertions in JavaScript tests.

The other recommendation is to use `userEvent` instead of `fireEvent` - it is the recommended package to use.

`wait` is also swapped for `waitFor`. They work similar, but `waitFor` has some extras that make it nicer.

Lastly, there was recommendation to use the `createMemoryHistory`, but now Kent recommends using `window.history.pushState({}, 'Test pagpe', '/')` and then render the regular router.

The other thing is that Kent now strongly recommends MSW.

## Test React component with Jest and React Testing Library

All of the principles from this module are applicable regardless of the DOM used.

All lessons will be following the repository. It uses a unique Jest configuration that Kent configured.

## Render a React component for testing

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import FirstTest from './path/to/FirstTest'

describe('<FirstTest />', () => {
    test('renders a number input with label "Favorite Number"', () => {
        const div = document.createElement('div')
        ReactDOM.render(<FirstTest />, div)
        expect(div.querySelector('input').textContent).toBe('Favorite number')
    })
})
```

## Using Jest DOM for improved assertions

We can use Jest DOM for some custom test matchers.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import FirstTest from './path/to/FirstTest'

expect.extend({ toHaveAttribute })

describe('<FirstTest />', () => {
    test('renders a number input with label "Favorite Number"', () => {
        const div = document.createElement('div')
        ReactDOM.render(<FirstTest />, div)
        expect(div.querySelector('input')).toHaveTextContent('Favorite number')
    })
})
```

## Use DOM Testing Library to write more maintainable React tests

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import FirstTest from './path/to/FirstTest'
import { queries, getQueriesForElement } from '@testing-library/dom'

describe('<FirstTest />', () => {
    test('renders a number input with label "Favorite Number"', () => {
        const div = document.createElement('div')
        ReactDOM.render(<FirstTest />, div)

        const { getByLabelText } = getQueriesForElement(div)
        const input = getByLabelText(/favourite number/i)
        // This is a redundant assertion
        expect(input).toHaveTextContent('Favorite number')
    })
})
```

## Use React Testing Library to render and test React components

This section effectively shows us the nice-to-haves we would want from this:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import FirstTest from './path/to/FirstTest'
import { queries, getQueriesForElement } from '@testing-library/dom'

function render(ui) {
    const container = document.createElement('div')
    ReactDOM.render(ui, container)
    const queries = getQueriesForElement(container)

    return { ...queries, container }
}

describe('<FirstTest />', () => {
    test('renders a number input with label "Favorite Number"', () => {
        const { getByLabelText } = render(<FirstTest />)

        const input = getByLabelText(/favourite number/i)
        // This is a redundant assertion
        expect(input).toHaveTextContent('Favorite number')
    })
})
```

This is effectively what is being done by the testing library.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import FirstTest from './path/to/FirstTest'
import { render } from '@testing-library/react'

describe('<FirstTest />', () => {
    test('renders a number input with label "Favorite Number"', () => {
        const { getByLabelText } = render(<FirstTest />)

        const input = getByLabelText(/favourite number/i)
        // This is a redundant assertion
        expect(input).toHaveTextContent('Favorite number')
    })
})
```

In general, instead of abstracting the `getByLabelText`, we would now use `screen` to do so.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import FirstTest from './path/to/FirstTest'
import { render, screen } from '@testing-library/react'

describe('<FirstTest />', () => {
    test('renders a number input with label "Favorite Number"', () => {
        render(<FirstTest />)

        const input = screen.getByLabelText(/favourite number/i)
        // This is a redundant assertion
        expect(input).toHaveTextContent('Favorite number')
    })
})
```
