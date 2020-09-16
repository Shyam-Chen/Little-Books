# Express

---

### Table of Contents (目錄)

- [Getting Started (入門)](#getting-started-入門)
  - [Routing (路由)](#路由)
  - [Middlewares (中介軟體)](#中介軟體)
  - Request and Response (請求和回應)
- REST (表徵狀態轉移)
- [Mongoose](#mongoose)
- Storage‎ (存儲)
- Messaging (訊息)
- Payment (金流)
- [GraphQL](#graphql)

---

## Getting Started (入門)

Install Express (安裝 Express)

```bash
$ npm i express -S
$ npm i nodemon babel-node -D
# or
$ yarn add express
$ yarn add nodemon babel-node -D
```

Create an Express server (建立 Express 伺服器)

```js
// app.js
import express from 'express';

const app = express();

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
  console.log(`Port: ${app.get('port')}.`);
});
```

```bash
$ nodemon app.js --exec babel-node
```

### 路由

路由是一種通過 URL 和 HTTP 操作，映射到指定的請求處理的方式

```js
app.get('/', (req, res) => {
  res.end('Home Page');
});

app.get('/about', (req, res) => {
  res.end('About Page');
});
```

http://localhost:8000/

http://localhost:8000/about

#### 路由參數

```js
app.get('/text/:id', (req, res) => {
  const text = req.params.text;
  res.json({ text });
});
```

http://localhost:8000/text/foo

```js
app.get('/random/:min/:max', (req, res) => {
  const min = Number(req.params.min);
  const max = Number(req.params.max);
  const result = Math.round(Math.random() * (max - min) + min);

  res.json({ result });
});
```

http://localhost:8000/random/1/100

#### 路由查詢

```js
app.get('/text', (req, res) => {
  const { text } = req.query;
  res.json({ text });
});
```

```bash
$ curl http://localhost:8000/text?text=foo
```

#### 路由拆分

```js
app.use('/api', () => {
  console.log('USE action');
});

app.get('/api', (req, res) => {
  res.send('GET request');
});

app.post('/api', (req, res) => {
  res.send('POST request');
});

app.put('/api', (req, res) => {
  res.send('PUT request');
});

app.delete('/api', (req, res) => {
  res.send('DELETE request');
});
```

```bash
$ curl http://localhost:8000/api
# GET request

$ curl -X POST http://localhost:8000/api
# POST request

$ curl -X PUT http://localhost:8000/api
# PUT request

$ curl -X DELETE http://localhost:8000/api
# DELETE request
```

```js
app.all('/thing', (req, res, next) => {
  console.log('Accessing the thing section ...');
  next();
});
```

#### 路由功能

```js
// foo.js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('foo');
});

export default router;
```

```js
// bar.js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('bar');
});

export default router;
```

```js
[...]

import { foo } from './foo';
import { bar } from './bar';

[...]

app.use('/foo', foo);
app.use('/bar', bar);

[...]
```

### 中介軟體

Express 的中介軟體模組

- `body-parser` - 解析 HTTP 請求的 Body
- `compression` - 壓縮 HTTP 回應
- `connect-rid` - 產生讀一無二的請求 ID
- `cookie-parser` -
- `cookie-session` - 設立基於 cookie 的 sessions
- `cors` - 啟用具有各種選項的跨源資源共享 (CORS)
- `csurf` -
- `errorhandler` - 開發用的錯誤處理/除錯
- `method-override` - 使用表頭覆蓋 HTTP 方法
- `morgan` - HTTP 請求記錄器
- `multer` - 處理多部分表單資料
- `response-time` - 紀錄 HTTP 回應時間
- `serve-favicon` - 提供一個圖標
- `serve-index` - 為給定的路徑提供目錄列表
- `serve-static` - 提供靜態檔案
- `session` - 設立基於伺服器的 sessions (僅限開發用)
- `timeout` - 設定 HTTP 請求處理的超時時間
- `vhost` - 建立虛擬網域

## REST

### 增刪改查

```js
import { Router } from 'express';

import { List } from '~/models'; // Mongoose 模型

const router = Router();
/**
 * @name list - get a list
 * @param {string} _id - get a item by ID
 * @param {string} text - search for text in list
 * @return {Array<List>}
 *
 * @example GET /__/list
 * @example GET /__/list?_id=${_id}
 * @example GET /__/list?text=${text}
 */
router.get('/', async (req, res, next) => {
  try {
    const { _id, text } = req.query;
    const find = {};

    if (_id) find._id = { _id };
    if (text) find.text = { $regex: text, $options: 'i' };

    const data = await List.find(find).exec();

    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @name count - get a list length
 * @return {number}
 *
 * @example GET /__/list/count
 */
router.get('/count', async (req, res, next) => {
  try {
    const data = await List.count().exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @name pagination - get a list of paging
 * @param {number} page - current page number
 * @param {number} row - rows per page
 * @return {Array<List>}
 *
 * @example GET /__/list/pagination/${page}/${row}
 */
router.get('/pagination/:page/:row', async (req, res, next) => {
  try {
    const row = Number(req.params.row);
    const list = await List.find({}).exec();
    const data = [];

    for (let i = 0, l = list.length; i < l / row; i++) {
      if (Number(req.params.page) === i + 1) {
        data.push(
          List.find({})
            .skip(i * row)
            .limit(row),
        );
      }
    }

    res.json(await Promise.all(data));
  } catch (err) {
    next(err);
  }
});

/**
 * @name create - create a item
 *
 * @example POST /__/list
 */
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400);
      res.json({ message: 'Please pass text.' });
      return;
    }

    const list = await new List(req.body);
    const message = await list.save().then(() => 'List saved');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name update - update a item
 *
 * @example PUT /__/list/${id}
 */
router.put('/:id', async (req, res, next) => {
  try {
    const message = await List.findOneAndUpdate({ _id: req.params.id }, req.body).then(
      () => 'List updated',
    );

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

/**
 * @name delete - remove a item
 *
 * @example DELETE /__/list/${id}
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const message = await List.findByIdAndRemove(req.params.id).then(() => 'List deleted');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;
```

## Mongoose

## 核心

```bash
$ npm i mongoose -S
```

```js
import mongoose from 'mongoose';

mongoose.connect('mongodb://web-go:web-go@ds133961.mlab.com:33961/web-go-demo');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('Connection Succeeded.'));
```

### 綱要

綱要型別 (SchemaTypes):

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

```js
import { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
```

建立模型

```js
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = mongoose.model('user', userSchema);
```

實體方法

```js
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.methods.foo = () => ...;
userSchema.statics.bar = () => ...;

export const User = mongoose.model('user', userSchema);
```

```js
import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: String,
  created: Date,
});

const List = mongoose.model('List', listSchema);
```

### 新增

```js
const list = new List(req.body);

list.save((err) => {
  if (err) return next(err);
  res.json({ message: 'List saved' });
});
```

### 讀取

```js
List.find({}, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

```js
List.findById(<ID>, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 更新

```js
List.findById(req.params.id, (err, data) => {
  if (err) return next(err);

  for (let prop in req.body) {
    data[prop] = req.body[prop];
  }

  data.save((err) => {
    if (err) return next(err);
    res.json({ message: 'List updated' });
  });
});
```

### 刪除

```js
List.findByIdAndRemove(req.params.id, (err) => {
  if (err) return next(err);
  res.json({ message: 'List deleted' });
});
```

## 存儲

### 檔案上傳

```bash
$ npm i multer -S
```

## 訊息

### Email

```bash
$ npm i nodemailer -S
```

### SMS

```bash
$ npm i textmagic-rest-client -S
```

## 金流

### REST

```bash
$ npm i paypal-rest-sdk -S
```

### 快速結帳

```bash
$ npm i paypal-express-checkout -S
```

### 自適應

```bash
$ npm i paypal-adaptive -S
```

## 其他

### 網路爬蟲

```js
import request from 'request';

request('https://www.sitepoint.com/', (error, response, body) => {
  console.log(body);
});
```

```js
import request from 'request';
import { createWriteStream } from 'fs';

request('https://www.sitepoint.com/').pipe(createWriteStream('index.html'));
```

## GraphQL

為什麼會有 GraphQL 的出現？在使用 RESTful API 的時候，往往我們只需要一小塊的資料，卻要向伺服器請求整塊的資料，因此 GraphQL 的出現，解決了從用戶端到伺服端不斷增加 API 請求所衍生的問題。

#### 核心

建立 GraphQL 伺服器

```js
// app.js
import express from 'express';
import graphql from 'express-graphql';

import { schema, rootValue } from './graphql';

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(
  '/graphql',
  graphql({
    schema,
    rootValue,
    graphiql: true,
  }),
);

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
  },
};
```

```js
$ nodemon app.js --exec babel-node
```

http://localhost:8000/graphql

查詢 `helloWorld`

```js
{
  helloWorld;
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
    <meta charset="utf-8" />
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

---

```js
// app.js
import express from 'express';
import graphql from 'express-graphql';

import { schema } from './graphql';

const app = express();

app.set('port', process.env.PORT || 8000);

app.use(
  '/graphql',
  graphql({
    schema,
    graphiql: true,
  }),
);

app.listen(app.get('port'), () => {
  console.log(`Port: ${app.get('port')}.`);
});
```

```js
// graphql.js
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

// 這裡之後換成從 mongoose 的模型取得
const data = {
  1: { id: '1', name: 'Foo' },
  2: { id: '2', name: 'Bar' },
  3: { id: '3', name: 'Baz' },
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
          },
        }),
        args: {
          id: { type: GraphQLID },
        },
        resolve(_, args) {
          return data[args.id];
        },
      },
    },
  }),
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

#### 型別

基本:

- `GraphQLSchema`
- `GraphQLObjectType`

定標:

- `GraphQLInt` or `GraphQLFloat`
- `GraphQLString`
- `GraphQLBoolean`
- `GraphQLID`

介面: `GraphQLInterfaceType`

列舉: `GraphQLEnumType`

#### 用戶端

```bash
$ npm i apollo-client -S
```

```js
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8000/__/graphql', // GraphQL Server
  }),
});

client
  .query({
    query: gql`
      {
        users {
          name
        }
      }
    `,
  })
  .then((res) => console.log(res));
```
