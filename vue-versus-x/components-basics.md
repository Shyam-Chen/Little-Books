# Components Basics

## Defining a Component

:::code-group

```vue [Vue]
<script lang="ts" setup>
const name = 'World';
</script>

<template>
  <h1 class="text-h1">Hello, {{ name }}!</h1>
</template>

<style lang="scss" scoped>
.text-h1 {
  @apply text-5xl font-extrabold;
}
</style>
```

```svelte [Svelte]
<script lang="ts">
  const name = 'World';
</script>

<h1 class="text-h1">Hello, {name}!</h1>

<style lang="scss">
  .text-h1 {
    --at-apply: text-5xl font-extrabold;
  }
</style>
```

```tsx [React]
import classes from './Typography.module.scss';

export default function Typography() {
  const name = 'World';

  return (
    <>
      <h1 class={classes['text-h1']}>Hello, {name}!</h1>
    </>
  );
}
```

```scss [React (module.scss)]
.text-h1 {
  @apply text-5xl font-extrabold;
}
```

:::

## Using a Component

:::code-group

```vue [Vue]
<script lang="ts" setup>
import Typography from '~/components/Typography.vue';
</script>

<template>
  <Typography />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import Typography from '$lib/components/Typography.svelte';
</script>

<Typography />
```

```tsx [React]
import Typography from '~/components/Typography';

export function App() {
  return (
    <>
      <Typography />
    </>
  );
}
```

:::

## Dynamic Components

:::code-group

```vue [Vue]
<template>
  <component :is="currentComponent" />
</template>
```

```svelte [Svelte]
<svelte:component this={currentComponent}/>
```

```tsx [React]
import type { ComponentType, FunctionalComponent } from 'preact';

interface Props {
  is: ComponentType<any>;
}

const Component: FunctionalComponent<Props> = ({ is: Is, ...props }) => {
  return <Is {...props} />;
};

export default Component;
```

:::
