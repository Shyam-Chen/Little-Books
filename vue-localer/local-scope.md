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
import jaJP from './ja-JP';

export default defineLocale<typeof enUS>('foo', {
  'en-US': enUS,
  'ja-JP': jaJP,
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
