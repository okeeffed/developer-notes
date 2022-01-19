# 5: The Meat of Rust

## Structs

```rs
struct RedFox {
	enemy: bool,
	life: u8,
}
```

To instantiate:

```rs
let fox = RedFox {
	enemy: true,
	life: 5,
};
```

You need to specify all the fields, which can be verbose.

You can specify an association function to provide default values:

```rs
impl RedFox {
	// Note: instead of `Self`, we could use the name of the struct `RedFox`
	// but recommended this way.
	fn new() -> Self {
		Self {
			enemy: true,
			life: 5,
		}
	}
}

let fox = RedFox::new();
```

The implementation block is separate from the `struct` declaration.

Associated functions are used like constructors in other languages.

Methods are also defined within the implementation block:

```rs
impl RedFox {
	// associated function
	fn function() ...
	// methods
	fn move(self) ...
	fn borrow(&self) ...
	fn mut_borrow(&mut self) ...
}
```

You can implement a "get" or "set" method like the following example:

```rs
// This stub file contains items which aren't used yet; feel free to remove this module attribute
// to enable stricter warnings.
#![allow(unused)]

pub struct User {
    name: String,
    age: u32,
    weight: f32,
}

impl User {
    pub fn new(name: String, age: u32, weight: f32) -> Self {
        Self {
            name: name,
            age: age,
            weight: weight,
        }
    }

    pub fn name(&self) -> &str {
        &self.name
    }

    pub fn age(&self) -> u32 {
        self.age
    }

    pub fn weight(&self) -> f32 {
        self.weight
    }

    pub fn set_age(&mut self, new_age: u32) {
        self.age = new_age;
    }

    pub fn set_weight(&mut self, new_weight: f32) {
        self.weight = new_weight;
    }
}
```

Note at this point: there is no struct inheritance in Rust.

So why doesn't struct use inheritance? Because we have `traits`.

## Traits

Similar to interfaces in other languages. Rust goes with the composition over inheritance approach.

```rs
trait Noisy {
	fn get_noise(&self) -> &str;
}
```

The example above is a trait. Any struct that implements the trait **must have** the function `get_noise` implemented following the implementation signature.

```rs
struct RedFox {
	enemy: bool,
	life: u32,
}

trait Noisy {
	fn get_noise(&self) -> &str;
}

impl Noisy for RedFox {
	fn get_noise(&self) -> &str { "Meow?" }
}
```

Why does this as opposed to implementing it directly? Well now we can start to use generics that accept structs that implement a trait.

```rs
fn print_noise<T: Noisy>(item: T) {
	println!("{}", item.get_noise());
}
```

There is a special trait called `Copy` where if implemented, then the type is copied and not moved.

You can also implement multiple traits. Traits themselves implement inheritance.

Traits can also implement default behaviors:

```rs
// Without default behaviour
trait Noisy {
	fn get_noise(&self) -> &str;
}

// With default behaviour
trait Noisy {
	fn get_noise(&self) {
		println!("Meow?");
	}
}

struct Robot {}
impl Noisy for Robot {}

fn main() {
	let robot = Robot {};
	print_noise(robot); // Prints "Meow?"
}
```

One gotcha: you cannot defined fields as part of a trait. The workaround is writing getter/setter methods.

## Collections

The following are collections that all all come from the library.

### Vectors

Vectors `Vec<T>` are a collection that only hold one type are useful where you would use list or arrays in other languages.

```rs
let mut v: Vec<i32> = Vec::new();
v.push(2);
v.push(4);
v.push(6);
```

Vectors act like a stack. `push` and `pop` operate like you would expect for a stack.

The is a macro `vec!` that make vector literals more ergonomic.

## HashMap

HashMap `HashMap<K, V>` is a generic collection that holds a key and a value.

In other languages, this might be called a dictionary.

```rs
let mut h: HashMap<u8, bool> = HashMap::new();
h.insert(5, true);
h.insert(6, false);
// `remove` returns an Option<V> enum.
let have_five = h.remove(&5).unwrap();
```

There are also methods for getting reference to values or iterating through.

Some other important types:

| Type         | Description                                          |
| ------------ | ---------------------------------------------------- |
| `VecDeque`   | A double-ended queue.                                |
| `LinkedList` | What you expect                                      |
| `HashSet`    | Hashing implementation of a set.                     |
| `BinaryHeap` | A priority queue that always pops off the max value. |
| `BTreeMap`   | BTree implementation of a Map.                       |
| `BTreeSet`   | BTree implementation of a Set.                       |

## Enums

Enums in Rust are more like Algebraic Data Types in Haskell.

```rs
enum Color {
	Red,
	Green,
	Blue
}

let color = Color::Red;
```

The real power of an enum come from associating data and methods with the variants.

```rs
enum DispenserItem {
	Empty,
	Ammo(u8), // single type of data
	Things(String, i32), // a tuple of data
	Place { x: i32, y: i32 }, // an anonymous struct of data
}

use DispenserItem::*;

// all the following are valid but could only be one at a time.
let item = Empty;
let item2 = Ammo(69);
let item3 = Things("hat".to_string(), 7);
let item4 = Place { x: 2, y: 3 };
```

You can even implement functions and methods for an enum:

```rs
impl DispenserItem {
	fn display(&self) { }
}
```

You can also use enums with generics.

```rs
enum Option<T> {
	Some(T),
	None,
}
```

Because enums can represent all sorts of data, you need to use patterns to access them:

```rs
if let Some(x) = my_variable {
	println!("value is {}", x);
}
```

If you need multiple handlers, you can use the `match` keyword:

```rs
match my_variable {
	Some(x) => {
		println!("value is {}", x);
	},
	None => {
		println!("no value");
	},
}
```

Match expression require you to write a branch for each variant. They are exhaustive. All branch arms must also return nothing or the same type.

### Option & Result

These are special enums used all over the standard library.

```rs
let mut x: Option<i32> = None;
x = Some(5);
x.is_some(); // true
x.is_none(); // false

for i in x {
	println!("{}", i); // prints 5
}
```

`Option` is part of the standard pre-load and does not need to be imported.

`Result` is used whenever something might have a useful result or an error.

```rs
#[must_use]
enum Result<T, E> {
	Ok(T),
	Err(E),
}
```

Let's see it in action:

```rs
use std::fs::File;

fn main() {
	let res = File::open("foo");
	let f = res.unwrap(); // Gives file struct or crashing program
}

// another option
fn main() {
	let res = File::open("foo");
	let f = res.expect("Err message"); // Same as unwrap but also printing in crash output
}

// for safety
fn main() {
	let res = File::open("foo");
	if res.is_ok() {
		let f = res.unwrap(); // will not crash
	}
}

// can also match on a result
fn main() {
	let res = File::open("foo");
	match res {
		Ok(f) => {
			// do something with f
		},
		Err(e) => {
			// handle error
		},
	}
}
```
