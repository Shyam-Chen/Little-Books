# Interview Questions

---

### Table of Contents (目錄)

- [Closures (閉包)](#closures-閉包)
- [Event Loop (事件循環)](#event-loop-事件循環)
- Hoisting
- Operators

---

## Closures (閉包)

### Q1

Bad

```js
const foo = (val) => () => val++; // eslint no-plusplus: "error"

const bar = foo(1);

bar(); // 1
bar(); // 2
```

Good

```js
const foo = (val) => () => (val += 1);

const bar = foo(1);

bar(); // 2
bar(); // 3
```

### Q2

## Event Loop (事件循環)

### Q1

## Hoisting (提升)

### Q1

```js
function foo() {
  console.log(a);
  console.log(b);
  var a = 1; // eslint no-var: "error"
  let b = 2;
}

foo();
// undefined
// Uncaught ReferenceError
```

## Operators

### Q1

Bad

```js
const val = 123;

!typeof val === 'string'; // eslint no-constant-condition: "warn"
// false

// `!typeof val` will always return 'false'
```

Also Bad

```js
const val = 123;

!(typeof val === 'string');
// true
```

Good

```js
const val = 123;

typeof val !== 'string';
// true
```
