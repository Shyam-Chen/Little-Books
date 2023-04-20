# Form Input Bindings

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const text = ref('');
</script>

<template>
  <input v-model="text" />
  <div>{{ text }}</div>
</template>
```

```svelte [Svelte]
<script lang="ts">
  let text = '';
</script>

<input bind:value={text}>
<div>{text}</div>
```

```tsx [React]
import { useSignal } from '@preact/signals';

export function App() {
  const text = useSignal('');

  const onInput = (event: Event) => {
    text.value = (event.target as HTMLInputElement).value;
  };

  return (
    <>
      <input value={text} onInput={onInput} />
      <div>{text}</div>
    </>
  );
}
```

:::
