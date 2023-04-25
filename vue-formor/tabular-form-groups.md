# Tabular Form Groups

```vue
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  listGroup: [
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
  errors: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [
      computed(() => state.listGroup),
      (row: any, idx: number) => [
        [computed(() => row.parent), string().required()],
        [
          computed(() => row.children),
          (subRow: any, subIdx: number) => [
            [computed(() => subRow.firstField), string().required()],
            [computed(() => subRow.secondField), string().required()],
          ],
        ],
      ],
    ],
  ],
  state,
);

schema.validate();
</script>

<template>
  <div>
    <div>Tabular Form Groups</div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
```
