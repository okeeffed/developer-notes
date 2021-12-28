# 7: Borrowing

## References & Borrowing

```rs
fn print_years(years: &Vec<i64>) {
    for year in years.iter() {
        println!("Year: {}", year);
    }
}

fn main() {
    let years = vec![1995, 2000, 2005, 2010, 2015]; // alloc `years`

    print_years(&years); // temporarily give `print_years` access to `years`
    print_years(&years); // temporarily give `print_years` access to `years`

    // dealloc `years`
}
```

This is essentially the solution to what we saw in the previous section.

The `&` provides a reference to something but not ownership.

This is a concept known as "borrowing".

You cannot "turn off the borrow checking" in Rust.

## Mutable References

This is a mutable vector.

```rs
let mut years: Vec<i64> = vec![1995, 2000, 2005, 2010, 2015];
let mutable_years: &mut Vec<i64> = &mut years;

mutable_years.clear(); // clear() removes all elements from the Vec
```

Mutable references let you borrow something and allows you to change it.

We can see some of the differences in use from the definitions of some standard functions:

```rs
fn clear(&mut self) {
	// set self's length to 0
}

fn len(&self) -> usize
```

There is one important difference that comes up with mutable and immutable references that does not come up with `let` and `let mut`.

```rs
let length = mutable_years.len(); // THIS WOULD NOT COMPILE
```

With a mutable reference, we can only have one reference at a time:

```rs
let years = vec![1995, 2000, 2005];

let years_ref1 = &years;
let years_ref2 = &years; // fine

// with mutable references
let mut years = vec![1995, 2000, 2005];

let years_ref1 = &mut years;
let years_ref2 = &mut years; // ERROR: cannot have two immutable borrows!

// with immutable borrow before mutable borrow (or the other way around)
let mut years = vec![1995, 2000, 2005];

let years_ref1 = &years;
let years_ref2 = &mut years; // ERROR: tried to borrow while a mutable borrow was active!
```

Also, if you have a mutable reference in scope, you cannot have another immutable reference.

You also cannot convert an immutable reference to a mutable reference.

A lot of the reason behind the borrowing rules for immutable/mutable references is concurrency.

> Side note, but one of the benefits of Rust concurrency is that is can guarantee no data race conditions in concurrency when referencing shared memory.

## Slices

```rs
// essentially on the stack we get this
let nums = vec![1, 2, 3];

struct VecMetadata {
	first_elem_index: usize,
	length: usize,
	capacity: usize,
}



// with slice metadata we get this
let slice = &nums[0..3];

struct SliceMetadata {
	first_elem_index: usize,
	length: usize;
}
```

Slices reuse the heap memory but puts a new piece of metadata on the stack.

Slices are like "I want to see a subslice of a vector".

Allocations can be expensive from a performance expensive, so slices can be handy for that.

You can't have a slice reference heap memory without something else that allocated that memory:

```rs
nums: Vec<u8>
slice: &[u8]
```

You can also have string slices.

```rs
let str_slice: &str = string[3..7];
```
