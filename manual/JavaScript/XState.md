---
menu: JavaScript
title: State Machines in JavaScript with XState
---

# State Machines in JavaScript with XState

This comes from the State Machines course on Frontend Master. Please support the course.

## Resources

1. [State Machines course](https://frontendmasters.com/courses/xstate/introduction/)
2. [Course repo](https://github.com/davidkpiano/frontend-masters-xstate-workshop)
3. [Slides](https://static.frontendmasters.com/resources/2020-05-14-state-machines-xstate/state-machine-xstate.pdf)

The aim of this workshop is to understand state machines with no libraries before moving on.

## Bottom Up Code

The example here has a button with an event listener added. This is generally how we work: we put all of our application logic inside of the event handlers themselves.

The issue with the event handler mentioned is that multiple clicks run, we could continually be refetching data.

Now the application lives inside the applicatin handlers, which is not what we want. This style of coding to "just get it done" is considered **bottom up**.

It makes it:

- Difficult to test.
- Difficult to understand.
- Will contain bugs.
- Difficult to enhance.
- Features make it worse.

## Why use state machines and statecharts?

1. Visualized modelling
2. Precise diagrams
3. Automatic code generation
4. Comprehensive test coverage
5. Accomodation of late-breaking requirements changes

> The benefit of the diagrams gives the logic in completeness. This is great for those who are seeing this without a technical background.

## Graphs

This section speaks to graph theory.

The part on directed graphs speaks on the terms of "source", "transfer" and "sink" nodes.

## Finite State Machines

A kind of directed graph consider a quintuple (five important parts).

There is an example of going through the lifecycle of a JavaScript Promise. It speaks to the transition states.

The parts of the state machine:

1. Finite states
2. Transitions
3. Events (labelled on edges/transitions)
4. Initial state (all FSMs start with this) - there is a dot to represent a "pseudo-transition" in the graphs.
5. Final states (not to be covered too much)

## An entry example

To model the states, the example uses a function for `transition` to model the Promise with a switch statement that switches on the `state`.

It has switches within switches in this example, and some odd representations, but the idea is that it always covered all possible states.

As for using an object instead of a switch:

```js
const machine = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: 'pending'
      }
    },
    pending: {
      on: {
        RESOLVE: 'resolved',
        REJECT: 'reject'
      }
    }
    resolved: {},
    rejected: {}
  }
}

function transition(state,event) {
  return machine
    .states[state]?
    .on?.[event]
    || state
}
```

Interpreting state machines:

```js
// keep track of state
let currentState = machine.initial;

// receive events
function send(event) {
  // Determine the next state
  const nextState = transition(currentState, event);

  // Update the current state
  currentState = nextState;
}

// Send some event
send('CLICK');
```

## XState

Simplifies the issues with adding/cleaning up listeners + far more.

```s
npm i xstate
```

Using it in the file:

```js
import { createMachine } from 'xstate';

const feedbackMachine = createMachine({
  initial: 'question',
  states: {
    question: {
      // transitions:
      on: {
        CLICK_GOOD: 'thanks',
        CLICK_BAD: 'form',
      },
    },
    form: {
      // transitions
      on: {
        SUBMIT: {
          target: 'thanks',
        },
      },
    },
    thanks: {
      // ...
      on: {
        CLOSE: 'closed',
      },
    },
    closed: {
      // Setting final node
      type: 'final',
    },
  },
});

// Note, the following is long-hand
const feedbackMachine = createMachine({
  states: {
    on: {
      SUBMIT: {
        target: 'thanks',
      },
    },
  },
});
// ... for ...
createMachine({
  states: {
    on: {
      SUBMIT: 'thanks',
    },
  },
});

// initial state
const initialState = feedbackMachine.initialState;

// An `event` is an object with a `type`
const clickGoodEvent = {
  type: 'CLICK_GOOD',
};

// An event object with payload
const submitEvent = {
  type: 'SUBMIT',
  feedback: 'Very good, thank you',
};

const nextState = feedbackMachine.transition(
  feedbackMachine.initialState,
  clickGoodEvent,
);
```

Events are objects so we can pass in custom payloads.

## Interpret function

Creates a service: a running instance of a machine.

```js
import { createMachine, interpet } from 'xstate';

// omitted set up feedbackMachine

const feedbackService = interpret(feedbackMachine);

feedbackService.onTransitin(state => {
  console.log(state);
});

feedbackService.start();

// when you're done for clanup
feedbackService.stop();
```

## Visualize

One of the benefits of XState is that you can visualize the machine!

## XState Actions

1. Transition actions: Moving between states
2. Entry actions: Entering into state
3. Exit actions: Exiting state

The `Action order` will go `exit`, `transition`, then `entry`. **We do not want to rely on action order too much.**

These actions when added could look like this:

```js
const enterActive = () => console.log('Enter')

const transitionActive = () => console.log('Transition')

const exitActive = () => console.log('Exit')

const enterInctive = () => console.log('Enter inactive')

const feedbackMachine = createMachine({
  states: {
    entry: enterActive
    on: {
      CLICK: {
        target: 'thanks',
        action: transitionActive
      },
    },
    exit: exitActive
  },
});
```

You could pass multiple actions as an **array**. Remember: **do not rely on order**.

We can also pass the actions in the second argument to `createMachine`:

```js
const feedbackMachine = createMachine(
  {
    states: {
      entry: ['enterActive', 'sendTelemetry'],
      on: {
        CLICK: {
          target: 'thanks',
          action: 'transitionActive',
        },
      },
      exit: 'exitActive',
    },
  },
  {
    actions: {
      enterActive: () => console.log('Enter'),
      sendTelemetry: () => console.log('sendTelemetry'),
      transitionActive: () => console.log('Transition'),
      exitActive: () => console.log('Exit'),
      enterInctive: () => console.log('Enter inactive'),
    },
  },
);
```

### Context + Assignment

```js
import {createMachine, assign} from 'xstate'

const feedbackMachine = createMachine(
  {
    initial: 'entry',
    context: {
      count: 0
    }
    states: {
      // prefer this object syntax
      // to wholesale function syntax
      entry: assign({
        count: (context, event) => {
          return context.count + 1
        }
      })
      on: {
        CLICK: {
          target: 'thanks',
          action: 'transitionActive',
        },
      },
      exit: 'exitActive',
    },
  },
}
```
