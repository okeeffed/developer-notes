---
name: Elm Collections
menu: Elm
---

# Elm Collections

Collections come as lists, records and tuples. One way they differ is that collections in Elm are always immutable.

`Lists` represent arrays, `Records` represent objects and `Tuples` represent collections of varying size (whose elements share a consistent type). Tuples are record-like but can only be accessed by position.

```elm
-- Destructuring a tuple
multiply3d (x,y,z) = x * y * z
multiply3d (1,2,3)
```