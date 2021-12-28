---
menu: Elixir
name: Phoenix Routing
---

# Phoenix Routing

## Useful Links

- https://hexdocs.pm/phoenix/1.4.0/routing.html

## tl;dr

### Examing Routes

```shell
mix compile # if needed
mix phx.routes
```

### Pipelines

```elixir
defmodule HelloWeb.Router do
  use HelloWeb, :router

  # ...

  scope "/" do
    pipe_through [:authenticate_user, :ensure_admin]
    forward "/jobs", BackgroundJob.Plug
  end
end
```

This means that the plugs in the `authenticate_user` and `ensure_admin` pipelines will be called before the `BackgroundJob.Plug` allowing them to send an appropriate response and call `halt()`.

### Routing

```elixir
defmodule HelloWeb.Router do
  use HelloWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", HelloWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", HelloWeb do
  #   pipe_through :api
  # end
end
```

For `get "/", PageController, :index` - `get` is a Phoenix macro which expands out to define one clause of the match/5 function. It corresponds to the HTTP verb GET. Similar macros exist for other HTTP verbs including POST, PUT, PATCH, DELETE, OPTIONS, CONNECT, TRACE and HEAD.

The first argument to these macros is the path. Here, it is the root of the application, /. The next two arguments are the controller and action we want to have handle this request. These macros may also take other options, which we will see throughout the rest of this guide.

If this were the only route in our router module, the clause of the match/5 function would look like this after the macro is expanded:

```elixir
def match(:get, "/", PageController, :index, [])
```
