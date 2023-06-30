# Configuration

Have a glimpse of all the existing configuration options with their corresponding default values:

## routesDir

- Type: `string`
- Default: `'src/routes'`

The directory which will be processed to auto-generate your application routes.

```ts
vueRoutes({
  routesDir: 'src/routes', // e.g., 'src/pages'.
});
```

## layoutsDir

- Type: `string`
- Default: `'src/layouts'`

The layouts directory, each file of which will be auto-registered as a layout.

```ts
vueRoutes({
  layoutsDir: 'src/layouts',
});
```

## middlewareDir

- Type: `string`
- Default: `'src/middleware'`

The middleware directory, each file of which will be auto-registered as a middleware.

```ts
vueRoutes({
  middlewareDir: 'src/middleware',
});
```

## routeFile

- Type: `string`
- Default: `'Registry.vue'`

A special `Registry.vue` file is used to make route segments publicly accessible.

```ts
vueRoutes({
  routeFile: 'Registry.vue', // e.g., 'page.vue'.
});
```

## routeMacro

- Type: `string`
- Default: `'defineRegistry'`

A special `defineRegistry` macro is used to make route segments publicly accessible.

```ts
vueRoutes({
  routeMacro: 'defineRegistry', // e.g., 'definePage'.
});
```
