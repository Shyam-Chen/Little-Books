# Redux

### 練習來源
* https://github.com/reactjs/redux
* https://github.com/redux-observable/redux-observable

### 實作執行
* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### 目錄
* 核心
  * Action
  * Reducer
  * Store
  * Epic

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

計數器

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
      return state.update('counter', value => value + 1);;
    case DECREMENT:
      return state.update('counter', value => value - 1);;
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

const rootEpic = combineEpics(incrementIfOddEpic, decrementIfEvenEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);
const rootReducer = combineReducers({ counterReducer });
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

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
