---
name: Vim
menu: Vim 
---
# Vim

<!-- TOC -->autoauto- [Vim](#vim)auto    - [Vim Packages and creating files](#vim-packages-and-creating-files)auto    - [Vim modes, navigation and commands](#vim-modes-navigation-and-commands)auto    - [Executing external commands](#executing-external-commands)auto    - [Files and buffers](#files-and-buffers)autoauto<!-- /TOC -->

## Vim Packages and creating files

Installing Vim `yum install vim` of `apt-get install vim`.

`vim -g` can actually run the GUI - who cares though. There are a number of different GUI wrappers. `gvim` is the most popular.

So we have `vi`, `vim` - the improved vi and `gvim`.

## Vim modes, navigation and commands

1.  Command/Normal mode
2.  Insert/Ex mode
3.  Mark mode

| Key                    | What it does                                               |
| ---------------------- | ---------------------------------------------------------- |
| x                      | Delete character                                           |
| :q!                    | Quit and omit changes                                      |
| :wq                    | Write and quit                                             |
| :                      | "File mode"                                                |
| h                      | Left                                                       |
| j                      | Down                                                       |
| k                      | Up                                                         |
| l                      | Right                                                      |
| w                      | Word forward                                               |
| e                      | Word forward last char                                     |
| b                      | Back word                                                  |
| 0                      | Go to start                                                |
| $                      | Go to end                                                  |
| v                      | Highlight words                                            |
| %                      | Go to matching bracket/quotes etc                          |
| Number, command        | Move by certain amount                                     |
| r                      | Replace                                                    |
| u                      | Undo                                                       |
| .                      | Redo                                                       |
| d (twice)              | Delete the line                                            |
| d, w                   | Delete the word                                            |
| Number, i              | Insert a number of times                                   |
| Number, r              | Replace a number of chars                                  |
| Number, x              | Delete certain number of keys                              |
| y, move to new spot, p | Yank the link, then paste                                  |
| v, then y              | Mark mode and yank                                         |
| >>                     | Indent forward                                             |
| <<                     | Indent back                                                |
| `/<word>`              | Find a word                                                |
| n/N                    | Forward search, N upwards                                  |
| `?<word>`              | Search bottom up (N/n swap)                                |
| %s/ex/EX/g             | Global ex regex                                            |
| #s/ex/EX/gc            | Confirm value swapping                                     |
| j + j                  | Go back to normal mode                                     |
| g + g                  | Go to top of document                                      |
| G                      | Go to end of file                                          |
| (                      | Jump to previous sentence                                  |
| )                      | Jump to next sentence                                      |
| }                      | Jump to next paragraph                                     |
| {                      | Jump to previous paragraph                                 |
| a                      | Insert text before cursor                                  |
| A                      | Insert test at end of line                                 |
| o                      | Begin new line below the cursor                            |
| O                      | Begin new line above the cursor                            |
| :r `[filename]`        | Insert the file `[filename]` below the cursor              |
| :r ![command]          | Execute `[command]` and insert its output below the cursor |

## Delete Text

| Key | What it does                  |
| --- | ----------------------------- |
| x   | Delete at cursor              |
| dw  | Delete word                   |
| d0  | Delete to beginning of a line |
| d$  | Delete to end of a line       |
| d)  | Delete to end of sentence     |
| dgg | Delete to beginning of file   |
| dG  | Delete to end of file         |
| dd  | Delete line                   |
| 3dd | Delete three lines            |

## Copy/Paste

| Key | What it does                          |
| --- | ------------------------------------- |
| yy  | Copy current line into storage buffer |
| p   | Paste storage buffer after line       |
| P   | Paste storage buffer before line      |


## Executing external commands

These are a few of the more advanced things.

`: ! ls -al ~` - it will run the command, and then we get the option to run a command.

`:r ! cat /root/.bash_profile` for example will read in the profile.

## Files and buffers

`:saveas <name|path>`
