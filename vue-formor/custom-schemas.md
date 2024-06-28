# Custom Schemas

## Schema Validation

```vue
<script lang="ts" setup>
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

const schema = useSchema(
  v.object({
    name: v.nullish(
      v.pipe(
        v.string(),
        v.minLength(1, msgs.required),
        v.check((input) => /^[A-Za-z]+$/.test(input), msgs.letters),
        // equivalent to
        // v.regex(/^[A-Za-z]+$/, msgs.letters),
      ),
      '',
    ),
  }),
  toRef(state, 'myForm'),
  toRef(state, 'myValdn'),
);
</script>
```

## Final Code

```vue
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

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

const schema = useSchema(
  v.object({
    name: v.nullish(
      v.pipe(
        v.string(),
        v.minLength(1, msgs.required),
        v.check((input) => /^[A-Za-z]+$/.test(input), msgs.letters),
        // equivalent to
        // v.regex(/^[A-Za-z]+$/, msgs.letters),
      ),
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
