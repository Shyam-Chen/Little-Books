# Provide / Inject

## Prop Drilling

Parent:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref, provide } from 'vue';

import Child from '~/components/Child.vue';

const val = ref('Hello, World!');

provide('message', val);
</script>

<template>
  <h1>Parent</h1>
  <Child />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  import Child from '$lib/components/Child.svelte';

  const val = writable('Hello, World!');

  setContext('message', val);
</script>

<h1>Parent</h1>
<Child />
```

```tsx [React]
import { createContext } from 'react';
import { useSignal } from '@preact/signals';

import { Child } from '~/components/Child';

export const MessageContext = createContext();

export function App() {
  const val = useSignal('Hello, World!');

  return (
    <>
      <h1>Parent</h1>

      <MessageContext.Provider value={val}>
        <Child />
      </MessageContext.Provider>
    </>
  );
}
```

:::

Child:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import DeepChild from '~/components/DeepChild.vue';
</script>

<template>
  <h3>Child</h3>
  <DeepChild />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import DeepChild from '$lib/components/DeepChild.svelte';
</script>

<h3>Child</h3>
<DeepChild />
```

```tsx [React]
import { DeepChild } from '~/components/DeepChild';

export function Child() {
  return (
    <>
      <h3>Child</h3>
      <DeepChild />
    </>
  );
}
```

:::

DeepChild:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { inject } from 'vue';

const message = inject('message') as string;
</script>

<template>
  <h5>DeepChild</h5>
  <p>{{ message }}</p>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { getContext } from 'svelte';

  const message = getContext('message');
</script>

<h5>DeepChild</h5>
<p>{$message}</p>
```

```tsx [React]
import { useContext } from 'react';

import { MessageContext } from '~/App';

export function DeepChild() {
  const message = useContext(MessageContext);

  return (
    <>
      <h3>Child</h3>
      <p>{message}</p>
    </>
  );
}
```

:::
