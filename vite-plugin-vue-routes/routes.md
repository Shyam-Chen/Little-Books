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

It does not support nested routes, so it is not possible to declare `<RouterView />` in `Registry.vue`.

The following configuration can achieve something similar:

```coffee
src/layouts/User.vue

src/routes/users/[id]/(entry)/Registry.vue -> /users/:id
src/routes/users/[id]/profile/Registry.vue -> /users/:id/profile
src/routes/users/[id]/posts/Registry.vue -> /users/:id/posts
```

Using in `Registry.vue`:

```vue
<script lang="ts" setup>
defineRegistry({
  layout: 'default@user',
});
</script>
```

You can refer to the [Layouts usage](./layouts) for examples on how to use the `defineRegistry` macro.
