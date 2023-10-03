# Tabular Form Groups

## Schema Validation

:::code-group

```vue [Valibot]
<script lang="ts" setup>
import { useValibotSchema } from 'vue-formor';
import { optional, object, array, string, minLength } from 'valibot';

const schema = useValibotSchema(
  object({
    groups: array(
      object({
        parent: optional(string([minLength(1, msgs.required)]), ''),
        children: array(
          object({
            firstField: optional(string([minLength(1, msgs.required)]), ''),
            secondField: optional(string([minLength(1, msgs.required)]), ''),
          }),
        ),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);
</script>
```

```vue [Zod]
<script lang="ts" setup>
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const schema = useZodSchema(
  z.object({
    groups: z.array(
      z.object({
        parent: z.string({ required_error: msgs.required }).nonempty(msgs.required),
        children: z.array(
          z.object({
            firstField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
            secondField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
          }),
        ),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);
</script>
```

```vue [Yup]
<script lang="ts" setup>
import { useYupSchema } from 'vue-formor';
import { object, array, string } from 'yup';

const schema = useYupSchema(
  object({
    groups: array(
      object({
        parent: string().required(msgs.required),
        children: array(
          object({
            firstField: string().required(msgs.required),
            secondField: string().required(msgs.required),
          }),
        ),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);
</script>
```

:::

## Final Code

:::code-group

```vue [Valibot]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, array, string, minLength } from 'valibot';

const msgs = { required: `This is a required field` };

const state = reactive({
  tabularForm: {
    groups: [
      {
        parent: 'O',
        children: [
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: 'O' },
          { firstField: '', secondField: '' },
        ],
      },
      {
        parent: '',
        children: [
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: '' },
          { firstField: 'O', secondField: 'O' },
        ],
      },
    ],
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useValibotSchema(
  object({
    groups: array(
      object({
        parent: optional(string([minLength(1, msgs.required)]), ''),
        children: array(
          object({
            firstField: optional(string([minLength(1, msgs.required)]), ''),
            secondField: optional(string([minLength(1, msgs.required)]), ''),
          }),
        ),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);

schema.validate();
</script>

<template>
  <fieldset>
    <legend>Tabular Form Groups</legend>

    <pre>{{ state.tabularForm }}</pre>

    <pre>{{ state.tabularValdn }}</pre>
  </fieldset>
</template>
```

```vue [Zod]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const msgs = { required: `This is a required field` };

const state = reactive({
  tabularForm: {
    groups: [
      {
        parent: 'O',
        children: [
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: 'O' },
          { firstField: '', secondField: '' },
        ],
      },
      {
        parent: '',
        children: [
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: '' },
          { firstField: 'O', secondField: 'O' },
        ],
      },
    ],
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useZodSchema(
  z.object({
    groups: z.array(
      z.object({
        parent: z.string({ required_error: msgs.required }).nonempty(msgs.required),
        children: z.array(
          z.object({
            firstField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
            secondField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
          }),
        ),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);

schema.validate();
</script>

<template>
  <fieldset>
    <legend>Tabular Form Groups</legend>

    <pre>{{ state.tabularForm }}</pre>

    <pre>{{ state.tabularValdn }}</pre>
  </fieldset>
</template>
```

```vue [Yup]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, array, string } from 'yup';

const msgs = { required: `This is a required field` };

const state = reactive({
  tabularForm: {
    groups: [
      {
        parent: 'O',
        children: [
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: 'O' },
          { firstField: '', secondField: '' },
        ],
      },
      {
        parent: '',
        children: [
          { firstField: '', secondField: 'O' },
          { firstField: 'O', secondField: '' },
          { firstField: '', secondField: '' },
          { firstField: 'O', secondField: 'O' },
        ],
      },
    ],
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useYupSchema(
  object({
    groups: array(
      object({
        parent: string().required(msgs.required),
        children: array(
          object({
            firstField: string().required(msgs.required),
            secondField: string().required(msgs.required),
          }),
        ),
      }),
    ),
  }),
  toRef(state, 'tabularForm'),
  toRef(state, 'tabularValdn'),
);

schema.validate();
</script>

<template>
  <fieldset>
    <legend>Tabular Form Groups</legend>

    <pre>{{ state.tabularForm }}</pre>

    <pre>{{ state.tabularValdn }}</pre>
  </fieldset>
</template>
```

:::
