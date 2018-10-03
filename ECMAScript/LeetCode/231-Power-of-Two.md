# 231. Power of Two

Given an integer, write a function to determine if it is a power of two.

**Example 1:**

```
Input: 1
Output: true
Explanation: 2^0 = 1
```

**Example 2:**

```
Input: 16
Output: true
Explanation: 2^4 = 16
```

**Example 3:**

```
Input: 218
Output: false
```

**Solution 1:**

```ts
const isPowerOfTwo = (n: number): boolean => {
  for (let i = 0; i < n; i++) {
    if (n === Math.pow(2, i)) return true;
  }

  return false;
};
```

**Solution 2:**

```ts
const isPowerOfTwo = (n: number): boolean => {
  if (n === 1) return true;

  while (n > 2) {
    n /= 2;
  }

  return n % 2 === 0;
};
```

**Solution 3:**

```ts
const isPowerOfTwo = (n: number): boolean => (
  (n & (n - 1)) === 0
);
```

**Solution 4:**

```ts
const isPowerOfTwo = (n: number): boolean => (
  Number.isInteger(Math.log2(n))
);
```
