# Dynamic Forms

## Schema Validation

:::code-group

```vue [Valibot]
<script lang="ts" setup>
import { useValibotSchema } from 'vue-formor';
import { withDefault, object, string, optional, minLength } from 'valibot';

const schema = useValibotSchema(
  object({
    language: withDefault(string([minLength(1, msgs.required)]), ''),
    preprocessor: optional(
      string([
        (input) => {
          if (state.valibotForm.language === 'js' && !input) {
            return {
              issue: {
                validation: 'custom',
                message: msgs.required,
                input,
              },
            };
          }

          return { output: input };
        },
      ]),
    ),
  }),
  toRef(state, 'valibotForm'),
  toRef(state, 'valibotValdn'),
);
</script>
```

```vue [Zod]
<script lang="ts" setup>
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const schema = useZodSchema(
  z.object({
    language: z.string({ required_error: msgs.required }).nonempty(msgs.required),
    preprocessor: z
      .string()
      .optional()
      .refine((val) => {
        if (state.zodForm.language === 'js' && !val) return false;
        return true;
      }, msgs.required),
  }),
  toRef(state, 'zodForm'),
  toRef(state, 'zodValdn'),
);
</script>
```

```vue [Yup]
<script lang="ts" setup>
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

const schema = useYupSchema(
  object({
    language: string().required(msgs.required),
    preprocessor: string()
      .optional()
      .test('letters', msgs.required, (value) => {
        if (state.yupForm.language === 'js' && !value) return false;
        return true;
      }),
  }),
  toRef(state, 'yupForm'),
  toRef(state, 'yupValdn'),
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
import { withDefault, object, string, optional, minLength } from 'valibot';

interface DynamicForms {
  language: string;
  preprocessor: string;
}

const state = reactive({
  valibotForm: {} as DynamicForms,
  valibotValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
};

const schema = useValibotSchema(
  object({
    language: withDefault(string([minLength(1, msgs.required)]), ''),
    preprocessor: optional(
      string([
        (input) => {
          if (state.valibotForm.language === 'js' && !input) {
            return {
              issue: {
                validation: 'custom',
                message: msgs.required,
                input,
              },
            };
          }

          return { output: input };
        },
      ]),
    ),
  }),
  toRef(state, 'valibotForm'),
  toRef(state, 'valibotValdn'),
);

const changeLanguage = () => {
  state.valibotForm.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Dynamic Forms</legend>

    <form>
      <div class="flex gap-2">
        <label for="language">Language:</label>

        <select id="language" v-model="state.valibotForm.language" @change="changeLanguage">
          <option value="">None</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>

        <div class="text-red-500">{{ state.valibotValdn.language }}</div>
      </div>

      <div class="flex gap-2">
        <label for="preprocessor">Preprocessor:</label>

        <select
          id="preprocessor"
          v-model="state.valibotForm.preprocessor"
          :disabled="state.valibotForm.language !== 'js'"
        >
          <option value="">None</option>
          <option value="ts">TypeScript</option>
        </select>

        <div class="text-red-500">{{ state.valibotValdn.preprocessor }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.valibotForm }}</pre>

    <pre>{{ state.valibotValdn }}</pre>
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

interface DynamicForms {
  language: string;
  preprocessor: string;
}

const state = reactive({
  zodForm: {} as DynamicForms,
  zodValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
};

const schema = useZodSchema(
  z.object({
    language: z.string({ required_error: msgs.required }).nonempty(msgs.required),
    preprocessor: z
      .string()
      .optional()
      .refine((val) => {
        if (state.zodForm.language === 'js' && !val) return false;
        return true;
      }, msgs.required),
  }),
  toRef(state, 'zodForm'),
  toRef(state, 'zodValdn'),
);

const changeLanguage = () => {
  state.zodForm.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Dynamic Forms</legend>

    <form>
      <div class="flex gap-2">
        <label for="language">Language:</label>

        <select id="language" v-model="state.zodForm.language" @change="changeLanguage">
          <option value="">None</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>

        <div class="text-red-500">{{ state.zodValdn.language }}</div>
      </div>

      <div class="flex gap-2">
        <label for="preprocessor">Preprocessor:</label>

        <select
          id="preprocessor"
          v-model="state.zodForm.preprocessor"
          :disabled="state.zodForm.language !== 'js'"
        >
          <option value="">None</option>
          <option value="ts">TypeScript</option>
        </select>

        <div class="text-red-500">{{ state.zodValdn.preprocessor }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.zodForm }}</pre>

    <pre>{{ state.zodValdn }}</pre>
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

interface DynamicForms {
  language: string;
  preprocessor: string;
}

const state = reactive({
  yupForm: {} as DynamicForms,
  yupValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
};

const schema = useYupSchema(
  object({
    language: string().required(msgs.required),
    preprocessor: string()
      .optional()
      .test('letters', msgs.required, (value) => {
        if (state.yupForm.language === 'js' && !value) return false;
        return true;
      }),
  }),
  toRef(state, 'yupForm'),
  toRef(state, 'yupValdn'),
);

const changeLanguage = () => {
  state.yupForm.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Dynamic Forms</legend>

    <form>
      <div class="flex gap-2">
        <label for="language">Language:</label>

        <select id="language" v-model="state.yupForm.language" @change="changeLanguage">
          <option value="">None</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>

        <div class="text-red-500">{{ state.yupValdn.language }}</div>
      </div>

      <div class="flex gap-2">
        <label for="preprocessor">Preprocessor:</label>

        <select
          id="preprocessor"
          v-model="state.yupForm.preprocessor"
          :disabled="state.yupForm.language !== 'js'"
        >
          <option value="">None</option>
          <option value="ts">TypeScript</option>
        </select>

        <div class="text-red-500">{{ state.yupValdn.preprocessor }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.yupForm }}</pre>

    <pre>{{ state.yupValdn }}</pre>
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
