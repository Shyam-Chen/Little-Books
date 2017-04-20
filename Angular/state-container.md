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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';

import { counterReducer } from './counter.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,

    MdButtonModule,

    StoreModule.provideStore({ counter: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import '@ngrx/core/add/operator/select';

@Component({
  selector: 'app-root',
  template: `
    <div class="content">
      <button md-raised-button (click)="increment()">+</button>
      <button md-raised-button (click)="decrement()">-</button>
      <button md-raised-button (click)="reset()">Reset</button>
      <h3>{{ counter$ | async }}</h3>
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
}
```

```ts
// counter.reducer
import { Action } from '@ngrx/store';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export const counterReducer = (state: number = 0, action: Action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return state;
  }
};
```
