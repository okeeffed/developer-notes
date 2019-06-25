---
menu: Design Patterns
name: Interpreter
---

# Interpreter Design Pattern

Purpose: Behavioural
Type: Class

The Interpreter Design Pattern specifies how to evaluate sentences in a string.

The idea is to have a class for each symbol. The syntax tree of a sentence in the language is an instance of the composite pattern and is used to evaluate (intrepret) the sentence for a client.

## Example

```typescript
class Context {
  private _input;

  constructor(input) {
    this._input = input;
  }

  public get input() {
    return this._input;
  }

  public set input(value) {
    this._input = value;
  }
}

interface Expression {
  interpret(context: Context): void;
}

class TerminalExpression implements Expression {
  interpret(context: Context): void {
    // process full stop
    if (context.input.includes('.')) {
      console.log('context terminal');
    }
  }
}

class NonTerminalExpression implements Expression {
  interpret(context: Context): void {
    // process if no full stop
    if (!context.input.includes('.')) {
      console.log('context nonterminal');
    }
  }
}

(function main() {
  const context: Context = new Context('1 bird can fly.');
  const list = [];
  list.push(new TerminalExpression());
  list.push(new NonTerminalExpression());

  list.map((exp: Expression) => {
    exp.interpret(context);
  });
})();
```
