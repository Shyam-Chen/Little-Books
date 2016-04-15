# Angular 2 實戰

### 目錄
* [快速入門](#快速入門)
* [元件](#元件)
* [內建指令](#內建指令)
* [表單與輸入](#表單與輸入)
* [路由與導覽列](#路由與導覽列)
* [指令](#指令)
* [生命週期掛鉤](#生命週期掛鉤)
* [管道](#管道)
* [服務](#服務)
* [伺服器通訊](#伺服器通訊)

***

### 快速入門
```ts
// basic-app.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'basic-app',
  template: `
    <p>Hello {{ 1 + 1 }}</p>
  `
})
export class BasicAppComponent { }
```
`{{}}`表達式
```ts
// hello-world.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'hello-world',
  template: `
    <input type="text" [(ngModel)]="yourName" placeholder="輸入您的姓名">
    <p>Hello {{ yourName }}</p>
  `
})
export class HelloWorldComponent {
  yourName: string = '';
}
```
`[]`綁定　`()`事件

### 元件

### 內建指令

### 表單與輸入

### 路由與導覽列

### 指令

### 生命週期掛鉤

### 管道

### 服務

### 伺服器通訊
