# Template Syntax

## Interpolation

:::code-group

```vue [Vue]
<script lang="ts" setup>
const value = undefined;

let number = 0;
</script>

<template>
  <div>{{ value }}</div>
  <div>{{ number + 1 }}</div>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const value = undefined;

  let number = 0;
</script>

<div>{value ? value : ''}</div>
<div>{number + 1}</div>
```

```tsx [React]
export function App() {
  const value = undefined;

  let number = 0;

  return (
    <>
      <div>{value}</div>
      <div>{number + 1}</div>
    </>
  );
}
```

:::

## Attribute Bindings

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(true);
</script>

<template>
  <button :disabled="disabled">Click Me</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  let disabled = true;
</script>

<button {disabled}>Click Me</button>
```

```tsx [React]
import { useSignal } from '@preact/signals';

export function App() {
  const disabled = useSignal(true);

  return (
    <>
      <button disabled={disabled}>Click Me</button>
    </>
  );
}
```

:::
