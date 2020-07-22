---
menu: React
name: Webpack Federation with React
---

# Webpack Federation with React

## Resources

1. [Webpack Federation Examples](https://github.com/module-federation/module-federation-examples)

## React App One

```js
// App.js
import React from 'react';
import { ThemeProvider } from 'styled-components';
import Page from './Page';
const RemoteCombo = React.lazy(() => import('app2/Combo'));

const App = () => (
  <div>
    <ThemeProvider theme={{ main: 'royalblue' }}>
      <h1>Basic Host-Remote</h1>
      <h2>App 1</h2>
      <Page />
      <React.Suspense fallback="Waddup">
        <RemoteCombo theme={{ main: 'royalblue' }} />
      </React.Suspense>
    </ThemeProvider>
  </div>
);

export default App;

// Page.js
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
const RemoteButton = React.lazy(() => import('app2/Button'));
const RemoteTitle = React.lazy(() => import('app2/Title'));

const Page = () => {
  const theme = useContext(ThemeContext);

  return (
    <React.Fragment>
      <React.Suspense fallback="Loading Button">
        <RemoteTitle theme={theme}>Styled Title</RemoteTitle>
      </React.Suspense>
      <React.Suspense fallback="Loading Button">
        <RemoteButton onClick={() => alert('Made it')} theme={theme}>
          Styled Component
        </RemoteButton>
      </React.Suspense>
    </React.Fragment>
  );
};

export default Page;

// Webpack config
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001,
  },
  output: {
    // assuming we are running in Production
    publicPath: 'https://federation-app.nodular.co/',
  },
  module: {
    rules: [
      {
        test: /bootstrap\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  //http://localhost:3002/remoteEntry.js
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        app2: 'app2@https://federation.nodular.co/remoteEntry.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'styled-components': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
```

## App Two

```js
// Button.js
import React from 'react';
import styled from 'styled-components';
// Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};

  &:hover {
    background-color: ${(props) => props.theme.main};
    color: black;
  }
`;
// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: 'palevioletred',
  },
};

export default Button;

// Title.js
import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${(props) => props.theme.main};
`;

Title.defaultProps = {
  theme: {
    main: 'black',
  },
};

export default Title;

// Combo.js
import React from 'react';
import LocalButton from './Button';
import LocalTitle from './Title';

const App = ({ theme }) => (
  <div>
    <LocalTitle theme={theme}>Hello, world!</LocalTitle>
    <LocalButton theme={theme}>Button</LocalButton>
  </div>
);

export default App;


// weboack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3002,
  },
  output: {
    // assume we are running in production
    publicPath: 'https://federation.nodular.co/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      library: { type: 'var', name: 'app2' },
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
        './Title': './src/Title',
        './Combo': './src/Combo',
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

```
