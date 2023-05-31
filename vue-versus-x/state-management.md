# State Management

:::code-group

```ts [Vue]
import { ref, computed } from 'vue';

export const count = ref(0);

export const doubleCount = computed(() => count.value * 2);

export const increment = () => {
  count.value += 1;
};
```

```ts [Vue (vue-storer)]
import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

export default defineStore('counter', () => {
  const state = reactive({
    count: 0,
  });

  const getters = readonly({
    doubleCount: computed(() => state.count * 2),
  });

  const actions = readonly({
    increment() {
      state.count += 1;
    },
  });

  return { state, getters, actions };
});
```

```ts [Svelte]
import { writable, derived, get } from 'svelte/store';

export const count = writable(0);

export const doubleCount = derived(count, ($count) => $count * 2);

export const increment = () => {
  count.update(($count) => ($count += 1));
};
```

```ts [React]
import { signal, computed } from '@preact/signals';

export const count = signal(0);

export const doubleCount = computed(() => count.value * 2);

export const increment = () => {
  count.value += 1;
};
```

:::

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { count, doubleCount, increment } from './store';
</script>

<template>
  <p>Count: {{ count }}</p>
  <p>Double Count: {{ doubleCount }}</p>
  <button @click="increment">Increment</button>
</template>
```

```vue [Vue (vue-storer)]
<script lang="ts" setup>
import useCounter from './store';

const { state, getters, actions } = useCounter();
</script>

<template>
  <p>Count: {{ state.count }}</p>
  <p>Double Count: {{ getters.doubleCount }}</p>
  <button @click="actions.increment">Increment</button>
</template>
```

```svelte [svelte]
<script lang="ts">
  import { count, doubleCount, increment } from './store';
</script>

<p>Count: {$count}</p>
<p>Double Count: {$doubleCount}</p>
<button on:click={increment}>Increment</button>
```

```tsx [React]
import { count, doubleCount, increment } from './store';

export function Counter() {
  return (
    <>
      <p>Count: {count}</p>
      <p>Double Count: {doubleCount}</p>
      <button onClick={increment}>Increment</button>
    </>
  );
}
```

:::
