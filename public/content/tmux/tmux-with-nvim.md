---
menu: Tmux
title: Tmux with Neovim
---

This follows a lot of what happens in [this course](https://www.youtube.com/watch?v=niuOc02Rvrc&list=PLsz00TDipIfdrJDjpULKY7mQlIFi4HjdR).

## Getting started

Running `tmux` has tmux running.

My default tmux config:

```
# Based off https://hamvocke.com/blog/a-guide-to-customizing-your-tmux-conf/

# remap prefix from 'C-b' to 'C-a'
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# split panes using | and -
bind | split-window -h
bind - split-window -v
unbind '"'
unbind %

# reload config file (change file location to your the tmux.conf you want to use)
bind r source-file ~/.tmux.conf

# switch panes using vim motions
bind -n h select-pane -L
bind -n l select-pane -R
bind -n k select-pane -U
bind -n j select-pane -D

# Enable mouse control (clickable windows, panes, resizable panes)
set -g mouse on

# don't rename windows automatically
set-option -g allow-rename off

# DESIGN TWEAKS

# don't do anything when a 'bell' rings
set -g visual-activity off
set -g visual-bell off
set -g visual-silence off
setw -g monitor-activity off
set -g bell-action none

# clock mode
setw -g clock-mode-colour colour1

# copy mode
setw -g mode-style 'fg=colour1 bg=colour18 bold'

# pane borders
set -g pane-border-style 'fg=colour1'
set -g pane-active-border-style 'fg=colour3'

# statusbar
set -g status-position bottom
set -g status-justify left
set -g status-style 'fg=colour1'
set -g status-left ''
set -g status-right '%Y-%m-%d %H:%M '
set -g status-right-length 50
set -g status-left-length 10

setw -g window-status-current-style 'fg=colour0 bg=colour1 bold'
setw -g window-status-current-format ' #I #W #F '

setw -g window-status-style 'fg=colour1 dim'
setw -g window-status-format ' #I #[fg=colour7]#W #[fg=colour1]#F '

setw -g window-status-bell-style 'fg=colour2 bg=colour1 bold'

# messages
set -g message-style 'fg=colour2 bg=colour0 bold'
```

## Using TPM (Tmux plugin manager)

You can install with the following:

```s
$ git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```


I've turned of Tmux sensible for now.

If you run `<C-a>I` it will install the plugins.