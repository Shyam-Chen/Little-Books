# Component `v-model`

TextField:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import { computed } from 'vue';
import uniqueId from 'lodash/uniqueId';

interface Props extends InputHTMLAttributes {
  label?: string;
  value?: string;
}

const props = defineProps<Props>();

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
    <input :id="uid" v-model="textFieldValue" v-bind="$attrs" />
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
import { component$, useStylesScoped$ } from '@builder.io/qwik';
import uniqueId from 'lodash/uniqueId';

import styles from './styles.css?inline';

export interface TextFieldProps {
  label?: string;
  value?: string;
  onInput$?: PropFunction<(value: string) => string>;
}

export default component$((props: TextFieldProps) => {
  useStylesScoped$(styles);

  const uid = uniqueId('text-field-');

  return (
    <div class="text-field">
      <label for={uid}>{props.label}</label>

      <input
        id={uid}
        type="text"
        value={props.value}
        onInput$={(evt) => props.onInput$?.((evt.target as HTMLInputElement).value)}
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
import { component$, useStore } from '@builder.io/qwik';

import TextField from '~/components/TextField';

export default component$(() => {
  const state = useStore({
    val1: '',
    val2: '',
    val3: '',
  });

  return (
    <>
      <TextField value={state.val1} onInput$={(val) => (state.val1 = val)} />
      <TextField value={state.val2} onInput$={(val) => (state.val2 = val)} class="max-w-36" />
      <TextField value={state.val3} onInput$={(val) => (state.val3 = val)} />
    </>
  );
});
```

:::
