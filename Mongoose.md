# Mongoose

### 練習來源
* https://github.com/Automattic/mongoose

### 實作執行
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄

***

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
