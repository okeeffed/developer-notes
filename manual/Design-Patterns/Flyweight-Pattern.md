---
menu: Design Patterns
name: Flyweight Pattern
---

# Flyweight Pattern

The Flyweight Pattern falls under the structural design patterns from the Gang Of Four.

The `flyweight` is an object that minimizes memory usage by sharing as much data as possible with similar objects - a way to use objects in large numbers when a simple representation would use an unacceptable amount of memory.

## Usage

Use when:

- many same objects are used and storage cost is high.
- you can externalise a majority of each object's state.
- few shared objects can replace many unshared ones.
- identity of an object not relevant.
