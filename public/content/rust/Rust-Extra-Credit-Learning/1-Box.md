# Learning about "Box"

## 1 Preventing stack overflow

In the following code, we will get a stack overflow if not for the usage of box.

```rs
// 1. A first use case if for you have incredibly large structs that don'tt fit on
// the stack. You can allocate them on the heap instead.

// 💣💥 Example type without the box
// struct LargeStruct {
//     data: [u8; 1_000_000_000], // 1000MB
// }

// ✅ Type with the box
struct LargeStruct {
    data: Box<[u8]>,
}

fn main() {
    // 💣💥 If we set 1000MB of data directly on the stack, we could get the following:
    //
    // thread 'main' has overflowed its stack
    // fatal runtime error: stack overflow
    // [1]    78061 abort      cargo run main.rs
    // let large_data = LargeStruct {
    //     data: [0; 1_000_000_000],
    // };

    // ✅ We can allocate the data on the heap instead
    let large_data = LargeStruct {
        data: vec![0; 1_000_000_000].into_boxed_slice(),
    };

    // ✅ "large_data takes up 16 bytes" when using Box<[u8]>
    println!(
        "large_data takes up {} bytes",
        std::mem::size_of_val(&large_data.data)
    );
}
```

## 2 Recursive structures

For structures like trees or linked lists, `Box` is crucial. It allows you to have a known size for recursive types.

```rs
// 2. Recursive data structures
#[derive(Debug)]
enum List<T> {
    Element(T, Box<List<T>>),
    Nil,
}

impl List<i32> {
    fn basic_list() -> Self {
        List::Element(1, Box::new(List::Element(2, Box::new(List::Nil))))
    }
}

fn main() {
    // ✅ We can create a recursive data structure
    let list = List::basic_list();

    println!("{:#?}", list);
}
```

An example not using box:

```rs
// 💣💥 This will not compile
// enum ListWithoutBox<T> {
//     Cons(T, ListWithoutBox<T>),
//     Nil,
// }

// ✅ This will compile
enum ListWithBox<T> {
    Cons(T, Box<ListWithBox<T>>),
    Nil,
}

fn main() {
    // 💣💥Uncomment to see the compiler error:
    // let list_without_box = ListWithoutBox::Cons(1, ListWithoutBox::Cons(2, ListWithoutBox::Nil));

    // ✅
    let list_with_box = ListWithBox::Cons(
        1,
        Box::new(ListWithBox::Cons(2, Box::new(ListWithBox::Nil))),
    );
}
```

If you use to example not using box and attempt to compile, you'll get the following:

```txt
error[E0391]: cycle detected when computing when `ListWithoutBox` needs drop
 --> src/main.rs:2:1
  |
2 | enum ListWithoutBox<T> {
  | ^^^^^^^^^^^^^^^^^^^^^^
  |
  = note: ...which immediately requires computing when `ListWithoutBox` needs drop again
  = note: cycle used when computing whether `ListWithoutBox<i32>` needs drop
  = note: see https://rustc-dev-guide.rust-lang.org/overview.html#queries and https://rustc-dev-guide.rust-lang.org/query.html for more information
```

The explanation is as follows:

```txt
A type dependency cycle has been encountered.

Erroneous code example:

trait FirstTrait : SecondTrait {

}

trait SecondTrait : FirstTrait {

}

The previous example contains a circular dependency between two traits: FirstTrait depends on SecondTrait
 which itself depends on FirstTrait.

See https://rustc-dev-guide.rust-lang.org/overview.html#queries and https://rustc-dev-guide.rust-
lang.org/query.html for more information.
```

Certainly! I'll provide code examples for some of the key use cases I mentioned. This will help illustrate when and why you might use `Box` in Rust.



```rust
// 1. Storing large data on the heap
struct LargeStruct {
    data: [u8; 1000000], // 1 MB of data
}

fn use_large_struct() {
    let large_data = Box::new(LargeStruct { data: [0; 1000000] });
    // `large_data` is now on the heap, preventing stack overflow
}

// 2. Recursive data structures
enum List<T> {
    Cons(T, Box<List<T>>),
    Nil,
}

fn create_list() {
    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
    // This creates a linked list: 1 -> 2 -> Nil
}

// 3. Trait objects
trait Animal {
    fn make_sound(&self);
}

struct Dog;
impl Animal for Dog {
    fn make_sound(&self) { println!("Woof!"); }
}

struct Cat;
impl Animal for Cat {
    fn make_sound(&self) { println!("Meow!"); }
}

fn animal_sounds(animals: Vec<Box<dyn Animal>>) {
    for animal in animals {
        animal.make_sound();
    }
}

fn use_trait_objects() {
    let animals: Vec<Box<dyn Animal>> = vec![
        Box::new(Dog),
        Box::new(Cat),
    ];
    animal_sounds(animals);
}

// 4. Returning values of unknown size
fn create_animal(is_dog: bool) -> Box<dyn Animal> {
    if is_dog {
        Box::new(Dog)
    } else {
        Box::new(Cat)
    }
}

// 5. Breaking cycles in reference counting
use std::rc::{Rc, Weak};
use std::cell::RefCell;

struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn create_tree() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);
}

// 6. Transferring ownership of heap data
fn process_data(data: Box<[u8]>) {
    // Process the data...
}

fn transfer_ownership() {
    let data = vec![1, 2, 3, 4, 5].into_boxed_slice();
    process_data(data); // Ownership of the heap data is transferred without copying
}

```


## 3 Trait objects

This example shows how to use `Box<dyn Trait>` to create a collection of different types that implement the same trait.

```rs
// 3. Trait objects
trait Animal {
    fn make_sound(&self);
}

struct Dog;
impl Animal for Dog {
    fn make_sound(&self) {
        println!("Woof!");
    }
}

struct Cat;
impl Animal for Cat {
    fn make_sound(&self) {
        println!("Meow!");
    }
}

fn animal_sounds(animals: Vec<Box<dyn Animal>>) {
    for animal in animals {
        animal.make_sound();
    }
}

fn main() {
    let animals: Vec<Box<dyn Animal>> = vec![Box::new(Dog), Box::new(Cat)];
    animal_sounds(animals);
}
```

Another example:

```rs
trait Pizza {
    fn eat(&self);
}

struct Margherita;
impl Pizza for Margherita {
    fn eat(&self) {
        println!("You are eating Margherita");
    }
}

struct Pepperoni;
impl Pizza for Pepperoni {
    fn eat(&self) {
        println!("You are eating Pepperoni");
    }
}

struct Order {
    list: Vec<Box<dyn Pizza>>,
}

impl Order {
    fn eat(&self) {
        for pizza in self.list.iter() {
            pizza.eat();
        }
    }
}

fn main() {
    let order = Order {
        list: vec![Box::new(Margherita), Box::new(Pepperoni)],
    };

    order.eat();
}
```

If we tried using something else like generics, we'll end up with a mismatched types error:

```rs
struct Order<T: Pizza> {
    list: Vec<Box<T>>,
}

impl<T: Pizza> Order<T> {
    fn eat(&self) {
        for pizza in self.list.iter() {
            pizza.eat();
        }
    }
}

fn main() {
    let order = Order {
				// 💣💥 mismatched types
				// expected `Margherita`, found `Pepperoni`
        list: vec![Box::new(Margherita), Box::new(Pepperoni)],
    };

    order.eat();
}
```

## 4. Returning values of unknown size

We can combine our lessons from (1) and (3) for this.

Let's extend our pizza example for one to have a huge amount of toppings, and then wrap them so that the size returned to the stack is deterministic:

```rs
trait Pizza {
    fn eat(&self);
}

struct Margherita {
    name: String,
    toppings: Box<[u8]>,
}
impl Margherita {
    fn pizza_with_lots_of_toppings(name: String) -> Self {
        Margherita {
            name,
            toppings: vec![0; 1_000_000_000].into_boxed_slice(),
        }
    }
}
impl Pizza for Margherita {
    fn eat(&self) {
        println!("You are eating Margherita");
    }
}

struct Pepperoni {
    name: String,
}
impl Pepperoni {
    fn new(name: String) -> Self {
        Pepperoni { name }
    }
}
impl Pizza for Pepperoni {
    fn eat(&self) {
        println!("You are eating Pepperoni");
    }
}

struct Order {
    list: Vec<Box<dyn Pizza>>,
}

impl Order {
    fn eat(&self) {
        for pizza in self.list.iter() {
            pizza.eat();
        }
    }
}

fn create_pizza(is_marg: bool) -> Box<dyn Pizza> {
    if is_marg {
        Box::new(Margherita::pizza_with_lots_of_toppings(String::from(
            "Margo",
        )))
    } else {
        Box::new(Pepperoni::new(String::from("Pepe")))
    }
}

fn main() {
    let order = Order {
        list: vec![create_pizza(true), create_pizza(false)],
    };

    order.eat();
}
```

## 5. Breaking cycles in reference counting

This more complex example shows how to create a tree structure using `Rc` and `Weak` references, which `Box` enables.

```rs
use std::cell::RefCell;
use std::rc::{Rc, Weak};

// Node struct represents a single node in our tree
#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,  // Weak reference to parent to avoid reference cycles
    children: RefCell<Vec<Rc<Node>>>,  // List of strong references to child nodes
}

impl Node {
    // Creates a new Node wrapped in an Rc
    fn new(value: i32) -> Rc<Self> {
        Rc::new(Self {
            value,
            parent: RefCell::new(Weak::new()),  // Initially, no parent
            children: RefCell::new(vec![]),     // Initially, no children
        })
    }

    // Adds a child to this node
    fn add_child(self: &Rc<Self>, child: &Rc<Node>) {
        // Add the child to this node's children
        self.children.borrow_mut().push(Rc::clone(child));
        // Set this node as the child's parent
        *child.parent.borrow_mut() = Rc::downgrade(self);
    }
}

// Creates a simple tree structure
fn create_tree() -> Rc<Node> {
    let root = Node::new(1);
    let child1 = Node::new(2);
    let child2 = Node::new(3);
    let grandchild = Node::new(4);

    root.add_child(&child1);
    root.add_child(&child2);
    child1.add_child(&grandchild);

    root  // Return the root node
}

fn main() {
    let tree = create_tree();
    println!("Tree root: {:?}", tree);
    println!("Root's children: {:?}", tree.children.borrow());
    println!("First child's children: {:?}", tree.children.borrow()[0].children.borrow());
}
```

Running this gives:

```rs
Tree root: Node { value: 1, parent: RefCell { value: (Weak) }, children: RefCell { value: [Node { value: 2, parent: RefCell { value: (Weak) }, children: RefCell { value: [Node { value: 4, parent: RefCell { value: (Weak) }, children: RefCell { value: [] } }] } }, Node { value: 3, parent: RefCell { value: (Weak) }, children: RefCell { value: [] } }] } }
Root's children: [Node { value: 2, parent: RefCell { value: (Weak) }, children: RefCell { value: [Node { value: 4, parent: RefCell { value: (Weak) }, children: RefCell { value: [] } }] } }, Node { value: 3, parent: RefCell { value: (Weak) }, children: RefCell { value: [] } }]
First child's children: [Node { value: 4, parent: RefCell { value: (Weak) }, children: RefCell { value: [] } }]
```

Certainly! I'd be happy to explain the code in detail. Let's break it down section by section:



```rust
use std::cell::RefCell;
use std::rc::{Rc, Weak};

// Node struct represents a single node in our tree
#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,  // Weak reference to parent to avoid reference cycles
    children: RefCell<Vec<Rc<Node>>>,  // List of strong references to child nodes
}

impl Node {
    // Creates a new Node wrapped in an Rc
    fn new(value: i32) -> Rc<Self> {
        Rc::new(Self {
            value,
            parent: RefCell::new(Weak::new()),  // Initially, no parent
            children: RefCell::new(vec![]),     // Initially, no children
        })
    }

    // Adds a child to this node
    fn add_child(self: &Rc<Self>, child: &Rc<Node>) {
        // Add the child to this node's children
        self.children.borrow_mut().push(Rc::clone(child));
        // Set this node as the child's parent
        *child.parent.borrow_mut() = Rc::downgrade(self);
    }
}

// Creates a simple tree structure
fn create_tree() -> Rc<Node> {
    let root = Node::new(1);
    let child1 = Node::new(2);
    let child2 = Node::new(3);
    let grandchild = Node::new(4);

    root.add_child(&child1);
    root.add_child(&child2);
    child1.add_child(&grandchild);

    root  // Return the root node
}

fn main() {
    let tree = create_tree();
    println!("Tree root: {:?}", tree);
    println!("Root's children: {:?}", tree.children.borrow());
    println!("First child's children: {:?}", tree.children.borrow()[0].children.borrow());
}

```

Now, let's go through each part in detail:

1. Imports:
   ```rust
   use std::cell::RefCell;
   use std::rc::{Rc, Weak};
   ```
   - `RefCell`: Provides interior mutability, allowing us to change contents even when we only have shared references.
   - `Rc`: Reference Counted smart pointer, allowing multiple ownership.
   - `Weak`: A version of `Rc` that doesn't increase the strong reference count, used to prevent reference cycles.

2. Node Structure:
   ```rust
   struct Node {
       value: i32,
       parent: RefCell<Weak<Node>>,
       children: RefCell<Vec<Rc<Node>>>,
   }
   ```
   - `value`: The data stored in the node.
   - `parent`: A weak reference to the parent node, wrapped in a `RefCell` for interior mutability.
   - `children`: A vector of strong references to child nodes, also wrapped in a `RefCell`.

3. Node Implementation:
   ```rust
   impl Node {
       fn new(value: i32) -> Rc<Self> { ... }
       fn add_child(self: &Rc<Self>, child: &Rc<Node>) { ... }
   }
   ```
   - `new`: Creates a new `Node` and wraps it in an `Rc`.
   - `add_child`: Adds a child node to the current node and sets the current node as the child's parent.

4. Tree Creation:
   ```rust
   fn create_tree() -> Rc<Node> { ... }
   ```
   This function creates a simple tree structure and returns the root node.

5. Main Function:
   ```rust
   fn main() { ... }
   ```
   Creates the tree and prints out some information about its structure.

Key Concepts:

- `Rc<Node>` is used for shared ownership. Multiple parts of the tree can own a reference to the same node.
- `Weak<Node>` is used for the parent reference to prevent reference cycles. If we used `Rc` for both parent and child references, we'd have a cycle that would prevent memory from ever being freed.
- `RefCell` is used for interior mutability. It allows us to modify the contents of `parent` and `children` even when we only have shared references to a node.
- The `add_child` method takes `self: &Rc<Self>` instead of `&self`. This is because we need access to the `Rc` itself to create a weak reference to it.

This structure allows us to create a tree where nodes can reference their parents and children, while avoiding memory leaks that could be caused by reference cycles. It's a common pattern in Rust for creating complex, self-referential data structures.


### Analogy for Rc<Node> vs Weak<Node>: The Company Directory

Imagine a company directory where each employee entry represents a `Node` in our tree structure.

1. `Rc<Node>` (Strong Reference):
   This is like a formal employment contract. As long as even one contract exists, the employee must remain in the company directory.

2. `Weak<Node>` (Weak Reference):
   This is like a casual mention in someone's contact list. It points to an employee, but if all formal contracts are terminated, the employee can be removed from the directory even if they're still in someone's contacts.

Now, let's consider two scenarios:

Scenario 1: Using `Rc<Node>` for both manager and subordinate references (problematic)

```rust
struct BadEmployee {
    manager: RefCell<Option<Rc<BadEmployee>>>,
    subordinates: RefCell<Vec<Rc<BadEmployee>>>,
}
```

In this scenario:

- Each subordinate has a formal contract linking to their manager.
- Each manager has formal contracts linking to all their contacts.

What happens:

1. Alice is hired as a manager, and Bob is hired as her subordinate.
2. The company issues formal contracts: Alice's contract lists Bob as a subordinate, and Bob's contract lists Alice as his manager.
3. Even if the company wants to lay off both Alice and Bob, they can't because their contracts reference each other.
4. The company is stuck paying Alice and Bob indefinitely, unable to remove them from the payroll (memory leak).

Scenario 2: Using `Weak<Node>` for manager references (our correct implementation)

```rust
struct Employee {
    manager: RefCell<Weak<Employee>>,
    subordinates: RefCell<Vec<Rc<Employee>>>,
}
```

In this scenario:

- Each subordinate has a casual mention of their manager in their contact list.
- Each manager has formal contracts linking to all their subordinates.

What happens:

1. Alice is hired as a manager, and Bob is hired as her subordinate.
2. The company issues a formal contract to Alice listing Bob as her subordinate. Bob just has Alice's contact info as his manager.
3. If the company decides to lay off Alice, they can terminate her contract. Bob still has Alice in his contacts as his manager, but this doesn't prevent Alice from being removed from the company directory.
4. When Alice is removed, her contract listing Bob as a subordinate is also terminated, allowing Bob to be laid off if needed.

Let's see how this might look in code:

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Employee {
    name: String,
    manager: RefCell<Weak<Employee>>,
    subordinates: RefCell<Vec<Rc<Employee>>>,
}

impl Employee {
    fn new(name: String) -> Rc<Self> {
        Rc::new(Employee {
            name,
            manager: RefCell::new(Weak::new()),
            subordinates: RefCell::new(vec![]),
        })
    }

    fn set_manager(self: &Rc<Self>, manager: &Rc<Employee>) {
        *self.manager.borrow_mut() = Rc::downgrade(manager);
        manager.subordinates.borrow_mut().push(Rc::clone(self));
    }
}

fn main() {
    let alice = Employee::new("Alice".to_string());
    let bob = Employee::new("Bob".to_string());
    
    bob.set_manager(&alice);
    
    println!("Alice's subordinates count: {}", alice.subordinates.borrow().len());
    println!("Bob's manager: {:?}", bob.manager.borrow().upgrade().map(|m| m.name.clone()));
    
    drop(alice);  // Alice leaves the company
    
    println!("Bob's manager after Alice leaves: {:?}", bob.manager.borrow().upgrade().map(|m| m.name.clone()));
    
    // Bob can now be removed from the company as well
    drop(bob);
}

// When you run it:
// 
// Alice's subordinates count: 1
// Bob's manager: Some("Alice")
// Bob's manager after Alice leaves: None
```

In this example:

1. We create two employees: Alice (manager) and Bob (subordinate).
2. We set Alice as Bob's manager using `set_manager`.
3. We can see that Alice has one subordinate (Bob) and Bob's manager is Alice.
4. When we `drop(alice)`, simulating her leaving the company, Bob's reference to his manager becomes invalid (returns `None` when upgraded).
5. Finally, we can `drop(bob)` as well, removing him from the company.

This demonstrates how using `Weak` for the manager reference allows us to avoid circular references. Employees can be "laid off" (deallocated) even if they still exist in other employees' contact lists (weak references). This prevents our company directory (memory) from indefinitely growing with employees who can never be removed.

### Extra credit: reference counted (RC)

Reference counted enables us to take control of multiple ownerships and memory deallocation.

```rs
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Person {
    name: String,
    age: RefCell<u32>,
}

fn main() {
    let person = Rc::new(Person {
        name: String::from("Alice"),
        age: RefCell::new(30),
    });

    let person_clone = Rc::clone(&person);

    println!("Original: {:?}", person);
    println!("Clone: {:?}", person_clone);
    println!("Are they the same object? {}", Rc::ptr_eq(&person, &person_clone));
    println!("Reference count: {}", Rc::strong_count(&person));

    // Modifying through one Rc affects all Rcs
    *person.age.borrow_mut() = 31;

    println!("After modification:");
    println!("Original: {:?}", person);
    println!("Clone: {:?}", person_clone);
}
```

This logs:

```txt
Original: Person { name: "Alice", age: RefCell { value: 30 } }
Clone: Person { name: "Alice", age: RefCell { value: 30 } }
Are they the same object? true
Reference count: 2
After modification:
Original: Person { name: "Alice", age: RefCell { value: 31 } }
Clone: Person { name: "Alice", age: RefCell { value: 31 } }
```

Rc stands for "Reference Counted" and it's a smart pointer provided by Rust's standard library. Let's break this down:

1. What is Rc?
   - Rc is a single-threaded reference-counting pointer.
   - It keeps track of the number of references to a value to determine whether the value is still in use.
   - When the last Rc pointing to a value is dropped, the value is dropped as well.

2. Key Characteristics:
   - Allows multiple ownership of the same data.
   - Only for use in single-threaded scenarios (use Arc for multi-threaded).
   - Provides shared access to its contents, which are immutable by default.

3. When to Use Rc:
   a. Multiple Ownership:
      - When you need multiple parts of your code to own and share the same data.
      - Example: In a graph or tree structure where nodes might be referenced by multiple other nodes.

   b. Cyclic Data Structures:
      - When creating self-referential structures like graphs (often used with Weak to prevent memory leaks).

   c. Caching or Memoization:
      - When you want to keep data around as long as there are references to it.

   d. Plugin or Extension Systems:
      - Where multiple parts of a system might need to share access to resources.

4. Advantages:
   - Allows sharing of data without copying.
   - Automatically cleans up data when it's no longer needed.
   - Enables complex data structures that aren't easily expressed with Rust's usual ownership model.

5. Considerations:
   - There's a small runtime cost for reference counting.
   - Not thread-safe (use Arc for that).
   - Can lead to reference cycles if not careful (use Weak to prevent this).

6. Common Patterns:
   - `Rc<RefCell<T>>`: For shared mutable state.
   - `Rc` with `Weak`: For parent-child relationships where children shouldn't keep parents alive.

In the provided code example:

- We demonstrate creating and cloning Rc pointers.
- We show how to check the reference count.
- We illustrate that all Rc clones point to the same data.
- We provide an example of using Rc in a linked list-like structure.

Remember, while Rc is powerful, it's not always the best choice. In many cases, Rust's standard ownership model with borrowing is sufficient and more efficient. Use Rc when you genuinely need shared ownership and can't express your problem with unique ownership or borrowing.

## 6. Transferring ownership

This demonstrates how `Box` can be used to transfer ownership of heap data efficiently.

```rs
fn process_data(data: Box<[u8]>) {
    // Process the data...
}

fn transfer_ownership() {
    let data = vec![1, 2, 3, 4, 5].into_boxed_slice();
    process_data(data); // Ownership of the heap data is transferred without copying
}
```