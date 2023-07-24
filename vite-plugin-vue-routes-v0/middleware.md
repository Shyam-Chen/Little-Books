# Middleware

## Middleware Function

Route middleware are navigation guards that receive the current route and the next route as arguments.

```ts
// src/middleware/foo.ts
import type { NavigationGuard } from 'vue-router';

export default ((to, from) => {
  return true;
}) as NavigationGuard;

// or async
export default (async (to, from) => {
  return true;
}) as NavigationGuard;
```

In the `Registry.vue` file, you can make a reference to this route middleware.

```vue
<!-- src/routes/path/to/Registry.vue -->
<script lang="ts" setup>
defineRegistry({
  middleware: ['foo'],
  // ['foo', 'bar', 'baz'] Serializing, starting with 'foo', then 'bar', and finally 'baz'.
});
</script>
```

## Middleware Layouts

When Layout and Middleware have the same name regardless of case sensitivity, Layout will automatically use that Middleware.

```coffee
src/layouts/Foo.vue
src/middleware/foo.ts
```

```vue
<!-- src/routes/path/to/Registry.vue -->
<script lang="ts" setup>
defineRegistry({
  layout: 'Foo',
  // layout: 'FooBar' -> src/layouts/FooBar.vue
  // middleware -> src/middleware/fooBar.ts
});
</script>
```

You can also give it to `layouts/Default.vue`.

```coffee
src/layouts/Default.vue
src/middleware/default.ts
```

```vue
<!-- src/routes/path/to/Registry.vue -->
<script lang="ts" setup>
defineRegistry({
  middleware: ['foo', 'bar'], // starting with 'default', then 'foo', and finally 'bar'
});
</script>
```
