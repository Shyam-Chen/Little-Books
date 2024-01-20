# Guards

## Guard Function

You can directly define route navigation guards inside route components.

You can declare it in `+page.vue`:

```vue
<!-- src/routes/path/to/+page.vue -->
<script lang="ts" setup>
defineOptions({
  beforeRouteEnter() {
    return true;
  },
});
</script>
```

## Guard Layouts

You can declare it in `+layout.vue`:

```vue
<!-- src/routes/path/to/+layout.vue -->
<script lang="ts" setup>
defineOptions({
  beforeRouteEnter() {
    return true;
  },
});
</script>
```

## Define Guards <Badge type="danger" text="Not Implemented" />

Define a guard by creating files in the `src/routes` directory:

```coffee
src/routes/path/to/+guard.ts
```

```ts
// src/routes/path/to/+guard.ts
import type { NavigationGuard } from 'vue-router';

export default (() => {
  return true;
}) as NavigationGuard;
```
