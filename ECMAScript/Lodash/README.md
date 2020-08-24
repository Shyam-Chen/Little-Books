# Lodash

for Babel

```sh
$ yarn add lodash
$ yarn add babel-plugin-lodash -D
```

```js
import _ from 'lodash';

_.flow();

// don't use
_.chain();
```

for TypeScript

```sh
$ yarn add lodash-es
$ yarn add @types/lodash-es -D
```

```js
// tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./",
    "paths": {
      // ...
      "lodash/*": ["node_modules/lodash-es/*"],
      // ...
    },
    // ...
  },
  // ...
}
```

```ts
import flow from 'lodash/flow';

flow();
```
