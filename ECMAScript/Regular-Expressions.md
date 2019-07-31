# Regular Expressions (規則運算式)

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

## Common (共用)

### Matches either an a, b or c character. (匹配 a、b 或 c 字元)

```js
const regex = /[abc]+/g;

regex.test('a-bb-ccc');  // true
```

```bash
a-bb-ccc
^ ^^ ^^^
```

### Matches any character except for an a, b or c. (匹配除了 a、b 或 c 以外的任何字元)

```js
const regex = /[^abc]+/g;

regex.test('Anything but abc.');  // true
```

```bash
Anything but abc.
^^^^^^^^^ ^^^   ^
```

### Matches any characters between a and z, including a and z. (匹配 a 到 z 之間的任何字元，包括 a 和 z)

```js
const regex = /[a-z]+/g;

regex.test('ECMAScript');  // true
```

```bash
ECMAScript
     ^^^^^
```

### Matches any characters except those in the range a-z. (匹配除了 a-z 中的字元以外的任何字元)

```js
const regex = /[^a-z]+/g;

regex.test('ECMAScript');  // true
```

```bash
ECMAScript
^^^^^
```

### Matches any characters between a-z or A-Z. (匹配 a-z 或 A-Z 之間的任何字元)

```js
const regex = /[a-zA-Z]+/g;

regex.test('ECMAScript HTML5 Node.js Docker');  // true
```

```bash
ECMAScript HTML5 Node.js Docker
^^^^^^^^^^ ^^^^  ^^^^ ^^ ^^^^^^
```

### Matches any character other than newline. (匹配除了換行字元以外的任何字元)

```js
const regex = /.+/g;

regex.test('ECMAScript HTML5 Node.js Docker');
```

```bash
ECMAScript HTML5 Node.js Docker
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```
