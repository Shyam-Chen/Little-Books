# 258. Add Digits

Given a non-negative integer `num`, repeatedly add all its digits until the result has only one digit.

**Example:**

```
Input: 38
Output: 2
Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2.
             Since 2 has only one digit, return it.
```

**Follow up:**

Could you do it without any loop/recursion in all runtime?

**Solution 1:**

```ts
const addDigits = <T extends number>(num: T): T => {
  while (num >= 10) {
    let sum = 0;

    String(num)
      .split('')
      .forEach((value: string) => {
        sum += Number(value);
      });

    num = sum;
  }

  return num;
};
```

**Solution 2:**

```ts
const addDigits = <T extends number>(num: T): T => {
  if (num < 10) return num;

  let sum = 0;

  String(num)
    .split('')
    .forEach((value: string) => {
      sum += Number(value);
    });

  return addDigits(sum);
};
```

**Solution 3:**

```ts
const addDigits = <T extends number>(num: T): T => {
  if (num === 0) return 0;
  if (num % 9 === 0) return 9;
  return num % 9;
};
```

**Solution 4:**

```ts
const addDigits = <T extends number>(num: T): T => (
  num === 0 ? 0 : num - 9 * Math.floor((num - 1) / 9)
);
```

**Solution 5:**

```ts
const addDigits = <T extends number>(num: T): T => (
  1 + (num - 1) % 9
);
```
