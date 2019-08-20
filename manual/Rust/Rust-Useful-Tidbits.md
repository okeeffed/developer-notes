---
menu: Rust
name: Useful Tidbits
---

# Useful Tidbits

## Importing crates vs std lib

```rust
// for extenal dependencies
extern crate clap;
use clap::App;
// for standard Rust libraries
use std::fs;
```

## Reading YAML

Note that this is being done by using the `clap` crate that is used for CLI tools - may need to update for appropraite use with `rust-yaml`:

```rust
#[macro_use]
extern crate clap;
use clap::App;

fn main() {
  let yaml = load_yaml!("cli.yml");
  println!("{:#?}", yaml);
}
```

## Reading JSON

```rust
#[macro_use]
extern crate serde_json;

use std::path::Path;
use std::fs::File;

fn main() {
    let json_file_path = Path::new("src/test.json");
    let json_file = File::open(json_file_path).expect("file not found");
    let json: serde_json::Value = serde_json::from_reader(json_file).expect("JSON was not well-formatted");
    println!("{:#?}", json);
}
```

Output:

```shell
Object(
    {
        "id": String(
            "1234"
        ),
        "object": Object(
            {
                "array": Array(
                    [
                        Number(
                            1
                        ),
                        Number(
                            2
                        ),
                        Number(
                            3
                        )
                    ]
                )
            }
        )
    }
)
```

## Logging

You want to implement the Debug trait on your struct. Using #[derive(Debug)] is the easiest solution. Then you can print it with {:?}:

```rust
#[derive(Debug)]
struct MyStruct{
    a: i32,
    b: i32
}

fn main() {
    let x = MyStruct{ a: 10, b: 20 };
    println!("{:?}", x);
}
```

In use:

```rust
// assuming matches is a struct or array
println!("{:?}", matches); // logging out structs or arrays
println!("{:#?}", matches); // pretty print
println!("{}", matches.occurrences_of("verbose"));
```