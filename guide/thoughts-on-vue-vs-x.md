# Thoughts on Vue versus X

## Template Syntax

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

## Event Handling

:::code-group

```vue [Vue]
<script lang="ts" setup>
const clickMe = () => {
  console.log('clicked');
};
</script>

<template>
  <button @click="clickMe">Click me</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const clickMe = () => {
    console.log('clicked');
  };
</script>

<button on:click={clickMe}>Click me</button>
```

```tsx [Qwik]
import { component$, useSignal } from '@builder.io/qwik';

export const Button = component$(() => {
  return <button onClick$={() => console.log('clicked')}>Click me</button>;
});
```

```tsx [React (preact/compat)]
export function Button() {
  return <button onClick={() => console.log('clicked')}>Click me</button>;
}
```

:::

## List Rendering

### `v-for`

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const list = ref([{ text: 'Foo' }, { text: 'Bar' }]);
</script>

<template>
  <ul>
    <li v-for="(item, index) in list" :key="`list${index}`">
      {{ item.text }}
    </li>
  </ul>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const list = [{ text: 'Foo' }, { text: 'Bar' }];
</script>

<ul>
  {#each list as item, index (`list${index}`)}
    <li>{item.text}</li>
  {/each}
</ul>
```

```tsx [React]
import { Fragment } from 'react';
import { useSignal } from '@preact/signals';

export function App() {
  const list = useSignal([{ text: 'Foo' }, { text: 'Bar' }]);

  return (
    <ul>
      {list.value.map((item, index) => (
        <Fragment key={`list${index}`}>
          <li>{item.text}</li>
        </Fragment>
      ))}
    </ul>
  );
}
```

:::

### `v-for` with an Object

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const deps = ref({
  vue: '3.2.47',
  svelte: '3.57.0',
  preact: '10.13.1',
});
</script>

<template>
  <ul>
    <li v-for="(value, key, index) in deps" :key="`deps${index}`">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const deps = {
    vue: '3.2.47',
    svelte: '3.57.0',
    preact: '10.13.1',
  };
</script>

<ul>
  {#each Object.entries(deps) as [key, value], index (`deps${index}`)}
    <li>{index}. {key}: v{value}</li>
  {/each}
</ul>
```

```tsx [React]
import { Fragment } from 'react';
import { useSignal } from '@preact/signals';

export function App() {
  const deps = useSignal({
    vue: '3.2.47',
    svelte: '3.57.0',
    preact: '10.13.1',
  });

  return (
    <ul>
      {Object.entries(deps.value).map(([key, value], index) => (
        <Fragment key={`deps${index}`}>
          <li>
            {index}. {key}: v{value}
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
```

:::

### `v-for` with a Range

:::code-group

```vue [Vue]
<template>
  <ul>
    <li v-for="(num, index) in 10" :key="index">{{ num }}</li>
  </ul>
</template>
```

```svelte [Svelte]
<ul>
  {#each Array(10) as empty, index (index)}
    <li>{index + 1}</li>
  {/each}
</ul>
```

```tsx [React]
import { Fragment } from 'react';

export function App() {
  return (
    <ul>
      {[...Array(10)].map((empty, index) => (
        <Fragment key={index}>
          <li>{index + 1}</li>
        </Fragment>
      ))}
    </ul>
  );
}
```

:::

## Form Input Bindings

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

```tsx [Qwik]
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const text = useSignal('');

  return (
    <>
      <input bind:value={text} />
      <div>{text}</div>
    </>
  );
});
```

```tsx [React (preact/compat)]
import { useSignal } from '@preact/signals';

export function App() {
  const text = useSignal('');

  const onInput = (event) => (text.value = event.target.value);

  return (
    <>
      <input value={text.value} onInput={onInput} />
      <div>{text.value}</div>
    </>
  );
}
```

:::

## Watchers

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { reactive } from 'vue';

const store = reactive({
  count: 0,
  incrememnt() {
    store.count += 1;
  },
});

watch(
  () => store.count,
  (count, prevCount) => {
    console.log(`${prevCount} + 1 = ${count}`);
  },
);
</script>

<template>
  <div>{{ store.count }}</div>
  <button @click="store.incrememnt">Incrememnt</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { writable } from 'svelte/store';

  const state = writable({
    count: 0,
  });

  const actions = {
    incrememnt() {
      $state.count += 1;
    },
  };

  const watch = (val) => {
    console.log(val);
  };

  $: watch($state.count);
</script>

<div>{$state.count}</div>
<button on:click={actions.incrememnt}>Incrememnt</button>
```

```tsx [Qwik]
import { component$, useTask$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const state = useStore({ count: 0 });

  useTask$(async ({ track }) => {
    track(() => state.count);
    console.log(state.count);
  });

  return (
    <>
      <div>{state.count}</div>
      <button onClick$={() => (state.count += 1)}>Increment</button>
    </>
  );
});
```

```tsx [React (preact/compat)]
import { useEffect } from 'react';
import { useSignal } from '@preact/signals';

export function App() {
  const count = useSignal(0);

  function increment() {
    count.value += 1;
  }

  useEffect(() => {
    console.log(count.value);
  }, [count.value]);

  return (
    <>
      <div>{count.value}</div>
      <button onClick={increment}>Increment</button>
    </>
  );
}
```

:::

## Template Refs

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const target = ref();

onMounted(() => {
  target.value.focus();
});
</script>

<template>
  <input ref="target" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { onMount } from 'svelte';

  let target;

  onMount(() => {
    target.focus();
  });
</script>

<input bind:this={target} />

```

```tsx [React]
import { useRef, useEffect } from 'react';

export function App() {
  const target = useRef();

  useEffect(() => {
    target.current.focus();
  }, []);

  return <input ref={target} />;
}
```

:::
