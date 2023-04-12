# Basic Forms

## Building the Form

:::code-group

```vue [Zod]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

interface BasicForms {
  email: string;
  password: string;
}

const state = reactive({
  zodForm: {} as BasicForms,
  zodValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

const string = () => z.string({ required_error: msgs.required });

const schema = useZodSchema(
  z.object({
    email: string().email(msgs.email).nonempty(msgs.required),
    password: string().min(8, msgs.min).nonempty(msgs.required),
  }),
  toRef(state, 'zodForm'),
  toRef(state, 'zodValdn'),
);

const signIn = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <form>
    <div>
      <label>Email:</label>
      <input v-model="state.zodForm.email" type="email" />
      <div class="text-red-500">{{ state.zodValdn.email }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.zodForm.password" type="password" />
      <div class="text-red-500">{{ state.zodValdn.password }}</div>
    </div>

    <button @click="signIn">Sign in</button>
  </form>

  <pre>{{ state.zodForm }}</pre>

  <pre>{{ state.zodValdn }}</pre>
</template>
```

```vue [Yup]
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

interface BasicForms {
  email: string;
  password: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
  string: {
    email: 'This must be a valid email',
    min: 'This must be at least 8 characters',
  },
});

const state = reactive({
  basicForms: {} as BasicForms,
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [computed(() => state.basicForms.email), string().required().email()],
    [computed(() => state.basicForms.password), string().required().min(8)],
  ],
  state,
);

const signIn = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <form>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="state.basicForms.email" />
      <div>{{ state.errors['basicForms.email'] }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="state.basicForms.password" />
      <div>{{ state.errors['basicForms.password'] }}</div>
    </div>

    <button @click="signIn">Sign in</button>
  </form>
</template>
```

:::
