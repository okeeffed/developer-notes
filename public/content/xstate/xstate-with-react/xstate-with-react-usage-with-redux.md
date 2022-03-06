---
menu: XState
name: XState with React
---

# XState with React

## Simple Counter Example

This example hooks in with Redux Toolkit's `createSlice` used with React Context. This particular example comes from NextJS.

The machine itself is a contrived example using the simple `Counter`.

```tsx
import * as React from "react"
import { useMachine } from "@xstate/react"
import { createMachine } from "xstate"
import { assign } from "@xstate/immer"
import { inspect } from "@xstate/inspect"

if (typeof window !== "undefined") {
  inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    iframe: false, // open in new window
  })
}

import {
  set,
  TestContextProvider,
  useTestContext,
} from "../context/TestContext"

const counterMachine = createMachine({
  initial: "active",
  states: {
    active: {
      on: {
        INCREASE: { actions: assign((ctx) => ctx.value++) },
        DECREASE: { actions: assign((ctx) => ctx.value--) },
        SET: {
          actions: assign((ctx, { value }) => (ctx.value = value)),
        },
        RESET: { actions: assign((ctx) => (ctx.value = 0)) },
      },
    },
  },
})

function useCounterMachine() {
  const [cache, dispatch] = useTestContext()
  const [state, send, service] = useMachine(counterMachine, {
    devTools: true,
    // This allows us to hook into `useTextContext` to set the initial state
    context: cache,
  })

  React.useEffect(() => {
    // This will update out `useTestContext` store on state changes.
    const subscription = service.subscribe((state) => {
      dispatch(set(state.context.value))
    })

    return subscription.unsubscribe
    // note: service should never change
  }, [service])

  return [state, send]
}

function ExampleSection() {
  const [counterState, send] = useCounterMachine()

  return (
    <>
      <p>{counterState.context.value}</p>
      <button onClick={() => send("INCREASE")}>Increase</button>
      <button onClick={() => send("DECREASE")}>Decrease</button>
      <button onClick={() => send("SET", { value: 10 })}>Set 10</button>
      <button onClick={() => send("RESET")}>Reset</button>
    </>
  )
}

function App() {
  return (
    <TestContextProvider>
      <ExampleSection />
    </TestContextProvider>
  )
}

export default App
```

## Using createUpdater

If we want to abstract actions that are complex, we can use `createUpdater`:

```tsx
import * as React from "react"
import { useMachine } from "@xstate/react"
import { createMachine } from "xstate"
import { createUpdater } from "@xstate/immer"
import { inspect } from "@xstate/inspect"

if (typeof window !== "undefined") {
  inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    iframe: false, // open in new window
  })
}

import {
  set as setAction,
  TestContextProvider,
  useTestContext,
} from "../context/TestContext"

const increase = createUpdater("INCREASE", (ctx) => ctx.value++)
const decrease = createUpdater("DECREASE", (ctx) => ctx.value--)
const set = createUpdater("SET", (ctx, { value }) => (ctx.value = value))
const reset = createUpdater("RESET", (ctx) => (ctx.value = 0))

const counterMachine = createMachine({
  initial: "active",
  states: {
    active: {
      on: {
        [increase.type]: { actions: increase.action },
        [decrease.type]: { actions: decrease.action },
        [set.type]: { actions: set.action },
        [reset.type]: { actions: reset.action },
      },
    },
  },
})

function useCounterMachine() {
  const [cache, dispatch] = useTestContext()
  const [state, send, service] = useMachine(counterMachine, {
    devTools: true,
    // This allows us to hook into `useTextContext` to set the initial state
    context: cache,
  })

  React.useEffect(() => {
    // This will update out `useTestContext` store on state changes.
    const subscription = service.subscribe((state) => {
      dispatch(setAction(state.context.value))
    })

    return subscription.unsubscribe
    // note: service should never change
  }, [service])

  return [state, send]
}

function ExampleSection() {
  const [counterState, send] = useCounterMachine()

  return (
    <>
      <p>{counterState.context.value}</p>
      <button onClick={() => send("INCREASE")}>Increase</button>
      <button onClick={() => send("DECREASE")}>Decrease</button>
      <button onClick={() => send("SET", { value: 10 })}>Set 10</button>
      <button onClick={() => send("RESET")}>Reset</button>
    </>
  )
}

function App() {
  return (
    <TestContextProvider>
      <ExampleSection />
    </TestContextProvider>
  )
}

export default App
```

A final way to implement it to bring is to similar parity with Redux Toolkit.

```tsx
import * as React from "react"
import { useMachine } from "@xstate/react"
import { createMachine } from "xstate"
import { createUpdater, assign } from "@xstate/immer"
import { inspect } from "@xstate/inspect"

if (typeof window !== "undefined") {
  inspect({
    // options
    // url: 'https://statecharts.io/inspect', // (default)
    iframe: false, // open in new window
  })
}

import {
  set,
  TestContextProvider,
  useTestContext,
} from "../context/TestContext"

const increaseImpl = (ctx) => void (ctx.value += 1)
const decreaseImpl = (ctx) => void (ctx.value -= 1)
const setImpl = (ctx, payload) => void (ctx.value = payload.value)
const resetImpl = (ctx) => void (ctx.value = 0)

const counterMachine = createMachine({
  initial: "active",
  states: {
    active: {
      on: {
        INCREASE: { actions: assign(increaseImpl) },
        DECREASE: { actions: assign(decreaseImpl) },
        SET: { actions: assign(setImpl) },
        RESET: { actions: assign(resetImpl) },
      },
    },
  },
})

function useCounterMachine() {
  const [cache, dispatch] = useTestContext()
  console.log("@ cache", cache)
  const [state, send, service] = useMachine(counterMachine, {
    devTools: true,
    context: cache,
  })

  React.useEffect(() => {
    const subscription = service.subscribe((state) => {
      dispatch(set(state.context.value))
    })

    return subscription.unsubscribe
    // note: service should never change
  }, [service])

  return [state, send]
}

function ExampleSection() {
  const [counterState, send] = useCounterMachine()

  return (
    <>
      <p>{counterState.context.value}</p>
      <button onClick={() => send("INCREASE")}>Increase</button>
      <button onClick={() => send("DECREASE")}>Decrease</button>
      <button onClick={() => send("SET", { value: 10 })}>Set 10</button>
      <button onClick={() => send("RESET")}>Reset</button>
    </>
  )
}

function App() {
  return (
    <TestContextProvider>
      <ExampleSection />
    </TestContextProvider>
  )
}

export default App
```

## TypeScript

```ts
import { createUpdater, ImmerUpdateEvent } from "@xstate/immer"
import { createMachine } from "xstate"

interface CounterContext {
  value: number
}
type IncreaseEvent = ImmerUpdateEvent<"INCREASE">
type DecreaseEvent = ImmerUpdateEvent<"DECREASE">
type SetEvent = ImmerUpdateEvent<"SET", number>
type ResetEvent = ImmerUpdateEvent<"RESET">

const increase = createUpdater<CounterContext, IncreaseEvent>(
  "INCREASE",
  (ctx) => ctx.value++
)
const decrease = createUpdater<CounterContext, DecreaseEvent>(
  "DECREASE",
  (ctx) => ctx.value--
)
const set = createUpdater<CounterContext, SetEvent>(
  "SET",
  (ctx, { input }) => (ctx.value = input)
)
const reset = createUpdater<CounterContext, ResetEvent>(
  "RESET",
  (ctx) => (ctx.value = 0)
)

export const counterMachine = createMachine({
  initial: "active",
  states: {
    active: {
      on: {
        [increase.type]: { actions: increase.action },
        [decrease.type]: { actions: decrease.action },
        [set.type]: { actions: set.action },
        [reset.type]: { actions: reset.action },
      },
    },
  },
})
```

An alternative:

```tsx
import { assign, createUpdater, ImmerUpdateEvent } from "@xstate/immer"
import { createMachine } from "xstate"

interface CounterContext {
  value: number
}
type SetEvent = ImmerUpdateEvent<"SET", number>

const increaseImpl = (ctx: CounterContext) => void (ctx.value += 1)
const decreaseImpl = (ctx: CounterContext) => void (ctx.value -= 1)
const setImpl = (ctx: CounterContext, { input }: SetEvent) =>
  void (ctx.value = input)
const resetImpl = (ctx: CounterContext) => void (ctx.value = 0)

export const counterMachine = createMachine({
  initial: "active",
  states: {
    active: {
      on: {
        INCREASE: { actions: assign(increaseImpl) },
        DECREASE: { actions: assign(decreaseImpl) },
        SET: { actions: assign(setImpl) },
        RESET: { actions: assign(resetImpl) },
      },
    },
  },
})
```
