# [vite-plugin-fastify](https://github.com/Vanilla-IceCream/vite-plugin-fastify)

Fastify plugin for Vite with Hot-module Replacement.

## Installation

Install `vite-plugin-fastify` with your favorite package manager:

:::code-group

```sh [npm]
npm i vite-plugin-fastify -D
```

```sh [Yarn]
yarn add vite-plugin-fastify -D
```

```sh [pnpm]
pnpm i vite-plugin-fastify -D
```

```sh [Bun]
bun add vite-plugin-fastify -D
```

:::

## Usage

### Add Scripts

Add the following scripts to your `package.json` file:

```json
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  // ...
}
```

### Configuration

Add the following configuration to your `vite.config.ts`:

```ts
// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import fastify from 'vite-plugin-fastify';

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: [
    fastify({
      appPath: './src/app.ts', // Default: <rootDir>/src/app.ts
      serverPath: './src/server.ts', // Default: <rootDir>/src/server.ts
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
});
```

```ts
// src/app.ts
import fastify from 'fastify';

export default () => {
  const app = fastify();

  app.get('/api/hello-world', async (req, reply) => {
    return reply.send('Hello, World!');
  });

  return app;
};
```

```ts
// src/server.ts
import app from './app';

const server = app();

const start = () => {
  try {
    await server.listen({ host: '127.0.0.1', port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
```

## Known Issues

This plugin does not support WebSocket.

For a workaround, use `vite-node` for development:

```json
{
  // ...
  "scripts": {
    "dev": "vite", // [!code --]
    "dev": "vite-node -w src/server.ts", // [!code ++]
    "build": "vite build",
    "preview": "vite preview"
  }
  // ...
}
```

Set to `false` to disable HMR during development:

```ts
  plugins: [
    fastify({
      devMode: false, // [!code ++]
    }),
  ],
```

Add `import.meta.hot` support to vite-node for HMR:

<!-- prettier-ignore -->
```ts
const start = async () => {
  try {
    await server.listen({ host: '127.0.0.1', port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }

  if (import.meta.hot) { // [!code ++]
    import.meta.hot.on('vite:beforeFullReload', async () => { // [!code ++]
      await server.close(); // [!code ++]
    }); // [!code ++]
 // [!code ++]
    import.meta.hot.dispose(async () => { // [!code ++]
      await server.close(); // [!code ++]
    }); // [!code ++]
  } // [!code ++]
};
```

See the [`examples`](https://github.com/Vanilla-IceCream/vite-plugin-fastify/tree/main/examples) folder for more details.
