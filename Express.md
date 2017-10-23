# Express

### Reference Resources (參考資源)

* https://github.com/expressjs/express

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

* [Core (核心)](#core-核心)
  * [路由](#路由)
  * [中介軟體](#中介軟體)
  * 請求回應
  * 模板
* REST
  * 增刪改查
* 存儲
  * 檔案上傳
* 訊息
  * Email
  * SMS (Twilio)
* 金流 (PayPal)
  * REST
  * 快速結帳
  * 自適應
* 興趣點 (Google Places)
* 網路爬蟲
* QR Code

***

## Core (核心)

Install Express
安裝 Express

```bash
$ npm i express -S
# or
$ yarn add express
```

Create an express server
建立 Express 伺服器

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
app.get('/text/:id', function(req, res) {
  res.json({
    text: req.params.text
  });
});
```

http://localhost:8000/text/foo

```js
app.get('/random/:min/:max', (req, res) => {
  const min = parseInt(req.params.min);
  const max = parseInt(req.params.max);
  res.json({
    result: Math.round((Math.random() * (max - min)) + min)
  });
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

router.get('/', (req, res, next) => {
  List.find({}, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.get('/:id', (req, res, next) => {
  List.findById(req.params.id, (err, data) => {
    if (err) return next(err);
    res.json(data);
  });
});

router.post('/', (req, res, next) => {
  const list = new List(req.body);

  list.save(err => {
    if (err) return next(err);
    res.json({ message: 'List saved' });
  });
});

router.put('/:id', (req, res, next) => {
  List.findById(req.params.id, (err, data) => {
    if (err) return next(err);

    for (let prop in req.body) {
      data[prop] = req.body[prop];
    }

    data.save(err => {
      if (err) return next(err);
      res.json({ message: 'List updated' });
    });
  });
});

router.delete('/:id', (req, res, next) => {
  List.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.json({ message: 'List deleted' });
  });
});

export const listRoutes = router;
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
