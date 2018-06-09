# 371. Sum of Two Integers

Calculate the sum of two integers *a* and *b*, but you are **not allowed** to use the operator `+` and `-`.

**Example:**

```
Given a = 1 and b = 2, return 3.
```

**Solution 1:**

```js
// @flow

const getSum = <T: number>(a: T, b: T): T => {
  while (b !== 0) {
    const carry = a & b;

    a = a ^ b;
    b = carry << 1;
  }

  return a;
};
```

**Solution 2:**

```js
// @flow

const getSum = <T: number>(a: T, b: T): T => {
  if (b === 0) return a;
  const carry = a & b;
  return getSum(a ^ b, carry << 1);
};
```
