# 9 Lifetime Annotations

Lifetime annotations are used with functions, structs, enums, etc.

A **lifetime annotation** helps the compiler make sure refs wont outlive the value they refer to.

The hardest part: This will seem like something the compiler should do on its own.

```rs
struct Account {
    balance: i32,
}

struct Bank<'a> {
    primary_account: &'a Account,
}

fn make_bank<'a>() -> Bank<'a> {
    let account = Account { balance: 10 };
    let bank = Bank { primary_account: &account };

    bank
}
```

The problem with `make_bank` is that `account` would be dropped once its out of scope, so using lifetime annotations helps the compiler know *not to drop* the value, so the above code won't compile.

## 9.103 A missing annotation

We put together this code:

```rs
// ERROR FOR RETURN TYPE
fn next_language(languages: &[String], current: &str) -> &str {
    let mut found = false;

    for language in languages {
        if found {
            return language;
        }

        if language == current {
            found = true;
        }
    }

    languages.last().unwrap()
}

fn main() {
    let languages = vec![
        String::from("Rust"),
        String::from("Go"),
        String::from("TypeScript"),
    ];

    let result = next_language(&languages, "Go");
    println!("Next language: {}", result);
}
```

We get an error at the return type: 

```txt
missing lifetime specifier
this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from `languages` or `current`
```

Before we address this problem, we do a review of lifetimes.

## 9.104 Borrowing and lifetimes review

We had rule (10) references to a value can't outlive the value they refer to.

If we had the following code:

```rs
fn main() {
		let result;
		{
			let languages = vec![
					String::from("Rust"),
					String::from("Go"),
					String::from("TypeScript"),
			];

			result = next_language(&languages, "Go");
		}
    println!("Next language: {}", result);
}
```

Then both `languages` and the references to languages from the `next_language` function go out of scope. So we would get an error.

Now that the review is done, let's go back into lifetime annotations.

## 9.105 What lifetime annotations are all about

Our function takes in two references and returns a reference: `fn next_language(languages: &[String], current: &str) -> &str`.

Rust makes an assumption here: the return ref will point at data referred to by one of the arguments.

The other thing is that Rust will not analyze the body of the function to figure out whether the return ref is pointing at the first or second arg.

We can fix that with the annotation to help the compiler know:

```rs
fn next_language<'a>(languages: &'a [String], current: &str) -> &'a str {
    let mut found = false;

    for language in languages {
        if found {
            return language;
        }

        if language == current {
            found = true;
        }
    }

    languages.last().unwrap()
}

fn main() {
    let languages = vec![
        String::from("Rust"),
        String::from("Go"),
        String::from("TypeScript"),
    ];

    let result = next_language(&languages, "Go");
    println!("Next language: {}", result);
}
```

## 9.106 Lifetimes common questions

1. Why does it matter whether the return ref points at the first or second arg? It comes back to the rules we reviewed previously. 
2. Why doesn't Rust analyze the function body to figure out if the returned ref points at the first or second arg? This is because the lifetime annotation needs the context at the call site of the function to figure our what will and what won't work.

## 9.107 Lifetime elision

Next function to work on is `last_language`.

```rs
fn last_language(languages: &[String]) -> &str {
    languages.last().unwrap()
}
```

This is an edge case where we don't have to rely on lifetimes at all.

Rust assumes the returned ref is tied to the only arg. Same happens if you have multiple arguments, but only one of them is a reference (as well as the return value).

1. Function that takes one ref + any number of values + returns a ref.
2. Method that takes &self and any number of other refs returns a ref. Rust here assumes the returned ref will point at &self. If this isn't true, you will need to annotate.

For (1):

```rs
fn generate(set: &[i32], range: i32) -> &str
```

For (2):

```rs
struct Bank {
	name: string
}

impl Bank {
	fn get_name(&self, default_name: &str) -> &str {
		&self.name
	}
}
```

Omitting life annotations is referred to as **elision**. Why? Who knows.

## 9.108 Common lifetimes

We will work on the `longest_language`.

```rs
fn longest_language(lang_a: &str, lang_b: &str) -> &str {
    if lang_a.len() > lang_b.len() {
        lang_a
    } else {
        lang_b
    }
}
```

Once again, we will get this error:

```txt
missing lifetime specifier
this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from `lang_a` or `lang_b`
```

We fix this with something similar:

```rs
fn longest_language<'a>(lang_a: &'a str, lang_b: &'a str) -> &'a str {
    if lang_a.len() > lang_b.len() {
        lang_a
    } else {
        lang_b
    }
}
```

It's all about communicating how the references are used and returned here.

The usage of a lifetime annotation also somehow sounds like it will prolong the lifetime of a variable, but that is actually *not at all* how they work. It's just used for communicating the relationship between the argument relationship and the return value.

Here is the full code for this section by the end:

```rs
fn next_language<'a>(languages: &'a [String], current: &str) -> &'a str {
    let mut found = false;

    for language in languages {
        if found {
            return language;
        }

        if language == current {
            found = true;
        }
    }

    languages.last().unwrap()
}

fn last_language(languages: &[String]) -> &str {
    languages.last().unwrap()
}

fn longest_language<'a>(lang_a: &'a str, lang_b: &'a str) -> &'a str {
    if lang_a.len() > lang_b.len() {
        lang_a
    } else {
        lang_b
    }
}

fn main() {
    let languages = vec![
        String::from("Rust"),
        String::from("Go"),
        String::from("TypeScript"),
    ];

    let result = next_language(&languages, "Go");
    println!("Next language: {}", result);

    let last = last_language(&languages);
    println!("Last language: {}", last);

    let longest = longest_language(&languages.first().unwrap(), &languages.last().unwrap());
    println!("Longest language: {}", longest);
}
```

