---
name: Rust Lang Org Book
menu: Rust
---

# Rust Lang Book

Resources for this can be found from [here](https://doc.rust-lang.org/book/foreword.html).

## Hello World

```rust
// main.rs
fn main() {
    println!("Hello, world!");
}
```

Note: `println!` calls a Rust macro. If it called a function instead, it would be entered as println (without the !). For now, you just need to know that using a ! means that you’re calling a macro instead of a normal function.

## Hello Cargo

Cargo is Rust’s build system and package manager. Most Rustaceans use this tool to manage their Rust projects because Cargo handles a lot of tasks for you, such as building your code, downloading the libraries your code depends on, and building those libraries. (We call libraries your code needs dependencies.)

```shell
$ cargo new hello_cargo
$ cd hello_cargo
```

The first command creates a new directory called hello_cargo. We’ve named our project hello_cargo, and Cargo creates its files in a directory of the same name.

Go into the hello_cargo directory and list the files. You’ll see that Cargo has generated two files and one directory for us: a Cargo.toml file and a src directory with a main.rs file inside. It has also initialized a new Git repository along with a .gitignore file.

This will be the `cargo.toml` file.

```rust
[package]
name = "hello_cargo"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
edition = "2018"

[dependencies]
```

## Building and running from a cargo project

```shell
$ cargo build
# This command creates an executable file in target/debug/hello_cargo (or target\debug\hello_cargo.exe on Windows) rather than in your current directory. You can run the executable with this command:
$ ./target/debug/hello_cargo
> Hello, world!
# We can also run with cargo run
$ cargo run
# Cargo also provides a command called cargo check. This command quickly checks your code to make sure it compiles but doesn’t produce an executable
$ cargo check
```

## Building for release

```shell
$ cargo build --release
```

This command will create an executable in target/release instead of target/debug. The optimizations make your Rust code run faster, but turning them on lengthens the time it takes for your program to compile. This is why there are two different profiles: one for development, when you want to rebuild quickly and often, and another for building the final program you’ll give to a user that won’t be rebuilt repeatedly and that will run as fast as possible. If you’re benchmarking your code’s running time, be sure to run `cargo build --release` and benchmark with the executable in target/release.

## File layout

```shell
cargo new guessing_game
```

```rust
// guessing_game/src/main.rs
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin().read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
}
```

This code contains a lot of information, so let’s go over it line by line. To obtain user input and then print the result as output, we need to bring the io (input/output) library into scope. The io library comes from the standard library (which is known as std):

```rust
use std::io;
```

By default, Rust brings only a few types into the scope of every program in the prelude. If a type you want to use isn’t in the prelude, you have to bring that type into scope explicitly with a use statement. Using the `std::io` library provides you with a number of useful features, including the ability to accept user input.
