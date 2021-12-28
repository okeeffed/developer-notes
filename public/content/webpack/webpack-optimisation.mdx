---
menu: Webpack
name: Webpack Optimisation
---

# Webpack Optimisation

## Loader targeting

Apply loaders to the minimal number of modules necessary.

```javascript
// instead of...
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};

// try using the include target
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      }
    ]
  }
};
```

## Bootstrap

Each additional loader/plugin has a bootup time. Try to use as few tools as possible.

## Resolving

The following can increase resolving speed:

- Minimize the number of items in `resolve.modules`, `resolve.extensions`, `resolve.mainFiles`, `resolve.descriptionFiles`, as they increase the number of filesystem calls.
- Set `resolve.symlinks: false` if you don't use symlinks (eg `npm link` or `yarn link`).
- Set `resolve.cacheWithContext: false` if you use custom resolving plugins, that are not context specific.

## Dlls

Use the `DllPlugin` to move code that is changes less frequently into a separate compilation. This will improve app compilation speed, although it does increase complexity of the build process.

## Smaller = Faster

Decrease the total size of the compilation to increase build performance. Try to keep chunks small.

- Use fewer/smaller libs
- Use the `SplitChunksPlugin` in Multi-Page Applications
- Use the `SplitChunksPlugin` in `async` mode in Multi-Page Applications
- Remove unused code
- Only compile the part of the code you are currently developing on

## Worker Pool

The `thread-loader` can be used to offload expensive loaders to a worker pool.

> Don't use too many loaders. There is a boot overhead for the Node.js runtime and the loader. Minimize the module transfers between worker and main process. IPC is expensive.

## Persistent Cache

Enable persistent caching with the `cache-loader`. Clear cache directory on "postinstall" in `package.json`.

## Custom plugins/loaders

Profile them to not introduce a performance problem here.

## Incremental Builds

Use watch mode. Specifically Webpack's.

If CPU overloads due to poling mode, you can increase the polling interval with `watchOptions.poll`.

## Compile in Memory

Following utils improve performance by compilin and serving assets in memory rather than writing to disk:

- `webpack-dev-server`
- `webpack-hot-middleware`
- `webpack-dev-middleware`

## Devtool

Be aware of the performance differences between the different devtool settings.

- "eval" has the best performance, but doesn't assist you for transpiled code.
- The `cheap-source-map` variants are more performant if you can live with the slightly worse mapping quality.
- Use a `eval-source-map` variant for incremental builds.
  => In most cases, `cheap-module-eval-source-map` is the best option.

[TO FINISH => up to https://webpack.js.org/guides/build-performance/#minimal-entry-chunk]
