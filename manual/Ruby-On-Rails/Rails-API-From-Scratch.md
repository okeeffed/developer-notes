---
menu: Ruby On Rails
name: Rails API From Scratch
---

# Rails API From Scratch

## New API from the CLI

In this particular case, we will be creating a UI in React.

Creating a new API:

```s
rails new <api-name> --api
```

## Setting up the gems

Afterwards, you will want to add some CORS control for Rack and some other gems to prep for Heroku:

```rb
gem 'rack-cors', :require => 'rack/cors'

group :development, :test do
  # Moe sqlite3 to here
  gem 'sqlite3'
end
group :production do
  gem 'pg'
end
```

## Creating your models

The following code is an example of creating some Todos.

```s
# rails g model <EntitySingular> [...attribute:type]
rails generate model Todo title:string done:boolean
# rails g controller <EntityPlural> [...crud methods]
rails generate controller Todos index create update destroy
rails db:migrate
```

## Setting up your controller

Update the controller values:

```rb
class TodosController < ApplicationController
  def index
    todos = Todo.order("created_at DESC")
    render json: todos
  end

  def create
    todo = Todo.create(todo_param)
    render json: todo
  end

  def update
    todo = Todo.find(params[:id])
    todo.update(todo_param)
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end

  private

  def todo_param
    params.require(:todo).permit(:title, :done)
  end
end
```

## Rescopeing the routes

We want to change our resources to be available from

```rb
Rails.application.routes.draw do
  # get 'todos/index'
  # get 'todos/create'
  # get 'todos/update'
  # get 'todos/destroy'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope "/api/v1" do
    resources :todos
  end
end
```

## UI with Create React App

```s
npm install create-react-app
create-react-app <app-name> --template=typescript
```

Set a proxy value in `package.json` so that we know where the localhost calls will go to:

```json
"proxy": "http://localhost:3000"
```

## Running locally

You can use `heroku local -f Procfile.dev` with the `Procfile.dev` looking like the following:

```js
web: cd todo-ui && PORT=4000 npm start
api: cd todo-api && PORT=3000 bin/rails s
```

Run and begin calling the routes like so `/api/v1/todos` and you will start getting some results! Hooray!
