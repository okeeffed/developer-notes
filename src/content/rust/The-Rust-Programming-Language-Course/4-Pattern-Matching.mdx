# 4: Pattern Matching

## Enums & Pattern Matching

```rs
enum Color {
	Green,
	Yellow,
	Red
}

let go = Color::Green;
let stop = Color::Red;
let slow_down = Color::Yellow;

// all three have the same type but different values at run time.
let go: Color = Color::Green;
let stop: Color = Color::Red;
let slow_down: Color = Color::Yellow;
```

You can also enums with variants.

```rs
enum Color {
	Green,
	Yellow,
	Red,
	Custom {red: u8, green: u8, blue: u8}
}

let go = Color::Green;
let stop = Color::Red;
let purple: Color = Color::Custom {
	red: 255,
	green: 0,
	blue: 255
};
```

You can also do this with tuples:

```rs
enum Color {
	Green,
	Yellow,
	Red,
	Custom(u8, u8, u8)
}

let go = Color::Green;
let stop = Color::Red;
let purple: Color = Color::Custom(255, 0, 255);
```

> You can have many variants use payloads or none of them.

As for pattern matching:

```rs
let current_color = Color::Yellow;

match current_color {
	Color::Green => {
		println!("Go!");
	}
	Color::Red => {
		println!("Stop!");
	}
}
```

Notes about pattern matching:

- No `break` since no fallthrough.
- You are not just switching on just one value.

You can also run functions on a match:

```rs
let current_color = Color::Yellow;

match current_color {
	Color::Green => {
		println!("Go!");
	}
	Color::Red => {
		println!("Stop!");
	}
	Color::Custom { red, green, blue } => {
		println!("Custom color: {} {} {}", red, green, blue);
	}
	// if it was a tuple, you could do this:
	Color::Custom(red, green, blue) => {
		println!("Custom color: {} {} {}", red, green, blue);
	}
}
```

You can also use `match` as an expression:

```rs
let color_str = match current_color {
	Color::Green => {
		println!("Go!");
	}
	Color::Red => {
		println!("Stop!");
	}
	Color::Yellow => {
		println!("Slow down!");
	}
};
```

If assigning it as a value though, you MUST cover every possible outcome.

As for a catch-all pattern:

```rs
let color_str = match current_color {
	Color::Green => {
		println!("Go!");
	}
	Color::Red => {
		println!("Stop!");
	}
	_ => {
		println!("Slow down!");
	}
};
```

The downside with the catch-all is that you won't have a helpful reminder when missing a value.

## Methods

```rs
enum Color {
	//...
}

impl Color {
	fn rgb(color: Color) -> (u8, u8, u8) {
		// ...
	}

	fn new(r: u8, g: u8, b: u8) -> Color {
		// ...
	}
}

let red = Color::new(250, 0, 0);
let purple = Color::new(100, 0, 250);
let (r, g, b) = Color::rgb(purple);
```

Alternatively, we have the use case with the keyword `self`:

```rs
enum Color { ... }

impl Color {
	fn rgb(self) -> (u8, u8, u8) { ... }

	fn new(r: u8, g: u8, b: u8) -> Self { ... }
}
```

This works as before. `self` and `Self` are special values of `impl`.

But now we can do this:

```rs
let purple = Color::new(100, 0, 250);
let (r, g, b) = Color::rgb(purple);

// This is known as "method syntax"
let (r, g, b) = purple.rgb();
```

> "A method is anything that takes `self` as an argument."

## Type Parameters

```rs
let last_char = my_string.pop()
```

In some languages, this might be the value `char`. In Rust, it returns an `Option<char>`.

```rs
let last_char: Option<char> = my_string.pop();

// here is the enum
enum Option<T> {
	None,
	Some(T)
}
```

`T` here is known as a `type parameter`.

`Option` is special in the standard library, and you do not need to do namespacing here.

Another example of a type parameter is `Result<O, E>`.

```rs
enum Result<O, E> {
	Ok(O),
	Err(E)
}

let success: Result<i64, String> = Ok(42);
let error: Result<i64, String> = Err("Error".to_string());
```

> `Result` and `Option` are the only enums that do not need the name spacing.
