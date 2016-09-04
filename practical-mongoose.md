# Mongoose 項目實踐

### 目錄
* 本地和雲端資料庫
* 綱要和模型
* 建立資料
* 讀取和查找資料
* 更新資料
* 刪除資料
* 中介軟體
* 驗證資料
* 複雜的綱要
* 重用程式碼
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

// mLab
const options: any = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
}; 
const mongodbUri: string = 'mongodb://user:pass@host:port/db';

mongoose.connect(mongodbUri, options);
```

```ts
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // ...
});
```

```ts
const userSchema = mongoose.Schema({  // 建立綱要
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
const userSchema = Schema({
  name: { type: String, unique:true },
  email: { type: String, unique:true },
  createdOn: { type: Date, 'default': Date.now }
});
```
