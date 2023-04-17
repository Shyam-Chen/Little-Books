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

    <button>Sign in</button>
  </form>
</template>
```

## Setting Form Values

```vue {9-11}
<script lang="ts" setup>
import { reactive } from 'vue';

interface BasicForms {
  email: string;
  password: string;
}

const state = reactive({
  loginForm: {} as BasicForms,
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

    <button>Login</button>
  </form>
</template>
```

## Adding Validation

:::code-group

```vue {12-15} [Zod]
<script lang="ts" setup>
import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const state = reactive({
  loginForm: {} as BasicForms,
  loginValdn: {} as Record<string, string>, // [!code hl]
});

const schema = useZodSchema(
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(8).nonempty(),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'), // [!code hl]
);
</script>
```

```vue [Yup]
<script lang="ts" setup>
import { computed } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

const state = reactive({
  loginForm: {} as BasicForms,
  loginValdn: {} as Record<string, string>, // [!code hl]
});

const schema = useYupSchema(
  [
    [computed(() => state.loginForm.email), string().required().email()], // [!code hl]
    [computed(() => state.loginForm.password), string().required().min(8)], // [!code hl]
  ],
  state,
  'loginValdn', // [!code hl]
);
</script>
```

:::

## Displaying Error Messages

:::code-group

```vue [Zod]
<script lang="ts" setup>
const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

const schema = useZodSchema(
  z.object({
    email: z // [!code hl]
      .string({ required_error: msgs.required }) // [!code hl]
      .email(msgs.email) // [!code hl]
      .nonempty(msgs.required), // [!code hl]
    password: z // [!code hl]
      .string({ required_error: msgs.required }) // [!code hl]
      .min(8, msgs.min) // [!code hl]
      .nonempty(msgs.required), // [!code hl]
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

```vue [Yup]
<script lang="ts" setup>
const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

const schema = useYupSchema(
  [
    [
      computed(() => state.loginForm.email),
      string().required(msgs.required).email(msgs.email), // [!code hl]
    ],
    [
      computed(() => state.loginForm.password),
      string().required(msgs.required).min(8, msgs.min), // [!code hl]
    ],
  ],
  state,
  'loginValdn', // [!code hl]
);
</script>

<template>
  <form>
    <div>
      <label>Email:</label>
      <input v-model="state.loginForm.email" type="email" />
      <div>{{ state.loginValdn['loginForm.email'] }}// [!code hl]</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.loginForm.password" type="password" />
      <div>{{ state.loginValdn['loginForm.password'] }}// [!code hl]</div>
    </div>
  </form>
</template>
```

:::

## Handling Submissions

```vue {3}
<script lang="ts" setup>
const login = () => {
  if (schema.validate()) {
    console.log('validated data =', state.loginForm);
  }
};
</script>

<template>
  <form>
    <!-- ... -->

    <button @click="login">Login</button> // [!code hl]
  </form>
</template>
```

## Final Code

Putting all the pieces from the above sections together it should be as following:

:::code-group

```vue {38} [Zod]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

interface BasicForms {
  email: string;
  password: string;
}

const state = reactive({
  loginForm: {} as BasicForms,
  loginValdn: {} as Record<string, string>, // [!code hl]
});

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

const schema = useZodSchema(
  z.object({
    email: z // [!code hl]
      .string({ required_error: msgs.required }) // [!code hl]
      .email(msgs.email) // [!code hl]
      .nonempty(msgs.required), // [!code hl]
    password: z // [!code hl]
      .string({ required_error: msgs.required }) // [!code hl]
      .min(8, msgs.min) // [!code hl]
      .nonempty(msgs.required), // [!code hl]
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'), // [!code hl]
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
      <div>{{ state.loginValdn.email }}// [!code hl]</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.loginForm.password" type="password" />
      <div>{{ state.loginValdn.password }}// [!code hl]</div>
    </div>

    <button @click="signIn">Sign in</button>
  </form>
</template>
```

```vue {38} [Yup]
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

interface BasicForms {
  email: string;
  password: string;
}

const state = reactive({
  loginForm: {} as BasicForms,
  loginValdn: {} as Record<string, string>, // [!code hl]
});

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

const schema = useYupSchema(
  [
    [
      computed(() => state.loginForm.email), // [!code hl]
      string().required(msgs.required).email(msgs.email), // [!code hl]
    ],
    [
      computed(() => state.loginForm.password), // [!code hl]
      string().required(msgs.required).min(8, msgs.min), // [!code hl]
    ],
  ],
  state,
  'loginValdn', // [!code hl]
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
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="state.loginForm.email" />
      <div>{{ state.loginValdn['loginForm.email'] }}// [!code hl]</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="state.loginForm.password" />
      <div>{{ state.loginValdn['loginForm.password'] }}// [!code hl]</div>
    </div>

    <button @click="signIn">Sign in</button>
  </form>
</template>
```

:::
