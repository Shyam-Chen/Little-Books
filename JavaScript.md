# JavaScript

### 目錄

* [非同步處理](#非同步處理)
  * [承諾 (Promises)](#承諾)
  * 產生器 (Generators)
  * 非同步函式 (Async Function)
  * 可觀察 (Observables)
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
  * 鏈結
    * 雙向
    * 環狀
  * 集合
  * 雜湊表
  * 樹
  * 圖形
  * 排序
  * 搜索
  * 洗牌
  * 貪婪
* [設計模式](#設計模式)
  * [建立型](#建立型)
    * [工廠 (Factory)](#工廠)
    * 抽象工廠 (Abstract Factory)
    * 建造器 (Builder)
    * 原型模式 (Prototype)
    * 單體模式 (Singleton)
  * 結構型
    * 匹配器 (Adapter)
    * 組合 (Composite)
    * 修飾 (Decorator)
    * 外觀 (Facade)
    * 享元 (Flyweight)
    * 摻合 (Mixin)
    * 模組 (Module)
    * 代理 (Proxy)
  * 行為型
    * 職責鏈 (Chain of Responsibility)
    * 命令 (Command)
    * 迭代器 (Iterator)
    * 觀察者 (Observer)
    * 中介者 (Mediator)
    * 備忘錄 (Memento)
    * 承諾 (Promises)
    * 策略 (Strategy)
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
class Queue {
  constructor() {
    this.queueArray = [];
  }

  // 排隊
  enqueue(item) {
    this.queueArray.push(item);
  }
}
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

#### 模組

最簡單的樣子

```js
((foo, bar) => {
  // ...
})(foo);
```

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
