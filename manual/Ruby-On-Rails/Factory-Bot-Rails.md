---
menu: Ruby on Rails
name: Factory Bot Rails Gem
---

# Factory Bot Rails Gem

## Resources

1. [thoughtbot/factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails)
2. [thoughtbot/factory_bot](https://github.com/thoughtbot/factory_bot)
3. [Creating an Article model in Rails](https://guides.rubyonrails.org/getting_started.html#creating-the-article-model)
4. [Testing RSpec](https://semaphoreci.com/community/tutorials/how-to-test-rails-models-with-rspec)

## Quick start

```s
rails new <project> -- api
cd <project>
gem install rspec factory_bot_rails
```

## Update Gemfile config

In the Gemfile:

```ruby
group :development, :test do
  gem 'factory_bot_rails', '~>6.0'
  gem 'rspec-rails', '>= 3.9.0'
end
```

Run `bundle install`.

## Automatic factory definition loading

From the docs:

> By default, factory_bot_rails will automatically load factories defined in the following locations, relative to the root of the Rails project:

```s
factories.rb
test/factories.rb
spec/factories.rb
factories/*.rb
test/factories/*.rb
spec/factories/*.rb
```

If you want to, you can set custom configuration in `config/application.rb` or the appropraite env config.

```s
config.factory_bot.definition_file_paths = ["custom/factories"]
```

This will cause factory_bot_rails to automatically load factories in `custom/factories.rb` and `custom/factories/*.rb`.

## Config

Add the following configuration to `test/support/factory_bot.rb`:

```rb
# test/support/factory_bot.rb
require "factory_bot_rails"

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

Be sure to require that file in `test/test_helper.rb`:

```rb
# test/test_helper.rb
ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require_relative "./support/factory_bot"
require "rails/test_help"
require "rspec/rails"

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
```

## Create a model

From the [guides](https://guides.rubyonrails.org/getting_started.html#creating-the-article-model), we are going to generate a new model.

```s
rails generate model Article title:string text:text
# run the migration
rails db:migrate
```

If successful, the migration should return:

```s
==  CreateArticles: migrating ==================================================
-- create_table(:articles)
   -> 0.0019s
==  CreateArticles: migrated (0.0020s) =========================================
```

## Update Ruby

Update `app/models/article.rb` to look like the following:

```rb
class Article < ApplicationRecord
  validates :title, presence: true, length: {minimum: 5}
  validates :text, presence: true, length: {minimum: 5}
end
```

## Add the following to the factories directory

```rb
# test/factories/articles.rb
FactoryBot.define do
  factory :article do
    title { "MyString" }
    text { "MyText" }
  end
end
```

## Add an Rspec for the model

```rb
# test/models/article_test.rb
require "./test/test_helper"

class ArticleTest < ActiveSupport::TestCase
  describe "article model" do
    before(:all) do
      @article1 = FactoryBot.create(:article)
    end

    it "is valid with valid attributes" do
      expect(@article1).to be_valid
    end

    it "is not valid without a title" do
      article2 = FactoryBot.build(:article, title: nil)
      expect(article2).to_not be_valid
    end

    it "is not valid without text" do
      article2 = FactoryBot.build(:article, text: nil)
      expect(article2).to_not be_valid
    end

    it "is not valid without a title of min length 5" do
      article2 = FactoryBot.build(:article, title: "Min")
      expect(article2).to_not be_valid
    end

    it "is not valid without text of min length 5" do
      article2 = FactoryBot.build(:article, text: "Min")
      expect(article2).to_not be_valid
    end
  end
end
```

## Running the test

```s
rspec test/models/article_test.rb
```

We should get something like the following out:

```s
.....

Finished in 0.04765 seconds (files took 0.90722 seconds to load)
5 examples, 0 failures

Run options: --seed 18801

# Running:



Finished in 0.001607s, 0.0000 runs/s, 0.0000 assertions/s.
0 runs, 0 assertions, 0 failures, 0 errors, 0 skips
```
