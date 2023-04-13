# Passing Down Classes

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
