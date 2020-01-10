---
menu: Lerna
name: Getting Started With Lerna
---

# Getting Started With Lerna

## Resources

1. [Github Tutorial](https://github.com/reggi/lerna-tutorial)
2. [Moving from multiple repos to Lerna](https://hackernoon.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-d0fff3538c7e)
3. [DEV.to article on TS + Lerna](https://dev.to/shnydercom/monorepos-lerna-typescript-cra-and-storybook-combined-4hli)

## tl;dr

```bash
mkdir hello-lerna
cd hello-lerna
yarn init -y
yarn add --global lerna

# init lerna with cli tool
lerna init

# make a packages directory with each of your packages
mkdir packages

# make a few packages for the example
mkdir packages/package-one
mkdir packages/package-two
mkdir packages/package-three

# yarn init all packages and generate a basic file for each
cd packages/package-one && yarn init -y && touch index.js
cat > index.js << EOT
module.exports = {
  value: 1
}
EOT
cd ../package-two && yarn init -y && touch index.js
cat > index.js << EOT
module.exports = {
  value: 2
}
EOT
cd ../package-three && yarn init -y && touch index.js
cat > index.js << EOT
var one = require('package-one')
var two = require('package-two')
console.log(one + two)
EOT

# head back to the root of the project
cd ../..
```

Now we update `packages/package-three/package.json` to include our other two dependencies:

```
{
  "dependencies": {
    "package-one": "0.1.0",
    "package-two": "0.1.0"
  }
}
```

If we now run `lerna bootstrap` we can link up all the packages.

If we now run `node ./packages/pacakge-three/index.js` we should see `3` in the console!

## What is it?

From resource (1):

Lerna is a tool that allows you to maintain multiple npm packages within one repository.

There's a couple of benefits to this kind of approach, the paradigm is called a monorepo, and more can be read about it from the source of babel, and react.

Here's the gist:

- Single lint, build, test and release process.
- Easy to coordinate changes across modules.
- Single place to report issues.
- Easier to setup a development environment.
- Tests across modules are ran together which finds bugs that touch multiple modules easier.
