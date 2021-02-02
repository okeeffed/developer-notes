---
menu: Ruby
name: Safe Navigation Operator
---

# Safe Navigation Operator

Looking through the docs:

```rb
REGEX = /(ruby) is (\w+)/i
"Ruby is awesome!".match(REGEX).values_at(1, 2)
# => ["Ruby", "awesome"]
"Python is fascinating!".match(REGEX).values_at(1, 2)
# NoMethodError: undefined method `values_at' for nil:NilClass
"Python is fascinating!".match(REGEX)&.values_at(1, 2)
# => nil
```

It is necessary in longer chained calls to continue to use the safety operator:

```rb
"Python is fascinating!".match(REGEX)&.values_at(1, 2).join(' - ')
# NoMethodError: undefined method `join' for nil:NilClass
"Python is fascinating!".match(REGEX)&.values_at(1, 2)&.join(' - ')
# => nil
```

It allows you to help with safety checking:

```rb
irb(main):035:0> hash = {:a => { :b => {:c => 2 } } }
=> {:a=>{:b=>{:c=>2}}}
irb(main):036:0> hash[:a] && hash[:a][:b] && hash[:a][:b][:c]
=> 2
irb(main):037:0> hash[:a] && hash[:a][:b] && hash[:a][:b][:d]
=> nil
# the above two equate to the following two
irb(main):038:0> hash&.[](:a)&.[](:b)&.[](:c)
=> 2
irb(main):039:0> hash&.[](:a)&.[](:b)&.[](:d)
=> nil
# changing up the chain
irb(main):040:0> hash[:a] && hash[:a][:d] && hash[:a][:d][:c]
=> nil
# same as
irb(main):041:0> hash&.[](:a)&.[](:d)&.[](:c)
=> nil
```

There is a prerequisite you need to know about accessing a hash value in Ruby to help with undersanding the `&.[](:symbol)` syntax.

```rb
irb(main):014:0> deep_hash = {:one => {:two => {:three => true } } }
=> {:one=>{:two=>{:three=>true}}}
# This here
irb(main):015:0> deep_hash[:one][:two][:three]
=> true
# Is equivalent to this
irb(main):016:0> deep_hash.[](:one).[](:two).[](:three)
=> true
```

Usage with Hash:

```rb
irb(main):021:0> a = { :b => { :c => 3 } }
=> {:b=>{:c=>3}}
irb(main):024:0> a[:b]&.[](:c)
=> 3
irb(main):025:0> a[:c]&.[](:c)
=> nil
irb(main):026:0> a[:c][:c]
Traceback (most recent call last):
        4: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `<main>'
        3: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `load'
        2: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        1: from (irb):26
NoMethodError (undefined method `[]' for nil:NilClass)
```

It cannot be used with a struct property. Usage with Struct:

```rb
irb(main):001:0> Person = Struct.new(:details)
=> Person
irb(main):003:0> person_a = Person.new({:name => "Dennis", :city => "Cremorne"})
=> #<struct Person details={:name=>"Dennis", :city=>"Cremorne"}>
irb(main):004:0> person_a[:details]&.[](:name)
=> "Dennis"
irb(main):005:0> person_a[:incorrect]&.[](:name)
Traceback (most recent call last):
        5: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `<main>'
        4: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `load'
        3: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        2: from (irb):5
        1: from (irb):5:in `[]'
NameError (no member 'incorrect' in struct)
```

It can, however, be used in a deep hash assigned to the value:

```rb
irb(main):001:0> Person = Struct.new(:details)
=> Person
irb(main):007:0>  person_b = Person.new({:meta => {:name => "Dennis", :city => "Cremorne"}})
=> #<struct Person details={:meta=>{:name=>"Dennis", :city=>"Cremorne"}}>
irb(main):008:0> person_b.details&.[](:meta).[](:name)
=> "Dennis"
irb(main):010:0> person_b.details&.[](:incorrect)
=> nil
irb(main):011:0> person_b.details&.[](:incorrect)&.[](:name)
=> nil
# When not using the safe navigation operator for the last property
irb(main):009:0> person_b.details&.[](:incorrect).[](:name)
Traceback (most recent call last):
        4: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `<main>'
        3: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `load'
        2: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        1: from (irb):9
NoMethodError (undefined method `[]' for nil:NilClass)
```

Finally, we can see it in action with classes:

```rb
irb(main):009:0> class Person
irb(main):010:1> def initialize(meta)
irb(main):011:2> @meta = meta
irb(main):012:2> end
irb(main):013:1> def meta
irb(main):014:2> #meta
irb(main):015:2> @meta
irb(main):016:2> end
irb(main):017:1> end
=> :meta
irb(main):018:0> Dennis = Person.new({:a => { :b => 'Hello!' } })
=> #<Person:0x00007fad170c11f8 @meta={:a=>{:b=>"Hello!"}}>
irb(main):019:0> Dennis.meta
=> {:a=>{:b=>"Hello!"}}
irb(main):020:0> Dennis.meta&.[](:a)&.[](:b)
=> "Hello!"
irb(main):021:0> Dennis.meta&.[](:c)
=> nil
irb(main):022:0> Dennis.meta[:a][:b]
=> "Hello!"
# does not work with undefined methods
irb(main):023:0> Dennis&.not_real
Traceback (most recent call last):
        4: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `<main>'
        3: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/bin/irb:23:in `load'
        2: from /Users/dennis.okeeffe/.asdf/installs/ruby/2.6.2/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        1: from (irb):23
NoMethodError (undefined method `not_real' for #<Person:0x00007fad170c11f8 @meta={:a=>{:b=>"Hello!"}}>)
```
