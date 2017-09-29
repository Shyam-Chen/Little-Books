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
  * Effect
* 整合 IndexedDB
* [範例](#範例)
  * [計數器](#計數器)
  * 增刪改查

***

## 核心

Redux 是負責管理狀態的，所有的狀態都會透過 Redux 來操作，就是個狀態容器。

在 Redux 中會有這三個概念：Action、Reducer 和 Store，
除了 Redux 本身之外，還有 Effect 和 Getter，
Effect 有很多種，主要常見的會有 Thunk、Saga 和 Observable 這些，
最為高階是 Observable，這個概念會透過 Redux Observable 來實現，
在 Redux Observable 這個概念會稱作 Epics，
Getter 則是在 Store 操作資料變化，這可以減少渲染的時間，這個概念會透過 Reselect 來實現。


```js
import { createStore, combineReducers, bindActionCreators, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
```

## 範例

### 計數器

```js
import { filter, map } from 'rxjs/operator';
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
// root.js
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
import { template as _ } from 'lodash';

import { store } from '../../root';

import { increment, decrement, reset, incrementIfOdd, decrementIfEven } from './actions';

import template from './counter.html';
import style from './counter.css';

const imports = { style };

export const counter = name => {
  document.querySelector(`#${name}[data-counter]`).innerHTML = _(template, { imports });

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
};
```
