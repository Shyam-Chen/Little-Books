# Angular 2 實戰

### 目錄
* [初識 Angular 2](#初識-angular-2)
* [環境配置](#環境配置)
* ----- 開發 -----
* [元件](#元件)
  * [初識元件](#初識元件)
  * [渲染模板](#渲染模板)
  * [雙向綁定](#雙向綁定)
  * [事件綁定](#事件綁定)
  * [屬性綁定](#屬性綁定)
  * [本地變數](#本地變數)
  * [Shadow DOM](#shadow-dom)
  * [變化檢測](#變化檢測)
  * [元件之間的溝通](#元件之間的溝通)
  * [生命週期掛鉤](#生命週期掛鉤)
* [表單](#表單)
  * [使用表單](#使用表單)
  * [驗證與狀態](#驗證與狀態)
  * 錯誤提示
  * 內建驗證
  * 自訂驗證
  * 非同步驗證
  * [錯誤處理](#錯誤處理)
* [路由](#路由)
  * [使用路由](#使用路由)
  * [生命週期掛鉤](#生命週期掛鉤)
  * [巢狀路由](#巢狀路由)
* [指令](#指令)
  * [內建指令](#內建指令)
  * [自訂指令](#自訂指令)
* [服務](#服務)
  * 相依性注入
  * 注入器
  * 型別
  * 層疊注入
* [HTTP](#http)
  * Get
  * 錯誤處理
  * 平行請求
  * Post
  * JSONP
* [管道](#管道)
  * [內建管道](#內建管道)
  * [自訂管道](#自訂管道)
  * 非同步管道
* ----- 測試 -----
* [靜態分析](#靜態分析)
  * [使用 Codelyzer](#使用-codelyzer)
* [單元測試](#單元測試)
  * Karma
* [端對端測試](#端對端測試)
  * Protractor
* [持續整合](#持續整合)
  * Travis CI
* ----- 範例 -----
* [簡單的應用程式](#簡單的應用程式)
* ----- 附錄 -----
* [TypeScript 速成班](https://github.com/Shyam-Chen/Angular2-in-Action/blob/master/typescript-crash-course.md)
* [Zone.js 資源](https://github.com/Shyam-Chen/Angular2-in-Action/blob/master/libs/zone.js.md)
* [RxJS 資源](https://github.com/Shyam-Chen/Angular2-in-Action/blob/master/libs/rxjs.md)

***

### 初識 Angular 2

### 環境配置
##### 優質的樣板
* [使用 Angular CLI](https://github.com/angular/angular-cli)
* [使用 Gulp](https://github.com/mgechev/angular2-seed)
* [使用 Webpack](https://github.com/AngularClass/angular2-webpack-starter)

##### 簡單的配置
```bash
$ mkdir simple-configuration
$ cd simple-configuration
```
```js
// package.json
{
  "name": "simple-configuration",
  "version": "1.0.0",
  "scripts": {
    "start": "lite-server -c config.json"
  },
  "author": "陳彥澄",
  "license": "MIT",
  "devDependencies": {
    "lite-server": "^2.2.0"
  }
}
```
```js
// config.json
{
  "port": 3000,
  "files": ["./src/**/*.{html,css,ts}"],
  "server": {
    "baseDir": "./src"
  }
}
```
```html
<!-- src/index.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>simple-configuration</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://npmcdn.com/core-js/client/shim.min.js"></script>
    <script src="https://npmcdn.com/zone.js@0.6.12?main=browser"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.27/system.js"></script>
    <script>
      (function(global) {
        var ngVer = '@2.0.0-rc.1';

        var map = {
          'app': 'app',
          'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
          'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api',
          'typescript': 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js'
        };

        var packages = {
          'app': {
            main: 'main.ts',
            defaultExtension: 'ts'
          },
          'rxjs': {
            defaultExtension: 'js'
          },
          'angular2-in-memory-web-api': {
            defaultExtension: 'js'
          }
        };

        var packageNames = [
          '@angular/common',
          '@angular/compiler',
          '@angular/core',
          '@angular/http',
          '@angular/platform-browser',
          '@angular/platform-browser-dynamic',
          '@angular/router',
          '@angular/upgrade'
        ];

        packageNames.forEach(function(pkgName) {
          map[pkgName] = 'https://npmcdn.com/' + pkgName + ngVer;
        });

        packageNames.forEach(function(pkgName) {
          packages[pkgName] = {
            main: 'index.js',
            defaultExtension: 'js'
          };
        });

        var config = {
          transpiler: 'typescript',
          typescriptOptions: {
            emitDecoratorMetadata: true
          },
          map: map,
          packages: packages
        }

        if (global.filterSystemConfig) {
          global.filterSystemConfig(config);
        }

        System.config(config);
      })(this);
    </script>
    <script>
      System
        .import('app')
        .catch(function(err) {
          console.error(err);
        });
    </script>
  </head>
  <body>
    <app>Loading...</app>
  </body>
</html>
```
```ts
// src/app/main.ts
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';

import { AppComponent } from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `<h3>Hello Angular 2</h3>`
})
export class AppComponent { }
```
```bash
$ npm start
```

### 元件
##### 初識元件
```ts
import { Component } from '@angular/core';

/**
 * 建構子
 *
 * selector?: string,
 * inputs?: string[],  // 不建議使用
 * outputs?: string[],  // 不建議使用
 * properties?: string[],
 * events?: string[],
 * host?: {[key: string]: string},  // 不建議使用
 * providers?: any[],
 * exportAs?: string,
 * moduleId?: string,
 * viewProviders?: any[],
 * queries?: {[key: string]: any},
 * changeDetection?: ChangeDetectionStrategy,
 * templateUrl?: string,
 * template?: string,
 * styleUrls?: string[],
 * styles?: string[],
 * directives?: Array<Type | any[]>,
 * pipes?: Array<Type | any[]>,
 * encapsulation?: ViewEncapsulation
 */
@Component({
  // 一些組態在這裡
})
export class AtThingComponent {
  // 一些程式碼在這裡
}
```

```ts
import { Component } from '@angular/core';

// 常用的組態
@Component({
  moduleId: module.id,
  selector: 'at-thing',
  templateUrl: 'thing.component.html',
  styleUrls: ['thing.component.css']
  // 其它更多的組態
})
export class AtThingComponent {
  // 一些程式碼在這裡
}
```

##### 渲染模板
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rendering-templates',
  template: `
    <p>1 + 1 的結果是: {{ 1 + 1 }}</p>
    <a href="{{ link }}">網站連結</a>
    <img src="{{ image }}">
  `
})
export class RenderingTemplatesComponent {
  public link: string = 'https://angular.io/';
  public image: string = '../assets/images/angular.png';
}
```

```ts
// 也可以這樣
import { Component } from '@angular/core';

@Component({
  selector: 'my-name',
  template: `<p>我的姓名是: {{ myName }}</p>`
})
export class MyNameComponent {
  public myName: string;
  constructor() { this.myName = '陳彥澄'; }
}
```

##### 雙向綁定
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'two-way-binding',
  template: `
    <input type="text" [(ngModel)]="name" placeholder="輸入你的名字">
    <p>{{ name }}</p>
  `
})
export class TwoWayBindingComponent {
  public name: string = '';
}
```

##### 事件綁定
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'click-me',
  template: `
    <button (click)="onClick()">點擊我</button>
    <p>{{ message }}</p>
  `
})
export class ClickMeComponent {
  public message: string = '我是點擊「前」的訊息';
  onClick(): string { this.message = '我是點擊「後」的訊息'; }
}
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'toggle-me',
  template: `
    <button (click)="onToggle()">點擊我 (切換內容)</button>
    <p>{{ message }}</p>
  `
})
export class ToggleMeComponent {
  public message: string = '你好';
  public toggle: boolean = true;

  onToggle(): boolean | string {
    this.toggle = !this.toggle;
    this.toggle ? this.message = '你好' : this.message = '再見';
  }
}
```

##### 屬性綁定
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `<p>Angular {{ version }}</p>`,
  properties: ['version']
})
export class AtPropertiesComponent { }
```
```html
<!-- 屬性綁定 -->
<binding-properties [version]="2"></binding-properties>
```

```ts
[attr.name]="expression"
[class.name]="condition"
[style.rule]="expression"
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'toggle-class',
  template: `
    <button (click)="isClassVisible = !isClassVisible">Toggle Class</button>
    <p [ngClass]="{ 'at-color': isClassVisible }">Hello Angular 2</p>
  `,
  styles: [`
    .at-color { color: #F44336 }
  `]
})
export class ToggleClassComponent { }
```

##### 本地變數
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'key-up',
  template: `
    <input #new="" (keyup)="onKeyup(new.value)">
    <p>{{ values }}</p>
  `
})
export class KeyUpComponent {
  public valuse: string = '';
  onKeyup(value: string): string { this.values += `${ value } | `; }
}
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'add-item',
  template: `
    <input
      #newItem=""
      (keyup.enter)="addItem(newItem.value); newItem.value=''"
      (keyup)="values = newItem.value"
    >
    <p>{{ values }}</p>
    <button (click)="addItem(newItem.value); newItem.value=''; values=''">新增</button>
    <ul>
      <li *ngFor="let item of list">{{ item }}</li>
    </ul>
  `
})
export class AddItemComponent {
  public list: string[] = ['Angular', 'Material', 'Firebase'];

  addItem(newItem: string) {
    if (newItem) {
      this.list.push(newItem);
    }
  }
}
```

##### Shadow DOM
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'encapsulation-emulated',
  template: `
  `,
  styles: [`
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class Component { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'encapsulation-native',
  template: `
  `,
  styles: [`
  `],
  encapsulation: ViewEncapsulation.Native
})
export class Component { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'encapsulation-none',
  template: `
  `,
  styles: [`
  `],
  encapsulation: ViewEncapsulation.None
})
export class Component { }
```

##### 變化檢測
```ts
import { Component } from '@angular/core';

@Component({
  selector: '',
  template: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Component { }
```

##### 元件之間的溝通
```ts
// 使用 Input 建構子
import { Component } from '@angular/core';

@Component({
  selector: 'use-input',
  template: `<p>Angular {{ version }}</p>`,
  inputs: ['version']
})
export class UseInputComponent {
  public version: string;
}
```
```html
<use-input version="2"></use-input>
```

```ts
// 改用 Input 修飾器
import { Component, Input } from '@angular/core';

@Component({
  selector: 'use-input',
  template: `<p>Angular {{ version }}</p>`
})
export class UseInputComponent {
  @Input() version: string;
}
```

```ts
// 更多的 Input 修飾器
import { Component, Input } from '@angular/core';

@Component({
  selector: 'student-profiles',
  template: `
    <p>學校: {{ schoolName }}</p>
    <p>學號: {{ id }}</p>
  `
})
export class StudentProfilesComponent {
  @Input() schoolName: string;
  @Input('student-id') id: string;
}
```
```html
<student-profiles schoolName="NFU" student-id="40148155"></student-profiles>
```

```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'at-counter',
  template: `
    <button (click)="onClick()">Increment</button>
    <p>Count: {{ count }}</p>
  `
})
export class AtCounterComponent {
  @Input('atCount') count: number = 0;
  @Output('atCountChange') countChange: EventEmitter<number> = new EventEmitter<number>();

  onClick() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```

```ts
@ContentChild()
@ContentChildren()
@ViewChild()
@ViewChildren()
```

```ts
import { Component, ViewChildren, ContentChildren, QueryList } from '@angular/core';
```

```ts
@Component({
  selector: 'at-a',
  template: `
    <p>View Child</p>
  `
})
class AComponent { }
```

```ts
@Component({
  selector: 'at-b',
  template: `
    <p>Content Child</p>
  `
})
class BComponent { }
```

```ts
// QueryList Deprecated
@Component({
  selector: 'at-ab',
  template: '<at-a></at-a>',
  directives: [AComponent]
})
class UserPanel {
  @ViewChildren(AComponent) viewChildren: QueryList<AComponent>;
  @ContentChildren(BComponent) contentChildren: QueryList<BComponent>;
  // ...
}
```

##### 生命週期掛鉤
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'at-lifecycle'
})
export class AtLifecycleComponent implements OnInit {
  ngOnInit(): void {
    console.log('Hello Angular 2');
  }
}
```

```ts
// 還可以用在指令
ngOnInit() { ... }
ngOnChanges() { ... }
ngDoCheck() { ... }
ngOnDestroy() { ... }

// 只能在元件中使用
ngAfterContentInit() { ... }
ngAfterContentChecked() { ... }
ngAfterViewInit() { ... }
ngAfterViewChecked() { ... }
```

### 表單
```ts
ngForm
ngFormControl
ngFormModel
ngControl
ngControlGroup
FormBuilder
Control
ControlArray
ControlContainer
ControlGroup
AbstractControl
```

|狀態|為`true`時的 CSS 類別|為`false`時的 CSS 類別|
|:---:|:---:|:---:|
|控制已被訪問|`ng-touched`|`ng-untouched`|
|控制的值發生變化|`ng-dirty`|`ng-pristine`|
|控制的值是否有效|`ng-valid`|`ng-invalid`|

##### 使用表單
```ts
import { Component } from '@angular/core';
import { FORM_DIRECTIVES, Control, ControlGroup, FormBuilder } from '@angular/common';

@Component({
  selector: 'at-form',
  template: `
    <form [ngFormModel]="group" (ngSubmit)="onSubmit()" novalidate>
      <label for="email">郵箱:</label>
      <input type="email" id="email" [ngFormControl]="email">

      <br><br>

      <label for="password">密碼:</label>
      <input type="password" id="password" [ngFormControl]="password">

      <br><br>

      <button type="submit">註冊</button>
    </form>

    <pre>{{ formValue | json }}</pre>
  `,
  directives: [FORM_DIRECTIVES]
})
export class AtFormComponent {
  public email: Control;
  public password: Control;
  public group: ControlGroup;
  public formValue: any;

  constructor(formBuilder: FormBuilder) {
    this.email = new Control();
    this.password = new Control();

    this.group = formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  onSubmit(): void {
    this.formValue = this.group.value;
  }
}
```

##### 簡單的驗證
```ts
import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

@Component({
  selector: 'at-form',
  template: `
    <form #atForm="ngForm" novalidate>
      <label for="email">郵箱:</label>
      <input type="email" id="email" ngControl="email" #email="ngForm"
        required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
      >
      <span class="error-messages" *ngIf="email.dirty && !email.valid">
        <span *ngIf="email.errors.required">* 這是必填欄位</span>
        <span *ngIf="email.errors.pattern">* 這個格式不正確</span>
      </span>

      <br><br>

      <label for="password">密碼:</label>
      <input type="password" id="password" ngControl="password" #password="ngForm"
        required minlength="6"
      >
      <span class="error-messages" *ngIf="password.dirty && !password.valid">
        <span *ngIf="password.errors.required">* 這是必填欄位</span>
        <span *ngIf="password.errors.minlength">* 密碼最少為 6 碼</span>
      </span>

      <br><br>

      <button type="submit" [disabled]="!atForm.valid">註冊</button>

    </form>
  `,
  styles: [`.error-messages { color: #F44336 }`],
  directives: [FORM_DIRECTIVES]
})
export class AtFormComponent { }
```

##### 驗證與狀態
```ts
this.password = new Control('', Validators.minLength(6));
```

##### 錯誤處理

### 路由
##### 使用路由
```ts
import { APP_BASE_HREF } from '@angular/common';
import { provide } from '@angular/core';

// ...

bootstrap(AppComponent, [
  // ...
  provide(APP_BASE_HREF, { useValue: '/' }),
  // ...
]);
```
```ts
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['/home']">Home</a> /
      <a [routerLink]="['/about']">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@Routes([{
    path: '/home',
    component: HomeComponent
  }, {
    path: '/about',
    component: AboutComponent
}])
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void { this.router.navigate(['/home']); }
}
```

##### 路由生命週期掛鉤
```ts
OnActivate() { ... }
```

##### 巢狀路由
```ts
import { Component } from '@angular/core';
import { OnActivate, RouteSegment, Router, RouteTree } from '@angular/router';

@Component({
  template: `
    
  `,
})
export class CrisisListComponent implements OnActivate {
  private routeSegment: RouteSegment;

  constructor(private router: Router) { }

  routerOnActivate(curr: RouteSegment, prev: RouteSegment, currTree: RouteTree) { }
}
```

### 指令
##### 內建指令
```ts
// see-things.ts
import { Component } from '@angular/core';

@Component({
  selector: 'see-things',
  template: `
    <p *ngIf="true">我看的到它</p>
    <p *ngIf="false">我看不到它</p>

    <!-- or -->

    <template [ngIf]="true">
      <p>我看的到它</p>
    </template>
    <template [ngIf]="false">
      <p>我看不到它</p>
    </template>
  `
})
export class SeeThingsComponent { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'ng-switch',
  template: `
    <div [ngSwitch]="language">
      <p *ngSwitchWhen="'JavaScript'">Angular 2 in JavaScript</p>
      <p *ngSwitchWhen="'CoffeeScript'">Angular 2 in CoffeeScript</p>
      <p *ngSwitchWhen="'TypeScript'">Angular 2 in TypeScript</p>
      <p *ngSwitchDefault>Something Else</p>
    </div>
  `
})
export class NgSwitchComponent {
  public language: string = 'TypeScript';
}
```

```ts
import { Component } from '@angular/core';

interface List {
  label: string;
}

@Component({
  selector: 'ng-for',
  template: `
    <p>Technologies:</p>
    <ul>
      <li *ngFor="let item of list; let i = index">
        ({{ i + 1 }}) {{ item.label }}
      </li>
    </ul>
  `
})
export class NgForComponent {
  public list: List[] = [
    { label: 'ECMAScript' },
    { label: 'HTML5' },
    { label: 'Node.js' }
  ];
}
```

```ts
import { Component } from '@angular/core';

interface List {
  language: string;
}

@Component({
  selector: 'at-edit',
  template:`
    <h3>程式語言</h3>
    <ul>
      <li *ngFor="let item of list">
        <span>{{ item.language }}</span>
        <button (click)="onEdit(item)">編輯</button>
      </li>
    </ul>
    <div *ngIf="edited">
      <div>
        <label>語言: </label>
        <input [(ngModel)]="edited.language">
        <button (click)="onSave()">確定</button>
      </div>
    </div>
  `
})
export class EditComponent {
  public list: List[] = [
    { "language": "JavaScript" },
    { "language": "CoffeeScript" },
    { "language": "TypeScript" }
  ];;

  public edited: List;

  onEdit(item: List) {
    this.edited = item;
  }
  
  onSave() {
    this.edited = false;
  }
}
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'ng-style',
  template: `
    <!-- 模板表達式 -->
    <p [style.background-color]="'yellow'">
      我的背景是黃色的
    </p>

    <!-- 內建指令 -->
    <p [ngStyle]="{ 'background-color': 'yellow' }"> 
      我的背景也是黃色的
    </p>
  `
})
export class NgStyleComponent { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'ng-class',
  template: `
    <p [ngClass]="{ 'at-color': true }">Angular 2</p>
    <p [ngClass]="{ 'at-color': false }">TypeScript</p>
  `,
  styles: [`
    .at-color {
      color: #F44336
    }
  `]
})
export class NgClassComponent { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'content-projection',
  template: `
    <p>Hi, TypeScript</p>
    <ng-content></ng-content>
  `
})
export class ContentProjectionComponent { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'more-content',
  template: `
    <ng-content select="[js]"></ng-content>
    <p>Angular 1</p>
    <ng-content select="[coffee]"></ng-content>
    <p>Angular 2</p>
    <ng-content select="[ts]"></ng-content>
  `
})
export class MoreContentComponent { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'ng-non-bindable',
  template: `
    <p>Hello {{ content }}</p>
    <p ngNonBindable>Hello {{ content }}</p>
  `
})
export class NgNonBindableComponent {
  public content: string = 'Angular 2';
}
```

##### 自訂指令
```ts
import { Directive } from '@angular/core';

@Directive({
  /**
   * at-thing
   * [atThing]
   * .at-thing
   * input[type=text]
   */
  selector: ''
})
export class AtThingDirective { }
```

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[atColor]'
})
export class AtColorDirective {
  constructor(private element: ElementRef) {
    element.nativeElement.style.color = '#F44336';
  }
}
```

```ts
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[at-title]'
})
export class TitleDirective {
  public useTitle: boolean = true;

  @HostBinding('[class.title]')
  get title {
    return this.useTitle;
  }
}
```

```ts
import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[atHighlight]'
})
export class HighlightDirective {
  @Input('atHighlight') highlightColor: string;

  private defaultColor: string = 'yellow';

  constructor(private element: ElementRef) { }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor);
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
```
```html
<form>
  <input type="radio" name="colors" (click)="color='#F44336'">紅色
  <input type="radio" name="colors" (click)="color='#4CAF50'">綠色
  <input type="radio" name="colors" (click)="color='#2196F3'">藍色
</form>
<span [atHighlight]="color">滑鼠游標靠過來吧!</span>
```

### 服務
```ts
// languages.ts
import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesService {
  public js: string = 'JavaScript';
  public coffee: string = 'CoffeeScript';
  public ts: string = 'TypeScript';
}
```
```ts
// app.ts
import { Component } from '@angular/core';

import { LanguagesService } from './services/languages';

@Component({
  selector: 'app',
  template: `
    <h3 class="title">Languages Service</h3>
    <div class="content">
      <p>Decided Language: {{ language }}</p>
    </div>
  `,
  viewProviders: [
    LanguagesService  // 僅限於該元件的模板中使用
  ]
})
export class App {
  public language: string = '';

  constructor(private languages: LanguagesService) {
    this.language = languages.ts;
  }
}

// or

import { Component, Inject } from '@angular/core';

import { LanguagesService } from './services/languages';

@Component({
  selector: 'app',
  template: `
    <h3 class="title">Languages Service</h3>
    <div class="content">
      <p>Decided Language: {{ language }}</p>
    </div>
  `,
  viewProviders: [
    LanguagesService
  ]
})
export class App {
  public language: string = '';

  constructor(@Inject(LanguagesService) private languages) {
    this.language = languages.ts;
  }
}

// or

import { Component } from '@angular/core';

import { LanguagesService } from './services/languages';

@Component({
  selector: 'app',
  template: `
    <h3 class="title">Languages Service</h3>
    <div class="content">
      <p>Decided Language: {{ languages.ts }}</p>
    </div>
  `,
  viewProviders: [
    LanguagesService
  ]
})
export class App {
  constructor(private languages: LanguagesService) { }
}
```

```ts
import { Injectable } from '@angular/core';

interface List {
  label: string;
}

@Injectable()
export class ListService {
  private LIST: List[] = [
    { label: 'JavaScript' },
    { label: 'CoffeeScript' },
    { label: 'TypeScript' }
  ];
  getList() { return this.LIST; }
}
```
```ts
import { Component, Inject } from '@angular/core';

import { ListService } from './services/list';

@Component({
  selector: 'app',
  template: `
    <ul>
      <li *ngFor="let item of list">{{ item.label }}</li>
    </ul>
  `,
  viewProviders: [ListService]
})
export class AppComponent mplements OnInit {
  constructor(private listService: ListService) { }
  getList() { this.list = this.listService.getList(); }
  ngOnInit() { this.getList(); }
}
```

```ts
[...]

provide(ColorService, { useClass: RedService })

provide(ColorService, { useExisting: RedService })

[...]
```

```ts
[...]

provide(ColorService, { useValue: 'red' })

[...]
```

```ts
[...]

provide(ColorService, { useValue: 'red' })
provide(ColorService, { useValue: 'blue', multi: true })

[...]
```

```ts
[...]

provide(ColorService, { useFactory: () => { return x + y; }})

[...]
```

```ts
import { Inject, Injectable, Injector, OpaqueToken, provide } from '@angular/core';
```

### HTTP
```ts
[...]

import { HTTP_PROVIDERS } from '@angular/http';

[...]

@Component({
  [...]

  providers: [HTTP_PROVIDERS]

  [...]
})

[...]
```
```js
// data.json
{
  "title": "Angular2-in-Action",
  "description": "Angular 2 實戰"
}
```
```ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'get-data',
  template: `
    <pre>{{ response }}</pre>
  `
})
export class GetDataComponent {
  constructor(private http: Http, private changeDetectorRef: ChangeDetectorRef) {
    http
      .get('./assets/data.json')
      .subscribe((data) => {
        this.response = data._body;
        changeDetectorRef.detectChanges();
      });
  }
}
```

```ts
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'on-request',
  template: `
    <button type="button" (click)="onRequest()">請求</button>
    <pre>{{ response | json }}</pre>
  `
})
export class OnRequestComponent {
  public response: Object;

  constructor(private http: Http) { }

  onRequest() {
    this.http
      .request('./assets/data.json')  // or .get('./assets/data.json')
      .subscribe((res: Response) => {
        this.response = res.json();
      });
  }
}
```
```ts
import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod } from '@angular/http';

@Injectable()
export class OnRequestService {
  constructor(private http: Http) { }

  onRequest(url: string) {
    return this.http
      .request(new Request({
        method: RequestMethod.Get,
        url: url
      }));
  }
}
```

```ts
// class Http
request(url: string | Request, options?: RequestOptionsArgs) : Observable<Response>
get(url: string, options?: RequestOptionsArgs) : Observable<Response>
post(url: string, body: string, options?: RequestOptionsArgs) : Observable<Response>
put(url: string, body: string, options?: RequestOptionsArgs) : Observable<Response>
delete(url: string, options?: RequestOptionsArgs) : Observable<Response>
patch(url: string, body: string, options?: RequestOptionsArgs) : Observable<Response>
head(url: string, options?: RequestOptionsArgs) : Observable<Response>
```

```ts
import{ Http, Response, RequestOptions, Headers } from'@angular/http';
```

```ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  constructor(private http: Http) { }

  getPosts() {
    return this.http
      .get('./posts.json')
      .map(res => res.json())
      .map(res => res.posts);
  }
}
```

```ts
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WikipediaService {
  constructor(private jsonp: Jsonp) { }

  search(term: string) {
    let wikiUrl = 'http://en.wikipedia.org/w/api.php';

    let params = new URLSearchParams();
    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
      .get(wikiUrl, { search: params })
      .map(request => <string[]>request.json()[1]);
  }
}
```

```ts
// 平行請求

[...]

import { Observable } from 'rxjs/Observable';

[...]

Observable
  .forkJoin(
    this.http.get('./data-1.json').map((res: Response) => res.json()),
    this.http.get('./data-2.json').map((res: Response) => res.json())
  )
  .subscribe(
    // ...
  )

[...]
```

### 管道
##### 內建管道
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-pipes',
  template: `
    <p>{{ thing | uppercase }}</p>
    <p>{{ thing | lowercase }}</p>
    <p>{{ thing | uppercase | lowercase }}</p>  <!-- 先 uppercase 再來 lowercase -->
  `
})
export class AtPipesComponent {
  public thing: string = 'Angular';
}
```
```ts
import { Component } from '@angular/core';

// https://angular.io/docs/ts/latest/api/common/index/DatePipe-class.html
@Component({
  selector: 'at-date',
  template: `
    <p>{{ atDate | date: "MM/dd" }}</p>
  `
})
export class DateComponent {
  public atDate = new Date(2020, 2, 14);
}
```
```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'at-date2',
  template: `
    {{ atDate | async | date: 'medium' }}    
  `
})
export class Date2Component {
  public atDate = Observable
    .interval(1000)
    .map( () => { new Date(); });
}
```

```ts
[...]

@Component({
  selector: 'at-async',
  template: `
    <p>Wait for it... {{ data | async }}</p>
  `
})
export class AsyncComponent {

[...]
```

```ts
[...]

@Component({
  selector: 'at-number',
  template: `
    <p>pi (no formatting): {{ pi }}</p>

    <!-- 整數位數.小數最小位數-小數最大位數 -->
    <p>pi (2.2-6): {{ pi | number: '2.2-6' }}</p>
  `
})
export class NumberComponent {
  public pi: number = 3.14159265358979;
}
```
```ts
[...]

@Component({
  selector: 'at-percent',
  template: `
    <p>{{ pi | percent }}</p>
    <p>{{ pi | percent: '3.2-5' }}</p>
  `
})
export class PercentComponent {
  public pi: number = 3.14159265358979;
}
```
```ts
[...]

@Component({
  selector: 'at-currency',
  template: `
    <!-- currency: 貨幣代號: 是否顯示金錢符號: 位數資訊 -->
    <p>{{ price | currency: 'USD': false }}</p>
    <p>{{ price | currency: 'USD': true: '4.2-2' }}</p>
  `
})
export class CurrencyComponent {
  public price: number = 3.14159265358979;
}
```

```ts
[...]

@Component({
  selector: 'at-json',
  template: `
    <button type="button" (click)="onRequest()">請求</button>
    <pre>{{ response | json }}</pre>
  `
})
export class JsonComponent {

[...]
```

```ts
[...]

@Component({
  selector: 'slice-list',
  template: `
    <ul>
      <!-- 從陣列索引的 1 開始 ~ 到 3 結束，但不包含 3 -->
      <!-- Array.prototype.slice -->
      <li *ngFor="let item of list | slice: 1:3">{{ item }}</li>  
    </ul>
  `
})
export class SliceListComponent {
  public list: string[] = ['0', '1', '2', '3', '4', '5'];
}
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-i18nSelect',
  template: `
    <p>{{ gender | i18nSelect: chinese }}</p>
  `
})
export class I18nSelectComponent {
  public gender: string = 'male';
  public chinese: any = {
    'male': '男',
    'female': '女'
  }
}
```

```ts
I18nPlural Pipe
```


```ts
Replace Pipe
```

##### 自訂管道
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class MessageLengthPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    return `${value.length}`
  }
}
```

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class InputSearchPipe implements PipeTransform {
  transform() {
  }
}
```

### 靜態分析
##### 使用 Codelyzer
```bash
$ npm i tslint codelyzer -D
```
```js
// tslint.json
{
  "rulesDirectory": ["node_modules/codelyzer"],
  "rules":{
    // 一些 TSLint 的規則在這裡

    // Codelyzer 的規則
    "directive-selector-name": [true, "camelCase"],
    "component-selector-name": [true, "kebab-case"],
    "directive-selector-type": [true, "attribute"],
    "component-selector-type": [true, "element"],
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-host-property-decorator": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "use-life-cycle-interface": true,
    "use-pipe-transform-interface": true,
    "component-class-suffix": true,
    "directive-class-suffix": true
  }
}
```
```bash
$ tslint src/**/*.ts  # 把它封裝在 package.json 的 scripts
```

### 單元測試
```js
// test-main.js
if (!Object.hasOwnProperty('name')) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function() {
      var matches = this.toString().match(/^\s*function\s*(\S*)\s*\(/);
      var name = matches && matches.length > 1 ? matches[1] : "";
      Object.defineProperty(this, 'name', {value: name});
      return name;
    }
  });
}

Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function() {};

System.config({
  baseURL: '/base/'
});

System.config({
  defaultJSExtensions: true,
  map: {
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs'
  },
  packages: {
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/http': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/router': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs': {
      defaultExtension: 'js'
    }
  }
});

Promise
  .all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ])
  .then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.setBaseTestProviders(
      testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
      testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
    );
  })
  .then(function() {
    return Promise.all(
      Object
        .keys(window.__karma__.files)
        .filter(onlySpecFiles)
        .map(file2moduleName)
        .map(function(path) {
          return System.import(path).then(function(module) {
            if (module.hasOwnProperty('main')) {
              module.main();
            } else {
              throw new Error('Module ' + path + ' does not implement main() method.');
            }
          });
        })
    );
  })
  .then(
    function() {
      __karma__.start();
    },
    function(error) {
      console.error(error.stack || error);
      __karma__.start();
    }
  );

function onlySpecFiles(path) {
  var patternMatched = __karma__.config.files ? path.match(new RegExp(__karma__.config.files)) : true;
  return patternMatched && /[\.|_]spec\.js$/.test(path);
}

function file2moduleName(filePath) {
  return filePath
    .replace(/\\/g, '/')
    .replace(/^\/base\//, '')
    .replace(/\.js$/, '');
}
```
```js
// karma.conf.js
module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // Polyfills.
      'node_modules/core-js/client/shim.min.js',

      // System.js for module loading
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',

      // Zone.js dependencies
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },


      { pattern: 'test-main.js', included: true, watched: true },
      { pattern: 'built/test/matchers.js', included: true, watched: true },

      // paths loaded via module imports
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true },

      // Our built application code
      { pattern: 'built/**/*.js', included: false, watched: true },

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: 'built/**/*.html', included: false, watched: true },
      { pattern: 'built/**/*.css', included: false, watched: true },

      // paths to support debugging with source maps in dev tools
      { pattern: 'src/**/*.ts', included: false, watched: false },
      { pattern: 'built/**/*.js.map', included: false, watched: false }
    ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      "/app/": "/base/built/app/"
    },

    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}
```

### 端對端測試
```bash
$ npm i protractor -D
$ typings i dt~angular-protractor -G -S
$ typings i dt~selenium-webdriver -G -S
```
```js
// protractor.conf.js
const tsNode = require('ts-node');
const jasmineSpecReporter = require('jasmine-spec-reporter');

const config = {
  directConnect: true,
  specs: ['./src/**/*.e2e-spec.ts'],
  exclude: [],
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:9876/',
  beforeLaunch() {
    tsNode.register({ project: 'e2e' });
  },
  onPrepare() {
    let SpecReporter = jasmineSpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));

    browser.ignoreSynchronization = false;
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: false
  },
  useAllAngular2AppRoots: true
};

exports.config = config;
```
```ts
// hello-e2e.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'hello-e2e',
  template: `
    <button (click)="onClick()">點擊我</button>
    <p>{{ message }}</p>
  `
})
export class HelloE2EComponent {
  public message: string = '';

  onClick(): string {
    this.message = 'Hello E2E';
  }
}
```
```ts
// hello-e2e.component.e2e-spec.ts
describe('HelloE2EComponent', () => {

  beforeEach( () => {
    browser.get('/');
  });

  it('should have a content', () => {
    element(by.css('hello-e2e')).click();
    expect(element(by.css('hello-e2e p')).getText()).toEqual('Hello E2E');
  });

});
```
```bash
$ webdriver-manager update
$ protractor protractor.conf.js
```

### 持續整合
```bash
# .travis.yml
language: node_js
node_js:
  - 4
  - 5
  - stable

sudo: false

os:
  - linux
  - osx

matrix:
  exclude:
    - os: osx
      node_js: 4
    - os: osx
      node_js: 5

cache:
  directories: node_modules

before_install:
  - if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then brew update; fi
  - if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then brew outdated xctool || brew upgrade xctool; fi
  - if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then brew tap caskroom/cask; fi

before_script:
  - if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then export DISPLAY=:99.0; fi
  - if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then sh -e /etc/init.d/xvfb start; fi
  - if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then nohup bash -c "webdriver-manager start 2>&1 &"; fi

script:
  - npm run gulp -- build
  - npm run gulp -- lint
  - npm run gulp -- unit
  - npm run gulp -- e2e
```

```js
// karma.conf.js

```

```js
// protractor.conf.js
[...]

const config = {
  [...]
};

// 將端對端整合至 Travis 上
if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;
```

```bash
$ npm i express gulp-protractor -D
```

```js
// gulpfile.js
// import * as express from 'express';
const express = reuqire('express');
// import { protractor, webdriver_update } from 'gulp-protractor';
const protractor = require('gulp-protractor').protractor;
const webdriver_update = require('gulp-protractor').webdriver_update;

class Protractor {
  server(port, dir) {
    let app = express();
    app.use(express.static(dir));
    return new Promise( (resolve, reject) => {
      let server = app.listen(port, () => {
        resolve(server);
      });
    });
  }
}

gulp.task('webdriver', webdriver_update);

gulp.task('e2e', (done) => {
  new Protractor()
    .server(9876, './public')
    .then((server) => {
      gulp
        .src('./src/**/*.e2e-spec.ts')
        .pipe(protractor({ configFile: 'protractor.conf.js' }))
        .on('error', (error) => { throw error; })
        .on('end', () => { server.close(done); });
    });
});
```

### 簡單的應用程式
