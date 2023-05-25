# Format Syntax

```vue
<!-- src/App.vue -->
<script lang="ts" setup>
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>
</template>

<!-- or -->

<script lang="ts" setup>
import { useLocaler, useLocale } from 'vue-localer';

const { f } = useLocaler();
const locale = useLocale();
</script>

<template>
  <div>{{ f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

::: tip

When creating language files, it is recommended to use backticks to avoid Prettier breaking lines that are too long, while ensuring that the line count remains consistent across all language files.

```ts
// from
export default {
  description:
    'An approachable, performant and versatile framework for building web user interfaces.',
};
// to
export default {
  description: `An approachable, performant and versatile framework for building web user interfaces.`,
};
```

:::
