---
menu: Ruby On Rails Tutorial
name: 6) Modelling Users
---

# Modelling Users

Given a form that accepts name, email, password and confirmation, we're going to create the backend for this.

## Database migrations

To display the user on a view, we started by adding the following to the `User` model.

```rb
class User < ApplicationRecord
  # add this
  attr_accessor :name, :email
end
```

In contrast, when using Rails to model users we don’t need to identify the attributes explicitly.

As noted briefly above, to store data Rails uses a relational database by default, which consists of tables composed of data rows, where each row has columns of data attributes. For example, to store users with names and email addresses, we’ll create a users table with name and email columns (with each row corresponding to one user).

An example of such a table appears in Figure 6.2, corresponding to the data model shown in Figure 6.3. (Figure 6.3 is just a sketch; the full data model appears in Figure 6.4.) By naming the columns name and email, we’ll let Active Record figure out the User object attributes for us.

To do similar via the generate command, we would use `rails generate model User name:string email:string`.

> Note: with generating models, the `User` is singular as opposed to the scaffold where it is plural.

The `generate` command creates a migration. We run the migration with `rails db:migrate`.

## db/schema.rb

Rails uses a file called `schema.rb` in the `db/` directory to keep track of the structure of the database (called the schema, hence the filename).

Most migrations (including all the ones in this tutorial) are reversible, which means we can "migrate down" and undo them with a single command, called `db:rollback`:

```s
$ rails db:rollback
```

After running this command, examine `db/schema.rb` to confirm that the rollback was successful. (See Box 3.1 for another technique useful for reversing migrations.) Under the hood, this command executes the `drop_table` command to remove the users table from the database. The reason this works is that the change method knows that `drop_table` is the inverse of `create_table`, which means that the rollback migration can be easily inferred. In the case of an irreversible migration, such as one to remove a database column, it is necessary to define separate up and down methods in place of the single change method.

## Creating user objects in a sandbox

You can pass a `--sandbox` flag to the rails console to discard changes on exit.

```s
$ rails console --sandbox
Loading development environment in sandbox
Any modifications you make will be rolled back on exit
>>
```

Due to not having restraints, the following is currently true:

```rb
irb(main):004:0> a = User.new
   (3.5ms)  SELECT sqlite_version(*)
=> #<User id: nil, name: nil, email: nil, created_at: nil, updated_at: nil>
irb(main):005:0> a.valid?
=> true
# Putting desired values
=> #<User id: nil, name: "Dennis O", email: "hello@dennis.com", created_at: nil, updated_at: nil>
irb(main):007:0> b.valid?
=> true
```

To save, we can use `[OBJECT].save`:

```rb
irb(main):008:0> b.save
  TRANSACTION (0.7ms)  begin transaction
  User Create (0.5ms)  INSERT INTO "users" ("name", "email", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["name", "Dennis O"], ["email", "hello@dennis.com"], ["created_at", "2021-02-04 23:56:13.252130"], ["updated_at", "2021-02-04 23:56:13.252130"]]
  TRANSACTION (0.7ms)  commit transaction
=> true
irb(main):011:0> b
=> #<User id: 2, name: "Dennis O", email: "hello@dennis.com", created_at: "2021-02-04 23:56:13.252130000 +0000", updated_at: "2021-02-04 23:56:13.252130000 +0000">
```

To remove, we can use the `destroy` method:

```rb
irb(main):012:0> a.destroy
=> #<User id: nil, name: nil, email: nil, created_at: nil, updated_at: nil>
```

## Finding User Objects

We can use `User.find` to find an object by id:

```rb
irb(main):013:0> User.find(2)
  User Load (1.1ms)  SELECT "users".* FROM "users" WHERE "users"."id" = ? LIMIT ?  [["id", 2], ["LIMIT", 1]]
=> #<User id: 2, name: "Dennis O", email: "hello@dennis.com", created_at: "2021-02-04 23:56:13.252130000 +0000", updated_at: "2021-02-04 23:56:13.252130000 +0000">
```

You can use `find_by` to find by a hash value:

```rb
irb(main):014:0> User.find_by(email: "hello@dennis.com")
  User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."email" = ? LIMIT ?  [["email", "hello@dennis.com"], ["LIMIT", 1]]
=> #<User id: 2, name: "Dennis O", email: "hello@dennis.com", created_at: "2021-02-04 23:56:13.252130000 +0000", updated_at: "2021-02-04 23:56:13.252130000 +0000">

# HERE ARE SOME EQUIVALENTS
irb(main):017:0> User.find_by email: "hello@dennis.com"
  User Load (0.2ms)  SELECT "users".* FROM "users" WHERE "users"."email" = ? LIMIT ?  [["email", "hello@dennis.com"], ["LIMIT", 1]]
=> #<User id: 2, name: "Dennis O", email: "hello@dennis.com", created_at: "2021-02-04 23:56:13.252130000 +0000", updated_at: "2021-02-04 23:56:13.252130000 +0000">

irb(main):019:0> User.find_by({ :email => "hello@dennis.com" })
  User Load (0.1ms)  SELECT "users".* FROM "users" WHERE "users"."email" = ? LIMIT ?  [["email", "hello@dennis.com"], ["LIMIT", 1]]
=> #<User id: 2, name: "Dennis O", email: "hello@dennis.com", created_at: "2021-02-04 23:56:13.252130000 +0000", updated_at: "2021-02-04 23:56:13.252130000 +0000">
```

`User.first` and `User.all` naturally return the first user and all users respectively.

```rb
irb(main):020:0> User.first
  User Load (0.2ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
=> #<User id: 1, name: "Dennis", email: "hello@dennisokeeffe.com", created_at: "2021-02-04 23:27:12.601831000 +0000", updated_at: "2021-02-04 23:27:33.359561000 +0000">
irb(main):021:0> User.all
  User Load (0.8ms)  SELECT "users".* FROM "users" /* loading for inspect */ LIMIT ?  [["LIMIT", 11]]
=> #<ActiveRecord::Relation [#<User id: 1, name: "Dennis", email: "hello@dennisokeeffe.com", created_at: "2021-02-04 23:27:12.601831000 +0000", updated_at: "2021-02-04 23:27:33.359561000 +0000">, #<User id: 2, name: "Dennis O", email: "hello@dennis.com", created_at: "2021-02-04 23:56:13.252130000 +0000", updated_at: "2021-02-04 23:56:13.252130000 +0000">]>
```

Other notable things related to `User.all`:

```rb
irb(main):022:0> User.all.class
=> User::ActiveRecord_Relation
irb(main):023:0> User.all.first
  User Load (0.2ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT ?  [["LIMIT", 1]]
=> #<User id: 1, name: "Dennis", email: "hello@dennisokeeffe.com", created_at: "2021-02-04 23:27:12.601831000 +0000", updated_at: "2021-02-04 23:27:33.359561000 +0000">
irb(main):024:0> User.all.length
  User Load (0.2ms)  SELECT "users".* FROM "users"
=> 2
```

## Updating User Objects

`.save` is required.

```rb
>> user           # Just a reminder about our user's attributes
=> #<User id: 1, name: "Michael Hartl", email: "michael@example.com",
created_at: "2019-08-22 01:51:03", updated_at: "2019-08-22 01:51:03">
>> user.email = "mhartl@example.net"
=> "mhartl@example.net"
>> user.save
=> true
```

If we do not wish to save:

```rb
>> user.email
=> "mhartl@example.net"
>> user.email = "foo@bar.com"
=> "foo@bar.com"
>> user.reload.email
=> "mhartl@example.net"
```

To update multiple values, you can use the object's `update` method:

```rb
>> user.update(name: "The Dude", email: "dude@abides.org")
=> true
>> user.name
=> "The Dude"
>> user.email
=> "dude@abides.org"
```

You can also update the "magic columns":

```rb
irb(main):027:0> b.created_at = 1.year.ago
=> Wed, 05 Feb 2020 00:04:35.097762000 UTC +00:00
irb(main):028:0> b.save
  TRANSACTION (2.4ms)  begin transaction
  User Update (0.5ms)  UPDATE "users" SET "created_at" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["created_at", "2020-02-05 00:04:35.097762"], ["updated_at", "2021-02-05 00:04:38.528773"], ["id", 2]]
  TRANSACTION (1.2ms)  commit transaction
=> true
irb(main):029:0> b
=> #<User id: 2, name: "Test", email: "hello@dennis.com", created_at: "2020-02-05 00:04:35.097762000 +0000", updated_at: "2021-02-05 00:04:38.528773000 +0000">
```

## User validations

In this section, it is noted that TDD is great for validations. The test setup identified for this setup should be the following:

```rb
# test/models/user_test.rb
require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com")
  end

  test "should be valid" do
    assert @user.valid?
  end
end
```

Our current test doesn't have validations, so currently is looks like the following:

```s
rails test:models
```

## Validating presence

```rb
require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com")
  end

  test "should be valid" do
    assert @user.valid?
  end

  ## Our updated test which fails at current
  test "name should be present" do
    @user.name = "     "
    assert_not @user.valid?
  end
end
```

To get the test passing, we can update the following in the model:

```rb
class User < ApplicationRecord
  validates :name, presence: true
end
# An equivalent
class User < ApplicationRecord
  validates(:name, presence: true)
end
```

We can update the test to also check the email:

```rb
# test/models/user_test.rb
require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com")
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = ""
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = "     "
    assert_not @user.valid?
  end
end

# app/models/user.rb

class User < ApplicationRecord
  validates :name,  presence: true
  validates :email, presence: true
end
```

## Length validation

```rb
# app/models/user.rb

class User < ApplicationRecord
  validates :name,  presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 }
end
```

## Format validation

We write a series of caes for the test:

```rb
require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com")
  end
  .
  .
  .
  test "email validation should accept valid addresses" do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                         first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      assert @user.valid?, "#{valid_address.inspect} should be valid"
    end
  end

  test "email validation should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end
end
```

Which we can now update the validation on the user model with a RegExp `validates :email, format: { with: /<regular expression>/ }`:

```rb
class User < ApplicationRecord
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX }
end
```

## Uniqueness validation

To enforce uniqueness of email addresses (so that we can use them as usernames), we’ll be using the `:uniqueness` option to the validates method. But be warned: there’s a major caveat, so don’t just skim this section—read it carefully.

First, we need to update our test to add a User to the database that we can test uniqueness against:

```rb
require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com")
  end
  .
  .
  .
  test "email addresses should be unique" do
    duplicate_user = @user.dup
    # enforce that our tests is case insensitive
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end
end
```

To conform to uniqueness, we can update our model:

```rb
class User < ApplicationRecord
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    # enforce case_sensitivity
                    uniqueness: { case_sensitive: false }
end
```

> Note: There’s just one small problem, which is that the Active Record uniqueness validation does not guarantee uniqueness at the database level. Here’s a scenario that explains why:

1. Alice signs up for the sample app, with address alice@wonderland.com.
2. Alice accidentally clicks on "Submit" twice, sending two requests in quick succession.
3. The following sequence occurs: request 1 creates a user in memory that passes validation, request 2 does the same, request 1’s user gets saved, request 2’s user gets saved.
4. Result: two user records with the exact same email address, despite the uniqueness validation

The solution is to enforce uniqueness at the database level. We can add this using an index on the `email`. The reason we do this is because we want to avoid a `full-table` scan.

With Rails, we can do this using `rails generate migration add_index_to_users_email`.

> Note: Unlike the migration for users, the email uniqueness migration is not pre-defined, so we need to fill in its contents.

```rb
# db/migrate/[timestamp]_add_index_to_users_email.rb
class AddIndexToUsersEmail < ActiveRecord::Migration[6.0]
  def change
    add_index :users, :email, unique: true
  end
end
```

Once we migrate, if we run a test it should fail due to the user fixtures. Comment them out to have the test succeed.

We can also update our `User` model to have issues on uniqueness:

```rb
class User < ApplicationRecord
  before_save { self.email = email.downcase } # updated
  validates :name,  presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true #reverted back to true
end
```

We could also have written it `self.email = self.email.downcase`. The RHS self is optional - it could also be `self.email = email.downcase`.

Another alternative implementation:

```rb
class User < ApplicationRecord
  before_save { email.downcase! }
  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true
end
```

We can write a test for that like so:

```rb
test "email addresses should be saved as lower-case" do
   mixed_case_email = "Foo@ExAMPle.CoM"
   @user.email = mixed_case_email
   @user.save
   assert_equal mixed_case_email.downcase, @user.reload.email
end
```

## TODO: Adding a secure password
