# Socket

### Reference Resources (參考資源)

* https://github.com/socketio/socket.io

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Frontend-Starter-Kit
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

***

用戶端和伺服端即時性的雙向通訊

```js
// src/app.js
import { join } from 'path';
import express from 'express';
import socket from 'socket.io';

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(join(__dirname, '../public')));

const server = app.listen(app.get('port'), () => {
  console.log('App: Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

const io = socket.listen(server);

io.on('connection', socket => {
  console.log('WS: Establish a connection.');
  socket.on('disconnect', () => console.log('WS: Disconnected'));

  socket.emit('A', { foo: 'bar' });
  socket.on('B', data => console.log(data));
});
```

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Socket</title>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
    <script>
      const socket = io();

      socket.on('connect', () => console.log('WS: Accept a connection.'));

      socket.on('A', data => {
        console.log(data);
        socket.emit('B', { foo: 'baz' });
      });
    </script>
  </body>
</html>
```
