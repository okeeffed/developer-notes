# 3 Ownership and Borrowing

This project will cover a bit on errors, as well as learning about some systems in Rust.

We will be simulating a bank with many accounts.

Each account will have a balance, account_number (or id) and holder property.

## 3.19 Defining structs

Start with defining `Account` and `Bank`.

```rs
#[derive(Debug)]
struct Account {
    balance: i32,
    id: i32,
    holder: String,
}

#[derive(Debug)]
struct Bank {
    accounts: Vec<Account>,
}
```

## 3.20 Adding inherent implementations

Bank:

| Description | Method/associated func? | Name | Args | Returns |
| --- | --- | --- | --- | --- |
| Creates Bank instance | AF | new() | - | Bank |


Account:

| Description | Method/associated func? | Name | Args | Returns |
| --- | --- | --- | --- | --- |
| Creates Account instance | AF | new() | id: u32, holder: string | Account |

### Creating instances

At this point, we update our `main` function:

```rs
fn main() {
    let bank = Bank::new();
    println!("{:#?}", bank);

    let account = Account::new(1, String::from("Me"));
    println!("{:#?}", account);
}
```

For now, we're going to refactor our the `println!` call as a helper function.

```rs
fn print_account(account: Account) {
    println!("{:#?}", account);
}
```

## 3.21: A mysterious error: running into our first "use after move" error

If we have the following code:

```rs
fn main() {
    let bank = Bank::new();
    println!("{:#?}", bank);

    let account = Account::new(1, String::from("Me"));
    print_account(account);
    print_account(account); // USE AFTER MOVE ERROR
}
```

We'll get a use after move error. Why is that? The next section covers it.

## 3.22 Unexpected value updates

To understand this, we need to understand three Rust concepts:

1. **Ownership**
2. **Borrowing**
3. **Lifetimes**

They are three connected systems which can be tough to understand, but represent 90% of the difficulty of Rust.

They will dramatically change the way you will design and write code (compared to other languages).

### A list of useful rules

- Ownership: 1 - 2.
- Borrowing: 3 - 7.
- Lifetimes: 8 - 10.

The rules:

1. Every value is **owned** by a single **variable**, **struct**, **vector**, etc at a time.
2. **Reassigning** the value to another variable, passing it to a function, putting it into a **vector**, etc, **moves** the value. The old **variable** can't be used anymore!
3. You can create many **read-only references** to a **value** that exist at the same time.
4. You can't move a **value** while a **ref** to the value exists.
5. You can make a **writeable (mutable) reference** to a value *only if* there are no **read-only references** currently in use. One **mutable ref** to a **value** can exist at a time.
6. You can't **mutate** a value through the **owner** when any **ref** (**mutable** or **immutable**) to the value exists.
7. Some types of values are **copied** instead of **moved** (numbers, bools, chars, array/tuples with copyable elements.)
8. When a **variable** goes out of **scope**, the value owned by it is **dropped** (cleaned up in memory.)
9. Values can't be **dropped** if there are still active references to it.
10. References to a value can't outlive the value they refer to.

These rules dramatically change how you write code. When it doubt, remember that Rust wants to minimize unexpected updates to data.

The goal of ownership is to limit the ways you can reference and change data.

This limitation will reduce the number of bugs + make your code easier to understand.

[Without boats blog](https://without.boats/blog/references-are-like-jumps)

There is an example of a tiny program in JavaScript vs Rust where it's impossible to happen in JavaScript.

```js
const engine = {
	working: true
}

const mustang = {
	name: "Mustang",
	engine: engine
}

const camero = {
	name: "Camero",
	engine: engine
}

function checkCar(car) {
	if (car.name === "Mustang") {
		car.engine.working = false
	}
}

checkCar(mustang)

// As expected, mustang.engine.working === false
// !!! BUT OH NO camero.engine.working === false 
```

The above code demonstrates how we've easily mutated the state of the Camero engine without any resistance from JavaScript. This happens because of the reference that the `mustang` and `camaro` are referencing.

## 3.23 The Goal of Ownership and Borrowing

Let's see this code, but this time in Rust.

The fix this bug, we have two options:

1. `engine` becomes read-only, but we can't modify it.
2. Each car could own it's own engine instance e.g. `engine1` and `engine2`.

The lessons we can get from this:

1. Multiple things can refer to a value at the same time, but only if they are all read-only.
2. A value can *only* be updated when there are no read-only references to it.

Those two lessons for the basis of the ownership + borrowing system. These rules are implemented in Rust with the goal of reducing bugs like we have seen with the car example.

Lesson (1) is connected to our list of rules for (3), (5) and (6).

Lesson (2) is connected to (1), (5) and (6).

## 3.24 The Basics of Ownership

This will work through rule list (1) and (2).

1. Every value is **owned** by a **single variable** at a time.
2. Reassigning the value to another variable **moves** the value. The old variable can't be used to access the value anymore!

Rust wants to stop you from unexpected updates.

The following code violates the rules of (1) and (2):

```rs
fn main() {
   let bank = Bank::new();

   let other_bank = bank;
   println!("{:#?}", bank);
}
```

This is because of our two bindings. Effectively, `other_bank` is saying "take what's in the bank binding and move it to the other_bank binding".

When the value is moved, then `bank` has no binding at all. So when we run `println!`, we're trying to print a value that's already been moved.

## 3.25 Visualizing Ownership and Moves

Let's expand on rule (1) and (2) with their full versions.

An owner can be owned by a single variable, argument, struct, vector etc.

Reassigning a value to variable, passing it to a function, putting it into a vector etc **moves the value**. The old owner can't be used to access the value anymore!

Given those rules, we know the following won't work:

```rs
fn print_account(account: Account) {
    println!("{:#?}", account);
}

fn main() {
    let account = Account::new(1, String::from("Me"));

    print_account(account);
    print_account(account);
}
```

Another example of things not working due to move to a vector:

```rs
fn main() {
    let account = Account::new(1, String::from("Me"));
    let list_of_accounts = vec![account];

    println!("Here's your account: {:#?}", account);
}
```

Another example due to a reassignment:

```rs
let bank = Bank::new();
let accounts = bank.accounts;
println!("{:#?}", bank.accounts);
```

Another because of the movement of the account reference to being owned by the `print_account` function:

```rs
fn main() {
    let account = Account::new(1, String::from("Me"));

    print_account(account);

    println!("{}", account.holder);
}
```

Finally, let's look at an example where a property of a struct is moved which causes an error later:

```rs
fn print_account(account: Account) {
    println!("{:#?}", account);
}

fn print_holder(holder: String) {
    println!("{}", holder);
}

fn main() {
    let account = Account::new(1, String::from("Me"));

    print_holder(account.holder);
    print_account(account);
}
```

Rust doesn't even allow you to use values that have been partially moved!

## 3.30 Writing Useful Code with Ownership

Given the ownership system, we have two options:

1. Manually move values back and forth between different owners (not used often).
2. Use the borrowing system.

For (1):

```rs
fn print_account(account: Account) -> Account {
    println!("{:#?}", account);
    account
}

fn main() {
    let mut account = Account::new(1, String::from("Me"));

    account = print_account(account);
    account = print_account(account);

		println!("{:#?}", account);
}
```

But it's not super useful, so let's explore borrowing.

## 3.31 Introduce the Borrow System

Start with a code snippet:

```rs
fn print_account(account: &Account) {
    println!("{:#?}", account);
}

fn main() {
    let account = Account::new(1, String::from("Me"));
    let account_ref = &account;

    print_account(account_ref); // equivalent to just put in &account here

    println!("{:#?}", account);
}
```

We use the `&` to get a reference to the value. We then use that reference to print into the account.

## 3.32 Immutable references 

THe `&` has different uses depending on where you put it.

- `&` being used on a type = This argument needs to be a reference to a value of this type
- `&` being used on a value = I want to create a reference to this value

There are two kinds of references:

1. read-only (immutable)
2. mutable

The example we had before was a read-only reference. We couldn't use that reference to change the value.

Another important rule we mentioned is that you can't move a value that has a ref.

```rs
fn main() {
    let account = Account::new(1, String::from("Me"));
    let account_ref = &account;

    let out_account = account;

    print_account(account_ref);

    println!("{:#?}", account);
}
```

In this case, "cannot move out of `account` because it is borrowed
move out of `account` occurs here" happens when we try reassigning `account` to `out_account` while `account_ref` exists.

## 3.35 Mutable References

Moving ownership to update something can be really tedious.

That the following code that rebinds account:

```rs
fn change_account(account: Account) -> Account {
	account.balance = 10;
	account
}

fn main() {
	let mut account = Account::new(
		1,
		String::from("me")
	);

	account = change_account(account);

	println(":#?}", account);
}
```

We can use mutable references to help resolve this:

```rs
fn change_account(account: &mut Account) {
    account.balance = 10;
}

fn main() {
    let mut account = Account::new(1, String::from("Me"));

    change_account(&mut account);

    println!("{:#?}", account);
}
```

There are some important rules about this you need to understand:

- You can make a writeable (mutable) reference to a value only if there are no read-only references currently in use. One mutable ref to a value can exist at a time.
- You can't mutate a value through the owner when any ref (mutable or immutable) to the value exists.

Any example of the ref issue:

```rs
// Will not compile
fn main() {
	let mut account = Account::new(1, String::from("Me"));

	let account_ref = &account;
  change_account(&mut account);
  println!("{:#?}", account_ref.holder);
}
```

As for the second problem, we can demonstrate it this way:

```rs
// This won't compile
fn main() {
    let mut account = Account::new(1, String::from("Me"));
    let account_ref = &mut account;
    account.balance = 10; // WON'T WORK WITH THE REF EXISTING AND BEING MUTATED

    change_account(account_ref);
    println!("{:#?}", account);
}
```

## 3.36 Copyable Values

From rule (7) placed at the start: Some types are copied instead of moved (numbers, bools, chars, arrays/tuples and copyable elements).

Another way to think of this is that some values will break the rules of ownership.

Take the following code:

```rs
// THIS DOES NOT COMPILE BECAUSE OF OWNERSHIP ISSUES
fn main() {
    let account = Account::new(1, String::from("Me"));
    other_account = account;

    println!("{:#?}", account);
}
```

But what happens if we have this?

```rs
// This works fine!
fn main() {
    let num = 5;
    let other_num = num;

    println!("{} {}", num, other_num);
}
```

The types that are copied instead of moved:

- All numbers
- bool
- char
- Arrays
- Tuples
- References

For example with arrays:

```rs
fn main() {
    let num_arr = [1, 2, 3];
    let other_num_arr = num_arr;

    println!("{:#?} {:#?}", other_num_arr, num_arr);
}
```