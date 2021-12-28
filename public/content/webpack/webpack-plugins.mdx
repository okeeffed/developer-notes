---
menu: Webpack
name: Webpack Plugins
---

# Webpack Plugins

Webpack 4 is the standard at the time of this course.

## Resources

1. [FE Course](https://frontendmasters.com/courses/webpack-plugins/tapable-plugin-system/)
2. [Course Repo](https://github.com/thelarkinn/webpack-workshop-2018)
3. [Webpack Compilation](https://webpack.js.org/api/compilation-hooks/)
4. [memfs GitHub](https://github.com/streamich/memfs)

## Tapable Pluging System

It is a backbone of the webpack of the plugin system.

Things like the `Compiler` extend `Tapable`. They have hooks now that are static to see what you can plug into.

```javascript
// This is only v3 shown for demo purposes.
// These days you can plug into via the hooks.
class BasicPlugin {
  constructor() {}

  apply(compiler) {
    compiler.plugin('make', compilation => {
      console.log('I have access to the compilation!');
    });
  }
}

module.exports = BasicPlugin;
```

> To access any Tapable instances, you need to go through the compiler.

There are 7-ish Tapable instances in this talk that Sean deems as the most important.

## The 7 Tapable Instances

### The Compiler

The compiler:

- Exposed via Node API
- Central dispatch
- Start/stop

### The Compilation

The meat and potatoes of the Webpack. It is the dependency graph.

### The Resolver

"Finds out if it exists."

### Module Factories

Factories create instances/objects. The module factories does just that.

- Takes successfully resolved requests.
- Collects source for that file and creates a module object.

### Parser

Parser creates the ASTs and begins walking the graph.

> Webpack uses Acorn by default.

### Templates

Data binding for the modules. Creates the source code you see in your bundles.

## Plugin System Code Walkthough

There are hundreds of properties exposed out of the box.

`webpack.options.apply` takes the config and "basically runs a huge switch statement" and changes the module based on the env ie Electron, etc.

## Creating a Plugin

> It is a class with an `apply` method.

```javascript
// plugin
class MyFirstWebpackPlugin {
  // this is the important method
  apply(compiler) {
    compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, cb) => {
      console.log(stats);
      cb;
    }));
  }
}

module.exports = MyFirstWebpackPlugin;

// in webpack.config.js
const MyFirstWebpackPlugin = require('path/to/MyFirstWebpackPlugin');

// ... later in the code
plugins: [new MyFirstWebpackPlugin()];
```

> Use `webpack/lib/Compiler.js` to see all the possible hooks!

The important part of any hook is the `tapAsync` method:

```javascript
compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, cb) => {
  console.log(stats);
  debugger; // a cool tip on debugging the webpack plugin at chrome://inspect
  cb();
}));
```

Using the debugger can tell you so much about why things get tree shaken etc. You can see it in verbose in the debug console using `stats.toString("verbose")`.

A useful hook to see the outputs:

```javascript
compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, cb) => {
  const assetNames = [];
  for (let assetName in stats.compilation.assets) {
    assetName.push(assetName)
  }
  console.log(assetNames.join("\n"))
  cb();
}));
```

## Plugin Instance Hook

For hooking into another instance, we can use another hook:

```javascript
compiler.hooks.compilation.tapAsync("MyFirstWebpackPlugin", (compilation, params) => {
  const thisCompilationIWantToInspect = compilation;
  compilation.hooks.seal.tap("MyFirstWebpackPlugin", () => {
    // annoying gotcha - need to use the variable for it to show in VSCode inspector
    console.log(thisCompilationIWantToInspect)
    debugger; // we can now inspect the above
  })
}));
```

## Isolating Plugins

Everything is in memory, so there is no concept of importing `fs` from Node. There is a file `MemoryOutputFileSystem.js` that has a like of requiring memory fs.

Webpack uses an in-memory file system, simile to [memfs](https://github.com/streamich/memfs).

Something else that is cool is that you can take another plugin and use that within your plugin! You can bring your own plugins into other plugins.

## Creating a Customer Loader

```javascript
// webpack.config.js
module.exports = () => ({
  resolveLoader: {
    alias: {
      'my-loader': require.resolve('./build-utils/my-loader.js'),
    },
  },
  module: {
    reults: [
      {
        test: /\.js/,
        use: 'my-loader',
      },
    ],
  },
});

// my-loader.js
function myLoader(source) {
  debugger;
  // example Sean uses
  if (this.resource === 'path/to/file') {
    // do something with resource
  }
  return source;
}

module.exports = myLoader;
```

Something that is great, is that if you step over while the bugger is on, you'll got through all `js` files!

In the example, Sean just uses a simmple.

## Configuring Babel for Webpack

> It is important not to transpile Webpack down to CommonJS - this is a common pitfall and will cause issues for scope hoisting, tree shaking etc.

The is an option to use `"modules": false` in the Babel config to ensure Webpack isn't down-converted.
