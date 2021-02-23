---
menu: Tailwind
name: Tailwind + SocketIO Example
---

# Tailwind + SocketIO Example

## Resources

1. [SocketIO Client init](https://socket.io/docs/v3/client-initialization/)
2. [SocketIO Package](https://www.npmjs.com/package/socket.io)
3. [Git Repo](https://github.com/okeeffed/react-tailwind-with-css-variables.git)

## Context

The app examples here have the app at `localhost:3000` and the server at `localhost:4000`.

## The server

```js
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  // ...
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log(`Connected: ${socket.id}`);
  socket.on('disconnect', () => console.log(`Disconnected: ${socket.id}`));
  socket.on('join', room => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
  });
  socket.on('chat', data => {
    const { message, room } = data;
    console.log(`msg: ${message}, room: ${room}`);
    io.to(room).emit('chat', message);
  });
});

httpServer.listen(4000);
```

## The web app

This is an extension on updating the CSS variables. It is basic and without a reducer:

```js
import React from 'react';
import './App.css';
import {
  initiateSocket,
  subscribeToChat,
  sendMessage,
  disconnectSocket,
} from './socket';

const ThemeContext = React.createContext();
const CHAT_ROOM = 'example-room';

function ThemeProvider({ children, baseTheme = '' }) {
  const [theme, setTheme] = React.useState(baseTheme);
  const value = [theme, setTheme];
  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(`useCount must be rendered within the CountProvider`);
  }
  return context;
}

function KeepsBaseTheme() {
  return (
    <div className="theme-base bg-primary p-4">
      <p className="text-secondary">This maintains them original theme</p>
    </div>
  );
}

function DependsOnParent() {
  return (
    <div className="bg-primary p-4">
      <p className="text-secondary">
        This depends on the parent having context or not
      </p>
    </div>
  );
}

function ThemedExample() {
  const [, setTheme] = useTheme();

  React.useEffect(() => {
    initiateSocket(CHAT_ROOM);
    subscribeToChat((err, data) => {
      if (err) return;
      setTheme(data);
    });
    return () => {
      disconnectSocket();
    };
  }, [setTheme]);

  return (
    <div className={`bg-primary flex items-center justify-center h-screen`}>
      <button
        onClick={() => sendMessage(CHAT_ROOM, undefined)}
        className="bg-secondary p-4 mr-4 "
      >
        Set base theme
      </button>
      <button
        onClick={() => sendMessage(CHAT_ROOM, 'theme-dark')}
        className="bg-secondary p-4 mr-4 "
      >
        Set dark theme
      </button>
      <button
        onClick={() => sendMessage(CHAT_ROOM, 'theme-alt')}
        className="bg-secondary p-4"
      >
        Set alt theme
      </button>
      <div>
        <KeepsBaseTheme />
        <DependsOnParent />
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <DependsOnParent />
      <ThemeProvider baseTheme="theme-dark">
        <ThemedExample />
      </ThemeProvider>
    </div>
  );
}

export default App;
```

## Using the webapp but with reducers

```js
import React from 'react';
import './App.css';
import {
  initiateSocket,
  subscribeToChat,
  sendMessage,
  disconnectSocket,
} from './socket';

const ThemeContext = React.createContext();
const CHAT_ROOM = 'example-room';

const SET_THEME = 'SET_THEME';

function themeReducer(state, action) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}

function ThemeProvider({ children, baseTheme = '' }) {
  const [state, dispatch] = React.useReducer(themeReducer, {
    theme: baseTheme,
  });
  const value = [state, dispatch];
  return (
    <ThemeContext.Provider value={value}>
      <div className={state.theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(`useCount must be rendered within the CountProvider`);
  }
  return context;
}

function KeepsBaseTheme() {
  return (
    <div className="theme-base bg-primary p-4">
      <p className="text-secondary">This maintains them original theme</p>
    </div>
  );
}

function DependsOnParent() {
  return (
    <div className="bg-primary p-4">
      <p className="text-secondary">
        This depends on the parent having context or not
      </p>
    </div>
  );
}

function ThemedExample() {
  const [, themeDispatch] = useTheme();

  React.useEffect(() => {
    initiateSocket(CHAT_ROOM);
    subscribeToChat((err, data) => {
      if (err) return;
      themeDispatch(data);
    });
    return () => {
      disconnectSocket();
    };
  }, [themeDispatch]);

  return (
    <div className={`bg-primary flex items-center justify-center h-screen`}>
      <button
        onClick={() =>
          sendMessage(CHAT_ROOM, {
            type: SET_THEME,
            payload: undefined,
          })
        }
        className="bg-secondary p-4 mr-4 "
      >
        Set base theme
      </button>
      <button
        onClick={() =>
          sendMessage(CHAT_ROOM, {
            type: SET_THEME,
            payload: 'theme-dark',
          })
        }
        className="bg-secondary p-4 mr-4 "
      >
        Set dark theme
      </button>
      <button
        onClick={() =>
          sendMessage(CHAT_ROOM, {
            type: SET_THEME,
            payload: 'theme-alt',
          })
        }
        className="bg-secondary p-4"
      >
        Set alt theme
      </button>
      <div>
        <KeepsBaseTheme />
        <DependsOnParent />
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <DependsOnParent />
      <ThemeProvider baseTheme="theme-dark">
        <ThemedExample />
      </ThemeProvider>
    </div>
  );
}

export default App;
```
