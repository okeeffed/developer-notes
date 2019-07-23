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
