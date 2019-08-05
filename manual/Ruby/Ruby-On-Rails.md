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

### Rake

- rake = Ruby Make
- rake used extensively before Rails 5
- `rails db:migrate` === `bundle exec rake db:migrate`

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

### Setting /users to root

```ruby
# config/routes.rb
Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#index'
end
```

## A Generated Controller

```ruby
class UsersController < ApplicationController
  # ...

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # ...
end
```

The `@users = User.all` fetches all users from the database and stores them in the variable `@users`.

## Models

Using the generated data models, we can set validations and relationships.

```ruby
class Micropost < ApplicationRecord
  validates :content, length: {maximum: 140}, presence: true
  belongs_to :user
end

class User < ApplicationRecord
  has_many :microposts
  validates :content, length: {maximum: 140}
end
```
