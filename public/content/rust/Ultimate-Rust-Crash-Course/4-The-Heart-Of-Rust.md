# 4: The Heart Of Rust

## Ownership

Ownership makes our safety guarantees possible.

There are 3 rules:

1. Each value has an owner.
2. Only one owner of a value. No shared ownership (although you can borrow).
3. When the owner goes out of scope, the value is dropped.

```rs
let s1 = String::from('abc');
let s2 = s1;
println!("{}", s1); // error: value used here after move of ownership
```

`s1` is moved to `s2` and then `s1` is essentially uninitialized.

If we wanted instead to create a copy of the value.

```rs
let s1 = String::from('abc');
let s2 = s1.clone();
println!("{}", s1); // error: value used here after move of ownership
```

> Note: the word `copy` is reserved for when we want to create a copy of a value on the stack only.

```rs
let s1 = String::from('abc');
do_stuff(s1);
println!("{}", s1); // error: value used here after move of ownership

fn do_stuff(s: String) {
	// do something
}
```

What if we want to do something?

```rs
let mut s1 = String::from('abc');
s1 do_stuff(s1);
println!("{}", s1); // error: value used here after move of ownership

fn do_stuff(s: String) {
	// do something
	s
}
```

## References & Borrowing

If we take the previous example, we can update our function `do_stuff` to take a reference instead of a value.

```rs
let s1 = String::from('abc');
do_stuff(&s1);

fn do_stuff(s: &String) {
	// we borrow the reference here
}
```

In this example, `do_stuff` has a reference to the argument and borrows the value until it goes out of scope (its lifetime).

When we create a reference, we essentially create a pointer to a pointer, although you do not really talk about pointers in Rust as Rust handles the creation and destruction of them.

Lifetimes can be summed up as a rule that "reference must always be valid".

References are immutable by default (even if it is referencing something mutable) but we can make them mutable using the keyword `mut`.

```rs
let mut s1 = String::from('abc');
do_stuff(&mut s1);

fn do_stuff(s: &mut String) {
	s.insert_str(0, "Hi, ");
}
```

Why didn't we have to dereference the reference used in the function?

The dot operator auto-dereferences until it gets to a value. So we don't even have to worry about this.

With other operators (like the assignment operator) you will need to manually dereference the reference to read from or write to the actual value.

```rs
let mut s1 = String::from('abc');
do_stuff(&mut s1);

fn do_stuff(s: &mut String) {
	s.insert_str(0, "Hi, ");
	// manual dereference
	*s = String::from('Replacement');
}
```

At any given time, you can have either exactly one mutable reference or any number of immutable references. This is safe for parallel programming and enforced by the compiler.
