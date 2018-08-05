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
  const res = [];

  for (let i = 1; i <= s.length; i++) {
    res.push(s.split('')[s.length - i]);
  }

  return res.join('');
};
```

**Solution 3:**

```js
// @flow

const reverseString = <T: string>(s: T): T => {
  let res = '';

  for (let i = s.length - 1; i >= 0; i--) {
    res += s[i];
  }

  return res;
};
```

**Solution 4:**

```js
// @flow

const reverseString = <T: string>(s: T): T => {
  if (s === '') return '';
  return reverseString(s.substr(1)) + s.charAt(0);
};
```
