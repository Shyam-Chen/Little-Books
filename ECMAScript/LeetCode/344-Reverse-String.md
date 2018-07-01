# 344. Reverse String

Write a function that takes a string as input and returns the string reversed.

**Example:**

```
Given s = "hello", return "olleh".
```

**Solution:**

```js
// @flow

const reverseString = <T: string>(s: T): T =>
  s.split('').reverse().join('');
```
