---
menu: Vim
name: Intermediate Vim
---

# Intermediate Vim

## More Useful Commands

Note: `{n}` refers to a numeral.

| Command                    | Action                                                                          |
| -------------------------- | ------------------------------------------------------------------------------- |
| {n}o                       | Insert content n times on next n lines                                          |
| q:                         | Open history window for `:` commands                                            |
| q/                         | Open history for searches                                                       |
| ctrl,v                     | Visual mode from first line                                                     |
| ctrl,v {n}gg shift,i # esc | Add # to start of each line from here to n                                      |
| ctrl,o,o                   | Open last edited file                                                           |
| ddp                        | Swap current line with next one                                                 |
| :/user-friendly/m\$        | Move the next line containing the string "user-friendly" to the end of the file |
| g;                         | Bring back cursor to previous position                                          |
| ctrl-o                     | Retrace movements in file backwards                                             |
| ctrl-i                     | Retrace movements in file forwards                                              |
| '.                         | Jump back to last modification line                                             |
| backtick,.                 | Jump to exact spot in last modification line                                    |

## Mapping

Reference for Neovim can be [found here](https://github.com/neovim/neovim/blob/master/runtime/doc/map.txt)
