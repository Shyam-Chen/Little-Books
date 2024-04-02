# Performance

By using `fastify-uws`, the Requests/sec of `fastify` can approach nearly 1.5x without the need for significant code changes.

```ts
import { eventsource, serverFactory, websocket } from 'fastify-uws';

const app = fastify({
  serverFactory,
});

app.register(websocket);
app.register(eventsource);
```
