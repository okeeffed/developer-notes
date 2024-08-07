# 1 Rust Foundations

This covers both section (1) and section (2) of the course.

## Keywords used in this section

Here is a consolidated list of unique keywords, combining terms that differ only in capitalization or singular/plural forms:

1. Inheritance
2. Default visibility
3. Methods vs data
4. Constructors
5. Encapsulation
6. Vector
7. Array
8. Attributes
9. Derive attribute
10. Trait
11. Debug trait
12. Inherent implementation
13. Method
14. Associated function
15. Implicit returns
16. Module
17. Root module
18. Submodule
19. Extension trait
20. Extension pattern
21. `usize`
22. `isize`

## 1.1 Installation and first steps

- Install [here](rust-lang.org/tools/install)

## 1.2 Creating and Running Rust Projects

We're going to simulate a collection of playing cards.

We want a `new`, `shuffle` and `deal` functionality.

To create a new project:

```s
# Creating a new deck project
$ cargo new deck
$ cd deck
$ cargo run
```

> You can add `cargo run -q` to run a quiet project without the extra information.

## 2.6 Representing data with structs

Before going too far, some things to note about the code:

```rs
fn main() {
    println!("Hello, world!");
}
```

- Strings require double quotes.
- `println!` uses a macro. We'll talk about this later.

We want to store some data and attach some functionality to it. A good tool for this is a `struct`. You can think of them as similar to "classes" in other languages.

```rs
struct Deck {
  cards: Vec<String>,
}
```

Here we introduce **vectors**. They are like an array that can grow/shrink in size. Rust also has arrays, but they have fixed length.

We can create an instance as so:

```rs
let deck = Deck { cards: vec![] };
```

- `Deck { cards: vec![] }` is a struct literal.
- Please note: "variables" in Rust are idiomatically referred to as "bindings".

An equivalent for `vec![]` is `Vec::new()`. Both are the same.

### 2.6.1 Extra credit: structs 

While structs in Rust share some similarities with classes in other programming languages, there are important differences. Let me explain:

Similarities:

- Both structs and classes are used to group related data together.
- They can have methods associated with them.

Key differences:

1. **Inheritance**: Rust structs don't support inheritance, unlike classes in many object-oriented languages.
2. **Default visibility**: Struct fields in Rust are private by default, while in many OOP languages, class members are often public by default.
3. **Methods vs data**: In Rust, methods are defined separately from the struct definition, whereas in many OOP languages, methods are typically defined within the class.
4. **Constructors**: Rust doesn't have special constructor methods; you typically create an associated function named `new()` by convention.
5. **Encapsulation**: Rust achieves encapsulation through modules rather than access modifiers on individual fields.

A good analogy for a struct could be a **blueprint for a house**. Just as a blueprint defines the structure and layout of a house, a struct defines the structure and layout of data. The blueprint specifies where rooms go (like fields in a struct), but it doesn't include the actual furniture or decorations (which would be like the data stored in an instance of the struct).

This analogy works because:

1. A blueprint is a template, just as a struct is a template for data.
2. You can create many houses from one blueprint, just as you can create many instances of a struct.
3. The blueprint defines the structure, but not the specific contents, similar to how a struct defines fields but not their values until instantiated.

### 2.6.2 Extra credit: vec![] vs Vec::new()

The statement "An equivalent for vec![] is Vec::new(). Both are the same." is true because both expressions create an empty vector in Rust, but they do so in slightly different ways. Let me break this down:

- `Vec::new()`: This is a direct call to the new() associated function of the Vec struct.
It creates a new, empty vector with no allocated capacity.
- `vec![]`: This is a macro invocation.

The `vec!` macro is a convenience macro provided by the Rust standard library.
When called with empty square brackets, it also creates a new, empty vector.

The reason they are equivalent is that the `vec![]` macro, when expanded, essentially calls `Vec::new()` under the hood. The macro exists to provide a more concise syntax and to allow for easy initialization with values.
Key points:

Both create an empty `Vec<T>` where `T` is inferred from context.
Both result in a vector with zero length and zero capacity.
The performance characteristics are identical.
The type of the resulting vector is the same.

It's worth noting that while they are functionally equivalent when creating empty vectors, the `vec!` macro is more versatile. It can also be used to create pre-populated vectors, like `vec![1, 2, 3]`, which `Vec::new()` cannot do directly.

## 2.7: Adding functionality to structs

At this point, we have this code:

```rs
struct Deck {
    cards: Vec<String>,
}

fn main() {
    let deck = Deck { cards: vec![] };
    println!("Here's your deck: {}", deck);
}
```

However, `deck` is getting an error about "not implementing some trait thing".

In general, following the tips, we end up with this code:

```rs
#[derive(Debug)]
struct Deck {
    cards: Vec<String>,
}

fn main() {
    let deck = Deck { cards: vec![] };
    println!("Here's your deck: {:?}", deck);
}
```

If we run `cargo run`, we get:

```txt
Here's your deck: Deck { cards: [] }
```

The statement `#[derive(Debug)]` defines **attributes** for the Deck struct. These give the rust compiler some extra instructions on how to process the struct.

In our case, we are providing the **derive attribute**. It specifies which **traits** to automatically implement for this struct.

We want to derive the **Debug trait**. This **trait** is a set of functions.

So what's happening behind the scenes? We can imagine that we are saying "hey compiler, automatically add all of the 'Debug' functions to this struct". It will add those helpers behind the scenes using the compiler.

### 2.7.1 Extra credit: The Debug trait

1. What it does:
   The `derive` attribute automatically implements the `Debug` trait for your `Deck` struct. This trait provides a way to format the struct for debugging purposes, allowing you to print it or use it in debug statements.

2. Behind the scenes:
   When you use `#[derive(Debug)]`, the Rust compiler generates an implementation of the `Debug` trait for your struct. This saves you from having to manually implement the `fmt::Debug` trait yourself.

3. Mental model:
   Think of `#[derive(Debug)]` as a code generator. It's like telling the compiler, "Please write the code to make this struct printable for debugging purposes."

4. Analogy:
   A good analogy might be a blueprint copier in an architect's office. 

   - Your struct definition is like the original blueprint for a building.
   - The `#[derive(Debug)]` attribute is like a special copier that not only copies your blueprint but also automatically adds standardized annotations and labels to make it easier for others to understand and inspect.
   - Just as the copier saves the architect time by automatically adding these annotations, `derive(Debug)` saves the programmer time by automatically implementing debug formatting.

5. What it enables:
   After deriving `Debug`, you can:
   - Use `println!("{:?}", deck);` to print a debug representation of your `Deck`.
   - Use the struct in contexts that require the `Debug` trait, like certain error handling scenarios.

6. Generated code:
   While you don't see it, the compiler essentially generates an implementation similar to this:

```rust
impl fmt::Debug for Deck {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Deck")
         .field("cards", &self.cards)
         .finish()
    }
}
```

This automatic derivation is part of Rust's philosophy of making common operations easy and reducing boilerplate code. It's particularly useful for basic traits like `Debug`, `Clone`, `Copy`, etc., where the implementation is often straightforward and mechanical.

## 2.8: Arrays vs vectors

We've quickly covered **Vector** vs **Array** before, but let's cover some more.

- Array has a slight performance benefit.
- We usually use one or another to signal to another developer to indicate if it will change or not.

In our case of cards, it makes more sense to use arrays instead of vectors for this.

Instead of this:

```rs
// List of suits
let suits = vec!["Hearts", "Diamonds", "Clubs", "Spades"];

// List of values
let values = vec![
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace",
];
```

We will do this:

```rs
// List of suits
let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

// List of values
let values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace",
];
```

> In the vector example, we get type `Vec<&str>`, whereas for the array example we get type `[&str; 4]` where 4 is the length of the array (different for our `values` array of course).

```rs
let mut cards = vec![]

// Double for loop to create a deck of cards
for suit in suits {
    for value in values {
        let card = format!("{} of {}", value, suit);
        cards.push(card);
    }
}
```

## 2.9: Mutable vs Immutable Bindings

Bindings are immutable by default.

Use the `let mut` key word when you know that you need to mutate some state.

## 2.10: Implementations and methods

We're going to clean up the current code:

```rs
#[derive(Debug)]
struct Deck {
    cards: Vec<String>,
}

fn main() {
    // List of suits
    let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

    // List of values
    let values = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace",
    ];

    let mut cards = vec![];

    // Double for loop to create a deck of cards
    for suit in suits {
        for value in values {
            let card = format!("{} of {}", value, suit);
            println!("{}", card);

            cards.push(card);
        }
    }

    let deck = Deck { cards };
    println!("Here's your deck: {:#?}", deck);
}
```

The aim is to have something like `Deck::new()` do that work for us.

We are going to do that using a **inherent implementation**:

```rs
impl Deck {
	fn new() -> Deck {
		// TODO
	}
}
```

The return type annotation `-> Deck` helps Rust know what type is being returned.

More often though, you will see `Self` used as a reference to the parent implementation block.

```rs
impl Deck {
	fn new() -> Self {
		// TODO
	}
}
```

We can shift around our existing to do this:

```rs
#[derive(Debug)]
struct Deck {
    cards: Vec<String>,
}

impl Deck {
    fn new() -> Self {
        // List of suits
        let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

        // List of values
        let values = [
            "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace",
        ];

        let mut cards = vec![];

        // Double for loop to create a deck of cards
        for suit in suits {
            for value in values {
                let card = format!("{} of {}", value, suit);
                println!("{}", card);

                cards.push(card);
            }
        }

        let deck = Deck { cards };
        return deck;
    }
}

fn main() {
    let deck = Deck::new();
    println!("Here's your deck: {:#?}", deck);
}
```

Some more on **inherent implementations**:

- Fancy term for "add a function to a struct".
- Used to define **methods** and **associated functions**.

**Associated functions** are identical in other languages to "class methods". Our `new` declaration is an example of this. Examples could include `full_deck()`, `with_n_cards(10)` or `empty_deck()` to bind a variable to a particular instance.

**Methods** operate on a specific instance of a struct. That will be like our `fn shuffle(&self)` that we will be writing out soon. Examples include functionality to shuffle cards, add a card, remove a card, check if a card exists.

## 2.10.1 Extra credit: Associated functions and methods

Certainly! Let's break down associated functions and methods in Rust, and I'll provide an analogy to help you remember the difference.

Associated Functions:

- These are functions that are associated with a type (like a struct or an enum) but don't take a `self` parameter.
- They're called on the type itself, not on instances of the type.
- In other languages, these might be called "static methods."
- They're defined using `impl` blocks, just like methods.

Methods:

- These are functions that are associated with a type and take `self`, `&self`, or `&mut self` as their first parameter.
- They're called on instances of the type.
- They can access and manipulate the data of the instance they're called on.

Here's a simple code example to illustrate:

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // This is an associated function
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }

    // This is a method
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    // Using the associated function
    let rect = Rectangle::new(10, 20);

    // Using the method
    println!("Area: {}", rect.area());
}
```

### Analogy: Factory and Product

Imagine a car factory:

1. Associated Functions (The Factory):
   - These are like the operations of the car factory itself.
   - They don't operate on a specific car, but rather on the concept of cars in general.
   - For example, the factory might have a function to create a new car (like our `new` function above).
   - You'd call these on the factory: `CarFactory::create_new_car()`

2. Methods (The Car):
   - These are like the operations you can perform on a specific car that's been produced.
   - Each operation is tied to a particular car instance.
   - For example, you might have methods to start the engine, check the fuel level, or calculate fuel efficiency.
   - You'd call these on a specific car: `my_car.start_engine()`

Key points to remember:

- **Associated functions** are called on the type (like calling the factory).
- **Methods** are called on **instances** (like operating a specific car).
- Associated functions are useful for constructors and other operations that don't need a specific instance.
- Methods are used when you need to interact with the data of a specific instance.

This analogy helps illustrate why we use **associated functions** for things like constructors (`new`) - because we're asking the "factory" to create a new instance for us, rather than operating on an existing instance.

## 2.11 Implicit Returns

Firstly, we can update our **associated function** `new` to use an implicit returns:

```rs
#[derive(Debug)]
struct Deck {
    cards: Vec<String>,
}

impl Deck {
    fn new() -> Self {
        // List of suits
        let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

        // List of values
        let values = [
            "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace",
        ];

        let mut cards = vec![];

        // Double for loop to create a deck of cards
        for suit in suits {
            for value in values {
                let card = format!("{} of {}", value, suit);
                println!("{}", card);

                cards.push(card);
            }
        }

        Deck { cards }
    }
}

fn main() {
    let deck = Deck::new();
    println!("Here's your deck: {:#?}", deck);
}
```

Returning `Deck {cards}` _with no semicolon_ is an example of using an implicit return. It returns the last executed expression.

## 2.12 Installing external crates

Crate = Package.

For example, "The Rust Standard Library" is a crate included with every project.

We will use a random number generator.

We can use `cargo add <pkg>` to add an external crate.

We can use https://crates.io and https://docs.rs to search for useful crates.

```s
# Add rand 
$ cargo add rand
```

This will also update your `Cargo.toml` file.

## 2.13 Using our rand crate

Code in crates + programs is organized into **modules**.

Every crate has a **root module** and may have some additional **submodules**.

Every crate we install also obeys this.

For our case, we will use `thread_rng()` from the root module, and the **Trait** `SliceRandom` from a submodule.

Note: using modules from other crates is a little bit different to how we use submodules from our own project. We need to declare `mod <submodule>` for our own submodules that we want to use.

```rs
mod oursubmodule;
use rand::{thread_rng, seq::SliceRandom};
```

## 2.14 Shuffling a Slice

We implement our `shuffle` method as the following:

```rs
fn shuffle(&mut self) {
    let mut rng = thread_rng();
    self.cards.shuffle(&mut rng);
}
```

## 2.13.1 Extra credit: Explaining what happened

```rust
fn shuffle(&mut self) {
    let mut rng = thread_rng();
    self.cards.shuffle(&mut rng);
}
```

1. `fn shuffle(&mut self)`:
   - This declares a method named `shuffle`.
   - `&mut self` means it takes a mutable reference to the instance it's called on. This allows the method to modify the `Deck`.

2. `let mut rng = thread_rng();`:
   - `thread_rng()` is a function from the `rand` crate that returns a thread-local random number generator.
   - We're creating a mutable random number generator and naming it `rng`.

3. `self.cards.shuffle(&mut rng);`:
   - `self.cards` refers to the `Vec<String>` inside the `Deck` struct.
   - `.shuffle()` is a method provided by the `rand` crate for `Vec` types.
   - It takes a mutable reference to a random number generator (`&mut rng`).

Now, let's dive deeper into how `self.cards.shuffle(&mut rng)` works:

1. The `shuffle` method is implemented by the `rand` crate for slices (which includes vectors).

2. It uses the Fisher-Yates shuffle algorithm (also known as Knuth shuffle) internally. This algorithm works by iterating through the array from the last element to the first:
   - For each index i, it generates a random number j between 0 and i (inclusive).
   - It then swaps the elements at positions i and j.

3. By passing `&mut rng`, we're giving the shuffle algorithm a source of randomness to use when deciding which elements to swap.

4. This process effectively randomizes the order of the cards in the vector.

An analogy to understand this process:

Imagine you have a deck of cards laid out in order. To shuffle them:

1. Start from the last card.
2. Roll a die (your random number generator).
3. Swap this card with the card at the position shown on the die.
4. Move to the previous card and repeat until you reach the first card.

This is essentially what `self.cards.shuffle(&mut rng)` is doing, but very quickly and with a more sophisticated "die" (the random number generator).

The beauty of using the `rand` crate's `shuffle` method is that it implements this algorithm efficiently and correctly, saving you from having to write and debug this logic yourself.

## 2.13.2 Extra credit: How SliceRandom impacts vectors

1. What's happening is that the `rand` crate provides an **extension trait** for slices (which includes vectors). This trait is called `SliceRandom`.

2. When you use `use rand::seq::SliceRandom;` at the top of your file, you're bringing this **trait** into **scope**.

3. This trait provides additional methods for types that can be treated as **slices**, including **vectors**. One of these methods is `shuffle`.

4. In Rust, when a **trait** is in **scope**, you can use its methods on types that implement that **trait**, which is why you can call `shuffle` on `self.cards`.

So, it's not that `Vec` inherits these functions, but rather that the `SliceRandom` **trait** extends the functionality of **slices** (and thus **vectors**) when it's in **scope**.

This is a powerful Rust feature called **"extension traits"** or sometimes referred to as the **"extension pattern"**. It allows libraries to add functionality to existing types without modifying their original implementation.

To make this clearer, you could write the `use` statement more explicitly:

```rust
use rand::seq::SliceRandom;
```

Then, in your `shuffle` method, you're implicitly using this trait:

```rust
fn shuffle(&mut self) {
    let mut rng = thread_rng();
    SliceRandom::shuffle(&mut self.cards, &mut rng);
}
```

This is equivalent to `self.cards.shuffle(&mut rng);`, but it makes it more apparent that we're using a method provided by the `SliceRandom` trait.

This pattern allows for great flexibility and modularity in Rust's design, enabling libraries to extend the functionality of types they don't own, without affecting the original type's implementation.

## 2.14 Splitting a vector

In Rust, all numbers have a type associated with them.

The three category prefixes:

1. i: Refers to positive and negative integers.
2. u: Refers to unsigned integers (positive only).
3. f: References to floating point numbers (decimal values).

There are some types `isize` and `usize` that are a bit special. Check extra credit.

We will make the use of a vector method `split_off`. From the docs:

> Splits the collection into two at the given index.
> 
> Returns a newly allocated vector containing the elements in the range `[at, len)`. After the call, the original vector will be left containing the elements `[0, at)` with its previous capacity unchanged.


Our implementation will look like this:

```rs
fn deal(&mut self, num_cards: usize) -> Vec<String> {
  self.cards.split_off(self.cards.len() - num_cards)
}
```

We can update our `main` function to the following:

```rs
fn main() {
    let mut deck = Deck::new();
    deck.shuffle();

    let cards = deck.deal(3);
    println!("Here's your cards: {:#?}", cards);
}
```

An when we run `cargo run`, we will get some output at the end:

```txt
Here's your cards: [
    "Jack of Diamonds",
    "Queen of Diamonds",
    "2 of Clubs",
]
```

At this point, we actually have a bug when we use `deal` values greater than our cards length, we'll have an issue.

```txt
thread 'main' panicked at src/main.rs:39:30:
attempt to subtract with overflow
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

Error handling is going to be delegated until later in another project. Just note that you will need to handle that.

## 2.14.1 Extra credit: usize and isize

`usize` and `isize` are indeed special integer types in Rust. Let me explain their significance and use cases:

1. Definition:
   - `usize`: An unsigned integer type
   - `isize`: A signed integer type

2. Size:
   The key characteristic of these types is that their size matches the pointer size of the target platform:
   - On 32-bit systems, they are 32 bits (4 bytes)
   - On 64-bit systems, they are 64 bits (8 bytes)

3. Why they're special:
   - They adapt to the architecture of the machine running the program
   - They're guaranteed to be large enough to represent the size of any object in memory

4. Primary use cases:

   For `usize`:
   - Array indexing
   - Representing sizes of collections (e.g., length of a vector)
   - Representing memory addresses or offsets
   - Loop counters when iterating over collections

   For `isize`:
   - Less commonly used than `usize`
   - Useful for pointer arithmetic that may involve negative offsets
   - When you need a signed integer that can represent the full range of memory addresses

5. Examples:

```rust
let arr = [1, 2, 3, 4, 5];
let index: usize = 2;
println!("Element at index {}: {}", index, arr[index]);

let vec = vec![10, 20, 30];
let length: usize = vec.len();
println!("Vector length: {}", length);
```

1. Advantages:
   - Portability: Code using `usize`/`isize` can run efficiently on different architectures without modification
   - Safety: Using `usize` for indexing prevents certain types of overflow errors that could occur with fixed-size types

2. Considerations:
   - When interacting with external systems or file formats that require fixed-size integers, you should use specific types like `u32`, `i64`, etc.
   - For general arithmetic not related to sizes or indices, it's often better to use `i32` or `i64`

An analogy to understand `usize` and `isize`:

`usize` and `isize` are like rulers that automatically adjust their scale to fit the size of your workspace, always providing the maximum possible measurement range for your current system.

To summarize: `usize` and `isize` are architecture-adaptive integer types that automatically adjust their size to match the pointer width of the system, making them ideal for memory addressing, array indexing, and representing collection sizes in a portable manner.