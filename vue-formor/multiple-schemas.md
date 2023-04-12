# Multiple Schemas

## Single Instance

```vue
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

interface Forms {
  text: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  fooForm: {} as Forms,
  barForm: {} as Forms,
  errors: {} as Record<string, string>,
});

const fooSchema = useSchema([[computed(() => state.fooForm.text), string().required()]], state);

const barSchema = useSchema([[computed(() => state.barForm.text), string().required()]], state);

const fooSubmit = () => {
  barSchema.stop();

  if (fooSchema.validate()) {
    // passed
  }
};

const baeSubmit = () => {
  fooSchema.stop();

  if (barSchema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>Multiple Schemas >> Multiple Schemas (Single-instance)</div>

    <div>
      <div>
        <label for="foo">Foo:</label>
        <input id="foo" type="text" v-model="state.fooForm.text" />
        <div>{{ state.errors['fooForm.text'] }}</div>
      </div>

      <div>
        <label for="bar">Bar:</label>
        <input id="bar" type="text" v-model="state.barForm.text" />
        <div>{{ state.errors['barForm.text'] }}</div>
      </div>

      <button @click="fooSubmit">Foo</button>
      <button @click="baeSubmit">Bar</button>
    </div>

    <div>
      fooForm:
      <pre>{{ state.fooForm }}</pre>
    </div>

    <div>
      barForm:
      <pre>{{ state.barForm }}</pre>
    </div>

    <pre>{{ state.errors }}</pre>
  </div>
</template>
```

## Multiple Instances

```vue
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

interface Forms {
  text: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  fooForm: {} as Forms,
  barForm: {} as Forms,
  fooErrors: {} as Record<string, string>,
  barErrors: {} as Record<string, string>,
});

const fooSchema = useSchema(
  [[computed(() => state.fooForm.text), string().required()]],
  state,
  'fooErrors',
);

const barSchema = useSchema(
  [[computed(() => state.barForm.text), string().required()]],
  state,
  'barErrors',
);

const fooSubmit = () => {
  if (fooSchema.validate()) {
    // passed
  }
};

const baeSubmit = () => {
  if (barSchema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>Multiple Schemas >> Multiple Schemas (Multiple-instance)</div>

    <div>
      <div>
        <label for="foo">Foo:</label>
        <input id="foo" type="text" v-model="state.fooForm.text" />
        <div>{{ state.fooErrors['fooForm.text'] }}</div>
      </div>

      <div>
        <label for="bar">Bar:</label>
        <input id="bar" type="text" v-model="state.barForm.text" />
        <div>{{ state.barErrors['barForm.text'] }}</div>
      </div>

      <button @click="fooSubmit">Foo</button>
      <button @click="baeSubmit">Bar</button>
    </div>

    <div>
      fooForm:
      <pre>{{ state.fooForm }}</pre>
    </div>

    <div>
      barForm:
      <pre>{{ state.barForm }}</pre>
    </div>

    <div>
      fooErrors:
      <pre>{{ state.fooErrors }}</pre>
    </div>

    <div>
      barErrors:
      <pre>{{ state.barErrors }}</pre>
    </div>
  </div>
</template>
```
