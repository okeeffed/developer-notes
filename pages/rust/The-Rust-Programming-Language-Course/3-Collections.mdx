# 3: Collections

## Tuples

```rs
let point: (i64, i64, i64) = (0,0,0);

// accessing
let x = point.0;
let y = point.1;
let z = point.2;

// destructuring syntax
let (x, y, z) = point;

// destructuring certain values
let (x, _, z) = point;

// for mutability
let mut point: (i64, i64, i64) = (0,0,0);

point.0 = 17;
```

You can mix and match with whatever type.

You can also destructing with `_` for things you do not care about.

> You can't add any values to a tuple after instantiation.

### Unit

A special tuple call a `unit` when it has no values.

```rs
let unit: () = ();
```

Why have a unit? One case it comes up with is when you have a function that returns nothing.

```rs
fn main() {
	// ...
}

fn main() -> () {
	// ...
}
```

The above two are equivalent. The `unit` is the default return type.

Other languages use the term `void` for this.

## Structs

```rs
struct Point {
	x: i64,
	y: i64,
	z: i64,
}

fn new_point(x: i64, y: i64, z: i64) -> Point {
	Point { x: x, y: y, z: z }

	// Could also write Point { x, y, z }
}
```

With a struct, you have to use curly braces as well as declare the name of the struct.

```rs
let point = Point { x: 0, y: 0, z: 0 };
let x = point.x;
let Point { x, y, z } = point;

// ignoring one value
let Point { x, y: _, z } = point;

// ignoring all values that are not named
let Point {x, z, .. } = point;
```

With the destructuring, you also need to same the name of it.

You can also do mutables.

```rs
let mut point = Point { x: 0, y: 0, z: 0 };

// allowed
point.x = 17;
```

> Note: You can nest a tuple and struct within a struct.

Tuples (and structs) cannot be iterated over

## Arrays

```rs
let mut years: [i32; 3] = [1995, 2000, 2005];

let first_year = years[0];
let [_, second_year, third_year] = years;

// since this is mutable
years[2] = 2010;
years[x] = 2010; // will panic if out of bounds
```

- You must have the same type for every element in the array.
- You cannot change the size of the array at runtime.

We can iterate with arrays:

```rs
for year in years.iter() {
	println!("Next year {}", year + 1);
}
```

Rust will be able to know the type for the iteration thanks to the initial statement.

## Memory

This section helps when things come up later with the Baro checker.

```rs
let array: [u16; 3] = [1, 2, 3];
let point: (u16, u16, u16) = (1, 2, 3);
let point_struct: Point = Point { 1, 2, 3 };
```

This array representation, tuple representation and struct representation from a memory perspective is exactly the same.

Rust gives you a nice convenience at compile time, but basically at run time you have the same underlying memory structures.
