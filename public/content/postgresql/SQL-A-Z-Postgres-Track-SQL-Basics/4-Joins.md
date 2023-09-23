## Mnemonics

1. **INNER JOIN**: _Vivid Story_: Imagine an exclusive club called "INNER Club." To become a member, you must have a special invitation card (common data) that matches the entry requirements. Only those with matching invitation cards are allowed into the club. _Mnemonic_: INNER JOIN keeps only the "INNER" or matching data between two tables.

2. **LEFT JOIN (LEFT OUTER JOIN)**: _Vivid Story_: Think of the LEFT JOIN as a restaurant where every customer (data in the left table) gets a meal, but some dishes might not have a matching side (data in the right table). The waiter ensures everyone on the left gets their meal, and if there's a matching side on the right, it's served as well. _Mnemonic_: In a LEFT JOIN, the left table is the priority, and all its data is included.

3. **RIGHT JOIN (RIGHT OUTER JOIN)**: _Vivid Story_: Imagine a music festival where bands (data in the left table) are invited to perform, but some stages (data in the right table) might be empty. The festival organisers make sure that every stage with a band gets a performance, and if there's no band, the stage remains empty. _Mnemonic_: In a RIGHT JOIN, the right table is the priority, and all its data is included.

4. **FULL JOIN (FULL OUTER JOIN)**: _Vivid Story_: Picture a grand masquerade ball where guests (data in both tables) wear masks. Some guests attend the ball alone, while others come with a partner. A FULL JOIN ensures that everyone who attends, with or without a partner, is included in the dance. _Mnemonic_: FULL JOIN combines data from both tables, ensuring no one is left out of the party.

> By default, JOIN = INNER JOIN.

## Example joins

```sql
SELECT student.name, room.room_number
FROM student
JOIN room
ON student.room_id = room.id;

SELECT room.id AS room_id, room.room_number, room.beds, room.floor, equipment.id AS equipment_id, equipment.name
FROM equipment
JOIN room
ON equipment.room_id = room.id;

SELECT *
FROM student
LEFT JOIN room
ON student.room_id = room.id;

SELECT *
FROM equipment
LEFT JOIN room
ON equipment.room_id = room.id;

-- Right join
SELECT *
FROM student
RIGHT JOIN room
ON student.room_id = room.id;
-- ...same as
SELECT *
FROM room
LEFT JOIN student
ON student.room_id = room.id;

SELECT *
FROM room
FULL JOIN student
ON student.room_id = room.id;

SELECT *
FROM room
RIGHT OUTER JOIN equipment
ON room.id = equipment.room_id
WHERE equipment.name = 'kettle';
```

## NATURAL JOIN

**NATURAL JOIN**:

_Vivid Story_: Imagine you're organizing a high school reunion where you want to connect former classmates based on a shared interest, such as their graduation year. You don't want to manually pair them up; you want the magic of friendship to do it naturally.

So, you place a "Friendship Tree" at the reunion, and each leaf on the tree represents a graduate's name. The leaves naturally align themselves based on the common interest of their graduation year. Those who graduated in the same year find their leaves close together, forming bonds of friendship.

You step back and watch as old friends reunite, and new friendships form naturally, guided by the commonality of their graduation years.

_Mnemonic_: NATURAL JOIN brings together data from two tables based on their common columns, allowing relationships to form naturally, just like friends with common interests finding each other at a reunion.

```sql
SELECT *
FROM student
NATURAL JOIN room;
```

In the example above, they would be join on the common column `id`, which actually doesn't much sense in this case.

## Aliases

```sql
SELECT e.id, e.name, r.room_number, r.beds
FROM room as r
JOIN equipment as e
ON r.id = e.room_id;

-- self join
SELECT *
FROM person AS child
JOIN person AS mother
  ON child.mother_id = mother.id;

-- join
SELECT *
FROM student as jp
JOIN student as other
ON jp.room_id = other.room_id
WHERE jp.name = 'Jack Pearson'
AND other.name != 'Jack Pearson';
```

## Multiple JOINs

```sql
SELECT *
FROM student AS s1
JOIN student AS s2
  ON s1.room_id = s2.room_id
JOIN room ON s2.room_id = room.id
WHERE s1.name = 'Jack Pearson'
  AND s1.name != s2.name;

SELECT a.name, b.name, room.room_number
FROM student as a
JOIN student as b
ON a.room_id = b.room_id
JOIN room
ON b.room_id = room.id
WHERE a.name < b.name AND room.beds = 2;
```
