---
menu: Neovim
title: Kickstarter Neovim Keymaps
---

## Keymaps

| Keymap | Does |
| --- | --- |
| Toggle bookmark | `mm` |
| Search bookmarks | `<Leader>sb` |
| Search Personal dotfiles | `<Leader>sdf` |
| Previous buffer | `<Ctrl>^` |
| Copy remote link | `<Leader>gY` |
| Open in Git | `<Leader>gy` | 
| Autocomplete | `Ctrl + y` |
| Toggle through autocomplete | `Ctrl + n` | 
| Redo | `ctrl + r` | 
| Code actions | `<leader>ca` |

## nvim.mini

yinq = Yank inside next quotes
yanq = Yank around next quotes

## DHH Cheat sheet

### Scopes

a = around
i = inside

### Objects

w = word
p = paragraph
s = sentence
q = quotes
b = brackets
i = indention level
W = white space

### Examples 

yiW = copy between last and next white space
ciq = change inside quotes

### Extra

f<char> = find next character, stop on it
t<char> = find next character, stop before it
ct" = change from cursor to next " (leaving ")
df| = delete from cursor to next | (including |)