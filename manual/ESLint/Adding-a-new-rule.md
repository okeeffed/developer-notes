---
name: Adding a new lint rule
menu: ESLint
---

# Adding a new lint rule

## Resources

1. [AST Explorer](https://astexplorer.net/)
2. [ESLint Docs](https://eslint.org/docs/developer-guide/working-with-rules)
3. [Extending ESLint Config](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config)
4. [Advanced Config](https://create-react-app.dev/docs/advanced-configuration/)

## Intro

The best way to do this is to jump onto AST Explorer and set `babel-eslint` for the Parser and use `ESLint` for the transform.

Add the following in:

```js
import AnotherPackage from 'ratchet';
import _ from 'lodash';
import LastPackage from 'last-package';
const _ = require('lodash');
```

## The replace function

With the above code, let's block Lodash from being used:

```js
export default function(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value === 'lodash') {
        context.report({
          node,
          message: 'Do not use Lodash',
          fix: function(fixer) {
            return fixer.replaceText(node, '');
          },
        });
      }
    },
    CallExpression(node) {
      if (
        node.callee.name === 'require' &&
        node.arguments.some(arg => arg.value === 'lodash')
      ) {
        context.report({
          node,
          message: 'Do not use Lodash',
          fix: function(fixer) {
            // node.parent.parent to replace the entire line
            return fixer.replaceText(node.parent.parent, '');
          },
        });
      }
    },
  };
}
```

## Adding to CRA

> When set to true, user provided ESLint configs will be used by eslint-loader. Note that any rules set to "error" will stop the application from building.

In a CRA app, add `.eslintrc` and add the following:

```json
{
  "eslintConfig": {
    "extends": "react-app",
    "rules": {
      "no-lodash/no-lodash": "warn"
    },
    "plugins": ["no-lodash"]
  }
}
```

Finally, to test the rule add `import _ from 'lodash'` into `src/app.jsx`.

Run `EXTEND_ESLINT=true yarn start`.
