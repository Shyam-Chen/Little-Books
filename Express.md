# Express

### Reference Resources (參考資源)

* https://github.com/expressjs/express

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

* [Getting Started (入門)](#getting-started-入門)
  * [Routing (路由)](#路由)
  * [Middlewares (中介軟體)](#中介軟體)
  * Request and Response (請求和回應)
* REST (表徵狀態轉移)
* Storage‎ (存儲)
* Messaging (訊息)
  * Email (電子郵件)
  * SMS (簡訊)
* Payment (金流)
  * Stripe
  * PayPal
* Google Places (興趣點)
* Crawler (網路爬蟲)
* QR Code (二維碼)

***

## Getting Started (入門)

Install Express (安裝 Express)

```bash
$ npm i express -S
$ npm i nodemon babel-node -D
# or
$ yarn add express
$ yarn add nodemon babel-node -D
```

Create an express server (建立 Express 伺服器)

```js
// app.js
import express from 'express';

const app = express();

app.set('port', (process.env.PORT || 8000));

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
  const result = Math.round((Math.random() * (max - min)) + min);

  res.json({ result });
});
```

http://localhost:8000/random/1/100

```js
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
```

```js
app.all('/thing', (req, res, next) => {
  console.log('Accessing the thing section ...');
  next();
});
```

```js
// routes/thing.js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Thing');
});

export const thingRoutes = router;
```

```js
// app.js
[...]

import { thingRoutes } from './routes/thing';

[...]

app.use('/thing', thingRoutes);

[...]
```

本版化

```js

```

### 中介軟體

Express 的中介軟體模組
* `body-parser` - 解析 HTTP 請求的 Body
* `compression` - 壓縮 HTTP 回應
* `connect-rid` - 產生讀一無二的請求 ID
* `cookie-parser` -
* `cookie-session` - 設立基於 cookie 的 sessions
* `cors` - 啟用具有各種選項的跨源資源共享 (CORS)
* `csurf` -
* `errorhandler` - 開發用的錯誤處理/除錯
* `method-override` - 使用表頭覆蓋 HTTP 方法
* `morgan` - HTTP 請求記錄器
* `multer` - 處理多部分表單資料
* `response-time` - 紀錄 HTTP 回應時間
* `serve-favicon` - 提供一個圖標
* `serve-index` - 為給定的路徑提供目錄列表
* `serve-static` - 提供靜態檔案
* `session` - 設立基於伺服器的 sessions (僅限開發用)
* `timeout` - 設定 HTTP 請求處理的超時時間
* `vhost` - 建立虛擬網域

## REST

### 增刪改查

```js
import { Router } from 'express';

import { List } from '../models';  // Mongoose 模型

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
      if (Number(req.params.page) === (i + 1)) {
        data.push(List.find({}).skip(i * row).limit(row));
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
    const message = await List
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => 'List updated');

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
    const message = await List
      .findByIdAndRemove(req.params.id)
      .then(() => 'List deleted');

    res.json({ message });
  } catch (err) {
    next(err);
  }
});

export default router;
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

request('https://www.sitepoint.com/')
  .pipe(createWriteStream('index.html'));
```
