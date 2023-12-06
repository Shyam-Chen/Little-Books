# Errors

## Define Errors

Define an error page by creating files in the `src/routes` directory:

```coffee
src/routes/+error.vue
```

```vue
<!-- src/routes/+error.vue -->
<template>
  <div>Error</div>
</template>
```

## Route File Naming Convention

The file naming convention for the errors is as follows:

```coffee
src/routes/+error.vue -> /:slug(.*)*
```
