# Custom Directives

:::code-group

```vue [Vue]
<script lang="ts" setup>
const vFocus = {
  mounted(el: HTMLInputElement) {
    el.focus();
  },
};
</script>

<template>
  <input v-focus />
</template>
```

```svelte [Svelte]
<script lang="ts">
  function focus(el: HTMLInputElement) {
    el.focus();
  }
</script>

<input use:focus />
```

```tsx [React]
import mergeRefs from 'merge-refs';

function useFocus() {
  return (el: HTMLInputElement) => {
    el.focus();
  };
}

export function App() {
  const focus = useFocus();

  return (
    <>
      <input ref={mergeRefs(focus)} />
    </>
  );
}
```

:::
