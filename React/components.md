## 元件

```js
import React, { Component } from 'react';

export class Thing {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>Thing Component</div>
    );
  }
}
```

```js
import React from 'react';


export const Thing = (props) => {
  return (
    <div>Thing Component</div>
  );
};
```
