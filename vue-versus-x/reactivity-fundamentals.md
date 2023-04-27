# Reactivity Fundamentals

## DOM Update Timing

:::code-group

```vue [vue]
<script lang="ts" setup>
import { ref, nextTick } from 'vue';

const isEdit = ref(false);
const inputEl = ref<HTMLInputElement>();

function edit() {
  isEdit.value = !isEdit.value;

  nextTick(() => {
    inputEl.value?.focus();
  });
}
</script>

<template>
  <button @click="edit">Edit</button>
  <input v-if="isEdit" ref="inputEl" />
</template>
```

```vue [Vue (async)]
<script lang="ts" setup>
import { ref, nextTick } from 'vue';

const isEdit = ref(false);
const inputEl = ref<HTMLInputElement>();

async function edit() {
  isEdit.value = !isEdit.value;
  await nextTick();
  inputEl.value?.focus();
}
</script>

<template>
  <button @click="edit">Edit</button>
  <input v-if="isEdit" ref="inputEl" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import { tick } from 'svelte';

  let isEdit = false;
  let inputEl: HTMLInputElement;

  async function edit() {
    isEdit = !isEdit;
    await tick();
    inputEl?.focus();
  }
</script>

<button on:click={edit}>Edit</button>

{#if isEdit}
  <input bind:this={inputEl} />
{/if}
```

```tsx [React]
import { useRef } from 'react';
import { useSignal } from '@preact/signals';

export function App() {
  const isEdit = useSignal(false);
  const inputEl = useRef<HTMLInputElement>();

  function edit() {
    isEdit.value = !isEdit.value;

    setTimeout(() => {
      inputEl.current?.focus();
    }, 0);
  }

  return (
    <>
      <button onClick={edit}>Edit</button>
      {isEdit.value && <input ref={inputEl} />}
    </>
  );
}
```

```tsx [React (useEffect)]
import { useRef, useEffect } from 'react';
import { useSignal } from '@preact/signals';

export function App() {
  const isEdit = useSignal(false);
  const inputEl = useRef<HTMLInputElement>();

  function edit() {
    isEdit.value = !isEdit.value;
  }

  useEffect(() => {
    inputEl.current?.focus();
  }, [isEdit.value]);

  return (
    <>
      <button onClick={edit}>Edit</button>
      {isEdit.value && <input ref={inputEl} />}
    </>
  );
}
```

:::
