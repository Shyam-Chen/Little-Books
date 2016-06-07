# TypeScript 快速入門

### 目錄
* [型別](#型別)
* [命名空間與模組](#命名空間與模組)
* [模組機制](#模組機制)
* [介面](#介面)
* [函式](#函式)
* [類別](#類別)
* [型別兼容性](#型別兼容性)
* [通用型別](#通用型別)
* [後設資料](#後設資料)
* [泛型](#泛型)
* [型別斷言](#型別斷言)
* [象徵](#象徵)
* [冪運算子](#冪運算子)
* [混入](#混入)
* [合併宣告](#合併宣告)
* [修飾器](#修飾器)

### 型別
```ts
// 布林值
let isDone: boolean = false;
```
```ts
// 數值
let age: number = 18;  // 十進制
```
```ts
// 字串
let myName: string = 'Hale';
// 模板字串
let sentence: string = `My name is ${myName}.`;  // My name is Hale.
```
```ts
// 陣列
let list: number[] = [1, 2, 3];
let list2: string[] = ['a', 'b', 'c'];
// or
let list3: Array<number> = [3, 2, 1];
let list4: Array<string> = ['x', 'y', 'z'];
```
```ts
// 元組
let foo: [number, string];  // 宣告一個元組型別
foo = [123, 'abc'];  // 將 foo 初始化
```
```ts
// 列舉
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
)
```
```ts
// 任意值
let notSure: any = 123;
notSure = 'abc';
notSure = 'true';
```
```ts
// 空值
let unusable: void = undefined;
let unusable2: void = null;

function foo(thing: number): void {
  this.thing = thing;
}
```
```ts
// 型別斷言
let foo: any = 'abc';
let bar = <string>foo;  // 語法: <>
let baz: number = bar.length;  // 3
// or
let bar2 = foo as string;  // 語法: as
let baz2: number = bar2.length;  // 3
```
```ts
// 型別併集
let foo: string | number;

foo = 'abc';  // OK
foo = 123;  // OK
```
```ts
// 型別別名
type ThingType = string | number | boolean;
let foo: ThingType;

foo = 'abc';  // OK
foo = 123;  // OK
foo = true;  // OK
```

### 命名空間與模組
```ts
namespace Thing {
  export let prefix: string = 'ng-';
  export interface Foo { }
  export function bar() {  }
  export class Baz { }
}
```

```ts
// thing.d.ts
declare module 'thing-module' {
  export function fn(): void;
}
```
```ts
// module.ts
/// <reference path="thing.d.ts" />
import * as thing from 'thing-module';
```
##### 使用 Typings
```
$ npm i typings -g
```
```bash
$ npm i core-js -S
$ typings i core-js -G -S
```
```bash
# 自訂
$ mkdir manual_typings
```
```ts
// systemjs-builder.d.ts
declare module 'systemjs-builder' {
  class Builder {
    constructor(configObject?: any, baseUrl?: string, configPath?: string);
    bundle(source: string, target: string, options?: any): Promise<any>;
    buildStatic(source: string, target: string, options?: any): Promise<any>;
  }

  module Builder { }
  export = Builder;
}
```
```ts
// module.ts
import * as Builder from 'systemjs-builder';
```

### 模組機制
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

### 介面
```ts
interface Foo {
  bar: number;
  baz?: string;  // 可選屬性
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

### 函式
```ts
// 設定函式型別
function addition(a: number, b: number): number {
  return a + b;
}

addition(1, 1);  // 2
addition('1', '1');  // Error
```
```ts
// 匿名函式
const addition = function(a: number, b: number): number {
  return a + b;
};

addition(1, 1);  // 2
addition('1', '1');  // Error
```
```ts
// 可選參數
const ng = function(a: string, b: string, c?: string): string {
  return `${a} ${b} ${c}`;
};

ng('Angular', 'Material', 'Firebase');  // Angular Material Firebase
ng('Angular', 'Material');  // Angular Material undefined
ng('Angular');  // Error
```
```ts
// 預設參數
const ng = function(a: string, b: string = 'Angular 2'): string {
  return `${a} and ${b}`;
};

ng('Angular');  // Angular and Angular 2
ng('Angular', 'Material');  // Angular and Material
```

### 類別
```ts
class Foo {
  bar: string;
  constructor() {
    // ...
  }
  baz() {
    // ...
  }
}
```
```ts
// 類別的繼承
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
// 修飾字元
class Thing {
  public foo: string;  // 是 foo: string
  private bar: string;
  protected baz: string;
  constructor() {
    // ...
  }
}
```
```ts
class Name {
  private name: string;
  constructor(private theName: 'string') {
    this.name = theName;
  }
}

new Name('Hale').name;  // Error: 'name' is private
```
```ts
class Adder {
  constructor(a: string) { }  // 是 public a: string

  add = (b: string): string => {
    return this.a + b;
  }
}
```
```ts
// 將類別當作介面使用
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

### 型別兼容性
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

### 通用型別
```ts
const ng: Ng[] = [new Angular(), new Material(), new Firebase()];
```

### 後設資料
```bash
$ npm i core-js -S
```
```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### 泛型
```ts
function identity<T>(arg: T): T {
  return arg;
}

identity(123);  // 123
identity('abc');  // 'abc'
identity(true);  // true
```

### 型別斷言
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

### 象徵
```ts
interface Iterable {
  [Symbol.iterator](): Iterator;
}

interface Iterator {
  next(value?: any): IterationResult;
}

interface IterationResult {
  value: any;
  done: boolean;
}
```

### 冪運算子
```ts
let x = 2 ** 5;  // Math.pow(2, 5)
```

### 混入
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

class SmartObject implements Disposable, Activatable { }
```

### 合併宣告
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

### 修飾器
##### 修飾屬性
```ts
function thing(value: string) {  // 修飾器工廠
  return function (target) {  // 修飾器
    // 一些 target 和 value 的操作
  }
}
```

##### 修飾類別
```ts
function thing(value: string) {  // 修飾器工廠
  return (target) => {  // 修飾器
    // 一些 target 和 value 的操作
  }
}
```

##### 修飾參數
```ts
function thing(target: any, key: string, index: number) {
  // 一些 target 和參數的操作
}
```
