# Routing and Navigation

```js
// core/router.js
import { createWebHistory, createRouter } from 'vue-router';

import Home from '~/Home.vue';

export const history = createWebHistory();

export const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/hello-world',
      name: 'helloWorld',
      component: () => import('~/modules/hello-world/HelloWorld.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('~/modules/error-handling/NotFound.vue'),
    },
  ],
});
```

```vue
<!-- Home.vue -->
<template>
  <div>Home Page</div>
</template>
```

```vue
<!-- modules/hello-world/HelloWorld.vue -->
<template>
  <div>Hello, World!</div>
</template>
```

```vue
<!-- modules/error-handling/NotFound.vue -->
<template>
  <div>404</div>
</template>
```

```vue
<!-- App.vue -->
<template>
  <router-link :to="{ name: 'home' }">Go to Home</router-link>
  <router-link :to="{ name: 'helloWorld' }">Go to HelloWorld</router-link>
  <router-view></router-view>
</template>
```

```js
// main.js
import { router } from '~/core/router.js';

app.use(router);
```

`useRouter`, `useRoute`

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>
```
