# Angular 實戰

### 目錄
* [配置](#配置)
* [元件](#元件)
* [指令](#指令)
* [服務](#服務)
* [管道](#管道)
* [參考](#參考)

***

### 配置
[Angular2TS-Quick-Start](https://github.com/Shyam-Chen/Angular2TS-Quick-Start)

### 元件
```ts
// basic-app.ts
import { Component } from '@angular/core';

@Component({
  selector: 'basic-app',
  template: `
    <p>1 + 1 的結果是: {{ 1 + 1 }}</p>
    <a href="{{ link }}">網站連結</a>
  `
})
export class BasicAppComponent {
  public link: string = 'https://angular.io/';
}
```

```ts
// my-name.ts
import { Component } from '@angular/core';

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
import { Component } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `
    <input type="text" [(ngModel)]="name" placeholder="輸入你的名字">
    <p>Hello {{ name }}</p>
  `
})
export class HelloWorldComponent {
  public name: string = '';
}
```

```ts
// click-me.ts
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

  onClick() {
    this.message = '我是點擊「後」的訊息';
  }
}
```

```ts
// toggle-me.ts
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

  onToggle() {
    this.toggle = !this.toggle;
    this.toggle ? this.message = '你好' : this.message = '再見';
  }
}
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'toggle-class',
  template: `
    <button (click)="isClassVisible = !isClassVisible">Toggle Class</button>
    <p [ngClass]="{ 'my-class': isClassVisible }">Hello Angular 2</p>
  `,
  styles: [`
    .my-class {
      color: #F44336
    }
  `]
})
export class ToggleClassComponent { }
```

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

  onKeyup(value: string) {
     this.values += `${value} | `;
  }
}
```

```ts
// add-item.ts
import { Component } from '@angular/core';

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

##### 表單
```ts
import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

@Component({
  selector: 'at-form',
  template: `

  `,
  directives: [FORM_DIRECTIVES]
})
export class AtFormComponent { }
```

##### 元件之間的溝通
```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'at-input',
  template: `
    <p>Hello {{ something }}</p>
  `
})
export class AtInputComponent {
  @Input('something') something: string;
}
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

##### 生命週期掛鉤
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-lifecycle'
})
export class AtLifecycleComponent {
  ngOnInit() {
    console.log('Hello Angular 2');
  }
}
```

##### 路由
```html
<base href="/">
```
```ts
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['/']">Home</a> /
      <a [routerLink]="['/about']">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [
    ROUTER_DIRECTIVES,
    HomeComponent,
    AboutComponent
  ]
})
@Routes([{
    path: '/',
    component: HomeComponent,
    useAsDefault: true
  }, {
    path: '/about',
    component: AboutComponent
}])
export class App { }
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
  `
})
export class SeeThingsComponent { }
```

```ts
// data-list.interface.ts
export interface DataList {
  label: string;
}
```
```ts
// data-list.ts
import { Component } from '@angular/core';

import { DataList } from './data-list.interface.ts';

@Component({
  selector: 'data-list',
  template: `
    <p>程式語言:</p>
    <ul>
      <li *ngFor="let item of list">
        {{ item.label }}
      </li>
    </ul>
    <p>我最喜愛的語言是: {{ favorite.label }}</p>
  `
})
export class DataListComponent {
  public list: DataList[] = [
    { label: 'JavaScript' },
    { label: 'CoffeeScript' },
    { label: 'TypeScript' }
  ];
  public favorite = this.list[1];
}
```

```html
<!-- 模板表達式 -->
<p [style.background-color]="'yellow'">
  我的背景是黃色的
</p>

<!-- 內建指令 -->
<div [ngStyle]="{ 'background-color': 'yellow' }"> 
  我的背景也是黃色的
</div>
```

```css
.title {
  background-color: yellow
}
```
```html
<h3 [ngClass]="{ title: true }">這是標題，所以背景是有黃色的</h3>
<p [ngClass]="{ title: false }">這不是標題，所以背景是沒有黃色的</p>
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-content',
  template: `
    <p>Hi, TypeScript</p>
    <ng-content></ng-content>
  `
})
export class UseContnetComponent { }
```

##### 自訂指令
```ts
import { Directive } from '@angular/core';

@Directive({
  /**
   * thing
   * [thing]
   * .thing
   * input[type=text]
   */
  selector: ''
})
export class ThingDirective { }
```

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: 'atTitle',
  host: {
    class: 'title'
  }
})
export class AtTitleDirective { }
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
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[atHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  @Input('atHighlight') highlightColor: string;

  private defaultColor: string = 'yellow';

  constructor(private element: ElementRef) { }

  onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor);
  }

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
import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesService {
  public js: string = 'JavaScript';
  public coffee: string = 'CoffeeScript';
  public ts: string = 'TypeScript';
}
```

```json
{
  "id": 1,
  "title": "Angular2TS-Quick-Start",
  "description": "Getting started with Angular 2 using TypeScript"
}
```
```ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'response-data',
	template: `
	  <code>{{ response }}</code>
	  `
})
export class ResponseDataComponent {
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
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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

### 管道
##### 內建管道
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-pipes',
  template: `
    <p>{{ thing | uppercase }}</p>
    <p>{{ thing | lowercase }}</p>
    <p>{{ thing | uppercase | lowercase }}</p>
  `
})
export class AtPipesComponent {
  public thing = 'Angular';
}
```
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-date',
  template: `
    <p>{{ atDate | date: "MM/dd" }}</p>
  `
})
export class AtDateComponent {
  public atDate = new Date(2020, 2, 14);
}
```

##### 自訂管道
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'length' })
export class MessageLengthPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    return `${value.length}`
  }
}
```

### 參考
* Angular 2 Developer Guides by Angular Team
* Introduction to Angular 2 and ngCourse2 by Rangle.io
* ng-book 2 by Ari Lerner, Felipe Coury, Nate Murray and Carlos Taborda
* Switching to Angular 2 by Minko Gechev
