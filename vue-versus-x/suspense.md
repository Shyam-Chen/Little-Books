# Suspense

## Async Components

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';

const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'));
</script>

<template>
  <Suspense>
    <AsyncComp />
  </Suspense>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const AsyncComp = import('./AsyncComp.svelte');
</script>

{#await AsyncComp then comp}
  <svelte:component this={comp.default}/>
{/await}
```

```tsx [React]
import { lazy, Suspense } from 'react';

const AsyncComp = lazy(() => import('./AsyncComp.tsx'));

export function App() {
  return (
    <>
      <Suspense>
        <AsyncComp />
      </Suspense>
    </>
  );
}
```

:::
