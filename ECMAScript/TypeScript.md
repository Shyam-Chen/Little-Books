# TypeScript

### Reference Resources (參考資源)

* http://www.typescriptlang.org/docs/home.html
* https://basarat.gitbooks.io/typescript/content/

***

### Table of Contents (目錄)

* [Quick Start (快速開始)](#quick-start-快速開始)
* [Variable Declarations (變數宣告)](#variable-declarations-變數宣告)
* [Destructuring (分割代入)](#destructuring-分割代入)
* [Types (型別)](#types-型別)
* [Namespaces (命名空間)](#namespaces-命名空間)
* [Modules (模組機制)](#modules-模組機制)
* [Interfaces (介面)](#interfaces-介面)
* [Functions (函式)](#functions-函式)
* [Classes (類別)](#classes-類別)
* [Type Compatibility (型別兼容性)](#type-compatibility-型別兼容性)
* [Type Queries (型別查詢)](#type-queries-型別查詢)
* [Generics (泛型)](#generics-泛型)
* [Type Assertion (型別斷言)](#type-assertion-型別斷言)
* [Exponentiation Operators (冪運算子)](#exponentiation-operators-冪運算子)
* [Mixins (混入)](#mixins-混入)
* [Declaration Merging (合併宣告)](#declaration-merging-合併宣告)
* [Set (似陣列)](#set-似陣列)
* [Map (似物件)](#map-似物件)
* [Proxy (代理)](#proxy-代理)
* [Reflect (反映)](#reflect-反映)
* [Promises (承諾)](#promises-承諾)
* [Iterators (迭代器)](#iterators-迭代器)
* [Generators (產生器)](#generators-產生器)
* [Async Functions (非同步函式)](#async-functions-非同步函式)
* [Decorators (修飾器)](#decorators-修飾器)

***

## Quick Start (快速開始)

```bash
# install ts-node and typescript (安裝 ts-node 和 typescript)
$ npm i ts-node typescript -g
# or
$ yarn global add ts-node typescript
```

```bash
# create a practice file (建立練習檔)
$ touch script.ts
```

```ts
// script.ts
var ht = 'Hello TypeScript';
console.log(ht);
```

```bash
# execute a practice file (執行練習檔)
$ ts-node script
```

```bash
# outputs (輸出)
Hello TypeScript
```

## Variable Declarations (變數宣告)

```ts
let foo = 123;
foo;  // 123
foo = 456;
foo;  // 456
```

```ts
let foo = 123;

if (true) {
  let foo = 456;
}

foo;  // 123
```

```ts
const bar = 123;
bar;  // 123
bar = 456;  // Error
```

```ts
const foo = { bar: 123 };
foo = { bar: 456 };  // Error
foo.bar = 456;  // OK
foo;  // { bar: 456 }
```

## Destructuring (分割代入)

### Array Destructuring (陣列分割代入)

```ts
const [foo, bar] = [123, 456];
foo;  // 123
bar;  // 456
```

```ts
const [foo = 1] = [];
foo;  // 1
```

```ts
let a = 1;
let b = 2;

[a, b] = [b, a];

a;  // 2
b;  // 1
```

### Object Destructuring (物件分割代入)

```ts
const thing = {
  x: 'foo',
  y: 'bar',
  child: {
    z: 'baz'
  }
};

const { x, y, child: { z } } = thing;
x;  // "foo"
y;  // "bar"
z;  // "baz"
```

```ts
let key = 'foo';
const { [key]: bar } = { foo: 'baz' };

bar;  // "baz"
```

```ts
const foo = () => [1, 2, 3];

const [a, , b] = foo();

a;  // 1
b;  // 3
```

```js
const path = require('path');

path.join(__dirname, 'thing');

// destructuring
const { join } = require('path');

join(__dirname, 'thing');
```

## Types (型別)

### Boolean (布林值)

```ts
let foo: boolean = true;
let bar: boolean = false;
```

### Number (數值)

```ts
let foo: number = 18;  // decimal (十進制)
```

### String (字串)

```ts
let myName: string = 'Hale';

// template literals (模板文字)
let sentence: string = `My name is ${myName}.`;  // outputs (輸出): My name is Hale.
```

```ts
function tag(strings, ...values) {
  return strings.raw[0];
}

tag`foo \n bar`;
```

MDN JS Docs:

* [`Template literals`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
* [`String.raw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw)

### Array (陣列)

```ts
const foo: number[] = [1, 2, 3];
const bar: string[] = ['a', 'b', 'c'];

// or

const foo: Array<number> = [3, 2, 1];
const bar: Array<string> = ['x', 'y', 'z'];
```

### Object (物件)

```ts
const foo: object = { prop: 0 };
```

```ts
const foo: object = { a: 1, b: 1, c: 1 };
const { c, ...bar } = foo;

bar;  // {a: number, b: number};
```

### Symbol (象徵)

```ts
const s1 = Symbol();
const s2 = Symbol('foo');
```

```ts
const s1 = Symbol('foo');
const s2 = Symbol('foo');

s1 === s2;  // false
```

```ts
const KEY = Symbol();
const foo = {};

foo[KEY] = 123;

foo[KEY];  // 123

// or

const KEY = Symbol();
const foo = {
  [KEY]: 123
};

foo[KEY];  // 123
```

### Tuple (元組)

```ts
let foo: [number, string];  // declare a tuple type (宣告一個元組型別)
foo = [123, 'abc'];  // initialize it (將 foo 初始化)
```

### Enum (列舉)

```ts
enum Thing {
  Foo, Bar, Baz
};

let foo: Thing = Thing.Foo;  // 0
let bar: Thing = Thing.Bar;  // 1
let baz: Thing = Thing.Baz;  // 2

enum Thing2 {
  Up = 4,
  Down,
  Left,
  Right
};

let up: Thing2 = Thing2.Up;  // 4
let down: Thing2 = Thing2.Down;  // 5
let left: Thing2 = Thing2.Left;  // 6
let right: Thing2 = Thing2.Right;  // 7

// 使用 const 宣告
const enum Thing3 (
  // ...
  // 還能使用一些一元或二元運算子
  Foo = 60 >> 2  // 0011-1100 -> 0000-1111, 15
)

enum Thing4 {
  Foo
}
let foo = Thing4.Foo;
let thing4OfFoo = Thing4[Thing4.Foo];  // Foo

// 定義宣告
declare enum Thing5 {
  Foo,
  Bar,
  Baz
}
```

### Any (任意值)

```ts
let notSure: any = 123;
notSure = 'abc';  // OK
notSure = 'true';  // OK
```

### Void (虛值)

```ts
function foo(thing: number): void {
  this.thing = thing;
}
```

### Null & Undefined (空值和未定義)

```ts
let foo: string;
foo;  // Error

let bar: string | null;
bar;  // Error

let baz: string | undefined;
baz;  // OK
```

### Never (從未)

```ts
function error(message: string): never {
  throw new Error(message);
}
```

### Type Assertions (型別斷言)

```ts
let foo: any = 'abc';
let bar = <string>foo;  // 語法: <>
let baz: number = bar.length;  // 3

// or
let bar2 = foo as string;  // 語法: as
let baz2: number = bar2.length;  // 3
```

### Intersection Type (相交型別)

```ts
function extend<T, U>(first: T, second: U): T & U {
  const result = <T & U>{};

  for (const id in first) {
    (<any>result)[id] = (<any>first)[id];
  }

  for (const id in second) {
    if (!result.hasOwnProperty(id)) (<any>result)[id] = (<any>second)[id];
  }

  return result;
}
```

### Union Type (併集型別)

```ts
let foo: string | number;

foo = 'abc';  // OK
foo = 123;  // OK

// 使用介面
// 介面用法可以參考介面章節
interface Some {
  foo();
  baz();
}

interface Thing {
  bar();
  baz();
}

function getSomeThing(): Some | Thing {
  // ...
}
let st = getSomeThing();

st.foo();  // Error
st.bar();  // Error
st.baz();  // OK
```

### Type Aliases (型別別名)

```ts
type ThingType = string | number;
let foo: ThingType;

foo = 'abc';  // OK
foo = 123;  // OK
foo = true;  // Error
```

String literal types (字串實字型別)

```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
```

Numeric literal types (數字實字型別)

```ts
function thing(): 0 | 1 {
  // ...
}
```

## Namespaces (命名空間)

```ts
namespace Thing {
  export class Foo {}
  export class Bar {}
}

const foo = new Thing.Foo();
const bar = new Thing.Bar();
```

```ts
namespace Thing {
  export namespace Foo {
    export class Bar {}
    export class Baz {}
  }
}

const baz = new Thing.Foo.Baz()

// equal to (等同於)
import foo = Thing.Foo;
const baz = new foo.Baz();
```

### Modules (模組機制)

```ts
// foo.ts
// 導出介面
export interface Foo {
  // ...
}

// 導出變數
export const numberRegexp = /^[0-9]+$/;
```

```ts
// bar.ts
import { Foo } from './foo';

export class Bar {
  // ...
}
```

```ts
// 預設導出
export default thing;
```

```ts
// foo.ts
export class Angular {
  // ...
}
```

```ts
// bar.ts
import { Angular as Ng } from './foo';  // 對導入的內容重新命名

let ng = new Ng();
```

```ts
// thing.d.ts
declare module 'thing-module' {
  export function foo(): void;
}
```

```ts
// module.ts
/// <reference path="thing.d.ts" />
import * as thing from 'thing-module';
```

Install the module definition via Types (透過 Types 安裝模組定義)

```bash
$ npm i @types/node -D
# or
$ yarn add @types/node -D
```

```ts
// script.ts
import { join } from 'path';  // OK
```

## Interfaces (介面)

```ts
interface Foo {
  bar: number;
  baz?: string;  // optional properties (可選屬性)
}

function thing(foo: Foo) {
  let bar = foo.bar;
  return bar;
}

thing({ bar: 123 });  // OK
thing({ baz: 'abc' });  // Error
thing({ bar: 123, baz: 'abc' });  // OK
```

```ts
interface Thing {
  [index: number]: string;
}

let thing: Thing = ['a', 'b', 'c'];

let foo: string = thing[1];  // 'b'
```

```ts
interface Square {
  color?: string;
  width?: number;
}

function createSquare(square: Square): { color: string; area: number } {
  // ...
}

let cs = createSquare({ width: 100, opacity: 0.5 } as Square);
```

```ts
interface Foo {
  (bar: number): void;
}

const baz = (foo: Foo) => foo(123);

baz((bar: number) => console.log(bar));  // 123
```

```ts
interface Foo {
  (x: number, y: number): boolean;
}

const foo: Foo = (x, y) => {
  let result = x + y;
  if (result >= 0) {
    return false;
  } else {
    return true;
  }
};

foo(2, -4);  // true
```

## Functions (函式)

```ts
// named function, function declaration (具名函式，函式宣告)
function addition(a: number, b: number): number {
  return a + b;
}

// anonymous function, function expression (匿名函式，函式表達)
const addition = function (a: number, b: number): number {
  return a + b;
};

// named function expression (具名函式表達)
const addition = function addition(a: number, b: number): number {
  return a + b;
};

// use arrow function (使用箭頭函式)
const addition = (a: number, b: number): number => {
  return a + b;
};

// simplify arrow function (簡化箭頭函式)
const addition = (a: number, b: number): number => a + b;

addition(1, 1);  // 2
addition('1', '1');  // Error
```

```ts
// object literal (物件實字)
const foo: object = {
  bar: function (parameter) {},
  // or
  bar: parameter => {}
  // or
  bar(parameter) {}
};
```

### Optional parameters (可選參數)

```ts
const thing = function (a: string, b: string, c?: string): string {
  return `${a} ${b} ${c}`;
};

thing('foo', 'bar', 'baz');  // foo bar baz
thing('foo', 'bar');  // foo bar undefined
thing('foo');  // Error
```

```ts
const thing = function (a: string, b: string, c?: string): string {
  if (c !== undefined) return `${a} ${b} ${c}`;
  return `${a} ${b}`;
};

thing('foo', 'bar', 'baz');  // foo bar baz
thing('foo', 'bar');  // foo bar
thing('foo');  // Error
```

### Default parameters (預設參數)

```ts
const thing = function (a: string, b: string = 'bar'): string {
  return `${a} ${b}`;
};

thing('foo');  // foo bar
thing('foo', 'baz');  // foo baz
```

## Classes (類別)

### 定義類別

```ts
class Foo {
  bar: number;

  constructor(x: number, y: number) {
    this.bar = x + y;
  }

  baz(): number {
    return this.bar;
  }
}

const foo = new Foo(13, 14);

foo.baz();  // 27
```

### 靜態資料屬性

```ts
class Point {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static zero(): object {
    return new Point(0, 0);
  }
}

Point.zero();  // { x: 0, y: 0 }
```

### 繼承

```ts
class Foo {
  constructor() {
    // ...
  }
}

class Bar extends Foo {
  constructor() {
    super();
    // ...
  }
}
```

```ts
class A {
  constructor() {
    console.log(new.target.name);
  }
}

class B extends A {
  constructor() {
    super();
  }
}

const a = new A();  // logs "A"
const b = new B();  // logs "B"
```

### 取值器和設值器

```ts
class Foo {
  get bar(): string {
    return 'Getter: baz';
  }

  set bar(value): void {
    console.log(`Setter: ${value}`);
  }
}

const foo = new Foo();

foo.bar;  // "Getter: baz"

foo.bar = 'baz';  // Setter: baz
```

### 修飾字元

`public` 表示可以在任何定放進行操作。

`private` 表示只能在自身內部進行操作。

`protected` 表示可以在自身或子內部進行操作。

```ts
class Thing {
  public foo: string;
  private bar: string;
  protected baz: string;
}
```

```ts
class Name {
  private name: string;

  constructor(private theName: string) {
    this.name = theName;
  }
}

new Name('Hale').name;  // Error: 'name' is private
```

```ts
class Adder {
  constructor(a: number) {
    console.log(a);
  }

  public add(b: number): number {
    return b;
  }
}

let foo: Adder = new Adder(1);

console.log(foo.add(2));
```

### 作為介面

將類別當作介面使用

```ts
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {
  x: 60,
  y: 120,
  z: 180
};
```

```ts
class Foo {
  constructor(public x = 0) {}

  public getFooX(): number {
    return this.x;
  }
}

class Bar {
  constructor(public x = 0) {}

  public get barX(): number {
    return this.x;
  }
}

const foo = new Foo(123);
foo.getFooX();  // 123

const bar = new Bar(123);
bar.barX;  // 123
```

## Type Compatibility (型別兼容性)

```ts
interface Foo {
  bar: string;
}

class Thing {
  // ...
}

let thing: Foo;
// 結構性的型別
thing = new Thing();
```

## Type Queries (型別查詢)

```ts
interface Foo {
  bar: string;
  baz: number;
}

type K1 = keyof Foo;  // "bar" | "baz"
```

映射

```ts
interface Foo {
  thing: string;
}

interface Bar {
  thing: string;
}

type Foo<T> = {
  [F in keyof T]?: T[F];
};

type Bar = Foo<Foo>;
```

型別轉換

```ts
type Readonly<T> = {
  readonly [F in keyof T]: T[F];
};
```

```ts
Partial
```

```ts
Record
```

```ts
Pick
```

## Generics (泛型)

```ts
function identity<T>(arg: T): T {
  return arg;
}

identity(123);  // 123
identity('abc');  // 'abc'
identity(true);  // true
```

```ts
class Thing<T> {
  foo: Thing<T>;
  bar: Thing<T>;
}

let nt = new Thing<number>();
let st = new Thing<string>();

nt.foo = new Thing<boolean>();
```

```ts
class Thing<T, U> {
  key: T;
  value: U;
}

let thing = new Thing<string, boolean>();

thing.key = 'foo';  // OK
thing.value = true;  // OK
```

## Type Assertion (型別斷言)

```ts
interface Foo {
  bar: number;
  baz: string;
}

let foo = {} as Foo;
foo.bar = 123;
foo.baz = 'abc';

foo;  // { bar: 123, baz: 'abc' }
```

```ts
interface Foo {
  bar: number;
  baz: string;
}

let foo = <Foo>{};
foo.bar = 123;
foo.baz = 'abc';

foo;  // { bar: 123, baz: 'abc' }
```

```ts
interface Foo {
  bar: number;
  baz: string;
  ts: string;
}

let foo = <Foo>{
  bar: 123,
  baz: 'abc'
};
foo.ts = 'TypeScript';

foo;  // { bar: 123, baz: 'abc', ts: 'TypeScript' }
```

```ts
interface Foo {
  bar: number;
  baz: string;
}

let foo: Foo = {
  bar: 123,
  baz: 'abc'
};

foo;  // { bar: 123, baz: 'abc' }
```

## Exponentiation Operators (冪運算子)

```ts
let x = 2 ** 5;  // Math.pow(2, 5)
x;  // 32
```

```ts
let x = 2 * 5 ** 2;
x;  // 2 * 25 = 50
```

```ts
let x = -(2 ** 3);
x;  // -8

// or
let y = (-2) ** 3;
y;  // -8

// Error
let z = -2 ** 3;
z;
```

## Mixins (混入)

```ts
class Disposable {
  isDisposed: boolean;
  dispose() {
    this.isDisposed = true;
  }
}

class Activatable {
  isActive: boolean;
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}

class SmartObject implements Disposable, Activatable {}
```

```ts
interface IFoo {
  add(): number;
}

class Foo implements IFoo {
  public add() {  // 混入後，就不用再給型別了
    return 123;
  }
}
```

## 合併宣告

```ts
// 合併介面
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

const box: Box = { height: 5, width: 6, scale: 10 };
```

## Set (似陣列)

## Map (map-似物件)

## Proxy (代理)

```ts
const proxy = new Proxy(<TARGET>, <HANDLER>);
```

攔截讀取屬性值

```ts
const proxy = new Proxy({}, {
  foo(target, property) {
    return 99;
  }
});

proxy.thing;  // 99
```

## Reflect (反映)

```ts
const thing: object = {
  foo: 1,
  get bar() {
    return this.foo;
  },
}

Reflect.get(thing, 'foo');  // 1
Reflect.get(thing, 'bar');  // 1
```

## Promises (承諾)

```ts
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

```ts
Promise
  .all([p1(), p2()])
  .then((data) => {
    console.log(data[0]);  // p1 結果
    console.log(data[1]);  // p2 結果
  });
```

平行且競賽

```ts
Promise
  .race([
    p1(),  // 假設 p1 為主體
    p2()  // p2 不一定要執行，通常是 p1 的超時處理
  ])
  .then(() => {
    // ...
  });
```

錯誤處理

```ts
foo()
  .then(() => console.log(4))
  .catch(error => console.error(error));
```

鏈接

```ts
foo()
  .then(() => console.log(4))
  .then(() => console.log(6))
  .then(() => console.log(8))
  .catch(error => console.error(error));
```

## Iterators (迭代器)

## Generators (產生器)

使用星號 `*` 宣告函式為產生器

`function* name() { ... }`

```ts
function* foo(x) {
  let y = x * (yield);  // 在這裡暫停
  return y;
};

let it = foo(2);  // 通常會已使用 `it` 來控制產生器
it.next();  // 執行 foo 函式，但會停在 yield 的地方

let result = it.next(3);  // 執行 foo 函式，這次會從暫停的地方開始
result.value;  // 2 * 3 = 6
```

如果想要平行執行多個承諾，又要讓多個承諾都解析完後，執行其它任務時，該怎麼做？

這時就必須搭配產生器的使用

```ts

```

```ts
const foo: object = {
  *bar() {
    let index: number = 0;
    while (true) yield index++;
  }
};

const it = foo.bar();
it.next().value;  // 0
it.next().value;  // 1
```

## Async Functions (非同步函式)

```ts
async function foo(x) {  // 10
  let bar = await Promise
    .resolve(x)
    .then(x => x + 2)  // 10 + 2 = 12
    .then(x => x - 3)  // 12 - 3 = 9
    .then(x => x * 4)  // 9 * 4 = 36
    .then(x => x / 5);  // 36 / 5 = 0
  return bar;
}

foo(10).then(x => console.log(x));  // 7.2
```

```ts
async function sleep(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log(2)), x);
  });
}

async function bar() {
  console.log(1);
  await sleep(1000);  // 等待了一秒
  setTimeout(() => console.log(3), 1000);  // 等待了一秒，加自己的一秒
}

bar();
// 1
// 2 (一秒後打印)
// 3 (兩秒後打印)
```

```ts
async function* foo() {
  yield 1;
  await sleep(100);
  yield* [2, 3];
  yield* (async function *() {
    await sleep(100);
    yield 4;
  })();
}
```

```ts
const foo: object = {
  async bar() {
    await sleep(1000);
  }
};
```

非同步比較

```ts
function foo(x) {
  return bar(x).then(data => foo(data));
}

// vs

function* foo(x) {
  let data = yield bar(x);
  let baz = yield foo(data);
  return baz;
}

// vs

async function foo(x) {
  let data = await bar(x);
  let baz = await foo(data);
  return baz;
}

// 還有一個 Observable，如果要在現在環境使用 Observable，需要透過 RxJS 來實現
```

## Decorators (修飾器)

### Class Decorators (類別修飾器)

```ts
const Foo = (value: any) => {
  return (target: any) => {
    target.Foo = value;
    console.log(value);
  }
}

@Foo(123)
class Thing {}  // 123
```

Configurable (可配置的)

```ts
@Foo({
  a: '',
  b: ''
})
class Thing {}
```

### Method Decorators (方法修飾器)

```ts
const Foo = (value: any) => {
  return (target: any, key: any, descriptor: any) => {
    console.log(value);
    return console.log(target, key, descriptor);
  }
}

class Thing {
  @Foo('bar')
  public baz() {}
}
```

Composition (組合)

```ts
class Thing {
  @Foo()
  @Bar()
  public submit() {}
}
```

### Parameter Decorators (參數修飾器)

```ts
const Foo = (target: any, key: any, index: number) => {
  console.log(key, index);
}

class Bar {
  print(@Foo public baz): void {
    console.log(baz);
  }
}

new Bar().print(123);
```

### Property Decorators (屬性修飾器)

```ts
const Foo = (value: any) => {
  return (target: any, key: any, descriptor: any) => {
    console.log(value);
    return console.log(target, key, descriptor);
  }
}

class Thing {
  @Foo('bar') public baz: string;
}
```
