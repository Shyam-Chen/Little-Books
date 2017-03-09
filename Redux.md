# Redux

### 練習來源
* https://github.com/reactjs/redux
* https://github.com/redux-observable/redux-observable

### 實作執行
* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### 目錄

***

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

const counterReducer = (state = 0, action) => {
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

const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    ::filter(() => store.getState().counterReducer % 2 === 1)
    ::map(increment);

const decrementIfEvenEpic = (action$, store) =>
  action$.ofType(DECREMENT_IF_EVEN)
    ::filter(() => store.getState().counterReducer % 2 === 0)
    ::map(decrement);

const rootEpic = combineEpics(incrementIfOddEpic, decrementIfEvenEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);
const rootReducer = combineReducers({ counterReducer });
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

store.subscribe(() => {
  const { counterReducer } = store.getState();
  console.log(counterReducer);
});

store.dispatch(increment());
// 1

store.dispatch(incrementIfOdd());
// 1
// 2

store.dispatch(decrementIfEven());
// 2
// 1

store.dispatch(reset());
// 0

store.dispatch(decrement());
// -1
```

```html

```

TodoMVC

```js

```
