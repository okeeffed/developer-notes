---
menu: Bash
name: Autocompletion
---

# Autocompletion

## Resources

1. [Bash Autocompletion](https://iridakos.com/programming/2018/03/01/bash-programmable-completion-tutorial)

## Example

Write a bash file. This Example autocompletes words for `example` with one of "init install store search deploy bump push pull help sync info remove version autocomplete", and then repeats a similar ordeal for the second word if it is `store` or `show` to autocomplete to the list "test".

```sh
#!/bin/bash
_example_options()
{
   local cur prev

   cur=${COMP_WORDS[COMP_CWORD]}
   prev=${COMP_WORDS[COMP_CWORD-1]}

   case ${COMP_CWORD} in
       1)
           COMPREPLY=($(compgen -W "init install store search deploy bump push pull help sync info remove version autocomplete" -- ${cur}))
       ;;
       2)
           case ${prev} in
               store)
                   COMPREPLY=($(compgen -W "test" -- ${cur}))
               ;;
               show)
                   COMPREPLY=($(compgen -W "test" -- ${cur}))
               ;;
           esac
       ;;
       *)
           COMPREPLY=()
       ;;
   esac
}

complete -F _example_options example
```

Once completed, you can run `source path/to/file` and have the commands available for the session.
