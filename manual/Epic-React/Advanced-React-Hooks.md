---
menu: Epic React
name: Advanced React Hooks
---

# Advanced React Hooks

## useReducer

In this first exercise, we replace `React.useState` with `React.useReducer` in a way that does not adhere to "switch" conventions to show how a reducer works.

```js
// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

// state is prevVale, action is newValue
function countReducer(state, action) {
  return action;
}

function Counter({ initialCount = 0, step = 1 }) {
  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount.
  const [count, setCount] = React.useReducer(countReducer, initialCount);

  // 💰 you can write the countReducer function so you don't have to make any
  // changes to the next two lines of code! Remember:
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount
  const increment = () => setCount(count + step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
```

### Accept Step as action

We can update that `newCount` value to be updated through the `countReducer`:

```js
// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

function countReducer(prevCount, step) {
  return prevCount + step;
}

function Counter({ initialCount = 0, step = 1 }) {
  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount.
  const [count, changeCount] = React.useReducer(countReducer, initialCount);

  // 💰 you can write the countReducer function so you don't have to make any
  // changes to the next two lines of code! Remember:
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to changeCount
  const increment = () => changeCount(step);
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
```

### setState with Object

We can update the `useReducer` to now demonstate the changes using an object.

```js
// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

const countReducer = (state, action) => {
  return {
    ...state,
    ...action,
  };
};
function Counter({ initialCount = 0, step = 1 }) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;

  const increment = () => setState({ count: state.count + step });
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
```

### Object or Function

Instead of merging as a function, we can turn `setState` into a function that acceps the state:

```js
// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

const countReducer = (state, action) => {
  return action(state);
};
function Counter({ initialCount = 0, step = 1 }) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;

  const increment = () =>
    setState(currentState => ({ count: currentState.count + step }));
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
```

### Traditional Dispatch Object

As an initial conversion to use `[state, dispatch]`, I came up with the following adjustment to use actions:

```js
// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';

const actions = {
  UPDATE_COUNT: 'UPDATE_COUNT',
};

function countReducer(state, action) {
  switch (action.type) {
    case actions.UPDATE_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
}

function Counter({ initialCount = 0, step = 1 }) {
  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount.
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  });

  console.log(state);

  // 💰 you can write the countReducer function so you don't have to make any
  // changes to the next two lines of code! Remember:
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount
  const increment = () =>
    dispatch({
      type: actions.UPDATE_COUNT,
      payload: state.count + step,
    });
  return <button onClick={increment}>{state.count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
```

### Lazy initialization

```js
function init(initialStateFromProps) {
  return {
    pokemon: null,
    loading: false,
    error: null,
  };
}

// ...

const [state, dispatch] = React.useReducer(reducer, props.initialState, init);
```

So, if you pass a third function argument to useReducer, it passes the second argument to that function and uses the return value for the initial state.

This could be useful if our init function read into `localStorage` or something else that we wouldn’t want happening every re-render.

### TypeScript defs for useReducer API

```ts
type Dispatch<A> = (value: A) => void;
type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never;
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<
  any,
  infer A
>
  ? A
  : never;

function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined,
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
```

## useCallback: custom hooks

The problem `useCallback` solves:

```js
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem('count', count),
  [count], // <-- yup! That's a dependency list!
);
React.useEffect(() => {
  updateLocalStorage();
}, [updateLocalStorage]);
```

`useMemo` helps memoisation for expensive calculations and to prevent re-renders but is at few times needed. See [this article](https://kentcdodds.com/blog/usememo-and-usecallback) for more information.

## useCallback

> "We're going to make a custom hook. Often, you'll find that when you're making custom hooks, you have to use memoization techniques like useCallback."

The ultimate solution looks like so:

```js
// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon';

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(asyncCallback, initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  React.useEffect(() => {
    // 💰 this first early-exit bit is a little tricky, so let me give you a hint:
    const promise = asyncCallback();
    if (!promise) {
      return;
    }

    dispatch({ type: 'pending' });
    promise.then(
      data => {
        dispatch({ type: 'resolved', data });
      },
      error => {
        dispatch({ type: 'rejected', error });
      },
    );

    // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
  }, [asyncCallback]);

  return state;
}

function PokemonInfo({ pokemonName }) {
  const callback = React.useCallback(() => {
    if (!pokemonName) {
      return;
    }
    return fetchPokemon(pokemonName);
  }, [pokemonName]);
  // 🐨 move both the useReducer and useEffect hooks to a custom hook called useAsync
  // here's how you use it:
  const state = useAsync(callback, {
    status: pokemonName ? 'pending' : 'idle',
  });

  // 🐨 this will change from "pokemon" to "data"
  const { data: pokemon, status, error } = state;

  if (status === 'idle' || !pokemonName) {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }

  throw new Error('This should be impossible');
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
}

export default AppWithUnmountCheckbox;
```

### Return memoized run function

> "Personally, I'm not a huge fan of APIs that require you to memoize the thing you pass into them because I don't think the pit of success is very wide here. It's really easy to just be like, "Oh, sweet. I'm going to use this useAsync thing. I'm going to pass this function." That's pretty easy and boom, we've just sub-optimized ourselves."

This meant ensure that use callback was called in the async func and passing the promise to the returned `run` function.

```js
// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon';

// 🐨 this is going to be our generic asyncReducer
function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync(initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const run = React.useCallback(promise => {
    dispatch({ type: 'pending' });
    promise.then(
      data => {
        dispatch({ type: 'resolved', data });
      },
      error => {
        dispatch({ type: 'rejected', error });
      },
    );
  }, []);

  return { ...state, run };
}

function PokemonInfo({ pokemonName }) {
  const { data: pokemon, status, error, run } = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    run(fetchPokemon(pokemonName));
  }, [pokemonName, run]);

  if (status === 'idle' || !pokemonName) {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }

  throw new Error('This should be impossible');
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
}

export default AppWithUnmountCheckbox;
```

### Safe dispatch

We are dealing with ensuring that if we make a promise and the user navigates, we do not attempt to call dispatch.

We also use `useLayoutEffect` instead of `useEffect` to ensure we call the hook once the component has mounted and not when the screen has been painted.

```js
// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon';

// 🐨 this is going to be our generic asyncReducer
function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Here is our new function
function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false);
  React.useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch],
  );
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const run = React.useCallback(
    promise => {
      dispatch({ type: 'pending' });
      promise.then(
        data => {
          dispatch({ type: 'resolved', data });
        },
        error => {
          dispatch({ type: 'rejected', error });
        },
      );
    },
    [dispatch],
  );

  return { ...state, run };
}

function PokemonInfo({ pokemonName }) {
  const { data: pokemon, status, error, run } = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    run(fetchPokemon(pokemonName));
  }, [pokemonName, run]);

  if (status === 'idle' || !pokemonName) {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }

  throw new Error('This should be impossible');
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName('');
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
}

export default AppWithUnmountCheckbox;
```

## useContext

> "Context is an API that allows you to share state between different components in your React tree.
> " It's typically something that is better suited for libraries than for your application code.
> "Typically, it's better to reach first for composition as a solution to this problem."

In this example, we create context, then create a provider for that context (to abstract the `[Context].Provider`) and pass that to the components to render:

```js
// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react';

// 🐨 create your CountContext here with React.createContext
const CountContext = React.createContext();
// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider
function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];

  return <CountContext.Provider value={value} {...props} />;
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [count] = React.useContext(CountContext);

  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount] = React.useContext(CountContext);
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
```

### Enforcing useCount with a Consumer Hook

For consumer components, what happens if you accidentally do not wrap them within the correct context? Currently, the app will blow up without much useful information.

What we can do is abstract the context to be within its own function and use it as a hook that throws an error if there is no context.

```js
// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react';

// CountContext, CountProvider and useCount can all be abstracted into its own file

// 🐨 create your CountContext here with React.createContext
const CountContext = React.createContext();
// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider
function CountProvider(props) {
  const [count, setCount] = React.useState(0);
  const value = [count, setCount];

  return <CountContext.Provider value={value} {...props} />;
}

function useCount() {
  const context = React.useContext(CountContext);
  if (!context) {
    throw new Error(`useCount must be rendered within the CountProvider`);
  }
  return context;
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const [count] = useCount();

  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount] = useCount();
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
```

### Caching previous state

> Note: Kent mentions here that normally what he would do is to have lifted state but using context certainly does have its use cases.

Here we are using React Context to create a cache that is abstracted into its own provider and context with a hook.

```js
import * as React from 'react';
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon';
import { useAsync } from '../utils';

// 🐨 Create a PokemonCacheContext
const PokemonCacheContext = React.createContext();

function PokemonCacheProvider(props) {
  // 💣 remove the useReducer here (or move it up to your PokemonCacheProvider)
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {});
  const value = [cache, dispatch];
  return <PokemonCacheContext.Provider value={value} {...props} />;
}

function pokemonCacheReducer(state, action) {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return { ...state, [action.pokemonName]: action.pokemonData };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function usePokemonCache() {
  const context = React.useContext(PokemonCacheContext);
  if (!context) {
    throw new Error('Requires PokemonCacheProvider');
  }

  return context;
}

function PokemonInfo({ pokemonName }) {
  // 🐨 get the cache and dispatch from useContext with PokemonCacheContext
  const [cache, dispatch] = usePokemonCache();
  const { data: pokemon, status, error, run, setData } = useAsync();

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName]);
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({ type: 'ADD_POKEMON', pokemonName, pokemonData });
          return pokemonData;
        }),
      );
    }
  }, [cache, dispatch, pokemonName, run, setData]);

  if (status === 'idle') {
    return 'Submit a pokemon';
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === 'rejected') {
    throw error;
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

function PreviousPokemon({ onSelect }) {
  // 🐨 get the cache from useContext with PokemonCacheContext
  const [cache] = usePokemonCache();

  return (
    <div>
      Previous Pokemon
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{ margin: '4px auto' }}>
            <button
              style={{ width: '100%' }}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PokemonSection({ onSelect, pokemonName }) {
  // 🐨 wrap this in the PokemonCacheProvider so the PreviousPokemon
  // and PokemonInfo components have access to that context.
  return (
    <PokemonCacheProvider>
      <div style={{ display: 'flex' }}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info" style={{ marginLeft: 10 }}>
          <PokemonErrorBoundary
            onReset={() => onSelect('')}
            resetKeys={[pokemonName]}
          >
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null);

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  );
}

export default App;
```

## useLayoutEffect

There are two ways to tell React to run side-effects after it renders:

1. useEffect
2. useLayoutEffect

The difference about these is subtle (they have the exact same API), but significant. 99% of the time useEffect is what you want, but sometimes useLayoutEffect can improve your user experience.

There is a [blog post](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect/) on this by Kent.

The summary:

1. useLayoutEffect: If you need to mutate the DOM and/or do need to perform measurements
2. useEffect: If you don't need to interact with the DOM at all or your DOM changes are unobservable (seriously, most of the time you should use this).

```js
import * as React from 'react';

function MessagesDisplay({ messages }) {
  const containerRef = React.useRef();
  // this is where the jank happens if using `useEffect`
  React.useLayoutEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  });

  return (
    <div ref={containerRef} role="log">
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  );
}

// this is to simulate major computation/big rendering tree/etc.
function sleep(time = 0) {
  const wakeUpTime = Date.now() + time;
  while (Date.now() < wakeUpTime) {}
}

function SlooooowSibling() {
  // try this with useLayoutEffect as well to see
  // how it impacts interactivity of the page before updates.
  React.useEffect(() => {
    // increase this number to see a more stark difference
    sleep(300);
  });
  return null;
}

function App() {
  const [messages, setMessages] = React.useState(allMessages.slice(0, 8));
  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null;
  const removeMessage = () =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : null;

  return (
    <div className="messaging-app">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={addMessage}>add message</button>
        <button onClick={removeMessage}>remove message</button>
      </div>
      <hr />
      <MessagesDisplay messages={messages} />
      <SlooooowSibling />
    </div>
  );
}

export default App;

const allMessages = [
  `Leia: Aren't you a little short to be a stormtrooper?`,
  `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
  `Leia: You're who?`,
  `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
  `Leia: Ben Kenobi is here! Where is he?`,
  `Luke: Come on!`,
  `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
  `Leia: Put that thing away! You're going to get us all killed.`,
  `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
  `Leia: It could be worse...`,
  `Han: It's worse.`,
  `Luke: There's something alive in here!`,
  `Han: That's your imagination.`,
  `Luke: Something just moves past my leg! Look! Did you see that?`,
  `Han: What?`,
  `Luke: Help!`,
  `Han: Luke! Luke! Luke!`,
  `Leia: Luke!`,
  `Leia: Luke, Luke, grab a hold of this.`,
  `Luke: Blast it, will you! My gun's jammed.`,
  `Han: Where?`,
  `Luke: Anywhere! Oh!!`,
  `Han: Luke! Luke!`,
  `Leia: Grab him!`,
  `Leia: What happened?`,
  `Luke: I don't know, it just let go of me and disappeared...`,
  `Han: I've got a very bad feeling about this.`,
  `Luke: The walls are moving!`,
  `Leia: Don't just stand there. Try to brace it with something.`,
  `Luke: Wait a minute!`,
  `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
].map((m, i) => ({
  id: i,
  author: m.split(': ')[0],
  content: m.split(': ')[1],
}));
```

## useImperativeHandle

This is a hook that you will RARELY want to use. The use case given is for forwarding refs in function components and using the hook to call the functions imperatively:

```js
// useImperativeHandle: scroll to top/bottom
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react';

// 🐨 wrap this in a React.forwardRef and accept `ref` as the second argument
const MessagesDisplay = React.forwardRef(function MessagesDisplay(
  { messages },
  ref,
) {
  const containerRef = React.useRef();
  React.useLayoutEffect(() => {
    scrollToBottom();
  });

  // 💰 you're gonna want this as part of your imperative methods
  function scrollToTop() {
    containerRef.current.scrollTop = 0;
  }
  function scrollToBottom() {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }

  // 🐨 call useImperativeHandle here with your ref and a callback function
  // that returns an object with scrollToTop and scrollToBottom
  React.useImperativeHandle(ref, () => {
    return {
      scrollToTop,
      scrollToBottom,
    };
  });

  return (
    <div ref={containerRef} role="log">
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  );
});

function App() {
  const messageDisplayRef = React.useRef();
  const [messages, setMessages] = React.useState(allMessages.slice(0, 8));
  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null;
  const removeMessage = () =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : null;

  const scrollToTop = () => messageDisplayRef.current.scrollToTop();
  const scrollToBottom = () => messageDisplayRef.current.scrollToBottom();

  return (
    <div className="messaging-app">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={addMessage}>add message</button>
        <button onClick={removeMessage}>remove message</button>
      </div>
      <hr />
      <div>
        <button onClick={scrollToTop}>scroll to top</button>
      </div>
      <MessagesDisplay ref={messageDisplayRef} messages={messages} />
      <div>
        <button onClick={scrollToBottom}>scroll to bottom</button>
      </div>
    </div>
  );
}

export default App;

const allMessages = [
  `Leia: Aren't you a little short to be a stormtrooper?`,
  `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
  `Leia: You're who?`,
  `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
  `Leia: Ben Kenobi is here! Where is he?`,
  `Luke: Come on!`,
  `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
  `Leia: Put that thing away! You're going to get us all killed.`,
  `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
  `Leia: It could be worse...`,
  `Han: It's worse.`,
  `Luke: There's something alive in here!`,
  `Han: That's your imagination.`,
  `Luke: Something just moves past my leg! Look! Did you see that?`,
  `Han: What?`,
  `Luke: Help!`,
  `Han: Luke! Luke! Luke!`,
  `Leia: Luke!`,
  `Leia: Luke, Luke, grab a hold of this.`,
  `Luke: Blast it, will you! My gun's jammed.`,
  `Han: Where?`,
  `Luke: Anywhere! Oh!!`,
  `Han: Luke! Luke!`,
  `Leia: Grab him!`,
  `Leia: What happened?`,
  `Luke: I don't know, it just let go of me and disappeared...`,
  `Han: I've got a very bad feeling about this.`,
  `Luke: The walls are moving!`,
  `Leia: Don't just stand there. Try to brace it with something.`,
  `Luke: Wait a minute!`,
  `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
].map((m, i) => ({
  id: i,
  author: m.split(': ')[0],
  content: m.split(': ')[1],
}));
```

## useDebugValue

Only useful for custom hooks in your React DevTools browser extension.

The use case we are solving here is that we have three `useMedia` hooks. Under the `useDebugValue` hook, we don't have much more information than the "hooks" and their values for `State` and `Effect`. We want to get more information like a label:

```js
import * as React from 'react';

// you don't need this in this example
const formatCountDebugValue = ({ query, state }) => `\`${query}\` => ${state}`;

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState);
  // 🐨 call React.useDebugValue here. Generally you should just put the commented out
  // on the second line
  React.useDebugValue({ query, state }, formatCountDebugValue);
  // React.useDebugValue(`\`${query}\` => ${state}`)

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    function onChange() {
      if (!mounted) {
        return;
      }
      setState(Boolean(mql.matches));
    }

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)');
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)');
  const isSmall = useMedia('(max-width: 699px)');
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null;

  return <div style={{ width: 200, height: 200, backgroundColor: color }} />;
}

function App() {
  return <Box />;
}

export default App;
```
