# Fallthrough Attributes

Parent:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import Child from '~/components/Child.vue';
</script>

<template>
  <Child />
  <Child class="bg-blue-200" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import Child from '$lib/components/Child.svelte';
</script>

<Child />
<Child class="bg-blue-200" />
```

```tsx [React]
import { Child } from '~/components/Child';

export function App() {
  return (
    <>
      <Child />
      <Child class="bg-blue-200" />
    </>
  );
}
```

:::

Child:

:::code-group

```vue [Vue]
<template>
  <p v-bind="$attrs" class="paragraph">This is a paragraph.</p>
</template>

<style lang="scss" scoped>
.paragraph {
  color: purple;
}
</style>
```

```svelte [Svelte]
<p class="paragraph {$$props.class}">This is a paragraph.</p>

<style lang="scss">
  .paragraph {
    color: purple;
  }
</style>
```

```tsx [React]
import clsx from 'clsx';

import classes from './Child.module.scss';

interface Props {
  class?: string;
}

export function Child(props: Props) {
  return (
    <>
      <p class={clsx(classes.paragraph, props.class)}>This is a paragraph.</p>
    </>
  );
}
```

```scss [React (Child.module.scss)]
.paragraph {
  color: purple;
}
```

:::
