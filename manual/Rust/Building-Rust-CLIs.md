---
menu: Rust
name: Building Rust Command Line Tools
---

# Building Rust Command Line Tools

Initial findings based off a useful article [found here](https://mattgathu.github.io/writing-cli-app-rust/).

## tl;dr 

Initialise an app using `cargo new app_name_you_want --bin`.

This example diverges from the above article by using the "Clap" crate with the YAML file config.

### src/main.rs

Update the file to reflect the following:

```rust
#[macro_use]
extern crate clap;
use clap::App;

fn main() {
    let yaml = load_yaml!("cli.yml");
    let matches = App::from_yaml(yaml).get_matches();

    // Gets a value for config if supplied by user, or defaults to "default.conf"
    let config = matches.value_of("config").unwrap_or("default.conf");
    println!("Value for config: {}", config);

    // Calling .unwrap() is safe here because "INPUT" is required (if "INPUT" wasn't
    // required we could have used an 'if let' to conditionally get the value)
    println!("Using input file: {}", matches.value_of("INPUT").unwrap());

    // Vary the output based on how many times the user used the "verbose" flag
    // (i.e. 'myprog -v -v -v' or 'myprog -vvv' vs 'myprog -v'
    match matches.occurrences_of("v") {
        0 => println!("No verbose info"),
        1 => println!("Some verbose info"),
        2 => println!("Tons of verbose info"),
        3 | _ => println!("Don't be crazy"),
    }

    // You can handle information about subcommands by requesting their matches by name
    // (as below), requesting just the name used, or both at the same time
    if let Some(matches) = matches.subcommand_matches("test") {
        if matches.is_present("debug") {
            println!("Printing debug info...");
        } else {
            println!("Printing normally...");
        }
    }
}
```

### src/cli.yml

For the CLI args, set the following:

```yml
name: jamaica
version: "1.0"
author: Dennis O'Keeffe <hello@dennisokeeffe.com>
about: Build agnostic app configs
args:
    - config:
        short: c
        long: config
        value_name: FILE
        help: Sets a custom config file
        takes_value: true
    - INPUT:
        help: Sets the input file to use
        required: true
        index: 1
    - verbose:
        short: v
        multiple: true
        help: Sets the level of verbosity
subcommands:
    - test:
        about: controls testing features
        version: "1.3"
        author: Someone E. <someone_else@other.com>
        args:
            - debug:
                short: d
                help: print debug information
```

### Running the above config

```shell
cargo run -- src/main.rs --config=made/up/
# ... omitted Rust build output
Value for config: made/up/file
Using input file: src/main.rs
No verbose info

cargo run -- --help
# shows help output: omitted for now
```
