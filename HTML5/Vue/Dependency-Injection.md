## Dependency Injection

```vue
<!-- Display.vue -->
<script setup>
import { provide } from 'vue';

import Name from './Name.vue';

// provide(KEY, VALUE);
provide('firstName', 'Shyam');
provide('lastName', 'Chen');
</script>

<template>
  <Name />
  <!-- Shyam Chen -->
</template>
```

```vue
<!-- Name.vue -->
<script setup>
import { inject } from 'vue';

// inject(KEY, DEFAULT_VALUE);
const firstName = inject('firstName');
const lastName = inject('lastName');
</script>

<template>
  <div>{{ firstName }} {{ lastName }}</div>
</template>
```

`ref`

```vue
<!-- Display.vue -->
<script setup>
import { ref, provide } from 'vue';

import Name from './Name.vue';

const firstName = ref('Shyam');
const lastName = ref('Chen');
provide('firstName', firstName);
provide('lastName', lastName);

const changeName = () => {
  firstName.value = 'Evan';
  lastName.value = 'You';
};
</script>

<template>
  <Name />
  <!-- Clicked: Evan You -->
  <button @click="changeName">Change Name</button>
</template>
```

`reactive`

```vue
<!-- Display.vue -->
<script setup>
import { reactive, provide } from 'vue';

import Name from './Name.vue';

const name = reactive({
  firstName: 'Shyam',
  lastName: 'Chen',
});

provide('name', name);

const changeName = () => {
  name.firstName = 'Evan';
  name.lastName = 'You';
};
</script>

<template>
  <Name />
  <button @click="changeName">Change Name</button>
</template>
```

```vue
<!-- Name.vue -->
<script setup>
import { inject } from 'vue';

const name = inject('name');
</script>

<template>
  <div>{{ name.firstName }} {{ name.lastName }}</div>
</template>
```

Providing Methods

```vue
<!-- Display.vue -->
<script setup>
import { reactive, provide } from 'vue';

import Name from './Name.vue';

const name = reactive({
  firstName: 'Shyam',
  lastName: 'Chen',
});

const changeName = () => {
  name.firstName = 'Evan';
  name.lastName = 'You';
};

provide('name', name);
provide('changeName', changeName);
</script>

<template>
  <Name />
</template>
```

```vue
<!-- Name.vue -->
<script setup>
import { inject } from 'vue';

const name = inject('name');
const changeName = inject('changeName');
</script>

<template>
  <div>{{ name.firstName }} {{ name.lastName }}</div>
  <button @click="changeName">Change Name</button>
</template>
```
