# PostHTML

### 目錄

***

`posthtml-bem`

```html
<div block="card" mods="theme:light">
  <div elem="title" mods="size:big">March Hare</div>
  <div elem="content">March Hare</div>
</div>
```

`postcss-cssnext`

```css
// block
.card {
  ...

  // elem
  &__title {
    ...

    // mods
    &--size {
      ...

      &-big {
        ...
      }

      &-small {
        ...
      }
    }
  }

  // elem
  &__content {
    ...
  }

  // mods
  &--theme {
    ...

    &-dark {
      ...
    }

    &-light {
      ...
    }
  }
}
```

```js
import bem from 'posthtml-bem';

bem({
  elemPrefix: '__',
  modDlmtr: '--',
  modPrefix: '-'
});
```
