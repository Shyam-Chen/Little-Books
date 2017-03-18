# Express

### 練習來源
* https://github.com/expressjs/express

### 實作執行
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* 核心
  * 中介軟體
  * 路由
  * 請求回應
  * 視圖
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

### 中介軟體

### 路由

路由是一種通過 URL 和 HTTP 操作，映射到指定的請求處理的方式。

```js
app.get('/', (req, res) => {
  res.end("Welcome to my homepage!");
});

app.get('/about', (req, res) => {
  res.end("Welcome to my homepage!");
});
```

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
