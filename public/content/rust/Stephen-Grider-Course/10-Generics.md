# Generics and traits

In this example, set up a new cargo project and add a crate:

```s
# Adding the crate
$ cargo add num-traits 
```

We are going to add pythagorean theorem function. We will come to learn that numbers are a little bit more awkward.

## 10.110 Issues with number types

Rust doesn't automatically convert number types for you.

The following won't compile:

```rs
fn solve(a: f64, b: f64) -> f64 {
    (a.powi(2) + b.powi(2)).sqrt()
}

fn main() {
    let a: f32 = 3.0;
    let b: f64 = 4.0;

    println!("Result {}", solve(a, b))
}
```

You can't even do arithmetic (like `a + b`).

We could convert it directly to a float 64 prior to passing the value.

```rs
fn solve(a: f64, b: f64) -> f64 {
    (a.powi(2) + b.powi(2)).sqrt()
}

fn main() {
    let a: f32 = 3.0;
    let b = 4.0;

    let a_f64 = a as f64;

    println!("Result {}", solve(a, b))
}
```

We could also use the crate `num-traits` that we just installed.

```rs
use num::traits::ToPrimitive;

fn solve(a: f64, b: f64) -> f64 {
    (a.powi(2) + b.powi(2)).sqrt()
}

fn main() {
    let a: f32 = 3.0;
    let b = 4.0;

    let a_f64 = a.to_64().unwrap();

    println!("Result {}", solve(a, b))
}
```

It adds some helpful helpers to do the conversions.

For what it's worth, `solve` is also very annoyingly strict. Let's solve this.

## 10.111 Basics of generics

To support f32, we can write code like so:

```rs
use num::traits::{Float, ToPrimitive};

fn solve<T: Float>(a: T, b: T) -> f64 {
    let a_f64 = a.to_f64().unwrap();
    let b_f64 = b.to_f64().unwrap();

    (a_f64.powi(2) + b_f64.powi(2)).sqrt()
}

fn main() {
    let a: f32 = 3.0;
    let b: f32 = 4.0;

    println!("Result {}", solve::<f32>(a, b))
}
```

The generic type is like arguments for types.

We also don't strictly need the `::<TYPE>` annotation on `solve` at the call site either. It just helps for completeness, but you can rely on inference.

## 10.112 Trait bounds

In the context of the code before, "Float" is a trait. Here is it being used as a **trait bound**.

A **trait** is a set of methods. It can contain **abstract methods** which don't have an implementation, and it can contain **default methods** which have an implementation:

```rs
trait Vehicle {
	// abstract method
	fn start(&self);

	// default method
	fn stop(&self) {
		println!("Stopped");
	}
}

struct Car {};

impl Vehicle for Car {
	fn start(&self) {
		println!("Start!!!");
	}
}
```

A struct/enum/primitive can implement a trait.

The implementor has to provide an implementation for all of the **abstract methods**.

The implementor can **optionally** override the default methods.

When we use it with generics:

```rs
fn start_and_stop<T: Vehicle>(vehicle: T) {
	vehicle.start();

	vehicle.stop();
}

fn main() {
	let car = Car {};

	start_and_stop(car);
}
```

Then `T` is using `Vehicle` as a trait bound.

## 10.113 Multiple generic types

What happens if we want to two different float types? We can use multiple generics:

```rs
use num::traits::{Float, ToPrimitive};

fn solve<T: Float, U: FLoat>(a: T, b: U) -> f64 {
    let a_f64 = a.to_f64().unwrap();
    let b_f64 = b.to_f64().unwrap();

    (a_f64.powi(2) + b_f64.powi(2)).sqrt()
}

fn main() {
    let a: f32 = 3.0;
    let b: f32 = 4.0;

    println!("Result {}", solve(a, b))
}
```

## 10.114 Super solve flexibility

How can we pass in any time of number?

We could use `ToPrimitive` trait instead of the `Float` trait:

```rs
use num::traits::ToPrimitive;

fn solve<T: ToPrimitive, U: ToPrimitive>(a: T, b: U) -> f64 {
    let a_f64 = a.to_f64().unwrap();
    let b_f64 = b.to_f64().unwrap();

    (a_f64.powi(2) + b_f64.powi(2)).sqrt()
}

fn main() {
    let a: f32 = 3.0;
    let b: f32 = 4.0;

    println!("Result {}", solve(a, b))
}
```

## 10.115 Traits app overview

We want to make a `Basket` struct that can hold any kind of data.

We also want a `get`, `put` and `is_empty` method.

`put` will also have a corner case where if a number is stored, it sums up the store.

We will also make a `Stack` struct. It will have identical methods, but different implementations.

We can use a **trait** for both to make things more flexible.

## 10.116 Building the basket

```rs
// basket.rs
pub struct Basket {
    item: Option<String>,
}

impl Basket {
    pub fn new(item: String) -> Self {
        Basket { item: Some(item) }
    }

    pub fn get(&mut self) -> Option<String> {
        self.item.take()
    }

    pub fn put(&mut self, item: String) {
        self.item = Some(item);
    }

    pub fn is_empty(&self) -> bool {
        self.item.is_none()
    }
}
```

In `main.rs` for now:

```rs
mod basket;

use basket::Basket;

fn main() {
    let b1 = Basket::new("apple".to_string());
}
```

## 10.117 Generic structs

Let's update our basket to be more generic.

```rs
// basket.rs
pub struct Basket<T> {
    item: Option<T>,
}

impl<T> Basket<T> {
    pub fn new(item: T) -> Self {
        Basket { item: Some(item) }
    }

    pub fn get(&mut self) -> Option<T> {
        self.item.take()
    }

    pub fn put(&mut self, item: T) {
        self.item = Some(item);
    }

    pub fn is_empty(&self) -> bool {
        self.item.is_none()
    }
}
```

Why the two Ts in `impl<T> Basket<T>`?

First, let's take note of something in `main.rs`:

```rs
mod basket;

use basket::Basket;

fn main() {
    let b1 = Basket::new("apple".to_string());
    let b2 = Basket::new(3.14);
    let b3 = Basket::new(true);
}
```

Right now, each basket binding will only even be able to work with the type it was initialized with.

In `impl<T> Basket<T>`, the first T is a list of generics while the second T is the reference to those generics (simile to `fn example<T>(arg: T) {}`).

- The first one says it's going to be a generic implementation.
- The second is the reference. 

## 10.118 More on generic structs

Let's create our stack:

```rs
// stack.rs
pub struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    pub fn new(items: Vec<T>) -> Self {
        Stack { items }
    }

    pub fn get(&mut self) -> Option<T> {
        self.items.pop()
    }

    pub fn put(&mut self, item: T) {
        self.items.push(item);
    }

    pub fn is_empty(&self) -> bool {
        self.items.is_empty()
    }
}
```

As with before, we can use it in `main.rs`:

```rs
mod basket;
mod stack;

use basket::Basket;
use stack::Stack;

fn main() {
    let b1 = Basket::new("apple".to_string());
    let b2 = Basket::new(3.14);
    let b3 = Basket::new(true);

    let s1 = Stack::new(vec![1, 2, 3]);
}
```

## 10.119 Implementing a trait

First, we create the trait:

```rs
// container.rs
pub trait Container<T> {
    fn get(&mut self) -> Option<T>;
    fn put(&mut self, item: T);
    fn is_empty(&self) -> bool;
}
```

Then we update our basket and stacks:

```rs
use super::container::Container;

pub struct Basket<T> {
    item: Option<T>,
}

impl<T> Basket<T> {
    pub fn new(item: T) -> Self {
        Basket { item: Some(item) }
    }
}

impl<T> Container<T> for Basket<T> {
    fn get(&mut self) -> Option<T> {
        self.item.take()
    }

    fn put(&mut self, item: T) {
        self.item = Some(item);
    }

    fn is_empty(&self) -> bool {
        self.item.is_none()
    }
}
```

> Stack is effectively the same changes.

Things to note:

1. You need a separate `impl` block for methods that are not part of the trait.
2. A public trait means you don't need the `pub` keyword.

The final code in `main.rs`:

```rs
mod basket;
mod container;
mod stack;

use basket::Basket;
use container::Container;
use stack::Stack;

fn add_string<T: Container<String>>(container: &mut T, s: String) {
    container.put(s);
}

fn main() {
    let mut b1 = Basket::new("apple".to_string());
    let b2 = Basket::new(3.14);
    let b3 = Basket::new(true);

    let s1 = Stack::new(vec![1, 2, 3]);
    let mut s2 = Stack::new(vec![
        String::from("a"),
        String::from("b"),
        String::from("c"),
    ]);

    add_string(&mut b1, String::from("banana"));
    add_string(&mut s2, String::from("banana"));
}
```