---
menu: Electron
name: Production-Ready Electron + Parcel
---

# Production-Ready Electron + Parcel

## Resources

1. [Medium post](https://medium.com/@yogeshkumarr/production-ready-electron-app-using-react-and-parcel-web-bundler-74dcda63f148)
2. [Parcel TypeScript](https://parceljs.org/typeScript.html)

## tl;dr

First, init project:

```sh
mkdir hello-parcel-electron
cd hello-parcel-electron
yarn init -y
yarn add react react-dom electron-is-dev
yarn add -D concurrently cross-env electron electron-builder parcel-bundler wait-on typescript
# Babel
yarn add -D babel-core babel-plugin-transform-object-rest-spread babel-plugin-transform-react-jsx babel-preset-env babel-preset-react
```

Second, create `index.html` file in root dir:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Electron React Parcel</title>
    <link
      rel="shortcut icon"
      href="./src/assets/logo.ico"
      type="image/x-icon"
    />
  </head>
  <body>
    <div id="root"></div>
    <script src="./src/index.js"></script>
  </body>
</html>
```

Third, create assets in `src` dir for `index.js` + `App.js`:

```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// App.js

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <WhateverYouWant />
      </div>
    );
  }
}
export default App;
```

Create `.babelrc`:

```javascript
{
  "presets": ["env", "react"],
  "plugins": ["transform-object-rest-spread", "transform-react-jsx"]
}
```

Add scripts to `package.json`:

```json
{
  "homepage": "./",
  "main": "src/electron.js",
  "scripts": {
    "react-start": "parcel -p 3000 index.html --out-dir build",
    "react-build": "parcel build index.html --out-dir build --public-url ./",
    "start": "concurrently \"cross-env BROWSER=none yarn react-start\" \"wait-on http://localhost:3000 && electron . \"",
    "electron-build": "electron-builder -mwl",
    "build": "yarn clean-build && yarn react-build && yarn electron-build"
  },
  "build": {
    "appId": "com.dennisokeeffe",
    "files": ["src/electron.js", "src/assets/*", "build/**/*"],
    "mac": {
      "target": "dmg",
      "icon": "src/assets/logo.png"
    },
    "win": {
      "target": "nsis",
      "icon": "src/assets/logo.png"
    },
    "linux": {
      "target": "deb",
      "icon": "src/assets/logo.png",
      "category": "Development"
    }
  }
}
```

Add `electron.js` in `src` directory:

```javascript
const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```

In order to update to TypeScript, simply add the `tsconfig.json` file:

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

To start now, we run `yarn start` and to build we run `yarn build`.
