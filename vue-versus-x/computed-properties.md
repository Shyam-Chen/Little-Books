# Computed Properties

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref, computed } from 'vue';

const count = ref(5);
const doubled = computed(() => count.value * 2);
</script>

<template>
  <p>{{ count }} doubled is {{ doubled }}</p>
</template>
```

```svelte [Svelte]
<script lang="ts">
  let count = 5;
  $: doubled = count * 2;
</script>

<p>{count} doubled is {doubled}</p>
```

```tsx [React]
import { useSignal, useComputed } from '@preact/signals';

export function App() {
  const count = useSignal(5);
  const doubled = useComputed(() => count.value * 2);

  return (
    <>
      <p>
        {count} doubled is {doubled}
      </p>
    </>
  );
}
```

:::
