# Local Scope

```ts
import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [{ path: '/foo', component: () => import('~/routes/foo/Registry.vue') }],
});
```

```vue
<!-- src/routes/foo/Registry.vue -->
<script lang="ts" setup>
import { useLocaler, defineLocale } from 'vue-localer';

import enUS from './_locales/en-US';
import jaJP from './_locales/ja-JP';

const { f } = useLocaler();

const useLocale = defineLocale('foo', {
  'en-US': enUS,
  'ja-JP': jaJP,
  'ko-KR': () => import('./_locales/ko-KR'),
});

const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

### Shared

```ts
// src/routes/foo/_includes/useLocale/index.ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US'; // src/routes/foo/_includes/useLocale/en-US.ts
import jaJP from './ja-JP'; // src/routes/foo/_includes/useLocale/ja-JP.ts

export default defineLocale('foo', {
  'en-US': enUS,
  'ja-JP': jaJP,
  'ko-KR': () => import('./ko-KR'),
});
```

```vue
<!-- src/routes/foo/Registry.vue -->
<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

import useLocale from './_includes/useLocale';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```
