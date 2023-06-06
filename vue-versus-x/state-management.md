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

```ts [Svelte]
import { writable, derived } from 'svelte/store';

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
