# Async Processing (非同步處理)

### Reference Resources (參考資源)

* http://speakingjs.com/es5/index.html
* http://exploringjs.com/es6/index.html
* http://exploringjs.com/es2016-es2017/index.html
* https://github.com/getify/You-Dont-Know-JS

***

### Table of Contents (目錄)

* [Promises (承諾)](#promises-承諾)
* [Generators (產生器)](#generators-產生器)
* [Async Functions (非同步函式)](#async-functions-非同步函式)
* [Observables (可觀察)](#observables-可觀察)

***

## Promises (承諾)

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

Parallel (平行)

```js
Promise
  .all([p1(), p2()])
  .then(data => {
    console.log(data[0]);  // p1 結果
    console.log(data[1]);  // p2 結果
  });
```

Parallel and competition (平行且競賽)

```js
Promise
  .race([
    p1(),  // 假設 p1 為主體
    p2()  // p2 不一定要執行，通常是 p1 的超時處理
  ])
  .then(() => {
    // ...
  });
```

Error handling (錯誤處理)

```js
foo()
  .then(() => console.log(4))
  .catch(error => console.error(error));
```

Chaining (鏈接)

```js
foo()
  .then(() => console.log(4))
  .then(() => console.log(6))
  .then(() => console.log(8))
  .catch(error => console.error(error));
```

## Generators (產生器)

```js
function *foo(num) {
  yield num;
  yield num + 2;
}

const it = foo(1);

it.next().value;  // 1
it.next().value;  // 3
it.next().value;  // undefined
```

```js
function *foo() {
  yield 'foo - 1';
  yield 'foo - 2';
}

function *bar() {
  yield 'bar - 1';
  yield *foo();  // another generator
  yield 'bar - 2';
}

for (const value of bar()) {
  console.log(value);
}
// bar - 1
// foo - 1
// foo - 2
// bar - 2
```

```js
function *foo(x) {
  const y = x * (yield);  // pause here (在這裡暫停)
  return y;
}

const it = foo(2);  // 通常會已使用 `it` 來控制產生器
it.next();  // 執行 foo 函式，但會停在 yield 的地方

const result = it.next(3);  // 執行 foo 函式，這次會從暫停的地方開始
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

```js
// not support
const foo = *() => {
  yield 'foo';
};
```

## Async Functions (非同步函式)

Function Declarations (函式宣告式)

```js
async function foo() {
  const result = await bar();
  console.log(result);
}
```

Function Expressions (函式表示式)

```js
const foo = async function () {
  const result = await bar();
  console.log(result);
};
```

Arrow Functions (箭頭函式)

```js
const foo = async () => {
  const result = await bar();
  console.log(result);
};
```

Method Definitions (方法定義)

```js
const thing = {
  async foo() {
    const result = await bar();
    console.log(result);
  }
};
```

Class prototype methods (類別原型方法)

```js
class Thing {
  async foo() {
    const result = await bar();
    console.log(result);
  }
}
```

Parallel (平行)

```js
const foo = async () => {
  const [result1, result2] = await Promise.all([bar(), baz()]);
  console.log(result1, result2);
};
```

Loops (迴圈)

```js
const foo = async things => {
  const results = [];

  for (const value of things) {
    // All asynchronous operations are immediately started.
    results.push(bar(thing));
  }

  // Now that all the asynchronous operations are running, here we wait until they all complete.
  const data = await Promise.all(results);

  return data;
};
```

Error handling (錯誤處理)

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

Returned Promises (返回承諾):

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

Comparison (比對)

```js
const foo = async () => {
  return await bar();
};

// or

const foo = async () => {
  const baz = await bar();
  return baz;
};

// or

const foo = async () => {
  return bar();
};
```

## Observables (可觀察)

```js
// an observer (一個觀察者)
new Observable(observer => {
    // callback method (回呼方法): next(), error(), & complete()
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
