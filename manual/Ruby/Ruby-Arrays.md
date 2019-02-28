---
name: Ruby Arrays
menu: Ruby
---

# Ruby Arrays

## Map

```ruby
# map.rb
class Map
    def self.updatesVar(arr)
        arr.map! {|x| x + "!"}
        return arr
    end

    def self.doesNotUpdateVar(arr)
        b = arr.map {|x| x + "!"}
        return arr
    end

    def self.returnsNewArr(arr)
        b = arr.map {|x| x + "!"}
        return b
    end
end

# map_test.rb
begin
  gem 'minitest', '>= 5.0.0'
  require 'minitest/autorun'
  require_relative 'arrays'
rescue Gem::LoadError => e
  puts "\nMissing Dependency:\n#{e.backtrace.first} #{e.message}"
  puts 'Minitest 5.0 gem must be installed for the Ruby track.'
rescue LoadError => e
  puts "\nError:\n#{e.backtrace.first} #{e.message}"
  puts DATA.read
  exit 1
end

# Common test data version: 1.1.0 be3ae66
class MapTest < Minitest::Test
  def test_map_updates_var
    # skip
    arr = ["a","b","c","d"]
    expected = ["a!","b!","c!","d!"]
    assert_equal expected, Map.updatesVar(arr)
  end

  def test_map_does_not_update_var
    # skip
    arr = ["a","b","c","d"]
    expected = ["a","b","c","d"]
    assert_equal expected, Map.doesNotUpdateVar(arr)
  end

  def test_map_returns_new_arr
    # skip
    arr = ["a","b","c","d"]
    expected = ["a!","b!","c!","d!"]
    assert_equal expected, Map.returnsNewArr(arr)
  end
end

__END__
```

## Other important functions

```ruby
a = ["a","b","c"]
# => ["a", "b", "c"]
a.map! {|x| x + "!"}
# => ["a!", "b!", "c!"]
num = [1, 2, 3, 4]
num.map! &-> (x) { x + 2 } # mapping as lambda
# => [3, 4, 5, 6]
a = a.join(', ')
# => "a!, b!, c!"
a = a.split(', ')
# => ["a!", "b!", "c!"]
a = a.reverse()
# => ["c!", "b!", "a!"]
b = a.first() # a[0]
# => ["a!"]
a += b
# => ["a!", "b!", "c!", "a!"]
first, *rest = a
# first = ["a!"], rest = ["b!", "c!", "a!"]
a.take(1)
# => ["a!"]
a.drop(1)
# => ["b!", "c!", "a!"]
a.select{|x| x != "a!"}
# => ["b!", "c!"]
a.select{|x| !x.include? "a"}
# => ["b!", "c!"]
num = [1, 2, 3, 4]
num.map! &-> (x) { x > 3 }
# => [4]
c = num.reduce(0) {|x,y| x + y}
# => 10
num = [4, 3, 2, 1]
num.sort!
# => [1, 2, 3, 4]
num.size()
# => 4
num.push(5)
# => [1, 2, 3, 4, 5]
num.pop()
# => 5
num.unshift(5)
# => [5, 1, 2, 3, 4]
num.shift()
# => 5
num.min()
# => 1
num.max()
# => 4
```
