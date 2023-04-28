# Template Syntax

## Text Interpolation​

:::code-group

```vue [Vue]
<script lang="ts" setup>
const value = undefined;
const string = 'word';
let number = 0;

const obj = { foo: 'bar' };
</script>

<template>
  <div>{{ value }}</div>
  <div>{{ string.toUpperCase() }}</div>
  <div>{{ number + 1 }}</div>

  <pre>{{ obj }}</pre>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const value = undefined;
  const string = 'word';
  let number = 0;

  const obj = { foo: 'bar' };
</script>

<div>{value ? value : ''}</div>
<div>{string.toUpperCase()}</div>
<div>{number + 1}</div>

<pre>{JSON.stringify(obj, null, 2)}</pre>
```

```tsx [React]
export function App() {
  const value = undefined;
  const string = 'word';
  let number = 0;

  const obj = { foo: 'bar' };

  return (
    <>
      <div>{value}</div>
      <div>{string.toUpperCase()}</div>
      <div>{number + 1}</div>

      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </>
  );
}
```

:::

## Raw HTML

:::code-group

```vue [Vue]
<script lang="ts" setup>
const content = `<span style="color: red">This should be red.</span>`;
</script>

<template>
  <p v-html="content"></p>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const content = `<span style="color: red">This should be red.</span>`;
</script>

<p>
  {@html content}
</p>
```

```tsx [React]
export function App() {
  const content = `<span style="color: red">This should be red.</span>`;

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </>
  );
}
```

:::

## Attribute Bindings

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const disabled = ref(true);
</script>

<template>
  <button :disabled="disabled">Click Me</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  let disabled = true;
</script>

<button {disabled}>Click Me</button>
```

```tsx [React]
import { useSignal } from '@preact/signals';

export function App() {
  const disabled = useSignal(true);

  return (
    <>
      <button disabled={disabled}>Click Me</button>
    </>
  );
}
```

:::
