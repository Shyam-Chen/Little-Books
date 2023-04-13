# Event Handling

:::code-group

```vue [Vue]
<script lang="ts" setup>
const clickMe = () => {
  console.log('clicked');
};
</script>

<template>
  <button @click="clickMe">Click Me</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const clickMe = () => {
    console.log('clicked');
  };
</script>

<button on:click={clickMe}>Click Me</button>
```

```tsx [React]
export function Button() {
  return <button onClick={() => console.log('clicked')}>Click Me</button>;
}
```

```tsx [Qwik]
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return <button onClick$={() => console.log('clicked')}>Click Me</button>;
});
```

:::
