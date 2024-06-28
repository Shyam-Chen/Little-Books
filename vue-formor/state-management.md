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

```ts
// schema.ts
import { reactive, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const store = useStore();

  const schema = useZodSchema(
    v.object({
      email: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required), v.email(msgs.email)), ''),
      password: v.nullish(
        v.pipe(v.string(), v.minLength(1, msgs.required), v.minLength(8, msgs.min)),
        '',
      ),
    }),
    toRef(store, 'form'),
    toRef(store, 'valdn'),
  );

  return schema;
};
```

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

```ts
// schema.ts
import { toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

export const useSchema = () => {
  const { state } = useStore();

  const schema = useZodSchema(
    v.object({
      email: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required), v.email(msgs.email)), ''),
      password: v.nullish(
        v.pipe(v.string(), v.minLength(1, msgs.required), v.minLength(8, msgs.min)),
        '',
      ),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

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
