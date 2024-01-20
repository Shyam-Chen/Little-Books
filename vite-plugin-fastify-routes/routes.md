# Routes

## Define Routes (Route Handlers)

Define routes by creating files in the `src/routes` directory:

```ts
// src/routes/hello-world/+handler.ts
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  // curl http://127.0.0.1:3000/api/hello-world
  app.get('', async () => {
    return { message: 'hello-world' };
  });
};
```

## Route File Naming Convention

The file naming convention for the routes is as follows:

```coffee
src/routes/hello-world/+handler.ts -> /hello-world

src/routes/products/+handler.ts -> /products
src/routes/products/[id]/+handler.ts -> /products/:id

src/routes/posts/[[title]]/+handler.ts -> /posts/:title?

src/routes/blog/[...info]/+handler.ts -> /blog/*

src/routes/(group)/foo/+handler.ts -> /foo
src/routes/(group)/bar/+handler.ts -> /bar

src/routes/(freeze)/+handler.ts -> /
```

```ts
// src/routes/path/to/+handler.ts
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  // The path parameter can be initialized with an empty string.
  app.get('', async () => {
    // Focus on your handler here
  });
};
```
