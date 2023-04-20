# Slots

## Slot Content and Outlet

:::code-group

```vue [Vue]
<script lang="ts" setup>
import FancyButton from '~/components/FancyButton.vue';
</script>

<template>
  <FancyButton>Click me!</FancyButton>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import FancyButton from '$lib/components/FancyButton.svelte';
</script>

<FancyButton>Click me!</FancyButton>
```

```tsx [React]
import { FancyButton } from '~/components/FancyButton';

export function App() {
  return (
    <>
      <FancyButton>Click me!</FancyButton>
    </>
  );
}
```

:::

:::code-group

```vue [Vue]
<template>
  <button class="fancy-btn">
    <slot>Submit</slot>
  </button>
</template>
```

```svelte [Svelte]
<button class="fancy-btn">
  <slot>Submit</slot>
</button>
```

```tsx [React]
import type { ComponentChildren } from 'preact';

interface Props {
  children: ComponentChildren;
}

export function FancyButton(props: Props) {
  const { children } = props;

  return (
    <>
      <button class="fancy-btn">{children ? children : 'Submit'}</button>
    </>
  );
}
```

:::

## Named Slots

:::code-group

```vue [Vue]
<template>
  <div class="container">
    <h2><slot name="title"></slot></h2>
    <div><slot></slot></div>
  </div>
</template>
```

```svelte [Svelte]
<div class="container">
  <h2><slot name="title"></slot></h2>
  <div><slot></slot></div>
</div>
```

```tsx [React]
import type { ComponentChildren } from 'preact';

interface Props {
  children: {
    title?: ComponentChildren;
    default?: ComponentChildren;
  };
}

export function Card(props: Props) {
  const { children } = props;

  return (
    <>
      <div class="container">
        <h2>{children.title}</h2>
        <div>{children.default}</div>
      </div>
    </>
  );
}
```

:::

:::code-group

```vue [Vue]
<script lang="ts" setup>
import Card from '~/components/Card.vue';
</script>

<template>
  <Card>
    <template #title>Hello World</template>
    <p>Here is where a lot more text would go.</p>
  </Card>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import Card from '$lib/components/Card.svelte';
</script>

<Card>
  <svelte:fragment slot="title">Hello World</svelte:fragment>
  <p>Here is where a lot more text would go.</p>
</Card>
```

```tsx [React]
import { Card } from '~/components/Card';

export function App() {
  return (
    <>
      <Card>
        {{
          title: 'Hello World',
          default: <p>Here is where a lot more text would go.</p>,
        }}
      </Card>
    </>
  );
}
```

:::
