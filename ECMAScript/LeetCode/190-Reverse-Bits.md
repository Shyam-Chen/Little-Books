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

const trampoline = (func) => {
  while (typeof func === 'function') {
    func = func();
  }

  return func;
};


const reverseBits = n =>
  () =>
    parseInt(n.toString(2).padStart(32, '0').split('').reverse().join(''), 2);
```
