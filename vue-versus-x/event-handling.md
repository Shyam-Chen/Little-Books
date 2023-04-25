# Event Handling

## Listening to Events

:::code-group

```vue [Vue]
<script lang="ts" setup>
function handleClick() {
  console.log('clicked');
}
</script>

<template>
  <button @click="handleClick">Click me!</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  function handleClick() {
    console.log('clicked');
  }
</script>

<button on:click={handleClick}>Click me!</button>
```

```tsx [React]
export function App() {
  function handleClick() {
    console.log('clicked');
  }

  return <button onClick={handleClick}>Click me!</button>;
}
```

:::

## Inline Handlers

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <button @click="count += 1">Increment</button>
</template>
```

```svelte [Svelte]
<script lang="ts">
  let count = 0;
</script>

<button on:click={() => (count += 1)}>Increment</button>
```

```tsx [React]
import { useSignal } from '@preact/signals';

export function App() {
  const count = useSignal(0);

  return <button onClick={() => (count.value += 1)}>Increment</button>;
}
```

:::

## Event Modifiers

:::code-group

```vue [Vue]
<script lang="ts" setup>
function selectRow() {
  console.log('selectRow');
}

function viewRow() {
  console.log('viewRow');
}
</script>

<template>
  <div class="row" @click="selectRow">
    <button class="btn" @click.stop="viewRow">View</button>
  </div>
</template>
```

```svelte [Svelte]
<script lang="ts">
  function selectRow() {
    console.log('selectRow');
  }

  function viewRow() {
    console.log('viewRow');
  }
</script>

<div class="row" on:click={selectRow}>
  <button class="btn" on:click|stopPropagation={viewRow}>View</button>
</div>
```

```tsx [React]
export function App() {
  function selectRow() {
    console.log('selectRow');
  }

  function viewRow(evt: Event) {
    evt.stopPropagation();
    console.log('viewRow');
  }

  return (
    <div class="row" onClick={selectRow}>
      <button class="btn" onClick={viewRow}>
        View
      </button>
    </div>
  );
}
```

:::
