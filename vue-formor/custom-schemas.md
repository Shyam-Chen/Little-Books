# Custom Schemas

## Schema Validation

:::code-group

```vue [Valibot]
<script lang="ts" setup>
import { useValibotSchema } from 'vue-formor';
import { nullish, object, string, custom } from 'valibot';

const schema = useValibotSchema(
  object({
    name: nullish(
      string([
        minLength(1, msgs.required),
        custom((input) => /^[A-Za-z]+$/.test(input), msgs.letters),
      ]),
      '',
    ),
  }),
  toRef(state, 'myForm'),
  toRef(state, 'myValdn'),
);
</script>
```

```vue [Zod]
<script lang="ts" setup>
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const schema = useZodSchema(
  z.object({
    name: z
      .string({ required_error: msgs.required })
      .nonempty(msgs.required)
      .refine((val) => {
        if (val) return /^[A-Za-z]+$/.test(val);
        return true;
      }, msgs.letters),
  }),
  toRef(state, 'myForm'),
  toRef(state, 'myValdn'),
);
</script>
```

```vue [Yup]
<script lang="ts" setup>
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

const schema = useYupSchema(
  object({
    name: string()
      .required(msgs.required)
      .test('letters', msgs.letters, (value) => {
        if (value && !/^[A-Za-z]+$/.test(value)) return false;
        return true;
      }),
  }),
  toRef(state, 'myForm'),
  toRef(state, 'myValdn'),
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
import { nullish, object, string, custom } from 'valibot';

interface CustomSchemas {
  name: string;
}

const state = reactive({
  myForm: {} as CustomSchemas,
  myValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
  letters: `This must contain only letters`,
};

const schema = useValibotSchema(
  object({
    name: nullish(
      string([
        minLength(1, msgs.required),
        custom((input) => /^[A-Za-z]+$/.test(input), msgs.letters),
      ]),
      '',
    ),
  }),
  toRef(state, 'myForm'),
  toRef(state, 'myValdn'),
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Custom Schemas</legend>

    <form>
      <div class="flex gap-2">
        <label for="name">Name:</label>
        <input id="name" v-model="state.myForm.name" type="text" />
        <div class="text-red-500">{{ state.myValdn.name }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.myForm }}</pre>

    <pre>{{ state.myValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
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

interface CustomSchemas {
  name: string;
}

const state = reactive({
  myForm: {} as CustomSchemas,
  myValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
  letters: `This must contain only letters`,
};

const schema = useZodSchema(
  z.object({
    name: z
      .string({ required_error: msgs.required })
      .nonempty(msgs.required)
      .refine((val) => {
        if (val) return /^[A-Za-z]+$/.test(val);
        return true;
      }, msgs.letters),
  }),
  toRef(state, 'myForm'),
  toRef(state, 'myValdn'),
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Custom Schemas</legend>

    <form>
      <div class="flex gap-2">
        <label for="name">Name:</label>
        <input id="name" v-model="state.myForm.name" type="text" />
        <div class="text-red-500">{{ state.myValdn.name }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.myForm }}</pre>

    <pre>{{ state.myValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
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
import { object, string } from 'yup';

interface CustomSchemas {
  name: string;
}

const state = reactive({
  myForm: {} as CustomSchemas,
  myValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
  letters: `This must contain only letters`,
};

const schema = useYupSchema(
  object({
    name: string()
      .required(msgs.required)
      .test('letters', msgs.letters, (value) => {
        if (value && !/^[A-Za-z]+$/.test(value)) return false;
        return true;
      }),
  }),
  toRef(state, 'myForm'),
  toRef(state, 'myValdn'),
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Custom Schemas</legend>

    <form>
      <div class="flex gap-2">
        <label for="name">Name:</label>
        <input id="name" v-model="state.myForm.name" type="text" />
        <div class="text-red-500">{{ state.myValdn.name }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.myForm }}</pre>

    <pre>{{ state.myValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.text-red-500 {
  --un-text-opacity: 1;
  color: rgba(239, 68, 68, var(--un-text-opacity));
}
</style>
```

:::
