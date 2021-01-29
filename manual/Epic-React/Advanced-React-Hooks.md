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
