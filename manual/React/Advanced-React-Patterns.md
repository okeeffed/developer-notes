---
menu: React
name: Advanced React Patterns
---

# Advanced React Patterns

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/advanced-react-patterns/)
2. [Course Material on GitHub](https://github.com/kentcdodds/advanced-react-patterns-v2/blob/frontend-masters/README.md)
3. [Code Sandbox for course](https://codesandbox.io/s/github/kentcdodds/advanced-react-patterns-v2/tree/frontend-masters)
4. [Downshift Library](https://github.com/downshift-js/downshift)
5. [React's New Context API - Kent Dodds](https://kentcdodds.com/blog/reacts-new-context-api/)

## tl;dr

Patterns to know from course:

1. Compound Components
2. Component Injection
3. Render Prop
4. Render Getters
5. State Initializers
6. State Reducers
7. Control Props
8. Provider Pattern

## Building the Basic Toggle

This is used to just set things up for the advanced stuff, but it was worth noting the code that we are using the `setState` function passer to ensure we get the latest state guarantee (which is not guaranteed the other way):

```javascript
import React from 'react';
// 🐨 uncomment this import to get the switch component.
// It takes an `onClick` and an `on` prop
import { Switch } from '../switch';

class Toggle extends React.Component {
  state = { on: false };
  toggle = () => {
    // IMPORTANT: This is the example of passing a function for set state then
    // using a callback to ensure the re-render is fired straight away
    // @see https://reactjs.org/docs/react-component.html#setstate
    this.setState(
      currentState => {
        return { on: !currentState.on };
      },
      () => {
        this.props.onToggle(this.state.on);
      },
    );
  };
  // 🐨 this toggle component is going to need to have state for `on`
  //
  // You'll also want a method to handle when the switch is clicked
  // which will update the `on` state and call the `onToggle` prop
  // 💰 this.props.onToggle(this.state.on)
  render() {
    // 🐨 here you'll want to return the switch with the `on` and `onClick` props
    return <Switch onClick={this.toggle} on={this.state.on} />;
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
  return <Toggle onToggle={onToggle} />;
}
Usage.title = 'Build Toggle';

export { Toggle, Usage as default };
```

One question that came up - why are we using `this.props.onToggle`. Kent's answer:

> A common pattern in React is that each component manages its own state but lets the parent know what is happening when it changes.

## Basic Compound Components

In the second exercise, we have `Toggle` as a compound component:

```javascript
// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    {/* Compound component here! */}
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
```

Why compound components? It helps ease of API - the example shown was a potential message etc. Instead, what we can do is have children like `<Toggle.On>` that share implicit state with the parent.

A real life example in HTML of a compound component:

```html
<select>
  <option></option>
</select>
```

The example implementation for the `Toggle` example is the following:

```javascript
class Toggle extends React.Component {
  // these are the important tidbits to get <Toggle.On>, <Toggle.Off> etc
  // these could also be declared as functions outside the class, but
  // here it is mentioned to be a preference to show their linkage
  static On = ({ on, children }) => (on ? children : null);
  static Off = ({ on, children }) => (on ? null : children);
  static Button = ({ on, toggle, ...props }) => (
    <Switch on={on} onClick={toggle} {...props} />
  );

  state = { on: false };

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    );

  render() {
    // Note: This MUST be React.Children.map because this.props.children.map
    // will not work in React if only using one child
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle,
      }),
    );
  }
}
```

Kent also has an equivalent example of this for Hooks on his [blog post](https://kentcdodds.com/blog/compound-components-with-react-hooks):

```javascript
import React from 'react';
// this switch implements a checkbox input and is not relevant for this example
import { Switch } from '../switch';
const ToggleContext = React.createContext();
function useEffectAfterMount(cb, dependencies) {
  const justMounted = React.useRef(true);
  React.useEffect(() => {
    if (!justMounted.current) {
      return cb();
    }
    justMounted.current = false;
  }, dependencies);
}
function Toggle(props) {
  const [on, setOn] = React.useState(false);
  const toggle = React.useCallback(() => setOn(oldOn => !oldOn), []);
  useEffectAfterMount(() => {
    props.onToggle(on);
  }, [on]);
  const value = React.useMemo(() => ({ on, toggle }), [on]);
  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  );
}
function useToggleContext() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`,
    );
  }
  return context;
}
function On({ children }) {
  const { on } = useToggleContext();
  return on ? children : null;
}
function Off({ children }) {
  const { on } = useToggleContext();
  return on ? null : children;
}
function Button(props) {
  const { on, toggle } = useToggleContext();
  return <Switch on={on} onClick={toggle} {...props} />;
}
// for convenience, but totally not required...
Toggle.On = On;
Toggle.Off = Off;
Toggle.Button = Button;
```

## Flexible Compound Components

To enable us to accept children that are not static properties of the class, we need to make some adjustments to the code from the section above (reminder: there are also some notes in the code above):

```javascript
const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
});

class Toggle extends React.Component {
  static On = ({ children }) => (
    <ToggleContext.Consumer>
      {({ on }) => (on ? children : null)}
    </ToggleContext.Consumer>
  );
  static Off = ({ children }) => (
    <ToggleContext.Consumer>
      {({ on }) => (on ? null : children)}
    </ToggleContext.Consumer>
  );
  static Button = props => (
    <ToggleContext.Consumer>
      {({ on, toggle }) => <Switch on={on} onClick={toggle} {...props} />}
    </ToggleContext.Consumer>
  );
  // 💰 The reason we had to move `toggle` above `state` is because
  // in our `state` initialization we're _using_ `this.toggle`. So
  // if `this.toggle` is not defined before state is initialized, then
  // `state.toggle` will be undefined.
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    );
  state = { on: false, toggle: this.toggle };
  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    );
  }
}
```

This code makes use of the `consumer` API. There is also a blog by Kent talking about issues that deals with issues of multiple `<React.Consumer>` parents adding up. There is also a few composer libraries to help with this. You can see more [on his blog](https://kentcdodds.com/blog/reacts-new-context-api/).

## Render Props Pattern

When a method does use `this`, then it is an indicator that it doesn't need to be on the class.

This enables us to edge closer to being a `pure` function.

This makes the rendering ownership on the "user" and not the component implementation.

The idea is to have a component say "hey, I'll be in charge of state and you be in charge of rendering".

```javascript
// only in charge of its own state
// the "parent user" is in charge of
// rendering
class Toggle extends React.Component {
  state = { on: false };
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    );
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

function Usage({ onToggle = (...args) => console.log('onToggle', ...args) }) {
  return (
    <Toggle onToggle={onToggle}>
      {/* Rendering here is done inline */}
      {({ on, toggle }) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  );
}
```

If you don't like the verbosity of the render prop, you can always abstract is to another component.

The render prop method allows total flexibility of the UI but still keep the child in charge of the logic.

There is also a side topic brought up here called `Component Injection` that will use `React.createElement` with the children and and pass the props that will enable access to lifecycle methods.

> Kent says he prefers `Render Prop` pattern over `Component Injection` because it is more powerful and the `createElement` creates another layer in the React tree. What really seals the deal as well the fact that going `props => <ToggleChild {...props}>` gives the same benefits of component injection.

So when to use `Render Prop` vs `Compound Components`? With compound components, you don't see the state that is passed between `Toggle` and all of its children. All the state and handlers are implicit. If people don't care what those values are ie an accordion, there will be some state shared with the parent for which index is open and the implicit state of the child known if it is open.

The user of that "component" doesn't need to know which accordion is open per se. Adding that initial layer of complexity is unnecessary and is why `Compound Components` is preferred there.

The last question - is there a difference between passing children as a prop vs within the tags? They are functionally equivalent. Kent uses `children` over render because the context API uses that.

## Prop Getters

What does `Prop Getters` solve? Imagine the following where we want to add an `onClick` function:

```javascript
// un-oh, we could be overriding the togglerProps onClick func!
<button
  aria-label="custom-button"
  {...togglerProps}
  onClick={() => console.log('Doing something')}
>
  {on ? 'on' : 'off'}
</button>
```

We now have the issue of accidentally overriding the `toggleProps onClick` (or vice versa if we switch the order!)

With prop getters, we can solve this problem:

```javascript
// prop getters

import React from 'react';
import { Switch } from '../switch';

// this is important for the prop getter
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  state = { on: false };
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    );
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    'aria-expanded': this.state.on,
    onClick: callAll(onClick, this.toggle),
    ...props,
  });
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      getTogglerProps: this.getTogglerProps,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
  onButtonClick = () => console.log('onButtonClick'),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({ on, getTogglerProps }) => (
        <div>
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <button
            {/* Note here we are spreading an object */}
            {...getTogglerProps({
              'aria-label': 'custom-button',
              onClick: onButtonClick,
              id: 'custom-button-id',
            })}
          >
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  );
}
Usage.title = 'Prop Getters';

export { Toggle, Usage as default };
```

## State Initializers

In general we want to be able to reset back to an initial state and start things up in an initial state. The idea is straight forward.

```javascript
// State Initializers

import React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  // The setting of initial state
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
  };
  // This helps to communicate what we're trying to accomplish
  initialState = { on: this.props.initialOn };
  state = this.initialState;
  // The important part for reset: this reset uses the initialState object
  reset = () =>
    this.setState(this.initialState, () => this.props.onReset(this.state.on));
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    );
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, this.toggle),
    'aria-expanded': this.state.on,
    ...props,
  });
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

function Usage({
  initialOn = false,
  onToggle = (...args) => console.log('onToggle', ...args),
  onReset = (...args) => console.log('onReset', ...args),
}) {
  return (
    <Toggle initialOn={initialOn} onToggle={onToggle} onReset={onReset}>
      {({ getTogglerProps, on, reset }) => (
        <div>
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  );
}
Usage.title = 'State Initializers';
```

## State Reducer

This is a common pattern in Reason React. This helps people to control how the state is managed.

You have to think more critically about how you component manages state as this now becomes an important part of the API. It breaks encapsulation, but allows a huge amount of user flexibility.

```javascript
// state reducer

import React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state, changes) => changes,
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;
  // this is a helper to pass state up to parents
  internalSetState(changes, callback) {
    this.setState(state => {
      // handle function setState call
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes;

      // apply state reducer
      const reducedChanges =
        this.props.stateReducer(state, changesObject) || {};

      // return null if there are no changes to be made
      // (to avoid an unecessary rerender)
      return Object.keys(reducedChanges).length ? reducedChanges : null;
    }, callback);
  }
  reset = () =>
    this.internalSetState(this.initialState, () =>
      this.props.onReset(this.state.on),
    );
  toggle = () =>
    // now uses internalSetState updater
    this.internalSetState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    );
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, this.toggle),
    'aria-expanded': this.state.on,
    ...props,
  });
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log('onToggle', ...args),
    onReset: (...args) => console.log('onReset', ...args),
  };
  initialState = { timesClicked: 0 };
  state = this.initialState;
  handleToggle = (...args) => {
    this.setState(({ timesClicked }) => ({
      timesClicked: timesClicked + 1,
    }));
    this.props.onToggle(...args);
  };
  handleReset = (...args) => {
    this.setState(this.initialState);
    this.props.onReset(...args);
  };
  // This enables us to control the child state.
  // Note that this breaks encapsulation.
  toggleStateReducer = (state, changes) => {
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }
    return changes;
  };
  render() {
    const { timesClicked } = this.state;
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
      >
        {toggle => (
          <div>
            <Switch
              {...toggle.getTogglerProps({
                on: toggle.on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">Click count: {timesClicked}</div>
            ) : null}
            <button onClick={toggle.reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}
Usage.title = 'State Reducers';

export { Toggle, Usage as default };
```

An alternative suggested in the questions was to just rename `setInternalState` to still be `setState` and just call the `super.setState`:

```javascript
// Reset omitted for brevity, but this is a replacement
// in the above code for `setInternalState`

// this is a helper to pass state up to parents
setState(changes, callback) {
 super.setState(state => {
   // handle function setState call
   const changesObject =
     typeof changes === 'function' ? changes(state) : changes;

   // apply state reducer
   const reducedChanges =
     this.props.stateReducer(state, changesObject) || {};

   // return null if there are no changes to be made
   // (to avoid an unecessary rerender)
   return Object.keys(reducedChanges).length ? reducedChanges : null;
 }, callback);
}
```

Kent does suggest that is could be confusing to see `setState` and have it not operate as expected.

Another alternative Kent suggest is to enable it to become a map:

```javascript
// this is a helper to pass state up to parents
internalSetState(changes, callback) {
 this.setState(state => {
   return [changes]
   // handle function setState call
   .map(c => typeof c === 'function' ? c(state) : c)
   // apply state reducer
   .map(c => this.props.stateReducer(state, c) || {})
   // return null if there are no changes to be made
   // (to avoid an unecessary rerender)
  .map(c => Object.keys(c).length ? c : null)[0];
 }, callback);
}
```

We can then also empower the parent to force toggles:

```javascript
// This will enable the parent to control an
// ability to force changes
toggleStateReducer = (state, changes) => {
  if (changes.type === 'forced') {
    return changes;
  }
  if (this.state.timesClicked >= 4) {
    return { ...changes, on: false };
  }
  return changes;
};
```

This is the full example of a state reducer with types that can brute force from the parent:

```javascript
// state reducer with types

import React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state, changes) => changes,
  };
  // 💰 any time I use a string as an identifier for a type,
  // I prefer to give it a variable name. That way folks who
  // want to reference the type can do so using variable which
  // will help mitigate the problems of indirection.
  static stateChangeTypes = {
    reset: '__toggle_reset__',
    toggle: '__toggle_toggle__',
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;
  internalSetState(changes, callback) {
    this.setState(state => {
      // handle function setState call
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes;

      // apply state reducer
      const reducedChanges =
        this.props.stateReducer(state, changesObject) || {};

      // remove the type so it's not set into state
      const { type: ignoredType, ...onlyChanges } = reducedChanges;

      // return null if there are no changes to be made
      return Object.keys(onlyChanges).length ? onlyChanges : null;
    }, callback);
  }

  reset = () =>
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.state.on),
    );
  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) =>
    this.internalSetState(
      ({ on }) => ({ type, on: !on }),
      () => this.props.onToggle(this.state.on),
    );
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, () => this.toggle()),
    'aria-expanded': this.state.on,
    ...props,
  });
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log('onToggle', ...args),
    onReset: (...args) => console.log('onReset', ...args),
  };
  initialState = { timesClicked: 0 };
  state = this.initialState;
  handleToggle = (...args) => {
    this.setState(({ timesClicked }) => ({
      timesClicked: timesClicked + 1,
    }));
    this.props.onToggle(...args);
  };
  handleReset = (...args) => {
    this.setState(this.initialState);
    this.props.onReset(...args);
  };
  toggleStateReducer = (state, changes) => {
    if (changes.type === 'forced') {
      return changes;
    }
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false };
    }
    return changes;
  };
  render() {
    const { timesClicked } = this.state;
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
        ref={this.props.toggleRef}
      >
        {({ on, toggle, reset, getTogglerProps }) => (
          <div>
            <Switch
              {...getTogglerProps({
                on: on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({ type: 'forced' })}>
                  Force Toggle
                </button>
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">Click count: {timesClicked}</div>
            ) : null}
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}
Usage.title = 'State Reducers (with change types)';

export { Toggle, Usage as default };
```

## Control Props Primer

Here we are trying to get two completely different components to synchronous their state.

The general idea is that the parent can control when to set things on for the children (here the children being two Switches).

This pattern is the same that is used for controlled form components. Think of the parent form controlling what shows in a child input.

The idea is that a child will pass the local state change up, then child components will be rerendered by the change in the parent.

```javascript
// control props primer

import React from 'react';
import { Switch } from '../switch';

class Toggle extends React.Component {
  state = { on: false };
  // this is important to determine if the component is controlled
  isOnControlled() {
    return this.props.on !== undefined;
  }
  getState() {
    return {
      on: this.isOnControlled() ? this.props.on : this.state.on,
    };
  }
  toggle = () => {
    if (this.isOnControlled()) {
      this.props.onToggle(!this.getState().on);
    } else {
      this.setState(
        ({ on }) => ({ on: !on }),
        () => {
          this.props.onToggle(this.getState().on);
        },
      );
    }
  };
  render() {
    const { on } = this.getState();
    return <Switch on={on} onClick={this.toggle} />;
  }
}

class Usage extends React.Component {
  state = { bothOn: false };
  handleToggle = on => {
    this.setState({ bothOn: on });
  };
  render() {
    const { bothOn } = this.state;
    const { toggle1Ref, toggle2Ref } = this.props;
    return (
      <div>
        <Toggle on={bothOn} onToggle={this.handleToggle} ref={toggle1Ref} />
        <Toggle on={bothOn} onToggle={this.handleToggle} ref={toggle2Ref} />
      </div>
    );
  }
}
Usage.title = 'Control Props (primer)';

export { Toggle, Usage as default };
```

A question about "why not use `componentWillReceiveProps` or an non-deprecated equivalent?" - the main reason is to prevent having two sources of truth.

## Control Props

Using this now with a state reducer. You can use this without one, but a state reducer is an easier way to help with control props. Having them together gives users more choice on how they want to use their component.

```javascript
// Control Props + with a state reducer

import React from 'react';
import { Switch } from '../switch';

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  // Now that a user can use this component effectively without
  // an `onToggle` prop (they can use `onStateChange` instead)
  // 🐨 let's provide a default for `onToggle` and `onStateChange`
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    onToggle: () => {},
    onStateChange: () => {},
    stateReducer: (state, changes) => changes,
  };
  static stateChangeTypes = {
    reset: '__toggle_reset__',
    toggle: '__toggle_toggle__',
  };
  initialState = { on: this.props.initialOn };
  state = this.initialState;

  // 🐨 let's add an `isControlled` method that accepts a state key
  // (string) and returns true if the prop is controlled
  // 💰 this.props[prop] !== undefined
  isControlled(prop) {
    return this.props[prop] !== undefined;
  }

  // 🐨 We'll also need a `getState` method here that returns a
  // state object that has state from both internal state (`this.state`)
  // as well as external state (`this.props`).
  getState(state = this.state) {
    return Object.entries(state).reduce((combinedState, [key, value]) => {
      if (this.isControlled(key)) {
        combinedState[key] = this.props[key];
      } else {
        combinedState[key] = value;
      }
      return combinedState;
    }, {});
  }

  // 💰 You might consider accepting state as an argument that defaults
  // to `this.state`... You'll use that later on...
  internalSetState(changes, callback = () => {}) {
    let allChanges;
    this.setState(
      state => {
        // Now that our state can actually come from two sources,
        // the `state` we receive from this function is actually only one
        // side of the story.
        // 🐨 Call your `this.getState` function with `state` so we can
        // get a `combinedState` object which we'll use to perform our
        // operations on here.
        const combinedState = this.getState(state);
        // handle function setState call
        const changesObject =
          typeof changes === 'function' ? changes(combinedState) : changes;

        // apply state reducer
        allChanges =
          this.props.stateReducer(combinedState, changesObject) || {};

        // remove the type so it's not set into state
        const { type: ignoredType, ...onlyChanges } = allChanges;

        const nonControlledChanges = Object.keys(combinedState).reduce(
          (newChanges, stateKey) => {
            if (!this.isControlled(stateKey)) {
              newChanges[stateKey] = onlyChanges.hasOwnProperty(stateKey)
                ? onlyChanges[stateKey]
                : combinedState[stateKey];
            }
            return newChanges;
          },
          {},
        );

        // return null if there are no changes to be made
        return Object.keys(nonControlledChanges || {}).length
          ? nonControlledChanges
          : null;
      },
      () => {
        // call onStateChange with all the changes (including the type)
        this.props.onStateChange(allChanges, this.getStateAndHelpers());
        callback();
      },
    );
  }
  reset = () =>
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.getState().on),
    );
  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) =>
    this.internalSetState(
      ({ on }) => ({ type, on: !on }),
      () => this.props.onToggle(this.getState().on),
    );
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, () => this.toggle()),
    'aria-expanded': this.getState().on,
    ...props,
  });
  getStateAndHelpers() {
    return {
      ...this.getState(),
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log('onToggle', ...args),
    onReset: (...args) => console.log('onReset', ...args),
  };
  initialState = { timesClicked: 0, toggleOn: false };
  state = this.initialState;
  handleStateChange = changes => {
    if (changes.type === 'forced') {
      this.setState({ toggleOn: changes.on }, () =>
        this.props.onToggle(this.state.toggleOn),
      );
    } else if (changes.type === Toggle.stateChangeTypes.reset) {
      this.setState(this.initialState, () => {
        this.props.onReset(this.state.toggleOn);
      });
    } else if (changes.type === Toggle.stateChangeTypes.toggle) {
      this.setState(
        ({ timesClicked }) => ({
          timesClicked: timesClicked + 1,
          toggleOn: timesClicked >= 4 ? false : changes.on,
        }),
        () => {
          this.props.onToggle(this.state.toggleOn);
        },
      );
    }
  };
  render() {
    const { timesClicked, toggleOn } = this.state;
    return (
      <Toggle
        on={toggleOn}
        onStateChange={this.handleStateChange}
        ref={this.props.toggleRef}
      >
        {({ on, toggle, reset, getTogglerProps }) => (
          <div>
            <Switch
              {...getTogglerProps({
                on: on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({ type: 'forced' })}>
                  Force Toggle
                </button>
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">Click count: {timesClicked}</div>
            ) : null}
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}
Usage.title = 'Control Props with State Reducers';

export { Toggle, Usage as default };
```

## Provider Pattern

This pattern enables us to provide state without prop drilling.

```javascript
// Provider Pattern

import React from 'react';
import { Switch } from '../switch';

const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
  reset: () => {},
  getTogglerProps: () => ({}),
});

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    onToggle: () => {},
    onStateChange: () => {},
    stateReducer: (state, changes) => changes,
  };
  static stateChangeTypes = {
    reset: '__toggle_reset__',
    toggle: '__toggle_toggle__',
  };
  static Consumer = ToggleContext.Consumer;

  reset = () =>
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.getState().on),
    );
  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) =>
    this.internalSetState(
      ({ on }) => ({ type, on: !on }),
      () => this.props.onToggle(this.getState().on),
    );
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, () => this.toggle()),
    'aria-expanded': this.getState().on,
    ...props,
  });
  initialState = {
    on: this.props.initialOn,
    toggle: this.toggle,
    reset: this.reset,
    getTogglerProps: this.getTogglerProps,
  };
  state = this.initialState;
  isControlled(prop) {
    return this.props[prop] !== undefined;
  }
  getState(state = this.state) {
    return Object.entries(state).reduce((combinedState, [key, value]) => {
      if (this.isControlled(key)) {
        combinedState[key] = this.props[key];
      } else {
        combinedState[key] = value;
      }
      return combinedState;
    }, {});
  }
  internalSetState(changes, callback = () => {}) {
    let allChanges;
    this.setState(
      state => {
        const combinedState = this.getState(state);
        // handle function setState call
        const changesObject =
          typeof changes === 'function' ? changes(combinedState) : changes;

        // apply state reducer
        allChanges =
          this.props.stateReducer(combinedState, changesObject) || {};

        // remove the type so it's not set into state
        const { type: ignoredType, ...onlyChanges } = allChanges;

        const nonControlledChanges = Object.keys(combinedState).reduce(
          (newChanges, stateKey) => {
            if (!this.isControlled(stateKey)) {
              newChanges[stateKey] = onlyChanges.hasOwnProperty(stateKey)
                ? onlyChanges[stateKey]
                : combinedState[stateKey];
            }
            return newChanges;
          },
          {},
        );

        // return null if there are no changes to be made
        return Object.keys(nonControlledChanges || {}).length
          ? nonControlledChanges
          : null;
      },
      () => {
        // call onStateChange with all the changes (including the type)
        this.props.onStateChange(allChanges, this.state);
        callback();
      },
    );
  }
  render() {
    // here's all you need to do for your solution
    // return (
    //   <ToggleContext.Provider value={this.state}>
    //     {this.props.children}
    //   </ToggleContext.Provider>
    // )
    // here's the bonus material solution that preserves the old API:
    const { children } = this.props;
    const ui = typeof children === 'function' ? children(this.state) : children;
    return (
      <ToggleContext.Provider value={this.state}>{ui}</ToggleContext.Provider>
    );
  }
}

function Nav() {
  return (
    <Toggle.Consumer>
      {toggle => (
        <nav>
          <ul>
            <li>
              <a href="index.html">{toggle.on ? '🏡' : 'Home'}</a>
            </li>
            <li>
              <a href="/about/">{toggle.on ? '❓' : 'About'}</a>
            </li>
            <li>
              <a href="/blog/">{toggle.on ? '📖' : 'Blog'}</a>
            </li>
          </ul>
        </nav>
      )}
    </Toggle.Consumer>
  );
}

function NavSwitch() {
  return (
    <div className="nav-switch">
      <div>
        <Toggle.Consumer>
          {toggle => (toggle.on ? '🦄' : 'Enable Emoji')}
        </Toggle.Consumer>
      </div>
      <Toggle.Consumer>
        {toggle => (
          <Switch
            {...toggle.getTogglerProps({
              on: toggle.on,
            })}
          />
        )}
      </Toggle.Consumer>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <Nav />
      <NavSwitch />
    </div>
  );
}

function Subtitle() {
  return (
    <Toggle.Consumer>
      {toggle => (toggle.on ? '👩‍🏫 👉 🕶' : 'Teachers are awesome')}
    </Toggle.Consumer>
  );
}

function Title() {
  return (
    <div>
      <h1>
        <Toggle.Consumer>
          {toggle => `Who is ${toggle.on ? '🕶❓' : 'awesome?'}`}
        </Toggle.Consumer>
      </h1>
      <Subtitle />
    </div>
  );
}

function Article() {
  return (
    <div>
      <Toggle.Consumer>
        {toggle =>
          [
            'Once, I was in',
            toggle.on ? '🏫‍' : 'school',
            'when I',
            toggle.on ? '🤔' : 'realized',
            'something...',
          ].join(' ')
        }
      </Toggle.Consumer>
      <hr />
      <Toggle.Consumer>
        {toggle =>
          [
            'Without',
            toggle.on ? '👩‍🏫' : 'teachers',
            `I wouldn't know anything so`,
            toggle.on ? '🙏' : 'thanks',
            toggle.on ? '👩‍🏫❗️' : 'teachers!',
          ].join(' ')
        }
      </Toggle.Consumer>
    </div>
  );
}

function Post() {
  return (
    <div>
      <Title />
      <Article />
    </div>
  );
}

function Usage() {
  return (
    <Toggle>
      <div className="friends">
        <Header />
        <Post />
      </div>
    </Toggle>
  );
}
Usage.title = 'Provider Pattern';

export { Toggle, Usage as default };
```

## Higher Order Components

Getting sick of `<Toggle.Consumer>` is an example where HOCs can come in handy.

HOCs give you back a component, while `Render Props` gives you more flexibility. This example uses a HOC over a Render Prop component. Kent says he cannot think of an example of using a HOC without Render Prop.

This example uses the `hoist-non-react-statics` library that you can see [here](https://github.com/mridgway/hoist-non-react-statics).

We also want to make sure that we are forwarding on the refs so the HOC is unobservable to users.

```javascript
// Higher Order Components

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Switch } from '../switch';

const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
  reset: () => {},
  getTogglerProps: () => ({}),
});

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    onToggle: () => {},
    onStateChange: () => {},
    stateReducer: (state, changes) => changes,
  };
  static stateChangeTypes = {
    reset: '__toggle_reset__',
    toggle: '__toggle_toggle__',
  };
  static Consumer = ToggleContext.Consumer;

  reset = () =>
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.getState().on),
    );
  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) =>
    this.internalSetState(
      ({ on }) => ({ type, on: !on }),
      () => this.props.onToggle(this.getState().on),
    );
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, () => this.toggle()),
    'aria-expanded': this.getState().on,
    ...props,
  });
  initialState = {
    on: this.props.initialOn,
    toggle: this.toggle,
    reset: this.reset,
    getTogglerProps: this.getTogglerProps,
  };
  state = this.initialState;
  isControlled(prop) {
    return this.props[prop] !== undefined;
  }
  getState(state = this.state) {
    return Object.entries(state).reduce((combinedState, [key, value]) => {
      if (this.isControlled(key)) {
        combinedState[key] = this.props[key];
      } else {
        combinedState[key] = value;
      }
      return combinedState;
    }, {});
  }
  internalSetState(changes, callback = () => {}) {
    let allChanges;
    this.setState(
      state => {
        const combinedState = this.getState(state);
        // handle function setState call
        const changesObject =
          typeof changes === 'function' ? changes(combinedState) : changes;

        // apply state reducer
        allChanges =
          this.props.stateReducer(combinedState, changesObject) || {};

        // remove the type so it's not set into state
        const { type: ignoredType, ...onlyChanges } = allChanges;

        const nonControlledChanges = Object.keys(combinedState).reduce(
          (newChanges, stateKey) => {
            if (!this.isControlled(stateKey)) {
              newChanges[stateKey] = onlyChanges.hasOwnProperty(stateKey)
                ? onlyChanges[stateKey]
                : combinedState[stateKey];
            }
            return newChanges;
          },
          {},
        );

        // return null if there are no changes to be made
        return Object.keys(nonControlledChanges || {}).length
          ? nonControlledChanges
          : null;
      },
      () => {
        // call onStateChange with all the changes (including the type)
        this.props.onStateChange(allChanges, this.state);
        callback();
      },
    );
  }
  render() {
    const { children } = this.props;
    const ui = typeof children === 'function' ? children(this.state) : children;
    return (
      <ToggleContext.Provider value={this.state}>{ui}</ToggleContext.Provider>
    );
  }
}

function withToggle(Component) {
  function Wrapper(props, ref) {
    return (
      <Toggle.Consumer>
        {toggleContext => (
          <Component {...props} toggle={toggleContext} ref={ref} />
        )}
      </Toggle.Consumer>
    );
  }
  Wrapper.displayName = `withToggle(${Component.displayName ||
    Component.name})`;
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component);
}

// this Subtitle component could be as simple as:
// const Subtitle = withToggle(({toggle: {on}}) => (
//   <span>{on ? '👩‍🏫 👉 🕶' : 'Teachers are awesome'}</span>
// ))
// But for the purposes of this workshop, we've made it a little more complex
// just to ensure you're HOC handles common issues with HOCs
const Subtitle = withToggle(
  class extends React.Component {
    static displayName = 'Subtitle';
    static emoji = '👩‍🏫 👉 🕶';
    static text = 'Teachers are awesome';
    instanceProperty = true;
    render() {
      return (
        <span>{this.props.toggle.on ? Subtitle.emoji : Subtitle.text}</span>
      );
    }
  },
);

function Nav() {
  return (
    <Toggle.Consumer>
      {toggle => (
        <nav>
          <ul>
            <li>
              <a href="index.html">{toggle.on ? '🏡' : 'Home'}</a>
            </li>
            <li>
              <a href="/about/">{toggle.on ? '❓' : 'About'}</a>
            </li>
            <li>
              <a href="/blog/">{toggle.on ? '📖' : 'Blog'}</a>
            </li>
          </ul>
        </nav>
      )}
    </Toggle.Consumer>
  );
}

function NavSwitch() {
  return (
    <div className="nav-switch">
      <div>
        <Toggle.Consumer>
          {toggle => (toggle.on ? '🦄' : 'Enable Emoji')}
        </Toggle.Consumer>
      </div>
      <Toggle.Consumer>
        {toggle => (
          <Switch
            {...toggle.getTogglerProps({
              on: toggle.on,
            })}
          />
        )}
      </Toggle.Consumer>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <Nav />
      <NavSwitch />
    </div>
  );
}

// This is part of our contrived example so we can test things properly
// to make sure your HOC handles common issues
export class Debug extends React.Component {
  childInstance = React.createRef();
  render() {
    return React.cloneElement(this.props.children, {
      ref: this.childInstance,
    });
  }
}

function Title() {
  return (
    <div>
      <h1>
        <Toggle.Consumer>
          {toggle => `Who is ${toggle.on ? '🕶❓' : 'awesome?'}`}
        </Toggle.Consumer>
      </h1>
      <Debug child="subtitle">
        <Subtitle />
      </Debug>
    </div>
  );
}

function Article() {
  return (
    <div>
      <Toggle.Consumer>
        {toggle =>
          [
            'Once, I was in',
            toggle.on ? '🏫‍' : 'school',
            'when I',
            toggle.on ? '🤔' : 'realized',
            'something...',
          ].join(' ')
        }
      </Toggle.Consumer>
      <hr />
      <Toggle.Consumer>
        {toggle =>
          [
            'Without',
            toggle.on ? '👩‍🏫' : 'teachers',
            `I wouldn't know anything so`,
            toggle.on ? '🙏' : 'thanks',
            toggle.on ? '👩‍🏫❗️' : 'teachers!',
          ].join(' ')
        }
      </Toggle.Consumer>
    </div>
  );
}

function Post() {
  return (
    <div>
      <Title />
      <Article />
    </div>
  );
}

function Usage() {
  return (
    <Toggle>
      <div className="friends">
        <Header />
        <Post />
      </div>
    </Toggle>
  );
}
Usage.title = 'Higher Order Components';

export { Toggle, Usage as default };
```

## Rendex

Rendex is a bonus where we use both React's context API and Redux together.

```javascript
// Rendux

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import * as redux from 'redux';
import { Switch } from '../switch';

const RenduxContext = React.createContext({});

class Rendux extends React.Component {
  static Consumer = RenduxContext.Consumer;
  static defaultProps = {
    initialState: {},
    reducer: state => state,
  };
  initialReduxState = this.props.initialState;
  rootReducer = (state, action) => {
    if (action.type === '__RENDUX_RESET__') {
      return this.initialReduxState;
    }
    return this.props.reducer(state, action);
  };
  store = redux.createStore(this.rootReducer, this.initialReduxState);
  reset = () => {
    this.store.dispatch({
      type: '__RENDUX_RESET__',
    });
  };
  componentDidMount() {
    this.unsubscribe = this.store.subscribe(() =>
      this.setState({
        state: this.store.getState(),
      }),
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  initialState = {
    state: this.props.initialState,
    dispatch: this.store.dispatch,
    reset: this.reset,
  };
  state = this.initialState;
  render() {
    const { children } = this.props;
    const ui = typeof children === 'function' ? children(this.state) : children;
    return (
      <RenduxContext.Provider value={this.state}>{ui}</RenduxContext.Provider>
    );
  }
}

function withRendux(Component) {
  class Wrapper extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      return (
        <Rendux.Consumer>
          {rendux => <Component {...rest} rendux={rendux} ref={forwardedRef} />}
        </Rendux.Consumer>
      );
    }
  }
  Wrapper.displayName = `withRendux(${Component.displayName ||
    Component.name})`;
  const forwardRef = React.forwardRef((props, ref) => (
    <Wrapper {...props} forwardedRef={ref} />
  ));
  return hoistNonReactStatics(forwardRef, Component);
}

function MyInput() {
  return (
    <Rendux.Consumer>
      {rendux => (
        <input
          value={rendux.state.inputValue || (rendux.state.on ? 'on' : 'off')}
          placeholder="Type 'off' or 'on'"
          onChange={event => {
            if (event.target.value === 'on') {
              rendux.dispatch({
                type: 'toggle',
                value: true,
              });
            } else if (event.target.value === 'off') {
              rendux.dispatch({
                type: 'toggle',
                value: false,
              });
            }
            rendux.dispatch({
              type: 'input_change',
              value: event.target.value,
            });
          }}
          onBlur={event => {
            const { value } = event.target;
            if (value !== 'on' && value !== 'off') {
              rendux.dispatch({
                type: 'input_change',
                value: rendux.state.on ? 'on' : 'off',
              });
            }
          }}
        />
      )}
    </Rendux.Consumer>
  );
}

function MySwitch() {
  return (
    <Rendux.Consumer>
      {rendux => (
        <div
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Switch
            on={rendux.state.on}
            onClick={() => {
              rendux.dispatch({
                type: 'toggle',
                value: !rendux.state.on,
              });

              if (rendux.state.inputValue) {
                rendux.dispatch({
                  type: 'input_change',
                  value: !rendux.state.on ? 'on' : 'off',
                });
              }
            }}
          />
        </div>
      )}
    </Rendux.Consumer>
  );
}

const StatePrinter = withRendux(function StatePrinter({ rendux }) {
  return (
    <div style={{ textAlign: 'left' }}>
      state:
      <pre data-testid="printed-state">
        {JSON.stringify(rendux.state, null, 2)}
      </pre>
    </div>
  );
});

function Usage() {
  return (
    <Rendux
      initialState={{ on: true }}
      reducer={(state, action) => {
        switch (action.type) {
          case 'toggle':
            return {
              ...state,
              on: action.value,
            };
          case 'input_change':
            return {
              ...state,
              inputValue: action.value,
            };
          default:
            return state;
        }
      }}
    >
      {({ reset }) => (
        <React.Fragment>
          <MyInput />
          <MySwitch />
          <button onClick={reset}>reset</button>
          <StatePrinter />
        </React.Fragment>
      )}
    </Rendux>
  );
}
Usage.title = 'Bonus: Rendux';

export { Rendux, Usage, Usage as default };
```
