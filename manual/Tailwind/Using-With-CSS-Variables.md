---
menu: Tailwind
name: Using With CSS Variables
---

# Using With CSS Variables

## Resources

1. [Online Codepen](https://codepen.io/paulayuk/pen/YzwZEZO)
2. [A Guide To Themeing in CSS](https://blog.logrocket.com/a-guide-to-theming-in-css/)
3. [Tailwind theming with variables](https://tailwindcss.com/docs/using-with-preprocessors#variables)

A local project can be found under `tailwind/tailwind-css-variables`.

## Prerequisites

Ensure that you set up Tailwind in the project.

## Setting up index.css

Update `index.css` to have a base theme and some overrides:

```css
:root {
  --color-primary: #dbd3ad;
  --color-secondary: #e0607e;
}

.theme-base {
  --color-primary: #dbd3ad;
  --color-secondary: #e0607e;
}

.theme-dark {
  --color-primary: #222;
  --color-secondary: #fff000;
}

.theme-alt {
  --color-primary: #d36060;
  --color-secondary: #f6c5af;
}
```

## Setting App.js

We can update `App.js` to have the following which is themable through the provider:

```js
import React from 'react';
import './App.css';

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState();
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

function ThemedExample() {
  const [, setTheme] = useTheme();

  return (
    <div className={`bg-primary flex items-center justify-center h-screen`}>
      <button
        onClick={() => setTheme(undefined)}
        className="bg-secondary p-4 mr-4 "
      >
        Set base theme
      </button>
      <button
        onClick={() => setTheme('theme-dark')}
        className="bg-secondary p-4 mr-4 "
      >
        Set dark theme
      </button>
      <button
        onClick={() => setTheme('theme-alt')}
        className="bg-secondary p-4"
      >
        Set alt theme
      </button>
    </div>
  );
}

function App() {
  return (
    <div>
      <ThemeProvider>
        <ThemedExample />
      </ThemeProvider>
    </div>
  );
}

export default App;
```

## Overriding the theme provider

Add the theme to the component

```js
import React from 'react';
import './App.css';

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState();
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

function ThemedExample() {
  const [, setTheme] = useTheme();

  return (
    <div className={`bg-primary flex items-center justify-center h-screen`}>
      <button
        onClick={() => setTheme(undefined)}
        className="bg-secondary p-4 mr-4 "
      >
        Set base theme
      </button>
      <button
        onClick={() => setTheme('theme-dark')}
        className="bg-secondary p-4 mr-4 "
      >
        Set dark theme
      </button>
      <button
        onClick={() => setTheme('theme-alt')}
        className="bg-secondary p-4"
      >
        Set alt theme
      </button>
      <div>
        <KeepsBaseTheme />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedExample />
    </ThemeProvider>
  );
}

export default App;
```

## Using theme based on local provider

An example of a component working within a provider that is not set globally.

```js
import React from 'react';
import './App.css';

const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState();
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

  return (
    <div className={`bg-primary flex items-center justify-center h-screen`}>
      <button
        onClick={() => setTheme(undefined)}
        className="bg-secondary p-4 mr-4 "
      >
        Set base theme
      </button>
      <button
        onClick={() => setTheme('theme-dark')}
        className="bg-secondary p-4 mr-4 "
      >
        Set dark theme
      </button>
      <button
        onClick={() => setTheme('theme-alt')}
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
      <ThemeProvider>
        <ThemedExample />
      </ThemeProvider>
    </div>
  );
}

export default App;
```

## Setting a base theme

Pass a prop to accept initial state:

```js
import React from 'react';
import './App.css';

const ThemeContext = React.createContext();

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

  return (
    <div className={`bg-primary flex items-center justify-center h-screen`}>
      <button
        onClick={() => setTheme(undefined)}
        className="bg-secondary p-4 mr-4 "
      >
        Set base theme
      </button>
      <button
        onClick={() => setTheme('theme-dark')}
        className="bg-secondary p-4 mr-4 "
      >
        Set dark theme
      </button>
      <button
        onClick={() => setTheme('theme-alt')}
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

## Updating to control fonts

The updated Tailwind config:

```js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        // /* Lora + Merriweather */
        heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
        paragraph: ['var(--font-paragraph)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

The update `index.css` file:

```css
:root {
  --color-primary: #dbd3ad;
  --color-secondary: #e0607e;
}

.theme-base {
  --color-primary: #dbd3ad;
  --color-secondary: #e0607e;
}

.theme-dark {
  --color-primary: #222;
  --color-secondary: #fff000;
}

.theme-alt {
  --color-primary: #d36060;
  --color-secondary: #f6c5af;
}

.font-domine-roboto {
  --font-heading: 'Domine';
  --font-paragraph: 'Roboto';
}

.font-hind-open-sans {
  --font-heading: 'Hind';
  --font-paragraph: 'Open Sans';
}

.font-lora-merriweather {
  --font-heading: 'Lora';
  --font-paragraph: 'Merriweather';
}
```

The example app file:

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
const FontContext = React.createContext();
const CHAT_ROOM = 'example-room';

const SET_THEME = 'SET_THEME';
const SET_FONT = 'SET_FONT';

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

function fontReducer(state, action) {
  switch (action.type) {
    case SET_FONT:
      return {
        ...state,
        font: action.payload,
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

function FontProvider({ children, baseFont = '' }) {
  const [state, dispatch] = React.useReducer(fontReducer, {
    font: baseFont,
  });
  const value = [state, dispatch];
  return (
    <FontContext.Provider value={value}>
      <div className={state.font}>{children}</div>
    </FontContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(`useCount must be rendered within the CountProvider`);
  }
  return context;
}

function useFont() {
  const context = React.useContext(FontContext);
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
  const [, fontDispatch] = useFont();

  React.useEffect(() => {
    initiateSocket(CHAT_ROOM);
    subscribeToChat((err, data) => {
      if (err) return;
      if (data.type === SET_FONT) {
        fontDispatch(data);
      } else {
        themeDispatch(data);
      }
    });
    return () => {
      disconnectSocket();
    };
  }, [themeDispatch, fontDispatch]);

  return (
    <div
      className={`bg-primary flex flex-col items-center justify-center h-screen`}
    >
      <div>
        <h1 className="font-heading text-2xl mb-2 text-white text-center">
          Switch the fonts or themes
        </h1>
        <div className="mb-4">
          <button
            onClick={() =>
              sendMessage(CHAT_ROOM, {
                type: SET_THEME,
                payload: undefined,
              })
            }
            className="bg-secondary p-4 mr-4 font-paragraph"
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
            className="bg-secondary p-4 mr-4 font-paragraph"
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
            className="bg-secondary p-4 font-paragraph"
          >
            Set alt theme
          </button>
        </div>
        <div>
          <KeepsBaseTheme />
          <DependsOnParent />
        </div>
      </div>
      <div>
        <button
          onClick={() =>
            sendMessage(CHAT_ROOM, {
              type: SET_FONT,
              payload: 'font-domine-roboto',
            })
          }
          className="bg-secondary p-4 mr-4 font-paragraph"
        >
          Set domine-roboto
        </button>
        <button
          onClick={() =>
            sendMessage(CHAT_ROOM, {
              type: SET_FONT,
              payload: 'font-hind-open-sans',
            })
          }
          className="bg-secondary p-4 mr-4 font-paragraph"
        >
          Set hind-open-sans
        </button>
        <button
          onClick={() =>
            sendMessage(CHAT_ROOM, {
              type: SET_FONT,
              payload: 'font-lora-merriweather',
            })
          }
          className="bg-secondary p-4 font-paragraph"
        >
          Set lora-merriweather
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <DependsOnParent />
      <FontProvider>
        <ThemeProvider baseTheme="theme-dark">
          <ThemedExample />
        </ThemeProvider>
      </FontProvider>
    </div>
  );
}

export default App;
```
