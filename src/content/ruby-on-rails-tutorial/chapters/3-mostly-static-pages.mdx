---
menu: Ruby On Rails Tutorial
name: 3) Mostly Static Pages
---

# Mostly Static Pages

To start with this example, you create a `sample_app` and set up the usual deployments to get to Heroku.

Once setup, we begin by creating a couple of `StaticPages` controllers:

```s
$ rails g controller [name_of_controller] [...controller_methods]
$ rails g controller StaticPages home help
```

> Note: instead of camel case, we also could have used snake case.

This also updates our router config:

```rb
Rails.application.routes.draw do
  get 'static_pages/home'
  get 'static_pages/help'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "application#hello"
end
```

We can also destroy the created controller:

```s
$ rails destroy controller StaticPages home help
```

Finally, we will create a new User like before (which can also be destroyed with a similar command if required):

```s
$ rails generate model User name:string email:string
$ rails generate destroy User
```

## Migrations and rollbacks

| Comand                        | Outcome                      |
| ----------------------------- | ---------------------------- |
| `rails db:migrate`            | Run pending migrations       |
| `rails db:rollback`           | Undo a single migration step |
| `rails db:rollback VERSION=0` | Rollback to the beginning    |

## Understanding where the page comes from

To understand where this page comes from, let’s start by taking a look at the Static Pages controller in a text editor, which should look something like Listing 3.9. You may note that, unlike the demo Users and Microposts controllers from Chapter 2, the Static Pages controller does not use the standard REST actions. This is normal for a collection of static pages: the REST architecture isn’t the best solution to every problem.

```rb
# app/controllers/static_pages_controller.rb
class StaticPagesController < ApplicationController
  def home
  end

  def help
  end
end
```

We see from the class keyword in Listing 3.9 that `static_pages_controller.rb` defines a class, in this case called `StaticPagesController`. Classes are simply a convenient way to organize functions (also called methods) like the home and help actions, which are defined using the def keyword. As discussed in Section 2.3.4, the angle bracket `<` indicates that `StaticPagesController` inherits from the Rails class `ApplicationController;` as we’ll see in a moment, this means that our pages come equipped with a large amount of Rails-specific functionality. (We’ll learn more about both classes and inheritance in Section 4.4.)

In the case of the Static Pages controller, both of its methods are initially empty:

```rb
def home
end

def help
end
```

In plain Ruby, these methods would simply do nothing. In Rails, the situation is different — `StaticPagesController` is a Ruby class, but because it inherits from `ApplicationController` the behavior of its methods is specific to Rails: when visiting the URL `/static_pages/home`, Rails looks in the Static Pages controller and executes the code in the home action, and then renders the view (the V in MVC from Section 1.2.3) corresponding to the action. In the present case, the home action is empty, so all visiting `/static_pages/home` does is render the view.

## Slightly Dynamic Pages

In this section, we checkout `app/views/layouts/application.html.erb` to see how the layout for the application is with the parent tags.

There is more information here on asserting values of the tags passed, however I will skip this as I am not that interested in `.erb` files.
