---
menu: Moment.js
name: Handling Diff in Days
---

# Handling Diff in Days

This came up as there were strange differences of < 24 hours causing issues when you would only diff based on the differences of that size. The following enforces a guess of the user’s timezone, then to use that timezone against the start of each respective day to calculate the expected integer difference.

An example, 9pm today and 1pm tomorrow will still return `1`, while 9pm today and 11pm today will still return `0`.

```javascript
// This attempts to guess the local users timezone,
// changes the time to the start of the day based on that
// local timezone and finally calculates the difference that way.
// This ensures differences, for example less than 24 hours,
// but on different days are still calculated to have
// a difference of one day and for those on the same day
// to come up with zero etc.
return moment(date)
  .tz(moment.tz.guess())
  .startOf('day')
  .diff(
    moment()
      .tz(moment.tz.guess())
      .startOf('day'),
    'days',
  );
```
