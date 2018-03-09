# Regular Expressions (規則運算式)

### Reference Resources (參考資源)

* http://speakingjs.com/es5/index.html
* http://exploringjs.com/es6/index.html
* http://exploringjs.com/es2016-es2017/index.html
* https://github.com/getify/You-Dont-Know-JS

***

### Table of Contents (目錄)

* [Common (共用)](#common-共用)
* General (一般)
* Anchors (錨點)
* Meta Sequences (後設資料佇列)
* Quantifiers (量詞)
* Group Constructs (群組建構)
* Character Classes (字元符號)
* Flags/Modifiers (旗標/修改)
* Substitution (代換)

***

### Common (共用)

(1) 匹配 a、b 或 c 字元

```js
const regex = /[abc]+/g;

regex.test('a-bb-ccc');  // true
```

```bash
a-bb-ccc
^ ^^ ^^^
```

(2) 匹配除了 a、b 或 c 之外的任何字元

```js
const regex = /[^abc]+/g;

regex.test('Anything but abc.');  // true
```

```bash
Anything but abc.
^^^^^^^^^ ^^^   ^
```

(3)

```js
const regex = /[a-z]+/g;
```

```js
const regex = /[^a-z]+/g;
```

```js
const regex = /[a-zA-Z]+/g;
```

```js
const regex = /.+/;
```
