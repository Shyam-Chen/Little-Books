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

export const Thing = props => {
  return (
    <div>Thing Component</div>
  );
};
```

```js
import React from 'react';

export const Thing = props => (
  <div>Thing Component</div>
);
```

### 屬性

```js
import React from 'react';

export const Foo = props => (
  <div>Foo Component - { props.value }</div>
);
```

```js
import React from 'react';

import { Foo } from './Foo';

export const Thing = props => (
  <div>
    Thing Component
    <Foo value="1" />
    <Foo value="2" />
  </div>
);
```

```js
import React from 'react';

export const Foo = ({ value }) => (
  <div>Foo Component - { value }</div>
);
```
