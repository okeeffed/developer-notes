---
menu: Ruby On Rails Tutorial
name: 2) Toy App
---

# Toy App

## The Users Resource

We can scaffold the users resource with the following:

```s
rails generate scaffold User name:string email:string
```

> Note: There is no need to create a parameter for `id` - it is created for you.

Generally speaking, it is not a great idea to get too deep into scaffolding.

That generation will create a migration in `db/migrate`.

> In Rails 6, you should use `rails` in place of `rake`.

That generation of the `User` will create the routing for the following:

| URL           | Action | Purpose                     |
| ------------- | ------ | --------------------------- |
| /users        | index  | page to list all users      |
| /users/1      | show   | page to show user with id 1 |
| /users/new    | new    | page to make a new user     |
| /users/1/edit | edit   | page to edit user with id 1 |

In the `config/routes.rb`, this comes under `resources :users`

## MVC in action

At first, the users are fetched from the Rails Router as step (1) which finds the resource in the controller and correct action to take as step (2).

```rb
class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    @users = User.all
  end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: "User was successfully created." }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email)
    end
end
```

For the `index` route, we get an instance variable assigned:

```rb
# GET /users or /users.json
def index
  @users = User.all
end
```

Step (3) is to talk to the `User` model, which you will notice is empty (but inherits all the functionality from `ApplicationRecord`):

```rb
class User < ApplicationRecord
end
```

Step (4), the user model will then talk to the database.
Step (5), the result is passed back to the controller.
Step (6) is passing that data to the view.
Step (7) returns HTML to the controller.
Step (8) is the controller returning that HTML to the browser.

> He admits that step (8) may not happen - the view may be returned directly to the user. He likes the think the controller is in between.

> It is conventional in Rails for the controller to be plural.

Just know, that the set of URLs that Rails supplies is known as a `resource`.

## The weaknesses of our current Users resource

1. No validation.
2. No authentication (and no way to prevent operations).
3. No tests.
4. No style or layout.
5. No real understanding. If you understand the scaffold codem you probably shouldn't do this course/book.

## Adding the Microposts

We will use the scaffold again to create the microposts. Something worth noting here is that we are not going to use the "foreign key" type connection.

```s
rails generate scaffold Micropost content:text user_id:integer
# again, run the migration
rails db:migrate
```

Note, if you mess up the initial generate, you can roll things back like so:

```rb
# If you migrated the db
rails db:migrate
# Destory scaffold files
rails destroy scaffold Micropost
```

We want the content to be short (140 chars). To do this, we can do this in the `Micropost` model:

```rb
class Micropost < ApplicationRecord
  validates :content, length: { maximum: 140 }
end
```

## A user "has_many" microposts

To associate, we head to the User model and let is know is has many microposts:

```rb
# app/models/user.rb
class User < ApplicationRecord
  has_many :microposts
end

# app/models/micropost.rb
class Micropost < ApplicationRecord
  belongs_to :user
  validates :content, length: { maximum: 140 }
end
```

Later on, we can express that relationship through the web interface. For now, we will see how it works on the Rails Console.

This can be accessed with `rails console` (or `rails c` for short).

We can find the first user in the console with `User.first`.

> Note: you can assign the previous result with `_` so `first_user = _`.

```rb
irb(main):001:0> User.first
   (0.6ms)  SELECT sqlite_version(*)
  User Load (0.1ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
=> #<User id: 1, name: "Dennis O'Keeffe", email: "hello@dennisokeeffe.com", created_at: "2021-02-02 04:36:03.016350000 +0000", updated_at: "2021-02-02 04:36:41.666319000 +0000">
irb(main):002:0> first_user = _
=> #<User id: 1, name: "Dennis O'Keeffe", email: "hello@dennisokeeffe.com", created_at: "2021-02-02 04:36:03.016350000 +0000", updated_at: "2021-02-02 04:36:41.666319000 +0000">
irb(main):008:0> first_user.microposts
  Micropost Load (0.2ms)  SELECT "microposts".* FROM "microposts" WHERE "microposts"."user_id" = ? /* loading for inspect */ LIMIT ?  [["user_id", 1], ["LIMIT", 11]]
=> #<ActiveRecord::Associations::CollectionProxy [#<Micropost id: 1, content: "Hello, world!", user_id: 1, created_at: "2021-02-02 05:19:30.508188000 +0000", updated_at: "2021-02-02 05:19:30.508188000 +0000">]>
irb(main):010:0> first_micropost = first_user.microposts.first
  Micropost Load (0.2ms)  SELECT "microposts".* FROM "microposts" WHERE "microposts"."user_id" = ? ORDER BY "microposts"."id" ASC LIMIT ?  [["user_id", 1], ["LIMIT", 1]]
=> #<Micropost id: 1, content: "Hello, world!", user_id: 1, created_at: "2021-02-02 05:19:30.508188000 +0000", updated_at: "2021-02-02 05:19:30.508188000 +0000">
irb(main):011:0> first_micropost.user
=> #<User id: 1, name: "Dennis O'Keeffe", email: "hello@dennisokeeffe.com", created_at: "2021-02-02 04:36:03.016350000 +0000", updated_at: "2021-02-02 04:36:41.666319000 +0000">
```

As a final input (back in regards to our forms to create a new micropost), you can also validate that fields have a value present using `presence` in the data model:

```rb
class Micropost < ApplicationRecord
  belongs_to :user
  validates :content, length: { maximum: 140 },
                      presence: true
end
```

## Inheritance hierarchies

This is mainly for those with backgrounds in OOP.

This section just speaks to the inheritance heirarchy for the controllers, models, etc.

For the `ApplicationController` that everything else inherits from, it is due to the convenience of adding things to the `ApplicationController` that apply to all the other controllers in the application.
