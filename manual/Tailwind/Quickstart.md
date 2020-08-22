---
menu: Tailwind
name: Quickstart with Tailwind
---

# Quickstart with Tailwind + TypeScript + VSCode

## Resources

1. [VSCode extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
2. [Tailwind - Installation](https://tailwindcss.com/docs/installation)
3. [Tailwind - Flex](https://tailwindcss.com/docs/flex/#app)
4. [Tailwind - Text Color](https://tailwindcss.com/docs/text-color/#app)
5. [Tailwind - Background Color](https://tailwindcss.com/docs/background-color/#app)
6. [Tailwind - Border Radius](https://tailwindcss.com/docs/border-radius/#app)
7. [Tailwind - Padding](https://tailwindcss.com/docs/padding/#app)
8. [Tailwind with CRA - Dave Ceddia](https://daveceddia.com/tailwind-create-react-app/)
9. [Classnames - GitHub](https://github.com/JedWatson/classnames)

## Installation

```s
npx create-react-app hello-tailwind --template typescript
cd hello-tailwind
# Using Yarn
yarn add tailwindcss
```

## Add CSS imports

At the top of `src/index.css`:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

## Adding scripts

```json
{
  "scripts": {
    "build:tailwind": "tailwindcss build src/tailwind.css -o src/tailwind.output.css",
    "prestart": "npm run build:tailwind",
    "prebuild": "npm run build:tailwind"
  }
}
```

## Usage with classnames

```s
yarn add classnames @types/classnames
```

## Updating App.tsx to use the correct styles

Update `index.tsx` with the following:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Update `App.jsx` to be the following:

```tsx
import React from 'react';
import cx from 'classnames';

function App() {
  const [toggle, setToggle] = React.useState<boolean>(false);

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <button
        className={cx('p-3 rounded-sm', {
          'bg-blue-500 hover:bg-blue-700': !toggle,
          'bg-red-500 hover:bg-red-500': toggle,
        })}
        onClick={() => setToggle(!toggle)}
      >
        Toggle
      </button>
    </div>
  );
}

export default App;
```

Alternatively, you could abstract this out:

```tsx
import React from 'react';
import cx from 'classnames';

function App() {
  const [toggle, setToggle] = React.useState<boolean>(false);

  const buttonClasses = cx({
    'bg-blue-500 hover:bg-blue-700': !toggle,
    'bg-red-500 hover:bg-red-500': toggle,
  });
  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <button
        className={`p-3 rounded-sm ${buttonClasses}`}
        onClick={() => setToggle(!toggle)}
      >
        Toggle
      </button>
    </div>
  );
}

export default App;
```

## Alternative without classnames

```tsx
import React from 'react';
// import cx from 'classnames';

function App() {
  const [toggle, setToggle] = React.useState<boolean>(false);
  console.log('toggle', toggle);

  const buttonClasses = toggle
    ? 'bg-red-500 hover:bg-red-500'
    : 'bg-blue-500 hover:bg-blue-500';
  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <button
        className={`p-3 rounded-sm ${buttonClasses}`}
        onClick={() => setToggle(!toggle)}
      >
        Toggle
      </button>
    </div>
  );
}

export default App;
```
