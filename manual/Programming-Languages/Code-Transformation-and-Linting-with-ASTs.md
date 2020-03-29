---
menu: Programming Languages
name: Code Transformation and Lintings with ASTs
---

# Code Transformation and Lintings with ASTs

## Resources

1. [FE Masters Course](https://frontendmasters.com/courses/linting-asts/)
2. [Workshop Git Repo](https://github.com/kentcdodds/asts-workshop)
3. [Workshop Slides](https://slides.com/kentcdodds/asts-workshop#/)
4. [Module Resolver](https://openbase.io/js/babel-plugin-module-resolver)
5. [AST Explorer in JS](https://astexplorer.net/#/gist/fc5316331bd7d36af6ce9b23c5e5d861/latest)
6. [JS AST Visualizers](https://resources.jointjs.com/demos/rappid/apps/Ast/index.html)
7. [ESLint Context Object](https://eslint.org/docs/developer-guide/working-with-rules#the-context-object)
8. [Babel plugins](https://babeljs.io/docs/en/babel-types)
9. [Babel codemod](https://github.com/codemod-js/codemod)

## Introduction

This chat is about Abstract Syntax Trees and why that is important.

If you want to follow the workshop, run the following:

```shell
git clone https://github.com/kentcdodds/asts-workshop.git
cd asts-workshop
yarn run setup --silent
node scripts/autofill-feedback-email.js YOUR_EMAIL@DOMAIN.COM
git commit -am "ready to go"
```

## Examples of ASTs

Babel enhances the dev experience AND user experience by enables syntax to transform to something useful. An example is the module resolver babel transformer.

ESLint is a linter for JS, and can be very plugable. The example he shows is `eslint-plugin-import` that ensures that paths resolve during imports.

Codemods are better than find/replace. You can use them for things that transfer from things like one test framework to another etc.

## ASTs

ASTs for JavaScript are basically just one big JS object. The resources given for the explorer and visualizer are great tools to understand how ASTs work.

For JavaScript, the course will use `espree`.

### ESLint

This is great for style issues but also logical issues.

The example we are doing in the `astexplorer` uses `babel-eslint` with a Transformation turned on.

The example here is to ensure all if statements have a block.

```javascript
// invalid
if (something > 3) console.log('something is greather than three');

// valid
if (something > 3) {
  console.log('something is greather than three');
}
```

ESLint uses the Visitor pattern. This pattern makes it easier for you to traverse your AST.

Without the Visitor pattern, you need to know every Node type and there is a lot of complexity. Visitor allows us to say "we only care about this Node type". With the visitor pattern, we only need to specific the node type that we care about. In this case, it will be `IfStatement`.

As for the ESLint function, we end up with this.

```javascript
module.exports = {
  meta: {
    docs: {
      descripton: 'disallow IfStatements without blocks',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    return {
      // visitor
      IfStatement(node) {
        console.log(node);
      },
    };
  },
};
```

With the above code, we will log out the two Nodes for the two if statements in our code block we are testing.

For our example, we can see the `consequent` are different. One is a `BlockStatement`, the other is a `BinaryExpression`.

To ensure we have the block statement, we can update our code for the following:

```javascript
module.exports = {
  meta: {
    docs: {
      descripton: 'disallow IfStatements without blocks',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    return {
      // visitor
      IfStatement(node) {
        if (node.consequent.type === 'BlockStatement') {
          return;
        }
        context.report({
          node: node,
          message: 'y u no block',
        });
      },
    };
  },
};
```

Running this is the AST Explorer will show us the problem! If we want it to be covering `else` statements as well, we need to update the `consequent` and the `alternate`.

> Note: The context is the ESLint API. See [ESLint docs](https://eslint.org/docs/developer-guide/working-with-rules#the-context-object) for more info.

```javascript
module.exports = {
  meta: {
    docs: {
      descripton: 'disallow IfStatements without blocks',
      category: 'Stylistic Issues',
      recommended: true,
    },
    fixable: 'code',
    schema: [], // no options
  },
  create(context) {
    return {
      // visitor
      IfStatement(node) {
        if (isBlock(node.consequent) && isBlock(node.alternate)) {
          return;
        }

        if (!isBlock(consequent)) {
          context.report({
            node: node,
            message: 'y u no block',
          });
        } else (!isBlock(alternate)) {
          context.report({
            node: node,
            message: 'y u no block',
          });
        }
      },
    };
  },
};

function isBlock(node) {
  if !node || node.block === 'BlockStatement'
}
```

## Making a plugin

With the provided code, you can write test code using `RuleTester` from `eslint`.

An example:

```javascript
const { RuleTester } = require('eslint');
const rule = require('./01_eslint');

const ruleTester = new RuleTester();
ruleTester.run('no-console', rule, {
  valid: ['foo.console()', 'console()', 'info()'],
  invalid: [
    {
      code: `console.log()`,
      errors: [
        {
          message: 'Using console is not allowed',
          type: 'MemberExpression',
        },
      ],
    },
  ],
});
```

The code to make this pass:

```javascript
module.exports = {
  meta: {
    docs: {
      description: 'Disallow use of console',
      category: 'Best Practices',
      recommended: true,
    },
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (node.object.name === 'console') {
          context.report({
            node,
            message: 'Using console is not allowed',
          });
        }
      },
    };
  },
};
```

[TODO - add the other challenges + solutions]

## Babel Plugin and AST

Again from the AST explorer, we are using the parser `babylon6` and transformer `babelv6`.

Babel plugins will be transformed by Babel, so you can use whatever the babelrc is configured with. For babel, we export a function that is called with a utility library.

[Here is a list](https://babeljs.io/docs/en/babel-types) of the `types` that Babel has. It can really useful for Babel plugins.

The below code can be logged just to understand more about the `RegExpLiteral` path that we will be using to parse our code and hoist the RegExpLiteral.

```javascript
// base code
getVersion('3.4.5');

function getVersion(versionString) {
  const versionRegex = /(\d+)\.(\d+)\.(\d+)/;
  const [, major, minor, patch] = versionRegex.exec(versionString);
  return { major, minor, patch };
}

// babel plugin code
export default function(babel) {
  const { types: t } = babel;

  return {
    name: 'regexHoister', // not required
    visitor: {
      // visitor
      RegExpLiteral(path) {
        const newIdentifier = path.scope.generateUidIdentifier();
        // we'll see a new Node from this
        console.log(newIdentifier);
      },
    },
  };
}
```

What we want to do is find any `RegExpLiteral` and hoist it. Luckily for us, Babel `types` allow us to create new nodes. The code will end up like the following:

```javascript
// babel function
export default function(babel) {
  const { types: t } = babel;

  return {
    name: 'regexHoister', // not required
    visitor: {
      // visitor
      RegExpLiteral(path) {
        console.log(path.parent.id.name); // the name of the variable from the tree want versionRegex
        // arg can help name generated ID.
        // Babel also understands scope of entire file to ensure no clashes.
        const newIdentifier = path.scope.generateUidIdentifier(
          path.parent.id.name,
        );
        // we'll see a new Node from this
        console.log(newIdentifier);
        const variableDeclaration = t.variableDeclaration('const', [
          t.variableDeclarator(newIdentifier, path.node),
        ]);
        path.scope.rename;
        console.log(variableDeclaration);
        const program = path.findParent(t.isProgram);
        // if you want to see the program itself!
        console.log(program.node.body);
        program.node.body.unshift(variableDeclaration);
        path.parentPath.remove();
      },
    },
  };
}

// takes this...
getVersion('3.4.5');

function getVersion(versionString) {
  const versionRegex = /(\d+)\.(\d+)\.(\d+)/;
  const [, major, minor, patch] = versionRegex.exec(versionString);
  return { major, minor, patch };
}

// and transforms it to this...
const _versionRegex = /(\d+)\.(\d+)\.(\d+)/;
getVersion('3.4.5');

function getVersion(versionString) {
  const [, major, minor, patch] = versionRegex.exec(versionString);
  return { major, minor, patch };
}
```

### Example on testing for an ESLint plugin

```javascript
// the plugin
export default devPlugin;

function devPlugin({ types: t }) {
  return {
    name: 'line-plugin',
    visitor: {
      Identifier(path) {
        const {
          node: { name },
        } = path;
        if (name === '__DEV__') {
          path.replaceWith(
            t.booleanLiteral(process.env.NODE_ENV === 'development'),
          );
        }
      },
    },
  };
}

// the tests
import { stripIndent } from 'common-tags';
import * as babel from 'babel-core';
import devPlugin from './05_babel';

const env = process.env.NODE_ENV;

afterEach(() => {
  process.env.NODE_ENV = env;
});

test('transpiles __DEV__ to false', () => {
  process.env.NODE_ENV = 'production';
  const source = stripIndent`
    if (__DEV__) {
      console.log('You are in dev mode!')
    }
  `;
  const { code } = babel.transform(source, {
    babelrc: false,
    plugins: [devPlugin],
  });
  expect(code).not.toContain('__DEV__');
  expect(code).toMatchSnapshot();
});

test('transpiles __DEV__ to true', () => {
  process.env.NODE_ENV = 'development';
  const source = stripIndent`
    if (__DEV__) {
      console.log('You are in dev mode!')
    }
  `;
  const { code } = babel.transform(source, {
    babelrc: false,
    plugins: [devPlugin],
  });
  expect(code).not.toContain('__DEV__');
  expect(code).toMatchSnapshot();
});
```

## Codemods

The example of an API is when you change everything from callbacks to promises. It is an easy way to make this modification completely feasible.

For this, the parser we will use is `recast` and `jscodeshift` is the transformer.

The base code that you get for the `jscodeshift`. This transformer does not use the Visitor pattern. It is possible to use Babel, and there is a CLI tool that can use a babel transform that you can see on GitHub [here](https://github.com/codemod-js/codemod).

Codemods are designed to change the source code it uses as input.

```javascript
// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      j(path).replaceWith(
        j.identifier(
          path.node.name
            .split('')
            .reverse()
            .join(''),
        ),
      );
    })
    .toSource();
}
```
