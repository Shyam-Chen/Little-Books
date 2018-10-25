# Pipes (管道)

A pipe takes in data as input and transforms it to a desired output. (管道將資料作為輸入並將其轉換為所需的輸出)

## Built-in Pipes (內建管道)

在使用內建管道時，需要先導入 `CommonModule`

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <NAME>Component } from './<NAME>.component';

@NgModule({
  // ...
  imports: [CommonModule],
  declarations: [<NAME>Component],
  // ...
})
export class <NAME>Module {}
```

### Uppercase (大寫)

Transforms text to all upper case. (將文字轉換成全部大寫)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-uppercase',
  template: `
    <div>{{ 'Angular' | uppercase }}</div>  <!-- Output: ANGULAR -->
  `,
})
export class UppercaseComponent {}
```

API: https://angular.io/api/common/UpperCasePipe

### Lowercase (小寫)

Transforms text to all lower case. (將文字轉換成全部小寫)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-lowercase',
  template: `
    <div>{{ 'Angular' | lowercase }}</div>  <!-- Output: angular -->
  `,
})
export class LowercaseComponent {}
```

API: https://angular.io/api/common/LowerCasePipe

### Titlecase (首字母大寫)

Transforms text to title case. (將文字轉換成首字母大寫)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-titlecase',
  template: `
    <div>{{ 'foo' | titlecase }}</div>  <!-- Output: Foo -->
    <div>{{ 'foo-bar' | titlecase }}</div>  <!-- Output: Foo-bar -->
  `,
})
export class TitlecaseComponent {}
```

API: https://angular.io/api/common/TitleCasePipe

### Date (日期)

Formats a date value according to locale rules. (依據本地規則來格式化日期值)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-date',
  template: `
    <div>{{ today | date }}</div>
    <div>{{ today | date: 'medium' }}</div>
    <div>{{ today | date: 'short' }}</div>
    <div>{{ today | date: 'fullDate' }}</div>
    <div>{{ today | date: 'longDate' }}</div>
    <div>{{ today | date: 'mediumDate' }}</div>
    <div>{{ today | date: 'shortDate' }}</div>
    <div>{{ today | date: 'mediumTime' }}</div>
    <div>{{ today | date: 'shortTime' }}</div>

    <!-- Custom format (自訂格式) -->
    <div>{{ today | date: 'yyyy/MM/dd' }}</div>
  `,
})
export class DateComponent {
  public today: Date = new Date();
}
```

API: https://angular.io/api/common/DatePipe

### Async (非同步)

(1)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-async',
  template: `
    <p>{{ messages | async }}</p>
  `,
})
export class AsyncComponent {
  public messages: string;

  constructor() {
    this.messages = new Promise((resolve) => {
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

API: https://angular.io/api/common/AsyncPipe

### Number (數值)

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

API: https://angular.io/api/common/DecimalPipe

### Percent (百分比)

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

API: https://angular.io/api/common/PercentPipe

### Currency (貨幣)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-currency',
  template: `
    <!-- currency: 貨幣代號: 是否顯示金錢符號: 位數資訊 -->
    <p>{{ price | currency: 'USD': false }}</p>
    <p>{{ price | currency: 'USD': true: '4.2-2' }}</p>
  `,
})
export class CurrencyComponent {
  public price: number = 125.18;
}
```

API: https://angular.io/api/common/CurrencyPipe

### JSON

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

API: https://angular.io/api/common/JsonPipe

### KeyValue (鍵值組)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-keyvalue',
  template: `
    <div>
      <div *ngFor="let item of withObject | keyvalue">
        {{item.key}}:{{item.value}}
      </div>

      <div *ngFor="let item of withMap | keyvalue">
        {{item.key}}:{{item.value}}
      </div>
    </div>
  `,
})
export class KeyValueComponent {
  public withObject = { 2: 'foo', 1: 'bar' };
  public withMap = new Map([[2, 'foo'], [1, 'bar']]);
}
```

API: https://angular.io/api/common/KeyValuePipe

### Slice (裁切)

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'o-slice',
  template: `
    <ul>
      <!-- 從陣列索引的 1 開始 ~ 到 3 結束，但不包含 3 -->
      <li *ngFor="let item of list | slice: 1:3">{{ item }}</li>
    </ul>
  `
})
export class SliceComponent {
  public list: string[] = ['0', '1', '2', '3', '4', '5'];
}
```

API: https://angular.io/api/common/SlicePipe

### I18nSelect (國際化選擇值)

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

API: https://angular.io/api/common/I18nSelectPipe

### i18nPlural (國際化複數值)

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

API: https://angular.io/api/common/I18nPluralPipe

## Custom Pipes (自訂管道)

Ｃreate your own custom pipes. (建立自己的自訂管道)

### Pipe Interface (管道介面)

```ts
export interface Pipe {
  // The pipe name to use in template bindings.
  // (要在模板綁定中使用的管道名稱)
  name: string;

  // If the pipe has internal state, set pure to false.
  // (如果管道具有內部狀態，則將 pure 設為 false)
  pure?: boolean;  // Default: true
}
```

```ts
// <NAME>.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '<NAME>',
})
export class <NAME>Pipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // ...
  }
}
```

```ts
import { NgModule } from '@angular/core';

import { <NAME>Pipe } from './<NAME>.pipe';

@NgModule({
  // ...
  declarations: [<NAME>Pipe],
  // ...
})
export class <NAME>Module {}
```

API: <br>
https://angular.io/api/core/Pipe<br>
https://angular.io/api/core/PipeTransform

### Hands-On Construction (動手打造)

(1) 字節管道

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
})
export class LengthPipe implements PipeTransform {
  transform(value: string): number {
    return value.length;
  }
}
```

```html
<div>{{ 'Angular' | length }}</div>  <!-- Output: 7 -->
```

(2) Truncate (截短)

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: false,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, length: number = 15): string {
    if (value.length <= length) return value;
    return `${value.substring(0, length)}...`;
  }
}
```

(3) 延遲管道

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delay',
  pure: false,
})
export class DelayPipe implements PipeTransform {
  public fetchedValue: any;
  public fetchPromise: Promise;

  transform(value: any, seconds: number): any {
    if (!this.fetchPromise) {
      this.fetchPromise = new Promise((resolve) => {
        setTimeout(() => resolve(value), seconds * 1000);
      });

      this.fetchPromise.then((val: any) => {
        this.fetchedValue = val;
      });
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
