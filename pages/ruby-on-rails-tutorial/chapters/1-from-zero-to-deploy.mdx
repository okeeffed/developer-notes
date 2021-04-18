---
menu: Ruby On Rails Tutorial
name: 1) From Zero To Deploy
---

# 1) From Zero To Deploy

## Prereq

Some interesting tidbits about Ruby functions that you should know to understand syntax such as `render html: "hello, world!"`. Putting that is the same as passing `{:html => "hello, world!"}` as the first arg ie `render({:html => "hello, world!"})`

```rb
irb(main):018:0> def test(obj)
irb(main):019:1> obj[:to]
irb(main):020:1> end
=> :test
irb(main):021:0> test to: 'hello'
=> "hello"
```

See [this post](https://www.howtogeek.com/howto/programming/ruby/ruby-function-method-syntax/) for more information.

As for the fact that you can alias `root` in the router as `root to: 'controller#action'`, this is because of how they handle the argument in the [source code](https://github.com/rails/rails/blob/main/actionpack/lib/action_dispatch/routing/mapper.rb#L1680):

```rb
def root(path, options = {})
  if path.is_a?(String)
    options[:to] = path
  elsif path.is_a?(Hash) && options.empty?
    options = path
  else
    raise ArgumentError, "must be called with a path and/or options"
  end
  # the rest is omitted for brevity
  options
end

irb(main):072:0> root 'override'
=> {:to=>"override"}
irb(main):038:0> root path: 'testing'
=> {:path=>"testing"}
irb(main):039:0> root to: 'testing'
=> {:to=>"testing"}
```

You could use [keywords args](https://thoughtbot.com/blog/ruby-2-keyword-arguments) to explore/enforce the explicit use of `path:` in the call.

```rb
def root(path:, options = {})
  if path.is_a?(String)
    options[:to] = path
  elsif path.is_a?(Hash) && options.empty?
    options = path
  else
    raise ArgumentError, "must be called with a path and/or options"
  end
  # the rest is omitted for brevity
  options
end

# Note that the first call is now considered a string
irb(main):024:0> root path: 'testing'
=> {:to=>"testing"}
irb(main):026:0> root path: {:to => 'testing'}
=> {:to=>"testing"}
```

## Up and Running

You have the choice of getting up and running with Cloud9 or locally.

For local, run `bundle init`. It will create a `Gemfile` in the current directory.

Change `Gemfile` to install Rails and then run `bundle install` to grab the required gems.

You can confirm Rails has installed with `rails -v` and create a new rails app into `hello_app` by running `rails _6.1.0_ new hello_app` where `_6.1.0_` is the optional version to use to scaffold the app. You will see the response in the console for a number of files being created and a Gem installation happening.

The scaffolded files include:

| File/Directory | Purpose                                                                             |
| -------------- | ----------------------------------------------------------------------------------- |
| app/           | Core application (app) code, including models, views, controllers, and helpers      |
| app/assets     | Applications assets such as Cascading Style Sheets (CSS) and images                 |
| bin/           | Binary executable files                                                             |
| config/        | Application configuration                                                           |
| db/            | Database files                                                                      |
| doc/           | Documentation for the application                                                   |
| lib/           | Library modules                                                                     |
| log/           | Application log files                                                               |
| public/        | Data accessible to the public (e.g., via web browsers), such as error pages         |
| bin/rails      | A program for generating code, opening console sessions, or starting a local server |
| test/          | Application tests                                                                   |
| tmp/           | Temporary files                                                                     |
| README.md      | A brief description of the application                                              |
| Gemfile        | Gem requirements for this app                                                       |
| Gemfile.lock   | A list of gems used to ensure that all copies of the app use the same gem versions  |
| config.ru      | A configuration file for Rack middleware                                            |
| .gitignore     | Patterns for files that should be ignored by Git                                    |

Change into the scaffolded folder `cd hello_app`.

In the app we are using, there is going to be an explicit Gemfile that we wish to use:

```rb
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

gem 'rails',      '6.1.0'
gem 'puma',       '5.0.4'
gem 'sass-rails', '6.0.0'
gem 'webpacker',  '4.2.2'
gem 'turbolinks', '5.2.1'
gem 'jbuilder',   '2.10.0'
gem 'bootsnap',   '1.4.6', require: false

group :development, :test do
  gem 'sqlite3', '1.4.2'
  gem 'byebug',  '11.1.3', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console',           '4.1.0'
  gem 'listen',                '3.2.1'
  gem 'spring',                '2.1.1'
  gem 'spring-watcher-listen', '2.0.1'
end

group :test do
  gem 'capybara',           '3.32.2'
  gem 'selenium-webdriver', '3.142.7'
  gem 'webdrivers',         '4.3.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# Uncomment the following line if you're running Rails
# on a native Windows system:
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
```

Run `bundle install` to install those gems. You may get a message requiring `bundle update` if you have conflicts with the Gem lockfile `Gemfile.lock`.

> Note: When adding the above, I ran into startup server issues, so I reverted back to the defaults given when scaffolding a new application.

## rails server

The `rails server` command will get a webserver up and running. Run that to get things up and running.

> There is also a short command `rails s`.

Once running, if you head to `http://localhost:3000` you will get the welcome page.

The welcome page includes the Rails version, as well as the Ruby version on your system.

## Model-View-Controller (MVC)

This follows the MVC pattern which conveniently alligns with subfolders of `app/` aptly named `models`, `views` and `controllers`.

For a short excerpt overview of interaction with the Rails application, we have the following:

> _"When interacting with a Rails application, a browser sends a request, which is received by a webserver and passed on to a Rails controller, which is in charge of what to do next. In some cases, the controller will immediately render a view, which is a template that gets converted to HTML and sent back to the browser. More commonly for dynamic sites, the controller interacts with a model, which is a Ruby object that represents an element of the site (such as a user) and is in charge of communicating with the database. After invoking the model, the controller then renders the view and returns the complete web page to the browser as HTML."_

When creating a new project, you only start with one controller: the `application` controller. You can confirm this by running `ls app/controllers/*_controller.rb`.

Update the controller to take a new `hello` method:

```rb
class ApplicationController < ActionController::Base
  def hello
    render html: "hello, world!"
  end
end
```

Now that we have the action to return the desired stringm we need to tell Rails to use that action instead of the default page. We will need to edit the `router` (which sits in front of the controller)

We will need to head to `config/routes.rb` where it can direct us to the [routing guide](https://guides.rubyonrails.org/routing.html) on the Rails website to learn more about routing.

On the webpage under [#using-root](https://guides.rubyonrails.org/routing.html#using-root), it informs us that you can specify where `/` should route to with the `root` method.

We can do this with `root to: 'controller_name#action_name` which in shorthand is `root 'controller_name#action_name'`.

And so, we update the page like so:

```rb
Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "application#hello"
end
```

For future reference, you can also specify a root within a `namespace` like so:

```rb
namespace :admin do
  root to: "admin#index"
end
```

## Deploying on Heroku

> If you are having issues, ensure to just follow the [Heroku docs](https://devcenter.heroku.com/articles/getting-started-with-rails6#add-the-pg-gem). I ended up just downloading the Postgres Docker image, running `docker run --name hello-postgres -d -e POSTGRES_PASSWORD=password -v /var/run/postgresql:/var/run/postgresql -p 5432:5432 postgres` and following the docs which failed, so I used the local Postgres and had to run a few things that I found from [StackOverflow](https://stackoverflow.com/questions/13410686/postgres-could-not-connect-to-server). It was painful.
> Update: The solution for the whole issue I had with Heroku with Rails 6.1 was to [downgrade bundler](https://stackoverflow.com/questions/36394297/heroku-push-error-could-not-detect-rake-tasks/65333470#65333470)... wow.

Heroku uses PostgreSQL, so we need to add the PostgreSQL gem for production use:

```rb
group :production do
  gem 'pg', '1.2.3'
end
```

You should also move the `sqlite3` gem to `:development` to ensure it is not included in the production environment.

To bundle without production gems, you run `bundle install --without production`. More recent versions of Bundler will ask you to run `bundle config set without 'production' && bundle install`.

For the deployment of Heroku, you will to have a Heroku account and setup the Heroku CLI. On MacOS you can do this via Brew `brew install heroku/brew/heroku`.

Once installed, run `heroku login --interactive` for the interactive login process.

After logging in, create a new application with `heroku create`.

To run the deploy, we need to use Git to push the master branch to Heroku with `git push heroku main` (or master if you are using master).

> Note: ensure that your version of Ruby uses the [supported Ruby runtimes](https://devcenter.heroku.com/articles/ruby-support#supported-runtimes).
> If you also run into an issue asking if you can detect rake tasks, try [precompiling the assets](https://stackoverflow.com/questions/36394297/heroku-push-error-could-not-detect-rake-tasks/36394839) with `RAILS_ENV=production bundle exec rake assets:precompile`

Finally, run `heroku apps:info` to get the information and web URL for your deployment!

### Heroku Commands

| Command                              | Outcome                                                |
| ------------------------------------ | ------------------------------------------------------ |
| `heroku rename rails-tutorial-hello` | Renames the local Heroku app to `rails-tutorial-hello` |
| `heroku help`                        | See list of Heroku commands                            |
