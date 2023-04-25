# Lifecycle Hooks

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const count = ref(0);

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    count.value += 1;
  }, 1000);
});

onUnmounted(() => clearInterval(interval));
</script>

<template>
  {{ count }}
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { onMount } from 'svelte';

  let count = 0;

  onMount(() => {
    const interval = setInterval(() => {
      count += 1;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

{count}
```

```tsx [React]
import { useEffect } from 'react';
import { useSignal } from '@preact/signals';

export function App() {
  const count = useSignal(0);

  useEffect(() => {
    const interval = setInterval(() => {
      count.value += 1;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{count}</>;
}
```

:::
