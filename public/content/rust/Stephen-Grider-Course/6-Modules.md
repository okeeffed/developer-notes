# 6 Modules

This section refactors our previous code using Rust modules.

The existing code:

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
    Podcast(u32),
    Placeholder,
}

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

    fn get_by_index(&self, index: usize) -> Option<&Media> {
        if self.items.len() > index {
            Some(&self.items[index])
        } else {
            None
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
    let podcast = Media::Podcast(42);
    let placeholder = Media::Placeholder;

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
    catalog.add(podcast);
    catalog.add(placeholder);

    println!("{:#?}", catalog.items.get(8));

    match catalog.get_by_index(0) {
        Some(value) => println!("{:#?}", value),
        None => println!("No item found"),
    }

    if let Some(value) = catalog.get_by_index(8) {
        println!("{:#?}", value);
    } else {
        println!("No item found");
    }
}
```

## 6.59 Modules overview

There are three ways to make modules:

1. Create a mod in an existing file. Most appropriate when you have a really large file with a lot of stuff going on.
2. Create a module in a new single file in the same folder. Most appropriate when you want a separate module to organize code, but it doesn't need to span several files.
3. Spread code out among several separate files in a new folder. Most appropriate for large modules. Has a couple of confusing parts.

```rs
// Option 1
mod content {
	pub enum Media {}
	pub struct Catalog {}
}

fn main() {
	let catalog = content::Catalog::new();
	// ... rest
}
```

We have a new keyword **pub**. By default, nothing is public in modules, so we need the **pub** keyword.

```rs
// Option 2
// src/content.rs
pub enum Media {}
pub struct Catalog {}

// src/main.rs
mod content;

fn main() {
	let catalog = content::Catalog::new();
	// ... rest
}
```

Finally for option 3, imagine you have three files:

1. src/content/media.rs
2. src/content/catalog.rs
3. src/content/mod.rs

`src/main.rs` can still use `mod content;` to reference `content/mod.rs`.

You need the `mod.rs` file within the folder.

## 6.60 Refactor

We ended up going with option (3) from above to create a `content` folder and add the files.

The one tricky thing to understand is that within a module, if you need to reference another module from the same folder, you need to make use of the `use super::` syntax.

For example, accessing `Media` from `content/media.rs` from `content/catalog.rs` requires the following:

```rs
use super::media::Media
```

Please note: you *don't* need the **mod** keyword in that case.