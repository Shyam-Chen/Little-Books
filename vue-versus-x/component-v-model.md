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

```vue [Vue (defineModel)]
<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import uniqueId from 'lodash/uniqueId';

interface Props extends InputHTMLAttributes {
  label?: string;
}

const props = defineProps<Props>();

const value = defineModel<string>('value', { default: '' });

const uid = uniqueId('text-field-');
</script>

<template>
  <div class="text-field">
    <label :for="uid">{{ label }}</label>
    <input :id="uid" v-model="value" v-bind="$attrs" />
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
  import type { HTMLInputAttributes } from 'svelte/elements';
  import uniqueId from 'lodash/uniqueId';

  interface $$Props extends HTMLInputAttributes {
    label?: string;
    value?: string;
  }

  export let label = '';
  export let value = '';

  const uid = uniqueId('text-field-');
</script>

<div class="text-field">
  <label for={uid}>{label}</label>
  <input id={uid} class="{$$props.class}" bind:value {...$$restProps} />
</div>

<style lang="scss">
  .text-field {
    --at-apply: flex flex-col w-full;
  }
</style>
```

```tsx [React]
import type { ComponentPropsWithoutRef } from 'react';
import uniqueId from 'lodash/uniqueId';

export interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
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

<TextField bind:value={state.val1} />
<TextField bind:value={state.val2} class="max-w-36" />
<TextField bind:value={state.val3} on:blur={actions.blurVal3} />
```

```tsx [React]
import { useSignal } from '@preact/signals';

import { TextField } from '~/components/TextField';

export function App() {
  const val1 = useSignal('');
  const val2 = useSignal('');
  const val3 = useSignal('');

  const blurVal3 = () => {
    console.log('blurVal3');
  };

  return (
    <>
      <TextField value={val1.value} onInput={(val) => (val1.value = val)} />
      <TextField value={val2.value} onInput={(val) => (val2.value = val)} class="max-w-36" />
      <TextField value={val3.value} onInput={(val) => (val3.value = val)} onBlur={blurVal3} />
    </>
  );
}
```

:::
