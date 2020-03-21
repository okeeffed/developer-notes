---
menu: Git
name: Git Indepth
---

# Git Indepth Course

These are notes taken from the Front End Masters course.

## Resources

1. [Course online](https://frontendmasters.com/courses/git-in-depth/)

## Git Foundations

### Data Storage

Git is analagous to a key value store. The key is essentially a hash while the value is the file data.

The key is a `SHA1` crypto hash function (40-digit hexidecimal number).

This value will be the same if the given input is the same.

Also known as a `content-addressable system` as the content can be used to generate the key.

### Git Blobs

Git stores compressed data in blobs, along with metadata in a header. This comprises of:

1. The identifier blob
2. The size of the content
3. `\0` delimiter
4. Content

### Asking Git for Hash-Object

Generating a SHA1 with the content:

`echo 'Hello, World!' | git hash-object --stdin`

You can then generate the SHA1 of the contentd with the metadata:

`echo 'blob 14\0Hello, World!' | openssl sha1`

This generated hash gives a blob, the size and the content and you'll notice that BOTH of the above end up with the same hash! Because of this, the likelyhood of a collision are infinitely small.

Note that all this data is stored in the `.git` directory.

To know where we write it, we can use the hash and tell git to write it:

`echo 'Hello, World!' | git hash-object -w --stdin`

If you tree through the `.git` folder afterwards (in a clean enough directory), you'll see that the blob stored in an `objects` folder.

The directory it is stored in begins with the first two chars of the hash and the file is the rest of the characters.

The blob itself is missing the `filenames` and the `directory structures`. Git stores this information in trees.

### Git Trees

A tree contains pointers (using SHA1) to blobs and other trees as a directed graph.

It also contains metadata:

1. Type of pointer
2. Filename or directory name
3. Mode (executable, symbolic link etc)

As we commit, if the blob or tree has not changed, we will just point to the same copy.

### Other optimisations

1. Git objects are compressed
2. As files change, their contents remain mostly similar
3. Git optimizes for this by compressing these files together into a `Packfile`
4. The Packfile stores the object, and "deltas", or the differences between one version of the file and the next
5. Packfiles are generated when you have too many object, during `garbage collection`, or during a push to remote

### Bonus: Navigating less tips

| Key    | Does                      |
| ------ | ------------------------- |
| f      | Navigate to next page     |
| b      | Navigate to previous page |
| /query | Query for "query"         |
| n      | Next match                |
| p      | Previous match            |
| q      | Quit                      |

## Git Areas and Stashing

### Working Area, Staging Area + Repository

These are the three areas where code lives. Note that the staging area is also sometimes called the "cache" or the "index".

### The Working Area

The files in your working area that are also not in the staging area not handled by git (untracked files).

### The Staging Area

Files part of the next commit. Helps Git know what will change between this commit and the next.

A "clean" staging area isn't empty! Consider the baseline staging area as being an exact copy of the last commit.

Git knows about modifications thanks to the SHA1 in the repository.

We can use plumbing command to look at the index `git ls-files -s`. This shows the mode, then the SHA, the number of copies in the repository of the SHA and then the file name.

Moving files in and out of the staging area:

| Command        | Does                             |
| -------------- | -------------------------------- |
| git add `file` | Add file to next commit          |
| git rm `file`  | Delete file in next commit       |
| git mv `file`  | Rename a file in the next commit |
| git add -p     | Stage by chunks                  |

When you `git rm` a file, you are actually just replacing what is in the staging with what it currently in the repository.

### The Repository

The files git know about - contains all your commits.

### Git Stash

One more place where git stores changes to the code.

It saves uncommitted work and is safe from destructive operations.

| Command                                     | Does                            |
| ------------------------------------------- | ------------------------------- |
| git stash                                   | Stash changes                   |
| git stash list                              | List changes                    |
| git stash show stash@{0}                    | Show contents                   |
| git stash apply                             | Apply last stash                |
| git stash apply stash@{0}                   | Apply specific stash            |
| git stash --include-untracked               | Include untracked changes       |
| git stash --all                             | Keep even ignored files!        |
| git stash save "WIP: whatever"              | Name stashes for easy reference |
| git stash branch `<opt branch name>`        | Start a branch from a stash     |
| git checkout `<stash name>` -- `<filename>` | Grab a single file from a stash |
| git stash pop                               | Remove the last stash and apply |
| git stash drop                              | Drop last stash                 |
| git stash drop@{n}                          | Drop nth stash                  |
| git stash clear                             | Remove all stashes              |
| git stash show stash@{n}                    | Show files in stash             |
| git stash -p                                | Selectively stash changes       |

The `0` is an index, above could instead be another reference.

## References, Commits, Branches

References are pointers to commits.

Three types of references:

1. Tags
2. Annotated Tags
3. HEAD

### What is a branch?

A branch is just a pointer to a particular commit.

### What is HEAD?

HEAD is how git knowns what branch you're currently on and what the next parent will be.

It is a pointer and normally points to the name of the current branch.

It can also point at a commit too (detached HEAD).

It moves when:

1. You make a commit in the currently active branch
2. When you checkout a new branch

You can `cat .git/HEAD` to see where the reference is currently at.

### Tags and Annotated Tags

- Lightweight tags are just a simple pointer to a commit
- When you create a tag with no arguments, it captures the value in HEAD `git tag my-first-tag`
- `git tag -a v1.0 -m "Version 1.0 of blog"`

| Command                        | Does                                     |
| ------------------------------ | ---------------------------------------- |
| git tag                        | List tags                                |
| git show-ref --tags            | List tags and commit they're pointing to |
| git tag --points-at `<commit>` | List all tags pointing to a commit       |
| git show `<tag-name>`          | Shows info on annotated tag `tag-name`   |

For what it is worth, lightweight tags are not really used.

### Detached Head & Dangling Commits

Sometimes you need to checkout a specific commit (or tag) instead of a branch.

Git moves that HEAD pointer to that commit. As soon as you checkout a different branch or commit, the value of HEAD will point to the new SHA.

The is no reference pointing to the commits you made in a detached state.

If you don't do anything with changes in a detatched state, consider them lost.

If you want to save your work from a detached HEAD state:

1. Create new branch `git branch <new-branch-name> <commit>`

### Dangling Commits

If you don't point a new branch at those commits from the detatched state, they will no longer be referenced in git (dangling commits).

Eventually, they will be garbage collected (either manually or automatically every few weeks).

If garbage collection hasn't run, you can use the `reflog` to collect them (explored later).

You can see a list of references for the heads by running `git show-ref --heads`.

`git cat-file -p <short-commit-hash>` will show us more information on that commit.

You can also use `git show-ref --tags` to check where the tags are pointing at.

## Merging and Rebasing

Under the hood, merge commits are just commits that have more than one parent. You can verify this on a merged commit by running `git cat-file -p <short-commit-hash>` and seeing more than one parent.

### What is a Fast-Forward?

Example: say we create a feature branch, then there are no more commits made to master when that feature branch is merged back in. This means we just fast-forward the master pointer to the current HEAD. This means it maintains all the commits that you had made on the feature branch.

If you don't want to fast forward and retain a history of the merge commit (even if there are no changes to base branch) you can use `git merge --no-ff` which will force a merge commit, even when one is not necessary.

### Merge Conflicts

When merging in is not compatible. Git will create a new file that will include those conflicts.

You can use a tool call `Git ReReRe (Reuse Recorded Resolution)` that saves how you resolved a conflict, and on the next conflict uses the same solution.

Useful for long lived feature branches (like refactor) or rebasing.

To enable `rerere`, we can use `git config rerere.enabled true` and add the `--global` flag to enable for all projects.

## History and Diffs

### Commits Messages

- Should encapsulate one logical idea per commit

### Git Log

| Command                                    | Does                                    |
| ------------------------------------------ | --------------------------------------- |
| git log --since="yesterday"                | Check log since yesterday               |
| git log --since="2 weeks ago"              | Check log since two weeks ago           |
| git log --name-status --follow -- `<file>` | Files that have been moved or renamed   |
| git log --grep="regex"                     | Search using Regex                      |
| git log --author="Nina"                    | Check files by Nina                     |
| git log --diff-filter=R --stat             | Check renamed diff. Can use A, D, M etc |

### Referencing Commits

`^` or `^n`:

- no args (^1): the first parent commit
- n: nth parent

`~` or `~n`:

- no args: first commit back, following 1st parent
- n: number of commits back, following only 1st parent

Given the following commit graphs:

```s
D E F
|/_/|
B   C
| /
A <= (HEAD)
```

How can we reference the above?

| Node | Reference              |
| ---- | ---------------------- |
| A    | A^0                    |
| B    | A^, A^1, A~1           |
| C    | A^2 (second parent)    |
| D    | A^^, A^1^1, A~2        |
| E    | A^^2, A~^2             |
| F    | A^2^ (some others too) |

### Git Show and Diffs

Git show commands:

| Command                      | Does                             |
| ---------------------------- | -------------------------------- |
| git show `<commit>`          | Show commit + contents           |
| git show `<commits>` --stat  | Show files changed in commit     |
| git show `<commit>`:`<file>` | Look at file from another commit |

Git diff commands

| Command                       | Does                                |
| ----------------------------- | ----------------------------------- |
| git diff                      | Changes in unstaged files           |
| git diff --staged             | Changes in staged files             |
| git diff A B                  | Shows changes on branch B not on A  |
| git diff A..B                 | Diff between files                  |
| git branch --merged master    | Which branches are merged w/ master |
| git branch --no-merged master | Which branches are not yet merged   |

## Fixing Mistakes

We use checkout, reset, revert and clean. This section will explains the differences.

You need to understand the 3 working areas well to understand this.

### Git Checkout

Restore working tree files or switch branches. When running, it:

1. Changes HEAD to point to the new branch
2. Copies the commit snapshot to the staging area
3. Working area is kept, and stages are kept unless there is a conflict

Use this command to also clean up a file from the working area (`git checkout -- file`). This just overwrites the working area with the staging area version from last commit.

`git checkout <commit> -- file` will overwrite what is in the staging area, and then the working area.

### Git Clean

Cleans up the working area by deleting untracked files.

| Command             | Does                      |
| ------------------- | ------------------------- |
| git clean --dry-run | See what will be deleting |
| git clean -f        | Do the deletion           |
| git clean -d        | Clean directories as well |

### Git Reset

Performs different actions based on arguments. By default, git performs a `git reset --mixed`.

Git reset for commits moves the HEAD pointer and optionally modifies files. For files, it does not move the HEAD pointer and modifies files.

You have `--soft`, `--mixed` and `--hard`. The cheat sheet:

1. Move HEAD and current branch
2. Reset the staging area
3. Reset the working area

- All soft does is move the HEAD pointer. (1)
- Mixed moves the HEAD and and then copies the repo file at the new commit to the staging area. (1) + (2)
- Hard does the above but also copies the file to the working area on top. It is destructive and cannot be undone. (1) + (2) + (3)
- Git reset file will not move the HEAD but will move the files from the repo to the staging area. (2 only)
- `git reset ORIG_HEAD` takes you back to original changes (Git keeps track of previous HEAD at ORIG_HEAD).

### Git Revert

The "safe" reset. It creates a new commit that introduces the opposite changes from the specified commit. The original commit stays in the repo. Use revert if you're undoing a commit that has already been shared. It does not change history.

## Rebase and Amend

### Amending a commit

A quick and easy shortcut to makes changes to the previous commit.

Example: say you made a commmit but forgot a file. You can stage that commit and amend it.

```shell
git add path/to/missing/file.txt
git commit --amend
```

Because commits cannot be amending, this creates a commit with a new SHA1.

### Rebasing

This allows us to apply our commits cleanly on top of a new parent.

First, it rewinds the head, then slowly applies the new commits.

The power of rebasing comes from replaying commits. Commits can be edited, removed, combined, re-ordered, inserted before they are "replayed" on top of the new HEAD.

`git rebase -i <name-of-commit-to-fix>^` is a nice shortcut to update and replay from the parent of an issue commit.

| Option | Does                                                            |
| ------ | --------------------------------------------------------------- |
| pick   | Keep this commit                                                |
| reword | Keep commit but change message                                  |
| edit   | Keep commit but stop to edit more than the message              |
| squash | Combine this commit with the previous one, stop to edit message |
| fixup  | Combine this with prev commit, and keep prev commit message     |
| exec   | Run the command on this line after picking the prev commit      |
