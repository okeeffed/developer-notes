# 22: Understanding The Internals Of PostgreSQL

## Where does Postgres Store Data?

We can use the `SHOW` keyword to get config information about the database.

```sql
SHOW data_directory;
```

From the folder that is shown, we can see our data is stored inside of a folder called `base`.

```sql
SELECT oid, datname
FROM pg_database;
```

This will show us idea numbers and database names in a table where the `oid` matches the folders from that previously found `base` folder.

All the files inside the correlating folder for our database is where our data is stored.

```sql
SELECT * FROM pg_class;
```

The above statement will give back `oid` relating to a `relfile` which gives us an idea of where information is stored. They each represent individual objects in our database.

If we find the `oid` that matches our `users` table, then we know that file contains all of our `users` table.

## Heaps, Blocks and Tuples

| Word                | Definition                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| Heap (or heap file) | File that contains all the data (rows) of our table                                                           |
| Tuple (or item)     | Individual row from the table                                                                                 |
| Block (or page)     | The heap file is divided into many different 'blocks' or 'pages'. Each page/block stores some number of rows. |

- Heap data structure is very different to a heap file.
- Each block/page is 8kB large.

## Block data layout

Each block has information about the block, then after is the pointers for each data stored within the block eg. item 1, 2, etc. After is some free space, then at the end is the data for the tuple items.

## Heap file layout

There is a [database page layout](https://www.postgresql.org/docs/8.0/storage-page-layout.html) that tells more about this.

This lesson uses the hex editor extension in VSCode to demonstrate the files.

An overview of the page layout:

| Item           | Description                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| PageHeaderData | 20 bytes long. Contains general information about the page, including free space pointers.                  |
| ItemIdData     | Array of (offset,length) pairs pointing to the actual items. 4 bytes per item.                              |
| Free space     | The unallocated space. New item pointers are allocated from the start of this area, new items from the end. |
| Items          | The actual items themselves.                                                                                |
| Special space  | Index access method specific data. Different methods store different data. Empty in ordinary tables.        |

Within the `PageHeaderData` is the following layout:

| Field               | Type          | Length  | Description                                                                |
| ------------------- | ------------- | ------- | -------------------------------------------------------------------------- |
| pd_lsn              | XLogRecPtr    | 8 bytes | LSN: next byte after last byte of xlog record for last change to this page |
| pd_tli              | TimeLineID    | 4 bytes | TLI of last change                                                         |
| pd_lower            | LocationIndex | 2 bytes | Offset to start of free space                                              |
| pd_upper            | LocationIndex | 2 bytes | Offset to end of free space                                                |
| pd_special          | LocationIndex | 2 bytes | Offset to start of special space                                           |
| pd_pagesize_version | uint16        | 2 bytes | Page size and layout version number information                            |

The first important thing to note is that the `pd_lower` and `pd_upper` fields are the offset to the start and end of the free space.
