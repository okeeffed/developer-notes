## Compiling single files with rustc

> *To translate it into a working program, we use software called a compiler. The compiler’s role is to translate the source code into machine code, as well as take care of lots of bookkeeping to satisfy the operating system (OS) and CPU that it is a runnable program.*
> 
> Tim McNamara. Rust_in_Action (Kindle Locations 1237-1239). Kindle Edition. 

The compiler for Rust is `rustc`.

We can compile a single file with `rustc <file>.rs`. There is no output for successful compilation, but if successful a binary will be compiled out to a file with the same name name sans the `.rs` suffix. We can run `./<file>`, or in our case, `./ok` to output the result.

## Compiling with cargo

`cargo` is a higher-level tool than `rustc`. It knows how to make use of `rustc` among other things.

To use our `./<file>` with `cargo`, we first move it to an empty folder and then run `cargo init`. For example:

```sh
# Remove binary
rm ./ok
# Create folder with same name as file without suffix
mkdir ok
# Move rust file
mv ./ok.rs ./ok
cd ./ok
# Init
cargo init
```

After initialisation, we can use `cargo` to execute the source code.

```sh
cargo run
```

> We can use the verbose flag `-v` to see more about what cargo is doing under the hood.

```sh
$  cargo run -v
   Compiling ok v0.1.0 (/Users/dennisokeeffe/code/projects/rust-in-action/code/ch2/ok)
     Running `/Users/dennisokeeffe/.rustup/toolchains/nightly-2023-06-15-x86_64-apple-darwin/bin/rustc --crate-name ok --edition=2021 ok.rs --error-format=json --json=diagnostic-rende
red-ansi,artifacts,future-incompat --diagnostic-width=183 --crate-type bin --emit=dep-info,link -C embed-bitcode=no -C debuginfo=2 -C split-debuginfo=unpacked -C metadata=45035904571b
e35f -C extra-filename=-45035904571be35f --out-dir /Users/dennisokeeffe/code/projects/rust-in-action/code/ch2/ok/target/debug/deps -C incremental=/Users/dennisokeeffe/code/projects/ru
st-in-action/code/ch2/ok/target/debug/incremental -L dependency=/Users/dennisokeeffe/code/projects/rust-in-action/code/ch2/ok/target/debug/deps`
    Finished dev [unoptimized + debuginfo] target(s) in 1.21s
     Running `target/debug/ok`
OK
```

Let's break down each part:

1. **`cargo run -v`**: This is the initial command you entered, telling `cargo` to compile and run your Rust program in verbose mode (`-v`).

2. **`Compiling ok v0.1.0 (/Users/dennisokeeffe/code/projects/rust-in-action/code/ch2/ok)`**: This part of the output indicates that the compilation process is starting. It shows the name, version, and path of the Rust package being compiled.

3. **`Running .../rustc ...`**: This is where the actual Rust compiler (`rustc`) is invoked by `cargo` to compile your Rust code. Here's a breakdown of the flags and options used:

   - `--crate-name ok`: Specifies the name of the crate being compiled (in this case, "ok").
   
   - `--edition=2021`: Sets the edition of Rust being used (Rust 2021 edition).
   
   - `--error-format=json`: Specifies the format for error messages as JSON.
   
   - `--json=diagnostic-rendered-ansi,artifacts,future-incompat`: Specifies additional JSON output formats for diagnostics, artifacts, and future incompatibility errors.
   
   - `--diagnostic-width=183`: Sets the maximum width for diagnostics output.
   
   - `--crate-type bin`: Indicates that the crate being compiled is a binary (executable) crate.
   
   - `--emit=dep-info,link`: Specifies that dependencies information and the final linked binary should be emitted.
   
   - `-C embed-bitcode=no`: Disables embedding bitcode in the binary.
   
   - `-C debuginfo=2`: Sets the level of debug information to generate.
   
   - `-C split-debuginfo=unpacked`: Specifies that debug information should be split and stored in separate files.
   
   - `-C metadata=45035904571be35f`: Sets metadata information.
   
   - `-C extra-filename=-45035904571be35f`: Specifies an extra filename component.
   
   - `--out-dir ...`: Sets the output directory for compiled artifacts.
   
   - `-C incremental=...`: Specifies the directory for incremental compilation.
   
   - `-L dependency=...`: Specifies the directory to search for dependencies.

4. **`Finished dev [unoptimized + debuginfo] target(s) in 1.21s`**: This line indicates that the compilation process has finished, and it provides some information about the target, including that it's a development build with debug information, and it took 1.21 seconds to complete.

5. **`Running target/debug/ok`**: This part of the output indicates that the compiled binary (`ok`) is being executed.

6. **`OK`**: Finally, this is the actual output of your Rust program, which prints "OK" to the terminal as the result of its execution.

In summary, the output you provided is a detailed log of the compilation and execution process of your Rust program. It shows various compiler flags and options used during compilation and provides information about the resulting binary and its execution.

## Defining variables

Rust does contain a lot of syntax similar and readable to many other languages.

```rust
let a = 10; // immutable int on the stack where the type is inferred
let b: i32: = 20 // declared type for i32
let c = 30i32; // numeric types can include a literal type annotation
let d = 30_i32 // underscores can be used for readbility and have no functional impact

println!(...) // macro but returns code rather than values
```

The `!` in Rust indicates a macroinstruction (macro for short).

It is a way to define reusable code that can generate other code at compile time. Macros allow you to write code that writes code. They are a powerful tool for code generation, metaprogramming, and reducing code duplication.

Here's a simple explanation using an example:

Suppose you have a repetitive task in your code, such as printing debugging information. Instead of writing the same debug print statement multiple times, you can create a macro to do it for you.

Here's an example of a simple macro for printing debug information:

```rust
macro_rules! debug {
    ($x:expr) => {
        println!("Debug: {} = {:?}", stringify!($x), $x);
    };
}
```

Now, let's break down what's happening here:

- `macro_rules!`: This keyword is used to define a macro in Rust.

- `debug`: This is the name of the macro.

- `($x:expr) => { ... }`: This is the pattern that the macro matches. It says that the macro expects an expression (denoted as `$x`) as input.

- `println!("Debug: {} = {:?}", stringify!($x), $x);`: This is the code that the macro generates. It prints a debug message with the expression provided and its value.

Now, let's see how you would use this macro in your code:

```rust
fn main() {
    let my_variable = 42;
    debug!(my_variable);
}
```

When you compile your Rust program, the macro `debug!` will be invoked at compile time with the expression `my_variable`. It will generate code that looks like this:

```rust
fn main() {
    let my_variable = 42;
    println!("Debug: {} = {:?}", "my_variable", my_variable);
}
```

So, at compile time, the macro replaces the `debug!(my_variable);` line with the generated code. This way, you get the benefits of code reuse and readability while avoiding repetitive coding tasks.

> It is worth noting that `println!` is also a macro, which will also generate code at compile time.  In summary, `println!` compiles down to a series of function calls that use the `std::fmt` module to format and print text to the standard output. The macro expansion process creates code that handles formatting and printing according to the format string and provided arguments.

In summary, macros in Rust are a way to define reusable code templates that are expanded at compile time. They help you reduce code duplication, enhance code readability, and enable powerful metaprogramming capabilities.

## Ints and floating-point numbers

The expressions for declaring both are similar to what you may find in other languages. Some points to note:

- There are a large number of numeric types.
- Conversions between types are always explicit.
- Rust's numbers can have methods e.g. `24.5_f32.round()` rather than `round(24.5_f32)`.

## Built-in support for numeric literals

Allows you to define integers in base 2 (binary), base 8 (octal) and base 16 (hexadecimal).

```rust
let three = 0b11;
let thirty = 0o36;
let three_hundred = 0x12C;

println!("base 10: {} {} {}", three, thirty, three_hundred);
println!("base 2:  {:b} {:b} {:b}", three, thirty, three_hundred);
println!("base 8:  {:o} {:o} {:o}", three, thirty, three_hundred);
println!("base 16: {:x} {:x} {:x}", three, thirty, three_hundred);
```

## A caution on floating points

By design, floating points do not play well for equality. To compare between floats, there are some tolerances known as `f32::EPSILON` and `f64::EPSILON`.

```rust
fn main() {   
	let result: f32 = 0.1 + 0.1;   
	let desired: f32 = 0.2;   
	let absolute_difference = (desired - result).abs();   
	assert!(absolute_difference <= f32::EPSILON); 
}

// Tim McNamara. Rust_in_Action (Kindle Locations 1543-1545). Kindle Edition. 
```

## Complex numbers

`NAN` is used to represent values that cannot be represented as a real number and are never of equal value.

There are methods `is_nan()` and `is_finite()` to help program defensively.

For complex numbers, you can use the [`num` crate](https://docs.rs/num/0.4.1/num/complex/struct.Complex.html) to work with these.

## A shortcut for adding third-party dependencies to a project

We can use `cargo add` if we install `cargo-edit`.

```sh
$ cargo install cargo-edit
# ... install output
$ cargo add num
# Adds num to Cargo.toml
```

## Flow Control

### The for loop

Iterating over iterators is easy:

```rust
for item in container {
	// ... do work
}
```

However, once the block ends, accessing `container` another time is **invalid**.

Although the `container` variable remains within local scope, the `lifetime` has ended. 

Lifetimes will be expanded upon later, but for a short summary: *lifetimes are a way to ensure that references in your code are valid and don't lead to memory safety issues like dangling references or use-after-free errors. Lifetimes help the compiler determine the scope and validity of references in your code.*

#### An in-depth overview of the example

**Read this if you are interested in understanding how the lifetime works for this example.**

Here's how lifetimes work in alignment with this example:

1. **Iterator Lifetimes**: The `for` loop is iterating over the elements in the `container`. The lifetime of the elements depends on the lifetime of the `container`. In Rust, this is expressed as a relationship between the lifetime of the `container` and the references to its elements.
2. **Lifetime Annotations**: In Rust, you can use lifetime annotations to specify the relationships between the lifetimes of various parts of your code. For example, if the `container` has a reference to some data, and you want to use that data within the loop, the lifetimes must match.
3. **Ownership and Borrowing**: Rust ensures that you either own the data, borrow it with a reference, or have a valid reference with the appropriate lifetime. In the loop, the `item` variable borrows data from the `container`, and its lifetime is tied to the loop iteration.
4. **Lifetime of References**: The lifetime of the references created within the loop is limited to the scope of that loop iteration. Once the loop iteration finishes, any references created within that iteration go out of scope, and you can't use them outside of the loop.

In summary, Rust's lifetime system helps ensure that references to data are used safely and don't outlive the data they point to. In your example, the `container` must have a lifetime that encompasses the loop, and any references created within the loop are valid only for the duration of that specific iteration. This design helps prevent common memory safety issues and enables Rust to guarantee safe concurrent and parallel programming.

To ensure that the lifetime of a variable outlasts a loop in Rust, you typically have a few options depending on the context and requirements of your code. Here are some common approaches:

1. **Declare the Variable Outside the Loop**: You can declare the variable outside the loop, which effectively extends its lifetime to encompass the entire scope in which it is defined. Here's an example:

   ```rust
   let mut container = vec![1, 2, 3];
   
   for item in &container {
       // ... do work with item
   }
   
   // Now, you can still access `container` here.
   ```

   In this example, `container` is defined outside the loop, so its lifetime extends beyond the loop's scope.

2. **Use Ownership and Move Semantics**: If you want to take ownership of the data within the loop and you don't need the `container` afterward, you can use the `into_iter` method to consume the elements and transfer ownership. This effectively ends the lifetime of the `container`. Here's an example:

   ```rust
   let container = vec![1, 2, 3];
   
   for item in container.into_iter() {
       // ... do work with item
   }
   
   // You can't access `container` here because it was moved.
   ```

3. **Clone Data**: If you need both the original `container` and the data within it after the loop, you can clone the data, creating a new owned copy of it. This ensures that you have a separate copy with a longer lifetime. Here's an example:

   ```rust
   let container = vec![1, 2, 3];
   
   for item in &container {
       // ... do work with item
   }
   
   let cloned_container = container.clone();
   
   // Now, you have a separate copy in `cloned_container`.
   ```

Each of these approaches has trade-offs, and the choice depends on the specific requirements and constraints of your code. You'll need to consider factors such as memory usage, performance, and whether you need mutable access to the original container or just read-only access within the loop.

## for loop cont

If you need to modify each item during the loop, you can use a mutable reference:

```rust
for item in &mut collection {
	// do something and update the value
}
```

Some shorthands:

| Shorthand | Equivalent to... |
| --- | --- |
| for item in collection | for item in IntoIterator::into_iter(collection) |
| for item in &collection | for item in collection.iter() |
| for item in &mut collection | for item in collection.iter_mut() |

## anon loops

When a local variable is not used in scope, the convention is to use `_`:

```rust
for _ in 1..10 {
	// Do work
}
```

## Loops using an index variable

This is possible, but discouraged. It introduces problems:

1. Performance: incurs run-time costs for *bound-checking* e.g. ensure the index is valid.
2. Safety: Periodically accessing the collection over time introduces the possibility that it has changed. Using a for loop allows Rust to guarantee that the collection remains untouched by other parts of the program.

## While loops

```rust
use std::time::{Duration, Instant};

fn main() {
	let mut count = 0;
	let time_limit = Duration::new(1, 0);
	let start = Instant::now();

	while (Instant::now() - start) < time_limit {
		count += 1;
	}
	
	println!("{}", count);
}
```

### std::time::{Duration, Instant}

The import line `use std::time::{Duration, Instant};` in Rust is used to bring specific items (in this case, types) from the `std::time` module into the current scope. Let's break down what this line does:

- `use`: This keyword is used to import items from a module into your current scope, making them accessible without having to prefix them with the module name.

- `std::time`: This part specifies the module from which you are importing items. In this case, it's the `std::time` module, which is part of Rust's standard library (`std`).

- `{Duration, Instant}`: Inside the curly braces, you list the specific items you want to import from the `std::time` module. In this example, you're importing two items: `Duration` and `Instant`.

Now, let's explain what `Duration` and `Instant` represent:

- `Duration`: `Duration` is a struct in the `std::time` module that represents a length of time. It's commonly used for measuring time intervals and working with time spans.

- `Instant`: `Instant` is another struct in the `std::time` module that represents a point in time, typically used for measuring time intervals or capturing a specific point in time for performance measurements.

By using this import line, you make both `Duration` and `Instant` available for use in your Rust code without needing to qualify them with `std::time::` every time you use them. For example, you can create instances of `Duration` and `Instant`, call their methods, or use them in your code directly like this:

```rust
use std::time::{Duration, Instant};

fn main() {
    let start_time = Instant::now();
    // ... do some work
    let end_time = Instant::now();
    
    let elapsed_time = end_time - start_time;
    println!("Elapsed time: {:?}", elapsed_time);
}
```

In this code, you're able to directly use `Duration` and `Instant` because you've imported them using the `use` statement.

## loop

`loop` contains more control than `for` and `while`.

loop is often seen when implementing long-running servers, as the following example shows:

```rust
loop {   
	let requester, request = accept_request();   
	let result = process_request(request);   
	end_response(requester, result); 
}
```

## Breaking from loops

`break` can be used to break from a loop.

If you want to break from an outer loop, you can use a loop label with a prefix:

```rust
'outer: for x in 0.. {
	for y in 0.. {
		for z in 0.. {
			if x + y + x > 1000 {
				break 'outer;
			}
		}
	}
}
```

## Control flow

`if/else` is as expected.

`match` is type-aware pattern matching and very powerful.

```rust
match item {
	0 => {},
	10 ..= 20 => {},
	40 | 80 => {},
	_ => {}
}
```

`match` is analogous to switch, however `match` guarantees that all possible options for a type are explicitly handled.