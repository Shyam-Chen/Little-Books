# 905. Sort Array By Parity

https://leetcode.com/problems/sort-array-by-parity/description/

**Example:**

```
Input: [3,1,2,4]
Output: [2,4,3,1]
The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
```

**Solution:**

1.

```ts
const sortArrayByParity = (arr: number[]): number[] => {
  const result = [];

  arr.forEach((item) => {
    if (item % 2 === 0) result.push(item);
  });

  arr.forEach((item) => {
    if (item % 2 === 1) result.push(item);
  });

  return result;
};

sortArrayByParity([3, 1, 2, 4]);  // [2, 4, 3, 1]
```

2.

```ts
const sortArrayByParity = (arr: number[]): number[] => (
  arr.sort((x, y) => x % 2 - y % 2)
);

sortArrayByParity([3, 1, 2, 4]);  // [2, 4, 3, 1]
```
