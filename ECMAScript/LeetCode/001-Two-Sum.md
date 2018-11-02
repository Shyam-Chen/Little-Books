# 1. Two Sum

https://leetcode.com/problems/two-sum/description/

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have *exactly* one solution, and you may not use the same element twice.

**Example:**

```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

**Solution:**

1. Array

```ts
const twoSum = <T extends number>(nums: T[], target: T): number[] => {
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < nums.length; j += 1) {
      if (i === j) continue;
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
};

twoSum([2, 7, 11, 15], 9);  // [0, 1]
```

2. Hash Table

```ts
const twoSum = <T extends number>(nums: T[], target: T): number[] => {
  const map = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    if (map.has(nums[i])) {
      return [map.get(nums[i]), i];
    }

    map.set(target - nums[i], i);
  }
};
```
