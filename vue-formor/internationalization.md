# Internationalization

## `vue-i18n`

:::code-group

```ts [Zod]
// src/path/to/schema.ts
import { computed } from 'vue';
import { useZodSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';

import useStore from './store'; // pinia

export const useAuthSchema = () => {
  const store = useStore();
  const { t } = useI18n();

  const schema = useZodSchema(
    z.object({
      username: z.string({ required_error: t('required') }).nonempty(t('required')),
      password: z
        .string({ required_error: t('required') })
        .min(8, t('string.min'))
        .nonempty(t('required')),
    }),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
  );

  return schema;
};
```

```ts [Yup]
// src/path/to/schema.ts
import { computed } from 'vue';
import { useYupSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import useStore from './store'; // pinia

export const useAuthSchema = () => {
  const store = useStore();
  const { t } = useI18n();

  const schema = useYupSchema(
    [
      [computed(() => store.form.username), computed(() => string().required(t('required')))],
      [
        computed(() => store.form.password),
        computed(() => string().required(t('required')).min(8, t('string.min'))),
      ],
    ],
    store,
    'valdn',
  );

  return schema;
};
```

:::

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

:::code-group

```ts [Zod]
// src/path/to/schema.ts
import { computed } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store'; // vue-storer

export const useAuthSchema = () => {
  const { state } = useStore();
  const messages = useValidationMessages();

  const schema = useZodSchema(
    z.object({
      username: z
        .string({ required_error: messages.value.required })
        .nonempty(messages.value.required),
      password: z
        .string({ required_error: messages.value.required })
        .min(8, messages.value.string?.min)
        .nonempty(messages.value.required),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

```ts [Yup]
// src/path/to/schema.ts
import { computed } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store'; // vue-storer

export const useSignInFormSchema = () => {
  const { state } = useStore();
  const messages = useValidationMessages();

  const schema = useYupSchema(
    [
      [
        computed(() => state.form.username),
        computed(() => string().required(messages.value.required)),
      ],
      [
        computed(() => state.form.password),
        computed(() =>
          string().required(messages.value.required).min(8, messages.value.string?.min),
        ),
      ],
    ],
    state,
    'valdn',
  );

  return schema;
};
```

:::
