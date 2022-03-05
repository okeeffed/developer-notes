# 2: Subjects, Shared Examples And Shared Context

This section focuses on helping to reduce duplication.

For example: what if we want to test hashes?

The following itself it not actually necessary.

```rb
RSpec.describe Hash do
  # Not required
	let(:subject) { Hash.new }
end
```

We can instead use a subject. Ruby implicitly created a subject for us.

```rb
RSpec.describe Hash do
	it 'should start off empty' do
		expect(subject.length).to eq(0)
	end
end
```

This of course is a contrived and simple use-case.

In our own classes, we likely want our own initialization arguments.

Note that the `subject` is lazy loaded and then the same instance is relied on for the rest of the example (it is isolated from other examples).

## Explicit Subject

We can use the explicit subject to help instantiate the instance.

```rb
RSpec.describe Hash do
	subject do
		{
			:a => 1,
			:b => 2
		}
	end

	it 'should not start off empty' do
		expect(subject.length).to eq(2)
	end
end
```

This will then pass as when the subject is invoked, it will evaluate to the return value.

You can pass an argument to the subject which is a name.

```rb
RSpec.describe Hash do
	# contrived alias
	subject(:bob) do
		{
			:a => 1,
			:b => 2
		}
	end

	it 'should not start off empty' do
		expect(bob.length).to eq(2)
	end
end
```

What's the difference between the `subject` and a `let` variable value? Not really much. It does allow availability of RSpec shorthand syntax.

## `described_class`

This is a convenient helper method which gives us a reference to the class which is currently being tested.

```rb
class King
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

RSpec.describe King do
  subject { King.new('John') }
  let(:louis) { King.new('Louis') }

	# ... Imagine we did `King.new` everywhere
end
```

Imagine if `King.new` is everywhere, and tests break once we do a rewrite. How can we solve this?

```rb
class King
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

RSpec.describe King do
  subject { described_class.new('John') }
  let(:louis) { described_class.new('Louis') }

	it 'represents a great person' do
    expect(subject.name).to eq('John')
		expect(louis.name).to eq('Louis')
  end
end
```

## One-Liner-Syntax-Example

When we use subject, we have a useful helper for testing.

```rb
RSpec.describe 'shorthand syntax' do
  subject { 5 }

  context 'with classic syntax' do
    it 'should equal 5' do
      expect(subject).to eq(5)
    end
  end

	# Identical but RSpec also provides the example string
	# when test is running ie. `should eq 5`.
	context 'with one-liner syntax' do
		it { is_expected.to eq(5) }
	end
end
```

## Shared Examples with `include_examples`

For the following, imagine the code:

```rb
RSpec.describe Array do
  subject { [1, 2, 3] }
end

RSpec.describe String do
  subject { 'hello' }
end

RSpec.describe Hash do
  subject { { a: 1, b: 2 } }
end

class SausageLink
  def length
    3
  end
end

RSpec.describe SausageLink do
  subject { described_class.new }
end
```

We have a common method of `length`. So how can we test the duplicated tests around length?

```rb
RSpec.shared_examples 'a Ruby object with three elements' do
  it 'returns the number of items' do
    expect(subject.length).to eq(3)
  end
end

RSpec.describe Array do
  subject { [1, 2, 3] }
  include_examples 'a Ruby object with three elements'
end

RSpec.describe String do
  subject { 'abc' }
  include_examples 'a Ruby object with three elements'
end

RSpec.describe Hash do
  subject { { a: 1, b: 2, c: 3 } }
  include_examples 'a Ruby object with three elements'
end

class SausageLink
  def length
    3
  end
end

RSpec.describe SausageLink do
  subject { described_class.new }
end
```

## Shared Context with `include_context`

Shared functionalities that we can then inject in other example groups.

```rb
RSpec.shared_context 'common' do
  before do
    @foods = []
  end

  def some_helper_method
    5
  end

  let(:some_variable) { [1, 2, 3] }
end

RSpec.describe 'first example group' do
  include_context 'common'

  it 'can use outside instance variables' do
    expect(@foods.length).to eq(0)
    @foods << 'Sushi'
    expect(@foods.length).to eq(1)
  end

  it 'can reuse instance variables across different examples' do
    expect(@foods.length).to eq(0)
  end

  it 'can use shared herlper methods' do
    expect(some_helper_method).to eq(5)
  end
end

RSpec.describe 'second example in different file' do
  include_context 'common'

  it 'can use shared let vars' do
    expect(some_variable).to eq([1, 2, 3])
  end
end
```
