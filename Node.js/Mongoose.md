# Mongoose

### Reference Resources (參考資源)

* https://github.com/Automattic/mongoose

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

* [核心](#核心)
  * [綱要](#綱要)
  * [新增](#新增)
  * [讀取](#讀取)
  * [刪除](#刪除)
  * [更新](#更新)
* 欄位查詢
* 資料分頁
* 模型測試

***

## 核心

```bash
$ npm i mongoose -S
```

```js
import mongoose from 'mongoose';

mongoose.connect('mongodb://web-go:web-go@ds133961.mlab.com:33961/web-go-demo');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('Connection Succeeded.'));
```

### 綱要

綱要型別 (SchemaTypes):
* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array

```js
import { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
```

建立模型

```js
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const User = mongoose.model('user', userSchema);
```

實體方法

```js
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: String,
  user_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.methods.foo = () => ...;
userSchema.statics.bar = () => ...;

export const User = mongoose.model('user', userSchema);
```

```js
import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: String,
  created: Date
});

const List = mongoose.model('List', listSchema);
```

### 新增

```js
const list = new List(req.body);

list.save(err => {
  if (err) return next(err);
  res.json({ message: 'List saved' });
});
```

### 讀取

```js
List.find({}, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

```js
List.findById(<ID>, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 更新

```js
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
```

### 刪除

```js
List.findByIdAndRemove(req.params.id, err => {
  if (err) return next(err);
  res.json({ message: 'List deleted' });
});
```
