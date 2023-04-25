# Custom Schemas

## Building the Form

:::code-group

```vue [Zod]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

interface CustomSchemas {
  name: string;
}

const state = reactive({
  zodForm: {} as CustomSchemas,
  zodValdn: {} as Record<string, string>,
});

const msgs = {
  required: 'This is a required field',
  letters: 'This must contain only letters',
};

const string = () => z.string({ required_error: msgs.required });

const schema = useZodSchema(
  z.object({
    name: string()
      .nonempty(msgs.required)
      .refine((val) => {
        if (val) return /^[A-Za-z]+$/.test(val);
        return true;
      }, msgs.letters),
  }),
  toRef(state, 'zodForm'),
  toRef(state, 'zodValdn'),
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="state.zodForm.name" type="text" />
      <div class="text-red-500">{{ state.zodValdn.name }}</div>
    </div>

    <button @click="submit">Submit</button>
  </div>

  <pre>{{ state.zodForm }}</pre>

  <pre>{{ state.zodValdn }}</pre>
</template>
```

```vue [Yup]
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

interface CustomSchemas {
  name: string;
}

const msgs = {
  required: 'This is a required field',
  letters: 'This must contain only letters',
};

const state = reactive({
  customSchemas: {} as CustomSchemas,
  errors: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [
      computed(() => state.customSchemas.name),
      string()
        .required(msgs.required)
        .test('letters', msgs.letters, (value) => {
          if (value && !/^[A-Za-z]+$/.test(value)) return false;
          return true;
        }),
    ],
  ],
  state,
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="state.customSchemas.name" type="text" />
      <div class="text-red-500">{{ state.errors['customSchemas.name'] }}</div>
    </div>

    <button @click="submit">Submit</button>
  </div>

  <pre>{{ state.customSchemas }}</pre>

  <pre>{{ state.errors }}</pre>
</template>
```

:::
