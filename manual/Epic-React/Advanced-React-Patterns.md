---
menu: Epic React
name: Advanced React Patterns
---

# Advanced React Patterns

## Context Module Functions

This pattern does not "have a name" but something observed in a number of codebases including React DevTools source code.

The context of this is that as opposed to creating dispatch helper closure functions within a component and passing them down or having `useCallback` hep with creating help closure functions within custom hooks, we instead just created isolated, importable helper functions that take a dispatch argument which can be imported and used:

```js
// before
import { useCounter } from 'context/counter';

function Counter() {
  const [state, dispatch] = useCounter();

  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });

  return (
    <div>
      <div>Current Count: {state.count}</div>
      <button onClick={increment}>-</button>
      <button onClick={decrement}>+</button>
    </div>
  );
}

// after
// in `context/counter`
const increment = dispatch => dispatch({ type: 'increment' });
const decrement = dispatch => dispatch({ type: 'decrement' });
// in module
import { useCounter, increment, decrement } from 'context/counter';
function Counter() {
  const [state, dispatch] = useCounter();
  return (
    <div>
      <div>Current Count: {state.count}</div>
      <button onClick={() => decrement(dispatch)}>-</button>
      <button onClick={() => increment(dispatch)}>+</button>
    </div>
  );
}
```

The exercise code:

```js
// Context Module Functions
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';
import { dequal } from 'dequal';

// ./context/user-context.js

import * as userClient from '../user-client';
import { useAuth } from '../auth-context';

const UserContext = React.createContext();
UserContext.displayName = 'UserContext';

function userReducer(state, action) {
  switch (action.type) {
    case 'start update': {
      return {
        ...state,
        user: { ...state.user, ...action.updates },
        status: 'pending',
        storedUser: state.user,
      };
    }
    case 'finish update': {
      return {
        ...state,
        user: action.updatedUser,
        status: 'resolved',
        storedUser: null,
        error: null,
      };
    }
    case 'fail update': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
        user: state.storedUser,
        storedUser: null,
      };
    }
    case 'reset': {
      return {
        ...state,
        status: null,
        error: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = React.useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  });
  const value = [state, dispatch];
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

// added context module function
function updateUser(dispatch, user, updates) {
  // 🐨 move the following logic to the `updateUser` function you create above
  dispatch({ type: 'start update', updates });
  userClient
    .updateUser(user, updates)
    .then(
      updatedUser => dispatch({ type: 'finish update', updatedUser }),
      error => dispatch({ type: 'fail update', error }),
    );
}

// export {UserProvider, useUser}

// src/screens/user-profile.js
// import {UserProvider, useUser} from './context/user-context'
function UserSettings() {
  const [{ user, status, error }, userDispatch] = useUser();

  const isPending = status === 'pending';
  const isRejected = status === 'rejected';

  const [formState, setFormState] = React.useState(user);

  const isChanged = !dequal(user, formState);

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateUser(userDispatch, user, formState);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          disabled
          readOnly
          value={formState.username}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          value={formState.tagline}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }} htmlFor="bio">
          Biography
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setFormState(user);
            userDispatch({ type: 'reset' });
          }}
          disabled={!isChanged || isPending}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={(!isChanged && !isRejected) || isPending}
        >
          {isPending
            ? '...'
            : isRejected
            ? '✖ Try again'
            : isChanged
            ? 'Submit'
            : '✔'}
        </button>
        {isRejected ? (
          <pre style={{ color: 'red' }}>{error.message}</pre>
        ) : null}
      </div>
    </form>
  );
}

function UserDataDisplay() {
  const [{ user }] = useUser();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

function App() {
  return (
    <div
      style={{
        minHeight: 350,
        width: 300,
        backgroundColor: '#ddd',
        borderRadius: 4,
        padding: 10,
      }}
    >
      <UserProvider>
        <UserSettings />
        <UserDataDisplay />
      </UserProvider>
    </div>
  );
}

export default App;
```

## Compound Components

We want to build components with implicit state between them.

The [ReachUI Tooltip](https://github.com/reach/reach-ui/tree/develop/packages/tooltip) and [ReachUI Tabs](https://reach.tech/tabs/) are the nominated examples of compound components in action.

```js
// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';
import { Switch } from '../switch';

function Toggle(props) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(props.children, child => {
    // used to handle normal HTML elements
    if (typeof child.type === 'string') {
      return child;
    }

    return React.cloneElement(child, {
      toggle,
      on,
    });
  });
}

// 🐨 Flesh out each of these components

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({ on, children }) => on && children;

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({ on, children }) => !on && children;

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

export default App;
```

You can also create an `allow list` of sorts if you want to only allow your children to be given the implicit state:

```js
const allowList = [ToggleOn, ToggleOff, ToggleButton];

function Toggle(props) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(props.children, child => {
    // used to handle normal HTML elements
    if (allowList.includes(typeof child.type)) {
      return React.cloneElement(child, {
        toggle,
        on,
      });
    }

    // can still return child
    return child;
  });
}
```

## Flexible Compound Components

We can make flexible compound components by making use of React Context.

```js
// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react';
import { Switch } from '../switch';

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

const ToggleContext = React.createContext();

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = React.useContext(ToggleContext)`
function useToggleContext() {
  const context = React.useContext(ToggleContext);
  // note: you could just return the context creation directly by this
  // is used for context safety.
  if (!context) {
    throw new Error('ToggleContext not provided');
  }

  return context;
}

// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
function ToggleOn({ children }) {
  const { on } = useToggleContext();
  return on ? children : null;
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({ children }) {
  const { on } = useToggleContext();
  return on ? null : children;
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton(props) {
  const { on, toggle } = useToggleContext();
  return <Switch on={on} onClick={toggle} {...props} />;
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  );
}

export default App;
```

## Prop Collections and Getters

Switching gears to things that can be used with custom hooks.

A real-world example of this is the [Reach UI Accordion](https://reach.tech/accordion/).

These are patterns created by Kent C Dodds.

```js
// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';
import { Switch } from '../switch';

const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  const togglerProps = { 'aria-pressed': on, onClick: toggle };

  return { on, toggle, togglerProps };
}

function App() {
  const { on, togglerProps } = useToggle();
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}

export default App;
```

### prop getters variants

This variant is used more often by Kent.

```js
// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';
import { Switch } from '../switch';

const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  const togglerProps = { 'aria-pressed': on, onClick: toggle };

  const getTogglerProps = ({ onClick, ...props } = {}) => ({
    'aria-pressed': on,
    onClick: () => {
      onClick?.();
      toggle();
    },
    ...props,
  });

  return { on, toggle, togglerProps, getTogglerProps };
}

function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch
        {...getTogglerProps({
          on,
        })}
      />
      <hr />
      <button
        {...getTogglerProps({
          on,
          'aria-label': 'custom-button',
          onClick: () => console.log('overridden'),
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}

export default App;
```

We can improve how the `onClick` is called in the prop getter by creating our own `callAll` function:

```js
// Helper function to call every function if defined
function callAll(...fns) {
  return (...args) => fns.forEach(fn => fn?.(...args));
}

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  const togglerProps = { 'aria-pressed': on, onClick: toggle };

  const getTogglerProps = ({ onClick, ...props } = {}) => ({
    'aria-pressed': on,
    onClick: callAll(onClick, toggle),
    ...props,
  });

  return { on, toggle, togglerProps, getTogglerProps };
}
```

## State Reducer

A great implementation of inversion of control.

In this exercise, we actually invert the control of the reducer in the custom `useToggle` hook to take a reducer that is defined as a prop. This gives control back to the component to implement its version of the reducer any way that it wants.

```js
// State Reducer
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args));

function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case 'toggle': {
      return { on: !state.on };
    }
    case 'reset': {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

// 🐨 add a new option called `reducer` that defaults to `toggleReducer`
function useToggle({ initialOn = false, reducer = toggleReducer } = {}) {
  const { current: initialState } = React.useRef({ on: initialOn });
  // 🐨 instead of passing `toggleReducer` here, pass the `reducer` that's
  // provided as an option
  // ... and that's it! Don't forget to check the 💯 extra credit!
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { on } = state;

  const toggle = () => dispatch({ type: 'toggle' });
  const reset = () => dispatch({ type: 'reset', initialState });

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}

function App() {
  const [timesClicked, setTimesClicked] = React.useState(0);
  const clickedTooMuch = timesClicked >= 4;

  function toggleStateReducer(state, action) {
    switch (action.type) {
      case 'toggle': {
        if (clickedTooMuch) {
          return { on: state.on };
        }
        return { on: !state.on };
      }
      case 'reset': {
        return { on: false };
      }
      default: {
        throw new Error(`Unsupported type: ${action.type}`);
      }
    }
  }

  const { on, getTogglerProps, getResetterProps } = useToggle({
    reducer: toggleStateReducer,
  });

  return (
    <div>
      <Switch
        {...getTogglerProps({
          disabled: clickedTooMuch,
          on: on,
          onClick: () => setTimesClicked(count => count + 1),
        })}
      />
      {clickedTooMuch ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      ) : null}
      <button {...getResetterProps({ onClick: () => setTimesClicked(0) })}>
        Reset
      </button>
    </div>
  );
}

export default App;
```

### Default state reducer

How to modify how the state is handled ONLY in certain use cases. Here, we just need to override the cases we want with an if statement and pass the rest to the original reducer:

```js
function toggleStateReducer(state, action) {
  if (action.type === 'toggle' && clickedTooMuch) {
    return { on: state.on };
  }

  return toggleReducer(state, action);
}
```

## Control Props
