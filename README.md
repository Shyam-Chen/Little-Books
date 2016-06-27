# Angular 2 實戰

### 目錄
* ---------- 啟程 ----------
* [初識 Angular 2](#初識-angular-2)
  * Angular 2 是什麼?
  * 為什麼要 Angular 2?
  * 先決條件
* [環境配置](#環境配置)
  * [既有的樣板](#既有的樣板)
  * [簡單的配置](#簡單的配置)
  * [專案架構](#專案架構)
* ---------- 開發 ----------
* [元件](#元件)
  * [初識元件](#初識元件)
    * [建構子](#建構子)
    * [基本構造](#基本構造)
    * [使用模板](#使用模板)
    * [使用樣式](#使用樣式)
    * [模組識別](#模組識別)
  * [檢視](#檢視)
    * [渲染模板](#渲染模板)
    * [雙向綁定](#雙向綁定)
    * [事件綁定](#事件綁定)
    * [屬性綁定](#屬性綁定)
    * [本地變數](#本地變數)
  * [相互關係](#相互關係)
    * [內容投射](#內容投射)
    * [Shadow DOM](#shadow-dom)
    * [Input 與 Output](#input-與-output)
    * [生命週期掛勾](#生命週期掛勾)
    * [ContentChild 與 ContentChildren](#contentchild-與-contentchildren)
    * [ViewChild 與 ViewChildren](#viewchild-與-viewchildren)
    * [變化檢測](#變化檢測)
* [表單](#表單)
  * [使用表單](#使用表單)
  * 驗證與狀態
  * 錯誤提示
  * 內建驗證
  * 自訂驗證
  * 非同步驗證
* [路由](#路由)
  * [使用路由](#使用路由)
  * [生命週期掛鉤](#生命週期掛鉤)
  * [巢狀路由](#巢狀路由)
* [指令](#指令)
  * [內建指令](#內建指令)
    * [ng-if](#ng-if)
    * [ng-switch](#ng-switch)
    * [ng-for](#ng-for)
    * [ng-style](#ng-style)
    * [ng-class](#ng-class)
    * [ng-plural](#ng-plural)
    * [ng-template-outlet](#ng-template-outlet)
  * [自訂指令](#自訂指令)
* [服務](#服務)
  * 相依性注入
  * 注入器
  * 型別
  * 層疊注入
* [通訊](#通訊)
  * 獲取資料
  * 錯誤處理
  * 平行請求
  * 發送資料
  * 跨域請求
* [管道](#管道)
  * [內建管道](#內建管道)
    * [大小寫](#大小寫)
    * [日期](#日期)
    * [非同步](#非同步)
    * [數值 (十進制)](#數值-十進制)
    * [百分率](#百分率)
    * [貨幣](#貨幣)
    * [JSON](#json)
    * [裁切](#裁切)
    * [替換](#替換)
    * [選擇](@選擇)
    * [複數](#複數)
  * [自訂管道](#自訂管道)
    * [建構子](#建構子)
    * [基本構造](#基本構造)
    * [自訂長度](#自訂長度)
    * [自訂延遲](#自訂延遲)
* [動畫](#動畫)
  * 狀態
  * 漸變
  * 時間軸
  * 影格
  * 平行
* ---------- 測試 ----------
* [靜態分析](#靜態分析)
  * [使用 Codelyzer](#使用-codelyzer)
* [單元測試](#單元測試)
  * Karma
* [端對端測試](#端對端測試)
  * Protractor
* [持續整合](#持續整合)
  * Travis CI
* ---------- 附錄 ----------
* [TypeScript 速成班](https://github.com/Shyam-Chen/Angular2-in-Action/blob/master/typescript-crash-course.md)
* [資源](https://github.com/Shyam-Chen/Angular2-in-Action/tree/master/libs)
  * [Zone.js](https://github.com/Shyam-Chen/Angular2-in-Action/blob/master/libs/zone.js.md)
  * [RxJS](https://github.com/Shyam-Chen/Angular2-in-Action/blob/master/libs/rxjs.md)

***

### 初識 Angular 2

### 環境配置
##### 既有的樣板
* [使用 Angular CLI](https://github.com/angular/angular-cli)
* [使用 Gulp](https://github.com/mgechev/angular2-seed)
* [使用 Webpack](https://github.com/AngularClass/angular2-webpack-starter)

##### 簡單的配置
```bash
$ mkdir ng2-starter
$ cd ng2-starter
```
```js
// package.json
{
  "name": "ng2-starter",
  "version": "1.0.0",
  "scripts": { "start": "lite-server -c bsconfig.json" },
  "devDependencies": { "lite-server": "^2.2.0" }
}
```
```js
// bsconfig.json
{
  "port": 3000,
  "files": ["./src/**/*.{html,css,ts}"],
  "server": {
    "baseDir": "./src"
  }
}
```
```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
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
    <script src="https://npmcdn.com/systemjs@0.19.27/dist/system.src.js"></script>
    <script>
      (function(global) {

        var ngVer = '@2.0.0-rc.3';
        var routerVer = '@3.0.0-alpha.7';
        var formsVer = '@0.1.1';

        var map = {
          'app': 'app',
          '@angular': 'https://npmcdn.com/@angular',
          '@angular/router': 'https://npmcdn.com/@angular/router' + routerVer,
          '@angular/forms': 'https://npmcdn.com/@angular/forms' + formsVer,
          'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api',
          'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6',
          'ts': 'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
          'typescript': 'https://npmcdn.com/typescript@1.9.0-dev.20160409/lib/typescript.js'
       };

        var packages = {
          'app': { main: 'main.ts', defaultExtension: 'ts' },
          'rxjs': { defaultExtension: 'js' },
          'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' }
        };

        var ngPackageNames = [
          'common',
          'compiler',
          'core',
          'http',
          'platform-browser',
          'platform-browser-dynamic',
          'upgrade'
        ];

        ngPackageNames.forEach(function(pkgName) {
          map['@angular/' + pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
        });

        ngPackageNames.forEach(function(pkgName) {
          packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
        });

        packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

        packages['@angular/forms'] = { main: 'index.js', defaultExtension: 'js' };

        var config = {
          transpiler: 'ts',
          typescriptOptions: { tsconfig: true },
          meta: {
            'typescript': { "exports": "ts" }
          },
          map: map,
          packages: packages
        };

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

// 使用 Web Web Workers

import { bootstrapWorkerApp } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';

import { AppComponent } from './app.component';

bootstrapWorkerApp(App, [ROUTER_PROVIDERS]);
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

##### 專案架構
```
.
├── src
│   ├── app
│   │   ├── +about
│   │   │   ├── about.component.ts|html|css|spec.ts|e2e-spec.ts
│   │   │   └── index.ts
│   │   ├── +home
│   │   │   ├── home.component.ts|html|css|spec.ts|e2e-spec.ts
│   │   │   └── index.ts
│   │   ├── app.component.ts|html|css|spec.ts|e2e-spec.ts
│   │   ├── main.ts
│   │   ├── vendor.ts
│   │   └── shared
│   │       ├── data-list.service.ts|spec.ts
│   │       └── index.ts
│   ├── styles
│   ├── assets
│   │   ├── images
│   │   └── fonts
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
├── gulpfile.ts
├── karma.conf.js
├── package.json
├── protractor.conf.js
├── tsconfig.json
├── tslint.json
└── typings.json
```

### 元件

##### 初識元件

###### 建構子
```ts
selector?: string
inputs?: string[]
outputs?: string[]
host?: {[key: string]: string}  // 查看指令章節
providers?: any[]  // 查看服務章節
exportAs?: string  // 查看指令章節
moduleId?: string
viewProviders?: any[]  // 查看服務章節
queries?: {[key: string]: any}
changeDetection?: ChangeDetectionStrategy
templateUrl?: string
template?: string
styleUrls?: string[]
styles?: string[]
animations?: AnimationEntryMetadata[]  // 查看動畫章節
directives?: Array<Type|any[]>  // 查看指令章節
pipes?: Array<Type|any[]>  // 查看管道章節
encapsulation?: ViewEncapsulation
```

###### 基本構造
```ts
import { Component } from '@angular/core';

@Component({
  // 一些組態在這裡
})
export class ThingComponent {
  // 一些程式碼在這裡
}
```

##### 使用模板

(1) `template`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-template',
  template: `<p>Hello Angular 2</p>`
})
export class UseTemplateComponent { }
```

(2) `templateUrl`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-template',
  templateUrl: '../app/use-template.html'
})
export class UseTemplateComponent { }
```
```html
<!-- use-template.html -->
<p>Hello Angular 2</p>
```

##### 使用樣式

(1) `styles`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-template',
  templateUrl: '../app/thing.html',
  styles: [`
    .thing { color: #F44336 }
  `]
})
export class ThingComponent { }
```

(2) `styleUrls`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-thing',
  templateUrl: 'thing.component.html',
  styleUrls: ['thing.component.css']
})
export class ThingComponent { }
```

###### 模組識別
```ts
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'at-thing',  // 加入前綴 `at` (看自己專案要用什麼前綴，這裡是使用 Angular 和 TypeScript 的字首)
  templateUrl: 'thing.component.html',
  styleUrls: ['thing.component.css']
  // 其它更多的組態
})
export class ThingComponent {
  // 一些程式碼在這裡
}
```

```ts
// thing.component.ts
import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,  如果沒有使用它
  selector: 'at-thing',
  templateUrl: './app/+thing/thing.component.html',  // 模板路徑會變得很長
  styleUrls: ['./app/+thing/thing.component.css']  // 樣式路徑也會變得很長
  // 其它更多的組態
})
export class ThingComponent {
  // 一些程式碼在這裡
}
```

##### 檢視

###### 渲染模板
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

###### 雙向綁定
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

###### 事件綁定
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

###### 屬性綁定
語法: `[innerHTML]="表達式"`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <p [innerHTML]="messages"></p>  <!-- 不安全 -->
    
    <!-- 等同於 -->
    <p>{{ messages }}</p>
  `
})
export class BindingPropertiesComponent {
  public messages: string = 'Hello Angular 2';
}
```

語法: `[style.規則]="'表達式'"`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <p
      [style.background-color]="'#E91E63'"
      [style.color]="'#FFFFFF'"
      [style.padding.rem]="'1'"
      [style.width]="'6.5rem'"
    >
    Hello Angular 2</p>
  `
})
export class BindingPropertiesComponent { }
```

語法: `[class.名稱]="條件式"`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `<p [class.at-color]="true">Hello Angular 2</p>`,
  styles: [`.at-color { color: #E91E63 }`]
})
export class BindingPropertiesComponent { }
```

```ts
[attr.name]="expression"
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

###### 本地變數
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

##### 相互關係

###### 內容投射
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

import { ContentProjectionComponent } from './content-projection';

@Component({
  selector: 'app',
  template: `<content-projection>Hi, Angular 2</content-projection>`,
  directives: [ContentProjectionComponent]
})
export class AppComponent { }
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'more-projection',
  template: `
    <ng-content select="[js]"></ng-content>
    <p>Angular 1</p>
    <ng-content select="[coffee]"></ng-content>
    <p>Angular 2</p>
    <ng-content select="[ts]"></ng-content>
  `
})
export class MoreProjectionComponent { }
```
```ts
import { Component } from '@angular/core';

import { MoreProjectionComponent } from './more-projection';

@Component({
  selector: 'app',
  template: `
    <more-projection>
      <p js>Hi, JavaScript</p>
      <p coffee>Hi, CoffeeScript</p>
      <p ts>Hi, TypeScript</p>
    </more-projection>
  `,
  directives: [MoreProjectionComponent]
})
export class AppComponent { }
```

###### Shadow DOM

(1) Emulated
```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'encapsulation-emulated',
  template: `
    <div class="pink-500">
      <p>這是 Emulated</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.Emulated  // 預設值
})
export class EmulatedComponent { }
```
```ts
import { Component } from '@angular/core';

import { EmulatedComponent } from './components/encapsulation-emulated';

@Component({
  selector: 'app',
  template: `
    <div class="pink-500">Hello Angular 2</div>
    <encapsulation-emulated></encapsulation-emulated>
  `,
  styles: [`.pink-500 { color: #E91E63 }`],
  directives: [EmulatedComponent]
})
export class AppComponent { }
```

(2) Native
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'encapsulation-native',
  template: `
    <div class="pink-500">
      <p>這是 Native</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.Native
})
export class NativeComponent { }
```
```ts
import { Component } from '@angular/core';

import { NativeComponent } from './components/encapsulation-native';

@Component({
  selector: 'app',
  template: `
    <div class="pink-500">Hello Angular 2</div>
    <encapsulation-native></encapsulation-native>
  `,
  styles: [`.pink-500 { color: #E91E63 }`],
  directives: [NativeComponent]
})
export class AppComponent { }
```

(3) None
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'encapsulation-none',
  template: `
    <div class="pink-500 other-pink">
      <p>這是 None</p>
    </div>
  `,
  styles: [`
    .other-pink {
      background-color: #E91E63;
      color: #FFFFFF;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class NoneComponent { }
```
```ts
import { Component } from '@angular/core';

import { NoneComponent } from './components/encapsulation-none';

@Component({
  selector: 'app',
  template: `
    <div class="pink-500">Hello Angular 2</div>
    <encapsulation-none></encapsulation-none>
  `,
  styles: [`.pink-500 { color: #E91E63 }`],
  directives: [NoneComponent]
})
export class AppComponent { }
```

###### Input 與 Output

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
  @Input() count: number;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  onClick(): void {
    this.count++;
    this.countChange.emit(this.count);
  }
}
```
```html
<at-counter count="7" (countChange)="$event"></at-counter>
```

###### 生命週期掛勾

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
```

###### ContentChild 與 ContentChildren

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-child',
  template: `
    <p>這是「子」元件 - 1</p>
  `
})
export class ChildComponent {
  public name: string = '這是「子」元件 - 2';
}
```
```ts
import { Component, ContentChild } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  selector: 'at-parent',
  template: `
    <p>這是「父」元件 - 1</p>
    <p>{{ name }}</p>

    <ng-content></ng-content>
    <p>{{ childComponent.name }}</p>
  `
})
export class ParentComponent {
  @ContentChild(ChildComponent) childComponent: ChildComponent;
  public name: string = '這是「父」元件 - 2';
}
```
```ts
import { Component } from '@angular/core';

import { ParentComponent } from './parent.component';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app',
  template: `
    <at-parent>
      <at-child></at-child>
    </at-parent>
  `,
  directives: [
    ParentComponent,
    ChildComponent
  ]
})
export class AppComponent { }
```

###### ViewChild 與 ViewChildren

```ts
@ContentChild()
@ContentChildren()
@ViewChild()
@ViewChildren()

ngAfterContentInit() { ... }
ngAfterContentChecked() { ... }
ngAfterViewInit() { ... }
ngAfterViewChecked() { ... }
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
export class Component {
  @ViewChildren(AComponent) viewChildren: QueryList<AComponent>;
  @ContentChildren(BComponent) contentChildren: QueryList<BComponent>;
  // ...
}
```

```ts
@Component({
  selector: 'app',
  queries: {
    contentChildren: new ContentChildren(ChildDirective),
    viewChildren: new ViewChildren(ChildDirective)
  },
  template: '
    <!-- ... -->
  ',
  directives: [ChildDirective]
})
export class Component {
  contentChildren: QueryList<ChildDirective>,
  viewChildren: QueryList<ChildDirective>
  // ...
}
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

### 表單

https://github.com/angular/angular/tree/master/modules/%40angular/forms/src

```ts
ngForm
ngControl
ngFormControl
ngModel
ngFormModel
ngControlGroup

FormBuilder
Control
ControlArray
ControlContainer
ControlGroup
AbstractControl
Validators
```

|狀態|為`true`時的 CSS 類別|為`false`時的 CSS 類別|
|:-:|:-:|:-:|
|控制已被訪問|`ng-touched`|`ng-untouched`|
|控制的值發生變化|`ng-dirty`|`ng-pristine`|
|控制的值是否有效|`ng-valid`|`ng-invalid`|

##### 使用表單
```ts
// src/app/main.ts
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideForms } from '@angular/forms';

import { AppComponent } from './app.component';

bootstrap(AppComponent, [provideForms()]);
```
```ts
// src/app/app.component.ts
```
```ts
// src/app/form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-form',
  template: `
    <form #atForm="ngForm" novalidate>
      <!-- 一些程式碼寫在這裡 -->
    </form>
  `
})
export class FormComponent { }
```


***

```ts
import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

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
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class FormComponent {
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
export class FormComponent { }
```

##### 驗證與狀態
```ts
this.password = new Control('', Validators.minLength(6));
```

##### 錯誤處理

### 路由
##### 使用路由
```ts
// src/app/main.ts
import { bootstrap } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF } from '@angular/common';

import { APP_ROUTER_PROVIDERS } from './app.routes';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS, {
    provide: APP_BASE_HREF,
    useValue: '/'
  }
]);
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { }
```
```ts
// src/app/app.routes.ts
import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```
```ts
// src/app/+home/home.component.ts
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent { }
```
```ts
// src/app/+home/home.routes.ts
import { HomeComponent } from './index';

export const HomeRoutes = [{
  path: '',
  component: HomeComponent,
  index: true
}];
```
```ts
// src/app/+home/index.ts
export * from './home.component';
export * from './home.routes';
```
```ts
//  src/app/+about/about.component.ts
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'about.component.html',
  styleUrls: ['about.component.css']
})
export class AboutComponent { }
```
```ts
// src/app/+about/about.routes.ts
import { AboutComponent } from './index';

export const AboutRoutes = [{
  path: 'about',
  component: AboutComponent
}];
```
```ts
// src/app/+about/index.ts
export * from './about.component';
export * from './about.routes';
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

###### ng-if
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-ng-if',
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
export class NgIfComponent { }
```

###### ng-switch
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-ng-switch',
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

###### ng-for
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

###### ng-style
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'ng-style',
  template: `
    <p [ngStyle]="{ 'background-color': 'yellow' }"> 
      我的背景是黃色的
    </p>
  `
})
export class NgStyleComponent { }
```

###### ng-class
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

###### ng-plural

###### ng-template-outlet

##### 自訂指令

###### 建構子
```ts
selector?: string
inputs?: string[]
outputs?: string[]
host?: {[key: string]: string}
providers?: any[]
exportAs?: string
queries?: {[key: string]: any}
```
```ts
import { Directive } from '@angular/core';

@Directive({
  /**
   * at-thing
   * [atThing]
   * .at-thing
   * input[type=text]
   */
  selector: '[atThing]'
})
export class ThingDirective { }
```

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[atColor]' })
export class AtColorDirective {
  constructor(element: ElementRef) {
    element.nativeElement.style.color = '#F44336';
  }
}

// 使用渲染器

import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[atColor]' })
export class AtColorDirective {
  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'color', '#F44336');
  }
}
```
```html
<p atColor>Hello Angular 2</p>
```

更多的渲染器
```ts
selectRootElement(selectorOrNode: string | any, debugInfo: RenderDebugInfo) : any
createElement(parentElement: any, name: string, debugInfo: RenderDebugInfo) : any
createViewRoot(hostElement: any) : any
createTemplateAnchor(parentElement: any, debugInfo: RenderDebugInfo) : any
createText(parentElement: any, value: string, debugInfo: RenderDebugInfo) : any
projectNodes(parentElement: any, nodes: any[]) : void
attachViewAfter(node: any, viewRootNodes: any[]) : void
detachView(viewRootNodes: any[]) : void
destroyView(hostElement: any, viewAllNodes: any[]) : void
listen(renderElement: any, name: string, callback: Function) : Function
listenGlobal(target: string, name: string, callback: Function) : Function
setElementProperty(renderElement: any, propertyName: string, propertyValue: any) : void
setElementAttribute(renderElement: any, attributeName: string, attributeValue: string) : void
setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string) : void
setElementClass(renderElement: any, className: string, isAdd: boolean)
setElementStyle(renderElement: any, styleName: string, styleValue: string)  // 我們使用到的
invokeElementMethod(renderElement: any, methodName: string, args: any[])
setText(renderNode: any, text: string)
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

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: 'at-thing',
  exportAs: 'thing'
})
export class ThingDirective { }
```
```ts
import { Component } from '@angular/core';

import { ThingDirective } from './thing.directive'

@Component({
  selector: 'app',
  template: `<at-thing #some="thing"></at-thing>`,
  directives: [ThingDirective]
})
export class AppComponent { }
```

### 服務
```ts
// languages.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesService {
  public js: string = 'JavaScript';
  public coffee: string = 'CoffeeScript';
  public ts: string = 'TypeScript';
}
```
```ts
// app.component.ts
import { Component } from '@angular/core';

import { LanguagesService } from './languages.service';

@Component({
  selector: 'app',
  template: `<p>所決定的語言是: {{ language }}</p>`,
  viewProviders: [LanguagesService]  // 僅限於該元件的模板中使用
})
export class AppComponent {
  constructor(languagesService: LanguagesService) {  // 相依性注入
    this.language = languagesService.ts;
  }
}

// 或者

import { Component } from '@angular/core';

import { LanguagesService } from './languages.service';

@Component({
  selector: 'app',
  template: `<p>所決定的語言是: {{ language }}</p>`,
  viewProviders: [LanguagesService]
})
export class AppComponent {
  constructor() {
    this.languagesService = new LanguagesService();  // 沒有相依性注入
    this.language = this.languagesService.ts;
  }
}


// 使用 Inject 修飾器

import { Component, Inject } from '@angular/core';

import { LanguagesService } from './languages.service';

@Component({
  selector: 'app',
  template: `<p>所決定的語言是: {{ language }}</p>`,
  viewProviders: [LanguagesService]
})
export class AppComponent {
  constructor(@Inject(LanguagesService) languagesService) {
    this.language = languagesService.ts;
  }
}

// 直接寫在模板裡

import { Component } from '@angular/core';

import { LanguagesService } from './languages.service';

@Component({
  selector: 'app',
  template: `<p>所決定的語言是: {{ languagesService.ts }}</p>`,
  viewProviders: [LanguagesService]
})
export class AppComponent {
  constructor(languagesService: LanguagesService) { }
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
export class AppComponent implements OnInit {
  constructor(private listService: ListService) { }
  getList() { this.list = this.listService.getList(); }
  ngOnInit() { this.getList(); }
}
```

```ts
[...]

provide(ColorService, { useClass: RedService })  // RedService 會與 ColorService 為 false

provide(ColorService, { useExisting: RedService })  // RedService 會與 ColorService 為 true

[...]
```

```ts
[...]

provide(ColorService, { useValue: 'red' })

// 會被覆蓋

provide(ColorService, { useValue: 'red' })
provide(ColorService, { useValue: 'blue' })  // 後面會覆蓋前面

[...]
```

```ts
[...]

// 可以
provide(ColorService, { useValue: 'red', multi: true })
provide(ColorService, { useValue: 'blue', multi: true })

// 不可以
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

### 通訊
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

更多的方法
```ts
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
import 'rxjs/add/operator/map';

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
import { COMMON_PIPES } from '@angular/common';  // 導入內建管道

@Component({
  selector: 'at-thing',
  template: `
    <!-- 一些程式碼寫在這裡 -->
  `,
  pipes: [COMMON_PIPES]  // 將內建管道註冊到元件裡
})
export class ThingComponent { }

// [註]: 也是可以不用 COMMON_PIPES 就可以使用內建管道了
```

###### 大小寫
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-uppercase-lowercase',
  template: `
    <p>{{ messages | uppercase }}</p>
    <p>{{ messages | lowercase }}</p>
    <p>{{ messages | uppercase | lowercase }}</p>  <!-- 先 uppercase 再來 lowercase -->
  `
})
export class UppercaseLowercaseComponent {
  public messages: string = 'Angular';
}
```

###### 日期
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-date',
  template: `
    <p>{{ today | date }}</p>
    <p>{{ today | date: 'medium' }}</p>
    <p>{{ today | date: 'short' }}</p>
    <p>{{ today | date: 'fullDate' }}</p>
    <p>{{ today | date: 'longDate' }}</p>
    <p>{{ today | date: 'mediumDate' }}</p>
    <p>{{ today | date: 'shortDate' }}</p>
    <p>{{ today | date: 'mediumTime' }}</p>
    <p>{{ today | date: 'shortTime' }}</p>
  `
})
export class DateComponent {
  public today: Date = new Date();
}
```

###### 非同步
(1)
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-async',
  template: `<p>{{ messages | async }}</p>`
})
export class AsyncComponent {
  public messages: string;
  constructor() {
    this.messages = new Promise((resolve, reject) => {
      setTimeout(() => resolve('三秒後呈現'), 3000);
    });
  }
}
```

(2)
```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'at-async-date',
  template: `<p>{{ timeNow | async | date: 'medium' }}</p>`
})
export class AsyncDateComponent {
  public timeNow: Date;
  constructor() {
    this.timeNow = Observable
      .interval(1000)
      .map(() => new Date());
  }
}
```

###### 數值 (十進制)
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-number',
  template: `
    <!-- number: 整數位數.小數最小位數-小數最大位數 -->
    <p>{{ pi | number: '1.2-5' }}</p> 
  `
})
export class NumberComponent {
  public pi: number = 3.14159265358979;
}
```

###### 百分率
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-percent',
  template: `<p>{{ proficiency | percent: '1.2-2' }}</p>`
})
export class PercentComponent {
  public proficiency: number = 0.703517;
}
```

###### 貨幣
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-currency',
  template: `
    <!-- currency: 貨幣代號: 是否顯示金錢符號: 位數資訊 -->
    <p>{{ price | currency: 'USD': false }}</p>
    <p>{{ price | currency: 'USD': true: '4.2-2' }}</p>
  `
})
export class CurrencyComponent {
  public price: number = 125.18;
}
```

###### JSON
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-json',
  template: `<pre>{{ languages | json }}</pre>`
})
export class JsonComponent {
  public languages: any = {
    'js': 'JavaScript',
    'coffee': 'CoffeeScript',
    'ts': 'TypeScript'
  };
}
```

###### 裁切
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'slice-list',
  template: `
    <ul>
      <!-- 從陣列索引的 1 開始 ~ 到 3 結束，但不包含 3 -->
      <li *ngFor="let item of list | slice: 1:3">{{ item }}</li>  
    </ul>
  `
})
export class SliceListComponent {
  public list: string[] = ['0', '1', '2', '3', '4', '5'];
}
```

###### 替換
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-replace',
  template: `
    <p>{{ 'Angular 2' | replace: ' ':'_' }}</p>
    <p>{{ 'Angular 2' | replace: 'Angular ':'ng' }}</p>
    <p>{{ 'Angular_2_in_Action' | replace: regex:' ' }}</p>
  `
})
export class ReplaceComponent {
  public regex: RegExp = /_/g;
}
```

###### 選擇
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
  public chinese: any = { 'male': '男', 'female': '女' };
}
```

###### 複數
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-i18nPlural',
  template: `
    <p>姓名: {{ messages[0] }}</p>
    <p>年齡: {{ messages[1] }} 歲</p>
    <p>訊息: {{ messages.length | i18nPlural: messageMapping }}</p>
  `
})
export class I18nPluralComponent {
  public messages: any[] = ['陳彥澄', 22];
  public messageMapping: any = {
    '=0': '沒有任何訊息',
    '=1': '只有 1 條訊息',
    'other': '有 # 條訊息'
  };
}
```

##### 自訂管道

###### 建構子
```ts
name: string
pure?: boolean
```

###### 基本構造
```ts
// thing.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'thing' })
export class ThingPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // 一些程式碼寫在這裡
  }
}
```
```ts
// app.component.ts
import { Component } from '@angular/core';

import { ThingPipe } from './thing.pipe';  // 導入所自訂管道

@Component({
  selector: 'app',
  template: `
    <!-- 一些程式碼寫在這裡 -->
  `,
  pipe: [ThingPipe]  // 將所自訂管道註冊到元件中
})
export class AppComponent { }
```

###### 自訂長度
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'length' })
export class LengthPipe implements PipeTransform {
  transform(value: string): number {
    return value.length;
  }
}
```
```html
<p>Angular 2 的字段長度是: {{ 'Angular 2' | length }}</p>
```

###### 自訂延遲
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delay',
  pure: false
})
export class DelayPipe implements PipeTransform {
  public fetchedValue: any;
  public fetchPromise: Promise;

  transform(value: any, seconds: number): any {
    if (!this.fetchPromise) {
      this.fetchPromise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), seconds * 1000);
      });
      
      this.fetchPromise.then((val: any) => this.fetchedValue = val);
    }
    return this.fetchedValue;
  }
}
```
```html
<p>
  <span>{{ '文' | delay: 1 }}</span>
  <span>{{ '字' | delay: 2 }}</span>
  <span>{{ '一' | delay: 3 }}</span>
  <span>{{ '個' | delay: 4 }}</span>
  <span>{{ '一' | delay: 5 }}</span>
  <span>{{ '個' | delay: 6 }}</span>
  <span>{{ '跑' | delay: 7 }}</span>
  <span>{{ '出' | delay: 8 }}</span>
  <span>{{ '來' | delay: 9 }}</span>
</p>
```

### 動畫
```ts
import { Component, animate, state, style, transition, trigger } from '@angular/core';

@Component({
  selector: 'at-thing',
  template: `
    <p @openThing="stateExpression">Hello Angular 2</p>
  `,
  styles: [`
  `],
  animations: [
    trigger('openThing', [
      // ...
    ])
  ]
})
export class ThingComponent {
  public stateExpression: string;
  // ...
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
```ts
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { async, describe, it, expect, inject  } from '@angular/core/testing';

import { AppComponent } from './app.component';

export function main() {
  describe('AppComponent', () => {
    it('should build without a problem',
      async(inject([TestComponentBuilder], (testComponentBuilder: TestComponentBuilder) => {
        testComponentBuilder
          .createAsync(TestComponent)
          .then( () => {
            // ...
          });
      })));
  });
}

@Component({
  selector: 'test-component',
  template: '<app></app>',
  directives: [AppComponent]
})
class TestComponent { }
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
// gulpfile.ts
import * as express from 'express';
import * as history from 'express-history-api-fallback';
import * as gulp from 'gulp';
import { resolve } from 'path';
import { protractor } from 'gulp-protractor';

class Protractor {
  server(port: number, dir: string) {
    let app = express();
    let root = resolve(process.cwd(), dir);
    app.use(express.static(root));
    app.use(history('index.html', { root }));
    return new Promise((resolve, reject) => {
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
    .then((server: any) => {
      gulp
        .src('./src/**/*.e2e-spec.ts')
        .pipe(protractor({ configFile: 'protractor.conf.js' }))
        .on('error', (error: string) => { throw error; })
        .on('end', () => { server.close(done); });
    });
});
```
