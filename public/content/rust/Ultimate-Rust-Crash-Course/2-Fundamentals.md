# 2: Fundamentals

Rust has a steep learning curve at the start.

It is important to focus on the fundamentals.

Rust is loved because of the following:

1. Safety.
2. Concurrency.
3. Speed.

Rust was created in 2006 as a passion project of a Mozilla employee.

## Cargo

Cargo is a package manager for Rust, as well as the build system, docs generator and scripts runner.

`main.rs` is the file required to run our main application.

Some commands to note:

| Cmd                     | Does                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| `cargo run`             | Runs the application with debug symbols.                             |
| `cargo run --release`   | Runs the application without debug symbols. Takes longer to compile. |
| `rustc --explain E0384` | Explains the compile error message.                                  |

## Variables

```rs
fn main() {
	// Base initialization
	let bunnies = 2;
	// Initialising multiple variables at once
	let (bunny_count, carrots) = (2, 3);
}
```

Rust intentionally mimics other languages: C and Python in particular.

You can have immutable variables, mutable variables and constants (more immutable-r).

```rs
fn main() {
	// Must be determined at compile time
	const WARP_FACTOR: f64 = 9.9;
}
```

You can use a constant as a global and since they are inlined at compile time, they are really fast.

## Scope

```rs
fn main() {
	let x = 5;
	{
		let y = 10;
		println!("{}, {}", x, y);
	}
	println!("{}, {}", x, y); // error: use of moved value: `y`
}
```

You can also shadow a variable in the same scope:

```rs
fn main() {
	let mut x = 5; // x is mutable
	let x = x; // x is now immutable
}
```

## Memory safety

Rust guarantees safety at compile time.

```rs
fn main() {
	let enigma: i32;
	println!("{}", enigma); // error: use of possibly uninitialized variable: `enigma`
}
```

If the compiler can guarantee something, then it won't allow it.

## Functions

Functions should be snake case and denoted as `fn`. You also don't need to declare functions before usage within a file.

```rs
fn do_stuff(qty: f64, oz: f64) -> f64 {
	qty * oz
}

// Same as
fn do_stuff(qty: f64, oz: f64) -> f64 {
	return qty * oz;
}
```

If you leave the semicolon off of the last expression then it returns that value (also known as "tail expression").

Macros are a more advanced topic but known that functions that end in `!` are called macros.

## Module system

This is a powerful and flexible features.

```s
.
├── Cargo.lock
├── Cargo.toml
├── src
    ├── lib.rs # The hello library
    ├── main.rs # The hello binary
```

For us to use a basic module.

```rs
// lib.rs
pub fn greet() {
	println!("Hello, world!");
}

// main.rs
fn main() {
	hello::greet();
}
```

This current uses the absolute path of `hello::greet()` to call the function, but using absolute path can become an issue.

We can use the `use` statement to address this.

```rs
// lib.rs
pub fn greet() {
	println!("Hello, world!");
}

// main.rs
use hello::greet;

fn main() {
	greet();
}
```

Examples for using something from the standard library.

```rs
use std::collections::HashMap;
```
