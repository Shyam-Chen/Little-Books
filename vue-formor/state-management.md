# State Management

## `pinia`

```ts
// store.ts
import { defineStore } from 'pinia';

import { State } from './type';

export default defineStore('/sign-in', {
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

```ts [Yup]
// schema.ts
import { computed } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

import useStore from './store';

const msgs = {
  required: 'This is a required field',
  string: {
    min: 'This must be at least 8 characters',
  },
};

export const useSchema = () => {
  const store = useStore();

  const schema = useYupSchema(
    [
      [computed(() => store.form.username), string().required(msgs.required)],
      [
        computed(() => store.form.password),
        string().required(msgs.required).min(8, msgs.string.min),
      ],
    ],
    store,
    'valdn',
  );

  return schema;
};
```

:::

:::code-group

```vue [Yup]
<script lang="ts" setup>
import useStore from './store';
import { useSchema } from './schema';

const store = useStore();
const schema = useSchema();

const signIn = () => {
  if (schema.validate()) {
    store.signIn();
  }
};
</script>

<template>
  <form>
    <div>
      <label>Username:</label>
      <input type="text" v-model="store.form.username" />
      <div>{{ store.valdn['form.username'] }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input type="password" v-model="store.form.password" />
      <div>{{ store.valdn['form.password'] }}</div>
    </div>

    <button type="button" @click="signIn">Sign in</button>
  </form>
</template>
```

:::

## `vue-storer`

```ts
// store.ts
import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

export default defineStore('/login', () => {
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

```ts [Zod]
import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import useStore from './store';

const msgs = {
  required: `This is a required field`,
  string: {
    min: `This must be at least 8 characters`,
  },
};

export const useSchema = () => {
  const { state } = useStore();

  const string = () => z.string({ required_error: msgs.required });

  const schema = useZodSchema(
    z.object({
      username: string().nonempty(msgs.required),
      password: string().min(8, msgs.string.min).nonempty(msgs.required),
    }),
    toRef(state, 'form'),
    toRef(state, 'valdn'),
  );

  return schema;
};
```

:::

:::code-group

```vue [Zod]
<script lang="ts" setup>
import useStore from './store';
import { useSchema } from './schema';

const { state, actions } = useStore();
const schema = useSchema();

const signIn = () => {
  if (schema.validate()) {
    actions.login();
  }
};
</script>

<template>
  <form>
    <div>
      <label>Username:</label>
      <input type="text" v-model="state.form.username" />
      <div>{{ state.valdn.username }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input type="password" v-model="state.form.password" />
      <div>{{ state.valdn.password }}</div>
    </div>

    <button type="button" @click="signIn">Sign in</button>
  </form>
</template>
```

:::
