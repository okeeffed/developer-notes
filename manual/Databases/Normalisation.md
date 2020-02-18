---
menu: Databases
name: Database Normalisation
---

# Database Normalisaton

## Resources

1. [Database Normalisation](https://en.wikipedia.org/wiki/Database_normalization)
2. [Candidate Key](https://en.wikipedia.org/wiki/Candidate_key)
3. [Compound Key](https://en.wikipedia.org/wiki/Compound_key)
4. [Candidate vs Composite Keys](https://pediaa.com/what-is-the-difference-between-candidate-key-and-composite-key/)
5. [Super Key](https://en.wikipedia.org/wiki/Superkey)

## What is it?

> Database normalization is the process of structuring a relational database in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity. It was first proposed by Edgar F. Codd as part of his relational model.

Normalization organises the columns (attributes) and tables (relations) of a database to ensure that their dependencies are properly enforced by database integrity constraints.

It is accomplished by applying some formal rules either by a process of synthesis (creating a new database design) or decomposition (improving an existing database design).

## Denormalisation Objectives

The objectives beyond the first normal form (1NF):

1. Free the collection of relations from undesirable insertion, update and deletion dependencies.
2. Reduce the need for restructuring the collection of relatons, as new types of data are introduced, and thus increase the life span of application programs.
3. Make the relational model more informative to users.
4. Make the collection of relations neutral to query statistics, where these statistics are liable to change as time goes by.

## Undesireable Side-Effects

The following may be undesirable from unnormalisaed databases:

1. Update anomaly: The same info can be expressed in multiple rows, therefore updates to the relation may result in logical inconsistencies.
2. Insertion anomaly: Circumstances where certain facts cannot be recorded at all. For example, each record in a "Faculty and Their Courses" relation might contain a Faculty ID, Faculty Name, Faculty Hire Date, and Course Code. Therefore, we can record the details of any faculty member who teaches at least one course, but we cannot record a newly hired faculty member who has not yet been assigned to teach any courses, except by setting the Course Code to null. This phenomenon is known as an insertion anomaly.
3. Deletion anomaly: Under particular circumstances, deletion of data representing certain facts necessitates deletion of data representing completely different facts. The "Faculty and Their Courses" relation described in the previous example suffers from this type of anomaly, for if a faculty member temporarily ceases to be assigned to any courses, we must delete the last of the records on which that faculty member appears, effectively also deleting the faculty member, unless we set the Course Code to null. This phenomenon is known as a deletion anomaly.

## Terms

### Candidate Key

(from Wikipedia)

In the relational model of databases, a candidate key of a relation is a minimal superkey for that relation; that is, a set of attributes such that:

1. the relation does not have two distinct tuples (i.e. rows or records in common database language) with the same values for these attributes (which means that the set of attributes is a superkey)
2. there is no proper subset of these attributes for which (1) holds (which means that the set is minimal).

Candidate keys are also variously referred to as primary keys, secondary keys or alternate keys.

The constituent attributes are called prime attributes. Conversely, an attribute that does not occur in ANY candidate key is called a non-prime attribute.

Since a relation contains no duplicate tuples, the set of all its attributes is a superkey if NULL values are not used. It follows that every relation will have at least one candidate key.

The candidate keys of a relation tell us all the possible ways we can identify its tuples. As such they are an important concept for the design of database schema.

### Candidate vs Composite

A candidate key is a super key with no redundant attributes, while a composite key is a key that consists of two or more attributes that uniquely identify any row in the table. Thus, this is the main difference between candidate key and composite key.

In brief, the programmer can use various keys to connect the tables of a database. Two types of keys are candidate key and composite key. The main difference between candidate key and composite key is that candidate key is a super key with no redundant attributes, while the composite key is a key with two or many attributes to identify the rows of the table.

### Compound Key

(from Wikipedia)

In database design, a composite key is a candidate key that consists of two or more attributes (table columns) that together uniquely identify an entity occurrence (table row). A compound key is a composite key for which each attribute that makes up the key is a simple (foreign) key in its own right.

### Super Key

(from Wikipedia)

A superkey or super-key is defined in the relational model of database organization as a set of attributes of a relation variable for which it holds that in all relations assigned to that variable, there are no two distinct tuples (rows) that have the same values for the attributes in this set.[1] It can be defined as a set of attributes of a relation schema upon which all attributes of the schema are functionally dependent.

The set of all attributes is a trivial superkey, because in relational algebra duplicate rows are not permitted: rows are a set (no duplicates), not a multiset (duplicates allowed). The superkey is also known as superset key.

If attribute set K is a superkey of relation R, then at all times it is the case that the projection of R over K has the same cardinality as R itself.

A superkey is a set of attributes within a table whose values can be used to uniquely identify a tuple. A candidate key is a minimal set of attributes necessary to identify a tuple; this is also called a minimal superkey. Given an employee schema consisting of the attributes employeeID, name, job, and departmentID, where no value in the employeeID attribute is ever repeated, we could use the employeeID in combination with any or all other attributes of this table to uniquely identify a tuple in the table. Examples of superkeys in this schema would be {employeeID, Name}, {employeeID, Name, job}, and {employeeID, Name, job, departmentID}. The last example is known as trivial superkey, because it uses all attributes of this table to identify the tuple.
