## 管道

管道可以讓我們在模板中轉換顯示內容。

### 內建管道

#### 大小寫

```ts
import { Component } from '@angular/core';
import { COMMON_PIPES } from '@angular/common';

@Component({
  selector: 'ap-uppercase-lowercase',
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
  selector: 'ap-date',
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
  selector: 'ap-async',
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
  selector: 'ap-async-date',
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
  selector: 'ap-number',
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
  selector: 'ap-percent',
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
  selector: 'ap-currency',
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
  selector: 'ap-json',
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
  selector: 'ap-replace',
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
  selector: 'ap-i18nSelect',
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
  selector: 'ap-i18nPlural',
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
  pure: false,  // 用於串接用
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
  <span>{{ '字' | delay: 1 | delay: 1 }}</span>
  <span>{{ '一' | delay: 3 }}</span>
  <span>{{ '個' | delay: 4 }}</span>
  <span>{{ '一' | delay: 5 }}</span>
  <span>{{ '個' | delay: 6 }}</span>
  <span>{{ '跑' | delay: 7 }}</span>
  <span>{{ '出' | delay: 8 }}</span>
  <span>{{ '來' | delay: 9 }}</span>
</p>
```
