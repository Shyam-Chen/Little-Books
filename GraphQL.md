# GraphQL

### 練習來源
* https://github.com/graphql/graphiql

### 實作執行
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* [核心](#核心)

***

## 核心

建立 GraphQL 伺服器

```js
// app.js
import express from 'express';
import graphql from 'express-graphql';

import { schema, rootValue } from './graphql';

const app = express();

app.set('port', (process.env.PORT || 8000));

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

```js
$ nodemon app.js --exec babel-node
```

http://localhost:8000/graphql

查詢 `helloWorld`

```js
{
  helloWorld
}
```

查詢結果

```js
{
  "data": {
    "helloWorld": "Hello World"
  }
}
```

用戶端取得資料

```bash
$ curl -X POST \
    -H "Content-Type: application/json" \
    -d '{ "query": "{ helloWorld }" }' \
    http://localhost:8000/graphql

# { "data": { "helloWorld": "Hello World" } }
```

```js
import { join } from 'path';

app.use(express.static(join(__dirname, '../public')));
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>GraphQL</title>
  </head>
  <body>
    <script>
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('POST', '/graphql');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onload = () => console.log('GraphQL:', xhr.response);
      xhr.send(JSON.stringify({ query: '{ helloWorld }' }));
    </script>
  </body>
</html>
```
