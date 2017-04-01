# PostHTML

### 目錄
* BEM
* Include

***

## BEM

`posthtml-bem`

```html
<div block="card" mods="theme:light">
  <div elem="title" mods="size:big">March Hare</div>
  <div elem="content">March Hare</div>
</div>
```

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
  modPrefix: '--',
  modDlmtr: '-'
});
```

## Include

`posthtml-include`

```html
<!-- foo.html -->
<p>Foo</p>
<include src="bar.html"></include>
```

```html
<!-- bar.html -->
<p>Bar</p>
```

***

`posthtml-mixins`

```html
<!-- 宣告 -->
<mixin name="ex">
  <div class="thing">Thing</div>
</mixin>

<!-- 使用 -->
<div>
  <mixin name="ex"></mixin>
</div>

<div>
  <mixin name="ex"></mixin>
</div>
```

***

`posthtml-extend`

***

`posthtml-expressions`

***

`posthtml-inline-assets`

***

`posthtml-retext`
