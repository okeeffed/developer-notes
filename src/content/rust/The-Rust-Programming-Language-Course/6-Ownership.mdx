# 6: Ownership

## Heap Bookkeeping

```rs
let nums = vec![1, 2, 3];
```

Essentially `vec!` calls `alloc(3)` = "find 3 unused heap bytes in a row, and mark them as in-use".

How does the heap know when they're no longer in use? This is not a problem we had on the stack.

The answer is non-trivial and non-obvious.

## Manual Memory Ownership

When is it safe to make something on the heap as "no longer on use?".

```rs
fn get_final_orders() -> i64 {
	let orders = vec![1, 2, 3, 4]; // only one heap allocation
	let mut total_orders = 0;

	for order in orders.iter() {
		total_orders += order;
	}

	let final_orders = finish(total_orders);

	return final_orders;
}
```

In the above code, how can we tell the program to "dealloc"?

You could tell it to not dealloc, but that will create a memory leak.

```rs
fn get_final_orders() -> i64 {
	let orders = vec![1, 2, 3, 4]; // alloc
	let mut total_orders = 0;

	for order in orders.iter() {
		total_orders += order;
	}

	let final_orders = finish(total_orders);

	// dealloc(orders); // not an actual Rust call

	return final_orders;
}
```

- If you allocate too early, you could get a "use after free" error where you just get gibberish garbage.
- If you `dealloc` twice, you could end up with "double free" errors which are also awful. You might accidentally dealloc other memory that was already being used again.

Rust figures out where to put the dealloc for us.

Most critical vulnerability causes were from issues caused by memory safety.

Manual memory management is error-prone.

What happens with a garbage collection language?

```rs
fn get_final_orders() -> i64 {
	let orders = vec![1, 2, 3, 4]; // GC alloc
	let mut total_orders = 0;

	for order in orders.iter() {
		total_orders += order;
	}

	let final_orders = finish(total_orders);

	return final_orders;
}
```

When you get the spinning wheel, generally that is what's known as a GC pass. It is basically the garbage collector saying "hey I need to track down all the memory that I've allocated and see if any of them are usable."

GC pass is notorious for the time it takes.

## Rust Memory Management

How does Rust deal with memory management? It doesn't have a garbage collector.

```rs
fn get_final_orders() -> i64 {
	let orders = vec![1, 2, 3, 4]; // GC alloc
	let mut total_orders = 0;

	for order in orders.iter() {
		total_orders += order;
	}

	let final_orders = finish(total_orders);

	// dealloc(orders); // not an actual Rust call but Rust inserts this in the right place for you.

	return final_orders;
}
```

There are some important edge cases around this approach that come into the concepts of "borrowing" and "lifetimes".

In the above example we see, Rust could have safely freed the memory sooner. But, Rust has a concept of freeing it up as it goes out of scope.

We could do this though with a sort of "anonymous" scope:

```rs
fn get_final_orders() -> i64 {
	let mut total_orders = 0;

	{
		let orders = vec![1, 2, 3, 4]; // GC alloc

		for order in orders.iter() {
			total_orders += order;
		}

		// dealloc(orders); // not an actual Rust call but Rust inserts this in the right place for you.
	}

	let final_orders = finish(total_orders);

	return final_orders;
}
```

These anonymous block scopes gives Rust a hint to deallocate it earlier.

In practice, this isn't something that will happen very often. It is worth noting that this is something that you could do.

## Ownership

```rs
fn get_years() -> Vec<i32> {
    let years = vec![1995, 2000, 2005, 2010, 2015]; // alloc

    return years;
} // dealloc(years) because it went out of scope

fn main() {
    let all_years = get_years();
		// normally this would result in a use-after-free bug
		// if years was deallocated at the end of a function scope.
}
```

Whenever Rust does an allocation, it basically assigns an owner.

```rs
fn get_years() -> Vec<i32> {
    let years = vec![1995, 2000, 2005, 2010, 2015]; // alloc and this scope "owns" years

    return years; // transfer ownership to main
}

fn main() {
    let all_years = get_years();
		// now main is the owner of the allocated memory
}
```

Ownership essentially translates to "who has responsibility to deallocate the memory".

Colloquially in Rust this transfer is known as a "move".

```rs
fn print_years(years: Vec<i64>) { // this takes ownership of years from the owner
    for year in years.iter() {
        println!("Year: {}", year);
    }

    // dealloc `years`
}

fn main() {
	let years = vec![1995, 2000, 2005, 2010, 2015]; // alloc and this scope "owns" years

	print_years(years); // changes scope of years
}
```

What happens if we call it a second time?

```rs
fn print_years(years: Vec<i64>) { // this takes ownership of years from the owner
    for year in years.iter() {
        println!("Year: {}", year);
    }

    // dealloc `years`
}

fn main() {
	let years = vec![1995, 2000, 2005, 2010, 2015]; // alloc and this scope "owns" years

	print_years(years); // changes scope of years
	print_years(years); // "use-after-move" compile error
}
```

Using it a second time after deallocation will create a "use-after-free" error.

This only happens in Rust. This doesn't happen in other languages.

How can we deal with this? We could return this. That is reasonable. It is a perfectly reasonable way to get around it, however there is something else we can see in borrowing.

Another way we can use this is that `.clone()` is your friend.

```rs
fn print_years(years: Vec<i64>) { // this takes ownership of years from the owner
    for year in years.iter() {
        println!("Year: {}", year);
    }

    // dealloc `years`
}

fn main() {
	let years = vec![1995, 2000, 2005, 2010, 2015]; // alloc and this scope "owns" years

	print_years(years.clone()); // creates a deep clone
	print_years(years); // changes scope of years
}
```

The downside of `.clone()` is obvious - there is a cost involved with it.

`.clone()` is a beginner-friendly way to get around the `use-after-clone` errors while you are still learning the question.
