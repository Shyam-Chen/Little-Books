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
import { useSprings, animated } from 'react-spring';
```
