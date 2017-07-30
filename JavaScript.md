# JavaScript

### 目錄

* 非同步處理
  * 承諾 (Promises)
  * 產生器 (Generators)
  * 非同步函式 (Async Function)
  * 可觀察 (Observables)
* 資料結構
  * 堆疊
  * 佇列
  * 鏈結
    * 雙向
    * 環狀
  * 集合
  * 雜湊
  * 樹
  * 圖形
* 演算法
  * 排序
* 設計模式
  * 建立型
    * 工廠 (Factory)
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

***

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
