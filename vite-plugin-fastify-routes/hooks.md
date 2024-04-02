# Hooks

## Define Hooks (Middleware)

Define [hooks](https://fastify.dev/docs/latest/Reference/Hooks/#requestreply-hooks) by creating a `+hook.ts` (or `.js`) file in the `src/routes` directory:

```sh
src/routes/path/to/+hook.ts
# or
src/routes/path/to/+hook.js
```

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

## Hook File Naming Convention

The file naming convention for the routes is as follows:

```sh
routes
├── hooked
│   ├── +handler.ts
│   ├── +hook.ts # request.hookOne = 'yes'
│   └── children
│       ├── +handler.ts
│       └── grandchildren
│           ├── +handler.ts
│           └── +hook.ts # request.hookTwo = 'yes'
└── standard
    └── +handler.ts
```

```ts
// src/routes/hooked/+hook.ts
import plugin from 'fastify-plugin';

export default plugin(async (app) => {
  app.addHook('preHandler', async (request, reply) => {
    request.hookOne = 'yes';
  });
});

// src/routes/hooked/children/grandchildren/+hook.ts
import plugin from 'fastify-plugin';

export default plugin(async (app) => {
  app.addHook('preHandler', async (request, reply) => {
    request.hookTwo = 'yes';
  });
});
```

```sh
$ curl http://127.0.0.1:3000/api/hooked
# { hookOne: 'yes', hookTwo: undefined }

$ curl http://127.0.0.1:3000/api/hooked/children
# { hookOne: 'yes', hookTwo: undefined }

$ curl http://127.0.0.1:3000/api/hooked/children/grandchildren
# { hookOne: 'yes', hookTwo: 'yes' }

$ curl http://127.0.0.1:3000/api/standard
# { hookOne: undefined, hookTwo: undefined }
```

If the hook only needs to be in the current route, it can be placed within `+handler.ts`:

```sh
routes
├── hooked
│   ├── +handler.ts # request.hook = 'yes'
│   ├── +hook.ts # request.hookOne = 'yes'
│   └── children
│       ├── +handler.ts # request.hookChildren = 'yes'
│       └── grandchildren
│           ├── +handler.ts # request.hookGrandchildren = 'yes'
│           └── +hook.ts # request.hookTwo = 'yes'
└── standard
    └── +handler.ts
```

```ts
// src/routes/hooked/+handler.ts
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request, reply) => {
    request.hook = 'yes';
  });

  app.get('', async (request, reply) => {
    // ...
  });
};

// src/routes/hooked/children/+handler.ts
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request, reply) => {
    request.hookChildren = 'yes';
  });

  app.get('', async (request, reply) => {
    // ...
  });
};

// src/routes/hooked/children/grandchildren/+handler.ts
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request, reply) => {
    request.hookGrandchildren = 'yes';
  });

  app.get('', async (request, reply) => {
    // ...
  });
};
```

```sh
$ curl http://127.0.0.1:3000/api/hooked
# { hookOne: 'yes', hookTwo: undefined }
# { hook: 'yes', hookChildren: undefined, hookGrandchildren: undefined }

$ curl http://127.0.0.1:3000/api/hooked/children
# { hookOne: 'yes', hookTwo: undefined }
# { hook: undefined, hookChildren: 'yes', hookGrandchildren: undefined }

$ curl http://127.0.0.1:3000/api/hooked/children/grandchildren
# { hookOne: 'yes', hookTwo: 'yes' }
# { hook: undefined, hookChildren: undefined, hookGrandchildren: 'yes' }

$ curl http://127.0.0.1:3000/api/standard
# { hookOne: undefined, hookTwo: undefined }
# { hook: undefined, hookChildren: undefined, hookGrandchildren: undefined }
```
