# State Management

## `pinia`

```ts
// store.ts
import { defineStore } from 'pinia';

import { State } from './type';

export const useSignInStore = defineStore('/sign-in', {
  state: (): State => ({
    basicForms: {},
    errors: {},
  }),

  getters: {},

  actions: {
    signIn() {
      console.log('Sign In', this.basicForms);
    },
  },
});
```

```ts
// schema.ts
import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

import { useStore } from './store';

setLocale({
  mixed: {
    required: 'This is a required field',
  },
  string: {
    email: 'This must be a valid email',
    min: 'This must be at least 8 characters',
  },
});

export const useBasicFormsSchema = () => {
  const store = useStore();

  const schema = useSchema(
    [
      [computed(() => store.basicForms.email), string().required().email()],
      [computed(() => store.basicForms.password), string().required().min(8)],
    ],
    store,
  );

  return schema;
};
```

```vue
<script lang="ts" setup>
import { useStore } from './store';
import { useBasicFormsSchema } from './schema';

const store = useStore();
const schema = useBasicFormsSchema();

const signIn = () => {
  if (schema.validate()) {
    store.signIn();
  }
};
</script>

<template>
  <form>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="store.basicForms.email" />
      <div>{{ store.errors['basicForms.email'] }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="store.basicForms.password" />
      <div>{{ store.errors['basicForms.password'] }}</div>
    </div>

    <button @click="signIn">Sign in</button>
  </form>
</template>
```

## `vue-storer`

```ts
// store.ts
import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

export const useLoginStore = defineStore('/login', () => {
  const state = reactive({
    loginForm: {},
    loginValdn: {},
  });

  const getters = readonly({});

  const actions = readonly({
    login() {
      console.log('Login', state.loginForm);
    },
  });

  return { state, getters, actions };
});
```

```ts
import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

import { useLoginStore } from './store';

const msgs = {
  email: `This must be a valid email`,
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
};

export const useLoginFormSchema = () => {
  const { state } = useLoginStore();

  const string = () => z.string({ required_error: msgs.required });

  const schema = useZodSchema(
    z.object({
      email: string().email(msgs.email).nonempty(msgs.required),
      password: string().min(8, msgs.min).nonempty(msgs.required),
    }),
    toRef(state, 'loginForm'),
    toRef(state, 'loginValdn'),
  );

  return schema;
};
```

```vue
<script lang="ts" setup>
import { useLoginStore } from './store';
import { useLoginFormSchema } from './schema';

const { state, actions } = useLoginStore();
const schema = useLoginFormSchema();

const login = () => {
  if (schema.validate()) {
    actions.login();
  }
};
</script>

<template>
  <form>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="state.loginForm.email" />
      <div>{{ state.loginValdn.email }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="state.loginForm.password" />
      <div>{{ state.loginValdn.password }}</div>
    </div>

    <button @click="login">Login</button>
  </form>
</template>
```
