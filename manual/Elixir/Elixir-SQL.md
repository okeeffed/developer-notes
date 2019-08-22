---
menu: Elixir
name: Elixir SQL
---

# Elixir SQL

To do this, we use another Open Source project named Ecto.

## Model File for Postgres

```elixir
defmodule Discuss.Topic do
  use Discuss.Web, :model

  # required for model file
  schema "topics" do
    field :title, :string
  end

  # second requirement
  def changeset(struct, params \\ %{}) dp
    struct
    |> cast(params, [:title])
    |> validate_required([:title])
  end
end
```

Validation in Phoenix is a little more challenging than it needs to be.

### The Elixir Pattern

- Struct: A hash that contains some data. Represents a record (or a record we want to save) in the database
- Params: A hash that contains the properties we want to update the struct with
- cast: produces a changeset (comes from inside of Phoenix)
- validators: adds errors to changeset

The changeset is the object that records the updates in our database that we need to make to take what it is right now (struct) to what it needs to be (params).

### More On Changesets

Note that `params \\ %{}`

## Ecto.Changeset

## Ecto.Repo

Ecto is responsible with all the `Repo` module that is responsible for all conversations with the database.

```elixir
def create(conn, %{"topic" => topic}) do
  changeset = Topic.changeset(%Topic{}. topic)

  case Repo.insert(changeset) do
    {:ok, post} -> IO.inspect(post)
    {:error, changeset} -> IO.inspect(changeset)
  end
end
```

## Using the Repo module for queries

Use the link for [Ecto](hexdocs.pm/ecto) to get more information.

```elixir
def index(conn, _params) do

end
```
