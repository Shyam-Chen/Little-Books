# Touched

## Schema Validation

```ts {14-16}
const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
  loginTouched: {} as Record<keyof LoginForm, boolean>, // [!code hl]
});

const schema = use_LIB_Schema(
  /* ... */,
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
  toRef(state, 'loginTouched'), // [!code hl]
);

onMounted(() => {
  schema.run();
});

// If the form is sent successfully and you want to continue using the component,
// you can re-execute it through `rerun`.
// schema.rerun();
```

### Set Touch Value

```html {7}
<div class="flex gap-2">
  <label for="email">Email:</label>
  <input
    id="email"
    v-model="state.loginForm.email"
    type="email"
    @blur="state.loginTouched.email = true"
  />
  <div class="text-red-500">{{ state.loginValdn.email }}</div>
</div>
```

Or customize your tracking values to use `watch` to set touch values .


