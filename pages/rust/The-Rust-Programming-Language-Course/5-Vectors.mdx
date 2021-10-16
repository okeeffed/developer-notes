# 5: Vectors

## Vectors

```rs
let mut years: Vec<i32> = vec![1992, 2000, 2005];

years.push(2010); // years now has 4 values
years.push(2015); // years now have 5 values

println!("Number of years: {}", years.len());
```

- In vectors, you still must declare the type.
- With vectors, you can change the length.

### usize

```rs
let length: usize = years.len();
```

`usize in practice is either `u32`or`u64` depending on the platform (32-bit vs 64-bit).

Most systems will be 64-bit, although Web Assembly is 32-bit.

This is always the type of `len()` invocations.

When you are indexing with an array, the type of number you put it is also a `usize`.

### Vectors vs Arrays

```rs
let mut nums: [u8; 3] = [1, 2, 3];
let mut nums: Vec<u8> = vec![1, 2, 3];

for num in nums {
	// ...
}
```

> Note: macros don't have to be called with parenthesis.

Why would you use vectors vs arrays? The tradeoff is the biggest factor.

## Stack Memory

The stack is a way of dealing with function calls.

```rs
fn increment_decrement(num: u8) {
	print_nums(num + 1, num - 1);
}

fn print_nums(num1: u8, num2: u8) { ... }

increment_decrement(42);
```

What happens from a memory perspective?

1. The program calls `increment_decrement` and puts the number `42` onto the stack.
2. As it invokes `increment_decrement`, the arg grabs the `stack_bytes[stack_length - 1]` to get the number.
3. We then call `print_nums` with the two args `43` and `41`, so now the stack looks like `42, 43, 41` and has a `stack_length` of 3.
4. Again as `print_nums` is invoked, it gets the value from the global `stack_length` variable subtract the length.
5. As we return to the `increment_decrement` function, we pop the previously stored values off the stack.
6. Finally as we return from `increment_decrement`, we pop the value `42` off the stack and end up back with `stack_length` of 0.

That's without returning anything. What happens when we do return something?

Basically the same, EXCEPT we will leave a space and reserve it for our returned value on the stack.

This happens on the stack for most data types as we know how much space to reserve with our return, but what happens if it is a `Vec<u8>` type?

We won't know how much memory to reserve, so instead we will save space for a Vector metadata struct and the values of that struct go onto a heap.

> "To return the entire value on the stack, the size must be known at compile time."

## The Heap

The stack is used for all the function calling things, but the heap is basically a big bucket of space that is used as a helper for the stack.

So `length` tells us how much space our vector is taking up and `capacity` lets us know how much is available.

You can actually create a vector with a request capacity:

```rs
let nums = Vec::with_capacity(5)
```
