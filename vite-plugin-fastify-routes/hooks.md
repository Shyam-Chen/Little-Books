# Hooks

## Define Hooks (Middleware)

Define hooks by creating files in the `src/routes` directory:

```ts
// src/routes/path/to/+hook.ts
import plugin from 'fastify-plugin';

export default plugin(async (app) => {
  app.addHook('preHandler', async (request, reply) => {
    await new Promise((resolve, reject) => {
      console.log('preHandler');
      resolve('');
    });
  });
});
```
