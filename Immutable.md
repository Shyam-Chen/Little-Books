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
* OrderedMap
* List (列表)
* Stack (堆疊)
* Set
* OrderedSet
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

## Collection

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

## List

```js
import { List } from 'immutable';

const list1 = List.of(1, 2, 3);
const list2 = List.of('A', 'B', 'C');
const list3 = List.of('一', '二', '三');

list1.push(4, 5, 6)  // List [ 1, 2, 3, 4, 5, 6 ]
  .concat(list2, list3)  // List [ 1, 2, 3, 4, 5, 6, "A", "B", "C", "一", "二", "三" ]
```

## Stack

## Set

## OrderedSet

## Record

## Range

## Repeat

## is

## fromJS

```js
import { fromJS } from 'immutable';

const thing = fromJS({
  foo1: 'A',
  foo2: { bar: 'BB', baz: 'CC' }
});
```
