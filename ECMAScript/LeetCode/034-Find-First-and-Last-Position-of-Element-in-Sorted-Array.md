# 34. Find First and Last Position of Element in Sorted Array

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

```ts
const searchRange = <T extends number>(nums: T[], target: T): T[] => {
  const res = [-1, -1];

  // left
  let [l, r] = [0, nums.length - 1];

  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (nums[mid] < target) l = mid + 1;
    else r = mid;
  }

  if (nums[l] !== target) return res;
  else res[0] = l;

  // right
  r = nums.length - 1;

  while (l < r) {
    const mid = Math.ceil((l + r) / 2);

    if (nums[mid] > target) r = mid - 1;
    else l = mid;
  }

  res[1] = r;

  return res;
};
```

**Solution 2:**

```ts
const searchRange = <T extends number>(nums: T[], target: T): T[] => (
  [nums.indexOf(target), nums.lastIndexOf(target)]
);
```
