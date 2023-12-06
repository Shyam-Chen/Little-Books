# [vite-plugin-vue-routes](https://github.com/Vanilla-IceCream/vite-plugin-vue-routes)

File-based routing for Vue applications using Vite.

## Installation

Install `vite-plugin-vue-routes` with your favorite package manager:

:::code-group

```sh [npm]
npm i vite-plugin-vue-routes -D
```

```sh [Yarn]
yarn add vite-plugin-vue-routes -D
```

```sh [pnpm]
pnpm i vite-plugin-vue-routes -D
```

```sh [Bun]
bun add vite-plugin-vue-routes -D
```

:::

## Usage

Configure Vite by creating a `vite.config.ts` file in the root directory of your project, as shown below:

```ts
// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueRoutes from 'vite-plugin-vue-routes'; // [!code ++]

export default defineConfig({
  plugins: [
    vue(),
    vueRoutes(), // Default: { routesDir: '<rootDir>/src/routes' } // [!code ++]
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

Create the router plugin by defining `src/path/to/router.ts`:

```ts
// src/path/to/router.ts
import { createWebHistory, createRouter } from 'vue-router';

import routes from 'virtual:vue-routes'; // [!code ++]

const router = createRouter({
  history: createWebHistory(),
  routes, // [!code ++]
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  // ...
  return true;
});

export default router;
```

If the project is using TypeScript, below is the type configuration:

```ts
// src/vite-env.d.ts
/// <reference types="vite-plugin-vue-routes/client" /> // [!code ++]
```
