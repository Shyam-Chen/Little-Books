# Redux

### 練習來源
* https://github.com/reactjs/redux
* https://github.com/redux-observable/redux-observable

### 實作執行
* https://github.com/Shyam-Chen/Web-Starter-Kit

***

### 目錄
* [計數器](#計數器)

***

計數器

```js
import { combineReducers, createStore } from 'redux';

// Types
const INCREMENT = 'INCREMENT';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';

// Reducers
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

// Store
const store = createStore(rootReducer);

const render = () => {
  const { counterReducer } = store.getState();
  document.querySelector('#value').innerHTML = counterReducer;
};

store.subscribe(render);
render();

document.querySelector('#increment').onclick = () => store.dispatch(increment());
document.querySelector('#incrementIfOdd').onclick = () => {
  if (store.getState().counterReducer % 2 === 1) {
    store.dispatch(incrementIfOdd());
  }
};
```

```html
Current count: <span id="value">0</span>
<button id="increment">Increment</button>
<button id="incrementIfOdd">Increment If Odd</button>
```

使用 `Epics`

```js
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable-es';

// Types
const INCREMENT = 'INCREMENT';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';

// Reducers
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

// Actions
const increment = () => ({ type: INCREMENT });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

// Epics
const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    ::filter(() => store.getState().counterReducer % 2 === 1)
    ::map(increment);

const rootEpic = combineEpics(incrementIfOddEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

// Store
const rootReducer = combineReducers({ counterReducer });
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
