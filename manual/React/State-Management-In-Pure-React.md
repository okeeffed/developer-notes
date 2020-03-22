---
menu: React
name: State Management in Pure React
---

# State Management in Pure React

This course looks deep into understanding state, the inner workings of `this.setState`, exploring APIs to navigate around prop-drilling, reducers for advanced state management, write custom hooks, store state in local storage, store state in URL query params and fetch from a server.

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/pure-react-state/)
2. [Slides](https://speakerdeck.com/stevekinney/react-state)
3. [GitHub resource for course](https://github.com/stevekinney/react-state-management)
4. [Github code for Grude list](https://github.com/stevekinney/grudges-react-state)
5. [Star Wars character state](https://github.com/stevekinney/star-wars-characters-react-state)

## Types of State

1. Model data: nouns in application
2. View/UI state: Are those nouns sorted in ascending or descending order?
3. Session state: Is the user logged in?
4. Communication: Are we in the process of fetching the nouns from the server?
5. Location: Where are we in the application? Which nouns are we looking at?

## setState & Class

This warm up just looks at the old `setState` with class components that we know.

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

import './styles.scss';

class Application extends Component {
  state = { count: 0 };

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    const { count } = this.state;

    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
        </section>
      </main>
    );
  }
}

render(<Application />, document.getElementById('root'));
```

While different when it comes to hooks, React will batch up `setState` calls to avoid unnecessary re-renders.

`setState` also runs asynchronously - important to know!

`setState` also allows you to pass in a function that enables you to ensure there is no batching. That function can take arguments `(state, props)`. This helps us to abstract functions that can reused everywhere.

Finally, there is a callback that you can pass as a second argument to `setState` that allows you to fire a function after the change. This is useful for when you are breaking encapsulation or need to pass data back to a parent after the change.

> Fun tidbit that came up is that arrow function methods are not supported natively without a Babel plugin.

## setState Patterns and Anti-Patterns

1. Setting initial state by combining two different props - just add props as you need them.
2. Don't use state for things that won't be rendered - example was this constantly polled endpoint.

## Hooks State

This gives a way to manipulate state in functional components. With this we don't have to worry about event binding. This is not disimilar to `setState` asynchronous call.

```javascript
const [count, setCount] = React.useState(0);

const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);
const reset = () => setCount(0);
```

We can also take a function for this ie `setCount(c => c + 1)`. This does not get a prop as a second argument. That means we can still pull out the function as long as we don't need access to props.

Here, we also need to pass something tangible back ie no `undefined` returns from the callback.

We don't have a callback, but we can now use `useEffect` as a replacement.

```javascript
const [count, setCount] = React.useState(0);

const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);
const reset = () => setCount(0);

useEffect(() => {
  document.title = `Counter: ${count}`;
}, [count]);

// this second effect is an example of an effect for local storage
useEffect(() => {
  storeStateInLocalStorage(count);
}, count);
```

Note: if you don't give `useEffect` a second parameter, it will run on every render.

If you give one, it gives dependencies where the effect will only run when there is a change to the dependency.

### Making an hooks abstraction

```javascript
// this is an abstraction for React.useState
const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem('counterState');
    if (storage) return JSON.parse(storage)[key];
    return initialState;
  };

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, value);

  return [value, setValue];
};
```

This makes things a bit more useable across the app:

```javascript
const Counter = () => {
  const [count, setCount] = useLocalStorage(0, 'count');
  // Rest removed for brevity
};
```

## Persisting State & useRef

In the case of the function components, we have a unique call of the function each time which will give a different copy of the state and props.

Using a reference is a way for us to persist a previous value in our function components.

```javascript
const Counter = () => {
  const [count, setCount] = useLocalStorage(0, 'count');
  const countRef = React.useRef();

  let message = '';
  if (countRef.current < count) message = 'Higher';
  if (countRef.current > count) message = 'Lower';

  // the only way to update the current reference
  countRef.current = count;
  // Rest removed for brevity
};
```

## useEffect & Cleanup

In this example, we see that there is always a new interval called when the useEffect runs:

```javascript
useEffect(() => {
  setInterval(() => {
    console.log(`Count: ${count}`);
  }, 1000);
}, [count]);
```

The above has no cleanups. No bueno. Those suttle things will come to bite us. To avoid this:

```javascript
useEffect(() => {
  const id = setInterval(() => {
    console.log(`Count: ${count}`);
  }, 1000);
  // this will give a callback where we can cleanup
  // after itself for each effect
  return () => clearInterval(id);
}, [count]);
```

## Reducers

React these days have a `useReducer` which takes a simplified version of what Redux does.

React state needs immutable objects everytime. If you mutate an object or array, it is the same object in memory - React can't tell the difference. We know this already from the prominent use of passing new arrays and objects with the spread operator.

> The example used is what happens when we update parent state for one child and all the children re-rendering needlessly.

A `reducer` is a function that takes two arguments. It takes two arguments: 1. The current state of the world (state) and 2. The thing that happened (action).

It takes these two things and pipes out a resolved new state of the world.

```javascript
const initialState = {};

const reducer = (state, action) => {
  if (action.type === TYPE) {
    // this assumes state is just an array for a list etc
    return [action.payload, ...state];
  }
  return state;
};

// code to run
const Component = () => {
  const [dataNamedWhatever, dispatch] = useReducer(reducer, initialState);
  const actionToDo = mutation => {
    dispatch({
      type: TYPE,
      payload: mutation,
    });
  };
};
```

The benefit of this is that is becomes super easy to unit test. This means we don't need to worry about mounting components to do so.

Steve mentions that his preference is to not use a switch statement.

## React.memo & useCallback

At this point, what we want to do is tell React not to rerender if nothing has changed.

`React.memo` simply takes a function component, and if it has the same props, simply don't rerender it.

We also have `useCallback` and `useMemo`.

`useMemo` will call a function and if the dependencies haven't changed, it will not call the function again.

`useCallback` will give you a new memoized function that you can call. It changes only if one the dependencies has changed.

```javascript
const initialState = {};

const reducer = (state, action) => {
  if (action.type === TYPE) {
    // this assumes state is just an array for a list etc
    return [action.payload, ...state];
  }
  return state;
};

// code to run
const Component = () => {
  const [dataNamedWhatever, dispatch] = useReducer(reducer, initialState);
  const actionToDo = mutation => {
    dispatch({
      type: TYPE,
      payload: mutation,
    });
  };
};
```

If we wrap our `NewGrudge` with `React.memo`, then it will check

```javascript
const Component = () => {
  const [dataNamedWhatever, dispatch] = useReducer(reducer, initialState);
  // this changes to make sure the function is memoized and only changes
  // if value of "mutation" changes
  const actionToDo = useCallback(
    mutation => {
      dispatch({
        type: TYPE,
        payload: mutation,
      });
    },
    [dispatch],
  );
};

const List = React.memo(({ onSubmit }) => {
  // rest of code
});
```

If we get the same function every time, we don't really need to rerender. This works because now our `useCallback` only depends on `dispatch` and not the `mutation` value.

## Prop Drilling & Context API

The aim of Context API is to be "hey, I want the state to be available around the place so that I can hook into".

> An interesting question that come up about Redux out of the box. Redux comes with middleware out of the box, `useReducer` does not. Redux has `combinedReducers`, others do not. The tradeoff is with you need them and whether you use what you write vs what is battle tested etc.

### Creating a Context Provider

`React.createContext()` will give you a `Provider` and a `Consumer`. If you use hooks, you might be able to get away without using the consumer.

```javascript
import React from 'react';

const SuperCoolContext = React.createContext();

SuperCoolContext.Provider;
SuperCoolContext.Consumer;

// in use (this uses the Render Prop pattern)
const App = () => (
  <SuperCoolContext.Provider value={0}>
    <SuperCoolContext.Consumer>
      {value => <p>{value}</p>}
    </SuperCoolContext.Consumer>
  </SuperCoolContext.Provider>
);
```

The example given ends up pulling all the reducer actions into a `GrudgeContext.js` file with the reducer.

```javascript
import React, { useReducer, createContext, useCallback } from 'react';
import initialState from './initialState';
import id from 'uuid/v4';

export const GrudgeContext = createContext();

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state = [], action) => {
  if (action.type === GRUDGE_ADD) {
    return [
      {
        id: id(),
        ...action.payload,
      },
      ...state,
    ];
  }

  if (action.type === GRUDGE_FORGIVE) {
    return state.map(grudge => {
      if (grudge.id === action.payload.id) {
        return { ...grudge, forgiven: !grudge.forgiven };
      }
      return grudge;
    });
  }

  return state;
};

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason,
        },
      });
    },
    [dispatch],
  );

  const toggleForgiveness = useCallback(
    id => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: {
          id,
        },
      });
    },
    [dispatch],
  );

  return (
    <GrudgeContext.Provider value={{ grudges, addGrudge, toggleForgiveness }}>
      {children}
    </GrudgeContext.Provider>
  );
};
```

And so the demo `Application.js` file becomes slim:

```javascript
import React from 'react';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

const Application = () => {
  return (
    <div className="Application">
      <NewGrudge />
      <Grudges />
    </div>
  );
};

export default Application;
```

Now we can update the `Grudges.js` list:

```javascript
import React from 'react';
import Grudge from './Grudge';
import { GrudgeContext } from './GrudgeContext';

const Grudges = () => {
  const { grudges } = React.useContext(GrudgeContext);

  return (
    <section className="Grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map(grudge => (
        <Grudge key={grudge.id} grudge={grudge} />
      ))}
    </section>
  );
};

export default Grudges;
```

And finally update the individual grudges:

```javascript
import React from 'react';
import { GrudgeContext } from './GrudgeContext';

const Grudge = ({ grudge }) => {
  const { toggleForgiveness } = React.useContext(GrudgeContext);

  return (
    <article className="Grudge">
      <h3>{grudge.person}</h3>
      <p>{grudge.reason}</p>
      <div className="Grudge-controls">
        <label className="Grudge-forgiven">
          <input
            type="checkbox"
            checked={grudge.forgiven}
            onChange={() => toggleForgiveness(grudge.id)}
          />{' '}
          Forgiven
        </label>
      </div>
    </article>
  );
};

export default Grudge;
```

Notice that we are losing some of the optimisations that we made here + the ability to unit test smaller parts.

When it comes to testing, you now need to pass the a provider. You can use the `container` pattern or `HOC` pattern to "hug" these changes to help.

## Data Fetching

The question is whether or not we need to bring in any heavy-weight tools into our application like RxJS etc to help cancel and debounce API calls etc.

Creating a custom hook for a fetch:

```javascript
const useFetch = url => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching');

    setLoading(true);
    setError(null);
    setResponse(null);

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setResponse(response);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return [response, loading, error];
};
```

### Refactoring to a reducer

Something that is important here is that we are handling cases for:

1. Fetching
2. Complete response
3. Errors

```javascript
const fetchReducer = (state, action) => {
  if (action.type === 'FETCHING') {
    return {
      result: null,
      loading: true,
      error: null,
    };
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.result,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};
```

Now we can dispatch actions.

```javascript
const useFetch = (url, dependencies = [], formatResponse = () => {}) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetch(url)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'RESPONSE_COMPLETE',
          payload: { result: formatResponse(response) },
        });
      })
      .catch(error => {
        dispatch({ type: 'ERROR', payload: { error } });
      });
  }, [url, formatResponse]);

  const { result, loading, error } = state;

  return [result, loading, error];
};
```

## Thunks

Something we get in Redux is middleware. The reducer itself does not have an idea of asynchonity. It is genuinely other calls that force the async. Redux uses this thing called a `thunk`. In normal reducers, we dispatch actions. A thunk itself is a function returned from another function.

```javascript
function definitelyNotAThunk() {
  return function aThunk() {
    console.log('Hello I am a think.');
  };
}
```

### useThunkReducer

Using this allows us to separate the function from the UI and tells the reducer that does know stuff how to do it.

```javascript
useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enchancedDispatch = React.useCallback(action => {
    // example uses Lodash isFunction
    if (isFunction(action)) {
      action(dispatch);
    } else {
      dispatch(action);
    }
  }, [dispatch]);

  return [state, enchancedDispatch];
};

// in application
const fetchCharacters = dispatch => {
  fetch(endpoint)
    .then(res => res.json())
    .then(res => dispatch({ type: 'RES_COMPLETE' }));
};

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  // If we want it on load
  // useEffect(() => {
  //   dispatch(fetchCharacters)
  // }, []);

  render() {
    return (<button onClick={() => dispatch(fetchCharacters)}>Click</button>)
  }
};
```

> Something worth noting here is that Steve mentions that some of the previous performance optimisations that we lost prior can actually be tweaked with react-redux.

## Routing & Thunks

This section talks to the perils of `useEffect` and `dispatch` [found here](https://github.com/stevekinney/star-wars-characters-react-state#the-perils-of-useeffect-and-dependencies).

For React Router, we have perils to be careful of with the dependencies:

```javascript
const CharacterView = ({ match }) => {
  const [character, setCharacter] = useState({});

  useEffect(() => {
    fetch(endpoint + '/characters/' + match.params.id)
      .then(response => response.json())
      .then(response => setCharacter(response.character))
      .catch(console.error);
  }, [match.params.id]);

  // ...
};
```
