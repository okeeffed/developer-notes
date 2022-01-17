# Introduction

```s
$ bundler init
$ bundler add rspec
$ bundler exec -- rspec --init
# Creates a .rspec and spec file
```

The `.rspec` file we have:

```txt
--require spec_helper
```

This will ensure the `spec_helper.rb` file is loaded before the tests are run.

The `spec_helper.rb` file should be used to configure the global macros for the RSpec environment.

Some of the things from the default setup:

- The expectation and mock are configured to use the RSpec lib for both by default.
- There are some commented code at the bottom which are a recommended standard to start. It will be explored later in the course.

## The `describe` Method

We are building a basic card as an object for the basis to test on.

`describe` takes an argument and within the `do-end` block we can write our tests.

The example group will group a set of related examples (which are our tests).

```rb
# Example group
RSpec.describe 'Card' do
	# Still todo
end
```

## The `it` Method

We don't want to describe how this card is built, but rather what it is doing. We don't want to card about implementation details.

```rb
RSpec.describe 'Card' do
  it 'has a type' do
		# TODO
	end

	it 'has a suit' do
		# TODO
	end
end
```

## The `expect` and `eq` Methods

```rb
RSpec.describe 'Card' do
  it 'has a type' do
		card = Card.new('Ace', 'Spades')
		expect(card.type).to eq('Ace')
	end

	it 'has a suit' do
		card = Card.new('Ace', 'Spades')
		expect(card.suit).to eq('Spades')
	end
end
```

Note that `expect(1 + 1).to(eq(2))` is the same as `expect(1 + 1).to eq(2)`.

## Reading failures

If we run this now, we get:

```s
$ bundler exec -- rspec spec/card_spec.rb
FF

Failures:

  1) Card has a type
     Failure/Error: card = Card.new('Ace', 'Spades')

     NameError:
       uninitialized constant Card
     # ./spec/card_spec.rb:3:in `block (2 levels) in <top (required)>'

  2) Card has a suit
     Failure/Error: card = Card.new('Ace', 'Spades')

     NameError:
       uninitialized constant Card
     # ./spec/card_spec.rb:8:in `block (2 levels) in <top (required)>'

Finished in 0.00446 seconds (files took 0.15174 seconds to load)
2 examples, 2 failures

Failed examples:

rspec ./spec/card_spec.rb:2 # Card has a type
rspec ./spec/card_spec.rb:7 # Card has a suit
```

We get details about the spec that fails, the reason it failed and which line within the spec file caused the failure.

Down the bottom of a failure, it gives us the code required to run the failing spec. For example, to run the first test that failed, we can run `rspec ./spec/card_spec.rb:2`.

## Making the tests pass

For us to fix the failing specs, we need to write our actually card.

```rb
class Card
  attr_reader :type, :suit

  def initialize(type, suit)
    @type = type
    @suit = suit
  end
end
```

After requiring in that code, we can re-run our failing specs and they should pass.

```s
$ bundler exec -- rspec ./spec/card_spec.rb
..

Finished in 0.01458 seconds (files took 0.195 seconds to load)
2 examples, 0 failures
```

We can also refactor our code to describe the specific class and not just a string:

```rb
require_relative '../lib/card'

RSpec.describe Card do
  it 'has a type' do
    card = Card.new('Ace', 'Spades')
    expect(card.type).to eq('Ace')
  end

  it 'has a suit' do
    card = Card.new('Ace', 'Spades')
    expect(card.suit).to eq('Spades')
  end
end
```

## Reducing duplication: before hooks and instance variables

We can use before hooks and instance variables. These examples are not necessarily the best way (there will be other ways explored later).

```rb
require_relative '../lib/card'

RSpec.describe Card do
  before do
    @card = Card.new('Ace', 'Spades')
  end

  it 'has a type' do
    expect(@card.type).to eq('Ace')
  end

  it 'has a suit' do
    expect(@card.suit).to eq('Spades')
  end
end
```

> Note: instance variables can be more prone to error, so there are generally other design patterns.

## Reducing duplication: helper methods

We can define the helper method to define the value to return to the test example.

```rb
require_relative '../lib/card'

RSpec.describe Card do
	def card
		Card.new('Ace', 'Spades')
	end

  it 'has a type' do
    expect(card.type).to eq('Ace')
  end

  it 'has a suit' do
    expect(card.suit).to eq('Spades')
  end
end
```

The one big drawback for this approach: there can be mutations.

Say the class was change so that the attributes `type` and `suit` can both be read and write.

If we then updated the test to be the following:

```rb
it 'has a type' do
	expect(card.type).to eq('Ace')
	card.rank = 'Queen'
	expect(card.type).to eq('Queen') # FAILS
end
```

The test will fail because of our helper method as it returns a new instance on each invocation of card.

We can get around this with our next approach with the `let` helper method.

## Reducing duplication: the `let` method

Our new method is like so:

```rb
require_relative '../lib/card'

RSpec.describe Card do
	let(:card) {
		Card.new('Ace', 'Spades')
	}

  it 'has a type' do
    expect(card.type).to eq('Ace')
  end

  it 'has a suit' do
    expect(card.suit).to eq('Spades')
  end
end
```

The `let` method takes an argument of a symbol and then within the block, we write the representation of what that symbol will equal.

The block is evaluated between each example. This is a good thing for test isolation.

The first the `let` block is run, it will assign what is executed in the block to the symbol provided - in our particular example `card`.

Another benefit of the `let` approach is that it utilizes lazy loading: the symbol is not instantiated until it is used.

## Custom error messages

In an example, we can pass in a custom error message to the `expect` method.

```rb
it 'has a custom error message' do
	comparison = 'Spades'
	expect(card.suit).to eq(comparison), "Hey! I expected #{card.suit} to equal #{comparison}"
end
```

## The `context` method and nested describes

Our descriptions should not be complex but we should nest our examples.

```rb

RSpec.describe "#even? method" do
	# Don't do:
	# it 'should return true if number is even'
	# it 'should return false if number is odd'

	describe 'with even number' do
		it 'should return true' do
			expect(4.even?).to eq(true)
		end
	end

	describe 'with odd number' do
		it 'should return false' do
			expect(5.even?).to eq(false)
		end
	end
end
```

Note: some people prefer the alternative `context` keyword. It is equal to `describe` but it is a preference to how it read semantically.

## `before` and `after` hooks

Similar to the before and after hooks of other languages.

```rb
RSpec.describle 'before and after hooks' do
  # Runs before each example.
  before(:example) do
    puts 'Before example'
  end

	# Runs after each example.
  before(:example) do
    puts 'Ater example'
  end

  it 'is just a random example' do
    expect(5 + 4).to eq(9)
  end

  it 'is just anoter random example' do
    expect(5 + 2).to eq(7)
  end
end
```

Some before can use these hooks for mutating state and cleaning up.

There is also the ability to run before and after once for each describe or context block.

```rb
RSpec.describe 'before and after hooks' do
	# Only runs within a describe or context block that it is denoted in.
  before(:context) do
    puts 'Before context'
  end

  after(:context) do
    puts 'After context'
  end

  # Runs before each example.
  before(:example) do
    puts 'Before example'
  end

  # Runs after each example.
  before(:example) do
    puts 'Ater example'
  end

  it 'is just a random example' do
    expect(5 + 4).to eq(9)
  end

  it 'is just anoter random example' do
    expect(5 + 2).to eq(7)
  end
end
```

## Nested logic: hooks

Take the following:

```rb
RSpec.describe 'before and after hooks' do
  # Only runs within a describe or context block that it is denoted in.
  before(:context) do
    puts 'Outer before context'
  end

  # Runs before each example.
  before(:example) do
    puts 'Outer before example'
  end

  # after(:context) do
  #   puts 'After context'
  # end

  # # Runs after each example.
  # before(:example) do
  #   puts 'Ater example'
  # end

  it 'does basic math' do
    puts 'You are in the outer it block'
    expect(5 + 4).to eq(9)
  end

  context 'with condition A' do
    before(:context) do
      puts 'Inner before context'
    end

    # Runs before each example.
    before(:example) do
      puts 'Inner before example'
    end

    it 'does more basic math' do
      puts 'You are in the inner it block'
      expect(5 + 4).to eq(9)
    end
  end
end
```

What order does it happen? When we run the test we get:

```s
$ bundler exec -- rspec ./spec/nested_hooks_spec.rb
Outer before context
Outer before example
You are in the outer it block
.
Inner before context
Outer before example
Inner before example
You are in the inner it block
.

Finished in 0.00475 seconds (files took 0.1518 seconds to load)
2 examples, 0 failures
```

## Nested Logic: Overwriting Let Variables

We can re-declare a let variable within the current context (or recursively search up for it).

```rb
class ProgrammingLanguage
  attr_reader :name

  def initialize(name = 'Ruby')
    @name = name
  end
end

RSpec.describe ProgrammingLanguage do
  let(:language) { ProgrammingLanguage.new('Python') }

  it 'should store the name of the language' do
    expect(language.name).to eq('Python')
  end

  context 'with no argument' do
		let(:language) { ProgrammingLanguage.new }

    it 'should default to Ruby as the name of the language' do
      expect(language.name).to eq('Ruby')
    end
  end
end
```
