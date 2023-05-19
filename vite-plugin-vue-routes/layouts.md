# Layouts

## Enabling the Default Layout

To enable the default layout, add a `src/layouts/Default.vue` file.

```vue
<!-- src/layouts/Default.vue -->
<template>
  <div class="p-4">
    <slot></slot>
  </div>
</template>
```

In a layout file, the content of the layout will be loaded in the `<slot></slot>`, rather than using a special component.

If `src/layouts/Default.vue` exists, `Registry.vue` will automatically utilize it.

```vue
<!-- src/routes/path/to/Registry.vue -->
<template>
  <div>Automatically use `layouts/Default.vue`.</div>
</template>
```

## Setting Another Layout

By using the `layout` attribute in the `defineRegistry` macro, you can specify the desired layout.

```vue
<!-- src/routes/path/to/Registry.vue -->
<script lang="ts" setup>
defineRegistry({
  layout: 'foo',
  // 'foo' -> src/layouts/Foo.vue
  // 'fooBar' -> src/layouts/FooBar.vue
  // 'default@embed' -> inherits from src/layouts/Default.vue and uses src/layouts/Embed.vue
});
</script>

<template>
  <div>Content</div>
</template>
```

Please note that currently, the layout will be re-created when switching routes. Therefore, in order to preserve the layout's state, it is necessary to use state management.

As for libraries for state management, you can consider the following options:

- `pinia`
- `vue-storer`
- `createInjectionState` in `@vueuse/shared`

If there is a scroll bar on the layout, you can use `useScroll` from `@vueuse/core` to store the original coordinates in state management.
