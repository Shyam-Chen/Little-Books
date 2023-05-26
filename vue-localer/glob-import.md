# Glob Import

Vite supports importing multiple modules from the file system via the special `import.meta.glob` function:

## Global Scope

By using `import.meta.glob`, you can load all language files at once, but you need to exclude the language set by `fallbackLocale`. If there is an encapsulation in the `index` file, it should also be excluded.

```ts
// src/plugins/localer.ts
import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'ja-JP': () => import('~/locales/ja-JP'), // [!code --]
    'ko-KR': () => import('~/locales/ko-KR'), // [!code --]
    ...import.meta.glob(['~/locales/*.ts', '!~/locales/index.ts', '!~/locales/en-US.ts']), // [!code ++]
  },
});
```

## Local Scope

In the same way, this can also be done in the local scope, by excluding the language set in `fallbackLocale`.

```ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale<typeof enUS>('demo', {
  'en-US': enUS,
  'ja-JP': () => import('./ja-JP'), // [!code --]
  'ko-KR': () => import('./ko-KR'), // [!code --]
  ...import.meta.glob(['./*.ts', '!./en-US.ts']), // [!code ++]
});
```
