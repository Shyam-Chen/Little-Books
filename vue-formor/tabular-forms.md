# Tabular Forms

:::code-group

```vue [Zod]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const msgs = { required: 'This is a required field' };

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
  <div>
    <div>Tabular Forms</div>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.tabularForm.cols" :key="col.key">{{ col.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.tabularForm.rows" :key="rowIdx">
          <td v-for="col in state.tabularForm.cols" :key="`${rowIdx}-${col.key}`">
            <input v-model="row[col.key as keyof typeof row]" />
            <div>{{ state.tabularValdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre>{{ state.tabularValdn }}</pre>
  </div>
</template>
```

```vue [Yup]
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

const msgs = { required: 'This is a required field' };

type DataTableItem = { firstField?: string; secondField?: string };

const state = reactive({
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

  valdn: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [
      computed(() => state.rows),
      (row: DataTableItem) => [
        [computed(() => row.firstField), string().required(msgs.required)],
        [computed(() => row.secondField), string().required(msgs.required)],
      ],
    ],
  ],
  state,
  'valdn',
);

schema.validate();
</script>

<template>
  <div>
    <div>Tabular Forms</div>

    <table>
      <thead>
        <tr>
          <th v-for="col in state.cols" :key="col.key">{{ col.name }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIdx) in state.rows" :key="rowIdx">
          <td v-for="col in state.cols" :key="`${rowIdx}-${col.key}`">
            <input v-model="row[col.key as keyof typeof row]" />
            <div>{{ state.valdn[`rows[${rowIdx}].${col.key}`] }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <pre>{{ state.valdn }}</pre>
  </div>
</template>
```

:::
