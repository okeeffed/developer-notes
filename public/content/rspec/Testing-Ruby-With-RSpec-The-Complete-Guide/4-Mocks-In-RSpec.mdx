# Mocks in RSpec

## Creating a test double

We can use mocks to help us with testing in isolation.

The first example we will see is the RSpec `double` method.

The first example will demonstrate how to create a test double but also the requirement of adding attributes for the hash.

```rb
# Wrong - throws error
RSpec.describe 'a random double' do
	it 'only allows defined methods to be invoked' do
		stuntman = double("Mr. Danger")

		stuntman.fall_off_ladder # Error because `double` is a strict double
	end
end

# Correct
RSpec.describe 'a random double' do
	it 'only allows defined methods to be invoked' do
		stuntman = double("Mr. Danger", fall_off_ladder: "Ouch", light_on_fire: true)

		expect(stuntman.fall_off_ladder).to eq("Ouch")
		expect(stuntman.light_on_fire).to eq(true)
	end
end
```

For another example with the alternate syntax for adding methods to our `double`:

```rb
RSpec.describe 'a random double' do
	it 'only allows defined methods to be invoked' do
		stuntman = double("Mr. Danger")
		allow(stuntman).to receive(:fall_off_ladder).and_return("Ouch")

		expect(stuntman.fall_off_ladder).to eq("Ouch")
	end
end
```

Finally, we can also allow multiple methods with this syntax:

```rb
RSpec.describe 'a random double' do
	it 'only allows defined methods to be invoked' do
		stuntman = double("Mr. Danger")
		allow(stuntman).to receive_message(fall_off_ladder: "Ouch", light_on_fire: true)

		expect(stuntman.fall_off_ladder).to eq("Ouch")
		expect(stuntman.light_on_fire).to eq(true)
	end
end
```

## Setting up our test movie

```rb
class Actor
	def initialize(name)
		@name = name
	end

	def ready?
		sleep(3)
		true
	end

	def act
		"I love you, baby"
	end

	def fall_off_ladder:
		"Ouch"
	end

	def light_on_fire
		false
	end
end

class Movie
	attr_reader :actor

	def initialize(actor)
		@actor = actor
	end

	def start_shooting
		if actor.ready?
			actor.act
			actor.fall_off_ladder
			actor.light_on_fire
		end
	end

	def end_shooting
		actor.act
	end
end
```

In real life, this might be used like so:

```rb
actor = Actor.new("John Travolta")
movie = Movie.new(actor)
movie.start_shooting
```

Now we have a `Movie` that is dependent on the `Actor`. We want to test them in isolation.

## Replacing an Object with a Double

This is a first, simple demonstration.

```rb
RSpec.describe Movie do
	let(:stuntman) { double("Mr. Danger", ready?: true, act: "String", fall_off_ladder: "Sure", light_on_fire: true) }
	subject { described_class.new(stuntman) }

	describe '#start_shooting method' do
		it 'expects an actor to do 3 actions' do
			# Expect the actor to call all the following methods before
			# the end of the test.
			expect(stuntman).to receive(:ready?)
			expect(stuntman).to receive(:act)
			expect(stuntman).to receive(:fall_off_ladder)
			expect(stuntman).to receive(:light_on_fire)

			subject.start_shooting
		end
	end
end
```

## Receive Counts

What happens if we receive a method more than once? We can use RSpec to ensure it is only invoked a certain number of times:

```rb
RSpec.describe Movie do
	let(:stuntman) { double("Mr. Danger", ready?: true, act: "String", fall_off_ladder: "Sure", light_on_fire: true) }
	subject { described_class.new(stuntman) }

	describe '#start_shooting method' do
		it 'expects an actor to do 3 actions' do
			# Expect the actor to call all the following methods before
			# the end of the test.
			expect(stuntman).to receive(:ready?).once
			expect(stuntman).to receive(:act).exactly(1).times # Same as above
			expect(stuntman).to receive(:fall_off_ladder).at_most(1).times # Similar to above with maximum
			expect(stuntman).to receive(:light_on_fire).once

			subject.start_shooting
		end
	end
end
```

There is a `once` and `twice` helper, but otherwise rely on `exactly`.

## The `allow` Method

```rb
RSpec.describe 'allow method review' do
	it 'can customize return value for methods on doubles' do
		calculator = double
		allow(calculator).to receive(:add).and_return(3)

		expect(calculator.add(1, 2)).to eq(3)
	end

	it 'can stub one or more methods on a real object' do
		arr = [1,2,3]
		allow(arr).to receive(:sum).and_return(10)

		expect(arr.sum).to eq(10) # Succeeds
	end

	it 'can return multiple return values in sequence' do
		calculator = double
		allow(calculator).to receive(:add).and_return(1,2,3,4)

		expect(calculator.add(1,0)).to eq(1)
		expect(calculator.add(1,1)).to eq(2)
		expect(calculator.add(1,2)).to eq(3)
		expect(calculator.add(1,3)).to eq(4)
	end
end
```

## Matching arguments

We are going to emulate the behavior of `first`:

```rb
RSpec.describe 'matching arguments' do
	it 'can return different values depending on the argument' do
		three_element_array = double

		allow(three_element_array).to receive(:first).with(no_args).and_return(1)
		allow(three_element_array).to receive(:first).with(1).and_return([1])
		allow(three_element_array).to receive(:first).with(2).and_return([1, 2])
		# We can also pass matchers to `with`
		allow(three_element_array).to receive(:first).with(be >= 3).and_return([1, 2, 3])

		# All the following pass
		expect(three_element_array.first).to eq(1)
		expect(three_element_array.first(1)).to eq([1])
		expect(three_element_array.first(2)).to eq([1, 2])
		expect(three_element_array.first(100)).to eq([1, 2, 3])
	end
end
```

## Instance Doubles

```rb
class Person
	def a
		sleep(3)
		"Hello"
	end
end

RSpec.describe Person do
	describe 'regular double' do
		# This is not ideal behaviour for our double
		it 'can implement any method' do
			person = double(a: "Hello", b: 20)
			expect(person.a).to eq("Hello")
		end
	end

	# Guarantee'ing that they use the same instance methods
	describe 'instance double' do
		it 'can only implement methods that are defined on the class' do
			# person = instance_double(Person, a: "Hello", b: 20) <= this will fail and provide message that `b` does not exist
			person = instance_double(Person, a: "Hello")
			expect(person).to respond_to(:a)
			expect(person).not_to respond_to(:b)
		end
	end
end
```

`instance_double` also checks argument arity to ensure it is as close to the instance as possible.

## Class Doubles

```rb
class Deck
	def self.build
		# Business logic to build a whole bunch of cards.
		# Irrelevant for our test.
	end
end

class CardGame
	attr_reader :cards

	def start
		@cards = Deck.build
	end
end

RSpec.describe CardGame do
	it 'can only implement class methods that are defined on a class' do
		# All calls to Deck are replace with this double thanks to `as_stubbed_const`.
		deck_klass = class_double(Deck, build: ['Ace', 'Queen']).as_stubbed_const

		expect(deck_klass).to receive(:build)
		subject.start
		expect(subject.cards).to eq(['Ace', 'Queen'])
	end
end
```

## Spies

Spies follow a pattern to check that a message has been received after the method has been invoked. The expectation is placed after the assertion.

```rb
RSpec.describe 'spies' do
	let(:animal) { spy('animal') }

	it 'confirms that a message has been received' do
		animal.eat_food
		expect(animal).to have_received(:eat_food)
		expect(animal).not_to have_received(:eat_human)
	end

	it 'resets between examples' do
		expect(animal).not_to have_received(:eat_food)
	end
end
```

Note that we didn't need to define each of the methods in the `animal` object that we asserted.

## The `allow` method in spies

The `allow` method allows us to spy on the a particular method.

```rb
class Car
	def initialize(model)
		@model = model
	end
end

class Garage
	attr_reader :storage

	def initialize
		@storage = []
	end

	def add_to_collection(model)
		@storage << Car.new(model)
	end
end

RSpec.describe Garage do
	let(:car) { instance_double(Car) }

	before do
		allow(Car).to receive(:new).and_return(car)
	end

	it 'adds a car to its storage' do
		subject.add_to_collection('Honda Civic')

		expect(Car).to have_received(:new).with('Honda Civic')
		expect(subject.storage.length).to eq(1)
		expect(subject.storage.first).to eq(car)
	end
end
```
