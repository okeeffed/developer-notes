## Cheating your way to hello, world

Firstly, install [`rustup`](https://rustup.rs/). This can be used to install the Rust Programming Language.

Once installed and ready to go, part of the toolchain is `cargo` which you can use to initialise a new project.

```sh
$ cargo new hello
$ cd hello
$ cargo run
   Compiling hello v0.1.0 (/Users/dennisokeeffe/code/projects/rust-in-action/ch-1/hello)
    Finished dev [unoptimized + debuginfo] target(s) in 2.58s
     Running `target/debug/hello hello`
Hello, world!

$ tree
.
├── Cargo.lock
├── Cargo.toml
├── src
│   └── main.rs
└── target
    ├── CACHEDIR.TAG
    └── debug
        ├── build
        ├── deps
        │   ├── hello-c2000112f8ac826d
        │   ├── hello-c2000112f8ac826d.2cewynnoj8b9btir.rcgu.o
        │   ├── hello-c2000112f8ac826d.443kbjpfdlg3e1sq.rcgu.o
        │   ├── hello-c2000112f8ac826d.4lplhoux0qfi4u0z.rcgu.o
        │   ├── hello-c2000112f8ac826d.4wa90q5abkxbza6r.rcgu.o
        │   ├── hello-c2000112f8ac826d.4znj98muut9fezrq.rcgu.o
        │   ├── hello-c2000112f8ac826d.d
        │   └── hello-c2000112f8ac826d.ipa4r24iowa14vr.rcgu.o
        ├── examples
        ├── hello
        ├── hello.d
        └── incremental
            └── hello-38j7i8texoa4w
                ├── s-gp3ye0mf9i-1o1qzjb-etoq5iwn3j4uqagwxad9f1jmp
                │   ├── 2cewynnoj8b9btir.o
                │   ├── 443kbjpfdlg3e1sq.o
                │   ├── 4lplhoux0qfi4u0z.o
                │   ├── 4wa90q5abkxbza6r.o
                │   ├── 4znj98muut9fezrq.o
                │   ├── dep-graph.bin
                │   ├── ipa4r24iowa14vr.o
                │   ├── query-cache.bin
                │   └── work-products.bin
                └── s-gp3ye0mf9i-1o1qzjb.lock

9 directories, 24 files
```


We are going to update this hello world to highlight two of Rust's features:

1. Easy iteration.
2. Built-in support for unicode.

```rust
fn greet_world() {
    println!("Hello, world!");
    let southern_germany = "Grüß Gott!";
    let japan = "ハロー・ワールド";

    let regions = [southern_germany, japan];

    for region in regions.iter() {
        println!("{}", &region);
    }
}

fn main() {
    greet_world();
}
```

> There are some important highlights here, but what's probably most worth noting for new Rustaceans is that `&region` where the ampersand "borrows" `region` for read-only access.

## Goals of Rust

### Safety

Rust is free from:

1. Dangling pointers.
2. Data races.
3. Buffer overflow.
4. Iterator invalidation.

> It's good to know for data races that the scheduling of threads is determined by the OS rather than the program.

### Productivity

*When given a choice, Rust prefers the option that is easiest for the developer.*

> Note: `()` is a unit that represents the result of an assignment.

The utilities of `cargo` are also useful and an example of productivity.
### Control

Rust offers programmers fine-grained control over how data structures are laid out in memory and their access patterns.

Rust uses sensible defaults that align with its "zero cost abstractions" philosophy, they are not suitable for all situations.

For example:

1. Data might be better stored on the stack vs heap.
2. Might make more sense to add reference counting the create a shared reference to a value.
3. Might make more sense to create one's own type of pointer for a particular access pattern.

For example:

```rust
use std::rc::Rc;
use std::sync::{Arc, Mutex};

fn main() {
	let a = 10; // Integer on the stack
	let b = Box::new(20); // Heap, also known as a boxed integer
	let c = Rc::new(Box::new(30)); // Boxed int with ref count
	let d = Arc::new(Mutex::new(40)); // Atomic ref count protected by a mutual exclusion lock
	println!("a: {:?}, b: {:?}, c: {:?}, d: {:?}", a, b, c, d);
}
```

To understand why Rust does something one way, it's helpful to refer back to these three principles:

1. The language's first priority is safety/
2. Data within Rust is immutable by default.
3. Compile-time checks are strongly preferred. Safety should be a "zero-cost abstraction".

## Rust's Big Features

1. Performance
2. Concurrency
3. Memory efficiency

## The downsides

1. Cyclic data structures
2. Compile times
3. Strictness
4. Size of the language
5. Hype

## Rust Phrasebook

A few terms have special meanings:

1. Empowering everyone
2. Blazingly fast
3. Fearless concurrency
4. No Rust 2.0
5. Zero-cost abstractions

## Command-line tools to learn

With Rust, there are three main CLI tools to learn:

1. `cargo` to manage a crate.
2. `rustup` to manage Rust installations.
3. `rustc` which manages compilation of Rust source code.


