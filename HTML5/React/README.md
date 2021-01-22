# React

---

### Table of Contents

- Styling
- Routing
- State Management

---

```js
// webpack.config.js
const config = {
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
};
```

```js
import React from 'react';

const Hello = () => <div>Hello, React!</div>;
```

```js
function Layout(props) {
  // Use the standard class attribute instead of className in Preact.
  return <div class="container">{props.children}</div>;
}
```

```js
import React, { useState } from 'react';

const Comp = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  );
};

export default Comp;
```

## Styling

```js
import styled from '@emotion/styled';

const Comp = styled.div`
  display: flex;
`;
```

## Animations

```js
import { useSpring, animated } from 'react-spring';

const colorSpring = useSpring({
  to: [
    { opacity: 1, color: '#ffaaee' },
    { opacity: 0, color: 'rgb(14,26,19)' },
  ],
  from: { opacity: 0, color: 'red' },
});

const AnimatedColor = () => <animated.div style={colorSpring}>I will fade in and out</animated.div>;
```

```js
import { Spring } from 'react-spring/renderprops';

const Fade = () => (
  <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
    {(fadeSpring) => <div style={fadeSpring}>Hello</div>}
  </Spring>
);
```
