---
menu: Ruby On Rails Tutorial
name: 14) Following Users
---

# Following Users

The model the data, we'll need to use a generic `relationships` that that is shaped like the following:

| relationships | datatype |
| ------------- | -------- |
| id            | integer  |
| follower_id   | integer  |
| followed_id   | integer  |
| created_at    | datetime |
| updated_at    | datetime |

We create this with the following:

```s
rails generate model Relationship follower_id:integer followed_id:integer
```

Because we will be finding relationships by `follower_id` and by `followed_id`, we should add an index on each column for efficiency:

```rb
class CreateRelationships < ActiveRecord::Migration[6.0]
  def change
    create_table :relationships do |t|
      t.integer :follower_id
      t.integer :followed_id

      t.timestamps
    end
    add_index :relationships, :follower_id
    add_index :relationships, :followed_id
    add_index :relationships, [:follower_id, :followed_id], unique: true
  end
end
```

## Updating the User Model

```rb
class User < ApplicationRecord
  has_many :microposts, dependent: :destroy
  has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy
  has_many :following, through: :active_relationships, source: :followed
  .
  .
  .
end
```

## Updating the Relationship model

```rb
class Relationship < ApplicationRecord
  belongs_to :follower, class_name: "User"
  belongs_to :followed, class_name: "User"
  validates :follower_id, presence: true
  validates :followed_id, presence: true
end
```

## Adding in the Followers for the User Model

```rb
class User < ApplicationRecord
  has_many :microposts, dependent: :destroy
  has_many :active_relationships,  class_name:  "Relationship",
                                   foreign_key: "follower_id",
                                   dependent:   :destroy
  has_many :passive_relationships, class_name:  "Relationship",
                                   foreign_key: "followed_id",
                                   dependent:   :destroy
  has_many :following, through: :active_relationships,  source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  .
  .
  .
end
```
