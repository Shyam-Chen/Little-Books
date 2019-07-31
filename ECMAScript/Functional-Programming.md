# Functional Programming (函式型程式設計)

***

### Table of Contents (目錄)

* Collection (集合)
  * [Immutable (不可變性)](#immutable-不可變性)
* [Recursion (遞迴)](#recursion-遞迴)
  * [Tail Call Optimization (尾端呼叫優化)](#tail-call-optimization-尾端呼叫優化)
  * [Trampoline (繃跳區)](#trampoline-繃跳區)
* [Function Composition (函式組合)](#function-composition-函式組合)
  * [Currying (柯里化)](#currying-柯里化)
  * [Reducer (減速器)](#reducer-減速器)
  * Transducer (傳感器)
* Macro (巨集)
* Monadic (單化)
* Concurrent (並發)
* Arity (元數)
* Algebraic (代數)
* Lenses (透鏡)

***

### Immutable (不可變性)

```js
const state = { value: 0 };

const counter1 = () => state.value += 1;
const counter2 = () => state.value += 5;

counter1();  // 1
counter2();  // 6

// immutable

const counter1 = () => Object.assign({}, state, { value: state.value + 1 });
const counter2 = () => Object.assign({}, state, { value: state.value + 5 });

counter1().value;  // 1
counter2().value;  // 5

// rest parameters

const counter1 = () => ({ ...state, { value: state.value + 1 } });
const counter2 = () => ({ ...state, { value: state.value + 5 } });
```

## Recursion (遞迴)

```js
pow(2, 0);  // 1
pow(2, 1);  // 2
pow(2, 2);  // 4
pow(2, 3);  // 8
pow(2, 4);  // 16

// for loop
const pow = (base, exponent) => {
  let result = 1;

  for (let i = 0; i < exponent; i++) {
    result *= base;
  }

  return result;
};

// while loop
const pow = (base, exponent) => {
  let result = 1;

  while (exponent > 0) {
    exponent -= 1;
    result *= base;
  }

  return result;
};

// recursion
const pow = (base, exponent) => {
  if (exponent === 1) return base;
  return base * pow(base, exponent - 1);
};

// recursion (tco)
const pow = (base, exponent, acc = 1) => {
  if (exponent === 0) return acc;
  return pow(base, exponent - 1, base * acc);
};
```

### Tail Call Optimization (尾端呼叫優化)

```js
const factorial = (num) => {
  if (num === 0) return 1;
  return num * factorial(num - 1);
};

const factorial = (num, acc = 1) => {
  if (num === 0) return acc;
  return factorial(num - 1, num * acc);
};
```

```js
const tco = (func) => {
  const accumulated = [];

  let value = null;
  let active = false;

  return (...arg) => {
    accumulated.push(arg);

    if (!active) {
      active = true;

      while (accumulated.length) {
        value = func.apply(this, accumulated.shift());
      }

      active = false;

      return value;
    }
  };
};

const sum = tco((x, y) => {
  if (y > 0) return sum(x + 1, y - 1)
  return x;
});

sum(1, 100000);  // 100001
```

### Trampoline (繃跳區)

```js
const trampoline = (func) => {
  while (typeof func === 'function') {
    func = func();
  }

  return func;
};

const odd = n =>
  n === 0 ? false : even(n - 1);

const even = n =>
  n === 0 ? true : odd(n - 1);

odd(100000);  // Uncaught RangeError: Maximum call stack size exceeded

const odd = n =>
  () =>
    n === 0 ? false : even(n - 1);

const even = n =>
  () =>
    n === 0 ? true : odd(n - 1);

trampoline(odd(100000));  // false
```

## Function Composition (函式組合)

```js
// pipe function

const pipe = (...funcs) =>
  init =>
    funcs.reduce((acc, func) => func(acc), init);

const inc = num => num + 1;
const dbl = num => num * 2;
const sqr = num => num * num;

pipe(inc, dbl, sqr)(2);  // 36
// 2 + 1 = 3
// 3 * 2 = 6
// 6 * 6 = 36
```

```js
// pipeline operator

const inc = num => num + 1;
const dbl = num => num * 2;
const sqr = num => num * num;

2 |> inc |> dbl |> sqr;  // 36
```

```js
// compose function

const compose = (...funcs) =>
  funcs.reduce((f, g) => (...args) => g(f(...args)), arg => arg);

// -

const inc = num => num + 1;
const dbl = num => num * 2;
const sqr = num => num * num;

compose(inc, dbl, sqr)(2);
// 2 + 1 = 3
// 3 * 2 = 6
// 6 * 6 = 36

// -

const inc = value => num => num + value;
const sub = value => num => num - value;
const mul = value => num => num * value;

compose(inc(1), sub(2), mul(3))(5);  // 12
// 5 + 1 = 6
// 6 - 2 = 4
// 4 * 3 = 12

// -

const compose = (...funcs) => res => funcs.reduce((acc, next) => next(acc), res);
```

### Currying (柯里化)

```js
const curry = f => a => b => f(a, b);
const uncurry = f => (a, b) => f(a)(b);

const add = (a, b) => a + b;
const curriedAdd = a => b => a + b;

add(1, 2);  // 3
curriedAdd(1)(2);  // 3

uncurry(curry(add))(1, 2);  // 3
curry(uncurry(curriedAdd))(1)(2);  // 3
```

### Reducer (減速器)

```js
const sumReducer = (acc, num) => acc + num;
const multReducer = (acc, num) => acc * num;

[1, 2, 3, 4, 5].reduce(sumReducer, 0);  // 15
[1, 2, 3, 4, 5].reduce(multReducer, 1);  // 120
```
