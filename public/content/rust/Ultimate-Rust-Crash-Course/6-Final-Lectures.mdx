# 6: Final Lectures

## Closures

You'll encounter closures when you spawn a thread or do some functional programming.

The syntax `|x, y| { x + y }`. The types of the arguments and the return value are all inferred.

```rs
let add = |x, y| {x + y}
add(1,2); // returns 3
```

You also don't have to have any params `|| {x + y}`.

```rs
let s = "S".to_string();
let f = || {
	println!("{}", s);
};

f(); // prints "S"
```

Closures also support `move` semantics which forces the closure to move any variables it uses into itself and take ownership of them.

This allows us to move closures over to another thread or return it as a value of a function.

```rs
let s = "S".to_string();
let f = move || {
	println!("{}", s);
};

f(); // prints "S"
```

If you want to do functional style programming, closures will be your friends:

```rs
let mut v = vec![2,4,6];

v.iter()
	.map(|x| x * 3)
	.filter(|x| *x > 10)
	.fold(0, |acc, x| acc + x);
```

Note that `v.iter()` is required to turn a vector into an iterator.

## Threads

Rust threading is portable. So it should work across Mac, Linux and Windows (plus more).

Here is functional (but pretty empty) example.

```rs
use std::thread;

fn main() {
	let handle = thread::spawn(move || {
		// do stuff in the child thread
	});

	// do stuff simultaneously in the main thread

	// wait until thread has exited
	handle.join().unwrap();
}
```

Spawn returns a `join` handle. It can be called to tell our main execution to wait until a thread completes.

The `join` returns a Result value.

Threading is pretty heavy weight. Whenever the CPU switches from one CPU to another, the more overhead you will have in context switching (depending on the number of cores).

If you just want to continue doing some work while waiting for something, then look into async/await which is a much more efficient approach for concurrently awaiting things.
