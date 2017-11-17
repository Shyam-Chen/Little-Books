## GraphQL

建立一個簡單的 GraphQL 伺服器

```js
// app.js
const express = require('express');
const graphql = require('express-graphql');

const { schema, rootValue } = require('./graphql');

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/graphql', graphql({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(app.get('port'), () => {
  console.log(`Port: ${app.get('port')}.`);
});
```

```js
// graphql.js
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    helloWorld: String
  }
`);

export const rootValue = {
  helloWorld() {
    return 'Hello World';
  }
};
```

```bash
$ node app.js
```

```ts
// src/app/graphql.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GraphqlService {
  readonly dataUrl = 'http://localhost:8000/graphql';

  constructor(private http: HttpClient) {}

  private graphqlMethod(): any {
    // TODO: ...
  };
}
```

```bash
$ yarn add apollo-angular apollo-angular-link-http apollo-client apollo-cache-inmemory graphql-tag graphql
```
