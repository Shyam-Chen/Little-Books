# Redux

### 練習來源
* https://github.com/reactjs/redux
* https://github.com/redux-observable/redux-observable

### 實作執行
* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### 目錄
* [核心](#核心)
  * Action
  * Reducer
  * Store
  * Epic
* [範例](#範例)
  * [計數器](#計數器)
  * TodoMVC

***

## 核心

Redux 是負責管理狀態的，所有的狀態都會透過 Redux 來操作，就是個狀態容器。

在 Redux 中會有這三個概念：Action、Reducer 和 Store，
而額外的效果是透過 Redux Observable，這個概念稱作 Epic。

Action 還可在分為兩個概念：Type 和 Creator，
Reducer 會根據 Action 的 Type 來做相對應的操作，
Epic 為 Action 和 Reducer 增加額外的效果，
最後就是把 Store 建立起來，執行 Action 的 Creator。

```js
import { createStore, combineReducers, bindActionCreators, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
```

## 範例

### 計數器

```js
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { Map } from 'immutable';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
const DECREMENT_IF_EVEN = 'DECREMENT_IF_EVEN';

const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });
const decrementIfEven = () => ({ type: DECREMENT_IF_EVEN });

const counterReducer = (state = Map({ counter: 0 }), action) => {
  switch (action.type) {
    case INCREMENT:
      return state.update('counter', value => value + 1);
    case DECREMENT:
      return state.update('counter', value => value - 1);
    case RESET:
      return 0;
    default:
      return state;
  }
};

const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    ::filter(() => store.getState().counterReducer.get('counter') % 2 === 1)
    ::map(increment);

const decrementIfEvenEpic = (action$, store) =>
  action$.ofType(DECREMENT_IF_EVEN)
    ::filter(() => store.getState().counterReducer.get('counter') % 2 === 0)
    ::map(decrement);

const rootEpic = combineEpics(
  incrementIfOddEpic,
  decrementIfEvenEpic
);

const rootReducer = combineReducers({
  counterReducer
});

const epicMiddleware = createEpicMiddleware(rootEpic);

export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

store.subscribe(() => {
  const { counterReducer } = store.getState();
  console.log(counterReducer.get('counter'));
});

store.dispatch(increment());  // 1
store.dispatch(incrementIfOdd());  // 1 -> 2
store.dispatch(decrementIfEven());  // 2 -> 1
store.dispatch(reset());  // 0
store.dispatch(decrement());  // -1
```

```js
// actions.js
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

```js
// reducer.js
import { Map } from 'immutable';
import { INCREMENT, DECREMENT, RESET } from './actions';

export const counterReducer = (state = Map({ counter: 0 }), action) => {
  switch (action.type) {
    case INCREMENT:
      return state.update('counter', value => value + 1);
    case DECREMENT:
      return state.update('counter', value => value - 1);
    case RESET:
      return state.update('counter', () => 0);
    default:
      return state;
  }
};
```

```js
// epics.js
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';

import { INCREMENT_IF_ODD, DECREMENT_IF_EVEN, increment, decrement } from './actions';

export const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    ::filter(() => store.getState().counterReducer.get('counter') % 2 === 1)
    ::map(increment);

export const decrementIfEvenEpic = (action$, store) =>
  action$.ofType(DECREMENT_IF_EVEN)
    ::filter(() => store.getState().counterReducer.get('counter') % 2 === 0)
    ::map(decrement);
```

```js
// store.js
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { incrementIfOddEpic, decrementIfEvenEpic, counterReducer } from './containers/counter';

const rootEpic = combineEpics(
  incrementIfOddEpic,
  decrementIfEvenEpic
);

const rootReducer = combineReducers({
  counterReducer
});

const epicMiddleware = createEpicMiddleware(rootEpic);

export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
```

```js
// counter.js
import { store } from './store';

import { increment, decrement, reset, incrementIfOdd, decrementIfEven } from './actions';

document.querySelector(`#ex`).innerHTML = `
  <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
    <thead>
      <tr>
        <th style="text-align: center">
          Current Count: <span id="value" class="mdl-color-text--indigo-500">0</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center">
          <button id="increment" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">add</i> Increment
          </button>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <button id="decrement" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">remove</i> Decrement
          </button>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <button id="reset" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">clear</i> Reset
          </button>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <button id="incrementIfOdd" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">add</i> Increment if odd
          </button>
        </td>
      </tr>
      <tr>
        <td style="text-align: center">
          <button id="decrementIfEven" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">
            <i class="material-icons">remove</i> Decrement if even
          </button>
        </td>
      </tr>
    </tbody>
  </table>
`;

const render = () => {
  const { counterReducer } = store.getState();
  document.querySelector('#value').innerHTML = counterReducer.get('counter');
};

store.subscribe(render);
render();

document.querySelector('#increment').onclick = () => store.dispatch(increment());
document.querySelector('#decrement').onclick = () => store.dispatch(decrement());
document.querySelector('#reset').onclick = () => store.dispatch(reset());
document.querySelector('#incrementIfOdd').onclick = () => store.dispatch(incrementIfOdd());
document.querySelector('#decrementIfEven').onclick = () => store.dispatch(decrementIfEven());
```
