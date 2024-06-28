# Internationalization

## `vue-i18n`

```ts {14,26}
// src/path/to/schema.ts
import { computed, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import * as v from 'valibot';

import useStore from './store'; // pinia

export const useAuthSchema = () => {
  const store = useStore();
  const { t } = useI18n();

  const schema = useSchema(
    computed(() =>
      v.object({
        username: v.nullish(v.pipe(v.string(), v.minLength(1, t('required'))), ''),
        password: v.nullish(
          v.pipe(
            v.string(),
            v.minLength(1, t('required')),
            v.minLength(8, t('min', { char: '8' })),
          ),
          '',
        ),
      }),
    ),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
  );

  return schema;
};
```

## `vue-localer`

```ts
// src/composables/useValidationMessages/index.ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale<typeof enUS>('validation-messages', {
  'en-US': enUS,
  ...import.meta.glob(['./*.ts', '!./en-US.ts']),
});
```

```ts {17,29}
// src/path/to/schema.ts
import { computed, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import * as v from 'valibot';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store'; // vue-storer

export const useAuthSchema = () => {
  const { f } = useLocaler();
  const { state } = useStore();
  const valdnMsgs = useValidationMessages();

  const schema = useSchema(
    computed(() =>
      v.object({
        username: v.nullish(v.pipe(v.string(), v.minLength(1, valdnMsgs.value.required)), ''),
        password: v.nullish(
          v.pipe(
            v.string(),
            v.minLength(1, valdnMsgs.value.required),
            v.minLength(8, f(valdnMsgs.value.min, { char: '8' })),
          ),
          '',
        ),
      }),
    ),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```
