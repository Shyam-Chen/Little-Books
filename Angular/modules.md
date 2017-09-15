## 模組

在現在的 JavaScript 有 ES Modules 的出現，而 Angular 模組和 ES Modules 是屬於互補的關係

### 基本應用

先來知道一下模組的構造，底下這段就是模組的起始點

```ts
import { NgModule } from '@angular/core';

@NgModule({
  // 在這裡配置模組的屬性
})
export class NameModule {}
```

底下列出配置模組所可使用的選項

```ts
// 後設資料屬性
providers?: Provider[]  // 注入服務用
declarations?: Array<Type<any>|any[]>  // 定義元件、指令或管道用
imports?: Array<Type<any>|ModuleWithProviders|any[]>  // 導入模組、元件、指令或管道
exports?: Array<Type<any>|any[]>  // 導出模組或元件
entryComponents?: Array<Type<any>|any[]>  // 所依賴的原件
bootstrap?: Array<Type<any>|any[]>  // 啟動元件
schemas?: Array<SchemaMetadata|any[]>  // 定義元件或指令的屬性
id?: string  // 模組識別
```

開始建立一個新的模組

```ts
// src/app/new/new.module.ts
import { NgModule } from '@angular/core';

import { NewComponent } from './new.component';
import { NewDirective } from './new.directive';

@NgModule({
  declarations: [  // 該 NewModule 模組底下的元件、指令或管道
    NewComponent,
    NewDirective
  ],
  exports: [NewComponent]  // 導出 NewComponent
})
export class NewModule { }
```

在新建立的模組內，建立一個新的元件

```ts
// src/app/new/new.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-new',
  template: `
    <p new-directive>這是新建立的元件</p>  <!-- p 標籤裡的 new-directive 屬性是 NewDirective 所建立的 -->
  `
})
export class NewComponent { }
```

在新建立的模組內，建立一個新的指令

```ts
// src/app/new/new.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appNewDirectivee]'
})
export class NewDirective {
  constructor(public element: ElementRef, public renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'color', '#F44336');  // DOM 操作：將字體顏色設定為紅色
  }
}
```

將新建立的模組導入到 AppModule 裡

```ts
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewModule } from './new/new.module';  // 導入 NewModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NewModule  // 將 NewModule 導入到 AppModule 裡
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

在 AppComponent 使用 NewModule 裡的 NewComponent

```html
<!-- src/app/app.component.html -->

<!--
 ... 省略
 -->

<app-new></app-new>  <!-- 使用 NewModule 導出的 NewComponent -->
```

#### 功能模組

在開發的階段，每一個功能，都需要建立一個功能模組，而一個功能模組底下也可以有小功能模組，以方面日後的管理

在 app 資料夾建立一個 color 模組，這與上方的第一個模組是相同的意思，會再一次，主要是希望整體的目錄結構，是以功能來做區分的

```ts
// src/app/color/color.module.ts
import { NgModule } from '@angular/core';

import { ColorComponent } from './color.component';
import { RedDirective } from './red.directive';
import { GreenDirective } from './green.directive';
import { BlueDirective } from './blue.directive';

@NgModule({
  declarations: [
    ColorComponent,
    RedDirective,
    GreenDirective,
    BlueDirective
  ],
  exports: [ColorComponent]
})
export class ColorModule { }
```

```ts
// src/app/color/red.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[color-red]'
})
export class RedDirective {
  constructor(private element: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'color', '#F44336');
  }
}
```

```ts
// src/app/color/green.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[color-green]'
})
export class GreenDirective {
  constructor(private element: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'color', '#4CAF50');
  }
}
```

```ts
// src/app/color/blue.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[color-blue]'
})
export class BlueDirective {
  constructor(private element: ElementRef, private renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'color', '#2196F3');
  }
}
```

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ColorModule } from './color/color.module';

@NgModule({
  imports: [
    BrowserModule,
    ColorModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p color-red>紅色字體</p>
    <p color-green>綠色字體</p>
    <p color-blue>藍色字體</p>
  `
})
export class AppComponent { }
```

#### 共用模組

共用模組主要是存放專案中屬於共用的程式碼，基本上會是元件和服務。

```ts
// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    FooComponent,
    BarComponent
  ],
  exports: [
    FooComponent,
    BarComponent
  ]
})
export class SharedModule { }
```

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 延遲載入模組

延遲載入模組主要是優化路由的。

```ts
// src/app/app-routing.module.ts
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './app/home/home.module#HomeModule' },
  { path: 'about', loadChildren: './app/about/about.module#AboutModule' }
];

export const routing = RouterModule.forRoot(routes);
```

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a routerLink="home" routerLinkActive="active">Home</a>
      <a routerLink="about" routerLinkActive="active">About</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
```

```ts
// src/app/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <h3>Home Page</h3>
  `
})
export class HomeComponent { }
```

```ts
// src/app/home/home.routing.ts
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

export const routing = RouterModule.forChild(routes);
```

```ts
// src/app/home/home.module.ts
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { routing } from './home.routing';

@NgModule({
  imports: [routing],
  declarations: [HomeComponent]
})
export default class HomeModule { }
```

```ts
// src/app/about/about.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <h3>About Page</h3>
  `
})
export class AboutComponent { }
```

```ts
// src/app/about/about.routing.ts
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '', component: AboutComponent }
];

export const routing = RouterModule.forChild(routes);
```

```ts
// src/app/about/about.module.ts
import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { routing } from './about.routing';

@NgModule({
  imports: [routing],
  declarations: [AboutComponent]
})
export default class AboutModule { }
```
