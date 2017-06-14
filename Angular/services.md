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

  private getList(): List[] {
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

  public getList(): void {
    this.list = this.listService.getList();
  }

  ngOnInit(): void {
    this.getList();
  }
}
```

### 服務的相依性

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
import { Component, Inject } from '@angular/core';

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
import { Component, Inject } from '@angular/core';

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
import { Component, Inject } from '@angular/core';

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

`multi` 只能用在 `useValue` 上

```ts
import { Component, Inject } from '@angular/core';

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
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>亂數值: {{ value }}</p>
  `,
  viewProviders: [
    { provide: 'NumberService', useFactory: () => Math.random() }  // 注入返回的值
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
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>{{ messages }}</p>
  `,
  viewProviders: [
    { provide: 'NumberService', useFactory: () => Math.random() },
    { provide: 'StringService', useFactory: value => `亂數值: ${ value }`, deps: ['NumberService'] }
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
import { Injectable } from '@angular/core';

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
  `,
  viewProviders: [RandomService]
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
  template: `
    <!-- ... -->
  `,
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
  template: `
    <!-- ... -->
  `,
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
  template: `
    <!-- ... -->
  `,
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
  template: `
    <!-- ... -->
  `,
  viewProviders: [NameService]
})
export class AppComponent {
  constructor(@SkipSelf() nameService: NameService) {  // 只允許注入的服務是「非」當前元件注入器所提供的
    // ...
  }
}
```

### 內建服務

#### Title

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';  // 導入 Title 服務

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [Title],  // 註冊到 AppModule 裡
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';  // 導入 Title 服務

@Component({
  selector: 'app-root',
  template: `
    <button (click)="setTitle('Angular Love')">設置 Title</button>
  `
})
export class AppComponent {
  constructor(private title: Title) { }  // 注入 Title 服務

  public setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
}
```

#### Meta

```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';  // 導入 Meta 服務

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  providers: [Meta],  // 註冊到 AppModule 裡
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';  // 導入 Meta 服務

@Component({
  selector: 'app-root',
  template: `
    <button (click)="setMeta()">設置 Meta</button>
  `
})
export class AppComponent {
  constructor(private meta: Meta) { }  // 注入 Meta 服務

  public setMeta(): void {
    this.meta.addTags({
      name: 'description',
      content: 'Great description is here.'
    });
  }
}
```
