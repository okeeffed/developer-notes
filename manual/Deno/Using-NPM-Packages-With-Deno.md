---
menu: Deno
title: Using NPM Packages with Deno
---

# Using NPM Packages with Deno

## Resources

1. [Pika](https://www.pika.dev/)
2. [Deno](https://deno.land/)

## Example with XState

Head to [Pika](https://pika.dev) and search for your package. If it supports ES modules, you may be in luck!

Here is an example with XState:

```ts
import { Machine, interpret } from 'https://cdn.skypack.dev/xstate';

type State = {
  value: string;
};

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = Machine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});

// Machine instance with internal state
const toggleService = interpret(toggleMachine)
  .onTransition((state: State) => console.log(state.value))
  .start();
// => 'inactive'

toggleService.send('TOGGLE');
// => 'active'

toggleService.send('TOGGLE');
// => 'inactive'
```
