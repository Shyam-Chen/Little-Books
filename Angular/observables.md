## Observables

[Observables](https://github.com/tc39/proposal-observable) 是一個未來 ECMAScript 的新型別。

這種概念是從一個串流的 `subscribe` 事件方式傳入一個 Generator (產生器)，而產生器會使用 Iterator (迭代器)。

透過 RxJS 來使用 Observable，RxJS 可以說是非同步 Lodash。

### 基本應用

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: `
   <button (click)="init()">初始化</button>
   <div *ngFor="let value of values">{{ value }}</div>
   <div>{{ finished }}</div>
  `
})
export class AppComponent {
  private data: Observable<Array<string>>;
  private values: string[] = [];
  private finished: string;

  init() {
    // 一個 Observer (觀察者)
    this.data = new Observable(observer => {
      // 回呼方法: next()、error() 和 complete()
      setTimeout(() => observer.next('開始'), 0);
      setTimeout(() => observer.next('第一個'), 1000);
      setTimeout(() => observer.next('第二個'), 2000);
      setTimeout(() => observer.next('第三個'), 3000);
      setTimeout(() => observer.complete(), 4000);
    });

    let subscription = this.data.subscribe(  // 訂閱一個或多個 Observable (可觀察的物件)
      value => this.values.push(value),
      () => console.error('錯誤'),
      () => this.finished = '完成'
    );
  }
}
```
