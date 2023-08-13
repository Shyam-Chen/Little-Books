# Generics

:::code-group

```vue [Vue]
<script lang="ts" setup generic="T extends object">
defineProps<{
  options: T[];
}>();

defineEmits<{
  (evt: 'change', val: T): void;
}>();
</script>
```

```svelte [Svelte (generics)]
<script lang="ts" generics="T extends object">
  import { createEventDispatcher } from 'svelte';

  export let options = T[];

  const dispatch = createEventDispatcher<{ change: T }>();
</script>
```

```svelte [Svelte ($$Generic)]
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  type T = $$Generic<object>;
  export let options = T[];

  const dispatch = createEventDispatcher<{ change: T }>();
</script>
```

```tsx [React]
interface Props<T> {
  options?: T[];
  onChange?: (val: T) => void;
}

export function Select<T extends object>(props: Props<T>) {
  /* ... */
}
```

:::
