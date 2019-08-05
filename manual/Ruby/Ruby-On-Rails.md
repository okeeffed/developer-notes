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
rails destroy model User # rollback created User
rails db:migrate # migrate database
rails db:rollback # undo previous db command
rails db:migrate VERSION=0 # migrate all the way back to the beginning
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

## Building Static Pages

```shell
> rails generate controller StaticPages home help
Running via Spring preloader in process 53372
      create  app/controllers/static_pages_controller.rb
       route  get 'static_pages/home'
get 'static_pages/help'
      invoke  erb
      create    app/views/static_pages
      create    app/views/static_pages/home.html.erb
      create    app/views/static_pages/help.html.erb
      invoke  test_unit
      create    test/controllers/static_pages_controller_test.rb
      invoke  helper
      create    app/helpers/static_pages_helper.rb
      invoke    test_unit
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/static_pages.coffee
      invoke    scss
      create      app/assets/stylesheets/static_pages.scss
```

This will build a StaticPages controller and pages `home` and `help`.

Build that controller using `StaticPages` would also work if we used the snake case version `static_pages`.

We can undo things by running `rails destroy controller StaticPages home help`.

After the pages are generated, we can see it has been added to to our `config/routes.db` file:

```ruby
Rails.application.routes.draw do
  get 'static_pages/home'
  get 'static_pages/help'
  # ... rest omitted for brevity
end
```

### Understanding How Static Pages Work

We can find the logic for our controller coming from `app/controllers/static_pages_controller.rb`:

```ruby
class StaticPagesController < ApplicationController
  def home
  end

  def help
  end
end
```

While these methods in Ruby wouldn't do much, the story is different for Rails. First of all, notice that our Controller inherits from the `ApplicationController`. Rails looks in the Static Pages controller for the URL `/static_pages/home`, executes the code in the `home` method and then renders the view.

Given the `home` action is empty, all the visit to the URL mentioned prior does is render the view.

## Updating The Test Helper

If you update `test/test_helper.rb` and update the lines post-last `require` to include the following, you can use the `Minitest Reporter`:

```ruby
# ... omitted
require "minitest/reporters"
Minitest::Reporters.use!
# ... omitted
```

### Automating The Running Of Tests

We can use `Guard` to do this for us in an equivalent to `watch` mode!

```shell
bundle exec guard init
```

For the sake of Git, it is recommended to add the `guard/` folder into `.gitignore`.

## Model Relationships

In Ruby, we can model relationships using the following:

```shell
rails generate model Relationship follower_id:integer followed_id:integer
```

## Adding An Index To DB Schemas

Assuming we created the relationship in the above section, we could update the file `db/migrate/[timestamp]_create_relationships.rb` for indexes:

```ruby
class CreateRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :relationships do |t|
      t.integer :follower_id
      t.integer :followed_id
      t.timestamps
    end

    # For the indexes
    add_index :relationships, :follower_id
    add_index :relationships, :followed_id
    add_index :relationships, [:follower_id, :followed_id], unique: true
  end
end
```

Re-running `rails db:migrate` will update the relationships for the database.

### Implementing The Has-Many Relationship

For the example of `User`, we can update `app/models/user.rb` to have the following:

```ruby
# Note: dependent: :destory will remove relationships when the entity is destroyed
class User < ApplicationRecord
  has_many :microposts, dependent: :destroy
  has_many :active_relationships, class_name: "Relationships", foreign_key: "follower_id", dependent: :destroy
end
```
