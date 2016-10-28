# Mongoose 項目實踐

### 目錄
* 基礎入門
* 綱要和模型
* 增刪改查
* 中介軟體
* 驗證資料
* 測試模型
* 模型的安全

***

## 基礎入門

### Mongoose 簡介

Mongoose 是 Node.js 的物件模型模組，看起就像一個 ORM

```bash
$ npm i mongoose -S
$ npm i @types/core-js @types/mongoose -D
```

### 雲端資料庫 mLab

```ts
// 導入 Mongoose 模組
import * as mongoose from 'mongoose';
```

```ts
// 連結資料庫
const dbuser = process.env.DBUSER || 'expressmongoose';
const dbpassword = process.env.DBPASSWORD || 'expressmongoose';
const dburl = process.env.DBURL || 'ds031167.mlab.com:31167/expressmongoose-starter-kit';
const mongodbUri = `mongodb://${dbuser}:${dbpassword}@${dburl}`;
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
};

mongoose.connect(mongodbUri, options);

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Connection Succeeded.'));
```

```ts
const Schema = mongoose.Schema;

const userSchema = new Schema({  // 建立綱要
  name: String
});

const User = mongoose.model('User', userSchema);  // 建立模型
```

```ts
const account = new User({ name: '陳彥澄' });  // 實體化
console.log(account.name);  // 陳彥澄
account.save();  // 將資料存儲至資料庫裡
```

```ts
User.find((err: any, users: any) => {
  if (err) throw err;
  console.log(users);  // [ { _id: 57cbd9b75132e81c9ce56077, name: '陳彥澄', __v: 0 } ]
});
```

綱要中允許的資料型別：
* String
* Number
* Date
* Boolean
* Buffer
* ObjectId
* Mixed
* Array

```ts
const userSchema = new Schema({
  name: { type: String, unique:true },
  email: { type: String, unique:true },
  createdOn: { type: Date, 'default': Date.now }
});
```

```bash
$ npm i mocha-mongoose -S
```
