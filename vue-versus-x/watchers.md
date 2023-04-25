# Watchers

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { reactive, watch } from 'vue';

const store = reactive({
  count: 0,
  incrememnt() {
    store.count += 1;
  },
});

watch(
  () => store.count,
  (count, prevCount) => {
    console.log(`${prevCount} + 1 = ${count}`);
  },
);
</script>

<template>
  <div>{{ store.count }}</div>
  <button @click="store.incrememnt">Incrememnt</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { writable } from 'svelte/store';

  const state = writable({
    count: 0,
  });

  const actions = {
    incrememnt() {
      $state.count += 1;
    },
  };

  const watch = (val) => {
    console.log(val);
  };

  $: watch($state.count);
</script>

<div>{$state.count}</div>
<button on:click={actions.incrememnt}>Incrememnt</button>
```

```tsx [React]
import { useEffect } from 'react';
import { useSignal } from '@preact/signals';

export function App() {
  const count = useSignal(0);

  function increment() {
    count.value += 1;
  }

  useEffect(() => {
    console.log(count.value);
  }, [count.value]);

  return (
    <>
      <div>{count.value}</div>
      <button onClick={increment}>Increment</button>
    </>
  );
}
```

:::
