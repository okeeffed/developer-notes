# 4 Lifetimes Explored

## 4.39 Basics of Lifetimes

Some common explanations of terms: 

- **Lifetimes**: Refers to how long an owner/reference exists.
- **Generic Lifetimes/Lifetime Annotations**: Extra syntax added in to clarify relationship between different lifetimes.

Some important rules for this to remember:

- (1) Every value is 'owned' by a single variable, argument, struct, vector etc.
- (8) When an owner goes out of scope, the value owned by it is **dropped** (cleaned up in memory).
- (9) These can't be references to a value when its owner goes out of scope.
- (10) References to a value can't outlive the value they refer to.

To demonstrate something, take the following code:

```rs
fn make_and_print_account() {
    let account = Account::new(1, String::from("me"));

    println!("{:#?}", account);
}

fn main() {
    make_and_print_account();
}
```

In the above, `account` will be dropped after we return from `make_and_print_account`.

What if we do this?


```rs
fn make_and_print_account() -> &Account {
    let account = Account::new(1, String::from("me"));

    println!("{:#?}", account);
		&account
}

fn main() {
    let acc_ref = make_and_print_account();

		println!("{}", acc_ref.balance);
}
```

If we save the file, we'll get another error "returns a reference to data owned by the current function".

## 4.40 Deciding on Argument Types

We've spoken about the rules defined previously about how dramatically they will change the way you write code.

This is because:

1. With every **function** we write, we need to think about whether we are **receiving value or refs**.
2. With every **data structure** we define, we need to think about whether we are **storing values or refs**.

Some general rules for defining argument types:

1. Do we need to store the argument somewhere? Favour taking ownership (receive a value).
2. Do we need to do a calculation with the value? Favour receiving a read-only ref.
3. Need to change the value in some way? Favour receiving a mutable ref.

These aren't hard and fast rules, but can act as guidelines.

Bank:

| Description                            | Method/associated func? | Name          | Args             | Returns |
| -------------------------------------- | ----------------------- | ------------- | ---------------- | ------- |
| Creates Bank instance                  | AF                      | new()         | -                | Bank    |
| Add an account to the list of accounts | Method                  | add_account() | account: Account | -       |

Account:

| Description              | Method/associated func? | Name  | Args                    | Returns |
| ------------------------ | ----------------------- | ----- | ----------------------- | ------- |
| Creates Account instance | AF                      | new() | id: u32, holder: string | Account |

To implement that `add_account`:

```rs
impl Bank {
    fn new() -> Self {
        Bank { accounts: vec![] }
    }

    // We add this!
    fn add_account(&mut self, account: Account) {
        self.accounts.push(account);
    }
}

fn main() {
    let mut bank = Bank::new();
    let account = Account::new(1, String::from("me"));
    bank.add_account(account);

    println!("{:#?}", bank);
}
```

## 4.42 Implementing Deposits and Withdrawals

Account:

| Description                                                | Method/associated func? | Name       | Args                    | Returns |
| ---------------------------------------------------------- | ----------------------- | ---------- | ----------------------- | ------- |
| Creates Account instance                                   | AF                      | new()      | id: u32, holder: string | Account |
| Add the given amount of money to the accounts 'balance'    | Method                  | deposit()  | amount: i32             | i32     |
| Remove the given amount of money to the accounts 'balance' | Method                  | withdraw() | amount: i32             | i32     |

We can adjust our `Account` implementation like so:

```rs
impl Account {
    fn new(id: u32, holder: String) -> Self {
        Account {
            id,
            holder,
            balance: 0,
        }
    }

    fn deposit(&mut self, amount: i32) -> i32 {
        self.balance += amount;
        self.balance
    }

    fn withdraw(&mut self, amount: i32) -> i32 {
        self.balance -= amount;
        self.balance
    }
}
```

Then to test it in `main.rs`:

```rs
fn main() {
    let mut bank = Bank::new();
    let mut account = Account::new(1, String::from("me"));

    account.deposit(100);
    account.withdraw(50);

    bank.add_account(account);

    println!("{:#?}", bank);
}
```

## 4.43 Account and Bank Implementation

| Description                                                | Method/associated func? | Name       | Args                    | Returns |
| ---------------------------------------------------------- | ----------------------- | ---------- | ----------------------- | ------- |
| Creates Account instance                                   | AF                      | new()      | id: u32, holder: string | Account |
| Add the given amount of money to the accounts 'balance'    | Method                  | deposit()  | amount: i32             | i32     |
| Remove the given amount of money to the accounts 'balance' | Method                  | withdraw() | amount: i32             | i32     |
| Create an account summary as a string and return it        | Method                  | summary()  | -                       | String  |

For the `summary`, we again update our implementation:

```rs
fn summary(&self) -> String {
     format!(
         "Account ID: {}\nAccount Holder: {}\nBalance: {}",
         self.id, self.holder, self.balance
     )
 }
```

We can test this in `main.rs` using the following:

```rs
fn main() {
    let mut bank = Bank::new();
    let mut account = Account::new(1, String::from("me"));

    account.deposit(100);
    account.withdraw(50);

    println!("{}", account.summary());

    bank.add_account(account); // note that account moves ownership here

    println!("{:#?}", bank);
    println!("{}", bank.accounts[0].summary());
}
```

As for the other Bank methods:


Bank:

| Description                                          | Method/associated func? | Name            | Args             | Returns     |
| ---------------------------------------------------- | ----------------------- | --------------- | ---------------- | ----------- |
| Creates Bank instance                                | AF                      | new()           | -                | Bank        |
| Add an account to the list of accounts               | Method                  | add_account()   | account: Account | -           |
| Calculate the total balance of all accounts          | Method                  | total_balance() | -                | i32         |
| Create a Vec containing the summaries of all account | Method                  | summary()       | -                | Vec<String> |

For the implementation:

```rs
#[derive(Debug)]
struct Bank {
    accounts: Vec<Account>,
}

impl Bank {
    fn new() -> Self {
        Bank { accounts: vec![] }
    }

    fn add_account(&mut self, account: Account) {
        self.accounts.push(account);
    }

    fn total_balance(&self) -> i32 {
        self.accounts.iter().map(|account| account.balance).sum()
    }

    fn summary(&self) -> Vec<String> {
        self.accounts
            .iter()
            .map(|account| account.summary())
            .collect::<Vec<String>>()
    }
}
```

Then we can see it in use:

```rs
fn main() {
    let mut bank = Bank::new();
    let mut account = Account::new(1, String::from("me"));

    account.deposit(100);
    account.withdraw(50);

    println!("{}", account.summary());

    bank.add_account(account);

    println!("{:#?}", bank);

    let summary = bank.summary();
    println!("{:#?}", summary);
    println!("{}", bank.total_balance());
}
```

The result:

```txt
Account ID: 1
Account Holder: me
Balance: 50
Bank {
    accounts: [
        Account {
            balance: 50,
            id: 1,
            holder: "me",
        },
    ],
}
[
    "Account ID: 1\nAccount Holder: me\nBalance: 50",
]
50
```

# 4.44 Project Wrapup

There are three of the rules that will be the pain of most of our errors:

- (4) You can't move a value while a ref to the value exists.
- (6) You can't mutate a value through the owner when any ref (mutable or immutable) to the value exists.
- (9) There can't be references to a value when its owner goes out of scope.