## 狀態容器

Redux 是負責管理狀態的，所有的狀態都會透過 Redux 來操作，就是個狀態容器。

在 Redux 中會有這三個概念：Action、Reducer 和 Store，
而額外的 Effects 是透過 Redux Observable，在 Redux Observable 中稱作 Epic。

Action 還可在分為兩個概念：Type 和 Creator，
Reducer 會根據 Action 的 Type 來做相對應的操作，
再來是 Epic，Epic 為 Action 和 Reducer 增加額外的 Effects，
最後就是把 Store 建立起來。

### 基本應用

這裡透過 [@ngrx/store](https://github.com/ngrx/store) 來實現 Redux，
以及 [@ngrx/effects](https://github.com/ngrx/effects) 來實現 Redux Observable。

```bash
$ npm i @ngrx/core @ngrx/store @ngrx/effects -S
```

```ts
// reducers/counter.ts
import { Action } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
export const DECREMENT_IF_EVEN = 'DECREMENT_IF_EVEN';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
export const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });
export const decrementIfEven = () => ({ type: DECREMENT_IF_EVEN });

export const counterReducer = (state = { value: 0 }, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, state, { value: state.value + 1 });
    case DECREMENT:
      return Object.assign({}, state, { value: state.value - 1 });
    case RESET:
      return Object.assign({}, state, { value: 0 });
    default:
      return state;
  }
};
```

```ts
// effects/counter.ts
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { INCREMENT_IF_ODD, DECREMENT_IF_EVEN, increment, decrement } from '../reducers/counter';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions) { }

  @Effect() iio$ = this.actions$
    .ofType(INCREMENT_IF_ODD)
    .filter(value => value % 2 === 1)
    .map(increment);

  @Effect() iie$ = this.actions$
    .ofType(DECREMENT_IF_EVEN)
    .filter(value => value % 2 === 0)
    .map(decrement);
}
```

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import '@ngrx/core/add/operator/select';

@Component({
  selector: 'app-root',
  template: `
    <div class="counter">
      <button (click)="increment()">增加</button>
      <button (click)="decrement()">減少</button>
      <button (click)="reset()">重設</button>
      <button (click)="incrementIfOdd()">增加 (如果是奇數)</button>
      <button (click)="decrementIfEven()">減少 (如果是偶數)</button>
      <h3>當前的計數值: {{ counter$ | async }}</h3>
    </div>
  `
})
export class AppComponent {
  public counter$: Observable<number>;

  constructor(private store: Store<number>) {
    this.counter$ = this.store.select<number>('counter');
  }

  increment(): void {
    this.store.dispatch({ type: 'INCREMENT' });
  }

  decrement(): void {
    this.store.dispatch({ type: 'DECREMENT' });
  }

  reset(): void {
    this.store.dispatch({ type: 'RESET' });
  }

  incrementIfOdd(): void {
    this.store.dispatch({ type: 'INCREMENT_IF_ODD' });
  }

  decrementIfEven(): void {
    this.store.dispatch({ type: 'DECREMENT_IF_EVEN' });
  }
}
```

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { counterReducer } from '../reducers/counter';
import { CounterEffects } from '../effects/counter';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.provideStore({ counter: counterReducer }),
    EffectsModule.run(CounterEffects)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
