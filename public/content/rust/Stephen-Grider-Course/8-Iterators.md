# 8 Iterator Deep Dive: Efficient Data Processing

## 8.83 Project overview

Learning about iterators. They're already used behind the scenes when you write a for loop.

They follow all the same rules of ownership, borrowing and lifetimes and make heavy usage of the `Option` enum.

The project is going to build a basic vector of strings and then work through implementing a number of methods which will teach us something new about iterators.

## 8.84 Basics of iterators

```rs
fn main() {
    let colors = vec![
        String::from("red"),
        String::from("green"),
        String::from("blue"),
    ];

    let mut colors_iter = colors.iter();

    println!("{:#?}", colors_iter.next());
    println!("{:#?}", colors_iter.next());
    println!("{:#?}", colors_iter.next());
		println!("{:#?}", colors_iter.next());
}
```

Given the above code, when we run it:

```txt
Some(
    "red",
)
Some(
    "green",
)
Some(
    "blue",
)
None
```

When we create an iterator, we create a separate struct `Iter<String>` from our `Vec<String>`.

Fields that exist in that structure is a pointer to data, a pointer to the current position and a pointer to the end.

The `next()` will return an Option of the next element in the iterator.

The iterator itself needs to be mutable `let mut ...` because we are changing something about the pointers itself, so it needs to be mutable.

An iterator can be used for different types of fields, not just vectors.

## 8.85 Using For Loops with Iterators

We can declare a `print_elements` function:

```rs
fn print_elements(elements: &Vec<String>) {
    // TODO
}
```

We have two options for this:

1. Use a for loop. Automatically creates an iterator and calls `next` on it.
2. Use **iterator adaptors** and **iterator consumers** like `for_each`, `collect`, `map` etc.

For (1) the for loop implementation, it looks like this:

```rs
fn print_elements(elements: &Vec<String>) {
    for element in elements {
        println!("{}", element);
    }
}
```

For (2) with the iterator adaptors and consumers:

```rs
fn print_elements(elements: &Vec<String>) {
    elements.iter().for_each(|element| {
        println!("{}", element);
    })
}
```

What is an **iterator adaptor** and **iterator consumer**?

- Iterators are "lazy", nothing happens until
  - You call "next"
  - You use a function that calls "next" automatically (these are known as iterator consumers)
- An iterator adaptor example is a function like `map` which *does not* call `next()` under the hood.

For an example of the iterator adaptor code:

```rs
fn print_elements(elements: &Vec<String>) {
    elements
        .iter()
        .map(|el| format!("{} {}", el, el))
        .for_each(|el| println!("{}", element));
}
```

If we didn't add the `for_each` line at the end there, we actually would have ended up with an error about the iterator being lazy and requires to be consumed.

Adaptors create a step in a processing pipeline, but don't actually cause any iteration.

> The example above creates an **iterator chain**.

## 8.85 Extra credit: other examples of map as an iterator adaptor

### Transforming a collection of numbers

```rs
fn square_numbers(numbers: &Vec<i32>) -> Vec<i32> {
    numbers.iter().map(|&n| n * n).collect()
}

fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let squares = square_numbers(&numbers);
    println!("{:?}", squares); // Output: [1, 4, 9, 16, 25]
}
```

### Converting strings to uppercase

```rs
fn to_uppercase(strings: &Vec<String>) -> Vec<String> {
    strings.iter().map(|s| s.to_uppercase()).collect()
}

fn main() {
    let words = vec![String::from("hello"), String::from("world")];
    let uppercase_words = to_uppercase(&words);
    println!("{:?}", uppercase_words); // Output: ["HELLO", "WORLD"]
}
```

### Extracting specific fields from a struct

```rs
struct Person {
    name: String,
    age: u32,
}

fn extract_names(people: &Vec<Person>) -> Vec<String> {
    people.iter().map(|p| p.name.clone()).collect()
}

fn main() {
    let people = vec![
        Person { name: String::from("Alice"), age: 30 },
        Person { name: String::from("Bob"), age: 25 },
    ];
    let names = extract_names(&people);
    println!("{:?}", names); // Output: ["Alice", "Bob"]
}
```

### Parsing strings into integers

```rs
fn parse_numbers(strings: &[&str]) -> Vec<i32> {
    strings.iter().filter_map(|s| s.parse::<i32>().ok()).collect()
}

fn main() {
    let number_strings = vec!["1", "2", "three", "4"];
    let numbers = parse_numbers(&number_strings);
    println!("{:?}", numbers); // Output: [1, 2, 4]
}
```

### Using an enum with a map for pattern matching

```rs
enum Shape {
    Circle(f64),   // radius
    Square(f64),   // side length
}

fn calculate_areas(shapes: &Vec<Shape>) -> Vec<f64> {
    shapes.iter().map(|shape| {
        match shape {
            Shape::Circle(radius) => std::f64::consts::PI * radius * radius,
            Shape::Square(side) => side * side,
        }
    }).collect()
}

fn main() {
    let shapes = vec![Shape::Circle(1.0), Shape::Square(2.0)];
    let areas = calculate_areas(&shapes);
    println!("{:?}", areas); // Output: [3.141592653589793, 4.0]
}
```

Key Takeaways:

- Transformation: map is used to apply a transformation to each item in an iterator, producing a new iterator of transformed items.
- Chaining: It is often used as part of an iterator chain, followed by methods like filter, collect, or for_each to further process or consume the transformed data.
- Lazy Evaluation: map does not perform the transformation until the iterator is consumed, allowing for efficient processing and memory use.

## 8.86 Vector slices

If you got a warning over `&Vec<String>`, then you likely had "clippy" installed.

What is the warning? Apparently it doesn't matter. The suggestion is that you should just use vector slices. They give a lot of the same benefits.

Using slices will give performance impacts.

We can create a vector slice like so:

```rs
fn print_elements(elements: &[String]) {
    elements
        .iter()
        .map(|el| format!("{} {}", el, el))
        .for_each(|el| println!("{}", element));
}
 
fn main() {
    let colors = vec![
        String::from("red"),
        String::from("green"),
        String::from("blue"),
    ];

		// UPDATE TO CREATE THE VECTOR SLICE
    print_elements(&colors[1..3]); 
}
```

With the slice annotation, you can call it the function with either `&Vec<String>` or `&[String]`.

Because of that, we can just pass in the full vector:

```rs
fn print_elements(elements: &[String]) {
    elements
        .iter()
        .map(|el| format!("{} {}", el, el))
        .for_each(|el| println!("{}", element));
}

fn main() {
    let colors = vec![
        String::from("red"),
        String::from("green"),
        String::from("blue"),
    ];

    print_elements(&colors);
}
```

## 8.89 Reminder on Ownership and Borrowing

In the `shorten_strings()` should modify the strings in the vector.

The caveat is that *we don't want* to create a new vector. We want to modify the existing strings.

## 8.90 Iterators with Mutable Refs

First, we show code with a small bug:

```rs
fn shorten_strings(elements: &mut Vec<String>) {
    elements.iter().for_each(|el| el.truncate(1));
}
```

`iter()` only gives a read-only reference, so naturally we want `iter_mut()` (mutable reference for each) or `into_iter()` which gives ownership of each element *unless called on a mutable ref to a vector*.

In our case, we want `iter_mut()`:

```rs
fn shorten_strings(elements: &mut [String]) {
    elements.iter_mut().for_each(|el| el.truncate(1));
}
```

## 8.92 Collecting elements from an iterator

We will now add in the `to_uppercase` function.

```rs
fn to_uppercase(elements: &[String]) -> Vec<String> {
    elements.iter().map(|el| el.to_uppercase()).collect()
}
```

The `to_uppercase()` returns a brand new string.

`.collect()` is an iterator consumer that will call `next()` for us automatically.

The `.collect()` iterator method's job is to collect all the iterator outputs into a new data structure.

There is a one gotcha to `.collect()`.

## 8.93 How collect works

Iterators can iterate over many kinds of data structures:

1. `Vec<String>`
2. HashMap (Dictionaries in Python, Object in JavaScript)
3. Doubly Linked List

Likewise, **collect** can gather values into many different kinds of data structures.

The challenging part is how does collect decide what structure to create? It uses **type annotations**.

The `-> Vec<String>` annotation is what indicates to Rust what to collect.

Alternatively, if it's not from the function signature, there are other ways to define this:

```rs
// First way, typing the variable
fn to_uppercase(elements: &[String]) -> Vec<String> {
    let result: Vec<String> = elements.iter().map(|el| el.to_uppercase()).collect();

		result
}

// Second way, typing the collect invocation
fn to_uppercase(elements: &[String]) -> Vec<String> {
    let result: Vec<String> = elements.iter().map(|el| el.to_uppercase()).collect::<Vec<String>>();

		result
}
```

For the second way, if you want to rely on Rust's type inference, you can use an underscore like so:

```rs
// Second way, typing the collect invocation
fn to_uppercase(elements: &[String]) -> Vec<String> {
    let result: Vec<String> = elements.iter().map(|el| el.to_uppercase()).collect::<Vec<_>>();

		result
}
```

Rust knows from the previous return that `_` will be replaced with `String`.

Being explicit with `.collect::<Vec<String>>();` might be the best preference.

> Note: In my example, I'm still returning the same type from the function, but just imagine a scenario where you return a different type.

## 8.94 Moving ownership with into_iter

We'll implement a function `move_elements` to move all the elements from Vector A into Vector B.

Remember, the `into_iter()` function gives you `ownership` or each element, *unless you called a ref to a vector.*

```rs
// 1
&colors.into_iter()

// 2
&mut colors.into_iter()

// 3
colors.into_iter()
```

The differences for the above:

1. **Iterator** called out of a **reference** = iterator will produce **refs** to each value.
2. **Iterator** create out of a **mutable reference** = iterator will produce **mutable refs** for each value.
3. **Iterator** created out of a **value** = Iterator will produce each **value**. Almost moves ownership of these values.

It's a little confusing, but you could use `into_iter` and not the other two functions.

The final code looks like so:

```rs
fn move_elements(vec_a: Vec<String>, vec_b: &mut Vec<String>) {
    vec_a.into_iter().for_each(|el| vec_b.push(el));
}

fn main() {
    let mut colors = vec![
        String::from("red"),
        String::from("green"),
        String::from("blue"),
    ];

    let mut destination = vec![];
    move_elements(colors, &mut destination);
    print_elements(&destination);
}
```

Remember: `colors` changes ownership when used in `move_elements`, and so *we won't* be able to print it later.

## 8.95 Inner Maps

Here we wrote an `explode` function:

```rs
fn explode(elements: &[String]) -> Vec<Vec<String>> {
    elements
        .iter()
        .map(|el| el.chars().map(|c| c.to_string()).collect())
        .collect()
}
```

## 8.96 Reminder on lifetimes

We want a function `find_color_or` to have a signature of `find_color_or(colors, search, fallback)`.

But what should we return? We should return a `String` because we need to think about the lifetime.

```rs
fn find_color_or(elements: &[String], search: &str, fallback: &str) -> String {
	// TODO: implementation
}
```

This is because when `find_color_or` is used within a function, we potentially want the value's lifetime to outlive the scope.

## 8.97 Iterators wrap up

For the implementation of `find_color_or`, we do the following:

```rs
fn find_color_or(elements: &[String], search: &str, fallback: &str) -> String {
    elements
        .iter()
        .find(|el| el.contains(search))
        .map_or(String::from(fallback), |el| el.to_string())
}
```

The definition of `find`:

```rs
core::slice::iter::Iter
impl<'a, T> Iterator for Iter<'a, T>
fn find<P>(&mut self, predicate: P) -> Option<Self::Item>
where
    Self: Sized,
    P: FnMut(&Self::Item) -> bool,
```

## 8.97.1 Extra credit: find, map_or and how to read the signatures

1. `core::slice::iter::Iter`
   This is the full path to the `Iter` struct in the Rust standard library. It's located in the `core` crate, in the `slice::iter` module.

2. `impl<'a, T> Iterator for Iter<'a, T>`
   This line is implementing the `Iterator` trait for the `Iter` struct. 
   - `'a` is a lifetime parameter
   - `T` is a generic type parameter

   You can think of this as saying: "We're implementing the Iterator behavior for Iter, which can work with any type T and has a lifetime 'a."

3. `fn find<P>(&mut self, predicate: P) -> Option<Self::Item>`
   This is the signature of the `find` method being implemented.
   - `<P>` introduces a new generic type parameter `P` for this method
   - `&mut self` means this method takes a mutable reference to self
   - `predicate: P` is the argument, of type P
   - `-> Option<Self::Item>` is the return type

4. `where`
   This keyword introduces additional constraints on the generic types.

5. `Self: Sized,`
   This constraint ensures that the type implementing this trait has a known size at compile time.

6. `P: FnMut(&Self::Item) -> bool,`
   This constraint specifies that P must be a mutable function (or closure) that takes a reference to the iterator's item type and returns a boolean.

The layout of these documentation snippets typically follows this pattern:

1. Module path
2. Implementation block
3. Function signature
4. Where clause (if any)

I apologize for the misunderstanding. You're right to ask about interpreting the documentation layout itself. Let's break down the structure of these documentation snippets and provide a way to remember how they're organized.

The layout of these documentation snippets typically follows this pattern:

1. Module path
2. Implementation block
3. Function signature
4. Where clause (if any)

Let's use an analogy of a building to help remember this structure with `map_or`:

```rs
core::option::Option
impl<T> Option<T>
pub fn map_or<U, F>(self, default: U, f: F) -> U
where
    F: FnOnce(T) -> U,
```

1. Module path: This is like the street address of the building.
   Example: `core::option::Option`

2. Implementation block: This is like the specific floor or department in the building.
   Example: `impl<T> Option<T>`

3. Function signature: This is like the name and description of a specific room or office.
   Example: `pub fn map_or<U, F>(self, default: U, f: F) -> U`

4. Where clause: These are like the special requirements or rules for entering that room.
   Example: `where F: FnOnce(T) -> U,`

To remember this structure, you can use the acronym MASW:

- M: Module path = street address
- A: Assembly (implementation block) = building floor
- S: Signature (function signature) = room name and description
- W: Where clause = Entry requirements

Let's apply this to the `map_or` example you provided:

1. Module path (Street address):
   `core::option::Option`
   This tells us we're in the `Option` type, which is in the `option` module of the `core` library.

2. Assembly/Implementation (Building floor):
   `impl<T> Option<T>`
   This indicates we're implementing methods for `Option<T>`, where `T` is any type.

3. Signature (Room name and description):
   `pub fn map_or<U, F>(self, default: U, f: F) -> U`
   This is the function signature, showing:
   - The function name: `map_or`
   - Generic parameters: `<U, F>`
   - Arguments: `self, default: U, f: F`
   - Return type: `-> U`

4. Where clause (Entry requirements):
   `where F: FnOnce(T) -> U,`
   This specifies additional constraints on the generic types, in this case that `F` must be a function that takes `T` and returns `U`.

By using the MASW structure and the building analogy, you can quickly parse and understand these documentation snippets. Each part gives you a different level of detail about the item you're looking at, from its general location in the codebase down to its specific behavior and requirements.

## 8.98 Collect exercise

This required adding a type annotation for collect:

```rs
#[derive(Debug)]
struct Account {
    balance: i32
}

fn main() {
    let accounts: Vec<Account> = vec![
        Account { balance: 0 },
        Account { balance: 10 }
    ];
    
    // TODO: getting a compiler error around the 'collect' call
    // Remember: 'collect' can be used to gather values into 
    // many kinds of data structures. We have to explicitly 
    // tell collect what kind of structure we want by adding a 
    // type annotation
    let balances = accounts
        .iter()
        .map(|account| account.balance)
        .collect::<Vec<i32>>();
        
    println!("Balances: {:#?}", balances);
}
```

## 8.100 Filter method exercise

Very similar to the previous exercise, but using an iterator adaptor:

```rs
#[derive(Debug)]
struct Account {
    balance: i32,
}

fn main() {
    let accounts: Vec<Account> = vec![
        Account { balance: 0 },
        Account { balance: 10 },
        Account { balance: -15 },
        Account { balance: 27 },
        Account { balance: -3 },
    ];

    // TODO: Add in a call to the 'filter' iterator adaptor.
    // Find accounts that have a balance less than 0.
    // You can find documentation on 'filter' here:
    // https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter
    let negative_accounts = accounts
        .iter()
        .filter(|el| el.balance < 0)
        .collect::<Vec<_>>();

    println!("Accounts with negative balance: {:#?}", negative_accounts);
}
```

We could also use this:

```rs
let negative_accounts = accounts
  .iter()
  .filter(|el| el.balance.is_negative())
  .collect::<Vec<_>>();
```