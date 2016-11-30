## Observables

Observables 是一個新的型別，在未來的 ES 標準中出現是有可能的。

這種概念是從一個串流的 `subscribe` 事件方式傳入一個 Generator，不過重要的是 Iterator 部分。

### 基本應用

首先載入 `Observable`
```ts
import { Observable } from 'rxjs/Observable';
```

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'root-app',
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
    this.data = new Observable(observer => {
      setTimeout(() => observer.next('1'), 0);
      setTimeout(() => observer.next('2'), 1000);
      setTimeout(() => observer.next('3'), 2000);
      setTimeout(() => observer.complete(), 3000);
    });

    let subscription = this.data.subscribe(
      value => this.values.push(value),
      () => new Error('初始化'),
      () => this.finished = '完成'
    );
  }
}
```

```js
const foo = async (x) => {  
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log(2)), x);
  });
}

const bar = async () => {
  console.log(1);
  await foo(1000);
  setTimeout(() => console.log(3), 1000);
}

bar();
// 1
// 2 (print after 1 second)
// 3 (print after 2 seconds)
```
