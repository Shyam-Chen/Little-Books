# Express 項目實踐

### 目錄

***

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
