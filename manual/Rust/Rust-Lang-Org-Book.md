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
