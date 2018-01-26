## WebSocket

```bash
$ npm i socket.io -S
$ npm i @types/socket.io -D
```

建立客戶端的 Socket 服務

```ts
// socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as socket from 'socket.io-client';  // 注意是 `client`

import { Message } from './message.model';

@Injectable()
export class SocketService {
  private socket;

  constructor() {
    this.initSocket();
  }

  private initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public get() {
    let observable = new Observable(observer => {
      this.socket.on('message', data => {
        observer.next(data);
      });

      return () => this.socket.disconnect();
    });

    return observable;
  }
}
```

```bash
$ npm i express -S
```

建立一個簡單的伺服器

```js
// server.js
const express = require('express');
const socket = require('socket.io');

const app = express();

app.set('port', (process.env.PORT || 8000));

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
