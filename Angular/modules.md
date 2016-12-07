## 模組

### 基本應用

先來知道一下模組的構造，底下這段就是模組的起始點。

```ts
import { NgModule } from '@angular/core';

@NgModule({
  // ...
})
export class NameModule {
  // ...
}
```

在模組的構造中，底下列出可使用的選項。

```ts
providers : any[]
declarations : Array<Type|any[]>
imports : Array<Type|ModuleWithProviders|any[]>
exports : Array<Type|any[]>
entryComponents : Array<Type|any[]>
bootstrap : Array<Type|any[]>
schemas : Array<SchemaMetadata|any[]>
id : string
```

(1) 模組概念
```ts
// src/app/new/new.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-new',  // 加入前綴 app，表示是在 AppModule 底下的
  template: `
    <p new>這是新建立的元件</p>  <!-- p 標籤裡的 new 屬性是 NewDirective 所建立的 -->
  `
})
export class NewComponent { }
```
```ts
// src/app/new/new.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[new]'
})
export class NewDirective {
  constructor(public element: ElementRef, public renderer: Renderer) {
    renderer.setElementStyle(element.nativeElement, 'color', '#F44336');  // DOM 操作: 將字體顏色設定為紅色
  }
}
```
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
  exports: [NewComponent]  // 導出 NewComponent 給 AppModule 模組使用
})
export class NewModule { }
```
```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NewModule } from './new/new.module';  // 導入 NewModule

@NgModule({
  imports: [
    BrowserModule,
    NewModule  // 將 NewModule 註冊到 AppModule 裡
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
    <p>第一個應用程式</p>
    <app-new></app-new>  <!-- 使用 NewModule 導出的 NewComponent -->
  `
})
export class AppComponent { }
```

(2) 功能模組
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
// src/app/color/color.module.ts
import { NgModule } from '@angular/core';

import { RedDirective } from './red.directive';
import { GreenDirective } from './green.directive';
import { BlueDirective } from './blue.directive';

@NgModule({
  declarations: [
    RedDirective,
    GreenDirective,
    BlueDirective
  ],
  exports: [
    RedDirective,
    GreenDirective,
    BlueDirective
  ]
})
export class ColorModule { }
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

#### 共享模組
存放專案中屬於共用的程式碼
```ts
// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';

@NgModule({
  // ...
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
```ts
// src/app/app.routing.ts
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadChildren: './app/home/home.module' },
  { path: 'about', loadChildren: './app/about/about.module' }
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
