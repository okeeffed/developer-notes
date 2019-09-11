---
menu: Git
name: Git Complete
---

# Git Complete

## Git Config

General setup for Git can be found at ~/.gitconfig.

## Basic Commands

| Command    | What it does                    |
| ---------- | ------------------------------- |
| git init   | Initialise a git project        |
| git clone  | Clone a git project             |
| git add    | Add a file to git               |
| git commit | Commit the current file list    |
| git pull   | Pull from a Git repository      |
| git push   | Push to a remote Git repository |
| git status | See current status for Git repo |

## Tracked Files

Files that have been added using `git add` can be tracked for staging and committing.

## Add Files Recursively

`git add .` will add all files from this directory recursively.

## Back Out Changes

If you decide that you do not want someGit changes, you can run `git reset HEAD <file>`. This will unstage a particular file.

If you do not want any of the changes to the file at all, you can run `git checkout -- <file>`. This will remove all the changes. If you run `git checkout .`, it will remove all Git changes.

## Renaming And Moving Files

```shell
# renaming the file
git mv <old-name> <new-name>
# git will rename the file and ls will confirm
```

If you `mv` the file, you will find that Git considers this as the old file being deleted while a new one being untracked. Adding the file using `git add -A` will have Git realise that we are just renaming the file.

If we want to rename the file back, we can just use `git mv <old-file> <new-file>`.

## Git History

`git help log` will show help for the commit history.

`git log` will show you the basic Git history from the most recent to the oldest.

`git log --oneline --graph --decorate` will show one line for each commit, plus a graph history and will decorate the log.

`git log --since="3 days ago"` will show the commits from the last three days.

`git log -- <file-name>` will show the log for a specific file name.

Adding `git log --follow -- <file-name>` will follow a file back through changes in the commit name.

`git show <commit-SHA>` will show the commit ID, author, diff + more.

## Git Alias

Can has the ability to add aliases for other commands.

We could add an alias by running `git config --global alias.hist = "log --all --graph --decorate --oneline"`.

Now we could run `git hist` as an alias for that lengthy command.

## Git Comparisons

- `git diff` will show you the diff between the last commit and current files.
- `git diff HEAD` will compare working directory and last commit.
- `git diff --staged HEAD` will compare staging with last commit.
- To limit comparisons to one file, you can `git diff -- <file-name>`.
- To compare to a particular command, you can run `git diff <commit-id-one> <commit-id-two>` to compare from HEAD to the specified commit.
- `git diff HEAD HEAD^` will compare HEAD and HEAD - 1.
- `git diff master origin/master` where origin/master is the master branch on remote.

## Branching and Merging

| Command                            | Definition                     |
| ---------------------------------- | ------------------------------ |
| git branch -a                      | List all branches              |
| git branch my-new-branch           | Creates new local branch       |
| git checkout my-new-branch         | Checkout local branch          |
| git branch -m my-new-branch branch | Rename my-new-branch to branch |
| git branch -d branch               | Delete branch                  |

Note that the first commit for each new branch has several labels associated with it. Those labels are just pointers and there won't be any new commits on the new branch until we make one.

### Fast Forward Merges

| Command                      | Definition                             |
| ---------------------------- | -------------------------------------- |
| git checkout -b title-change | Change into new branch title-change    |
| git merge title-change       | Merge title-change into current branch |

Fast-forward commits basically move the commits into the current branch as if there was no branch changes made at all.

To disable fast-forward merges:

| Command                  | Definition                                                                       |
| ------------------------ | -------------------------------------------------------------------------------- |
| git merge branch --no-ff | This will result with a single merge commit with the branch line being preserved |

### Automatic Merges

`git merge simple-changes -m "Merging changes from simple changes branch"`.

## Handling Conflicts

When you run merge and run into a conflict, you will be in an "in between" merging state.

To resolve a conflict, you will need to open the conflicted files and see the updates Git has made to show the `HEAD` vs the branch conflicts separated by `======`.

Once the conflicts are resolved, you need to now commit the file. Git will generally create a `.orig` file during resolutions that you can ignore or remove post-fix.

## Rebase

| Command                    | Definition                               |
| -------------------------- | ---------------------------------------- |
| git rebase <source-branch> | Rebase source branch into current branch |

## Stashing

| Command         | Definition                                         |
| --------------- | -------------------------------------------------- |
| git stash       | Stash current changes                              |
| git stash apply | Apply stash to working directory                   |
| git stash list  | List all stashes                                   |
| git stash drop  | Drop the last stash                                |
| git stash -u    | Include untracked files in stash (not Git ignored) |
| git stash pop   | Essentially runs git stash apply && git stash drop |

By default, `git stash` will only stash tracked files.
