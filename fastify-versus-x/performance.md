# Performance

```ts
import { serverFactory, fastifyUws } from '@geut/fastify-uws';

const app = fastify({
  serverFactory,
});

app.register(fastifyUws);
```
