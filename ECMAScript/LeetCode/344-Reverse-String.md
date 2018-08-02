# 344. Reverse String

Write a function that takes a string as input and returns the string reversed.

**Example:**

```
Given s = "hello", return "olleh".
```

**Solution 1:**

```js
// @flow

const reverseString = <T: string>(s: T): T =>
  s.split('').reverse().join('');
```

**Solution 2:**

```js
// @flow

const reverseString = <T: string>(s: T): T => {
  if (s === '') return '';
  return reverseString(s.substr(1)) + s.charAt(0);
};
```
