# Cheat Sheet

### flatten

```js
const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const flatten = arr =>
  arr.reduce((acc, cur) => acc.concat(cur), []);

flatten(data);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

// -

import { flatten } from 'lodash';

const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

flatten(data);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### range

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

// ----------

import { range } from 'lodash';

range(1, 10, 2);  // 1, 3, 5, 7, 9

// ----------

import { range } from 'rxjs';

range(1, 10).subscribe(value => value);
// 1 ~ 10

// ----------

import { range } from 'lodash';
import { from } from 'rxjs';

from(range(1, 10, 2)).subscribe(value => value);
// 1, 3, 5, 7, 9
```
