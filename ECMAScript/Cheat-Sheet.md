# Cheat Sheet

***

### Table of Contents (目錄)

* [Object](#object)
* [Array](#array)

***

## Object

### deepClone

Creates a deep clone of an object.

```ts
const deepClone = <T>(obj: T): T => {
  let clone = Object.assign({}, obj);

  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );

  return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

const foo = { data: { value: 1 } };
const bar = deepClone(foo);

bar.data.value = 2;
foo.data.value;  // 1
```

## Array

### flatten

Flattens array a single level deep.

```js
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const flatten = arr =>
  arr.reduce((acc, cur) => acc.concat(cur), []);

const flatten = arr =>
  arr.reduce((acc, cur) => [...acc, ...cur], []);

flatten(data);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

// -

const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

data.flatten();

// -

import { flatten } from 'lodash';

const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

flatten(data);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### groupBy

Groups the elements of an array based on the given key.

```ts
const groupBy = (arr, key) => (
  arr.map(val => val[key]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {})
);
```

### range

Creates an array of numbers progressing from start up to.

```js
Array.from(Array(10).keys());
// 0 ~ 9

[...Array(10).keys()];
// 0 ~ 9

Array.from({ length: 10 }, (v, i) => i);
// 0 ~ 9

Array.from(new Array(10), (v, i) => i);
// 0 ~ 9

Array.from(new Array(10), (v, i) => i + 1);
// 1 ~ 10

const range = (start, end) =>
  Array.from(new Array(end - start + 1), (v, i) => i + start);

range(0, 9);
// 0 ~ 9

Array(10).fill(0).map((x, y) => x + y);
// 0 ~ 9

Array(10).fill(1).map((x, y) => x + y);
// 1 ~ 10

const range = (start, end, step = 1) =>
  Array((end - start) / step + 1).fill(0).map((v, i) => start + i * step);

range(1, 9, 2);  // 1, 3, 5, 7, 9
range(2, 10, 2);  // 2, 4, 6, 8, 10

// -

import { range } from 'lodash';

range(1, 10, 2);  // 1, 3, 5, 7, 9

// -

import { range } from 'rxjs';

range(1, 10).subscribe(value => value);
// 1 ~ 10

// -

import { range } from 'lodash';
import { from } from 'rxjs';

from(range(1, 10, 2)).subscribe(value => value);
// 1, 3, 5, 7, 9
```

### swap

Swap the places of two elements.

```ts
const swap = <T>(arr: T[], i: number, j: number): T[] => {
  const temp = arr[i];

  arr[i] = arr[j];
  arr[j] = temp;

  return arr;
};

swap<number>([1, 2, 3, 4, 5], 2, 4);
// [1, 2, 5, 4, 3]
```

### unique

Returns all unique values of an array.

```ts
const unique = arr => [...new Set(arr)];
```

### uniqueBy

Returns all unique values of an array based on the given key.

```ts
const uniqueBy = (arr, key: string) => (
  arr.reduce((acc, v) => {
    if (!acc.some(x => v[key] === x[key] )) acc.push(v);
    return acc;
  }, [])
);
```
