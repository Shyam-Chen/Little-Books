# Fallthrough Attributes

Parent:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import Child from '~/components/Child.vue';
</script>

<template>
  <Child />
  <Child class="bg-blue-200" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import Child from '$lib/components/Child.svelte';
</script>

<Child />
<Child class="bg-blue-200" />
```

:::

Child:

:::code-group

```vue [Vue]
<template>
  <p v-bind="$attrs" class="paragraph">This is a paragraph.</p>
</template>

<style lang="scss" scoped>
.paragraph {
  color: purple;
}
</style>
```

```svelte [Svelte]
<p class="paragraph {$$props.class}">This is a paragraph.</p>

<style lang="scss">
  .paragraph {
    color: purple;
  }
</style>
```

:::
