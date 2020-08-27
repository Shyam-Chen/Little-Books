# Babel

Babel is a compiler for writing next generation JavaScript.

---

### Table of Contents (目錄)

- [Getting Started (起手式)](#getting-started-起手式)
- Type Checking
- Unit Testing (單元測試)

---

## Getting Started (起手式)

```sh
$ mkdir babel-starter
$ cd babel-starter
$ yarn init -y
```

## Type Checking

```sh
$ yarn add @babel/preset-flow -D
```

```js
{
  "presets": ["@babel/preset-flow"]
}
```

```sh
$ yarn add flow-bin flow-typed -D
```

`.flowconfig`

```
[declarations]

[include]

[ignore]
.*/node_modules/*
.*/.flow-typed/*
.*\.spec\.js
.*\.e2e-spec\.js

[untyped]

[libs]
flow-typed/

[lints]

[options]

```

```js
{
  "scripts": {
    "flow": "flow",
    "typed": "flow-typed install --ignoreDeps dev",
  }
}
```

```sh
$ yarn flow start

$ yarn flow check
$ yarn flow coverage
```

```js
// @flow

interface Add {
  (x: number, y: number): number;
}

const add: Add = (x, y) => x + y;
```

## Unit Testing

```sh
$ yarn add babel-jest -D
```
