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

> 'Sometimes, people want to be able to manage the internal state of our component from the outside. The state reducer allows them to manage what state changes are made when a state change happens, but sometimes people may want to make state changes themselves. We can allow them to do this with a feature called "Control Props."'

```js
// Control Props
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args));

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
};

function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case actionTypes.toggle: {
      return { on: !state.on };
    }
    case actionTypes.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  // 🐨 add an `onChange` prop.
  onChange,
  // 🐨 add an `on` option here
  // 💰 you can alias it to `controlledOn` to avoid "variable shadowing."
  on: controlledOn,
} = {}) {
  const { current: initialState } = React.useRef({ on: initialOn });
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // 🐨 determine whether on is controlled and assign that to `onIsControlled`
  // 💰 `controlledOn != null`
  const onIsControlled = controlledOn != null;

  // 🐨 Replace the next line with assigning `on` to `controlledOn` if
  // `onIsControlled`, otherwise, it should be `state.on`.
  const on = onIsControlled ? controlledOn : state.on;

  // We want to call `onChange` any time we need to make a state change, but we
  // only want to call `dispatch` if `!onIsControlled` (otherwise we could get
  // unnecessary renders).
  // 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
  // right here. This will:
  // 1. accept an action
  // 2. if onIsControlled is false, call dispatch with that action
  // 3. Then call `onChange` with our "suggested changes" and the action.
  const dispatchWithOnChange = action => {
    if (!onIsControlled) {
      dispatch(action);
    }

    // 🦉 "Suggested changes" refers to: the changes we would make if we were
    // managing the state ourselves. This is similar to how a controlled <input />
    // `onChange` callback works. When your handler is called, you get an event
    // which has information about the value input that _would_ be set to if that
    // state were managed internally.
    // So how do we determine our suggested changes? What code do we have to
    // calculate the changes based on the `action` we have here? That's right!
    // The reducer! So if we pass it the current state and the action, then it
    // should return these "suggested changes!"
    //
    // 💰 Sorry if Olivia the Owl is cryptic. Here's what you need to do for that onChange call:
    // `onChange(reducer({...state, on}, action), action)`
    // 💰 Also note that user's don't *have* to pass an `onChange` prop (it's not required)
    // so keep that in mind when you call it! How could you avoid calling it if it's not passed?
    callAll(onChange(reducer({ ...state, on }, action), action));
  };

  // make these call `dispatchWithOnChange` instead
  const toggle = () => dispatchWithOnChange({ type: actionTypes.toggle });
  const reset = () =>
    dispatchWithOnChange({ type: actionTypes.reset, initialState });

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

function Toggle({ on: controlledOn, onChange }) {
  const { on, getTogglerProps } = useToggle({ on: controlledOn, onChange });
  const props = getTogglerProps({ on });
  return <Switch {...props} />;
}

function App() {
  const [bothOn, setBothOn] = React.useState(false);
  const [timesClicked, setTimesClicked] = React.useState(0);

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return;
    }
    setBothOn(state.on);
    setTimesClicked(c => c + 1);
  }

  function handleResetClick() {
    setBothOn(false);
    setTimesClicked(0);
  }

  return (
    <div>
      <div>
        <Toggle on={bothOn} onChange={handleToggleChange} />
        <Toggle on={bothOn} onChange={handleToggleChange} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle
          onChange={(...args) =>
            console.info('Uncontrolled Toggle onChange', ...args)
          }
        />
      </div>
    </div>
  );
}

export default App;
// we're adding the Toggle export for tests
export { Toggle };
```

### Adding a Read Only warning

In this example, we use `console.error` to give a warning when a prop is not used the way we expect:

```js
// Control Props
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args));

const actionTypes = {
  toggle: 'toggle',
  reset: 'reset',
};

function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case actionTypes.toggle: {
      return { on: !state.on };
    }
    case actionTypes.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

function useToggle({
  initialOn = false,
  reducer = toggleReducer,
  // 🐨 add an `onChange` prop.
  onChange,
  // 🐨 add an `on` option here
  // 💰 you can alias it to `controlledOn` to avoid "variable shadowing."
  on: controlledOn,
  readOnly = false,
} = {}) {
  const { current: initialState } = React.useRef({ on: initialOn });
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // 🐨 determine whether on is controlled and assign that to `onIsControlled`
  // 💰 `controlledOn != null`
  const onIsControlled = controlledOn != null;

  // 🐨 Replace the next line with assigning `on` to `controlledOn` if
  // `onIsControlled`, otherwise, it should be `state.on`.
  const on = onIsControlled ? controlledOn : state.on;

  const hasOnChange = Boolean(onChange);
  React.useEffect(() => {
    if (!hasOnChange && onIsControlled) {
      if (!readOnly) {
        console.error('Prop on provided without onChange');
      }
    }
  }, [hasOnChange, onIsControlled, readOnly]);

  // We want to call `onChange` any time we need to make a state change, but we
  // only want to call `dispatch` if `!onIsControlled` (otherwise we could get
  // unnecessary renders).
  // 🐨 To simplify things a bit, let's make a `dispatchWithOnChange` function
  // right here. This will:
  // 1. accept an action
  // 2. if onIsControlled is false, call dispatch with that action
  // 3. Then call `onChange` with our "suggested changes" and the action.
  const dispatchWithOnChange = action => {
    if (!onIsControlled) {
      dispatch(action);
    }

    // 🦉 "Suggested changes" refers to: the changes we would make if we were
    // managing the state ourselves. This is similar to how a controlled <input />
    // `onChange` callback works. When your handler is called, you get an event
    // which has information about the value input that _would_ be set to if that
    // state were managed internally.
    // So how do we determine our suggested changes? What code do we have to
    // calculate the changes based on the `action` we have here? That's right!
    // The reducer! So if we pass it the current state and the action, then it
    // should return these "suggested changes!"
    //
    // 💰 Sorry if Olivia the Owl is cryptic. Here's what you need to do for that onChange call:
    // `onChange(reducer({...state, on}, action), action)`
    // 💰 Also note that user's don't *have* to pass an `onChange` prop (it's not required)
    // so keep that in mind when you call it! How could you avoid calling it if it's not passed?
    onChange?.(reducer({ ...state, on }, action), action);
  };

  // make these call `dispatchWithOnChange` instead
  const toggle = () => dispatchWithOnChange({ type: actionTypes.toggle });
  const reset = () =>
    dispatchWithOnChange({ type: actionTypes.reset, initialState });

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

function Toggle({ on: controlledOn, onChange, readOnly }) {
  const { on, getTogglerProps } = useToggle({
    on: controlledOn,
    onChange,
    readOnly,
  });
  const props = getTogglerProps({ on });
  return <Switch {...props} />;
}

function App() {
  const [bothOn, setBothOn] = React.useState(false);
  const [timesClicked, setTimesClicked] = React.useState(0);

  function handleToggleChange(state, action) {
    if (action.type === actionTypes.toggle && timesClicked > 4) {
      return;
    }
    setBothOn(state.on);
    setTimesClicked(c => c + 1);
  }

  function handleResetClick() {
    setBothOn(false);
    setTimesClicked(0);
  }

  return (
    <div>
      <div>
        {/* Error acknowledged given readOnly */}
        <Toggle on={bothOn} readOnly={true} />
        {/* Causes error */}
        <Toggle on={bothOn} />
      </div>
      {timesClicked > 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : (
        <div data-testid="click-count">Click count: {timesClicked}</div>
      )}
      <button onClick={handleResetClick}>Reset</button>
      <hr />
      <div>
        <div>Uncontrolled Toggle:</div>
        <Toggle />
      </div>
    </div>
  );
}

export default App;
// we're adding the Toggle export for tests
export { Toggle };
```

Note: there is actually a package `warning` that React uses to give the warning.

### Adding a Controlled State warning

For this, we do the same as above to warn when we go from `uncontrolled` to `controlled`.

In this case it was done comparing the `onIsControlled` value with a refered to `onIsControlled`.

```js
const { current: onWasControlled } = React.useRef(onIsControlled);
React.useEffect(() => {
  warning(
    !(onIsControlled && !onWasControlled),
    'changing from uncontrolled state to controlled state',
  );
  warning(
    !(onIsControlled && !onWasControlled),
    'changing from controlled state to uncontrolled state',
  );
});
```

### Extract warning into a custom hook

This is basically abstracting all the logic to a custom hook as we would normally do and call it with `useFooBarWarning()`

### Not warning in production

We use the `NODE_ENV` here.

```js
if (process.env.NODE_ENV === 'production') {
  // do something
}
```
