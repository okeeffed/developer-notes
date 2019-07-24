---
name: Ruby Constructors
menu: Ruby
---

# Ruby Contructors

The important constructor method is the `initialize` method.

## tl;dr

```ruby
class Employee

  # change scope to public
  public

  # static class variable
  @@count = 0

  # constructor
  def initialize(name, designation, salary)
    @name = name
    @designation = designation
    @salary = salary
    @@count += 1
  end

  # class method
  def self.count
    @@count
  end

  # getters/setters for name, designation, and salary
  def name
    @name
  end

  def name=(name)
    @name = name
  end

  def designation
    @designation
  end

  def designation=(designation)
    @designation = designation
  end

  def salary
    @salary
  end

  def salary=(salary)
    @salary = salary
  end

  # change scope to private
  private

  def organization
    "Hackers de Anonymous"
  end

  # change scope to protected
  protected

  def owner
    "We never mention his name!"
  end

end
```

## Simple Example

```ruby
# Ruby program to initialize instance
# variable using constructor

#!/usr/bin/ruby

# class name
class Geeks
	# constructor
	def initialize

		# instance variable intialzation
		@inst_1 = "GeeksforGeeks"
		@inst_2 = "Sudo Placement"
	end

	# display method
	def display
		puts "Value of First instance variable is: #{@inst_1}"
		puts "Value of Second instance variable is: #{@inst_2}"
	end
end

# creating object
obj1 = Geeks.new()

# calling display method
obj1.display()
```

## Linked List Example

```ruby
"""
Basic implementation without all methods
"""

class LinkedList
    def initialize(head=nil)
        if head.nil?
            @size = 0
        else
            @size = 1
        end
        @head = head
    end

    def getSize
        @size
    end

    def insertFirst(n)
        if @head.nil?
            @head = n
        else
            tmp = @head
            @head = n
            n.setNext(tmp)
        end
        @size += 1
    end

    def clear
        @head = nil
        @size = 0
    end

    def getFirst
        @head
    end
end

class Node
    def initialize(data = nil)
        @data = data
        @next = nil
    end

    def getNext
        @next
    end

    def setNext(n)
        @next = n
    end
end

# test Ruby file
begin
  gem 'minitest', '>= 5.0.0'
  require 'minitest/autorun'
  require_relative 'linked_list'
rescue Gem::LoadError => e
  puts "\nMissing Dependency:\n#{e.backtrace.first} #{e.message}"
  puts 'Minitest 5.0 gem must be installed for the Ruby track.'
rescue LoadError => e
  puts "\nError:\n#{e.backtrace.first} #{e.message}"
  puts DATA.read
  exit 1
end

# Common test data version: 1.1.0 be3ae66
class LinkedListTest < Minitest::Test
  def test_get_size
    # skip
    n1 = Node.new(1)
    ll = LinkedList.new(n1)
    assert_equal 1, ll.getSize()
  end

  def test_insert_first
    # skip
    n1 = Node.new(1)
    n2 = Node.new(1)
    ll = LinkedList.new(n1)
    ll.insertFirst(n2)
    assert_equal 2, ll.getSize()
  end

  def test_clear
    # skip
    n1 = Node.new(1)
    n2 = Node.new(1)
    ll = LinkedList.new(n1)
    ll.insertFirst(n2)
    ll.clear()
    assert_equal 0, ll.getSize()
    assert_nil nil, ll.getFirst()
  end
end

__END__
```
