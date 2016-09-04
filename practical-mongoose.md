# Mongoose 項目實踐

### 目錄
* 本地和雲端資料庫
* 綱要和模型
* 建立資料
* 讀取和查找資料
* 更新資料
* 刪除資料
* 驗證資料
* 複雜的綱要
* 重用程式碼

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
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String
});

const User = mongoose.model('User', userSchema);
```

```ts
const account = new User({ name: '陳彥澄' });
console.log(account.name);  // 陳彥澄
```
