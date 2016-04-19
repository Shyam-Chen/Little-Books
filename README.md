# Angular 2 實戰

### 目錄
* Angular 是什麼
* 環境配置
* [快速入門](#快速入門)
* [元件](#元件)
* [內建指令](#內建指令)
* [表單與輸入](#表單與輸入)
* [路由與導覽列](#路由與導覽列)
* [指令](#指令)
* [生命週期掛鉤](#生命週期掛鉤)
* [管道](#管道)
  * 內建管道
  * 自訂管道
* [服務](#服務)
* [伺服器通訊](#伺服器通訊)
  * Get
  * Post
  * JSONP
* 靜態分析
  * Codelyzer
* 單元測試
  * Jasmine 與 Karma
  * 測試元件
  * 測試指令
  * 測試管道
  * 測試服務
* 情境測試
  * Jasmine 與 Protractor
  * 測試路由操作
* 持續整合
  * Travis CI
  * Codelyzer 集成
  * Karma 集成
  * Protractor 集成
* 為應用程式增加設計
  * Material 是什麼
* 為應用程式增加後端
  * Firebase 是什麼
  * 增刪改查的應用程式
  * 為應用程式增加驗證
* 佈署應用程式
* 參考資源

***

### 快速入門
```ts
// basic-app.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'basic-app',
  template: `
    <p>1 + 1 的結果是: {{ 1 + 1 }}</p>
  `
})
export class BasicAppComponent { }
```

```ts
// my-name.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'my-name',
  template: `
    <p>我的姓名是: {{ myName }}</p>
  `
})
export class MyNameComponent {
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
  public clickMessage: string = '';  // 初始值的設定

  onClickMe() {
    this.clickMessage = '我是點擊後的訊息';
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
##### 元件之間的溝通

### 內建指令
```ts
// see-things.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'see-things',
  template: `
    <p *ngIf="true">我看的到它</p>
    <p *ngIf="false">我看不到它</p>
  `
})
export class SeeThingsComponent { }
```

```ts
// data-list.ts
import { Component } from 'angular2/core';

@Component({
  selector: 'data-list',
  template: `
    <p>程式語言:</p>
    <ul>
      <li *ngFor="#item of list">
        {{ item.label }}
      </li>
    </ul>
    <p>我最喜愛的語言是: {{ favorite.label }}</p>
  `
})
export class DataListComponent {
  public list = [
    { label: 'JavaScript' },
    { label: 'CoffeeScript' },
    { label: 'TypeScript' }
  ];
  public favorite = this.list[1];
}
```


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
```ts
import { Directive, ElementRef, Input } from 'angular2/core';

@Directive({
  selector: '[atHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  @Input('highlight') highlightColor: string;

  private defaultColor = 'yellow';

  constructor(private el: ElementRef) { }

  onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor);
  }
  
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.color = color;
  }
}
```
```html
<form>
  <input type="radio" name="colors" (click)="color='red'">紅色
  <input type="radio" name="colors" (click)="color='green'">綠色
  <input type="radio" name="colors" (click)="color='blue'">藍色
</form>
<span [highlight]="color">滑鼠游標靠過來吧!</span>
```

### 生命週期掛鉤
元件與指令
* ngOnInit
* ngOnChanges
* ngDoCheck
* ngOnDestroy

### 管道

### 服務

### 伺服器通訊
