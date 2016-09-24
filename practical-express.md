# Express 項目實踐

### 目錄
* 第一個應用程式
* 基礎入門
* 中介軟體
* 模板引擎
  * Pug
* 路由和參數
* 用戶憑證
  * 本地
  * Facebook
  * Twitter
  * Google
  * JWT
* REST API 服務
* 即時應用程式
  * Socket.io
* 金流串接
  * PayPal
* 電子郵件發寄送
* 訊息佇列
  * ZeroMQ
* 單元測試
  * Mocha 和 Chai
* 安全
* 日誌和監控
  * Winston
  * Papertrail
* 佈署
  * 平台即服務
    * Heroku
  * 基礎設施即服務  
    * Google Compute Engine
  * 靜態資源
    * Nginx
  * 快取
    * Varnish
  * 應用程式持續運行
    * PM2

***

## 第一個應用程式

```bash
# 建立名為 express-starter 的資料夾
$ mkdir express-starter

# 切換到 express-starter 資料夾
$ cd express-starter
```
```bash
# 初始化
$ npm init -y
```
```bash
# 安裝 Express 和 TypeScript
$ npm i express@5.0.0-alpha.2 typescript@2.0.2 -S

# 安裝 Node.js 和 Express 的模組定義
$ npm i @types/node @types/express -D
```
```bash
# 建立名為 tsconfig.json 的檔案
$ touch tsconfig.json
```
```js
// tsconfig.json
{
 "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": false,
    "removeComments": true,
    "noLib": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": false,
    "pretty": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitUseStrict": false,
    "noFallthroughCasesInSwitch": true
  },
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false
}
```
```ts
// src/app.ts
import * as express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('第一個應用程式'); 
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}.`);
});
```
```js
// package.json
[...]
  "scripts": {
    "start": "tsc && node src/app.js"
  },
[...]
```
```bash
$ npm start
```

## Express 基礎

```ts
import * as express from 'express';  // 導入 Express 模組，就像導入其它模組一樣
import * as http from 'http';

const app = express();  // 呼叫 express 函式建立一個 Express 應用程式

// 中介軟體
app.use((req, res) => {
  console.log(`In comes a request to: ${req.url}`);
  res.end('Hello, Express!');
});

http.createServer(app).listen(3000);  // 啟動伺服器
```

```ts
// 日誌紀錄中介軟體
app.use((req, res, next) => {
  console.log(`In comes a ${request.method} to ${req.url}`);
  next();
});
```

```ts
// 重新導向
res.redirect('/hello');
```

```ts
// 寄送檔案
res.sendFile('/path/to/xxx.png');
```

```ts
// app.VERB()
app.get()
app.head()
app.post()
app.put()
app.patch()
app.delete()
app.options()
```

```bash
$ npm i morgan body-parser pug -S
```

```ts
// 基本
const authAdmin = (req, res, next) => {
  // ...
  return next();
};
const getUsers = (req, res, next) => {
  // ...
  return next();
};
const renderUsers = (req, res) => {
  // ...
  res.end();
};

const admin = [authAdmin, getUsers, renderUsers];
app.get('/admin', admin);
```
```ts
// 進階
namespace Admin {
  export class Admin {
    private authAdmin(req, res, next) {
      // ...
      return next();
    }
    private getUsers(req, res, next) {
      // ...
      return next();
    }
    private renderUsers(req, res, next) {
      // ...
      res.end();
    }
  }
}

// ...
```
```ts
// +型別
// ...
```
