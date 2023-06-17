# Routing

```ts
import type { FastifyInstance } from 'fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

export default async (app: FastifyInstance) => {
  const router = app.withTypeProvider<TypeBoxTypeProvider>();

  router.get(
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
};
```

## Route methods

```ts
// GET method route
router.get('/', async (request, reply) => {
  return reply.send('GET request to the homepage');
});

// POST method route
router.post('/', async (request, reply) => {
  return reply.send('POST request to the homepage');
});
```
