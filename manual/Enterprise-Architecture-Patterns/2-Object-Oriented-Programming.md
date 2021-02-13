---
menu: Enterprise Architecture Patterns
name: Object Orientated Programming
---

# Object Orientated Programming

## TypeScript vs JavaScript

> "TypeScript is better at communicating intention."

The examples given are EMCAScript prototype equivalent of create a factory function and adding to the prototype.

**It reduces complexity through meaningful signalling of communication.**

## Feature Complexity

> Adopt a beginner's mindset.

When you programming, what is it that you do?

1. Describing things (data structures)
2. Performing actions (functions)
3. Making decisions (conditionals)
4. Repeating via iteration (iterators)

> The instructor refers to Salt, Fat, Acid, Heat as the four fundamentals on cooking being the simplistic breakdown of what we do.

## Object Modelling as Nouns

A major painpoint of complexity is that a person has not properly mapped out the domain model for what they are trying to describe.

You MUST get your domain model correct.

The session talks to objects and how interfaces are "contracts" to describe the object shape.

## Methods as Verbs

Object can do things.

We want to describe what a function does.

In this lesson, a `Store` is defined for the `Client` object as `ClientStore` which is a class that hosts methods to work on the clients, and also stores the clients and stores the "current client".

Things to note from the class:

```ts
interface Client {
	id: number
	name: string
}

interface ClientState {
  clients: Client[],
  currentClient: Client
}

class ClientStore {
  #state: ClientState

  constructor(state: ClientState) {
    this.#state = state
  }

  getState(): ClientState {
    return this.#state
  }

  select(key: keyof ClientState)  {
    return this.#state[key];
  }
}

const clients: Client[] = [{
	id: 1,
	name: 'Dennis'
}, {
	id: 2,
	name: 'Bob'
}]

const clientState: ClientState = {
	clients,
	currentClient: clients[0]
}

const clientStore = new ClientStore(clientState)
console.log(clientStore.select('currentClient'))
```

Note: I am using the TS `#` pound to create "true privacy".
