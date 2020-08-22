---
menu: React
name: React SSR
---

# Resources

1. [Digital Ocean article](https://www.digitalocean.com/community/tutorials/react-server-side-rendering)

## Create React App

```s
npx create-react-app example
```

## Update ReactDOM

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

## Update the Express server

```js
import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`),
    );
  });
});

app.use(express.static('./build'));

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`),
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## Create Webpack Server config

```s
npm install webpack-node-externals --save-dev
# For the style loaders
npm install css-loader style-loader --save-dev
```

## .babelrc.json

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## webpack.server.js

```js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
};
```

## Update package.json

```json
"scripts": {
  "dev:build-server": "NODE_ENV=development webpack --config webpack.server.js --mode=development -w",
  "dev:start": "nodemon ./server-build/index.js",
  "dev": "npm-run-all --parallel build dev:*"
},
```
