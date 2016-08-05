# Angular 2 實戰手冊

### 目錄
* [第一個應用程式](#第一個應用程式)
  * [設定環境](#設定環境)
  * [開始使用](#開始使用)
  * [專案架構](#專案架構)
  * [既有的樣板](#既有的樣板)
* [模組](#模組)
  * [模組建構子](#模組建構子)
  * [模組起點](#模組起點)
* [元件](#元件)
  * [基本元件](#基本元件)
    * [元件建構子](#元件建構子)
    * [元件起點](#元件起點)
    * [使用模板](#使用模板)
    * [使用樣式](#使用樣式)
    * [模組識別](#模組識別)
  * [檢視](#檢視)
    * [渲染模板](#渲染模板)
    * [雙向綁定](#雙向綁定)
    * [事件綁定](#事件綁定)
    * [屬性綁定](#屬性綁定)
    * [區域變數](#區域變數)
  * [內容投射](#內容投射)
    * [單一投射](#單一投射)
    * [選擇投射](#選擇投射)
  * [相互溝通](#相互溝通)
    * [Input 與 Output](#input-與-output)
    * [ContentChild 與 ContentChildren](#contentchild-與-contentchildren)
    * [ViewChild 與 ViewChildren](#viewchild-與-viewchildren)
  * [隔離樣式](#隔離樣式)
    * [Emulated](#emulated)
    * [Native](#native)
    * [None](#none)
  * [變化檢測](#變化檢測)
    * [OnPush](#onpush)
    * [Default](#default)
  * [生命週期掛鉤](#生命週期掛鉤)
    * [OnInit](#oninit)
    * [OnDestroy](#ondestroy)
    * [OnChanges](#onchanges)
    * [DoCheck](#docheck)
* [表單](#表單)
  * [基本表單](#基本表單)
    * [啟動表單](#啟動表單)
    * [表單方法](#表單方法)
  * [模板驅動](#模板驅動)
    * 基本模板驅動
    * 驗證綁定
  * [模型驅動](#模型驅動)
    * 基本模型驅動
    * 驗證表單
    * 自訂驗證
* [路由](#路由)
  * [基本路由](#基本路由)
  * [巢狀路由](#巢狀路由)
  * [子路由](#子路由)
  * 路由守衛
* [指令](#指令)
  * [內建屬性型指令](#內建屬性型指令)
    * [ng-style](#ng-style)
    * [ng-class](#ng-class)
  * [內建結構型指令](#內建結構型指令)
    * [ng-if](#ng-if)
    * [ng-switch](#ng-switch)
    * [ng-for](#ng-for)
    * [ng-plural](#ng-plural)
    * [ng-template-outlet](#ng-template-outlet)
  * [自訂指令](#自訂指令)
    * [指令建構子](#指令建構子)
    * [指令起點](#指令起點)
    * [簡單的指令](#簡單的指令)
    * [實體變數](#實體變數)
    * [屬性型指令](#屬性型指令)
    * [結構型指令](#結構型指令)
* [服務](#服務)
  * [可注入的服務](#可注入的服務)
    * [服務起點](#服務起點)
    * [建立服務](#建立服務)
    * [使用服務](#使用服務)
    * [沒有相依性注入](#沒有相依性注入)
    * [Inject 修飾器](#inject-修飾器)
    * [完整的服務](#完整的服務)
  * [定義相依性](#定義相依性)
    * [useClass](#useclass)
    * [useExisting](#useexisting)
    * [useValue](#usevalue)
    * [multi](#multi)
    * [useFactory](#usefactory)
    * [deps](#deps)
  * [層疊注入器](#層疊注入器)
  * [控制相依性](#控制相依性)
    * [Optional 與 Host](#optional-與-host)
    * [Self 與 SkipSelf](#self-與-skipself)
* [通訊](#通訊)
  * [獲取資料](#獲取資料)
    * [啟動 HTTP](#啟動-http)
    * [基本的 Get](#基本的-get)
    * [建立 Get 服務](#建立-get-服務)
    * [準備資料](#準備資料)
    * [操作服務](#操作服務)
    * [倒退為 Promise](#倒退為-promise)
    * [捕獲錯誤](#捕獲錯誤)
  * [發送資料](#發送資料)
    * [建立 Post 服務](#建立-post-服務)
    * [執行服務](#執行服務)
  * [編輯資料](#編輯資料)
  * [刪除資料](#刪除資料)
  * [跨域請求](#跨域請求)
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
    * [選擇](#選擇)
    * [複數](#複數)
  * [自訂管道](#自訂管道)
    * [管道建構子](#管道建構子)
    * [管道起點](#管道起點)
    * [字節管道](#字節管道)
    * [延遲管道](#延遲管道)
* [動畫](#動畫)
  * 狀態
  * 漸變
  * 時間軸
  * 影格
  * 平行
* [測試](#測試)
  * [靜態分析](#靜態分析)
    * [配置 Codelyzer](#配置-codelyzer)
    * 理解規則
  * [單元測試](#單元測試)
    * 配置 Karma
    * [第一個單元測試](#第一個單元測試)
    * 測試元件
    * 測試指令
    * 測試服務
    * 測試管道
    * 測試動畫
  * [端對端測試](#端對端測試)
    * [配置 Protractor](#配置-protractor)
    * [第一個端對端測試](#第一個測試)
    * 測試表單
    * 測試路由
    * 測試通訊
  * [持續整合](#持續整合)
    * [配置 Travis CI](#配置-travis-ci)
    * [建立應用程式](#建立應用程式)
    * [整合靜態分析](#整合靜態分析)
    * [整合單元測試](#整合單元測試)
    * [整合端對端測試](#整合端對端測試)
* 下一站
  * 使用者介面
    * Material
  * 後端即服務
    * Firebase
  * 行動應用
    * Ionic
  * 伺服器渲染
    * Universal 

***

## 第一個應用程式

### 設定環境
```bash
# 建立名為 ng2-starter 的資料夾
$ mkdir ng2-starter

# 切到名為 ng2-starter 的資料夾
$ cd ng2-starter
```
```js
/*
 * ```bash
 * # 建立名為 package.json 的檔案
 * $ touch package.json
 * ```
 */

// package.json
{
  "name": "ng2-starter",
  "version": "1.0.0",
  "scripts": {
    "start": "lite-server -c config.json"
  },
  "devDependencies": {
    "lite-server": "^2.2.0"
  }
}
```
```js
/*
 * ```bash
 * # 建立名為 config.json 的檔案
 * $ touch config.json
 * ```
 */

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
<!--
 * ```bash
 * # 建立名為 src 的資料夾
 * $ mkdir src
 *
 * # 在 src 資料夾內，建立名為 index.html 的檔案
 * $ touch src/index.html
 * ```
 -->

<!-- src/index.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Angular 2 in Action</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://npmcdn.com/core-js/client/shim.min.js"></script>
    <script src="https://npmcdn.com/systemjs@0.19.31/dist/system.src.js"></script>
    <script src="https://npmcdn.com/zone.js@0.6.12?main=browser"></script>
    <script src="./system.config.js"></script>
    <script>
      System.import('app').catch(function(err){console.error(err);});
    </script>
  </head>
  <body>
    <app>Loading...</app>
  </body>
</html>
```
```js
/*
 * ```bash
 * # 在 src 資料夾內，建立名為 system.config.js 的檔案
 * $ touch src/system.config.js
 * ```
 */

// src/system.config.js
(function(global) {

  var ngVer = '@2.0.0-rc.4';
  var routerVer = '@3.0.0-beta.2';
  var formsVer = '@0.2.0';

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
    typescriptOptions: { tsconfig: false },
    meta: {
      'typescript': { "exports": "ts" }
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);
```
```ts
/*
 * ```bash
 * # 在 src 資料夾內，建立名為 app 的資料夾
 * $ mkdir src/app
 *
 * # 在 src/app 資料夾內，建立名為 main.ts 的檔案
 * $ touch src/app/main.ts
 * ```
 */

// src/app/main.ts
import { bootstrap } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

bootstrap(AppComponent, []);
```
```ts
/*
 * ```bash
 * # 在 src/app 資料夾內，建立名為 app.component.ts 的檔案
 * $ touch src/app/app.component.ts
 * ```
 */

// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>第一個應用程式</p>
  `
})
export class AppComponent { }
```
```bash
# 安裝相依性套件
$ npm install

# 啟動應用程式
$ npm start
```

完整的專案可以從這裡下載：[前往](https://github.com/Shyam-Chen/Angular2TS-Quick-Start)

### 開始使用
```ts
// src/app/new.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-new',  // 加入前綴 at (看自己專案要用什麼前綴，這裡是使用 Angular 和 TypeScript 的字首)
  template: `
    <p>這是新建立的元件</p>
  `
})
export class NewComponent { }
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

import { NewComponent } from './new.component';  // 導入新建立的元件

@Component({
  selector: 'app',
  template: `
    <p>第一個應用程式</p>
    <at-new></at-new>  <!-- 使用新建立的元件 -->
  `,
  directives: [NewComponent]  // 將新建立的元件註冊到 app 元件裡
})
export class AppComponent { }
```

### 專案架構
```
.
├── src
│   ├── app
│   │   ├── app.component.ts
│   │   ├── new.component.ts
│   │   └── main.ts
│   ├── index.html
│   └── system.config.js
├── config.json
└── package.json
```

### 既有的樣板
* [使用 Angular CLI](https://github.com/angular/angular-cli)
* [使用 Gulp](https://github.com/mgechev/angular2-seed)
* [使用 Webpack](https://github.com/AngularClass/angular2-webpack-starter)

## 模組
RC.5
```ts
import { AppModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NameComponent } from './name.component';

@AppModule({
  modules: [BrowserModule],
  precompile: [NameComponent]
})
export class MainModule {
  constructor(public applicationRef: ApplicationRef) { }
}
```

### 模組建構子
```ts
directives: []
pipes: []
providers: []
precompile: []
modules: []
```

### 模組起點
```ts
import { AppModule } from '@angular/core';

@AppModule({
  // ...
})
export class NameModule {
  // ...
}
```

## 元件

### 基本元件

#### 元件建構子
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
interpolation?: [string, string]
precompile?: Array<Type|any[]>  // 查看模組章節
```

#### 元件起點
```ts
import { Component } from '@angular/core';

@Component({
  // ...
})
export class NameComponent {
  // ...
}
```

#### 使用模板

(1) `template`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-template',
  template: `
    <p>Hello Angular 2</p>
  `
})
export class UseTemplateComponent { }
```

(2) `templateUrl`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-template',
  templateUrl: './app/use-template.component.html'
})
export class UseTemplateComponent { }
```
```html
<!-- use-template.component.html -->
<p>Hello Angular 2</p>
```

#### 使用樣式

(1) `styles`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-styles',
  template: `
    <p class="at-color">Hello Angular 2</p>
  `,
  styles: [`
    .at-color {
      color: #F44336;
    }
  `]
})
export class UseStylesComponent { }
```

(2) `styleUrls`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-styles',
  templateUrl: './app/use-styles.component.html',
  styleUrls: ['./app/use-styles.component.css']
})
export class UseStylesComponent { }
```
```html
<!-- use-styles.component.html -->
<p class="at-color">Hello Angular 2</p>
```
```css
/* use-styles.component.css */
.at-color {
  color: #F44336;
}
```

#### 模組識別
```ts
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'at-name',
  templateUrl: 'name.component.html',
  styleUrls: ['name.component.css']
})
export class NameComponent { }
```

```ts
// name.component.ts
import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,  如果沒有使用它
  selector: 'at-name',
  templateUrl: './app/name.component.html',  // 模板路徑會變得很長
  styleUrls: ['./app/name.component.css']  // 樣式路徑也會變得很長
})
export class NameComponent { }
```

### 檢視

#### 渲染模板
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rendering-templates',
  template: `
    <!-- 插值表達式 -->
    <p>1 + 1 的結果是: {{ 1 + 1 }}</p>
    <p>一則訊息: {{ message }}</p>
    <p>我的名字是: {{ name }}</p>
    <p>這是可以選擇的: {{ optional? }}</p>

    <!-- HTML 的屬性綁定 -->
    <a href="{{ link }}">網站連結</a>
    <img src="{{ image }}">
  `
})
export class RenderingTemplatesComponent {
  public message: string = 'Hello Angular 2';
  public name: string;
  public optional: void = undefined;
  public link: string = 'https://angular.io/';
  public image: string = '../assets/images/angular.png';

  constructor() {
    this.name = '陳彥澄';
  }
}
```

如果你不喜歡 Angular 預設，也是可以自訂插值的符號
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>{{{ messages }}}</p>
  `,
  interpolation: ['{{{', '}}}']
})
export class AppComponent {
  public messages: string = 'Hello Angular 2';
}
```

#### 雙向綁定
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'two-way-binding',
  template: `
    <input type="text" [(ngModel)]="name" placeholder="輸入你的名字">
    <p>{{ name }}</p>

    <!-- [註]: ngModel 指令可以查看表單章節 -->
  `
})
export class TwoWayBindingComponent {
  public name: string = '';
}
```

#### 事件綁定
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'click-me',
  template: `
    <!-- 觸發 DOM 事件 -->
    <button (click)="onClick()">點擊我</button>

    <!-- 或者 -->
    <button on-click="onClick()">點擊我</button>

    <p>{{ message }}</p>
  `
})
export class ClickMeComponent {
  public message: string = '我是點擊「前」的訊息';

  onClick(): void {
    this.message = '我是點擊「後」的訊息';
  }
}
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'toggle-me',
  template: `
    <button (click)="onToggle()">點擊我</button>
    <p>{{ message }}</p>
  `
})
export class ToggleMeComponent {
  public message: string = '你好';
  public toggle: boolean = true;

  onToggle(): void {
    this.toggle = !this.toggle;
    this.toggle ? this.message = '你好' : this.message = '再見';
  }
}
```

#### 屬性綁定

(1) 基本
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <a [href]="url">Angular 2 官網</a>

    <!-- 也可以這樣 -->
    <a bind-href="url">Angular 2 官網</a>

    <!-- 都等同於 -->
    <a href="{{ url }}">Angular 2 官網</a>
  `
})
export class BindingPropertiesComponent {
  public url: string = 'https://angular.io/';
}
```

(2) `[innerHTML]="表達式"`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <p [innerHTML]="messages"></p>  <!-- 這並不安全 -->

    <!-- 等同於 -->
    <p>{{ messages }}</p>
  `
})
export class BindingPropertiesComponent {
  public messages: string = 'Hello Angular 2';
}
```

(3) `[style.規則]="'表達式'"`
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

(4) `[class.名稱]="條件式"`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <p [class.at-color]="true">Hello Angular 2</p>
  `,
  styles: [`
    .at-color {
      color: #E91E63;
    }
  `]
})
export class BindingPropertiesComponent { }
```

切換 CSS 類別
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'toggle-class',
  template: `
    <button (click)="isClassVisible = !isClassVisible">點擊我</button>
    <p [class.at-color]="isClassVisible">注意看我字體的顏色</p>
  `,
  styles: [`
    .at-color {
      color: #F44336;
    }
  `]
})
export class ToggleClassComponent { }
```

(5) `[attr.名稱]="表達式"`
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <p [attr.at-version]="version">Angular</p>
  `
})
export class BindingPropertiesComponent {
  public version: number = 2;
}
```
```html
<p at-version="2">Angular</p>
```

#### 區域變數
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'local-variable',
  template: `
    <input #new="" (keyup)="onKeyup(new.value)">
    <p>{{ messages }}</p>
  `
})
export class LocalVariableComponent {
  public messages: string = '';

  onKeyup(value: string): void {
    this.messages += `${ value } | `;
  }
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
      (keyup)="messages = newItem.value"
    >
    <p>{{ messages }}</p>
    <button (click)="addItem(newItem.value); newItem.value=''; messages=''">新增</button>
    <ul>
      <li *ngFor="let item of list">{{ item }}</li>
    </ul>
  `
})
export class AddItemComponent {
  public list: string[] = ['Angular', 'Material', 'Firebase'];

  addItem(newItem: string): void {
    if (newItem) {
      this.list.push(newItem);
    }
  }
}
```

### 內容投射

#### 單一投射
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

import { ContentProjectionComponent } from './content-projection.component';

@Component({
  selector: 'app',
  template: `
    <content-projection>Hi, Angular 2</content-projection>
  `,
  directives: [ContentProjectionComponent]
})
export class AppComponent { }
```

#### 選擇投射
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'more-projection',
  template: `
    <p>原本的內容</p>
    <ng-content select="[at-attr]"></ng-content>
    <ng-content select=".at-style"></ng-content>
    <ng-content select="span"></ng-content>

    <!-- 無法選擇 ID -->
    <ng-content select="#thing"></ng-content>

    <!-- 相同的選擇器無法重複渲染 -->
    <ng-content select="span"></ng-content>
  `
})
export class MoreProjectionComponent { }
```
```ts
import { Component } from '@angular/core';

import { MoreProjectionComponent } from './more-projection.component';

@Component({
  selector: 'app',
  template: `
    <more-projection>
      <p at-attr>選擇 HTML 屬性</p>
      <p class="at-style">選擇 CSS 樣式</p>
      <span>選擇 HTML 標籤</span>

      <!-- 這個不會被渲染 -->
      <p id="thing">ID 無法被選擇</p>
    </more-projection>
  `,
  directives: [MoreProjectionComponent]
})
export class AppComponent { }
```

### 相互溝通

#### Input 與 Output

(1) Input 建構子
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-input',
  template: `
    <p>Angular {{ version }}</p>
  `,
  inputs: ['version']
})
export class UseInputComponent {
  public version: string;
}
```
```ts
import { Component } from '@angular/core';

import { UseInputComponent } from './use-input.component';

@Component({
  selector: 'app',
  template: `
    <!-- 直接綁定到原字串上 -->
    <use-input version="2"></use-input>
  `,
  directives: [UseInputComponent]
})
export class AppComponent { }
```

```ts
[...]

@Component({
  selector: 'app',
  template: `
    <!-- 在父的作用域內綁定到一個變數上 -->
    <use-input [version]="value"></use-input>
  `,
  directives: [UseInputComponent]
})
export class AppComponent {
  public value: number = 2;
}
```

(2) Input 修飾器
```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'use-input',
  template: `
    <p>Angular {{ version }}</p>
  `
})
export class UseInputComponent {
  @Input() version: string;
}
```

(3) 自訂名稱
```ts
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

(4) Output 建構子
```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'at-counter',
  template: `
    <button (click)="onClick()">點擊我</button>
    <p>計數: {{ count }}</p>
  `,
  outputs: ['countChange']
})
export class CounterComponent {
  @Input() count: number;
  public countChange: EventEmitter<number> = new EventEmitter<number>();

  onClick(): void {
    this.countChange.emit(this.count++);
  }
}
```
```ts
import { Component } from '@angular/core';

import { CounterComponent } from './counter.component';

@Component({
  selector: 'app',
  template: `
    <at-counter count="0" (countChange)="onChange($event)"></at-counter>
  `,
  directives: [CounterComponent]
})
export class AppComponent {
  onChange(event): number {
    return event;
  }
}
```

(5) Output 修飾器
```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'at-counter',
  template: `
    <button (click)="onClick()">點擊我</button>
    <p>計數: {{ count }}</p>
  `
})
export class CounterComponent {
  @Input() count: number;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  onClick(): void {
    this.countChange.emit(this.count++);
  }
}
```

#### ContentChild 與 ContentChildren

(1) ContentChild
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

(2) ContentChildren
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
import { Component, ContentChildren, QueryList } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  selector: 'at-parent',
  template: `
    <p>這是「父」元件 - 1</p>
    <p>{{ name }}</p>

    <ng-content></ng-content>
    <p *ngFor="let childComponent of childComponents">
      {{ childComponent.name }}
    </p>
  `
})
export class ParentComponent {
  @ContentChildren(ChildComponent) childComponents: QueryList<ChildComponent>;
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
      <at-child></at-child>
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

(3) 生命週期掛鉤
```ts
import { Component, ContentChildren, QueryList, AfterContentInit, AfterContentChecked } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  [...]
})
export class ParentComponent implements AfterContentInit, AfterContentChecked {
  [...]

  // 使用 AfterContentInit
  ngAfterContentInit() {
    console.log('AfterContentInit 開始');
    console.log(this.childComponents);
    console.log('AfterContentInit 結束');
  }

  // 使用 AfterContentChecked
  ngAfterContentChecked() {
    console.log('AfterContentChecked 開始');
    console.log(this.childComponents);
    console.log('AfterContentChecked 結束');
  }
}
```

(4) 查找
```ts
import { Component, ContentChildren } from '@angular/core';

@Component({
  queries: {
    childComponents: new ContentChildren(ChildComponent)
  }
})
export class NameComponent {
  // ...
}
```

#### ViewChild 與 ViewChildren

(1) ViewChild
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-child',
  template: `
    <p>這是「子」元件</p>
  `
})
export class ChildComponent {
  onLog(): void {
    console.log('一個日誌');
  }
}
```
```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  selector: 'at-parent',
  template: `
    <p>這是「父」元件</p>
    <at-child></at-child>
  `,
  directives: [ChildComponent]
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) childComponent: ChildComponent;

  ngAfterViewInit(): void {
    this.childComponent.onLog();
  }
}
```
```ts
import { Component } from '@angular/core';

import { ParentComponent } from './parent.component';

@Component({
  selector: 'app',
  template: `
    <at-parent></at-parent>
  `,
  directives: [ParentComponent]
})
export class AppComponent { }
```

使用字串選擇
```ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  selector: 'at-parent',
  template: `
    <p>這是「父」元件</p>
    <at-child #child></at-child>
  `,
  directives: [ChildComponent]
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('child') childComponent: ChildComponent;

  ngAfterViewInit(): void {
    this.childComponent.onLog();
  }
}
```

(2) ViewChildren
```ts
import { Component, ViewChildren, QueryList } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  selector: 'at-parent',
  template: `
    <p>這是「父」元件</p>
    <at-child></at-child>
    <at-child></at-child>
    <at-child></at-child>
  `,
  directives: [ChildComponent]
})
export class ParentComponent {
  @ViewChildren(ChildComponent) childComponents: QueryList<ChildComponent>;
}
```

(3) 生命週期掛鉤
```ts
import { Component, ViewChildren, QueryList, AfterViewInit, AfterViewChecked } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  [...]
})
export class ParentComponent implements AfterViewInit, AfterViewChecked {
  [...]

  // 使用 AfterViewInit
  ngAfterViewInit() {
    console.log('AfterViewInit 開始');
    console.log(this.childComponents);
    console.log('AfterViewInit 結束');
  }

  // 使用 AfterViewChecked
  ngAfterViewChecked() {
    console.log('AfterViewChecked 開始');
    console.log(this.childComponents);
    console.log('AfterViewChecked 結束');
  }
}
```

(4) 查找
```ts
import { Component } from '@angular/core';

@Component({
  queries: {
    childComponents: new ViewChildren(ChildComponent)
  }
})
export class NameComponent {
  // ...
}
```

#### Query 與 ViewQuery

(1) Query 建構子
```ts
import { Component, ViewChildren } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <!-- ... -->
  `,
  queries: {
    childComponents: new ViewChildren(ChildComponent)
  }
})
export class Component {
  // ...
}
```

(2) Query 修飾器
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-child',
  template: `
    <p>這是「子」元件 - 1</p>
  `
})
export class ChildComponent {
  public messages: string = '這是「子」元件 - 2';
}
```
```ts
import { Component, Query, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'at-parent',
  template: `
    <!-- ... -->
  `
})
export class ParentComponent {
  constructor(
    @Query('messages') elementRefQuery: QueryList<ElementRef>,
    @Query(ChildComponent) childComponentQuery: QueryList<ElementRef>,
    @Query('thing', { descendants: true }) childComponentThing: QueryList<ElementRef>
  ) { }
  // ...
}
```
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <at-parent>
      <p #messages>{{ messages }}</p>
      <at-child>
        <p #thing>{{ thing }}</p>
      </at-child>
    </at-parent>
  `,
  directives: [
    ParentComponent,
    ChildComponent
  ]
})
export class AppComponent {
  public messages: string = '';
}
```

(3) ViewQuery 修飾器
```ts
// 匹配的條件是從 ViewChildren
```

### 隔離樣式

#### Emulated
```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'encapsulation-emulated',
  template: `
    <div class="pink-500">
      <p>這是 Emulated</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.Emulated
})
export class EmulatedComponent { }
```
```ts
import { Component } from '@angular/core';

import { EmulatedComponent } from './encapsulation-emulated.component';

@Component({
  selector: 'app',
  template: `
    <div class="pink-500">Hello Angular 2</div>
    <encapsulation-emulated></encapsulation-emulated>
  `,
  styles: [`
    .pink-500 {
      color: #E91E63;
    }
  `],
  directives: [EmulatedComponent]
})
export class AppComponent { }
```

#### Native
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

import { NativeComponent } from './encapsulation-native.component';

@Component({
  selector: 'app',
  template: `
    <div class="pink-500">Hello Angular 2</div>
    <encapsulation-native></encapsulation-native>
  `,
  styles: [`
    .pink-500 {
      color: #E91E63;
    }
  `],
  directives: [NativeComponent]
})
export class AppComponent { }
```

#### None
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

import { NoneComponent } from './encapsulation-none.component';

@Component({
  selector: 'app',
  template: `
    <div class="pink-500">Hello Angular 2</div>
    <encapsulation-none></encapsulation-none>
  `,
  styles: [`
    .pink-500 {
      color: #E91E63;
    }
  `],
  directives: [NoneComponent]
})
export class AppComponent { }
```

### 變化檢測

#### OnPush
```ts
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'change-detection',
  template: `
    <p>{{ onePiece.name }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionComponent {
  @Input() onePiece: string;
}
```
```ts
export class OnePiece {
  constructor(public name: string) { }
}
```
```ts
import { Component } from '@angular/core';

import { ChangeDetectionComponent } from './change-detection.component';
import { OnePiece } from './one-piece.model';

@Component({
  selector: 'app',
  template: `
    <button (click)="changeProperty()">改變屬性</button>
    <button (click)="changeObject()">改變物件</button>
    <change-detection [onePiece]="onePiece"></change-detection>
  `,
  directives: [ChangeDetectionComponent]
})
export class AppComponent {
  public onePiece: OnePiece = new OnePiece('魯夫');

  changeProperty(): void {
    this.onePiece.name = '薩波';
  }

  changeObject(): void {
    this.onePiece = new OnePiece('艾斯');
  }
}
```

#### Default
```ts
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'change-detection',
  template: `
    <p>{{ onePiece.name }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.Default  // 改成 Default，就能改變屬性
})
export class ChangeDetectionComponent {
  @Input() onePiece: string;
}
```

### 生命週期掛鉤

#### OnInit
```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>Hello Angular 2</p>
  `
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log('Hello Angular 2');
  }
}
```

#### OnDestroy
```ts
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'at-lifecycle',
  template: `
    <p>Hello Angular 2</p>
  `
})
export class LifecycleComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log('On init');
  }

  ngOnDestroy(): void {
    console.log('On destroy');
  }
}
```
```ts
import { Component } from '@angular/core';

import { LifecycleComponent } from './lifecycle.component';

@Component({
  selector: 'app',
  template: `
    <button (click)="onToggle()">點擊我</button>
    <at-lifecycle *ngIf="display"></at-lifecycle>
  `,
  directives: [LifecycleComponent]
})
export class AppComponent {
  public display: boolean = true;

  onToggle(): void {
    this.display = !this.display;
  }
}
```

#### OnChanges
```ts
import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'at-lifecycle',
  template: `
    <p>{{ messages }}</p>
  `
})
export class LifecycleComponent implements OnChanges {
  @Input() messages: string;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes:', changes['messages'].currentValue);
  }
}
```
```ts
import { Component } from '@angular/core';

import { LifecycleComponent } from './lifecycle.component';

@Component({
  selector: 'app',
  template: `
    <button (click)="onClick()">點擊我</button>
    <at-lifecycle [messages]="messages"></at-lifecycle>
  `,
  directives: [LifecycleComponent]
})
export class AppComponent {
  public messages: string = 'Hello Angular 2';

  onClick(): void {
    this.messages = 'Goodbye Angular 2';
  }
}
```

#### DoCheck
```ts
import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'at-lifecycle',
  template: `
    <p>計數: {{ count }}</p>
  `
})
export class LifecycleComponent implements DoCheck {
  @Input() count: number;

  ngDoCheck(): void {
    console.log('Do Check');
  }
}
```
```ts
import { Component } from '@angular/core';

import { LifecycleComponent } from './lifecycle.component';

@Component({
  selector: 'app',
  template: `
    <button (click)="onClick()">點擊我</button>
    <at-lifecycle [count]="count"></at-lifecycle>
  `,
  directives: [LifecycleComponent]
})
export class AppComponent {
  public count: number = 0;

  onClick(): void {
    this.count++;
  }
}
```

## 表單

### 基本表單

#### 啟動表單
```ts
// src/app/main.ts
import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app.component';

bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms()
]);
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <form>
      <!-- ... -->
    </form>
  `
})
export class AppComponent { }
```

#### 表單方法
```ts
// 指令
ngControl
ngFormControl
ngModel
ngFormModel
ngControlGroup

// 服務
Control()
ControlGroup()
ControlArray()
FormBuilder
Validators
```

### 模板驅動
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <form #atForm="ngForm">
      <div ngControlGroup="user">
        <div>
          <label for="name1">中文名:</label>
          <input type="text" id="name1"
            ngControl="name1" [(ngModel)]="account.user.name1" #name1="ngForm"
          >
        </div>
        <br>
        <div>
          <label for="name2">英文名:</label>
          <input type="text" id="name2"
            ngControl="name2" [(ngModel)]="account.user.name2" #name2="ngForm"
          >
        </div>
      </div>
    </form>
    <hr>
    <pre>{{ atForm.value | json }}</pre>
    <p>{{ name1.value }} - {{ name2.value }}</p>
  `
})
export class AppComponent {
  public account = {
    user: {
      name1: '陳彥澄',
      name2: 'Chen Yen-Cheng'
    }     
  }
}
```

### 模型驅動

```ts
import { Component } from '@angular/core';
import { ControlGroup, Control } from '@angular/common';

@Component({
  selector: 'app',
  template: `
    <form [ngFormModel]="form">
      <div ngControlGroup="user">
        <label for="name">姓名:</label>
        <input type="text" id="name"
          ngControl="name" #name="ngForm"
        >
      </div>
    </form>
    <hr>
    <p>{{ name.value }}</p>
  `
})
export class AppComponent {
  public form = new ControlGroup({
    user: new ControlGroup({
      name: new Control('陳彥澄')
    })
  });
}
```

```ts
import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app',
  template: `
    <form [formGroup]="atForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">姓名:</label>
        <input type="text" id="name" [formControl]="name">
      </div>
      <div>
        <label for="email">郵箱:</label>
        <input type="email" id="email" [formControl]="email">
      </div>
      <button type="submit">送出</button>
    </form>
    <p>{{ message1 }} {{ message2 }}</p>
  `,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class AppComponent {
  public atForm: FormGroup;
  public name: FormControl;
  public email: FormControl;

  constructor(formBuilder: FormBuilder) {
    this.name = new FormControl('陳彥澄');
    this.email = new FormControl('chenyencheng@gmail.com');

    this.atForm = formBuilder.group({
      name: this.name,
      email: this.email
    });
  }

  onSubmit(): void {
    this.message1 = this.atForm.value.name;
    this.message2 = this.atForm.value.email;
  }
}
```

```ts
import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app',
  template: `
    <form [formGroup]="atForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">姓名:</label>
        <input type="text" id="name" [formControl]="name">
        <span class="has-error" [hidden]="name.valid || name.untouched">
          <span [hidden]="!name.hasError('required')">必填欄位</span>
          <span [hidden]="!name.hasError('minlength')">最小輸入 2 個字</span>
          <span [hidden]="!name.hasError('maxlength')">最多輸入 4 個字</span>
        </span>
      </div>
      <div>
        <label for="email">郵箱:</label>
        <input type="email" id="email" [formControl]="email">
        <span class="has-error" [hidden]="email.valid || email.untouched">
          <span [hidden]="!email.hasError('required')">必填欄位</span>
          <span [hidden]="!email.hasError('pattern')">格式不正確</span>
        </span>
      </div>
      <button type="submit" [disabled]="!atForm.valid">送出</button>
    </form>
    <p>{{ message1 }} {{ message2 }}</p>
  `,
  styles: [`
    .has-error {
      color: #F44336;
    }
  `],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class AppComponent {
  public atForm: FormGroup;
  public name: FormControl;
  public email: FormControl;

  constructor(formBuilder: FormBuilder) {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      // Validators.pattern('...')
    ]);

    this.atForm = formBuilder.group({
      name: this.name,
      email: this.email
    });
  }

  onSubmit(): void {
    this.message1 = this.atForm.value.name;
    this.message2 = this.atForm.value.email;
  }
}
```

## 路由

### 基本路由
```ts
// src/app/main.ts
import { bootstrap } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  { provide: APP_BASE_HREF, useValue: '' },
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]);
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['/home']">Home</a>
      <a [routerLink]="['/about']">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { }
```
```ts
// src/app/app.routes.ts
import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```
```ts
// src/app/home.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <p>Home Page</p>
  `
})
export class HomeComponent { }
```
```ts
//  src/app/about.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <p>About Page</p>
  `
})
export class AboutComponent { }
```

### 巢狀路由
```ts
// src/app/app.routes.ts
import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { LinkComponent } from './link.component';

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/:id', component: LinkComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```
```ts
//  src/app/about.component.ts
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  template: `
    <p>About Page</p>
    <ul *ngFor="let id of links">
      <li>
        <a [routerLink]="[id]">Link {{ id }}</a>
      </li>
    </ul>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class AboutComponent {
  public links: number[] = [1, 2, 3];
}
```
```ts
//  src/app/link.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  template: `
    <p>About Page - Link {{ id | async }}</p>
  `
})
export class LinkComponent {
  public id: Observable<string>;

  constructor(activatedRoute: ActivatedRoute) {
    this.id = activatedRoute
      .params
      .map(activatedRoute => activatedRoute.id);
  }
}
```

### 子路由
```ts
[...]

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/:id', component: LinkComponent, children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'essential', component: EssentialComponent }
  ]}
];

[...]
```

## 指令

### 內建屬性型指令
```ts
import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';  // 導入內建指令

@Component({
  selector: 'at-name',
  template: `
    <!-- ... -->
  `,
  directives: [CORE_DIRECTIVES]  // 將內建指令註冊到元件裡
})
export class NameComponent { }
```

#### ng-if
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-ng-if',
  template: `
    <p *ngIf="true">我看的到它</p>
    <p *ngIf="false">我看不到它</p>

    <!-- 或者 -->

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

#### ng-switch
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

#### ng-for
```ts
export interface List {
  label: string;
}
```
```ts
import { Component } from '@angular/core';

import { List } from './list.interface';

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
export interface List {
  language: string;
}
```
```ts
import { Component } from '@angular/core';

import { List } from './list.interface';

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
    { language: 'JavaScript' },
    { language: 'CoffeeScript' },
    { language: 'TypeScript' }
  ];;

  public edited: List;

  onEdit(item: List): void {
    this.edited = item;
  }

  onSave(): void {
    this.edited = false;
  }
}
```

#### ng-style
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'ng-style',
  template: `
    <p 
      [ngStyle]="{
        'background-color': '#F44336',
        'color': '#FFFFFF'
      }"
    >
    我的背景是紅的，而字體是白的</p>
  `
})
export class NgStyleComponent { }
```

#### ng-class
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'ng-class',
  template: `
    <p [ngClass]="{ 'at-color': true }">字體是紅的</p>
    <p [ngClass]="{ 'at-color': false, 'at-background': true }">背景是紅的</p>
  `,
  styles: [`
    .at-color { color: #F44336 }
    .at-background { background-color: #F44336 }
  `]
})
export class NgClassComponent { }
```

#### ng-plural
```ts
import { Component, provide } from '@angular/core';
import { NgLocalization } from '@angular/common';

import { LocalizationService } from './localization.service';

@Component({
  selector: 'app',
  template: `
    <button (click)="onClick()">增加數量</button>
    <p>數量: {{ value }}個</p>
    <div [ngPlural]="value">
      <template ngPluralCase="=0">沒有任何東西</template>
      <template ngPluralCase="=1">已經放入一個東西</template>
      <template ngPluralCase="=2">已經放入兩個東西</template>
      <template ngPluralCase="many">已經放入了很多東西</template>
      <template ngPluralCase="excess">已經超出負荷量了</template>
    </div>
  `,
  providers: [
    { provide: NgLocalization, useClass: LocalizationService }
  ]
})
export class AppComponent {
  public value: number = 0;

  onClick(): void {
    this.value += 1;
  }
}
```
```ts
import { NgLocalization } from '@angular/common';

export class LocalizationService extends NgLocalization {
  getPluralCategory(value: number): string {
    if (value <= 10) {
      return 'many';
    } else {
      return 'excess';
    }
  }
}
```

#### ng-template-outlet
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <template
      [ngTemplateOutlet]="atTemplate" [ngOutletContext]="{ items: ng }"
    ></template>

    <template #atTemplate let-items="items">
      <p>{{ items }} {{ version }}</p>
    </template>
  `
})
export class AppComponent {
  public ng: string = 'Angular';
  public version: number = 2;
}
```

### 自訂指令

#### 指令建構子
```ts
selector?: string
inputs?: string[]  // 查看元件章節
outputs?: string[]  // 查看元件章節
host?: {[key: string]: string}
providers?: any[]  // 查看服務章節
exportAs?: string
queries?: {[key: string]: any}  // 查看元件章節
```

#### 指令起點
```ts
import { Directive } from '@angular/core';

@Directive({
  // ...
})
export class NameDirective {
  // ...
}
```

#### 簡單的指令
```ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[atColor]'
})
export class ColorDirective {
  constructor(element: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'color', '#F44336');
  }
}
```
```ts
import { Component } from '@angular/core';

import { ColorDirective } from './color.directive';

@Component({
  selector: 'app',
  template: `
    <p atColor>Hello Angular 2</p>
  `,
  directives: [ColorDirective]
})
export class AppComponent { }
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

#### 實體變數
```ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[atColor]',
  exportAs: 'doColor'
})
export class ColorDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  setColor(): void {
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', '#F44336');
  }
}
```
```ts
import { Component } from '@angular/core';

import { ColorDirective } from './color.directive';

@Component({
  selector: 'app',
  template: `
    <button (click)="dc.setColor()">點擊我</button>
    <p atColor #dc="doColor">Hello Angular 2</p>
  `,
  directives: [ColorDirective]
})
export class AppComponent { }
```

#### 屬性型指令

(1)
```ts
import { Component, Attribute } from '@angular/core';

@Component({
  selector: 'at-attribute',
  template: `
    <p>Hello Angular 2</p>
  `
})
export class AttributeComponent {
  constructor(@Attribute('messages') messagesLog: string) {
    console.log(messagesLog);
  }
}
```
```ts
import { Component } from '@angular/core';

import { AttributeComponent } from './attribute.component';

@Component({
  selector: 'app',
  template: `
    <at-attribute messages="Hello Angular 2"></at-attribute>
  `,
  directives:[AttributeComponent]
})
export class AppComponent { }
```

(2)
```ts
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[atColor]'
})
export class ColorDirective {
  public useColor: boolean = true;

  @HostBinding('class.at-color')
  get color(): boolean {
    return this.useColor;
  }
}
```
```ts
import { Component } from '@angular/core';

import { ColorDirective } from './color.directive';

@Component({
  selector: 'app',
  template: `
    <p atColor>Hello Angular 2</p>
  `,
  styles: [`
    .at-color {
      color: #F44336;
    }
  `],
  directives: [ColorDirective]
})
export class AppComponent { }
```

(3)
```ts
import { Directive, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[atClick]'
})
export class ClickDirective {
  constructor(private element: ElementRef, private renderer: Renderer) { }

  @HostListener('click', ['$event.target'])
  onClick(): void {
    this.renderer.setElementStyle(this.element.nativeElement, 'color', '#F44336');
  }
}
```
```ts
import { Component } from '@angular/core';

import { ClickDirective } from './click.directive';

@Component({
  selector: 'app',
  template: `
    <p atClick>點擊我</p>
  `,
  directives: [ClickDirective]
})
export class AppComponent { }
```

#### 結構型指令
```ts
import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[delay]'
})
export class DelayDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  @Input('delay')
  set delayTime(time: number): void {
    setTimeout(() => this.viewContainerRef.createEmbeddedView(this.templateRef), time);
  }
}
```
```ts
import { Component } from '@angular/core';

import { DelayDirective } from './delay.directive';

@Component({
  selector: 'app',
  template: `
    <template ngFor [ngForOf]="itemNumber" let-item>
      <span *delay="333 * item">
        {{ item }}
      </span>
    </template>
  `,
  directives: [DelayDirective]
})
export class AppComponent {
  public itemNumber: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}
```

## 服務

### 可注入的服務

#### 服務起點
```ts
// name.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class NameService {
  // ...
}
```

#### 建立服務
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

#### 使用服務
```ts
// app.component.ts
import { Component } from '@angular/core';

import { LanguagesService } from './languages.service';  // 導入新建立的服務

@Component({
  selector: 'app',
  template: `
    <p>所決定的語言是: {{ language }}</p>
  `,
  viewProviders: [  // 僅限於該元件的模板中使用
    LanguagesService  // 將新建立的服務註冊的元件中
  ]
})
export class AppComponent {
  constructor(languagesService: LanguagesService) {  // 有相依性注入
    this.language = languagesService.ts;  // 使用服務

    // 使用服務裡的其它選項
    // this.language = languagesService.js;
    // this.language = languagesService.coffee;
  }
}
```

#### 沒有相依性注入
```ts
import { Component } from '@angular/core';

import { LanguagesService } from './languages.service';

@Component({
  selector: 'app',
  template: `
    <p>所決定的語言是: {{ language }}</p>
  `,
  viewProviders: [LanguagesService]
})
export class AppComponent {
  constructor() {
    this.languagesService = new LanguagesService();  // 沒有相依性注入
    this.language = this.languagesService.ts;
  }
}
```

#### Inject 修飾器
```ts
import { Component, Inject } from '@angular/core';

import { LanguagesService } from './languages.service';

@Component({
  selector: 'app',
  template: `
    <p>所決定的語言是: {{ language }}</p>
  `,
  viewProviders: [LanguagesService]
})
export class AppComponent {
  constructor(@Inject(LanguagesService) languagesService) {  // 使用 Inject 修飾器
    this.language = languagesService.ts;
  }
}
```

#### 完整的服務
```ts
export interface List {
  label: string;
}
```
```ts
import { Injectable } from '@angular/core';

import { List } from './list.interface';

@Injectable()
export class ListService {
  private LIST: List[] = [
    { label: 'JavaScript' },
    { label: 'CoffeeScript' },
    { label: 'TypeScript' }
  ];

  getList(): List[] {
    return this.LIST;
  }
}
```
```ts
import { Component, OnInit, Inject } from '@angular/core';

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

  getList(): void {
    this.list = this.listService.getList();
  }

  ngOnInit(): void {
    this.getList();
  }
}
```

### 定義相依性

#### useClass
```ts
import { Injectable } from '@angular/core';

@Injectable()
export class RedService {
  public r100: string = '#FFCDD2';
  public r300: string = '#E57373';
  public r500: string = '#F44336';
  public r700: string = '#D32F2F';
  public r900: string = '#B71C1C';
}
```
```ts
import { Component, provide, Inject } from '@angular/core';

import { RedService } from './red.service';

@Component({
  selector: 'app',
  template: `
    <p>紅色 500: {{ color }}</p>
  `,
  viewProviders: [
    { provide: 'ColorService', useClass: RedService }  // 將類別實體化
    // ColorService === RedService 為 false
  ]
})
export class AppComponent {
  public color: string;

  constructor(@Inject('ColorService') colorService) {
    this.color = colorService.r500;
  }
}
```

#### useExisting
```ts
import { Component, provide, Inject } from '@angular/core';

import { RedService } from './red.service';

@Component({
  selector: 'app',
  template: `
    <p>紅色 500: {{ color }}</p>
  `,
  viewProviders: [
    RedService,
    { provide: 'ColorService', useExisting: RedService }  // 注入已存在實體
    // ColorService === RedService 為 ture
  ]
})
export class AppComponent {
  public color: string;

  constructor(@Inject('ColorService') colorService) {
    this.color = colorService.r500;
  }
}
```

#### useValue
```ts
import { Component, provide, Inject } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>一個數值: {{ value }}</p>
  `,
  viewProviders: [
    { provide: 'NumberService', useValue: 9453 }  // 注入一個值

    // 同一個服務後面會覆蓋前面
    // { provide: 'NumberService', useValue: 9527 }
  ]
})
export class AppComponent {
  public value: number;

  constructor(@Inject('NumberService') numberService) {
    this.value = numberService;
  }
}
```

#### multi
```ts
import { Component, provide, Inject } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>第一個數值: {{ value1 }}</p>
    <p>第二個數值: {{ value2 }}</p>
  `,
  viewProviders: [
    { provide: 'NumberService', useValue: 9453, multi: true },
    { provide: 'NumberService', useValue: 9527, multi: true }

    // 不能這樣
    // { provide: 'NumberService', useValue: 9453 },
    // { provide: 'NumberService', useValue: 9527, multi: true }
  ]
})
export class AppComponent {
  public value1: number;
  public value2: number;

  constructor(@Inject('NumberService') numberService) {
    this.value1 = numberService[0];
    this.value2 = numberService[1];

    console.log(numberService);  // [9453, 9527]
  }
}
```

#### useFactory
```ts
import { Component, provide, Inject } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>亂數值: {{ value }}</p>
  `,
  viewProviders: [
    { provide: 'NumberService', useFactory: () => { return Math.random(); }}  // 注入返回的值
  ]
})
export class AppComponent {
  public value: number;

  constructor(@Inject('NumberService') numberService) {
    this.value = numberService;
  }
}
```

#### deps
```ts
import { Component, provide, Inject } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>{{ messages }}</p>
  `,
  viewProviders: [
    { provide: 'NumberService', useFactory: () => { return Math.random(); }},
    { provide: 'StringService', useFactory: (value) => { return `亂數值: ${ value }`; }, deps: ['NumberService'] }
  ]
})
export class AppComponent {
  public messages: string;

  constructor(@Inject('StringService') stringService) {
    this.messages = stringService;
  }
}
```

### 層疊注入器
```ts
// src/app/random.service.ts
import {Injectable} from '@angular/core';

@Injectable()
export class RandomService {
  public value: number = Math.floor(Math.random() * 100 + 1);
}
```
```ts
// src/app/inheritor.component.ts
import { Component } from '@angular/core';

import { RandomService } from './random.service';

@Component({
  selector: 'at-inheritor',
  template: `
    <p>{{ message }}</p>
  `
})
export class InheritorComponent {
  public message: number;

  constructor(randomService: RandomService) {
    this.message = randomService.value;
  }
}
```
```ts
// src/app/injector.component.ts
import { Component } from '@angular/core';

import { RandomService } from './random.service';

@Component({
  selector: 'at-injector',
  template: `
    <p>{{ message }}</p>
  `,
  viewProviders: [RandomService]
})
export class InjectorComponent {
  public message: number;

  constructor(randomService: RandomService) {
    this.message = randomService.value;
  }
}
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

import { InheritorComponent } from './inheritor.component';
import { InjectorComponent } from './injector.component';
import { RandomService } from './random.service';

@Component({
  selector: 'app',
  template: `
    <p>{{ message }}</p>
    <at-inheritor></at-inheritor>
    <at-inheritor></at-inheritor>
    <at-injector></at-injector>
    <at-injector></at-injector>
    <at-injector></at-injector>
  `,
  directives: [
    InheritorComponent,
    InjectorComponent
  ],
  viewProviders: [RandomService]
})
export class AppComponent {
  public message: number;

  constructor(randomService: RandomService) {
    this.message = randomService.value;
  }
}
```

### 控制相依性

#### Optional 與 Host

(1) Optional
```ts
import { Component, Optional } from '@angular/core';

import { NameService } from './name.service';

@Component({
  selector: 'app',
  template: '
    <!-- ... -->
  ',
  viewProviders: [NameService]
})
export class AppComponent {
  constructor(@Optional() nameService: NameService) {  // 這個服務是可以選擇的
    // ...
  }
}
```

(2) Host
```ts
import { Component, Host } from '@angular/core';

import { NameService } from './name.service';

@Component({
  selector: 'app',
  template: '
    <!-- ... -->
  ',
  viewProviders: [NameService]
})
export class AppComponent {
  constructor(@Host() nameService: NameService) {  // 服務必須是 Host 上的注入器所提供的
    // ...
  }
}
```

#### Self 與 SkipSelf

(1) Self
```ts
import { Component, Self } from '@angular/core';

import { NameService } from './name.service';

@Component({
  selector: 'app',
  template: '
    <!-- ... -->
  ',
  viewProviders: [NameService]
})
export class AppComponent {
  constructor(@Self() nameService: NameService) {  // 只允許注入的服務是當前元件注入器所提供的
    // ...
  }
}
```

(2) SkipSelf
```ts
import { Component, SkipSelf } from '@angular/core';

import { NameService } from './name.service';

@Component({
  selector: 'app',
  template: '
    <!-- ... -->
  ',
  viewProviders: [NameService]
})
export class AppComponent {
  constructor(@SkipSelf() nameService: NameService) {  // 只允許注入的服務是「非」當前元件注入器所提供的
    // ...
  }
}
```

## 通訊

### 獲取資料

#### 啟動 HTTP
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';  // 導入 HTTP 服務

@Component({
  selector: 'app',
  template: `
    <!-- ... -->
  `,
  providers: [HTTP_PROVIDERS],  // 註冊到全應用程式裡
  viewProviders: []
})
export class AppComponent { }
```

#### 基本的 Get

(1)
```ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'get-data',
  template: `
    <pre>{{ messages }}</pre>
  `
})
export class GetDataComponent {
  constructor(private http: Http, private changeDetectorRef: ChangeDetectorRef) {
    http
      .get('./assets/data.json')
      .subscribe((data) => {
        this.messages = data._body;
        changeDetectorRef.detectChanges();
      });
  }
}
```

(2)
```ts
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'on-request',
  template: `
    <button type="button" (click)="onRequest()">請求</button>
    <pre>{{ messages | json }}</pre>
  `
})
export class OnRequestComponent {
  public messages: Object;

  constructor(private http: Http) { }

  onRequest() {
    this.http
      .request('./assets/data.json')  // 或者 .get('./assets/data.json')
      .subscribe((res: Response) => {
        this.messages = res.json();
      });
  }
}
```

#### 建立 Get 服務
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }

  sampleMethod(): any {
    return this.http
      .get('./assets/data.json')
      // 對原始發射的每一項資料應用一個所選擇的函式，然後回傳一個發射這些結果的值
      .map(res => res.json());  // 解析成 JSON
  }
}
```

```ts
// 或者
import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }
  
  sampleMethod(): any {
    return this.http
      .request(new Request({
        method: RequestMethod.Get,
        url: './data.json'
      }))
      .map(res => res.json());
  }
}
```

#### 準備資料
```js
// src/assets/data.json
{
  "title": "Angular2-in-Action",
  "description": "Angular 2 實戰手冊"
}
```

#### 操作服務
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { SampleService } from './sample.service';

@Component({
  selector: 'app',
  template: `
    <button (click)="onClick()">點擊我</button>
    <pre>{{ messages }}</pre>
  `,
  providers: [HTTP_PROVIDERS],
  viewProviders: [SampleService]
})
export class AppComponent {
  constructor(private sampleService: SampleService) { }

  onClick(): void {
    console.log('請求開始');

    this.sampleService
      .sampleMethod()
      // 操作所發射的物件與通知
      .subscribe(
        data => this.messages = JSON.stringify(data),  // 資料處理
        err => console.log(err),  // 錯誤處理
        () => console.log('請求結束')  // 完成處理
      );
  }
}
```

#### 倒退為 Promise
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }

  sampleMethod(): any {
    return this.http
      .get('./data.json')
      .toPromise()
      .then(res => res.json());
  }
}
```
```ts
// src/app/app.component.ts
[...]
export class AppComponent {
  constructor(private sampleService: SampleService) { }

  onRequest(): void {
    this.sampleService
      .sampleMethod()
      .then(
        data => this.messages = JSON.stringify(data),  // 成功處理
        err => console.log(err)  // 錯誤處理
      );
  }
}
```

#### 捕獲錯誤
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }

  sampleMethod(): Observable<any> {
    return this.http
      .get('./assets/data.json')
      .map(res => res.json())
      // 攔截原始的錯誤通知，並將它替換為其它的資料項或資料序列，讓生成的 Observable 能夠正常終止或者不終止它
      .catch(err => Observable.throw(err));
  }
}
```

### 發送資料

#### 建立 Post 服務
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  private dataJson: any = {
    title: 'Angular2-in-Action',
    description: 'Angular 2 實戰手冊'
  };

  private dataUrl: string = '...';  // 要把資料發送到哪個統一資源定位器

  constructor(private http: Http) { }

  sampleMethod(): any {
    let body = JSON.stringify(this.dataJson);
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.dataUrl, body, options)
      .map(res => res.json());
  };
}
```

#### 執行服務
```ts
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { SampleService } from './sample.service';

@Component({
  selector: 'app',
  template: `
    <button (click)="onClick()">點擊我</button>
    <pre>{{ results }}</pre>
  `,
  providers: [HTTP_PROVIDERS],
  viewProviders: [SampleService]
})
export class AppComponent {
  constructor(private sampleService: SampleService) { }
  
  onClick(): void {
    console.log('發送開始');

    this.sampleService
      .sampleMethod()
      .subscribe(
        data => this.results = JSON.stringify(data),
        err => console.log(err),
        () => console.log('發送完成')
      );
  }
}
```

### 編輯資料
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  private dataJson: any = {
    title: 'Angular2-in-Action',
    description: 'Angular 2 實戰手冊'
  };

  private dataUrl: string = `${url}/${data.id}`;;

  constructor(private http: Http) { }

  sampleMethod(): any {
    let body = JSON.stringify(this.dataJson);
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .put(this.dataUrl, body, options)
      .map(res => res.json());
  };
}
```

### 刪除資料
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  private dataJson: any = {
    title: 'Angular2-in-Action',
    description: 'Angular 2 實戰手冊'
  };

  private dataUrl: string = `${url}/${data.id}`;;

  constructor(private http: Http) { }

  sampleMethod(): any {
    let body = JSON.stringify(this.dataJson);
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .delete(this.dataUrl, body, options)
      .map(res => res.json());
  };
}
```

### 跨域請求
```ts

```
```ts
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WikipediaService {
  private wikiUrl: string = 'http://en.wikipedia.org/w/api.php';

  constructor(private jsonp: Jsonp) { }

  search(term: string): any {
    let params = new URLSearchParams();

    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
      .get(this.wikiUrl, { search: params })
      .map(req => <string[]>req.json()[1]);
  }
}
```

## 管道

### 內建管道

```ts
import { Component } from '@angular/core';
import { COMMON_PIPES } from '@angular/common';  // 導入內建管道

@Component({
  selector: 'at-name',
  template: `
    <!-- ... -->
  `,
  pipes: [COMMON_PIPES]  // 將內建管道註冊到元件裡
})
export class NameComponent { }
```

#### 大小寫
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

#### 日期
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

    <!-- 也能自行配置 -->
    <p>{{ today | date: 'yyyy/M/d' }}</p>
  `
})
export class DateComponent {
  public today: Date = new Date();
}
```

| Component | Symbol | Short Form   | Long Form                 | Numeric  | 2-digit    |
|-----------|:------:|--------------|---------------------------|----------|------------|
| era       | G      | G (AD)       | GGGG (Anno Domini)        | -        | -          |
| year      | y      | -            | -                         | y (2015) | yy (15)    |
| month     | M      | MMM (Sep)    | MMMM (September)          | M (9)    | MM (09)    |
| day       | d      | -            | -                         | d (3)    | dd (03)    |
| weekday   | E      | EEE (Sun)    | EEEE (Sunday)             | -        | -          |
| hour      | j      | -            | -                         | j (13)   | jj (13)    |
| hour12    | h      | -            | -                         | h (1 PM) | hh (01 PM) |
| hour24    | H      | -            | -                         | H (13)   | HH (13)    |
| minute    | m      | -            | -                         | m (5)    | mm (05)    |
| second    | s      | -            | -                         | s (9)    | ss (09)    |
| timezone  | z      | -            | z (Pacific Standard Time) | -        | -          |
| timezone  | Z      | Z (GMT-8:00) | -                         | -        | -          |

#### 非同步

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

#### 數值 (十進制)
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

#### 百分率
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

#### 貨幣
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

#### JSON
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

#### 裁切
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

#### 替換
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

#### 選擇
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

#### 複數
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

### 自訂管道

#### 管道建構子
```ts
name: string
pure?: boolean
```

#### 管道起點
```ts
// name.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // ...
  }
}
```
```ts
// app.component.ts
import { Component } from '@angular/core';

import { NamePipe } from './name.pipe';  // 導入所自訂管道

@Component({
  selector: 'app',
  template: `
    <!-- ... -->
  `,
  pipe: [NamePipe]  // 將所自訂管道註冊到元件中
})
export class AppComponent { }
```

#### 字節管道
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {
  transform(value: string): number {
    return value.length;
  }
}
```
```html
<p>Angular 2 的字節是: {{ 'Angular 2' | length }}</p>
```

#### 延遲管道
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

## 動畫
```ts
import { Component, animate, state, style, transition, trigger } from '@angular/core';

@Component({
  selector: 'at-name',
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
export class NameComponent {
  public stateExpression: string;
  // ...
}
```

## 測試

### 靜態分析

#### 配置 Codelyzer
```bash
$ npm install tslint codelyzer -D
```
```js
// tslint.json
{
  "rulesDirectory": ["node_modules/codelyzer"],  // 使用 Codelyzer
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
  baseURL: '/base'
});

System.config({
  defaultJSExtensions: true,
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular'
  },
  packages: {
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/forms': {
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

      // paths loaded via module imports
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true },

      { pattern: 'dist/**/*.js', included: false, watched: true },

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: 'dist/**/*.html', included: false, watched: true },
      { pattern: 'dist/**/*.css', included: false, watched: true },

      // paths to support debugging with source maps in dev tools
      { pattern: 'src/**/*.ts', included: false, watched: false },
      { pattern: 'dist/**/*.js.map', included: false, watched: false }
    ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      "/app/": "/base/dist/app/"
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
import { TestComponentBuilder } from '@angular/core/testing';
import { Component } from '@angular/core';

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

#### 第一個單元測試
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hello-unit',
  template: `
    <p>{{ messages }}</p>
  `
})
export class HelloUnitComponent {
  public messages: string = 'Hello Unit';
}
```
```ts
import { HelloUnitComponent } from './hello-unit.component';

describe('HelloUnitComponent', () => {

  beforeEach(() => {
    this.helloUnitComponent = new HelloUnitComponent();
  });

  it('should have a content', () => {
    expect(this.helloUnitComponent.messages).toEqual('Hello Unit');
  });

});
```

### 端對端測試

#### 配置 Protractor
```bash
$ npm install protractor -D
$ typings install dt~angular-protractor -G -S
$ typings install dt~selenium-webdriver -G -S
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

#### 第一個測試
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

  onClick(): void {
    this.message = 'Hello E2E';
  }
}
```
```ts
// hello-e2e.component.e2e-spec.ts
describe('HelloE2EComponent', () => {

  beforeEach(() => {
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

#### 配置 Travis CI
```bash
# .travis.yml
language: node_js
node_js: stable

sudo: false

os:
  - linux
  - osx

cache:
  directories: node_modules

before_install:
  - if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then export DISPLAY=:99.0; fi
  - if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then sh -e /etc/init.d/xvfb start; fi
  - if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then nohup bash -c "webdriver-manager start 2>&1 &"; fi
  - if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then brew update; fi
  - if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then brew outdated xctool || brew upgrade xctool; fi

before_script:
  - npm install karma-firefox-launcher

script:
  - npm run gulp -- build
  - npm run gulp -- lint
  - npm run gulp -- unit
  - npm run gulp -- e2e
```

#### 整合靜態分析
```ts
// gulpfile.ts
[...]

import * as tslint from 'gulp-tslint';

[...]

gulp.task('lint-typescript', () =>
  gulp
    .src(SCRIPTS_SRC)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
);

[...]
```

#### 整合單元測試
```js
// karma.conf.js
[...]

const config = {
  [...]
};

if (process.env.TRAVIS) {
  config.browsers = ['Chrome_travis_ci'];
  config.singleRun = true;
}

module.exports = (configuration) => {
  configuration.set(config);
};
```

#### 整合端對端測試
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
$ npm install express gulp-protractor -D
$ typings install dt~express -G -D
$ typings install dt~gulp-protractor -G -D
```

建立 express-history-api-fallback.d.ts
```ts
// tools/manual_typings/express-history-api-fallback.d.ts
declare module 'express-history-api-fallback' {
  import { RequestHandler } from 'express';

  interface IOptions {
    maxAge?: number;
    root?: string;
    lastModified?: number;
    headers?: { [key: string]: string; };
    dotfiles?: boolean;
  }

  function history(index: string, options?: IOptions): RequestHandler;

  module history { }

  export = history;
}
```

```ts
// gulpfile.ts
import * as express from 'express';
import * as history from 'express-history-api-fallback';
import * as gulp from 'gulp';
import { resolve } from 'path';
import { protractor, webdriver_update } from 'gulp-protractor';

class Protractor {
  server(port: number, dir: string): any {
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

gulp.task('e2e', (done: any) => {
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
