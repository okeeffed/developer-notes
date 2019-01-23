---
name: Intro
menu: Lift 
---
# Lift

Lift is a helper that builds and scaffolds entire projects by looking at a yml and following flexible rules from the `_lift` to build out files.

## Templates

Lift templates are story in the `_lift` folder.

## Commands

Running `lift help` will show the following:

```
Scaffold entire systems using a lift.yml file.

    Commands:
        - up: Parse up.yml and scaffold all
        - init: Generate up.yml file and _lift folder
        - help: Show help
        - [target]: lift [target] to scaffold specific key
```

## Other

It is best to use Lift in association with something like `Prettier` so that the formatting output from Lift then works out later.
