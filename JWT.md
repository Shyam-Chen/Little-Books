# JWT

### Reference Resources (參考資源)

* https://github.com/auth0/node-jsonwebtoken

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Frontend-Starter-Kit
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

***

更佳安全認證

```js
import express from 'express';
import jwt from 'express-jwt';

const app = express();

app.set('port', (process.env.PORT || 8000));
app.set('secret', process.env.SECRET || 'webgo');

app.get('/jwt', jwt({ secret: Buffer.from(app.get('secret'), 'base64') }), (req, res) => {
  if (!req.user.admin) return res.sendStatus(401);
  res.sendStatus(200);
});

app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});
```
