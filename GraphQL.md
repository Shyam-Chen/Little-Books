# GraphQL

### 練習來源

* https://github.com/graphql/graphiql

### 實作執行

* https://github.com/Shyam-Chen/Frontend-Starter-Kit
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄

* [核心](#核心)
* [型別](#型別)
* [用戶端](#用戶端)

***

為什麼會有 GraphQL 的出現？在使用 RESTful API 的時候，往往我們只需要一小塊的資料，卻要向伺服器請求整塊的資料，因此 GraphQL 的出現，解決了從用戶端到伺服端不斷增加 API 請求所衍生的問題。

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
<!-- public/index.html -->
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

***

```js
// app.js
import express from 'express';
import graphql from 'express-graphql';

import { schema } from './graphql';

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use('/graphql', graphql({
  schema,
  graphiql: true
}));

app.listen(app.get('port'), () => {
  console.log(`Port: ${app.get('port')}.`);
});
```

```js
// graphql.js
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

// 這裡之後換成從 mongoose 的模型取得
const data = {
  "1": { "id": "1", "name": "Foo" },
  "2": { "id": "2", "name": "Bar" },
  "3": { "id": "3", "name": "Baz" }
};

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: new GraphQLObjectType({
          name: 'User',
          fields: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
          }
        }),
        args: {
          id: { type: GraphQLID }
        },
        resolve(_, args) {
          return data[args.id];
        }
      }
    }
  })
});
```

查詢

```js
{
  user(id: "1") {
    name
  }
}
```

回傳

```js
{
  "data": {
    "user": {
      "name": "Foo"
    }
  }
}
```

## 型別

基本:
* `GraphQLSchema`
* `GraphQLObjectType`

定標:
* `GraphQLInt` or `GraphQLFloat`
* `GraphQLString`
* `GraphQLBoolean`
* `GraphQLID`

介面: `GraphQLInterfaceType`

列舉: `GraphQLEnumType`

## 用戶端

```bash
$ npm i apollo-client -S
```

```js
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8000/__/graphql'  // GraphQL Server
  })
});

client.query({
    query: gql`
      {
        users {
          name
        }
      }
    `
  })
  .then(res => console.log(res));
```
