---
name: React Hooks
menu: React
---

# React Hooks

Hooks introduces `State` and `Lifecycle Methods` to function-based components.

Hooks make it really easy to share logic between components.

## Some Basic Hooks

| Name       | Function                                               |
| ---------- | ------------------------------------------------------ |
| useState   | Component-level state                                  |
| useEffect  | Use 'lifecycle methods'                                |
| useContext | Allow use of context system                            |
| useRef     | Allow func component to use ref system                 |
| useReducer | Allow func component to store data through a 'reducer' |

## Before Hooks

```javascript
// components/App.js
import React from 'react';

export default App extends React.Component {
    state = {
        counter: 0
    }

    handleClick = () => this.setState({counter: this.state.counter++})

    render() {
        return <div>
            <button onClick={this.handleClick}>{this.state.counter}</button>
        </div>
    }
}
```

## After Hooks

```javascript
// components/App.js
import React, {useState, useEffect} from 'react';

const App = () => {
    const [counter, setCounter] = useState(0);

    const updateCounter = () => setCounter(counter++)

    useEffect(() => {
        updateCounter(counter);
    }, [counter]);

    return <div>
        <button onClick={updateCounter}>{counter}</button>
    </div>
}
```

## Lifecycles with useEffect

`useEffect` allows us to effectively use a combined version of `componentDidMount` and `componentDidUpdate`.

```javascript
import React, {useEffect} from 'react';

// second argument controls whether or not the arrow function is called
useEffect(() => {
    updateCounter(counter);
}, [counter]);
```