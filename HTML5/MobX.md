# MobX

### Reference Resources (參考資源)

* https://github.com/mobxjs/mobx

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### Table of Contents (目錄)

* Web Storage
* Immutable

***

MobX

```js
import { observable, action } from 'mobx';

export const store = observable({
  /**
   * @name observable
   */
  value: 0,

  /**
   * @name action
   */
  increment: action(() => store.value++),
  decrement: action(() => store.value--),
  incrementAsync: action(() =>
    setTimeout(() => store.increment(), 1000)
  ),
  incrementIfOdd: action(() => {
    if (Math.abs(store.value % 2) === 1) {
      store.increment();
    }
  }),

  /**
   * @name computed
   */
  get evenOrOdd(): string {
    return store.value % 2 === 0 ? 'even' : 'odd';
  }
});
```

```js
import { observable, action, computed } from 'mobx';

class Store {
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

export const store = new Store();
```

```js
import { autorun } from 'mobx';

import { store } from './store';

autorun(() => {
  store.value;  // 0
  store.evenOrOdd;  // even

  store.increment();
  store.value;  // 1
  store.evenOrOdd;  // odd

  store.decrement();
  store.value;  // 0
  store.evenOrOdd;  // even

  store.increment();  // 0 -> 1
  store.incrementIfOdd();  // 1 -> 2
  store.incrementIfOdd();  // 2 -> 2
});
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

不可變

```js
import { Set } from 'immutable';

[...]

  @observable s1 = Set([0, 1, 2]);
  @observable s2 = Set([9, 8, 7]);

[...]
```
