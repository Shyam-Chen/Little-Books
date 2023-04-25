# Component Events

## Emitting and Listening to Events

Control:

:::code-group

```vue [Vue]
<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'inc'): void;
  (evt: 'dec'): void;
}>();

function increment() {
  console.log('inner');
  emit('inc');
}

function decrement() {
  console.log('inner');
  emit('dec');
}
</script>

<template>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function increment() {
    console.log('inner');
    dispatch('inc');
  }

  function decrement() {
    console.log('inner');
    dispatch('dec');
  }
</script>

<button on:click={increment}>Increment</button>
<button on:click={decrement}>Decrement</button>
```

```tsx [React]
interface Props {
  onInc(): void;
  onDec(): void;
}

export function Control(props: Props) {
  const { onInc, onDec } = props;

  function increment() {
    console.log('inner');
    onInc();
  }

  function decrement() {
    console.log('inner');
    onDec();
  }

  return (
    <>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}
```

:::

Usage:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import Control from '~/components/Control.vue';

function increment() {
  console.log('outer');
}

function decrement() {
  console.log('outer');
}
</script>

<template>
  <Control @inc="increment" @dec="decrement" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import Control from '$lib/components/Control.svelte';

  function increment() {
    console.log('outer');
  }

  function decrement() {
    console.log('outer');
  }
</script>

<Control on:inc={increment} on:dec={decrement} />
```

```tsx [React]
import { Control } from '~/components/Control';

export function App() {
  function increment() {
    console.log('outer');
  }

  function decrement() {
    console.log('outer');
  }

  return (
    <>
      <Control onInc={increment} onDec={decrement} />
    </>
  );
}
```

:::

## Event Arguments

Control:

:::code-group

```vue [Vue]
<script lang="ts" setup>
const emit = defineEmits<{
  (evt: 'inc', val: number): void;
}>();

function increment() {
  emit('inc', 7);
}
</script>

<template>
  <button @click="increment">Increment</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ inc: number }>();

  function increment() {
    dispatch('inc', 7);
  }
</script>

<button on:click={increment}>Increment</button>
```

```tsx [React]
interface Props {
  onInc(val: number): void;
}

export function Control(props: Props) {
  const { onInc } = props;

  function increment() {
    onInc(7);
  }

  return (
    <>
      <button onClick={increment}>Increment</button>
    </>
  );
}
```

:::

Usage:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import Control from '~/components/Control.vue';

const increment: InstanceType<typeof Control>['onInc'] = (val) => {
  console.log(val); // 7
};
</script>

<template>
  <Control @inc="increment" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import Control from '$lib/components/Control.svelte';

  function increment(evt: CustomEvent<number>) {
    console.log(evt.detail); // 7
  }
</script>

<Control on:inc={increment} />
```

```tsx [React]
import type { ComponentProps } from 'react';

import { Control } from '~/components/Control';

export function App() {
  const increment: ComponentProps<typeof Control>['onInc'] = (val) => {
    console.log(val); // 7
  };

  return (
    <>
      <Control onInc={increment} />
    </>
  );
}
```

:::
