# Template Refs

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const target = ref();

onMounted(() => {
  target.value.focus();
});
</script>

<template>
  <input ref="target" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { onMount } from 'svelte';

  let target;

  onMount(() => {
    target.focus();
  });
</script>

<input bind:this={target} />
```

```tsx [React]
import { useRef, useEffect } from 'react';

export function App() {
  const target = useRef();

  useEffect(() => {
    target.current.focus();
  }, []);

  return <input ref={target} />;
}
```

:::
