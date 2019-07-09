---
menu: Elm
name: Advanced Elm
---

# Advanced Elm

## Opaque Types

```elm
module Email exposing (Email)

type Email =
  Email
```

### Validating Data example

```elm
module Validate exposing (Validator, Valid)

-- the useful purpose of Valid by exposing the variant
type Valid a =
  Valid a

fromValid : Valid a -> a

validate :
  Validator error subject
  -> subject
  -> Result (List error) (Valid subject)
```