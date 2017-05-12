# GraphQL

### 練習來源
* https://github.com/graphql/graphiql

### 實作執行
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄

***

建立 GraphQL 伺服器

```js
// app.js
import express from 'express';
import graphql from 'express-graphql';

import { schema } from './schema';

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use('/graphql', graphql({
  schema,
  graphiql: true,
  rootValue: {
    helloWorld() {
      return 'Hello World';
    }
  }
}));

app.listen(app.get('port'), () => {
  console.log(`Port: ${app.get('port')}.`);
});
```

```js
// schema.js
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    helloWorld: String
  }
`);
```

```js
$ babel-node app.js
```
