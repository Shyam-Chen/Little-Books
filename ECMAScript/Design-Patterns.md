# Design Patterns (設計模式)

### Reference Resources (參考資源)

* http://speakingjs.com/es5/index.html
* http://exploringjs.com/es6/index.html
* http://exploringjs.com/es2016-es2017/index.html
* https://github.com/getify/You-Dont-Know-JS

***

### Table of Contents (目錄)

* [Creational (建立型)](#creational-建立型)
  * Abstract Factory (抽象工廠)
  * Builder (建造器)
  * [Factory (工廠)](#factory-工廠)
  * Prototype (原型)
  * [Singleton (單體)](#singleton-單體)
* Structural (結構型)
  * Adapter (匹配器)
  * Bridge (橋梁)
  * Composite (組合)
  * Decorator (修飾)
  * Facade (外觀)
  * Flyweight (享元)
  * Proxy (代理)
* Behavioral (行為型)
  * Chain of Responsibility (職責鏈)
  * Command (命令)
  * Interpreter (翻譯者)
  * Iterator (迭代器)
  * Mediator (中介者)
  * Memento (備忘錄)
  * Observer (觀察者)
  * State (狀態)
  * Strategy (策略)
  * Template (模板)
  * Visitor (遊客)

***

### Creational (建立型)

#### Factory (工廠)

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

#### Singleton (單體)

```js
class Singleton {
  constructor() {
    if (typeof Singleton.instance === 'object') {
      return Singleton.instance;
    }

    Singleton.instance = this;

    return this;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

instance1 === instance2;  // true
```
