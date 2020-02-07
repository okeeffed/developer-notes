---
menu: Tooling
name: Awesome Tooling CLI
---

# Awesome Tooling CLI

## Resources

1. [Reflex](https://github.com/cespare/reflex)

## Reflex

> Reflex is a small tool to watch a directory and rerun a command when certain files change. It's great for automatically running compile/lint/test tasks and for reloading your application when the code changes.

```shell
# Rerun make whenever a .c file changes
reflex -r '\.c$' make

# Compile and rerun hello.jar whenever a kotlin file changes
reflex -r '\.kt$' kotlinc hello.kt -include-runtime -d hello.jar && java -jar hello.jar
```
