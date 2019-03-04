---
name: Ruby Constructors
menu: Ruby
---

# Ruby Contructors

The important constructor method is the `initialize` method.

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
```
