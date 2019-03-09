---
name: Ruby Lambda Functions
menu: Ruby
---

# Ruby Lambda Functions

The basic gist of declaration and usage is to use the `lambda` keyword. Note that Lambda functions have subtle differences to Proc functions, although they both derive from the Proc object.

The Lambda function enforces the number of arguments passed.

In addition, Lambda and Proc functions treat the `return` differently. Lambda will return from the scope of that closure function, whereas Proc will return from the parent scope.

## Simple Example

```ruby
# lambda.rb
class Lambda
    def self.hello
        helloWorld = lambda { return "Hello, World!" }
        res = helloWorld.call
    end

    def self.sum(a, b)
        sumLambda = lambda {|a,b| a + b }
        res = sumLambda.call(a, b)
    end
end
```

Test file

```ruby
# lambda_test.rb
begin
  gem 'minitest', '>= 5.0.0'
  require 'minitest/autorun'
  require_relative 'lambda'
rescue Gem::LoadError => e
  puts "\nMissing Dependency:\n#{e.backtrace.first} #{e.message}"
  puts 'Minitest 5.0 gem must be installed for the Ruby track.'
rescue LoadError => e
  puts "\nError:\n#{e.backtrace.first} #{e.message}"
  puts DATA.read
  exit 1
end

# Common test data version: 1.1.0 be3ae66
class LambdaTest < Minitest::Test
  def test_hello_world_lambda
    # skip
    assert_equal "Hello, World!", Lambda.hello
  end

  def test_sum_lambda
    # skip
    assert_equal 3, Lambda.sum(1,2)
  end
end

__END__
```
