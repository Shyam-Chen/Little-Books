# Thoughts on Vue versus X

Vue versus X:

- Svelte
- React (`preact/compat`)
- Qwik (`@builder.io/qwik`)

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

```tsx [Qwik]
import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const value = undefined;

  let number = 0;

  return (
    <>
      <div>{value}</div>
      <div>{number + 1}</div>
    </>
  );
});
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

```tsx [React]
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

```tsx [React]
import { useSignal } from '@preact/signals';

export function App() {
  const text = useSignal('');

  const onInput = (event: Event) => {
    text.value = (event.target as HTMLInputElement).value;
  };

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
import { reactive, watch } from 'vue';

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

```tsx [React]
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

## Passing Down Classes

Parent:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import Child from './components/Child.vue';
</script>

<template>
  <Child />
  <Child class="text-danger" />
</template>

<style>
.text-danger {
  color: red;
}
</style>
```

```svelte [Svelte]
<script lang="ts">
  import Child from './lib/Child.svelte';
</script>

<div class="parent">
  <Child />
  <Child class="text-danger" />
</div>

<style>
.parent :global(.text-danger) {
  color: red;
}
</style>
```

:::

Child:

:::code-group

```vue [Vue]
<template>
  <p class="paragraph">This is a paragraph.</p>
</template>

<style>
.paragraph {
  color: purple;
}
</style>
```

```svelte [Svelte]
<p class={`paragraph ${$$restProps.class}`}>This is a paragraph.</p>

<style>
.paragraph {
  color: purple;
}
</style>
```

:::

## Text Fields

TextField:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

const props = defineProps<{
  label?: string;
  value?: string;
}>();

const emit = defineEmits<{
  (evt: 'update:value', val: string): void;
}>();

const uid = uniqueId('text-field-');

const textFieldValue = computed({
  get: () => props.value || '',
  set: (val) => emit('update:value', val),
});
</script>

<template>
  <div class="text-field">
    <label :for="uid">{{ label }}</label>
    <input :id="uid" v-bind="$attrs" :value="value" />
  </div>
</template>

<style lang="scss" scoped>
.text-field {
  @apply flex flex-col w-full;
}
</style>
```

```svelte [Svelte]
<script lang="ts">
  import { computed } from 'vue';
  import uniqueId from 'lodash/uniqueId';

  export let label = '';
  export let value = '';

  const uid = uniqueId('text-field-');
</script>

<div class="text-field">
  <label for={uid}>{label}</label>
  <input id={uid} bind:value />
</div>

<style lang="scss">
  .text-field {
    --at-apply: flex flex-col w-full;
  }
</style>
```

```tsx [React]
import uniqueId from 'lodash/uniqueId';

export interface TextFieldProps {
  label?: string;
  value?: string;
  onInput(val: string): void;
}

export function TextField(props: TextFieldProps) {
  const { label, value, onInput, ...rest } = props;

  const uid = uniqueId('text-field-');

  return (
    <div class="text-field">
      <label for={uid}>{label}</label>
      <input
        id={uid}
        value={value}
        onInput={(evt) => onInput((evt.target as HTMLInputElement).value)}
        {...rest}
      />
    </div>
  );
}
```

```tsx [Qwik]
import type { PropFunction } from '@builder.io/qwik';
import { component$, useSignal } from '@builder.io/qwik';
import uniqueId from 'lodash/uniqueId';

export interface TextFieldProps {
  label?: string;
  value?: string;
  onInput$?: PropFunction<(val: string) => void>;
}

export const TextField = component$((props: TextFieldProps) => {
  const uid = uniqueId('text-field-');

  return (
    <div class="text-field">
      <label for={uid}>{props.label}</label>
      <input
        id={uid}
        value={value.value}
        onInput$={(evt) => props.onInput$((evt.target as HTMLInputElement).value)}
      />
    </div>
  );
});
```

:::

Usage:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { reactive } from 'vue';

import TextField from '~/components/TextField.vue';

const store = reactive({
  val1: '',
  val2: '',
  val3: '',
  blurVal3() {
    console.log('blurVal3');
  },
});
</script>

<template>
  <TextField v-model:value="store.val1" />
  <TextField v-model:value="store.val2" class="max-w-36" />
  <TextField v-model:value="store.val3" @blur="store.blurVal3" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { writable } from 'svelte/store';

  import TextField from '$lib/components/TextField.svelte';

  const state = writable({
    val1: '',
    val2: '',
    val3: '',
  });

  const actions = {
    blurVal3() {
      console.log('blurVal3');
    },
  };
</script>

<div class="page">
  <TextField bind:value={state.val1} />
  <TextField bind:value={state.val2} class="name" />
  <TextField bind:value={state.val3} on:blur={actions.blurVal3} />
</div>

<style lang="scss">
.page :global(.name) {
  --at-apply: max-w-36;
}
</style>
```

```tsx [React]
import { useSignal } from '@preact/signals';

import { TextField } from '~/components/TextField';

export function App() {
  const val1 = useSignal('');

  return (
    <>
      <TextField value={val1.value} onInput={(val) => (val1.value = val)} />
      {val1.value}
    </>
  );
}
```

```tsx [Qwik]
import { component$, useStore, $ } from '@builder.io/qwik';

import { TextField } from '~/components/TextField';

export default component$(() => {
  const store = useStore({
    val1: '',
    val2: '',
  });

  return (
    <>
      <TextField value={state.val1} onInput$={$((val) => (state.val1 = val))} />
      <TextField value={state.val2} onInput$={$((val) => (state.val2 = val))} class="max-w-36" />
      <TextField value={state.val3} onInput$={$((val) => (state.val3 = val))} />
    </>
  );
});
```

:::
