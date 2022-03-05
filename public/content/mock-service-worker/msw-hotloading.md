---
menu: Mock Service Worker
name: MSW Hotloading
---

# MSW Hot loading

The `index` file:

```ts
export const init = () => {
  if (process.env.NODE_ENV === "development") {
    if (typeof window === "undefined") {
      const { server } = require("mocks/server")
      server.listen()

      if (module.hot) {
        module.hot.accept("pages/_app.tsx", () => {
          server.resetHandlers()
        })
      }
    } else {
      const { worker } = require("mocks/browser")
      worker.start()

      if (module.hot) {
        module.hot.accept("pages/_app.tsx", () => {
          worker.resetHandlers()
        })
      }
    }
  }
}
```
