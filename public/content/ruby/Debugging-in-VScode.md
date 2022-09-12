# Debugging in VSCode

## Resources

1. [Screencast](https://www.youtube.com/watch?v=e_RKkgiimXE)

## Raw Notes

In `debug` with the `debug` gem, we can use the `debugger` command for debugging with Ruby 3.1.

If you restart the server, you will actually catch the `debugger`. This isn't super useful when using things like a Procfile.

With `debug`, you can use `outline <class>` to see all methods on a command.

We can use a tool `rdbg` that comes along with the new `debug` Gem. We can use the command `rdbg -c -- bin/rails s` that will launch whatever the command is but first pause and attach the debugger to it.

We can start adding in flags and commands to build this up a bit. `rdbg -n -c -- bin/rails s` won't run the initial pause.

We can also tell is what frontend to open by default `rdbg -n --open=vscode -c -- bin/rails s` .

By default, it won't work by default since there is no awareness of the debugger in VSCode.

We can amend this by installing the **VSCode rdbg Ruby Debugger** plugin written by the same guy who added in the bulk of the 3.1 debug work.

Once installed, we can run the command again and VSCode will hook in.

If we want to fold this into our application, we can wire this in as a **launch configuration**.

> Note: it's a bit finicky.

Make a new launch config in VSCode:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "rdbg",
      "name": "Attach with rdbg",
      "request": "attach"
    }
  ]
}
```

Now from the VSCode terminal, we can run `rdbg -n --open=vscode -c -- bin/rails s` and then we can run the **Attach with rdbg** configuration.

Once this is done, we can now remove the `debugger` statement and use the debugger breakpoint from selecting in VSCode. You may need to restart and reattach.

From this point, we can also use the stepper as we normally would.

Now we want to adjust things to just work from the `bin/dev` command on Rails 7. For that, we would just adjust the `Procfile.dev` so that the `web` command is prefixed with the `rdbg` command.
