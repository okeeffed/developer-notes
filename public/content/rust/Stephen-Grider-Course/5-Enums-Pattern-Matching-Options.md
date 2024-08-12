# 5 Enums, Pattern Matching and Options

We're going to create a *catalog* that can store *books*, *movies* and *audiobooks*.

## 5.46 Defining enums

We have options on how to represent something:

1. Structs
2. Enumerations (enums)

Enums in Rust are a little different than enums in other languages as we will see.

```rs
#[derive(Debug)]
enum Media {
    Book { title: String, author: String },
    Movie { title: String, director: String },
    Audiobook { title: String },
}

// ...
```

We can imagine that the above code is like creating three structs for us (PLEASE NOTE: This is not what it's doing, but a way to think about it).

We can define functions that accept values of type "Media":

```rs
#[derive(Debug)]
enum Media {
    Book { title: String, author: String },
    Movie { title: String, director: String },
    Audiobook { title: String },
}

fn print_media(media: Media) {
    println!("{:?}", media);
}

fn main() {
    let audiobook = Media::Audiobook {
        title: String::from("The Great Gatsby"),
    };

    print_media(audiobook);
}
```

The above works just fine!

### 5.46.1 Extra credit on enums

I had a few questions:

1. Can I use `impl Media { ... }` to define the `print_media` function?
2. What's the difference between **enums** and **structs**?
3. Can I define a struct `Book` and use that as part of the **enum**?

The answers:

4. Yes, you can use `impl Media { ... }` to define the `print_media` function as a method of the `Media` enum. Here's how you can do it:

```rust
impl Media {
    fn print(&self) {
        println!("{:?}", self);
    }
}
```

Now you can call it like this: `media.print()` instead of `print_media(media)`.

2. Enums and structs in Rust serve different purposes:

   - Structs are used to group related data together. They represent a single type with multiple fields.
   - Enums are used to define a type that can be one of several variants. Each variant can optionally hold different types of data.

The main difference is that an enum instance can only be one of its variants at a time, while a struct always has all of its fields.

3. Yes, you can define a struct `Book` and use it as part of the enum. Here's an example:

```rust
#[derive(Debug)]
struct Book {
    title: String,
    author: String,
}

#[derive(Debug)]
enum Media {
    Book(Book),
    Movie { title: String, director: String },
    Audiobook { title: String },
}
```

This approach can be useful if you want to reuse the `Book` struct elsewhere in your code or if you want to add methods specific to `Book`.

## 5.47 Declaring Enum Values

In our main function, we can declare them like so:

```rs
fn main() {
    let audiobook = Media::Audiobook {
        title: String::from("The Great Gatsby"),
    };
    let good_movie = Media::Movie {
        title: String::from("The Dark Knight"),
        director: String::from("Christopher Nolan"),
    };
    let bad_book = Media::Book {
        title: String::from("50 Shades of Grey"),
        author: String::from("Some author"),
    };

    print_media(audiobook);
    print_media(good_movie);
    print_media(bad_book);
}
```

## 5.48 Adding Implementations to Enums

We can use `impl` on enums.

For adding our description method, we can use some conditional logic.

```rs
impl Media {
    fn description(&self) -> String {
        if let Media::Book {title, author} = self {
					format!("Book {} {}", title, author)
				} else if let Media::Movie {title, director} = self {
					format!("Movie {} {}", title, director)
				} else if let Media::Audiobook {title} = self {
					format!("Audiobook: {}", title);
				} else {
					String::from("Media description")
				}
    }
}
```

This is a very verbose approach, so alternative we can use `match`:

```rs
impl Media {
 	fn description(&self) -> String {
		match self {
			Media::Book { title, author } => format!("Book {} {}", title, author),
			Media::Movie { title, director } => format!("Movie {} {}", title, director),
			Media::Audiobook { title } => format!("Audiobook: {}", title),
		}
	}
}
```

It's worth calling out that the "downside" to using implementations on enums is that we need to match on self to gets things done.

## 4.49 When to use enums vs structs?

In many cases, you can use either! So ask these questions:

1. Does each thing you've modeled have the same methods? You might want to use an **enum**.
2. Does each thing have some same, but different method? You might want to use **structs**.

In our case, our media types will only ever have one, same method (`description`), so it fits the use of enums very well.

> A side-note is that if the elements have a lot properties, then you might want to opt for structs instead for destructuring purposes.

### 4.49.1 Extra credit: Using structs with enums expanded

Below I've pulled out the `Book` enum type to be a struct and passed that as the enum type.

I then give an example of using both a Book method as well as implementing a Media method for the Book:

```rs
#[derive(Debug)]
struct Book {
    title: String,
    author: String,
}

impl Book {
    fn new(title: String, author: String) -> Self {
        Book { title, author }
    }

    fn read(&self) {
        println!("Reading {} by {}", self.title, self.author);
    }
}

#[derive(Debug)]
enum Media {
    Book(Book),
    Movie { title: String, director: String },
    Audiobook { title: String },
}

impl Media {
    fn description(&self) -> String {
        match self {
            Media::Book(book) => format!("Book: {} by {}", book.title, book.author),
            Media::Movie { title, director } => format!("Movie {} {}", title, director),
            Media::Audiobook { title } => format!("Audiobook: {}", title),
        }
    }
}

fn print_media(media: &Media) {
    println!("{:?}", media);
}

fn main() {
    let audiobook = Media::Audiobook {
        title: String::from("The Great Gatsby"),
    };
    let good_movie = Media::Movie {
        title: String::from("The Dark Knight"),
        director: String::from("Christopher Nolan"),
    };
    let bad_book = Media::Book(Book::new(
        String::from("50 Shades of Grey"),
        String::from("Some author"),
    ));

    println!("{}", audiobook.description());

    print_media(&audiobook);
    print_media(&good_movie);
    print_media(&bad_book);
    // Using if let
    if let Media::Book(book) = &bad_book {
        book.read();
    } else {
        println!("This media is not a book and cannot be read");
    }
}
```

## 4.51 Adding Catalog Items

We can create a new struct to hold the media in a catalog:

```rs
#[derive(Debug)]
struct Catalog {
    items: Vec<Media>,
}

impl Catalog {
    fn new() -> Self {
        Catalog { items: vec![] }
    }

    fn add(&mut self, media: Media) {
        self.items.push(media);
    }
}
```

Note: we are not using a reference to the `media` argument in the `add` method, meaning that we want the catalog to take ownership.

In main:

```rs
fn main() {
    let audiobook = Media::Audiobook {
        title: String::from("The Great Gatsby"),
    };
    let good_movie = Media::Movie {
        title: String::from("The Dark Knight"),
        director: String::from("Christopher Nolan"),
    };
    let bad_book = Media::Book(Book::new(
        String::from("50 Shades of Grey"),
        String::from("Some author"),
    ));

    println!("{}", audiobook.description());

    print_media(&audiobook);
    print_media(&good_movie);
    print_media(&bad_book);
    // Using if let
    if let Media::Book(book) = &bad_book {
        book.read();
    } else {
        println!("This media is not a book and cannot be read");
    }

    let mut catalog = Catalog::new();
    catalog.add(audiobook);
    catalog.add(good_movie);
    catalog.add(bad_book);

    println!("{:#?}", catalog);
}
```

Running this will yield:

```txt
Audiobook: The Great Gatsby
Audiobook { title: "The Great Gatsby" }
Movie { title: "The Dark Knight", director: "Christopher Nolan" }
Book(Book { title: "50 Shades of Grey", author: "Some author" })
Reading 50 Shades of Grey by Some author
Catalog {
    items: [
        Audiobook {
            title: "The Great Gatsby",
        },
        Movie {
            title: "The Dark Knight",
            director: "Christopher Nolan",
        },
        Book(
            Book {
                title: "50 Shades of Grey",
                author: "Some author",
            },
        ),
    ],
}
```

## 5.52 Unlabeled Fields

Right now we have three variants of `Media`. Let's add two more `Podcast` and `Placeholder`:

```rs
enum Media {
    Book(Book),
    Movie { title: String, director: String },
    Audiobook { title: String },
    Podcast(u32), // Not very clear in this case
    Placeholder,
}
```

For `Podcast`, it's not so easy for other devs to know what the `u32` field represents, but this is to show what you can do.

So how do we work with variants that has raw data assigned to it as well as no data assigned at all?

First, update description:

```rs
impl Media {
    fn description(&self) -> String {
        match self {
            Media::Book(book) => format!("Book: {} by {}", book.title, book.author),
            Media::Movie { title, director } => format!("Movie {} {}", title, director),
            Media::Audiobook { title } => format!("Audiobook: {}", title),
            Media::Podcast(episode_number) => format!("Podcast episode {}", episode_number),
            Media::Placeholder => String::from("Placeholder"),
        }
    }
}
```

Then for creating them:

```rs
let podcast = Media::Podcast(42);
let placeholder = Media::Placeholder;
```

## 5.53 The Option Enum

How can we get items from a catalog? We can use the `.get` method.

If we use `catalog.items.get(n)` where `n` is an index, we get two possible results:

1. Some(value)
2. None

This is because `.get(n)` returns a Result enum that wraps a value that comes out.

Rust doesn't have `null`, `nil` or `undefined`. Instead, we get a built-in enum called `Option` with the two variants mentioned above.

If you want to work with Option you have to use pattern matching. This forces you to handle the case in which you have a value and the case in which you do not.

```rs
match catalog.items.get(0) {
  Option::Some(value) => println!("{}", value.description()),
  Option::None => println!("No item found"),
}
```

## 5.54 Option from another perspective

We'll create a custom version of the `.get` method.

```rs
#[derive(Debug)]
struct Catalog {
    items: Vec<Media>,
}

impl Catalog {
    fn new() -> Self {
        Catalog { items: vec![] }
    }

    fn add(&mut self, media: Media) {
        self.items.push(media);
    }

    fn get_by_index(&self, index: usize) -> CustomOption {
        if self.items.len() > index {
            CustomOption::Some(&self.items[index])
        } else {
            CustomOption::None
        }
    }
}

enum CustomOption<'a> {
    Some(&'a Media),
    None,
}

fn main() {
	// ... omitted

	match catalog.get_by_index(0) {
    CustomOption::Some(value) => println!("{:#?}", value),
    CustomOption::None => println!("No item found"),
  }
}
```

Here we are using a thing we haven't seen yet `'a` which is called a **lifetime annotation**. We'll get back to this later.

Also, we could access the value with a `if let` statement:

```rs
if let CustomOption::Some(value) = catalog.get_by_index(8) {
  println!("{:#?}", value);
} else {
  println!("No item found");
}
```

The one other different with our implementation is that `Option<T>` is a generic where `T` is a type you supply. For us, that is `Option<Media>`.

## 5.56 Other Ways of Handling Options

Match is the ideal way to figure out if we have `Some` or `None`.

There are more compact ways, but could result in crashes (less safe).

1. item.unwrap()
2. item.expect("There should be a value here")
3. item.unwrap_or(&placeholder)

For (1):

- If item is Some, results the value.
- If item is None, panics.
- Use for quick debugging or examples.

For (2):

- If item is a Some, returns the value in the Some.
- If item is a None, prints the provided debug message and panics.
- Use when we **want** to crash if there is no value.

For (3):

- If item is a Some, returns the value in the Some.
- If item is a None, returns the provided default value.
- Use when it makes sense to provide a fallback value.

Again, stick to match in real world scenarios unless you have a specific purpose.

## 5.58 Challenge

The final result:

```rs
// TODO:
// 1) Safely access the first account in the 'accounts' vector using the 
//    .first_mut() method. 
// 2) '.first_mut()' returns an Option whose Some variant is a mutable ref to 
//     an Account. Use a 'match' statement to figure out if
//     you have a Some or a None
// 3) In the Some case, set the balance of the account to 30, then print the account
// 4) In the None case, print the message "No account found"
// Hint: You might have to add in the 'mut' keyword somewhere...

#[derive(Debug)]
struct Account {
    balance: i32
}

fn main() {
    let mut accounts: Vec<Account> = vec![
        Account { balance: 0 },
        Account { balance: 10 }
    ];
    
    // Add code here:
    match accounts.first_mut() {
        Some(account) => {
            account.balance = 30;
            println!("{:#?}", account);
        }
        None => println!("No account found")
    }
}
```