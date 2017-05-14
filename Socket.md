# Socket

### 練習來源
* https://github.com/socketio/socket.io

### 實作執行
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄

***

```js
// src/app.js
import express from 'express';
import io from 'socket.io';

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(join(__dirname, '../public')));

const server = app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

const socket = io.listen(server);

socket.on('connection', client => {
  console.log('Establish a connection');

  client.on('B', message => {
    console.log(message);
    socket.emit('A', 'A: Hi, B!');
  });
});
```

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.min.js"></script>
    <script>
      const socket = io.connect('http://localhost:8000');

      socket.on('connect', () => console.log('Accept a connection'));
      socket.on('A', message => console.log(message));

      socket.emit('B', 'B: What\'s up?');
    </script>
  </body>
</html>
```

與 ZeroMQ 整合

```bash
$ npm i zeromq -S
```

```js
import zmq from 'zeromq';
```
