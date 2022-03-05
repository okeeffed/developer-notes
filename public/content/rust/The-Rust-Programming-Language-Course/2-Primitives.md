# 2: Primitives

## Resources

1. [Rust exercises](https://github.com/rtfeldman/rust-1.51-workshop/tree/trunk/part1)

## strings

Hello world in Rust:

```rs
fn main() {
	println!("Hello, world!");
}
```

To compile binary `rustc app.rs`.

### String Interpolation

```rs
let greeting = "Hello";
let subject = "World";

// always prints interpolated string
println!("{} {}!", greeting, subject);
```

Other functions that use `{}` for string interpolation:

```rs
// format!
let combined_str = format!("{} {}!", greeting, subject);

// panic!
panic!("{}", combined_str);
```

`panic` is a way to basically stop the program.

## floats

```rs
let x = 2.0; // f64
let y = 2.2; // f64

println!("{}", x + y); // 4.2
```

> Note: macros aren't covered in this course, but basically what they do at compile time is take the arguments into some number of function calls.

### mutability

```rs
// works similar to const in JS
let x = 1.1;
```

By default, cannot reassign `let` and it is immutable.

```rs
let mut x = 1.1;

x = 2.2;
```

This is mutable. By default, Rust likes things to be mutable.

## Rust Q&A

- Benefits of macros over functions? Basically convenience.
- Performance differences for macros over functions? Only at compile time. Macros can make it longer in Rust.

## Numeric Types & Type Annotations

That being said, `let mut` allows reassignment, but only for that particular type.

```rs
let mut y = 2.2;

y = 3.1; // allowed
y = "three point one"; // not allowed
```

You can be explicit with types using type annotation:

```rs
let x: f64 = 1.1;
```

You do not need to assign. It can use type inference. It is worth knowing that it won't always get this right.

## Functions

```rs
fn add_floats(x: f64, y: f64) -> f64 {
	return x + y;
}
```

If your function returns nothing, no return type annotation is required.

> Functions come up a lot more than macros.

## Integers and other number types

```rs
let x: f64 = 10.0 / 3.0;
let y: f32 = 10.0 / 3.0;
```

> There are only two float sizes (`f32` and `f64`).

Why use one of the other? How much space do you need. It is about memory trade-offs.

```rs
let ninety = 90;
let negative_five = -5;
let one_thousand = 1_000;

let exactly_three= 10 / 3; // 3 - gets the floor of the division. Be careful with integer division.

let this_will_panic = 10 / 0; // will panic
```

There are different integer types (unsigned and signed) `u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, `i64`.

There is also `char` which is `u32` that's been Unicode validated.

### Converting number types with as

```rs
fn multiple(x: i64, y: u8) -> i64 {
	return x * (y as i64);
}
```

You can also convert ints to floats.

## Booleans, Conditionals, Statements and Expressions

```rs
let should_we_go_fast = true;
let should_we_go_slow = false;

true as u8 // evaluates to 1

1 == 2 // evaluates to false
```

> Under the hood, booleans are represented as `u8`s.

Also worth noting, `==` is structural equality and not referential equality.

### Conditionals

```rs
if cats > 1 {
	println!("We have more than one cat!");
} else {
	println!("We need more cats!");
}
```

You MUST always use a boolean for the if/else conditional.

### Statements and Expressions

An `expression` evaluates to a value e.g. `cats > 1000`.

A `statement` does not. `println!("We have more than one cat!");` is a statement.

The distinction matters for getting conveniences when you choose an expression over an statement.

```rs
fn multiply_both(x: i64, y: i64) -> i64 {
	return x * y;
}

fn multiply_both(x: i64, y: i64) -> i64 {
	x * y // notice no semi-colon and this will be returned.
}
```

This is important because you can actually do this with if/else statements.

```rs
let message = if cats > 1 {
	"Multiple cats"
} else if cats > 1_000 {
	"Too many cats!"
} else {
	"Need more cats!"
}; // need a semicolon because it is a statement
```

In a comparison, it was almost like this block became a ternary.

> Two expressions at the end of a function will end up with a compiler error.

For early returns, use the `return` key.

> Other note: `null`, `nil`, `undefined` - Rust doesn't have them.
