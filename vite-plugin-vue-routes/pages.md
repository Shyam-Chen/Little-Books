# Pages

## Define Page

Define a page by creating files in the `src/routes` directory:

```coffee
src/routes/path/to/+page.vue
```

```vue
<!-- src/routes/path/to/+page.vue -->
<template>
  <h1>My Page</h1>
</template>
```

## Route File Naming Convention

The file naming convention for the pages is as follows:

```coffee
src/routes/hello-world/+page.vue -> /hello-world

src/routes/products/+page.vue -> /products
src/routes/products/[id]/+page.vue -> /products/:id

src/routes/posts/[[title]]/+page.vue -> /posts/:title?

src/routes/blog/[...info]/+page.vue -> /blog/:info*

src/routes/(group)/foo/+page.vue -> /foo
src/routes/(group)/bar/+page.vue -> /bar

src/routes/(home)/+page.vue -> /
```
