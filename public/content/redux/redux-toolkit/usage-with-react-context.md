---
name: Usage With React Context
menu: Redux Toolkit
---

# Usage With React Context

This is a demo of React Context with Redux Toolkit.

## Resources

1. [Blog inspired](https://www.valentinog.com/blog/use-reducer/)

## Example

```tsx
import * as React from "react"
import { createSlice } from "@reduxjs/toolkit"

const ExampleCacheContext = React.createContext()

const initialState = {
  value: 0,
}
const exampleCacheSlice = createSlice({
  name: "exampleCache",
  reducers: {
    increase: (state) => void (state.value += 1),
    decrease: (state) => void (state.value -= 1),
  },
  initialState: initialState,
})

const { increase, decrease } = exampleCacheSlice.actions
const exampleCacheReducer = exampleCacheSlice.reducer

function ExampleCacheProvider(props) {
  const [cache, dispatch] = React.useReducer(exampleCacheReducer, initialState)
  const value = [cache, dispatch]

  return <ExampleCacheContext.Provider value={value} {...props} />
}

function useExampleCache() {
  const context = React.useContext(ExampleCacheContext)
  if (!context) {
    throw new Error("Requires ExampleCacheProvider")
  }

  return context
}

function ExampleSection() {
  const [cache, dispatch] = useExampleCache()

  return (
    <>
      <p>{cache.value}</p>
      <button onClick={() => dispatch(increase)}>Increase</button>
      <button onClick={() => dispatch(decrease)}>Decrease</button>
    </>
  )
}

function App() {
  return (
    <ExampleCacheProvider>
      <ExampleSection />
    </ExampleCacheProvider>
  )
}

export default App
```
