# Express

### 練習來源
* https://github.com/expressjs/express

### 實作執行
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* 驗證
  * Passport
    * 本地
    * Facebook
    * Google
    * Twitter
* REST
* 存儲
* 訊息
  * Email
* 金流
  * PayPal
    * REST
    * 快速結帳
    * 自適應

***

```js
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Backend Starter Kit');
});

export const route = router;
```
