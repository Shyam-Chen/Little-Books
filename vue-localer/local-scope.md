# Local Scope

```vue
<script lang="ts" setup>
import { defineLocale } from 'vue-localer';

import enUS from './locales/en-US';

const useLocale = defineLocale<typeof enUS>('foo', {
  'en-US': enUS,
  'ja-JP': () => import('./locales/ja-JP'),
  'ko-KR': () => import('./locales/ko-KR'),
});

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

## Shared Locale Messages

```ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale<typeof enUS>('foo', {
  'en-US': enUS,
  'ja-JP': () => import('./ja-JP'),
  'ko-KR': () => import('./ko-KR'),
});
```

```vue
<script lang="ts" setup>
import useLocale from './locales';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>
</template>
```

::: tip

If you want to define error messages, you can also place them in `composables` like this:

```ts
// src/composables/useValdnMsgs/index.ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US'; // src/composables/useValdnMsgs/en-US.ts

export default defineLocale<typeof enUS>('foo', {
  'en-US': enUS,
  'ja-JP': () => import('./ja-JP'), // src/composables/useValdnMsgs/ja-JP.ts
  'ko-KR': () => import('./ko-KR'), // src/composables/useValdnMsgs/ko-KR.ts
});
```

Call the predefined message:

```vue
<script lang="ts" setup>
import { z } from 'zod';

import useValdnMsgs from '~/composables/useValdnMsgs';

const valdnMsgs = useValdnMsgs();

z.object({
  text: z.string().nonempty(valdnMsgs.value.required),
});
</script>
```

:::

## Type-safe Resources

`defineLocale<typeof enUS>()`

<!-- prettier-ignore -->
```ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale<typeof enUS>('foo', { // [!code ++]
  'en-US': enUS,
  'ja-JP': () => import('./ja-JP'),
  'ko-KR': () => import('./ko-KR'),
});
```
