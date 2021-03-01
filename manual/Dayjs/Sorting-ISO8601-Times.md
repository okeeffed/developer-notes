---
menu: Dayjs
name: Sorting ISO8601 Times
---

# Sorting ISO8601 Times

```js
import dayjs from 'dayjs'

new Date()
const date = dayjs().format() 

const newDate = dayjs(date)
newDate.format()

let dates = []

for (var i = 0; i < 10; i++) {
  dates.push(newDate.add(7 * i, 'day').format())
}


const sortEarliestToLatest = n => n.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1))

const sortLatestToEarliest = n => n.sort((a, b) => (dayjs(a).isBefore(dayjs(b)) ? 1 : -1))

console.log(sortLatestToEarliest(dates))
```