## 指令

### 內建屬性型指令

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

### 內建結構型指令

#### ng-if

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  template: `
    <p *ngIf="true">我看的到它</p>
    <p *ngIf="false">我看不到它</p>

    <!-- 或者 -->

    <ng-template [ngIf]="true">
      <p>我看的到它</p>
    </ng-template>
    <ng-template [ngIf]="false">
      <p>我看不到它</p>
    </ng-template>
  `
})
export class NgIfComponent { }
```

if/else

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  template: `
    <div *ngIf="true; else falsy">
      <p>True.</p>
    </div>

    <ng-template #falsy>
      <p>False.</p>
    </ng-template>
  `
})
export class NgIfComponent { }
```

if/then/else

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  template: `
    <div *ngIf="true; then truthy else falsy"></div>

    <ng-template #truthy>
      <p>True.</p>
    </ng-template>

    <ng-template #falsy>
      <p>False.</p>
    </ng-template>
  `
})
export class NgIfComponent { }
```

區域變數設定

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  template: `
    <div *ngIf="foo.bar; else nothing; let thing">
      {{ thing }}
    </div>

    <ng-template #nothing>
      Nothing.
    </ng-template>
  `
})
export class NgIfComponent {
  public foo: object = {
    bar: 'A',
    baz: 'B'
  };
}
```

加入 Async 管道

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  template: `
    <div *ngIf="foo | async; else loading; let thing">
      {{ thing.bar }}, {{ thing.baz }}
    </div>

    <ng-template #loading>
      Loading...
    </ng-template>
  `
})
export class NgIfComponent {
  public foo: object = {
    bar: 'A',
    baz: 'B'
  };
}
```

使用 Observable

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-ngif',
  template: `
    <div *ngIf="thing$ | async; else loading; let thing">
      {{ thing.bar }}, {{ thing.baz }}
    </div>

    <ng-template #loading>
      Loading...
    </ng-template>
  `
})
export class NgIfComponent {
  public thing$ = Observable.of({ bar: 'A', baz: 'B' }).delay(1000);
}
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
      <ng-template ngPluralCase="=0">沒有任何東西</ng-template>
      <ng-template ngPluralCase="=1">已經放入一個東西</ng-template>
      <ng-template ngPluralCase="=2">已經放入兩個東西</ng-template>
      <ng-template ngPluralCase="many">已經放入了很多東西</ng-template>
      <ng-template ngPluralCase="excess">已經超出負荷量了</ng-template>
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
    <ng-template
      [ngTemplateOutlet]="atTemplate" [ngOutletContext]="{ items: ng }"
    ></ng-template>

    <ng-template #atTemplate let-items="items">
      <p>{{ items }} {{ version }}</p>
    </ng-template>
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
    <ng-template ngFor [ngForOf]="itemNumber" let-item>
      <span *delay="333 * item">
        {{ item }}
      </span>
    </ng-template>
  `,
  directives: [DelayDirective]
})
export class AppComponent {
  public itemNumber: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
}
```
