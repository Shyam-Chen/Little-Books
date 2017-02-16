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
