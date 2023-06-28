# Validation

```ts
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

export default (async (app) => {
  app.post(
    '/foo',
    {
      schema: {
        body: Type.Object({
          text: Type.String(),
        }),
      },
    },
    async (request, reply) => {
      const { text } = request.body;

      return reply.send({
        message: text,
      });
    },
  );
}) as FastifyPluginAsyncTypebox;
```
