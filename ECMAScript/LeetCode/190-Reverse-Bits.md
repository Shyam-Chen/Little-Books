# 190. Reverse Bits

Reverse bits of a given 32 bits unsigned integer.

**Example:**

```
Input: 43261596
Output: 964176192
Explanation: 43261596 represented in binary as 00000010100101000001111010011100,
             return 964176192 represented in binary as 00111001011110000010100101000000.
```

**Follow up:**

If this function is called many times, how would you optimize it?

**Solution 1:**

```js
// @flow

const reverseBits = <T: number>(n: T): T =>
  parseInt(n.toString(2).padStart(32, '0').split('').reverse().join(''), 2);
```

**Solution 2:**

```js
// @flow

const reverseBits = <T: number>(n: T): T =>
  x = n;

  x = ((x & 0x0000FFFF) << 16) | ((x & 0xFFFF0000) >>> 16);
  x = ((x & 0x55555555) << 1) | ((x & 0xAAAAAAAA) >>> 1);
  x = ((x & 0x33333333) << 2) | ((x & 0xCCCCCCCC) >>> 2);
  x = ((x & 0x0F0F0F0F) << 4) | ((x & 0xF0F0F0F0) >>> 4);
  x = ((x & 0x00FF00FF) << 8) | ((x & 0xFF00FF00) >>> 8);

  return x;
};
```
