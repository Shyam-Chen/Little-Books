# Routing

```ts
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

export default (async (app) => {
  app.get(
    '/hello-world',
    {
      schema: {
        response: {
          200: Type.Object({
            message: Type.String(),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.send({
        message: `Hello, World!`,
      });
    },
  );
}) as FastifyPluginAsyncTypebox;
```

## Route methods

```ts
// GET method route
app.get('/', async (request, reply) => {
  return reply.send('GET request to the homepage');
});

// POST method route
app.post('/', async (request, reply) => {
  return reply.send('POST request to the homepage');
});
```
