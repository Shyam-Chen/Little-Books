# Express 項目實踐

### 目錄

***

```bash
$ npm init -y
```
```bash
$ npm i express@5.0.0-alpha.2 typescript@2.0.2 -S
$ npm i @types/node @types/express -D
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
