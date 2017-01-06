## Redux Observable

練習來源: https://github.com/redux-observable/redux-observable

實作執行: https://github.com/Shyam-Chen/Web-Starter-Kit

使用 `rollducks` 來實現 `redux-observable` 的 ES6 版本

***

Counter

```js
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'rollducks';

// Action types
const INCREMENT = 'INCREMENT';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';

// Reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({ counterReducer });

// Actions
const increment = () => ({ type: INCREMENT });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

// Epic
const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    ::filter(() => store.getState().counterReducer % 2 === 1)
    ::map(increment);

const rootEpic = combineEpics(incrementIfOddEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

// Configure store
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

const render = () => {
  const { counterReducer } = store.getState();
  document.querySelector('#value').innerHTML = counterReducer;
};

store.subscribe(render);
render();

document.querySelector('#increment').onclick = () => store.dispatch(increment());
document.querySelector('#incrementIfOdd').onclick = () => store.dispatch(incrementIfOdd());
```

```html
Current count: <span id="value">0</span>
<button id="increment">Increment</button>
<button id="incrementIfOdd">Increment If Odd</button>
```
