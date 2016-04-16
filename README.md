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
// my-name.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'my-name',
  template: `
    <p>我的姓名是: {{ myName }}</p>
  `
})
export class BasicAppComponent {
  public myName: string = '陳彥澄'; 
}
```

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
  public yourName: string = '';
}
```
`[]`綁定　`()`事件
`<input [(ngModel)]="thing">` 供雙向資料綁定、解析和驗證表單的資料

### 元件
```ts
// click-me.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'click-me',
  template: `
    <button (click)="onClickMe()">點擊我</button>
    <p>{{ clickMessage }}</p>
  `
})
export class ClickMeComponent {
  public clickMessage: string = '';
  onClickMe() {
    this.clickMessage = 'Hello Angular 2';
  }
}
```
```ts
// add-item.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'add-item',
  template: `
    <input
      #newItem=""
      (keyup.enter)="addItem(newItem.value); newItem.value=''"
      (keyup)="values=newItem.value"
    >
    <p>{{ values }}</p>
    <button (click)="addItem(newItem.value); newItem.value=''; values=''">新增</button>
    <ul>
      <li *ngFor="#item of list">{{ item }}</li>
    </ul>
  `
})
export class AddItemComponent {
  public list: string[] = ['Angular', 'Material', 'Firebase'];  // 預設的清單
  addItem(newItem: string) {
    if (newItem) {  // 防止無輸入的狀態下新增項目
      this.list.push(newItem);
    }
  }
}
```


### 內建指令

### 表單與輸入

### 路由與導覽列
```html
<base href="/">
```
```ts
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['Home']">Home</a> /
      <a [routerLink]="['About']">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [
    ROUTER_DIRECTIVES,
    HomeComponent,
    AboutComponent
  ]
})
@RouteConfig([{
    path: '/',
    name: 'Home',
    component: HomeComponent,
    useAsDefault: true
  }, {
    path: '/about',
    name: 'About',
    component: AboutComponent
}])
export class App { }
```


### 指令

### 生命週期掛鉤
元件與指令
* ngOnInit
* ngOnChanges
* ngDoCheck
* ngOnDestroy

### 管道

### 服務

### 伺服器通訊
