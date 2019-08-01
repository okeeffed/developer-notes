---
menu: Ruby
name: Ruby On Rails
---

# Ruby On Rails

## tl;dr

```shell
rails new [app] # scaffold new app
rails server # serve on 3000
bundle install --without production # install dev deps
rails generate scaffold User name:string email:string # generate basic User schema
rails db:migrate # migrate database
```

### Installation

`sudo gem install rails (-v 2.3.8)`

Or use `rvm` or `asdf`. Follow those instructions from their respective sites.

### Up and Running

```shell
rails new [project-name]
cd [project-name]
bundle install # may need to `bundle update`
rails server # start the server on port 3000
```

## Hello World

```shell
rails new hello-world
cd hello-world
rails server # start server on port 3000
```

To change our default page, we can update the `application` controller and `config/routes.rb` file.

```ruby
# app/controllers/application_controller
class ApplicationController < ActionController::Base
  def hello
    render html: "Hello, world!"
  end
end

# config/routes.rb
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#hello'
end
```

Now if we refresh the page, we should get a basic "Hello, world!" string!

## Generating A Schema

```shell
rails generate scaffold User name:string email:string # generate basic User schema
```

## Migrating New Schemas To A Database

```shell
rails db:migrate
# for older versions
bundle exec rake db:migrate
```

## CRUD Operations For The Records

| URL           | Action | Purpose                     |
| ------------- | ------ | --------------------------- |
| /users        | index  | List all users              |
| /users/1      | show   | Page to show user with ID 1 |
| /users/new    | new    | Page to make a new user     |
| /users/1/edit | edit   | Page to edit user with ID 1 |
