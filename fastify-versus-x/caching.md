# Caching

## In-memory Cache

```sh
$ pnpm install @fastify/caching
```

```ts
import caching from '@fastify/caching';
import abstractCache from 'abstract-cache';

app.register(caching, { cache: abstractCache({ useAwait: true }) });
```

```ts
app.get('/', async (req, reply) => {
  await app.cache.set('hello', { hello: 'world' });

  const helloCache = await app.cache.get('hello');
  if (helloCache) reply.send(helloCache);

  return reply.send({ hello: 'world' });
});
```
