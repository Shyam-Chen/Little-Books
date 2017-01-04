## Redux Observable

練習來源: https://github.com/redux-observable/redux-observable

實作執行: https://github.com/Shyam-Chen/Web-Starter-Kit

***

Counter

```js
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'rollducks';  // `rollducks` 就是 `redux-observable`

const INCREMENT = 'INCREMENT';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';

const increment = () => ({ type: INCREMENT });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

const counter = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
};

const rootReducer = combineReducers({ counter });

const incrementIfOddEpic = (action$, store) =>
  action$.ofType(INCREMENT_IF_ODD)
    ::filter(() => store.getState().counter % 2 === 1)
    ::map(increment);

const rootEpic = combineEpics(incrementIfOddEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

const render = () => {
  const { counter } = store.getState();
  document.querySelector('#value').innerHTML = counter;
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
