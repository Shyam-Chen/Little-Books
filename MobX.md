# MobX

### 練習來源

* https://github.com/mobxjs/mobx

### 實作執行

* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### 目錄

* [核心](#核心)
* [範例](#範例)

***

## 核心

MobX

## 範例

```js
// counter.store.js
import { observer, observable, action, computed } from 'mobx';

@observer
export class CounterStore {
  @observable value: number = 0;

  @action
  increment(): void {
    this.value++;
  }

  @action
  decrement(): void {
    this.value--;
  }

  @action
  incrementAsync(): void {
    setTimeout(() => this.increment(), 1000);
  }

  @action
  incrementIfOdd(): void {
    if (Math.abs(this.value % 2) === 1) {
      this.increment();
    }
  }

  @computed
  get evenOrOdd(): string {
    return this.value % 2 === 0 ? 'even' : 'odd';
  }
}
```

使用 Lodash 函式

```js
import { delay } from 'lodash';

[...]

  @action
  incrementAsync(): void {
    delay(() => this.increment(), 1000);
  }

[...]
```

使用 ReactiveX 操作

```js
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable';
import { delay } from 'rxjs/operator';

[...]

  @action
    incrementAsync(): void {
      Observable::of(null)
        ::delay(1000)
        .subscribe(() => this.increment());
    }

[...]
```

除了可以直接使用第三方的函式庫，
像是在做資料的效能調整或視覺化，
也是可以直接進行操作變化的。

```js
import { Set } from 'immutable';
import { select } from 'd3-selection';


```
