# Mongoose 項目實踐

### 目錄
* 基礎入門
  * 本地資料庫
  * 雲端資料庫
    * MLab
* 綱要和模型
* 增刪改查
* 圖像使用介面
  * Robomongo
* 中介軟體
* 驗證資料
* 複雜的綱要
* 重用程式碼
* 測試模型
* 模型的安全
* 非同步

***

```bash
$ npm i mongoose -S
$ npm i @types/mongoose -D
```

```ts
import * as mongoose from 'mongoose';
```

```ts
// 本地
mongoose.connect('mongodb://localhost/test')

// MLab
const mongodbUri: string = 'mongodb://user:pass@host:port/db';
const options: any = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
}; 

mongoose.connect(mongodbUri, options);
```

```ts
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connection Succeeded.'));
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
