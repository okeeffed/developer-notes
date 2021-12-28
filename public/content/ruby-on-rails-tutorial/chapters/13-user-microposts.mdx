---
menu: Ruby On Rails Tutorial
name: 13) User Microposts
---

# User Microposts

## A Micropost Model

The basic model looks like so:

| microposts | data type |
| ---------- | --------- |
| id         | integer   |
| content    | text      |
| user_id    | integer   |
| created_at | datetime  |
| updated_at | datetime  |

To create this with a reference to user:

```s
rails g model Micropost content:text user:references
```

This will create the following model:

```rb
# app/models/micropost.rb
class Micropost < ApplicationRecord
   belongs_to :user
end
```

This will also create a migration:

```rb
# db/migrate/[timestamp]_create_microposts.rb
class CreateMicroposts < ActiveRecord::Migration[6.0]
  def change
    create_table :microposts do |t|
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    # added by us physically
    add_index :microposts, [:user_id, :created_at]
  end
end
```

By including both the `user_id` and `created_at` columns as an array, we arrange for Rails to create a multiple key index, which means that Active Record uses both keys at the same time.

## User/Micropost associations

Note that because the user can create the microposts, the tests file can be updated to ensure the setup is created idiomatically:

```rb
# This code is not idiomatically correct.
@micropost = Micropost.new(content: "Lorem ipsum", user_id: @user.id)

# Correcting that code
@user = users(:michael)
# returns a new post associated with the user
@micropost = @user.microposts.build(content: "Lorem ipsum")
```

| Method                         | Purpose                                                         |
| ------------------------------ | --------------------------------------------------------------- |
| micropost.user                 | Returns the User object associated with the micropost           |
| user.microposts                | Returns a collection of the user’s microposts                   |
| user.microposts.create(arg)    | Creates a micropost associated with user                        |
| user.microposts.create!(arg)   | Creates a micropost associated with user (exception on failure) |
| user.microposts.build(arg)     | Returns a new Micropost object associated with user             |
| user.microposts.find_by(id: 1) | Finds the micropost with id 1 and user_id equal to user.id      |

At this stage, our Micropost and User model looks like so:

```rb
class Micropost < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
end

class User < ApplicationRecord
  has_many :microposts
  .
  .
  .
end
```

## Micropost Refinements

> By default, the `user.microposts` method makes no guarantees about the order of the posts, but (following the convention of blogs and Twitter) we want the microposts to come out in reverse order of when they were created so that the most recent post is first. We’ll arrange for this to happen using a default scope.

To ensure testing is correct, we can use `:most_recent` in our assertion:

```rb
require 'test_helper'

class MicropostTest < ActiveSupport::TestCase
  .
  .
  .
  test "order should be most recent first" do
    assert_equal microposts(:most_recent), Micropost.first
  end
end
```

### Fixtures

To have fixtures set for the testing, we can set `test/fixtures/users.yml` and `test/fixtures/microposts.yml` respectively:

```rb
  name: Michael Example
  email: michael@example.com
  .
  .
  .
```

And for the Microposts:

```rb
orange:
  content: "I just ate an orange!"
  created_at: <%= 10.minutes.ago %>
  user: michael

tau_manifesto:
  content: "Check out the @tauday site by @mhartl: https://tauday.com"
  created_at: <%= 3.years.ago %>
  user: michael

cat_video:
  content: "Sad cats are sad: https://youtu.be/PKffm2uI4dk"
  created_at: <%= 2.hours.ago %>
  user: michael

most_recent:
  content: "Writing a short test"
  created_at: <%= Time.zone.now %>
  user: michael
```

### Setting created_at DESC

We can update the model to set the order in the default scope:

```rb
class Micropost < ApplicationRecord
  belongs_to :user
  # user stabby lambda
  default_scope -> { order(created_at: :desc) }
  validates :user_id, presence: true
  validates :content, presence: true, length: { maximum: 140 }
end
```

### Cascade delete microposts if user is deleted

We can also add a refinement to users to tell the User to cascade delete associated Microposts on the removal of a User:

```rb
class User < ApplicationRecord
  has_many :microposts, dependent: :destroy
  .
  .
  .
end
```

We can add a test like so:

```rb
require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com",
                     password: "foobar", password_confirmation: "foobar")
  end
  .
  .
  .
  test "associated microposts should be destroyed" do
    @user.save
    @user.microposts.create!(content: "Lorem ipsum")
    assert_difference 'Micropost.count', -1 do
      @user.destroy
    end
  end
end
```
