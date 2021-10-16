# 8: Lifetimes

## Intro

A lifetime is the time between when a value is allocated and when it's deallocated.

```rs
struct Releases {
	years: &[i64],
	eighties: &[i64],
	nineties: &[i64],
}

fn jazz_releases(years: &[i64]) -> Releases {
    let eighties: &[i64] = &years[0..2];
    let nineties: &[i64] = &years[2..4];

    Releases {
        years,
        eighties,
        nineties,
    }
}

fn main() {
    let releases = {
        let all_years: Vec<i64> =
            // alloc
            vec![
              1980, 1985, 1990, 1995, 2000, 2000
            ];

        jazz_releases(all_years)
    }; // dealloc

		// This won't work - which is obvious, but it is because of the scope above.
		let eighties = releases.eights; // THIS IS AN ERROR: use-after-free!

		// This will
    for year in releases.eighties.iter() {
        println!("Eighties year: {}", year);
    }
}
```

The `lifetyime` of the `all_years` is from when `all_years` is first allocated to the time that it is deallocated.

## Lifetime Annotations

We can create a lifetime annotation of `'a`:

```rs
// We are basically saying that all three need to be reference the same memory and live the same amount of time.
struct Releases<'y> {
	years: &'y [i64],
	eighties: &'y [i64],
	nineties: &'y [i64],
}

fn jazz_releases<'a>(years: &'a [i64]) -> Releases {
    let eighties: &[i64] = &years[0..2];
    let nineties: &[i64] = &years[2..4];

    Releases {
        years,
        eighties,
        nineties,
    }
}
```

The way annotations work, is that they start with an apostrophe is referred to as `'a`.

You can all it the lifetime annotation anything eg. `'foo`.

So we can explictly annotate the slices to say "we want to have the same lifetime":

```rs
fn jazz_releases<'a>(years: &'a [i64]) -> Releases<'a> {
    let eighties: &'a [i64] = &years[0..2];
    let nineties: &'a [i64] = &years[2..4];

    Releases {
        years,
        eighties,
        nineties,
    }
}
```

> "Whenever you use a slice, a references have the same lifetime as the allocation".

With the above added annotations, we have a way of expressing the lifetime of these values.

Now, with our previous call that we had.

```rs
fn main() {
    let releases = {
        let all_years: Vec<i64> =
            // alloc
            vec![
              1980, 1985, 1990, 1995, 2000, 2000
            ];

        jazz_releases(all_years)
    }; // dealloc

		// We can now tell that we refer to all_years after its lifetime has ended.
		let eighties = releases.eights;
}
```

Lifetime annotations are not always needed, but there are cases when it is needed like a struct that is going to hold on to references.

The compiler will always tell you about this. The first example of the struct would not have compiled:

```rs
// This would not compile since you have not annotated
// the lifecycle of the slice.
struct Releases {
	years: &[i64],
	eighties: &[i64],
	nineties: &[i64],
}

// This will be the fix for this example.
struct Releases<'y> {
	years: &'y [i64],
	eighties: &'y [i64],
	nineties: &'y [i64],
}
```

The other case where lifetimes come up are in documentations. It is common to see these things, and it will give you a mental model for the lifecycle of things.

## Lifetime Elision

Elision is like type inference but for the lifetimes.

```rs
// Explicit lifetime annotation
let releases: Releases<'a> = {
	let all_years: Vec<i64> = vec![
		1980, 1985, 1990, 1995, 2000, 2000
	];

	jazz_releases(&all_years)
};
```

Similar to type inference: you could write out the lifetime annotation, but you don't need to.

## The static lifetime

Static lifetimes basically come up when we assign things to string literals.

```rs
// what you normally see
let name = "Sam";

// fully annotated
let name: &'static str = "Sam";

// a slice of the binary itself
let name: &str = "Sam";
```

`'static` is a special reserved name. Anything with this lifetime is considered to be static and are never allocated and deallocated. They exist for the lifecycle of the program.

Where are they in a memory? In the binary itself. It's not going in the heap nor the stack. It is referenced directly.

This is as efficient as it gets - great for performance.
