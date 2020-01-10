---
menu: Webpack
name: Building A Webpack Plugin
---

# Building A Webpack Plugin

## Resources

1. [This DEV.to article on removing logs using a plugin](https://dev.to/royal_bhati/write-your-first-webpack-plugin-20fh)

## Building A Plugin To Compile Tokens

This project enables us to look for `.tokens.json` files and compile the file tokens that we want.

## Hello, World!

Touch a new file to use for the plugin. Below is an example taken from resource (1).

```typescript
//logRemover.ts

module.exports = class RemoveLogs {
  // not needed but can be used for params taken by plugin
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    console.log('Hello from the new plugin');
  }
};
```

In our example, we just need the following:

```typescript
module.exports = class CompileDesignTokens {
  apply(compiler) {
    console.log('Hello from the new plugin');
  }
};
```

[TODO: Finish example (Jan 8th 2020)]
