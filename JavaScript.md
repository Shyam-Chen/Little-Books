# JavaScript

### 參考資源

* http://speakingjs.com/es5/index.html
* http://exploringjs.com/es6/index.html
* http://exploringjs.com/es2016-es2017/index.html

***

### 目錄

* [非同步處理](#非同步處理)
  * [承諾 (Promises)](#承諾)
  * [產生器 (Generators)](#產生器)
  * [非同步函式 (Async Function)](#非同步函式)
  * [可觀察 (Observables)](#可觀察)
* [函式型程式設計](#函式型程式設計)
  * 組合函式
  * [議題](#議題)
    * [共享狀態](#共享狀態)
    * 突變狀態
    * 副作用
  * 不可變性
  * 尾端呼叫優化
* [資料結構和演算法](#資料結構和演算法)
  * 堆疊
  * [佇列](#佇列)
    * 環狀佇列
  * 鏈結
    * 雙向鏈結
    * 環狀鏈結
  * 集合
  * 雜湊表
  * 樹
  * 圖形
  * 排序
  * 搜索
  * 洗牌
  * 貪婪
* [設計模式](#設計模式)
  * [建立型 (Creational)](#建立型)
    * 抽象工廠 (Abstract Factory)
    * 建造器 (Builder)
    * [工廠 (Factory)](#工廠)
    * 原型 (Prototype)
    * 單體 (Singleton)
  * 結構型 (Structural)
    * 匹配器 (Adapter)
    * 橋梁 (Bridge)
    * 組合 (Composite)
    * 修飾 (Decorator)
    * 外觀 (Facade)
    * 享元 (Flyweight)
    * 代理 (Proxy)
  * 行為型 (Behavioral)
    * 職責鏈 (Chain of Responsibility)
    * 命令 (Command)
    * 翻譯者 (Interpreter)
    * 迭代器 (Iterator)
    * 中介者 (Mediator)
    * 備忘錄 (Memento)
    * 觀察者 (Observer)
    * 狀態 (State)
    * 策略 (Strategy)
    * 模板 (Template)
    * 遊客 (Visitor)
* [規則運算式 (Regex)](#規則運算式)
  * [共用](#共用)
  * 一般
  * 錨點
  * 後設資料佇列
  * 量詞
  * 群組建構
  * 字元符號
  * 修飾符號
  * 代換

***

## 非同步處理

### 承諾

```js
const foo = () => {
  console.log(1);

  const bar = new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log(2)), 0);
  });

  console.log(3);

  return bar;
};

foo().then(() => console.log(4));
// 1
// 3
// 2
// 4
```

平行

```js
Promise.all([
    p1(), p2()
  ])
  .then(data => {
    console.log(data[0]);  // p1 結果
    console.log(data[1]);  // p2 結果
  });
```

平行且競賽

```js
Promise.race([
    p1(),  // 假設 p1 為主體
    p2()  // p2 不一定要執行，通常是 p1 的超時處理
  ])
  .then(() => {
    // ...
  });
```

錯誤處理

```js
foo().then(() => console.log(4))
  .catch(error => console.error(error));
```

鏈接

```js
foo().then(() => console.log(4))
  .then(() => console.log(6))
  .then(() => console.log(8))
  .catch(error => console.error(error));
```

### 產生器

```js
function* foo(x) {
  let y = x * (yield);  // 在這裡暫停
  return y;
};

let it = foo(2);  // 通常會已使用 `it` 來控制產生器
it.next();  // 執行 foo 函式，但會停在 yield 的地方

let result = it.next(3);  // 執行 foo 函式，這次會從暫停的地方開始
result.value;  // 2 * 3 = 6
```

```js
const foo = {
  *bar() {
    let index = 0;
    while (true) yield index++;
  }
};

const it = foo.bar();
it.next().value;  // 0
it.next().value;  // 1
```

### 非同步函式

宣告式:

```js
async function foo() {
  const result = await bar();
  console.log(result);
}
```

表示法:

```js
const foo = async function () {
  const result = await bar();
  console.log(result);
};
```

箭頭函式:

```js
const foo = async () => {
  const result = await bar();
  console.log(result);
};
```

方法定義:

```js
const thing = {
  async foo() {
    const result = await bar();
    console.log(result);
  }
};
```

類別方法:

```js
class Thing {
  async foo() {
    const result = await bar();
    console.log(result);
  }
}
```

平行處理:

```js
const foo = async () => {
  const [result1, result2] = await Promise.all([bar(), baz()]);
  console.log(result1, result2);
};
```

錯誤處理:

```js
const foo = async () => {
  try {
    const result = await bar();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
```

返回承諾:

```js
const foo = async () => {
  const result = await bar();

  if (result) {
    return `Foo, ${result}`;
  } else {
    throw new Error('Problem!');
  }
};

foo()
  .then(value => console.log(value))
  .catch(error => console.error(error));
```

### 可觀察

```js
// 一個 Observer (觀察者)
new Observable(observer => {
    // 回呼方法: next()、error() 和 complete()
    setTimeout(() => observer.next('foo'), 0);
    setTimeout(() => observer.next('bar'), 1000);
    setTimeout(() => observer.next('baz'), 2000);
    setTimeout(() => observer.complete(), 3000);
  })
  .subscribe(  // 訂閱一個或多個 Observable (可觀察的物件)
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );
  // foo
  // bar
  // baz
  // done
```

```js
Observable.of(1, 2, 3)
  .subscribe(value => console.log(value));
  // 1
  // 2
  // 3
```

```js
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 4);

Observable.from(map2)
  .subscribe(value => console.log(value));
  // ["a", 1]
  // ["b", 4]
  // ["c", 3]
```

## 函式型程式設計

### 議題

#### 共享狀態

```js
const counter = { value: 0 };

const counter1 = () => counter.value += 1;
const counter2 = () => counter.value += 5;

counter1();  // 1
counter2();  // 6
```

```js
const counter = { value: 0 };

const counter1 = () => Object.assign({}, counter, { value: counter.value + 1 });
const counter2 = () => Object.assign({}, counter, { value: counter.value + 5 });

counter1().value;  // 1
counter2().value;  // 5
```

## 資料結構和演算法

### 佇列

佇列的原則是先進先出 (先來先服務)

```js
export class Queue {
  queueArray = [];  // 需要使用 babel-plugin-transform-class-properties

  constructor(item, priority) {
    this.item = item;
    this.priority = priority;
  }

  // 排隊
  enqueue(item) {
    this.queueArray.push(item);
  }

  // 離隊
  dequeue() {
    return this.queueArray.shift();
  }

  // 隊伍首項
  front() {
    return this.queueArray[0];
  }

  // 檢查是否為空佇列
  isEmpty() {
    return this.queueArray.length === 0;
  }

  // 清空佇列
  clear() {
    this.queueArray = [];
  }

  // 佇列的數量
  size() {
    return this.queueArray.length;
  }

  // 打印佇列
  print() {
    console.log(this.queueArray.toString());
  }
}
```

```js
const q1 = new Queue();

q1.isEmpty();  // true

q1.enqueue('Vanilla');
q1.enqueue('Angular');
q1.enqueue('React');
q1.enqueue('Vue');

q1.print();
```

## 設計模式

### 建立型

#### 工廠

```js
class Product {
  constructor() {
    console.log('Product Created');
  }
}

class ConcreteProduct extends Product {
  constructor() {
    super();
    console.log('ConcreteProduct Created');
  }
}

class Creator {
  constructor() {
    console.log('Creator Created');
  }

  Factory() { }

  AnOperation() {
    console.log('Creator - AnOperation()');
    this.product = this.Factory();
    console.log(this.product instanceof ConcreteProduct);
  }
}

class ConcreteCreator extends Creator {
  constructor() {
    super();
    console.log('ConcreteCreator Created');
  }

  Factory() {
    return new ConcreteProduct();
  }
}

const Factory = () => {
  const factory = new ConcreteCreator();
  factory.AnOperation();
};

Factory();
// Creator Created
// ConcreteCreator Created
// Creator - AnOperation()
// Product Created
// ConcreteProduct Created
// true
```

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class Factory {

}
```

### 結構型

## 規則運算式

### 共用

(1) 匹配 a、b 或 c 字元

```js
let regex = /[abc]+/g;

regex.test('a bb ccc');  // true
```

比對: `a` `bb` `ccc`

(2) 匹配除了 a、b 或 c 之外的任何字元

```js
let regex = /[^abc]+/g;

regex.test('Anything but abc.');  // true
```

比對: `Anything `b`ut `abc`.`

(3)

```js
let regex = /[a-z]+/g;
```

```js
let regex = /[^a-z]+/g;
```

```js
let regex = /[a-zA-Z]+/g;
```

```js
let regex = /.+/;
```
