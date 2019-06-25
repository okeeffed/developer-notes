---
menu: Design Patterns
name: Interpreter
---

# Interpreter Design Pattern

Purpose: Behavioural
Type: Class

The Interpreter Design Pattern specifies how to evaluate sentences in a string.

The idea is to have a class for each symbol. The syntax tree of a sentence in the language is an instance of the composite pattern and is used to evaluate (intrepret) the sentence for a client.

## Participants

- AbstractExpression (declares interpret method common to all nodes)
- TerminalExpression (interpret terminal symbols in the grammar)
- NonTerminalExpression (maintains instance variables of type AbstractExpression for nonterminal symbols in grammar)
- Context (info global to interpreter)
- Client (builds abstract syntax tree representing a particular sentence in the language that the grammar defines)

## Example

```typescript
class Context {
  private _input;

  constructor(input) {
    this._input = input;
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
    // process comma
    console.log('interpret terminal');
  }
}

class NoneTerminalExpression implements Expression {
  interpret(context: Context): void {
    // process variable
    console.log('interpret nonterminal');
  }
}

(function main() {
  const context: Context = new Context('1 bird can fly');
  const list = [];
  list.push(new TerminalExpression());
  list.push(new NoneTerminalExpression());

  list.map((exp: Expression) => {
    exp.interpret(context);
  });
})();
```
