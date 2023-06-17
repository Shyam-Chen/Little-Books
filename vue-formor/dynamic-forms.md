# Dynamic Forms

## Building the Form

:::code-group

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
  <form>
    <div>
      <label for="language">Language:</label>

      <select id="language" v-model="state.zodForm.language" @change="changeLanguage">
        <option value="">None</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JavaScript</option>
      </select>

      <div class="text-red-500">{{ state.zodValdn.language }}</div>
    </div>

    <div>
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

    <button @click="submit">Submit</button>
  </form>

  <pre>{{ state.zodForm }}</pre>

  <pre>{{ state.zodValdn }}</pre>
</template>
```

```vue [Yup]
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

interface DynamicForms {
  language: string;
  preprocessor: string;
}

const msgs = {
  required: `This is a required field`,
};

const state = reactive({
  dynamicForms: {} as DynamicForms,
  errors: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [computed(() => state.dynamicForms.language), string().required(msgs.required)],
    [
      computed(() => state.dynamicForms.preprocessor),
      computed(() =>
        state.dynamicForms.language === 'js'
          ? string().required(msgs.required)
          : string().nullable(),
      ),
    ],
  ],
  state,
);

const changeLanguage = () => {
  state.dynamicForms.preprocessor = '';
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>Dynamic Forms</div>

    <div>
      <div>
        <label for="language">Language:</label>

        <select id="language" v-model="state.dynamicForms.language" @change="changeLanguage">
          <option value="">None</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
        </select>

        <div>{{ state.errors['dynamicForms.language'] }}</div>
      </div>

      <div>
        <label for="preprocessor">Preprocessor:</label>

        <select
          id="preprocessor"
          v-model="state.dynamicForms.preprocessor"
          :disabled="state.dynamicForms.language !== 'js'"
        >
          <option value="">None</option>
          <option value="ts">TypeScript</option>
        </select>

        <div>{{ state.errors['dynamicForms.preprocessor'] }}</div>
      </div>

      <button @click="submit">Submit</button>
    </div>

    <pre>{{ state.dynamicForms }}</pre>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
```

:::
