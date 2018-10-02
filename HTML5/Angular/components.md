## 元件

Angular 的元件底成是在 [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 之上的。

Web Component 帶來許多的優點，更好的封裝，解決了 CSS 的樣式的衝突，如果沒有使用 Web Component，就只能透過 CSS Modules 來解決 CSS 樣式之間的衝突。

### 基本應用

先來知道一下元件的構造，底下這段就是元件的起始點：

```ts
import { Component } from '@angular/core';

@Component({
  // ...
})
export class NameComponent {
  // ...
}
```

底下列出配置元件所可使用的選項：

```ts
// 後設資料屬性
selector?: string;
inputs?: string[];
outputs?: string[];
host?: {[key: string]: string};
providers?: Provider[];
exportAs?: string;
queries?: {[key: string]: any};

changeDetection?: ChangeDetectionStrategy;
viewProviders?: Provider[];
moduleId?: string;
templateUrl?: string;
template?: string;
styleUrls?: string[];
styles?: string[];
animations?: any[];
encapsulation?: ViewEncapsulation;
interpolation?: [string, string];
entryComponents?: Array<Type<any>|any[]>;
```

#### 模板

(1) `template`

使用行內模板

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-template',
  template: `
    <p>Hello Angular</p>
  `,
})
export class UseTemplateComponent {}
```

(2) `templateUrl`

使用外部模板

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-templateUrl',
  templateUrl: './app/use-template.component.html',
})
export class UseTemplateUrlComponent {}
```

```html
<!-- use-template.component.html -->
<p>Hello Angular</p>
```

#### 樣式

(1) `styles`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-styles',
  template: `
    <p class="at-color">Hello Angular</p>
  `,
  styles: [`
    .at-color {
      color: #F44336;
    }
  `],
})
export class UseStylesComponent {}
```

(2) `styleUrls`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'use-styleUrls',
  templateUrl: './app/use-styles.component.html',
  styleUrls: ['./app/use-styles.component.css'],
})
export class UseStyleUrlsComponent {}
```

```html
<!-- use-styles.component.html -->
<p class="at-color">Hello Angular</p>
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
  selector: 'module-identification',
  templateUrl: 'name.component.html',
  styleUrls: ['name.component.css'],
})
export class NameComponent {}
```

```ts
import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,  // 如果沒有使用它
  selector: 'module-identification',
  templateUrl: './app/name.component.html',  // 模板路徑會變得很長
  styleUrls: ['./app/name.component.css'],  // 樣式路徑也會變得很長
})
export class NameComponent {}
```

### 檢視層

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
  `,
})
export class RenderingTemplatesComponent {
  public message: string = 'Hello Angular';
  public name: string;
  public optional: void = undefined;
  public link: string = 'https://angular.io/';
  public image: string = '../assets/images/angular.png';

  constructor() {
    this.name = '陳彥澄';
  }
}
```

如果不喜歡 Angular 預設的插植符號，也是可以自訂插值符號的。

我們改成三個大括號，如底下範例：

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'custom-interpolation',
  template: `
    <p>{{{ messages }}}</p>
  `,
  interpolation: ['{{{', '}}}'],
})
export class AppComponent {
  public messages: string = 'Hello Angular';
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

    <!-- [註]: 了解更多的 ngModel 指令可以查看表單章節 -->
  `,
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
  `,
})
export class ClickMeComponent {
  public message: string = '我是點擊「前」的訊息';

  public onClick(): void {
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
  `,
})
export class ToggleMeComponent {
  public message: string = '你好';
  public toggle: boolean = true;

  public onToggle(): void {
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
    <a [href]="url">Angular 官網</a>

    <!-- 也可以這樣 -->
    <a bind-href="url">Angular 官網</a>

    <!-- 都等同於 -->
    <a href="{{ url }}">Angular 官網</a>
  `,
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
  `,
})
export class BindingPropertiesComponent {
  public messages: string = 'Hello Angular';
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
      Hello Angular
    </p>
  `,
})
export class BindingPropertiesComponent {}
```

(4) `[class.名稱]="條件式"`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <p [class.at-color]="true">Hello Angular</p>
  `,
  styles: [`
    .at-color {
      color: #E91E63;
    }
  `],
})
export class BindingPropertiesComponent {}
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
  `],
})
export class ToggleClassComponent {}
```

(5) `[attr.名稱]="表達式"`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'binding-properties',
  template: `
    <p [attr.at-version]="version">Angular</p>
  `,
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
  `,
})
export class LocalVariableComponent {
  public messages: string = '';

  public onKeyup(value: string): void {
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
  `,
})
export class AddItemComponent {
  public list: string[] = ['Angular', 'Material', 'Firebase'];

  public addItem(newItem: string): void {
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
  `,
})
export class ContentProjectionComponent { }
```

```ts
import { Component } from '@angular/core';

import { ContentProjectionComponent } from './content-projection.component';

@Component({
  selector: 'app',
  template: `
    <content-projection>Hi, Angular</content-projection>
  `,
  directives: [ContentProjectionComponent]
})
export class AppComponent {}
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
  `,
})
export class MoreProjectionComponent {}
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
  directives: [MoreProjectionComponent],
})
export class AppComponent {}
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
  inputs: ['version'],
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
  directives: [UseInputComponent],
})
export class AppComponent {}
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
  @Input() public schoolName: string;
  @Input('student-id') public id: string;
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
  @Input() public count: number;
  public countChange: EventEmitter<number> = new EventEmitter<number>();

  public onClick(): void {
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
  public onChange(event): number {
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
  @Input() public count: number;
  @Output() public countChange: EventEmitter<number> = new EventEmitter<number>();

  public onClick(): void {
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
    <p>這是「子」元件 - 模板</p>
  `,
})
export class ChildComponent {
  public name: string = '這是「子」元件 - 屬性';
}
```

```ts
import { Component, ContentChild } from '@angular/core';

import { ChildComponent } from './child.component';

@Component({
  selector: 'at-parent',
  template: `
    <p>這是「父」元件</p>
    <ng-content></ng-content>
    <p>{{ child.name }}</p>  <!-- 使用子元件的屬性 -->
  `
})
export class ParentComponent {
  @ContentChild(ChildComponent) public child: ChildComponent;
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
    ChildComponent,
  ],
})
export class AppComponent {}
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
  @ContentChildren(ChildComponent) public childComponents: QueryList<ChildComponent>;
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
  // ...
})
export class ParentComponent implements AfterContentInit, AfterContentChecked {
  // ...

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
  public onLog(): void {
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
  @ViewChild(ChildComponent) public childComponent: ChildComponent;

  public ngAfterViewInit() {
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
  @ViewChild('child') public childComponent: ChildComponent;

  public ngAfterViewInit() {
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
  @ViewChildren(ChildComponent) public childComponents: QueryList<ChildComponent>;
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
  public ngAfterViewInit() {
    console.log('AfterViewInit 開始');
    console.log(this.childComponents);
    console.log('AfterViewInit 結束');
  }

  // 使用 AfterViewChecked
  public ngAfterViewChecked() {
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
    <div class="pink-500">Hello Angular</div>
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
    <div class="pink-500">Hello Angular</div>
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
    <div class="pink-500">Hello Angular</div>
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

### 臟值檢測策略

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
  @Input() public onePiece: string;
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
  selector: 'app-root',
  template: `
    <button (click)="changeProperty()">改變屬性</button>
    <button (click)="changeObject()">改變物件</button>
    <change-detection [onePiece]="onePiece"></change-detection>
  `,
  directives: [ChangeDetectionComponent]
})
export class AppComponent {
  public onePiece: OnePiece = new OnePiece('魯夫');

  public changeProperty(): void {
    this.onePiece.name = '薩波';
  }

  public changeObject(): void {
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
  @Input() public onePiece: string;
}
```

#### Immutable

使用 [Immutable](https://github.com/facebook/immutable-js/) 函式庫和 OnPush 策略來提升效能

```bash
$ npm i immutable -S
```

```ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Map } from 'immutable';

@Component({
  selector: 'one-piece',
  template: `
    <p>{{ onePiece.get('name') }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnePieceComponent {
  @Input() onePiece: Map<string>;
}
```

```ts
import { Component } from '@angular/core';
import { Map } from 'immutable';

@Component({
  selector: 'app-root',
  template: `
    <button type="button" (click)="change()">更換</button>
    <one-piece [onePiece]="onePiece"></one-piece>
  `
})
export class AppComponent {
  public onePiece: Map<string> = Map({ name: '艾斯' });

  change(): void {
    this.onePiece = this.onePiece.merge({ name: '薩波' });
  }
}
```

### 生命週期掛鉤

#### OnInit

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>Hello Angular</p>
  `
})
export class AppComponent implements OnInit {
  public ngOnInit() {
    console.log('Hello Angular');
  }
}
```

#### OnDestroy

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'at-lifecycle',
  template: `
    <p>Hello Angular</p>
  `
})
export class LifecycleComponent implements OnInit, OnDestroy {
  public ngOnInit() {
    console.log('On init');
  }

  public ngOnDestroy() {
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

  public onToggle(): void {
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
  @Input() public messages: string;

  ngOnChanges(changes: SimpleChanges) {
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
  public messages: string = 'Hello Angular';

  onClick(): void {
    this.messages = 'Goodbye Angular';
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
  @Input() public count: number;

  public ngDoCheck() {
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

  public onClick(): void {
    this.count++;
  }
}
```

這些生命週期掛鉤也可以使用在指令
