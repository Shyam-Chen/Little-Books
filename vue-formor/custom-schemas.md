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
  required: `This is a required field`,
};

const string = () => z.string({ required_error: msgs.required });

const schema = useZodSchema(
  z.object({
    name: string()
      .nonempty(msgs.required)
      .refine((val) => {
        if (val) return /^[A-Za-z]+$/.test(val);
        return true;
      }, 'This must contain only letters'),
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
  <form>
    <div>
      <label>Name:</label>
      <input v-model="state.zodForm.name" type="text" />
      <div class="text-red-500">{{ state.zodValdn.name }}</div>
    </div>

    <button @click="submit">Submit</button>
  </form>

  <pre>{{ state.zodForm }}</pre>

  <pre>{{ state.zodValdn }}</pre>
</template>
```

```vue [Yup]
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, addMethod, string } from 'yup';

interface CustomSchemas {
  name: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

addMethod(string, 'letters', function () {
  return this.test('letters', 'This must contain only letters', (value) => {
    if (value && !/^[A-Za-z]+$/.test(value)) return false;
    return true;
  });
});

const state = reactive({
  customSchemas: {} as CustomSchemas,
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [[computed(() => state.customSchemas.name), string().required().letters()]],
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
    <div>Custom Schemas</div>

    <div>
      <div>
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="state.customSchemas.name" />
        <div>{{ state.errors['customSchemas.name'] }}</div>
      </div>

      <button @click="submit">Submit</button>
    </div>

    <pre>{{ state.customSchemas }}</pre>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
```

```ts [Yup (shims.d.ts)]
import type { StringSchema } from 'yup';

declare module 'yup' {
  interface StringSchema {
    letters(): StringSchema;
  }
}
```

:::
