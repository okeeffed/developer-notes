---
menu: Ruby On Rails Tutorial
name: 4) Rails Flavoured Ruby
---

# Rails Flavoured Ruby

This sectionn will continue on the brand new app created in (3) **Mostly Static Pages**.

## Built-in helpers

Looking at our application layout:

```rb
<!DOCTYPE html>
<html>
  <head>
    <title><%= yield(:title) %> | Ruby on Rails Tutorial Sample App</title>
    <meta charset="utf-8">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag 'application', media: 'all',
                                           'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

Let's focus on this:

```rb
<%= stylesheet_link_tag 'application', media: 'all',
                                       'data-turbolinks-track': 'reload' %>
```

## Custom Helpers

You can define your own custom helpers.

The line `<%= yield(:title) %> | Ruby on Rails Tutorial Sample App` defaults to the string provided if there is no `:title` value for the yield function.

We could add a helper to abstract this more:

```rb
app/helpers/application_helper.rb
module ApplicationHelper

  # Returns the full title on a per-page basis.
  def full_title(page_title = '')
    base_title = "Ruby on Rails Tutorial Sample App"
    if page_title.empty?
      base_title
    else
      page_title + " | " + base_title
    end
  end
end
```

We could now update the string above to `<title><%= full_title(yield(:title)) %></title>`.

## Strings and methods

### Objects and message passing

EVERYTHING in Ruby is an **object**.

Because of the declarations and usage of this within `module` namespaces, you will find that Rails helps "automagically" load related helpers for the views which give us access to the methods without explicitly requiring the module.

### Hashes and symbols

Instead of defining hashes one item at a time using square brackets, it’s easy to use a literal representation with keys and values separated by =>, called a “hashrocket”:

```s
>> user = { "first_name" => "Michael", "last_name" => "Hartl" }
=> {"last_name"=>"Hartl", "first_name"=>"Michael"}
```

Because it's so common for hashes to use symbols as keys, as of Ruby 1.9 a new syntax is supported for this:

```s
>> h1 = { :name => "Michael Hartl", :email => "michael@example.com" }
=> {:name=>"Michael Hartl", :email=>"michael@example.com"}
>> h2 = { name: "Michael Hartl", email: "michael@example.com" }
=> {:name=>"Michael Hartl", :email=>"michael@example.com"}
>> h1 == h2
=> true
```

This construction more closely follows the hash notation in other languages (such as JavaScript) and enjoys growing popularity in the Rails community. Because both hash syntaxes are still in common use, it’s essential to be able to recognize both of them. Unfortunately, this can be confusing, especially since `:name` is valid on its own (as a standalone symbol) but name: has no meaning by itself. The bottom line is that :name => and name: are effectively the same only inside literal hashes, so that

```rb
{ :name => "Michael Hartl" }
and

{ name: "Michael Hartl" }
```

are equivalent, but otherwise you need to use :name (with the colon coming first) to denote a symbol.

## Ruby Classes

### Constructors

```rb
# String
>> s = String.new("foobar")   # A named constructor for a string
=> "foobar"
>> s.class
=> String
>> s == "foobar"
=> true
# Array
>> a = Array.new([1, 3, 2])
=> [1, 3, 2]
# Hash
>> h = Hash.new
=> {}
>> h[:foo]            # Try to access the value for the nonexistent key :foo.
=> nil
>> h = Hash.new(0)    # Arrange for nonexistent keys to return 0 instead of nil.
=> {}
>> h[:foo]
=> 0
```

### Inheritance

```rb
>> s = String.new("foobar")
=> "foobar"
>> s.class                        # Find the class of s.
=> String
>> s.class.superclass             # Find the superclass of String.
=> Object
>> s.class.superclass.superclass  # Ruby has a BasicObject base class as of 1.9
=> BasicObject
>> s.class.superclass.superclass.superclass
=> nil
```

An example of using inheritance to extend the String object:

```rb
>> class Word
>>   def palindrome?(string)
>>     string == string.reverse
>>   end
>> end
=> :palindrome?
>> w = Word.new              # Make a new Word object.
=> #<Word:0x22d0b20>
>> w.palindrome?("foobar")
=> false
>> w.palindrome?("level")
=> true
# Extending string instead
>> class Word < String             # Word inherits from String.
>>   # Returns true if the string is its own reverse.
>>   def palindrome?
>>     self == self.reverse        # self is the string itself.
>>   end
>> end
=> nil
>> s = Word.new("level")    # Make a new Word, initialized with "level".
=> "level"
>> s.palindrome?            # Words have the palindrome? method.
=> true
>> s.length                 # Words also inherit all the normal string methods.
=> 5
```

You can also modify a built-in class:

```rb
>> class String
>>   # Returns true if the string is its own reverse.
>>   def palindrome?
>>     self == self.reverse
>>   end
>> end
=> nil
>> "deified".palindrome?
=> true
```

## A controller class

```rb
class StaticPagesController < ApplicationController

  def home
  end

  def help
  end

  def about
  end
end

>> controller = StaticPagesController.new
=> #<StaticPagesController:0x22855d0>
>> controller.class
=> StaticPagesController
>> controller.class.superclass
=> ApplicationController
>> controller.class.superclass.superclass
=> ActionController::Base
>> controller.class.superclass.superclass.superclass
=> ActionController::Metal
>> controller.class.superclass.superclass.superclass.superclass
=> AbstractController::Base
>> controller.class.superclass.superclass.superclass.superclass.superclass
=> Object
```

## Attribute accessors

```rb
class User
  attr_accessor :name, :email

  def initialize(attributes = {})
    @name  = attributes[:name]
    @email = attributes[:email]
  end

  def formatted_email
    "#{@name} <#{@email}>"
  end
end
```

The attribute accessor creates “getter” and “setter” methods that allow us to retrieve (get) and assign (set) @name and @email instance variables.

In Rails, the principal importance of instance variables is that they are automatically available in the views, but in general they are used for variables that need to be available throughout a Ruby class.

Instance variables always begin with an @ sign, and are nil when undefined.
