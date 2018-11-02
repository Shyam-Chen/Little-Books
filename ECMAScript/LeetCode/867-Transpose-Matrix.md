# 867. Transpose Matrix

https://leetcode.com/problems/transpose-matrix/description/

**Example:**

1.

```
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
```

2.

```
Input: [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]
```

**Solution:**

```ts
const transpose = (arr: number[][]): number[][] => {
  const result = [];

  // two-dimensional array
  for (let i = 0; i < arr[0].length; i += 1) {
    result[i] = [];
  }

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr[0].length; j += 1) {
      result[j][i] = arr[i][j];
    }
  }

  return result;
};

transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);  // [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
transpose([[1, 2, 3], [4, 5, 6]]);  // [[1, 4], [2, 5], [3, 6]]
```
