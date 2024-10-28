---
menu: Neovim
title: Kickstarter Neovim Keymaps
---

## Keymaps

| Keymap                      | Does          |
| --------------------------- | ------------- |
| Toggle bookmark             | `mm`          |
| Search bookmarks            | `<Leader>sb`  |
| Search Personal dotfiles    | `<Leader>sdf` |
| Previous buffer             | `<Ctrl>^`     |
| Copy remote link            | `<Leader>gY`  |
| Open in Git                 | `<Leader>gy`  |
| Autocomplete                | `Ctrl + y`    |
| Toggle through autocomplete | `Ctrl + n`    |
| Redo                        | `ctrl + r`    |
| Code actions                | `<leader>ca`  |

## Telescope

`ctrl + o` go back through the jump list
`ctrl + i` go forward through the jump lisf

## Definitions and type information

- `<leader>K` -- hover type information
- `<leader>gpt` -- show type definition in preview
- `<leader>gpd` -- preview definition in preview

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

### Navigation within neovim

Certainly! Navigating between panes (or splits) in Neovim is an essential skill for efficient editing. Here's a guide on how to move around different panes in Neovim:

1. Default keybindings:

   - `Ctrl + w` followed by `h`: Move to the left pane
   - `Ctrl + w` followed by `j`: Move to the pane below
   - `Ctrl + w` followed by `k`: Move to the pane above
   - `Ctrl + w` followed by `l`: Move to the right pane

2. Alternate method:

   - `Ctrl + w` followed by `Ctrl + w`: Cycle through all panes

3. Numeric movements:

   - `Ctrl + w` followed by a number, then `h`, `j`, `k`, or `l`: Move that many panes in the specified direction

4. Quick pane switching:

   - `Ctrl + w` followed by `w`: Switch to the next pane
   - `Ctrl + w` followed by `p`: Switch to the previous pane

5. Maximizing a pane:

   - `Ctrl + w` followed by `_`: Maximize height of current pane
   - `Ctrl + w` followed by `|`: Maximize width of current pane
   - `Ctrl + w` followed by `=`: Equalize size of all panes

6. Rotating and moving panes:

   - `Ctrl + w` followed by `r`: Rotate panes clockwise
   - `Ctrl + w` followed by `R`: Rotate panes counter-clockwise
   - `Ctrl + w` followed by `x`: Exchange current pane with the next one

7. Closing panes:
   - `:q`: Close the current pane
   - `:only` or `Ctrl + w` followed by `o`: Close all panes except the current one

Remember, in Neovim, you can customize these keybindings to suit your preferences by modifying your `init.vim` or `init.lua` configuration file.

If you want to make navigation even easier, you might consider using a plugin like 'vim-tmux-navigator', which allows for seamless navigation between Neovim splits and tmux panes using the same keybindings.

Would you like more information on any specific aspect of pane navigation or Neovim configuration?

### Inc rename

`<leader>rn`

### Global replace with spectre

`<leader>S`

### Neotree defaults

https://github.com/nvim-neo-tree/neo-tree.nvim

| Key     | Action                 | Notes                                                           |
| ------- | ---------------------- | --------------------------------------------------------------- |
| `<bs>`  | navigate_up            |                                                                 |
| `.`     | set_root               |                                                                 |
| `H`     | toggle_hidden          |                                                                 |
| `/`     | fuzzy_finder           |                                                                 |
| `D`     | fuzzy_finder_directory |                                                                 |
| `#`     | fuzzy_sorter           | fuzzy sorting using the fzy algorithm                           |
| `f`     | filter_on_submit       |                                                                 |
| `<c-x>` | clear_filter           |                                                                 |
| `[g`    | prev_git_modified      |                                                                 |
| `]g`    | next_git_modified      |                                                                 |
| `o`     | show_help              | nowait=false, config = { title = "Order by", prefix_key = "o" } |
| `oc`    | order_by_created       | nowait = false                                                  |
| `od`    | order_by_diagnostics   | nowait = false                                                  |
| `og`    | order_by_git_status    | nowait = false                                                  |
| `om`    | order_by_modified      | nowait = false                                                  |
| `on`    | order_by_name          | nowait = false                                                  |
| `os`    | order_by_size          | nowait = false                                                  |
| `ot`    | order_by_type          | nowait = false                                                  |

| Key      | Action           |
| -------- | ---------------- |
| `<down>` | move_cursor_down |
| `<C-n>`  | move_cursor_down |
| `<up>`   | move_cursor_up   |
| `<C-p>`  | move_cursor_up   |

### Extra

`f<char>` = find next character, stop on it
`t<char>` = find next character, stop before it
`ct"` = change from cursor to next `"` (leaving `"`)
`df|` = delete from cursor to next `|` (including `|`)

## Other resources

- https://github.com/leerob/vim-for-react-devs/blob/f6458adff2d0b03c6cfb0637ea2c74b2109c63ef/public/course.tsx#L739-L770
