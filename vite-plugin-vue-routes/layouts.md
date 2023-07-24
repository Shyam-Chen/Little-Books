# Layouts

## Define a Layout

Define a layout by creating files in the `src/routes` directory:

```coffee
src/routes/path/to/+layout.vue
```

## Root Layout

To enable the root layout, add a `src/routes/+layout.vue` file.

```vue
<!-- src/routes/+layout.vue -->
<template>
  <div class="p-4">
    <RouterView />
  </div>
</template>
```

## Nesting Layouts

Declare `<RouterView />` in `src/routes/users/[id]/+layout.vue`:

```vue
<template>
  <h2>User {{ $route.params.id }}</h2>
  <RouterView />
</template>
```

```coffee
src/routes/users/[id]/+layout.vue
src/routes/users/[id]/(home)/+page.vue -> /users/:id
src/routes/users/[id]/profile/+page.vue -> /users/:id/profile
src/routes/users/[id]/posts/+page.vue -> /users/:id/posts
```

## Multiple Root Layouts

```coffee
src/routes/+layout.vue

src/routes/(marketing)/+layout.vue
src/routes/(shop)/+layout.vue
```

In the example above, both `(marketing)` and `(shop)` have their own root layout.
