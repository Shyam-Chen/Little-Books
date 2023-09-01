# Multiple Schemas

## Single Instance

```vue
<script lang="ts" setup>
const fooSchema = use_LIB_Schema(
  /* ... */
  toRef(state, 'fooForm'),
  toRef(state, 'myValdn'), // [!code hl]
);

const barSchema = use_LIB_Schema(
  /* ... */
  toRef(state, 'barForm'),
  toRef(state, 'myValdn'), // [!code hl]
);

const fooSubmit = () => {
  barSchema.stop(); // [!code hl]

  if (fooSchema.validate()) {
    // passed
  }
};

const barSubmit = () => {
  fooSchema.stop(); // [!code hl]

  if (barSchema.validate()) {
    // passed
  }
};
</script>
```

## Multiple Instances

```vue
<script lang="ts" setup>
const fooSchema = use_LIB_Schema(
  /* ... */
  toRef(state, 'fooForm'),
  toRef(state, 'fooValdn'), // [!code hl]
);

const barSchema = use_LIB_Schema(
  /* ... */
  toRef(state, 'barForm'),
  toRef(state, 'barValdn'), // [!code hl]
);

const fooSubmit = () => {
  if (fooSchema.validate()) {
    // passed
  }
};

const barSubmit = () => {
  if (barSchema.validate()) {
    // passed
  }
};
</script>
```

## Combinations

```vue {15}
<script lang="ts" setup>
const fooSchema = use_LIB_Schema(
  /* ... */
  toRef(state, 'fooForm'),
  toRef(state, 'fooValdn'),
);

const barSchema = use_LIB_Schema(
  /* ... */
  toRef(state, 'barForm'),
  toRef(state, 'barValdn'),
);

const submit = () => {
  if ([fooSchema, barSchema].map((schema) => schema.validate()).every(Boolean)) {
    // passed
  }
};
</script>
```
