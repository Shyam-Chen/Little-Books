# Database

## On-disk Storage

```sh
$ pnpm i @fastify/mongodb
```

```ts
import mongodb from '@fastify/mongodb';

app.register(mongodb, { url: process.env.MONGODB_URL });
```

## In-memory Storage

```

```
