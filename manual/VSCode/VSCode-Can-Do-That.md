---
menu: VSCode
name: VSCode Can Do That
---

# VSCode Can Do That?

## Resources

1. [Code Navigation](https://code.visualstudio.com/Docs/editor/editingevolved)
2. [Remote Containers](https://www.freecodecamp.org/news/put-your-dev-env-in-github/)

## Multiple Cursors

Use `Command + Shift + l` to enable multiple cursors over the highlights.

Use `Command + d` to do one at a time. If you want to skip an instance, hit `Command + k, d` to skip.

```javascript
let app;

app;
```

## Regex Find

You can use `option + command + r` to turn on regex search. Combine this with multiple cursors for a good time. With find, you need to press `option + enter` to get multiple cursors. Test below with the `jpeg|png` search:

```javascript
let image = url('images/background.png');
let jpg = url('images/thing.jpg');
```

## Navigating VSCode

`Command + p,p` will take you to the last file.

In that same browser, if we use `@` we can search and find a symbol browser.

Using `@:` will segment things into groups.

Using `#` will search for a certain set of symbols across files. Note that at the moment it doesn't exclude the files from `settings.json`.

`Command + 0` will focus on the sidebar, `Command + 1` will focus on the editor.

`fn + option + F12` will help you peek a definition and see all the instances where it is used.

## Refactors

`Shift + Control + R` will look for refactors available.

Highlighting code and then pressing `Command + .` will give you options to refactor.

## Debugging

Check the docs for how `launch.json` works for Chrome debugging.

`fn + F8` will toggle through our lint/type check errors.

`fn + F5` will open the debugger and begin.

VSCode also has log points. Instead of using `console.log()` in the code, you can add a log point to the side. You could then log a variable `item` by popping `{item}`. Log points also don't throw errors.

### Nodemon

To use `nodemon`, you can set configurate for `nodemon` package.

## Docker

If we search `command + shift + p` and search `Add Docker configuration files to app` we can then go through the process of selecting what kind of files we want to add.

If we run `Docker: build` we can then containerize this app using VSCode. It will also ask us for a tag!

We can then use the Docker sidebar to run. If we right-click on a running container, we can click we logs. We can also attach a shell from here.

### Deploying to a Container Registry

We can `right-click` and push an image to the repository (once you are connect).

### Docker Compose

In the `docker-compose.yml` file, we can edit for multiple containers to interact with each other.

There is also a `docker-compose.debug.yml` file that we can use for debug. We can actually use the debugger to help with this as well (based on our configuration).

## Remote Development

Within the command pallette, we can run `Remote-ssh connect to host`.

This will setup VSCode for the remote host and then we can treat a newly opened VSCode window as if we are on remote.

Everything that we run here (restore etc) can happen on the remote server! We can run a debugger etc from within this SSH session.

We can even forward a port to the local!

## Developing Remote Containers

Requires `remote containers` extension.

We can use `Remote Containers: Add configuration files` from the command palette to set up to use containers.

We can use `Remote Container: Reopen folder in new container` to open up and set a new container.

There is a deeper dive through a [blog post](https://www.freecodecamp.org/news/put-your-dev-env-in-github/).

## SQL in VSCode

Using an extensions called `MySQL`, we can add a host with data etc.

We can then, from inside VSCode, run queries against the database.

## Git in VSCode

Git can super charge you git flow. It makes it easier to diff and stage/unstage changes.

### Reviewing and Merging PRs

The `GitHub Pull Requests` extensions enables you to review, comment, approve and checkout PR branches right from VSCode!

## Moving Code & Code Folding

| Command                    | Action                    |
| -------------------------- | ------------------------- |
| `option + up/down`         | Move code up/down a line  |
| `shift + option + up/down` | Duplicate line up/down    |
| `option + cmd + [`         | Fold                      |
| `option + cmd + ]`         | Unfold                    |
| `cmd + k, 2`               | Fold second level regions |

You can add `//#region Class Methods` (as an example) and `//#endregion Class Methods` to create you own custom folder points.

If your cursor is inside of a region and you fold all of a level etc, it is smart enough to know to keep that region open.
