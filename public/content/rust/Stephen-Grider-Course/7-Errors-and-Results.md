# 7 Errors and Results

## 7.62 Project overview

We have a logs.txt file that we want to:

1. Open and parse the logs.txt file
2. Extract some useful data from the file
3. Make sure we have robust error handling

## 7.63 Reading a File

It's fairly simple to read a file (assuming it's in the root directly):

```rs
use std::fs;

fn main() {
    let text = fs::read_to_string("logs.txt");
    println!("{:?}", text);
}
```

If we print this, we'll notice that the `text` variable at the moment has an `Ok` wrapped around it. This is very similar to what we saw with the `Option` types.

## 7.64 The Result Enum

For a quick aside, imagine we're writing our own `divide` function.

Of course, we can't divide by 0, so how do we handle this?

```rs
fn divide(a: f64, b: f64) -> _ {
	if b == 0.0 {
		// Uh oh...
	}

	a / b
}
```

We can use a way to represent this as an operation that can **succeed** or **fail**. In this case, we can use the `Result` enum.

> Sidenote: Divide by 0 in Rust returns infinity, not an error.

## 7.65 The Result Enum in Action

Let's see the code in use:

```rs
use std::io::Error;

fn divide(a: f64, b: f64) -> Result<f64, Error> {
	if b == 0.0 {
		Err(Error::other("Something went wrong"))
	}

	Ok(a / b)
}
```

Result can return `Err<ErrorType>` or `Ok<ValueType>`.

For the result definition:

```rs
enum Result<T, E> {
	Ok(T),
	Err(E)
}
```

We use generics to help indicate what the returning types will be.

## 7.66 Types of Errors

Let's focus on the `std::io::Error`.

This is a struct that can help represent errors.

A lot of other modules also have custom error structs defined (e.g. in `std::num`, `std::str`).

There isn't a equivalent of `Error` in JavaScript.

## 7.67 Types Matching on Results

If we were to use the `divide` function we wrote, we can use pattern matching on it:

```rs
fn main() {
	let result = divide(5.0, 3.0);

	match result {
		Ok(value) => println!("{}", value),
		Err(e) => println!("{}", e)
	}
}
```

## 7.68 Empty Ok Variants
 
There is also an empty Ok variant if we don't want to return a value.

```rs
fn validate_email(email: String) -> Result<(), Error> {
	if email.contains("@") {
		Ok(())
	} else {
		Err(Error::other("emails must have @"))
	}
}
```

The convention is to return an empty tuple.

What is a tuple? It's a way to represent a strict set of related data types. Here's an example:

```rs
type Rgb = (u8, u8, u8);

fn make_rgb() -> Rgb {
	(0, 128, 255)
}

fn main() {
	let color = make_rgb();
	let red = color.0;
}
```

In use:

```rs
match validate_email(String::from("abc@email.com")) {
	Ok(..) => println!("email is valid"),
	Err(reason) => println!("{}", reason)
}
```

The `Ok(..)` is also convention for representing that we acknowledge `Ok` has a value, but we don't care about it.

## 7.71 Using a Result when Reading Files

```rs
use std::fs;
use std::io::Error;

fn main() {
    let text = fs::read_to_string("logs.txt");

    match text {
        Ok(content) => {
            println!("{}", content.len())
        }
        Err(error) => {
            println!("Error: {}", error)
        }
    }
}
```

## 7.72 Tricky strings

Strings in Rust can be a bit trickier to get into compared to other languages. There are several different types of strings.

Let's explore this with a test.

```rs
fn string_test(
	a: String,
	b: &String,
	c: &str
) {

}

fn main() {
	// One alternative
  string_test(
		String::from("a"), 
		&String::from("b"), 
		"c"
	);

	// Another alternative
	string_test(
		String::from("a"), 
		&String::from("b"), 
		String::from("c").as_str()
	);

	// Another alternative
	string_test(
		"a".to_string(), 
		&"b".to_string(), 
		"c"
	);
}
```

Why is this? What are the differences?

## 7.73 The Stack and Heap

To understand how strings work, you need to understand how memory works in Rust.

Think of three memory destinations:

1. Stack
2. Heap
3. Data/Rodata/Static segment (or not referred to at all)

Each area has it's own purpose:

1. Stack: Fast, but limited size (2-8MB).
2. Heap: Slow, but can grow to store a lot of data.
3. Static segment: Stores literal values that we write into our code.

Let's take this code `let nums = vec![1,2,3,4,5];`. A very common pattern is the following:

1. Stack stores metadata about the data structure.
2. Heap stores the actual data.

This helps to avoid running out of memory in the stack if the data structure grows to hold a lot of data.

## 7.74 Strings, String Refs, String Slices

Let's analyze the different string types.

```rs
let color = String::from("red");
```

In this scenario, the **data segment** already has it stored inside due to the source code.

When we run the code, we end up with a **pointer** in the **stack pointing** to the data in the **heap**. 

The **stack** will have the string struct, the **heap** will copy the **data segment** to the **heap** and the stack will point to the **heap**.

```rs
let color_ref = &color;
```

In the above ref code, we'll create a reference that sits in the **stack** which points to the other string struct on the stack that we created previously.

```rs
let name = "me";
```

Finally, the `&str` type (known as a **string slice**) doesn't use the heap out at all.

The literal is still in the data segment. Then in the stack, we'll a struct with only two fields: pointer to the text and the length of the string.

The difference here is that the pointer from the string slice points to the data stored in the data segment directly.

```rs
let color = String::from("red");
let c = color.as_str();
```

We can also have the scenario like above, where we create a string slice from a string.

In that scenario, the string slice struct won't point to the data segment, it will point to the data in the heap that was allocated in `color`.

## 7.75 When to Use Which String

Why does any of this matter from the above types?

`&String` and `&str`: both provide a read-only reference to text data, so why do they exist?

1. `&str` lets your refer to text in the data segment without a heap allocation, which is slightly more performant.
2. It allows us to "slice" (or take a portion) of text that is already on the heap.

For (2), we can create a string slice as well like so:

```rs
let color = String::from("blue");
let portion = &color[1..4];
```

When to use which type?

| Type | When |
| --- | --- |
| String | Anytime we want ownership of text or want text to grow or shrink|
| &String | Rarely used! Rust will automatically talk them into &str for you |
| &str | Anytime you don't want to take ownership or want to refer to a portion of a string owned by someone else |

## 7.76 Finding Error Logs

I've changed my code a little from what they had to use iterators here, but this was the code:

```rs
use std::fs;

fn extract_errors(text: &str) -> Vec<&str> {
    text.lines().filter(|line| line.contains("ERROR")).collect()
}

fn main() {
    let text = match fs::read_to_string("logs.txt") {
        Ok(content) => content,
        Err(error) => {
            println!("Error: {}", error);

            // Non-zero exit
            std::process::exit(1);
        }
    };

    let errors = extract_errors(&text);
    println!("Errors: {:#?}", errors);
}
```

> In the course, it demonstrated code that runs into an error around lifetimes because it was using the `text.split("\n")` method. This returns `Vec<&str>` in that example, which means it's only creating pointers to the original text string. It goes out of scope when it's cleaned up within the the `match` scope. The example they had used `let mut` at the top scope and tried reassigning in the match block.

## 7.78 Fixing Errors around String Slices

In the example from the video, the solution was different to mine. 

Instead of returning `Vec<&str>`, it returns `Vec<String>` and converts the code it was working with to convert the string slices to `String` types.

## 7.79 Writing Data to a File

I've added in another `match` block for this:

```rs
use std::fs;

fn extract_errors(text: &str) -> Vec<&str> {
    text.lines().filter(|line| line.contains("ERROR")).collect()
}

fn main() {
    let text = match fs::read_to_string("logs.txt") {
        Ok(content) => content,
        Err(error) => {
            println!("Error: {}", error);
            std::process::exit(1);
        }
    };

    match fs::write("errors.txt", extract_errors(&text).join("\n")) {
        Ok(..) => {
            println!("Errors written to errors.txt");
        }
        Err(error) => {
            println!("Error writing file: {}", error);
            std::process::exit(1);
        }
    }
}
```

## 7.80 Alternatives to Nested Matches

I never did the nested match myself, since the code that I wrote opted to return values from the `match`.

The alternative that I could have gone with is the `text.expect("error message")` if I was okay for crashing something if it went wrong. I opted for a more gracefully failure that logs the error.

## 7.81 The Try Operator

We could have `main` return a `Result<(), Error>` if we wanted to.

```rs
fn main() -> Result<(), Error> {
	Err(Error::other("asdf"))
}
```

In the above where we return the Error, Rust will print out to show us what went wrong.

Alternatively, we can use another operator `?`.

The `?` try operator can be added onto functions that result a `Result`.

```rs
let text = fs::read_to_string("logs.txt")?;
```

Depending on the variant we get back `Ok` or `Err`. If it's `Ok`, it will automatically unwrap that function and bind it.

In the case that it's an `Error` variant, then it will unwrap that error and then return it early.

The refactored code now looks like this:

```rs
use std::fs;
use std::io::Error;

fn extract_errors(text: &str) -> Vec<&str> {
    text.lines().filter(|line| line.contains("ERROR")).collect()
}

fn main() -> Result<(), Error> {
    let text = fs::read_to_string("logs.txt")?;
    fs::write("errors.txt", extract_errors(&text).join("\n"))?;
    Ok(())
}
```

## 7.82 When to Use Each Technique

We have a number of options for what technique we can apply now for error handling, so when should we use what?

The following is a guide from the course:

1. Use a match of "if let" statement when you're ready to meaningfully deal with an error.
2. Call "upwrap" or "expect" on the Result for quick debugging or if you want to crash on an `Err()`.
3. Use the try operator ("?") to unwrap or propagate the Result when you don't have any way to handle the error in the current function.