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
* [angular/quickstart](https://github.com/angular/quickstart)
* [angular/angular-cli](https://github.com/angular/angular-cli)
* [mgechev/angular2-seed](https://github.com/mgechev/angular2-seed)
* [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)

### 元件
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

/**
 * 常用的組態
 */
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

  onClick(): string {
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

  onKeyup(value: string): string {
     this.values += `${ value } | `;
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

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'at-properties',
  template: `
    <p>Hello Angular {{ atVersion }}</p>
  `,
  properties: ['atVersion']
})
export class AtPropertiesComponent { }
```

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
export class NgClassComponent { }
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
export class NgClassComponent { }
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
export class NgClassComponent { }
```

##### 表單
```ts
import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/common';

@Component({
  selector: 'at-form',
  template: `
    <form [ngFormModel]="group" (ngSubmit)="onSubmit()" novalidate>
      <label for="email">Email:</label>
      <input type="email" id="email" [ngFormControl]="email">

      <label for="password">Password:</label>
      <input type="password" id="password" [ngFormControl]="password">

      <button type="submit">Register</button>
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
  
  onSubmit() {
    this.formValue = this.group.value;
  }
}
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
  @Input('atSomething') something: string;
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

##### 路由
```ts
import { APP_BASE_HREF } from '@angular/common';
import { provide } from '@angular/core';

// ...

bootstrap(App, [
  // ...
  provide(APP_BASE_HREF, { useValue: '/' }),
  // ...
]);
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
import { Directive } from '@angular/core';

@Directive({
  selector: 'at-title',
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

@Pipe({
  name: 'length'
})
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
