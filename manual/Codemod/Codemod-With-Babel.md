---
menu: Codemod
name: Codemod With Babel
---

# Codemod With Babel

## Resources

1. [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-transform)

## In Action

Example code to codemod:

```js
const updatedFetch = (url) =>
  new Promise((res, rej) => {
    fetch(url).then((res) => {
      if (!res.ok) {
        reject(new Error("Unexpected result"));
      }

      resolve(res.json());
    });
  });

export { updatedFetch as fetch };

// in another file
import { fetch } from "./path/to/updated/fetch";

fetch(url).then((json) => doSomething(json));

// in another file
import { fetch } from "./path/to/updated/fetch";

fetch(url).then((json) => doSomething(json));
```

Assuming we want to role back from using the `updatedFetch` function:

```js
const replacement = `{
  if (!res.ok) {
    reject(new Error('Unexpected result'))
  }

  resolve(res.json())
}`;

export default function (babel) {
  const { types: t } = babel;

  const replacementNode = babel.parse(replacement);

  console.log(replacementNode);

  return {
    name: "ast-transform", // not required
    visitor: {
      ImportDeclaration(path) {
        const hasMatch = path.container.some((container) => {
          if (container.type === "ImportDeclaration") {
            if (
              container.specifiers.some(
                (spec) => spec.imported.name === "fetch"
              )
            ) {
              return true;
            }
          }
          return false;
        });

        if (hasMatch) {
          path.remove();
        }
      },
      CallExpression(path) {
        if (path.node.callee && path.node.callee.name === "doSomething") {
          path.replaceWith(replacementNode.program.body[0]);
        }
      },
    },
  };
}
```

This converts the code to:

```js
const updatedFetch = (url) =>
  new Promise((res, rej) => {
    fetch(url).then((res) => {
      if (!res.ok) {
        reject(new Error("Unexpected result"));
      }

      resolve(res.json());
    });
  }); 
  
  // in another file

fetch(url).then((json) => {
  if (!res.ok) {
    reject(new Error("Unexpected result"));
  }

  resolve(res.json());
}); 

// in another file
import { fetch } from './path/to/updated/fetch'

fetch(url).then((json) => {
  if (!res.ok) {
    reject(new Error("Unexpected result"));
  }

  resolve(res.json());
});
```
