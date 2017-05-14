# Mongoose

### 練習來源
* https://github.com/Automattic/mongoose

### 實作執行
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* [核心](#核心)
  * 定義綱要

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

### 定義綱要

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

### 建立模型

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

### 實體方法

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

查詢資料

```js
import mongoose, { Schema } from 'mongoose';

const listSchema = Schema({
  text: String,
  created: Date
});

const List = mongoose.model('List', listSchema);

List.find({}, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```
