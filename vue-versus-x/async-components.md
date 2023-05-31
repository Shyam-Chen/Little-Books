# Async Components

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';

const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'));
</script>
```

```svelte [Svelte]
<script lang="ts">
  const AsyncComp = import('./AsyncComp.svelte');
</script>
```

```tsx [React]
import { lazy } from 'react';

const AsyncComp = lazy(() => import('./AsyncComp.tsx'));
```

:::
