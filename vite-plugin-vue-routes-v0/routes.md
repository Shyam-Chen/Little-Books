# Routes

## Define Routes

Define routes by creating files in the `src/routes` directory:

```coffee
src/routes/path/to/Registry.vue
```

## Route File Naming Convention

The file naming convention for the routes is as follows:

```coffee
src/routes/hello-world/Registry.vue -> /hello-world

src/routes/products/Registry.vue -> /products
src/routes/products/[id]/Registry.vue -> /products/:id

src/routes/posts/[[title]]/Registry.vue -> /posts/:title?

src/routes/blog/[...info]/Registry.vue -> /blog/:info*

src/routes/(group)/foo/Registry.vue -> /foo
src/routes/(group)/bar/Registry.vue -> /bar

src/routes/(home)/Registry.vue -> /
```

## Nested Routes

Declare `<RouterView />` in `src/routes/users/[id]/Registry.vue`:

```vue
<template>
  <h2>User {{ $route.params.id }}</h2>
  <RouterView />
</template>
```

```coffee
src/routes/users/[id]/Registry.vue -> /users/:id
src/routes/users/[id]/(home)/Registry.vue -> /users/:id
src/routes/users/[id]/profile/Registry.vue -> /users/:id/profile
src/routes/users/[id]/posts/Registry.vue -> /users/:id/posts
```

```ts
const routes = [
  {
    path: '/users/:id',
    component: () => import('~/routes/users/[id]/Registry.vue'),
    children: [
      {
        path: '',
        component: () => import('~/routes/users/[id]/(home)/Registry.vue'),
      },
      {
        path: 'profile',
        component: () => import('~/routes/users/[id]/profile/Registry.vue'),
      },
      {
        path: 'posts',
        component: () => import('~/routes/users/[id]/posts/Registry.vue'),
      },
    ],
  },
];
```
