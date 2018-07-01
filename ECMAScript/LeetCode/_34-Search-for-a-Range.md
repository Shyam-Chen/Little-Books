# 34. Search for a Range

Given an array of integers `nums` sorted in ascending order, find the starting and ending position of a given `target` value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, `return [-1, -1]`.

**Example 1:**

```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

**Example 2:**

```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

**Solution 1:**

```js
// @flow

const searchRange = <T: number>(nums: T[], target: T): T[] => {
  let res = [-1, -1];

  // left

  // right

  return res;
};
```

**Solution 2:**

```js
// @flow

const searchRange = <T: number>(nums: T[], target: T): T[] =>
  [nums.indexOf(target), nums.lastIndexOf(target)];
```
