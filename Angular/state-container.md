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
// models.ts
export interface CounterState {
  counter: number;
}

export const INITIAL_COUNTER_STATE: CounterState = {
  counter: 0
};
```

```ts
// actions.ts
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
```

```ts
// reducer.ts
import { Action } from '@ngrx/store';

import { INITIAL_COUNTER_STATE } from './models';
import { INCREMENT, DECREMENT, RESET } from './actions';

export const counterReducer = (state = INITIAL_COUNTER_STATE, action: Action) => {
  const { type } = action;

  switch (type) {
    case INCREMENT:
      return Object.assign({}, state, { counter: state.counter + 1 });
      // 或者
      // return { ...state, counter: state.counter + 1 };  // 使用 Object.assign 較為標準化，但是需要加 polyfill 以支持較舊的瀏覽器
    case DECREMENT:
      return Object.assign({}, state, { counter: state.counter - 1 });
      // return { ...state, counter: state.counter - 1 };
    case RESET:
      return Object.assign({}, state, { counter: 0 });
      // return INITIAL_COUNTER_STATE;
    default:
      return state;
  }
};
```

```ts
// effects.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { INCREMENT_IF_ODD, DECREMENT_IF_EVEN, increment, decrement } from './actions';

@Injectable()
export class CounterEffects {
  @Effect() incrementIfOdd$ = this.actions$
    .ofType(INCREMENT_IF_ODD)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.counter % 2 === 1)
    .map(increment);

  @Effect() decrementIfEven$ = this.actions$
    .ofType(DECREMENT_IF_EVEN)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.counter % 2 === 0)
    .map(decrement);

  constructor(private actions$: Actions, private state$: Store<CounterState>) { }
}
```

```ts
// app.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import '@ngrx/core/add/operator/select';

import { increment, decrement, reset, incrementIfOdd, decrementIfEven } from './actions';

@Component({
  selector: 'app-root',
  template: `
    <div class="counter">
      <button (click)="increment()">增加</button>
      <button (click)="decrement()">減少</button>
      <button (click)="reset()">重設</button>
      <button (click)="incrementIfOdd()">增加 (如果是奇數)</button>
      <button (click)="decrementIfEven()">減少 (如果是偶數)</button>
      <h3>當前計數值: {{ counter$ | async }}</h3>
    </div>
  `
})
export class AppComponent {
  public counter$: Observable<number>;

  constructor(private store: Store<number>) {
    this.counter$ = this.store.select<number>('counter');
  }

  increment(): void {
    this.store.dispatch(increment());
  }

  decrement(): void {
    this.store.dispatch(decrement());
  }

  reset(): void {
    this.store.dispatch(reset());
  }

  incrementIfOdd(): void {
    this.store.dispatch(incrementIfOdd());
  }

  decrementIfEven(): void {
    this.store.dispatch(decrementIfEven());
  }
}
```

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { counterReducer } from './reducer';
import { CounterEffects } from './effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.provideStore(counterReducer),
    EffectsModule.run(CounterEffects)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

改造計數器

```ts
[...]

export const counterReducer = (state = INITIAL_COUNTER_STATE, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    case INCREMENT:
      return Object.assign({}, state, { counter: state.counter + payload.value });  // 透過 payload 來自定變更值
    case DECREMENT:
      return Object.assign({}, state, { counter: state.counter - payload.value });
    case RESET:
      return Object.assign({}, state, { counter: 0 });
    default:
      return state;
  }
};

[...]
```

```ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { INCREMENT_IF_ODD, DECREMENT_IF_EVEN, INCREMENT, DECREMENT } from './actions';

@Injectable()
export class CounterEffects {
  @Effect() incrementIfOdd$ = this.actions$
    .ofType(INCREMENT_IF_ODD)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.counter % 2 === 1)
    .map(res => ({ type: INCREMENT, payload: res }));

  @Effect() decrementIfEven$ = this.actions$
    .ofType(DECREMENT_IF_EVEN)
    .withLatestFrom(this.state$)
    .filter(([action, state]) => state.counter % 2 === 0)
    .map(res => ({ type: DECREMENT, payload: res }));

  constructor(private actions$: Actions, private state$: Store<CounterState>) { }
}
```
