# Learning Angular

> Angular 2 學習手冊 ([前往](https://github.com/Shyam-Chen/JavaScript-GO/blob/master/professional-angular/README.md))

***

* [TypeScript 程式設計](https://github.com/Shyam-Chen/Technical-Manual/blob/master/programming-in-typescript.md)

* [Pug 項目實踐](https://github.com/Shyam-Chen/Technical-Manual/blob/master/practical-pug.md)
* [Stylus 項目實踐](https://github.com/Shyam-Chen/Technical-Manual/blob/master/practical-stylus.md)

***

### 函式型程式設計

```js
const foo = x => {  // 6
  return x + 1;  // 6 + 1 = 7
};
// or: const foo = x => x + 1;

const bar = y => {  // 3
  let z = 2;
  return console.log(foo(y * z));  // 3 * 2 = 6
};

bar(3);  // 7
```

```js
const foo = () => {
  console.log(1);
  setTimeout(() => console.log(2));
  console.log(3);
  setTimeout(() => console.log(4), 0);
  console.log(5);
};

foo();
// 1
// 3
// 5
// 2
// 4
```

```js
const foo = () => {
  let x = 123;
  return () => console.log(x);
}

const bar = foo();
bar();  // 123
```

```js
const foo = x => {
  return y => console.log(x + y);
};

foo(1)(2);  // 3
```

```js
const foo = (x, y) => {
  return x && y ? console.log(x + y) : z => console.log(x + z);
};

foo(1, 2);  // 3
foo(1)(2);  // 3
```

```js
const foo = x => {
  if (x < 0) {
    return -1;
  } else if (x === 0) {
    return 1;
  } else {
    return x * foo(x - 1);
  }
};

console.log(foo(5));  // 5! = 120
```

```js
const foo = x => {
  return x <= 1 ? x : foo(x - 1) + foo(x - 2);
};

console.log(foo(3));  // 1 + 1 = 2
console.log(foo(4));  // 1 + 2 = 3
console.log(foo(5));  // 2 + 3 = 5
console.log(foo(6));  // 3 + 5 = 8
```

```js
const foo = x => {
  return (x === 0) ? 1 : x - bar(foo(x - 1));
};

const bar = x => {
  return (x === 0) ? 0 : x - foo(bar(x - 1));
};

console.log(foo(7));  // 5
console.log(bar(7));  // 4

console.log(foo(11));  // 7
console.log(bar(11));  // 7
```

```js
const foo = x => {
  const bar = (x, y) => {
    if (x < 0) {
      return -y;
    } else if (x === 0) {
      return y;
    } else {
      return bar(x - 1, x * y);
    }
  };
  return bar(x, 1);
};

console.log(foo(5));  // 5! = 120
```

```js
const trampoline = func => {
  while (func && func instanceof Function) {
    func = func.apply(func.context, func.args);
  }
  return func;
};

const foo = x => {
  const bar = (x, y) => {
    if (x < 0) {
      return -y;
    } else if (x === 0) {
      return y;
    } else {
      return bar.bind(null, x - 1, x * y);
    }
  };
  return trampoline(bar.bind(null, x, 1));
};

console.log(foo(5));  // 5! = 120
```

```js
const foo = () => {
  console.log(1);

  const bar = new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log(2)), 0);
  });

  console.log(3);

  return bar;
};

foo()
  .then(
    () => console.log(4),
    err => console.log(err)
  );
// 1
// 3
// 2
// 4
```

```js
async function foo(x) {  // 10
  let bar = await Promise
    .resolve(x)
    .then(x => x + 2)  // 10 + 2 = 12
    .then(x => x - 3)  // 12 - 3 = 9
    .then(x => x * 4)  // 9 * 4 = 36
    .then(x => x / 5);  // 36 / 5 = 7.2
  return bar;
}

foo(10)
  .then(
    x => console.log(x),
    err => console.log(err)
  );
// 7.2
```

```js
async function foo(x) {  
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log(2)), x);
  });
}

async function bar() {
  console.log(1);
  await foo(1000);
  setTimeout(() => console.log(3), 1000);
}

bar();
// 1
// 2 (print after 1 second)
// 3 (print after 2 seconds)
```
