## Redux

練習來源: https://github.com/reactjs/redux

實作執行: https://github.com/Shyam-Chen/Web-Starter-Kit

***

計數器

```js
import { combineReducers, createStore } from 'redux';

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

// Configure store
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
