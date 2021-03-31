---
menu: Programming Languages
name: Creating Your Own Language
---

# Creating Your Own Language

## Resources

1. [Dropbear GitHub language](https://github.com/stevekinney/dropbear/)
2. [Slides](http://static.frontendmasters.com/resources/2019-05-31-build-your-own-programming-language/programming-language.pdf)

## Why your own language?

There are elements that are super practical for production code.

### Use Cases

1. Domain-Specific Languages: Terraform, Gemfiles
2. Templating languages: Handlebars, Pug

### Usecases at SendGrid

- Drag + Drop editor takes HTML, parses it into an abstract syntax tree (AST) and manipulates it before serializing it back into HTML.
- Using it for own bespoke templating language for dynamic email templates.
- Sync position in side-by-side editor by breaking HTML into an AST and rewriting the elements with information about their position in the text editor.

## What is a compiler?

> Something that turns a higher-level language into a lower-level langauge.

In this particular example, we will follow the course that builds the language `Dropbear`.

- Lisp-like language
- Leverage existing JavaScript run-time

```s
(add 1 2 (subtract 6 3))
```

> Source code is meant to be human-readable.

> The beauty of Scheme is that the full language only needs
> 5 keywords and 8 syntactic forms. In comparison, Python
> has 33 keywords and 110 syntactic forms, and Java has 50
> keywords and 133 syntactic forms. — Peter Norvig.

### Inspiration Resources

- https://norvig.com/lispy.html
- https://eloquentjavascript.net/12_language.html
- https://github.com/jamiebuilds/the-super-tiny-compiler

## Stages of a Compiler

1. Parsing: Take source code and turn it into representation of that code.
2. Transformation: Take source code and transforms it to do whatever the compiler wants it to do.
3. Generation: Take the transformed representation and turns it into a new string of code.

## Parsing

Parsing consists of:

1. `Lexical analysis`
2. `Syntactic analysis`

Note: Lexing = Lexical analysis.

Basically: take big string of code and turn it into `tokens` where a `token` is a small unit of the language.

How might a lexer work?

- Accept input string of code
- Create var for tracking position (like cursor)
- Make an array of tokens
- Write a while loop that iterates through the source code input
- Check each token, see if matches type
- Add it to the array of token

### Using helpers

This is an example of helpers, but it is worth writing them early and often.

```javascript
const isWhitespace = character => /\s/.test(character);
const isNumber = character => /[0-9]/.test(character);
const isOperator = character => /[\+\-\*\/]/.test(character);
```

### Turning strings to tokens

Note that based on our syntax, we may need to collect multiple characters into a single token ie `22 + 23` (which tokenizes as `['2','2','+','2','3']`)

We write a `tokenize` function that takes these helpers for us to tokenize the code that we are parsing.

```javascript
const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = input => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      let number = character;

      while (isNumber(input[++cursor])) {
        number += input[cursor];
      }

      tokens.push({
        type: 'Number',
        value: parseInt(number, 10),
      });

      continue;
    }

    if (isLetter(character)) {
      let symbol = character;

      while (isLetter(input[++cursor])) {
        symbol += input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: symbol,
      });

      continue;
    }

    if (isQuote(character)) {
      let string = '';

      while (!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      tokens.push({
        type: 'String',
        value: string,
      });

      cursor++;
      continue;
    }

    throw new Error(`${character} is not valid`);
  }

  return tokens;
};

module.exports = { tokenize };
```

> String traversal and string manipulation in JavaScript is really fast.

## Building an AST

How could we build an AST?

1. Iterate through the array of tokens.
2. For each number, string, etc. add that token to same level of the tree.
3. For each `CallExpression` (e.g. function) collect the parameters and then recurse down into the function body.

Babel is kind of the de facto standard for the AST, so it is worth being able to parse our tokens into a format that Babel can handle.

```javascript
// identify.js
const LETTER = /[a-zA-Z]/;
const WHITESPACE = /\s+/;
const NUMBER = /^[0-9]+$/;
const OPERATORS = ['+', '-', '*', '/', '%'];

const isLetter = character => LETTER.test(character);

const isWhitespace = character => WHITESPACE.test(character);

const isNumber = character => NUMBER.test(character);

const isOpeningParenthesis = character => character === '(';

const isClosingParenthesis = character => character === ')';

const isParenthesis = character =>
  isOpeningParenthesis(character) || isClosingParenthesis(character);

const isQuote = character => character === '"';

const isOperator = character => OPERATORS.includes(character);

module.exports = {
  isLetter,
  isWhitespace,
  isNumber,
  isOpeningParenthesis,
  isClosingParenthesis,
  isParenthesis,
  isQuote,
  isOperator,
};

// utilities.js
const tap = require('lodash/tap');

const pipe = (...funcs) => value =>
  funcs.reduce((value, func) => func(value), value);

const log = value => tap(value, console.log);

const peek = array => array[0];
const pop = array => array.shift();

module.exports = {
  pipe,
  log,
  peek,
  pop,
  tap,
};

// parse.js
const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');

const parenthesize = tokens => {
  const token = pop(tokens);

  if (isOpeningParenthesis(token.value)) {
    const expression = [];

    while (!isClosingParenthesis(peek(tokens).value)) {
      expression.push(parenthesize(tokens));
    }

    pop(tokens);
    return expression;
  }

  return token;
};

const parse = tokens => {
  if (Array.isArray(tokens)) {
    const [first, ...rest] = tokens;
    return {
      type: 'CallExpression',
      name: first.value,
      arguments: rest.map(parse),
    };
  }

  const token = tokens;

  if (token.type === 'Number') {
    return {
      type: 'NumericLiteral',
      value: token.value,
    };
  }

  if (token.type === 'String') {
    return {
      type: 'StringLiteral',
      value: token.value,
    };
  }

  if (token.type === 'Name') {
    return {
      type: 'Identifier',
      name: token.value,
    };
  }
};

module.exports = { parse: tokens => parse(parenthesize(tokens)) };
```

## REPL

> Read-Evaluation-Print-Loop

We are going to build a REPL + CLI tool that you could expand.

Notes for this REPL:

1. We're been using functions like add and subtract, but what do
   those mean?
2. Above and beyond having a syntax, most languages have some
   amount of a standard library of built-in functions, objects, and
   methods.
3. We’re leveraging JavaScript’s built-in numbers and arrays, but
   we’re going to need some functions too.

Since JavaScript is our compile target, we’ll implement our
built-in functions as JavaScript functions.

We will add what we need to our `standard-library.js` code:

```javascript
const all = fn => (...list) => list.reduce(fn);

const add = all((a, b) => a + b);
const subtract = all((a, b) => a - b);
const multiply = all((a, b) => a * b);
const divide = all((a, b) => a / b);
const modulo = all((a, b) => a % b);
const log = console.log;

const environment = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  log,
  pi: Math.PI,
  max(...args) {
    return Math.max(...args);
  },
};

module.exports = { environment };
```

Then for the REPL `evaluate.js`:

```javascript
const { environment } = require('./standard-library');
const last = collection => collection[collection.length - 1];

const apply = node => {
  const fn = environment[node.name];
  const args = node.arguments.map(evaluate);
  if (typeof fn !== 'function') {
    throw new TypeError(`${node.name} is not a function`);
  }
  return fn(...args);
};

const getIdentifier = node => {
  if (environment[node.name]) return environment[node.name];
  throw new ReferenceError(`${node.name} is not defined`);
};

const define = node => {
  environment[node.identifier.name] = node.assignment.value;
};

const evaluate = node => {
  if (node.type === 'VariableDeclaration') return define(node);
  if (node.type === 'CallExpression') return apply(node);
  if (node.type === 'Identifier') return getIdentifier(node);
  if (node.value) return node.value;
};

module.exports = { evaluate };
```

### Building the REPL

We can create a`repl.js` file to help run a REPL:

```javascript
const { prompt } = require('inquirer');
const chalk = require('chalk');

const { parseAndEvaluate } = require('./parse-and-evaluate');

const askQuestions = () => {
  const questions = [
    { name: 'COMMAND', type: 'input', message: chalk.blue('>') },
  ];

  return prompt(questions);
};

const repl = async () => {
  try {
    const answers = await askQuestions();
    const { COMMAND } = answers;

    if (COMMAND.trim()) {
      console.log(chalk.yellow(parseAndEvaluate(COMMAND)));
    }
  } catch (error) {
    console.error(error);
  }

  repl();
};

if (require.main === module) {
  console.log(
    chalk.red(
      `Welcome to the ${chalk.bgYellow('Dropbear')} Programming Language`,
    ),
  );
  repl();
}

module.exports = repl;
```

## Generation

> Parsing, in reverse.

For generation, you have a few options:

1. Write your own low-level CPU-instruction compiler (probably a bad idea).
2. Use a compiler framework like LLVM (Rust, Swift, Objective-C).
3. Target the JVM.
4. Transpile to another language.

If you can get yourself to a Babel-compliant AST, then you can use another tool off the shelf like Babel generator.

```javascript
import generate from '@babel/generator';

generate(ast, options, code);
```

We need to transform a AST that you currently have to one that Babel can understand.

### Visitor Pattern

Basically a depth-first search through the tree. The Visitor Pattern allows us define different types of actions for each node visited as it walks the tree.

```javascript
import traverse from '@babel/traverse';

traverse(ast, {
  enter(path) {
    if (path.node.type === 'VariableDeclaration' && path.node.kind === 'var') {
      path.node.kind = 'let';
    }
  },
});
```

The traversal implementation that we put into the app:

```javascript
const traverseNode = ({ node, parent, visitor }) => {
  const methods = visitor[node.type];

  if (methods && methods.enter) {
    methods.enter({ node, parent });
  }

  if (node.arguments) {
    traverseArray({ array: node.arguments, parent: node, visitor });
  }

  if (methods && methods.exit) {
    methods.exit({ node, parent });
  }
};

const traverseArray = ({ array, parent, visitor }) => {
  array.forEach(node => {
    traverseNode({ node, parent, visitor });
  });
};

const traverse = (node, visitor) => {
  traverseNode({ node, visitor });
};

module.exports = { traverse };

// during visitor implementation
// const visitor = {
//   VariableDeclaration: {
//     enter({ node, parent }) {},
//     exit() {}
//   }
// }
```

This is how we can implement this into JS:

```javascript
const generate = require('@babel/generator').default;
const { traverse } = require('./traverse');

const babelVisitor = {
  CallExpression: {
    enter({ node }) {
      node.callee = { type: 'Identifier', name: node.name };
    },
  },
  VariableDeclaration: {
    enter({ node }) {
      node.kind = 'let';
      node.declarations = [
        {
          type: 'VariableDeclarator',
          id: node.identifier,
          init: node.assignment,
        },
      ];
    },
  },
};

const toJavaScript = ast => {
  traverse(ast, babelVisitor);
  return generate(ast).code;
};

module.exports = {
  toJavaScript,
};
```

## Bonus Terms

- Homoiconicity: A language that can modify its own underlying data structure.
- Self-Hosting: The language is written in the language itself.
