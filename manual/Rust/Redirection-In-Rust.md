---
menu: Rust
name: Redirection in Rust
---

# Redirection in Rust

## Resources

1. [nix::std](https://docs.rs/nix/0.10.0/nix/unistd/fn.dup2.html)
2. [libc::STDIN_FILENO](http://multiformats.github.io/rust-multiaddr/libc/constant.STDIN_FILENO.html)

## Getting started

```s
cargo new rust-redirection
cd rust-redirection
```

## Reading a simple file

```rust
use std::io;
use std::io::prelude::*;
use std::fs::File;
use std::io::BufReader;

fn main() -> io::Result<()> {
    let file = File::open("foobar.txt")?;
    let mut buf_reader = BufReader::new(file);
    let mut contents = String::new();
    buf_reader.read_to_string(&mut contents)?;
    assert_eq!(contents, "foobar test");
    Ok(())
}
```

## Using redirection

Converting fd from `usize` to `i32`:

```s
cargo run
   Compiling rust v0.1.0 (/Users/dennis.okeeffe/Project-Imposter/blog-repos/redirection/rust)
error[E0308]: mismatched types
  --> src/main.rs:26:10
   |
26 |     dup2(fd, libc::STDIN_FILENO);
   |          ^^ expected `i32`, found `usize`
   |
help: you can convert an `usize` to `i32` and panic if the converted value wouldn't fit
   |
26 |     dup2(fd.try_into().unwrap(), libc::STDIN_FILENO);
```
