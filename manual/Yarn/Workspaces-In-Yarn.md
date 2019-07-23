---
menu: Yarn
name: Yarn Workspaces
---

# Yarn Workspaces

Notes from this come from the official Yarn article [found here](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).

## tl;dr Key Commands

| Command                                      | Function               |
| -------------------------------------------- | ---------------------- |
| yarn config set workspaces-experimental true | Initialises Workspaces |

## Introduction

> Those who have tried splitting a project into multiple packages know how hard it is to make changes across multiple packages at one time. To make the process easier, some big projects adopted a monorepo approach, or multi-package repositories, which reduces the burden of writing code across packages.

## Lerna

- A tool to optimize workflow around managing multi-package repos.
- Being a wrapper of a package manager, Lerna can't manipulate contents of `node_modules` efficiently, hence Workspaces.

## Workspaces

Yarn Workspaces is a feature that allows users to install dependencies from multiple package.json files in subfolders of a single root package.json file, all in one go.

- Enables faster, lighter installation. Also creates symlinks between Workspaces that depend on each other, and will ensure the consistencvy and correcvtness of all directories.

## Example: Jest Workspace

```shell
| jest/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ package.json
| -------- jest-diff/
| ------------ package.json
...
```

Example root `package.json` file. Generally kept as private.

```json
{
  "private": true,
  "name": "jest",
  "devDependencies": {
    "chalk": "^2.0.1"
  },
  "workspaces": ["packages/*"]
}
```

## How yarn install works with workspaces

Take the following two packages within Jest:

```json
// First package.json
{
  "name": "jest-matcher-utils",
  "description": "...",
  "version": "20.0.3",
  "license": "...",
  "main": "...",
  "browser": "...",
  "dependencies": {
    "chalk": "^1.1.3",
    "pretty-format": "^20.0.3"
  }
}

// Second package.json
{
  "name": "jest-diff",
  "version": "20.0.3",
  "license": "...",
  "main": "...",
  "browser": "...",
  "dependencies": {
    "chalk": "^1.1.3",
    "diff": "^3.2.0",
    "jest-matcher-utils": "^20.0.3",
    "pretty-format": "^20.0.3"
  }
}
```

Running `yarn install` from anywhere within the projects yields the following:

```shell
| jest/
| ---- node_modules/
| -------- chalk/
| -------- diff/
| -------- pretty-format/
| -------- jest-matcher-utils/  (symlink) -> ../packages/jest-matcher-utils
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
...
```

> Packages like `diff`, `pretty-format` and the symlink to `jest-matcher-utils` were hoisted to the root node_modules directory, making the installation faster and smaller. The package `chalk` however could not be moved to the root because the root already depends on a different, incompatible version of `chalk`.

## Managing Dependecies

Run the installation within the desired `package`:

> Note: that Workspaces don’t have their own yarn.lock files, and the root yarn.lock contains all the dependencies for all the Workspaces. When you want to change a dependency inside a Workspace, the root yarn.lock will be changed as well as the Workspace’s package.json.
