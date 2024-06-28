# Basic Forms

## Building the Form

First, start by adding some markup, you can start by having a `form` wrapping a few `input` elements.

```vue
<template>
  <form>
    <div>
      <label>Email:</label>
      <input type="email" />
    </div>

    <div>
      <label>Password:</label>
      <input type="password" />
    </div>

    <button type="button">Sign in</button>
  </form>
</template>
```

## Setting Form Values

```vue {9-11}
<script lang="ts" setup>
import { reactive } from 'vue';

interface LoginForm {
  email?: string;
  password?: string;
}

const state = reactive({
  loginForm: {} as LoginForm,
});
</script>

<template>
  <form>
    <div>
      <label>Email:</label>
      <input v-model="state.loginForm.email" type="email" /> // [!code hl]
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.loginForm.password" type="password" /> // [!code hl]
    </div>

    <button type="button">Sign in</button>
  </form>
</template>
```

## Adding Validation

```vue {8,11-18}
<script lang="ts" setup>
import { toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
});

const schema = useSchema(
  object({
    email: v.nullish(v.pipe(v.string(), v.minLength(1), v.email()), ''),
    password: v.nullish(v.pipe(v.string(), v.minLength(1), v.minLength(8)), ''),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
);
</script>
```

## Displaying Error Messages

```vue {2-6,10,12}
<script lang="ts" setup>
const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

const schema = useSchema(
  object({
    email: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required), v.email(msgs.email)), ''),
    password: v.nullish(
      v.pipe(v.string(), v.minLength(1, msgs.required), v.minLength(8, msgs.min)),
      '',
    ),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
);
</script>

<template>
  <form>
    <div>
      <label>Email:</label>
      <input v-model="state.loginForm.email" type="email" />
      <div>{{ state.loginValdn.email }}// [!code hl]</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.loginForm.password" type="password" />
      <div>{{ state.loginValdn.password }}// [!code hl]</div>
    </div>
  </form>
</template>
```

## Handling Submissions

```vue {3}
<script lang="ts" setup>
const signIn = () => {
  if (schema.validate()) {
    console.log('validated data =', state.loginForm);
  }
};
</script>

<template>
  <form>
    <!-- ... -->

    <button type="button" @click="signIn">Sign in</button> // [!code hl]
  </form>
</template>
```

## Final Code

Putting all the pieces from the above sections together it should be as following:

```vue {3-4,22-32}
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

interface LoginForm {
  email?: string;
  password?: string;
}

const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
});

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

const schema = useSchema(
  object({
    email: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required), v.email(msgs.email)), ''),
    password: v.nullish(
      v.pipe(v.string(), v.minLength(1, msgs.required), v.minLength(8, msgs.min)),
      '',
    ),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
);

const signIn = () => {
  if (schema.validate()) {
    console.log('validated data =', state.loginForm);
  }
};
</script>

<template>
  <form>
    <div>
      <label>Email:</label>
      <input v-model="state.loginForm.email" type="email" />
      <div>{{ state.loginValdn.email }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.loginForm.password" type="password" />
      <div>{{ state.loginValdn.password }}</div>
    </div>

    <button type="button" @click="signIn">Sign in</button>
  </form>
</template>
```
