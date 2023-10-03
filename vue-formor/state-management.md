# State Management

## `pinia`

```ts
// store.ts
import { defineStore } from 'pinia';

import { State } from './type';

export default defineStore('my-form', {
  state: (): State => ({
    form: {},
    valdn: {},
  }),
  getters: {},
  actions: {
    signIn() {
      console.log(this.form);
    },
  },
});
```

:::code-group

```ts [Valibot]
// schema.ts
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, string, minLength, email } from 'valibot';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const store = useStore();

  const schema = useZodSchema(
    object({
      email: optional(string([minLength(1, msgs.required), email(msgs.email)]), ''),
      password: optional(string([minLength(1, msgs.required), minLength(8, msgs.min)]), ''),
    }),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
  );

  return schema;
};
```

```ts [Zod]
// schema.ts
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const store = useStore();

  const schema = useZodSchema(
    z.object({
      email: z.string({ required_error: msgs.required }).email(msgs.email).nonempty(msgs.required),
      password: z
        .string({ required_error: msgs.required })
        .min(8, msgs.min)
        .nonempty(msgs.required),
    }),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
  );

  return schema;
};
```

```ts [Yup]
// schema.ts
import { reactive, toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const store = useStore();

  const schema = useZodSchema(
    object({
      email: string().required(msgs.required).email(msgs.email),
      password: string().required(msgs.required).min(8, msgs.min),
    }),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
  );

  return schema;
};
```

:::

```vue
<script lang="ts" setup>
import useStore from './store';
import { useSchema } from './schema';

const store = useStore();
const schema = useSchema();

const onSignIn = () => {
  if (schema.validate()) {
    store.signIn();
  }
};
</script>

<template>
  <form>
    <div>
      <label>Email:</label>
      <input v-model="store.form.email" type="email" />
      <div>{{ store.valdn.email }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="store.form.password" type="password" />
      <div>{{ store.valdn.password }}</div>
    </div>

    <button type="button" @click="onSignIn">Sign in</button>
  </form>
</template>
```

## `vue-storer`

```ts
// store.ts
import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

export default defineStore('my-form', () => {
  const state = reactive({
    form: {},
    valdn: {},
  });

  const getters = readonly({});

  const actions = readonly({
    signIn() {
      console.log(state.form);
    },
  });

  return { state, getters, actions };
});
```

:::code-group

```ts [Valibot]
// schema.ts
import { toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, string, minLength, email } from 'valibot';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const { state } = useStore();

  const schema = useValibotSchema(
    object({
      email: optional(string([minLength(1, msgs.required), email(msgs.email)]), ''),
      password: optional(string([minLength(1, msgs.required), minLength(8, msgs.min)]), ''),
    }),
    toRef(state, 'loginForm'),
    toRef(state, 'loginValdn'),
  );

  return schema;
};
```

```ts [Zod]
// schema.ts
import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const { state } = useStore();

  const schema = useZodSchema(
    z.object({
      email: z.string({ required_error: msgs.required }).email(msgs.email).nonempty(msgs.required),
      password: z
        .string({ required_error: msgs.required })
        .min(8, msgs.min)
        .nonempty(msgs.required),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

```ts [Yup]
// schema.ts
import { toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const { state } = useStore();

  const schema = useYupSchema(
    object({
      email: string().required(msgs.required).email(msgs.email),
      password: string().required(msgs.required).min(8, msgs.min),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

:::

```vue
<script lang="ts" setup>
import useStore from './store';
import { useSchema } from './schema';

const { state, actions } = useStore();
const schema = useSchema();

const onSignIn = () => {
  if (schema.validate()) {
    actions.signIn();
  }
};
</script>

<template>
  <form>
    <div>
      <label>Email:</label>
      <input v-model="state.form.email" type="email" />
      <div>{{ state.valdn.email }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.form.password" type="password" />
      <div>{{ state.valdn.password }}</div>
    </div>

    <button type="button" @click="onSignIn">Sign in</button>
  </form>
</template>
```
