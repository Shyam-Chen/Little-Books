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

:::code-group

```vue {8,11-18} [Valibot]
<script lang="ts" setup>
import { toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { nullish, object, string, minLength, email } from 'valibot';

const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
});

const schema = useValibotSchema(
  object({
    email: nullish(string([minLength(1), email()]), ''),
    password: nullish(string([minLength(1), minLength(8)]), ''),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
);
</script>
```

```vue {8,11-18} [Zod]
<script lang="ts" setup>
import { toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
});

const schema = useZodSchema(
  z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(8).nonempty(),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
);
</script>
```

```vue {8,11-18} [Yup]
<script lang="ts" setup>
import { toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
});

const schema = useYupSchema(
  object({
    email: string().required().email(),
    password: string().required().min(8),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
);
</script>
```

:::

## Displaying Error Messages

:::code-group

```vue {2-6,10-11} [Valibot]
<script lang="ts" setup>
const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

const schema = useValibotSchema(
  object({
    email: nullish(string([minLength(1, msgs.required), email(msgs.email)]), ''),
    password: nullish(string([minLength(1, msgs.required), minLength(8, msgs.min)]), ''),
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

```vue {2-6,10-11} [Zod]
<script lang="ts" setup>
const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

const schema = useZodSchema(
  z.object({
    email: z.string({ required_error: msgs.required }).email(msgs.email).nonempty(msgs.required),
    password: z.string({ required_error: msgs.required }).min(8, msgs.min).nonempty(msgs.required),
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

```vue {2-6,10-11} [Yup]
<script lang="ts" setup>
const msgs = {
  required: `This is a required field`,
  min: `This must be at least 8 characters`,
  email: `This must be a valid email`,
};

const schema = useYupSchema(
  object({
    email: string().required(msgs.required).email(msgs.email),
    password: string().required(msgs.required).min(8, msgs.min),
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

:::

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

:::code-group

```vue {3-4,22-26} [Valibot]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { nullish, object, string, minLength, email } from 'valibot';

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

const schema = useValibotSchema(
  object({
    email: nullish(string([minLength(1, msgs.required), email(msgs.email)]), ''),
    password: nullish(string([minLength(1, msgs.required), minLength(8, msgs.min)]), ''),
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

```vue {3-4,22-26} [Zod]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

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

const schema = useZodSchema(
  z.object({
    email: z.string({ required_error: msgs.required }).email(msgs.email).nonempty(msgs.required),
    password: z.string({ required_error: msgs.required }).min(8, msgs.min).nonempty(msgs.required),
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

```vue {3-4,22-26} [Yup]
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

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

const schema = useYupSchema(
  object({
    email: string().required(msgs.required).email(msgs.email),
    password: string().required(msgs.required).min(8, msgs.min),
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

:::
