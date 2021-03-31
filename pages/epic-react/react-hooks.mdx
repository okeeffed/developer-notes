---
menu: Epic React
name: React Hooks
---

# React Hooks

## useState

> "Normally an interactive application will need to hold state somewhere. In React, you use special functions called 'hooks' to do this."

An example app setting names:

```js
// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from "react";

function Greeting() {
  const [name, setName] = React.useState("");

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
```

> 'I have no mechanism for saying, "Hey, React, I changed the name value. I want you to re-render this and get some new JSX based on the state update that I have made." That's what React useState Hook is intended to do. It says, "Hey, React, this component can re-render any time this state that I want you to manage is going to change."'

## useEffect (persistent state)

> "`React.useEffect` is a built-in hook that allows you to run some custom code after React renders (and re-renders) your component to the DOM. It accepts a callback function which React will call after the DOM has been updated."

```js
React.useEffect(() => {
  // your side-effect code here.
  // this is where you can make HTTP requests or interact with browser APIs.
});
```

![Hook Flow](/hook-flow.png)

### Lazy State Initialization

Right now, every time our component function is run, our function reads from localStorage. This is problematic because it could be a performance bottleneck (reading from localStorage can be slow). And what’s more we only actually need to know the value from localStorage the first time this component is rendered! So the additional reads are wasted effort.

To avoid this problem, React’s useState hook allows you to pass a function instead of the actual value, and then it will only call that function to get the state value when the component is rendered the first time. So you can go from this: `React.useState(someExpensiveComputation())` To this: `React.useState(() => someExpensiveComputation())`.

And the `someExpensiveComputation` function will only be called when it’s needed!

Make the `React.useState` call use lazy initialization to avoid a performance bottleneck of reading into localStorage on every render.

```js
// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

function Greeting({ initialName = "" }) {
  const [name, setName] = React.useState(
    () => window.localStorage.getItem("name") || initialName
  );

  // ... code omitted

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}
```

### Effect Dependencies

The callback we’re passing to `React.useEffect` is called after every render of our component (including re-renders). This is exactly what we want because we want to make sure that the name is saved into localStorage whenever it changes, but there are various reasons a component can be re-rendered (for example, when a parent component in the application tree gets re-rendered). We use a dependencies array to fix this issue.

```js
// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

function Greeting({ initialName = "" }) {
  // Here is our new useEffect callback
  React.useEffect(() => {
    window.localStorage.setItem("name", name);
  }, [name]);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
```

### Custom Hook

If we think this logic will be used elsewhere, we can abstract it into a custom hook:

```js
// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

// Here is our new custom hook!
function useLocalStorageState(key, defaultValue) {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

function Greeting({ initialName = "" }) {
  const [name, setName] = useLocalStorageState("name", initialName);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
```

### Flexible Custom Hook

To make this hook more reuseable, we can make some changes to take any data type:

```js
// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

// Here is our new custom hook!
function useLocalStorageState(
  key,
  defaultValue,
  { serialize = JSON.stringify, deserialise = JSON.parse } = {}
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);

    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }

    // can handle function to call to set default value if computationally expensive
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }

    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  return [state, setState];
}

function Greeting({ initialName = "" }) {
  const [name, setName] = useLocalStorageState("name", initialName);

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  return <Greeting />;
}

export default App;
```

## Lifting State

This section covers the idea of moving state up or down the component hierarchy based on requirements.

Not too much to add here.

## useState: tic tac toe

The final code sets initial state lazily from Local Storage (or fallsback to an empty array) and derived state is done based on that state value on each render.

The final code is as so:

```js
// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from "react";

function Board() {
  const [squares, setSquares] = React.useState(
    () =>
      JSON.parse(window.localStorage.getItem("squares")) || Array(9).fill(null)
  );

  React.useEffect(() => {
    window.localStorage.setItem("squares", JSON.stringify(squares));
  }, [squares]);

  // 🐨 We'll need the following bits of derived state:
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter((r) => r === "X").length;
  const oSquaresCount = squares.filter((r) => r === "O").length;
  return oSquaresCount === xSquaresCount ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
```

## useRef and useEffect: DOM interaction

The main pointers here were to use `useRef` for mutable DOM manipulation and was used for an example library where the interaction is set once during `useEffect` with a return function to destroy the instance.

## useEffect: HTTP requests

HTTP requests are another common side-effect that we need to do in applications. This is no different from the side-effects we need to apply to a rendered DOM or when interacting with browser APIs like `localStorage`. In all these cases, we do that within a `useEffect` hook callback. This hook allows us to ensure that whenever certain changes take place, we apply the side-effects based on those changes.

One important thing to note about the `useEffect` hook is that you cannot return anything other than the cleanup function. This has interesting implications with regard to async/await syntax:

```js
// this does not work, don't do this:
React.useEffect(async () => {
  const result = await doSomeAsyncThing();
  // do something with the result
});
```

The reason this doesn’t work is because when you make a function async, it automatically returns a promise (whether you’re not returning anything at all, or explicitly returning a function). This is due to the semantics of async/await syntax. So if you want to use async/await, the best way to do that is like so:

```js
React.useEffect(() => {
  async function effect() {
    const result = await doSomeAsyncThing();
    // do something with the result
  }
  effect();
});
```

This ensures that you don’t return anything but a cleanup function.

Kent mentions that he typically finds it easier to abstract all async code into a utility function that can be called using promise-based `.then`:

```js
React.useEffect(() => {
  doSomeAsyncThing().then((result) => {
    // do something with the result
  });
});
```

### HTTP request exercise

In the first exercise, we want to update the state based on a side-effect to do with a changing `pokemonName`.

The solution is as follows:

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null);
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setPokemon(pokemonData);
      })
      .catch((err) => console.dir(err));
  }, [pokemonName]);
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  const hasPokemonDataAndPokemonName = pokemonName && pokemon;

  return (
    <div>
      {!pokemon && <p>Submit a pokemon</p>}
      {!hasPokemonDataAndPokemonName && (
        <PokemonInfoFallback name={pokemonName} />
      )}
      {hasPokemonDataAndPokemonName && <PokemonDataView pokemon={pokemon} />}
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
```

### Handling errors

The code was updated to handle when an error occurs:

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setError(null);
        setPokemon(pokemonData);
      })
      // handling of the error
      .catch((err) => setError(err));
  }, [pokemonName]);

  const hasPokemonDataAndPokemonName = pokemonName && pokemon;

  return error ? (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
    </div>
  ) : (
    <div>
      {!pokemon && <p>Submit a pokemon</p>}
      {!hasPokemonDataAndPokemonName && (
        <PokemonInfoFallback name={pokemonName} />
      )}
      {hasPokemonDataAndPokemonName && <PokemonDataView pokemon={pokemon} />}
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
```

### Supporting request state

Instead of relying on booleans, we can use "request state" to help identify what to display:

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [state, setState] = React.useState("idle");
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState("pending");

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setError(null);
        setPokemon(pokemonData);
        setState("resolved");
      })
      .catch((err) => {
        setError(err);
        setState("rejected");
      });
  }, [pokemonName]);

  switch (state) {
    case "resolved":
      return <PokemonDataView pokemon={pokemon} />;
    case "rejected":
      return (
        <div role="alert">
          There was an error:{" "}
          <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        </div>
      );
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "idle":
    default:
      return <p>Submit a pokemon</p>;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
```

## Store state as an object

To ensure we don't run into issues from state updates happening in an async callback, we update the state to use an object.

Note: there is a more elegant solution using reducers that will be shown in future.

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: "idle",
    error: null,
    pokemon: null,
  });
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({
      pokemon: null,
      error: null,
      status: "pending",
    });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({
          status: "resolved",
          pokemon: pokemonData,
          error: null,
        });
      })
      .catch((err) => {
        setState({
          status: "rejected",
          pokemon: null,
          error: err,
        });
      });
  }, [pokemonName]);

  switch (state.status) {
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    case "rejected":
      return (
        <div role="alert">
          There was an error:{" "}
          <pre style={{ whiteSpace: "normal" }}>{state.error.message}</pre>
        </div>
      );
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "idle":
    default:
      return <p>Submit a pokemon</p>;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  );
}

export default App;
```

### Adding an error boundary

We can use classes to add an error boundary. The `componentDidCatch` method also gives an `error` which is the usual error object and `errorInfo` variable that displays information about the component stack.

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error:", error);
    console.log("errorInfo:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: "idle",
    error: null,
    pokemon: null,
  });
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({
      pokemon: null,
      error: null,
      status: "pending",
    });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({
          status: "resolved",
          pokemon: pokemonData,
          error: null,
        });
      })
      .catch((err) => {
        setState({
          status: "rejected",
          pokemon: null,
          error: err,
        });
      });
  }, [pokemonName]);

  switch (state.status) {
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    case "rejected":
      throw state.error;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "idle":
    default:
      return <p>Submit a pokemon</p>;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <ErrorBoundary>
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
```

### Resetting an error boundary

We can clean the state and pass a key to the error boundary to get a way to clean things up:

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error:", error);
    console.log("errorInfo:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => this.props.setPokemonName(null)}>
            Reset pokemon name
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: "idle",
    error: null,
    pokemon: null,
  });
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({
      pokemon: null,
      error: null,
      status: "pending",
    });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({
          status: "resolved",
          pokemon: pokemonData,
          error: null,
        });
      })
      .catch((err) => {
        setState({
          status: "rejected",
          pokemon: null,
          error: err,
        });
      });
  }, [pokemonName]);

  switch (state.status) {
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    case "rejected":
      throw state.error;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "idle":
    default:
      return <p>Submit a pokemon</p>;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <ErrorBoundary key={pokemonName} setPokemonName={setPokemonName}>
      <div className="pokemon-info-app">
        <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          <PokemonInfo pokemonName={pokemonName} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
```

### using react-error-boundary

```js
import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";
import { resetErrorBoundary, ErrorBoundary } from "react-error-boundary";

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: "idle",
    error: null,
    pokemon: null,
  });
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({
      pokemon: null,
      error: null,
      status: "pending",
    });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({
          status: "resolved",
          pokemon: pokemonData,
          error: null,
        });
      })
      .catch((err) => {
        setState({
          status: "rejected",
          pokemon: null,
          error: err,
        });
      });
  }, [pokemonName]);

  switch (state.status) {
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    case "rejected":
      throw state.error;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "idle":
    default:
      return <p>Submit a pokemon</p>;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          key={pokemonName}
          FallbackComponent={() => (
            <div>
              <h1>Something went wrong.</h1>
              <button onClick={() => setPokemonName(null)}>
                Reset pokemon name
              </button>
            </div>
          )}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
```

### Reset the ErrorBoundary

At the moment due to using the `key` in the `ErrorBoundary`, we are unmounting the error boundary which in turn unmounts the `PokemonInfo`.

We can fix this by using `resetErrorBoundary` from the `react-error-boundary` library.

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";
import { ErrorBoundary } from "react-error-boundary";

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: pokemonName ? "pending" : "idle",
    error: null,
    pokemon: null,
  });
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({
      pokemon: null,
      error: null,
      status: "pending",
    });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({
          status: "resolved",
          pokemon: pokemonData,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          status: "rejected",
          pokemon: null,
          error: error,
        });
      });
  }, [pokemonName]);

  switch (state.status) {
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    case "rejected":
      throw state.error;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "idle":
    default:
      return <p>Submit a pokemon</p>;
  }
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
```

### using resetKeys for React Error Boundary

We can use keys to help the issue where interacting with something outside of the `resetErrorBoundary` function will allow us to resolve our issue with the function:

```js
// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from "../pokemon";
import { ErrorBoundary } from "react-error-boundary";

function PokemonInfo({ pokemonName }) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    status: pokemonName ? "pending" : "idle",
    error: null,
    pokemon: null,
  });
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setState({
      pokemon: null,
      error: null,
      status: "pending",
    });

    fetchPokemon(pokemonName)
      .then((pokemonData) => {
        setState({
          status: "resolved",
          pokemon: pokemonData,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          status: "rejected",
          pokemon: null,
          error: error,
        });
      });
  }, [pokemonName]);

  switch (state.status) {
    case "resolved":
      return <PokemonDataView pokemon={state.pokemon} />;
    case "rejected":
      throw state.error;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "idle":
    default:
      return <p>Submit a pokemon</p>;
  }
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
```
