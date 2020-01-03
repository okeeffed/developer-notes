---
menu: Programming Languages
name: Creating Your Own Language
---

# Creating Your Own Language

## Use Cases

1. Domain-Specific Languages: Terraform, Gemfiles
2. Templating languages: Handlebars, Pug

## Usecases at SendGrid

- Drag + Drop editor takes HTML, parses it into an abstract syntax tree (AST) and manipulates it before serializing it back into HTML.
- Using it for own bespoke templating language for dynamic email templates.
- Sync position in side-by-side editor by breaking HTML into an AST and rewriting the elements with information about their position in the text editor.

## What is a compiler?

Something that turns a higher-level language into a lower-level langauge\*.

## Todays example

In this particular example, we will follow the course that builds the language `Dropbear`.

- Lisp-like langage
- Leverage existing JavaScript run-time

```
(add 1 2 (subtract 6 3))
```

## Inspiration Resources

- https://norvig.com/lispy.html
- https://eloquentjavascript.net/12_language.html
- https://github.com/jamiebuilds/the-super-tiny-compiler

## Stages of a Compiler

1. Parsing: Take source code and turn it into representation of that code.
2. Transformation: Take source code and transforms it to do whatever the compiler wants it to do
3. Generation: Take the transformed representation and turns it into a new string of code

## Parsing

Consists of `Lexical analysis` and `Syntactic analysis`.

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

```javascript
const isWhitespace = character => /\s/.test(character);
const isNumber = character => /[0-9]/.test(character);
const isOperator = character => /[\+\-\*\/]/.test(character);
```

### Turning strings to tokens

Note that based on our syntax, we may need to collect multiple characters into a single token ie `22 + 23` (which tokenizes as `['2','2','+','2','3']`)

```javascript
const tokenize = input => {
  let cursor = 0;
  const tokens = [];

  while (cursor < input.length) {
    // Logic here
    // Example for number helper
    if (isNumber(character))
  }

  return tokens;
};
```
