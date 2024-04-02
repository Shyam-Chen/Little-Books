# Tabular Forms

## Schema Validation

:::code-group

```vue [Valibot]
<script lang="ts" setup>
import { useValibotSchema } from 'vue-formor';
import { nullish, object, array, string, minLength } from 'valibot';

const schema = useValibotSchema(
  object({
    rows: array(
      object({
        firstField: nullish(string([minLength(1, msgs.required)]), ''),
        secondField: nullish(string([minLength(1, msgs.required)]), ''),
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
    rows: z.array(
      z.object({
        firstField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
        secondField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
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
    rows: array(
      object({
        firstField: string().required(msgs.required),
        secondField: string().required(msgs.required),
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
import { nullish, object, array, string, minLength } from 'valibot';

const msgs = { required: `This is a required field` };

const state = reactive({
  tabularForm: {
    cols: [
      { key: 'firstField', name: 'First Field' },
      { key: 'secondField', name: 'Second Field' },
    ],
    rows: [
      { firstField: 'O', secondField: '' },
      { firstField: '', secondField: 'O' },
      { firstField: 'O', secondField: 'O' },
      { firstField: '', secondField: '' },
    ],
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useValibotSchema(
  object({
    rows: array(
      object({
        firstField: nullish(string([minLength(1, msgs.required)]), ''),
        secondField: nullish(string([minLength(1, msgs.required)]), ''),
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
    <legend>Tabular Forms</legend>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.tabularForm.cols" :key="col.key">{{ col.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.tabularForm.rows" :key="rowIdx">
          <td v-for="col in state.tabularForm.cols" :key="`${rowIdx}-${col.key}`" class="h-12">
            <input v-model="row[col.key as keyof typeof row]" />
            <div class="text-red-500">{{ state.tabularValdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre>{{ state.tabularValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.h-12 {
  height: 3rem;
}

.text-red-500 {
  --un-text-opacity: 1;
  color: rgba(239, 68, 68, var(--un-text-opacity));
}
</style>
```

```vue [Zod]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const msgs = { required: `This is a required field` };

const state = reactive({
  tabularForm: {
    cols: [
      { key: 'firstField', name: 'First Field' },
      { key: 'secondField', name: 'Second Field' },
    ],
    rows: [
      { firstField: 'O', secondField: '' },
      { firstField: '', secondField: 'O' },
      { firstField: 'O', secondField: 'O' },
      { firstField: '', secondField: '' },
    ],
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useZodSchema(
  z.object({
    rows: z.array(
      z.object({
        firstField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
        secondField: z.string({ required_error: msgs.required }).nonempty(msgs.required),
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
    <legend>Tabular Forms</legend>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.tabularForm.cols" :key="col.key">{{ col.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.tabularForm.rows" :key="rowIdx">
          <td v-for="col in state.tabularForm.cols" :key="`${rowIdx}-${col.key}`" class="h-12">
            <input v-model="row[col.key as keyof typeof row]" />
            <div class="text-red-500">{{ state.tabularValdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre>{{ state.tabularValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.h-12 {
  height: 3rem;
}

.text-red-500 {
  --un-text-opacity: 1;
  color: rgba(239, 68, 68, var(--un-text-opacity));
}
</style>
```

```vue [Yup]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, array, string } from 'yup';

const msgs = { required: `This is a required field` };

const state = reactive({
  tabularForm: {
    cols: [
      { key: 'firstField', name: 'First Field' },
      { key: 'secondField', name: 'Second Field' },
    ],
    rows: [
      { firstField: 'O', secondField: '' },
      { firstField: '', secondField: 'O' },
      { firstField: 'O', secondField: 'O' },
      { firstField: '', secondField: '' },
    ],
  },
  tabularValdn: {} as Record<string, string>,
});

const schema = useYupSchema(
  object({
    rows: array(
      object({
        firstField: string().required(msgs.required),
        secondField: string().required(msgs.required),
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
    <legend>Tabular Forms</legend>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.tabularForm.cols" :key="col.key">{{ col.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.tabularForm.rows" :key="rowIdx">
          <td v-for="col in state.tabularForm.cols" :key="`${rowIdx}-${col.key}`" class="h-12">
            <input v-model="row[col.key as keyof typeof row]" />
            <div class="text-red-500">{{ state.tabularValdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre>{{ state.tabularValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.h-12 {
  height: 3rem;
}

.text-red-500 {
  --un-text-opacity: 1;
  color: rgba(239, 68, 68, var(--un-text-opacity));
}
</style>
```

:::
