# Internationalization

## `vue-i18n`

:::code-group

```ts [Valibot]
// src/path/to/schema.ts
import { toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { optional, object, string, minLength } from 'valibot';

import useStore from './store'; // pinia

export const useAuthSchema = () => {
  const store = useStore();
  const { t } = useI18n();

  const schema = useValibotSchema(
    object({
      username: optional(string([minLength(1, t('required'))]), ''),
      password: optional(
        string([minLength(1, t('required')), minLength(8, t('min', { char: '8' }))]),
        '',
      ),
    }),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
  );

  return schema;
};
```

```ts [Zod]
// src/path/to/schema.ts
import { toRef } from 'vue';
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
        .min(8, t('min', { char: '8' }))
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
import { toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { object, string } from 'yup';

import useStore from './store'; // pinia

export const useAuthSchema = () => {
  const store = useStore();
  const { t } = useI18n();

  const schema = useYupSchema(
    object({
      username: string().required(t('required')),
      password: string()
        .required(t('required'))
        .min(8, t('min', { char: '8' })),
    }),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
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

```ts [Valibot]
// src/path/to/schema.ts
import { toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import { optional, object, string, minLength } from 'valibot';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store'; // vue-storer

export const useAuthSchema = () => {
  const { f } = useLocaler();
  const { state } = useStore();
  const valdnMsgs = useValidationMessages();

  const schema = useValibotSchema(
    object({
      username: optional(string([minLength(1, valdnMsgs.value.required)]), ''),
      password: optional(
        string([
          minLength(1, valdnMsgs.value.required),
          minLength(8, f(valdnMsgs.value.min, { char: '8' })),
        ]),
        '',
      ),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

```ts [Zod]
// src/path/to/schema.ts
import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import { z } from 'zod';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store'; // vue-storer

export const useAuthSchema = () => {
  const { f } = useLocaler();
  const { state } = useStore();
  const valdnMsgs = useValidationMessages();

  const schema = useZodSchema(
    z.object({
      username: z
        .string({ required_error: valdnMsgs.value.required })
        .nonempty(valdnMsgs.value.required),
      password: z
        .string({ required_error: valdnMsgs.value.required })
        .min(8, f(valdnMsgs.value.min, { char: '8' }))
        .nonempty(valdnMsgs.value.required),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

```ts [Yup]
// src/path/to/schema.ts
import { toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import { object, string } from 'yup';

import useValidationMessages from '~/composables/useValidationMessages';

import useStore from './store'; // vue-storer

export const useAuthSchema = () => {
  const { f } = useLocaler();
  const { state } = useStore();
  const valdnMsgs = useValidationMessages();

  const schema = useYupSchema(
    object({
      username: string().required(valdnMsgs.value.required),
      password: string()
        .required(valdnMsgs.value.required)
        .min(8, f(valdnMsgs.value.min, { char: '8' })),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

:::
