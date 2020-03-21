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

### The Repository

The files git know about - contains all your commits.
