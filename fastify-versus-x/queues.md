# Queues

## Worker Threads

```sh
$ pnpm i bree
```

## Redis Queue

```sh
$ pnpm i bullmq
```

```ts
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

import useQueue from '~/composables/useQueue';
import useWorker from '~/composables/useWorker';

const paintQueue = useQueue('Paint');

export default (async (app) => {
  /*
  curl --request GET \
    --url http://127.0.0.1:3000/api/queues?color=blue
  */
  app.get(
    '',
    {
      schema: {
        querystring: Type.Object({ color: Type.String() }),
        response: { 200: Type.Object({ message: Type.String() }) },
      },
    },
    async (req, reply) => {
      await paintQueue.add(
        'wall',
        { color: req.query.color },
        { repeat: { pattern: '45 * * * * *' } },
      );

      return reply.send({ message: 'Hi!' });
    },
  );
}) as FastifyPluginAsyncTypebox;

useWorker('Paint', async (job) => {
  console.log(job.id, job.name, job.data);
  return;
});
```
