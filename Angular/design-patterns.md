## 設計模式

```js
class Product {
  constructor() {
    console.log('Product Created')
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

  FactoryMethod() { }

  AnOperation() {
    console.log('Creator - AnOperation()');
    this.product = this.FactoryMethod();
    console.log(this.product instanceof ConcreteProduct)
  }
}

class ConcreteCreator extends Creator {
  constructor() {
    super();
    console.log('ConcreteCreator Created');
  }

  FactoryMethod() {
    return new ConcreteProduct();
  }
}

const FactoryMethod = () => {
  const factory = new ConcreteCreator();
  factory.AnOperation();
};

FactoryMethod();
// Creator Created
// ConcreteCreator Created
// Creator - AnOperation()
// Product Created
// ConcreteProduct Created
// true
```
