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

If you use a `App.vue` you will also need to add `<Layout>`:

```vue
<!-- src/App.vue -->
<script lang="ts" setup>
import { RouterView } from 'vue-router';

import Layout from 'virtual:vue-routes/Layout'; // [!code ++]
</script>

<template>
  <Layout// [!code ++]>
    <RouterView />
  </Layout> // [!code ++]
</template>
```

## Setting Another Layout

By using the `layout` attribute in the `defineRegistry` macro, you can specify the desired layout.

```vue
<!-- src/routes/path/to/Registry.vue -->
<script lang="ts" setup>
defineRegistry({
  layout: 'Foo',
  // 'Foo' -> src/layouts/Foo.vue
  // 'FooBar' -> src/layouts/FooBar.vue
});
</script>

<template>
  <div>Content</div>
</template>
```
