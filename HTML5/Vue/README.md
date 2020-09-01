# Vue

Vue is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.

---

### Table of Contents

- Routing
- State Management

---

## Reactivity

**Refs**

```vue
<template>
  <div>{{ val }}</div>
</template>

<script setup>
import { ref } from 'vue';

export const val = 0;

export default {};
</script>
```

**Reactives**

```vue
<script setup>
import { reactive } from 'vue';

export const state = reactive({ val: 0 });

export default {};
</script>
```

**computed**

```vue
<template>
  <div>{{ evenOrOdd }}</div>
</template>

<script setup>
import { ref, computed } from 'vue';

export const num = ref(1);
export const evenOrOdd = computed(() => (num.value % 2 === 0 ? 'Even' : 'Odd'));

export default {};
</script>
```

**Watcher**

data - `watch`

```vue
<script setup>
import { reactive, watch } from 'vue';

export const state = reactive({ val: 0 });

watch(
  () => state.val,
  (val, prevVal) => {},
);

export default {};
</script>
```

dependencies - `watchEffect`

```vue
<template>
  <div></div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue';

export const state1 = reactive({ val: 0 });
export const state2 = reactive({ val: 0 });

watchEffect(() => {
  console.log(state1.val);
});

export default {};
</script>
```

**Readonly Proxies**

```vue
<script setup>
import { reactive, readonly } from 'vue';

export const original = reactive({ val: 0 });
export const copy = readonly(original);

export default {};
</script>
```

## Component Communication

**Props**

```vue
<script setup>
export default {
  props: {
    list: { type: [String], default: () => [] },
  },
};
</script>
```

**Emits**

```vue
<script setup>
export default {
  emits: {
    toggle: null,
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
};
</script>
```

## Lifecycle Hooks

```vue
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from 'vue';

export default {};
</script>
```

## Dependency Injection

```vue
<!-- Foo.vue -->
<template>
  <Bar />
</template>

<script setup>
import { InjectionKey, provide, inject } from 'vue';

import Bar from './Bar';

export default {
  components: {
    Bar,
  },
};
</script>
```

```vue
<!-- Bar.vue -->
<template></template>

<script setup></script>
```

## Async Components

```js
import { defineAsyncComponent } from 'vue';
```

Suspense

```html
<Suspense>
  <template #default> </template>

  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

## Routing

```js
// src/core/router.js
import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import Home from '~/mods/home/Home';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: defineAsyncComponent(() => import('~/mods/about/About')),
    },
  ],
});

export default router;
```

```js
// src/main.js
import router from '~/core/router';

app.use(router);
```

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

export const goBack = () => {
  window.history.length > 1 ? router.go(-1) : router.push('/');
};

export default {};
</script>
```
