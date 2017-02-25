# Lodash

### 練習來源
* https://github.com/lodash/lodash

### 實作執行
* https://github.com/Shyam-Chen/Web-Starter-Kit
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* Array (陣列)
  * [compact](#compact)
  * fill :sparkles:
  * findIndex :sparkles:
  * head :sparkles:
  * initial :sparkles:
  * last :sparkles:
  * tail :sparkles:
* Collection (集合)
  * filter :sparkles:
  * find :sparkles:
  * map :sparkles:
  * reduce :sparkles:
* Date (日期)
* Function (函式)
  * before :star:
  * bind :star:
  * curry :sparkles:
  * partial :sparkles:
  * rest :sparkles:
  * spread :sparkles:
* Lang (語言)
  * [clone](#clone)
* Math (數學)
* Number (數字)
* Object (物件)
* Seq (序列)
* String (字串)
* Util (公用)

:star: - 官方建置的核心<br>
:sparkles: - 與 ES2015+ 有關

[:vertical_traffic_light:] - 排除 ES2015-

***

## 陣列

### compact

創立一個刪除所有 falsey 值的陣列。

falsey: `false`、`null`、`0`、`''`、`undefined` 和 `NaN`

```js
import { compact } from 'lodash-es';

compact([0, true, 1, false, 2, 'foo', 3, '', 4, 'bar']);
// [true, 1, 2, "foo", 3, 4, "bar"]
```

## 函式

### before

### bind

## 物件

### assignIn

比較 ES2015 的 Object.assign()

## 序列

### chain

### value

## 語言

### clone

```js
import { clone } from 'lodash-es';

const foo = [{ a: 1 }, { b: 2 }];
const bar = clone(foo);

foo === bar;  // false
```

`_.concat`

`_.create`

`_.defaults`

`_.defer`

`_.delay`

`_.each`

`_.escape`

`_.every`

`_.filter`

`_.find`

`_.flatten`

`_.flattenDeep`

`_.forEach`

`_.has`

`_.head`

`_.identity`

`_.indexOf`

`_.isArguments`

`_.isArray`

`_.isBoolean`

`_.isDate`

`_.isEmpty`

`_.isEqual`

`_.isFinite`

`_.isFunction`

`_.isNaN`

`_.isNull`

`_.isNumber`

`_.isObject`

`_.isRegExp`

`_.isString`

`_.isUndefined`

`_.iteratee`

`_.keys`

`_.last`

`_.map`

`_.matches`

`_.max`

`_.min`

`_.mixin`

`_.negate`

`_.noConflict`

`_.noop`

`_.once`

`_.pick`

`_.reduce`

`_.result`

`_.size`

`_.slice`

`_.some`

`_.sortBy`

`_.tap`

`_.thru`

`_.toArray`

`_.uniqueId`

`_#value`

`_.values`
