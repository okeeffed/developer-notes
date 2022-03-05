# 3: Built-In Matchers

A matcher is a type of assertion or expectation.

## The `not_to` method

```rb
RSpec.describe 'not_to method' do
	it 'checks that two values do not match' do
		expect(5).not_to eq(4)
	end
end
```

## Equality matches

The matcher to use depends on how strict you want the cmparison.

| Matcher | Does                                  |
| ------- | ------------------------------------- |
| `eq`    | Tests for value and ignores type.     |
| `eql`   | Tests for value AND strict type.      |
| `equal` | Checks exact identity ie. same memory |
| `be`    | Alias for `equal`                     |

## Comparison matchers

| Matcher  | Does                |
| -------- | ------------------- |
| `be > 5` | Comparison operator |

The usual comparison operators can be used within here.

## Predicate matchers

A predicate method is a method with a `?` at the end which should return a boolean.

Some examples:

```rb
puts 0.zero?
puts 2.even?
puts 11.odd?
puts [].empty?
```

In our tests, we could do the following for predicate methods:

```rb
it 'can be tested with predicate matchers' do
	expect(16 / 2).to be_even
end
```

Basically we can use the `be_<predicate_method>` syntax.

## `all` matcher

Say we want `[5,7,9]` to check if all values are odd.

```rb
it 'allows for aggregate checks' do
	expect([5,7,9]).to all(be_odd)
end
```

## `be` matcher

`false` and `nil` are the only falsy values.

This section had the `be_falsy` and `be_truthy` methods.

There is also a `be_nil` check.

## `change` matcher

We can use this to track changes over time.

```rb
RSpec.describe 'change matcher' do
	subject { [1, 2, 3] }

	it 'checks that a method changes object state' do
		expect { subject.push(4) }.to change { subject.length }.from(3).to(4)
	end
end
```

At the moment it is too strongly tied to the subject as it is defined when writing the test. We can instead check the length changes by 1 with the following:

```rb
RSpec.describe 'change matcher' do
	subject { [1, 2, 3] }

	it 'checks that a method changes object state' do
		expect { subject.push(4) }.to change { subject.length }.by(1)
	end
end
```

It can also accept negative arguments.

```rb
RSpec.describe 'change matcher' do
	subject { [1, 2, 3] }

	it 'checks that a method changes object state' do
		expect { subject.pop }.to change { subject.length }.by(-1)
	end
end
```

## `contain_exactly` Matcher

This doesn't concern itself about the order, only that they are contained.

```rb
RSpec.describe 'change matcher' do
	subject { [1, 2, 3] }

	it 'long form syntax' do
		expect(subject).to contain_exactly(1, 2, 3)
		expect(subject).to contain_exactly(3, 1, 2) # still valid as order doesn't matter
	end

	it { is_expected.to contain_exactly(1, 2, 3) } # short form syntax
end
```

## `start_with` and `end_with` matchers

Note: will be case sensitive and order will matter.

```rb
RSpec.describe 'change matcher' do
	describe 'caterpillar' do
		it 'should check for substring at the beginning or end' do
			expect(subject).to start_with('cat')
			expect(subject).to end_with('pillar')
		end

		it { is_expected.to start_with('cat') }
		it { is_expected.to end_with('pillar') }
	end

	describe [:a, :b, :c, :d] do
		it 'should check for elements at the beginning of the array' do
			expect(subject).to start_with(:a) # valid
			expect(subject).to start_with(:a, :b) # also valid
		end
	end
end
```

## `have_attributes` matcher

```rb
class Wrestler
	attr_reader :name, :finishing_move

	def initialize(name, finishing_move)
		@name = name
		@finishing_move = finishing_move
	end
end

RSpec.describe 'have_attributes matcher' do
	describe Wrestler.new('Stone Cold Steve Austin', 'Stunner') do
		# Long form
		it 'checks for object attribute and proper values' do
			expect(subject).to have_attributes(name: 'Stone Cold Steve Austin', finishing_move: 'Stunner')
		end

		# Short form
		it { is_expected.to have_attributes(name: 'Stone Cold Steve Austin', finishing_move: 'Stunner') }
	end
end
```

## `include` matcher

Helps us check substring, or if an array has a value, or a hash has a key (or key/value), etc.

```rb
RSpec.describe 'include matcher' do
	describe 'hot chocolate' do
		it 'checks for substring' do
			# All value
			expect(subject).to include('choc')
			expect(subject).to include('ate')
			expect(subject).to include('hot')
		end

		# Short form
		it { is_expected.to include('choc') }
	end

	describe [10,20,30] do
		it 'checks for inclusing in the array, regardless of order' do
			expect(subject).to include(10, 30)
		end
	end

	# Can check for key or key/value pair
	describe { name: 'Steve Austin', finishing_move: 'Stunner' } do
		it 'checks for inclusing in the hash, regardless of order' do
			# Can check for key/value pair
			expect(subject).to include(name: 'Steve Austin', finishing_move: 'Stunner')
			# Can check for key only
			expect(subject).to include(:name)
		end
	end
end
```

## `raise_error` Matcher

```rb
RSpec.describe 'raise_error matcher' do
	def some_method
		x
	end

	class CustomError < StandardError; end

	def raise_custom_error
		raise CustomError
	end

	it 'checks for raising an error' do
		expect { some_method }.to raise_error
	end

	it 'checks for raising a NameError' do
		expect { some_method }.to raise_error(NameError)
	end

	it 'checks for raising a CustomError' do
		expect { raise_custom_error }.to raise_error(CustomError)
	end
end
```

## `respond_to` matcher

Expects that an object can respond to a given method.

```rb
class HotChocolate
	def drink
		'Delicious'
	end

	def purchase(number)
		"You bought #{number} hot chocolate(s)"
	end
end

RSpec.describe 'respond_to matcher' do
	describe HotChocolate.new do
		it 'checks for responding to a method' do
			expect(subject).to respond_to(:drink)
			expect(subject).to respond_to(:purchase)
		end
	end
end
```

We can also test that it expects it will respond to a number of arguments:

```rb
RSpec.describe 'respond_to matcher' do
	describe HotChocolate.new do
		it 'checks for responding to a method' do
			expect(subject).to respond_to(:purchase).with(1).arguments
		end
	end
end
```

## `satisfy` matcher

```rb
RSpec.describe 'satisfy matcher' do
	subject { 'racecar' }

	it 'is a palindrome' do
		expect(subject).to satisfy { |word| word == word.reverse }
	end
end
```

We can make the error more descriptive:

```rb
RSpec.describe 'satisfy matcher' do
	subject { 'racecar' }

	it 'can accept a custom error message' do
		expect(subject).to satisfy('be a palindrome') { |word| word == word.reverse }
	end
end
```

## `not_to` method

Checks for the inverse or negative affirmation.

```rb
RSpec.describe 'not_to method' do
	it 'checks for inverse of a matcher' do
		expect(5).not_to eq(10)

		# This does memory
		expect([1,2,3]).not_to equal([1,2,3])

		expect(10).not_to be_odd
	end
end
```

> Note: the teacher admits that most of the time you will use the positive affirmation unless it is obvious when to use it.

## Compound expectations

Allow us to combine more than one matcher on a line.

```rb
RSpec.describe 25 do
	it 'can test for multiple matchers' do
		# Not using compound expectations
		expect(subject).to be_odd
		expect(subject).to be > 20

		# Using both matches
		expect(subject).to be_odd.and be > 20
	end
end
```

There is also the `or` chainable matcher.
