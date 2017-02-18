# Immutable

### 練習來源
* https://github.com/facebook/immutable-js

### 實作執行
* https://github.com/Shyam-Chen/Web-Starter-Kit
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* Iterable (可迭代)
* Seq (序列)
* Collection (集合)
* Map
* OrderedMap (有順序的 Map)
* List (列表)
* Stack (堆疊)
* Set
* OrderedSet (有順序的 Set)
* Record (紀錄)
* Range (範圍)
* Repeat (反覆)
* is
* fromJS

***

## Iterable

```js
import { Iterable } from 'immutable';
```

## Seq

```js
import { Seq } from 'immutable';
```

## Collection

```js
import { Collection } from 'immutable';
```

## Map

```js
import { Map } from 'immutable';

const foo = Map({ bar: 'A', baz: 'B' });

foo.bar;  // undefined
foo.get('bar'); // "A"

foo.set('bar', 'C');
foo.get('bar');  // "A"

foo = foo.set('bar', 'C');
foo.get('bar');  // "C"
```

## OrderedMap

```js
import { OrderedMap } from 'immutable';
```

## List

```js
import { List } from 'immutable';

const list1 = List.of(1, 2, 3);
const list2 = List.of('A', 'B', 'C');
const list3 = List.of('一', '二', '三');

list1.push(4, 5, 6)  // List [ 1, 2, 3, 4, 5, 6 ]
  .concat(list2, list3);  // List [ 1, 2, 3, 4, 5, 6, "A", "B", "C", "一", "二", "三" ]
```

## Stack

```js
import { Stack } from 'immutable';
```

## Set

```js
import { Seq } from 'immutable';
```

## OrderedSet

```js
import { OrderedSet } from 'immutable';
```

## Record

```js
import { Record } from 'immutable';

const Foo = Record({ a: 1, b: 2, c: 3 });
const bar = new Foo({ b: 4 });

bar.get('a');  // 1
bar.get('b');  // 4

const baz = bar.remove('b');
baz.get('b');  // 2
```

## Range

```ts
Range(start?: number, end?: number, step?: number): Seq.Indexed<number>
```

```js
import { Range } from 'immutable';

Range(10);  // Range [ 10...Infinity ]
Range(10, 15);  // Range [ 10, 11, 12, 13, 14, 15 ]
Range(10, 15, 2);  // Range [ 10, 12, 14 ]
```

## Repeat

```ts
Repeat<T>(value: T, times?: number): Seq.Indexed<T>
```

```js
import { Repeat } from 'immutable';

Repeat(1);  // Repeat [ 1...Infinity ]
Repeat(1, 5);  // Repeat [ 1, 1, 1, 1, 1 ]
```

## is

```js
import { Map, is } from 'immutable';

const map1 = Map({ foo: 1, bar: 2 });
const map2 = Map({ foo: 1, bar: 2 });

map1 !== map2;  // true
is(map1, map2);  // true
```

## fromJS

```js
import { fromJS } from 'immutable';

const nestedMaps = fromJS({
  foo1: 1,
  foo2: {
    bar1: 2,
    bar2: {
      baz: 3
    }
  }
});

nestedMaps.getIn(['foo2', 'bar2', 'baz']);  // 3

nestedMaps.setIn(['foo2', 'bar2', 'baz'], 11)
  .getIn(['foo2', 'bar2', 'baz']);  // 11
```
