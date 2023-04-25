# Internationalization

## `vue-i18n`

```ts
// src/path/to/schema.ts
import { computed } from 'vue';
import { useYupSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const { t } = useI18n();
  const state = useState();

  const schema = useYupSchema(
    [
      [computed(() => state.signInForm.username), computed(() => string().required(t('required')))],
      [
        computed(() => state.signInForm.password),
        computed(() => string().required(t('required')).min(8, t('string.min'))),
      ],
    ],
    state,
  );

  return schema;
};
```

## `vue-localer`

```ts
// src/composables/useMessages/index.ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale<typeof enUS>('messages', {
  'en-US': enUS,
  'ja-JP': () => import('./ja-JP'),
  'ko-KR': () => import('./ko-KR'),
  'zh-TW': () => import('./zh-TW'),
});
```

```ts
// src/path/to/schema.ts
import { computed } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

import useMessages from '~/composables/useMessages';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const messages = useMessages();
  const state = useState();

  const schema = useYupSchema(
    [
      [
        computed(() => state.signInForm.username),
        computed(() => string().required(messages.value.required)),
      ],
      [
        computed(() => state.signInForm.password),
        computed(() =>
          string().required(messages.value.required).min(8, messages.value.string?.min),
        ),
      ],
    ],
    state,
  );

  return schema;
};
```
