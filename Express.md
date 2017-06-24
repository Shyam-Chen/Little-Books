# Express

### 練習來源

* https://github.com/expressjs/express

### 實作執行

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄

* [核心](#核心)
  * [路由](#路由)
  * [中介軟體](#中介軟體)
  * 請求回應
  * 模板
* 驗證
  * 本地
  * Facebook
  * Google
  * Twitter
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

## 核心

安裝 Express

```bash
$ npm i express -S
```

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

## 驗證

```bash
$ npm i passport -S
```

### 本地

```bash
$ npm i passport-local -S
```

### Facebook

```bash
$ npm i passport-facebook -S
```

### Google

```bash
$ npm i passport-google-oauth20 -S
```

### Twitter

```bash
$ npm i passport-twitter -S
```

## REST

### 增刪改查

```js
import express from 'express';

import { User } from '../models';

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/create', (req, res) => {

});

router.post('/insert', (req, res) => {

});

router.get('/:id/edit', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.get('/:id', (req, res) => {

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

request('https://www.sitepoint.com/')
  .pipe(createWriteStream('index.html'));
```
