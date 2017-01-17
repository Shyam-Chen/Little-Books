# Material

```css
:root {
  --mdc-theme-primary: #9C27B0;  /* Purple - 500 */
  --mdc-theme-accent: #009688;  /* Teal - 500 */
}
```

## Buttons

mdc-button

mdc-button--raised

mdc-button--dense

mdc-button--compact

mdc-button--primary

mdc-button--accent

```html
<button class="mdc-button mdc-button--primary mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>

<button class="mdc-button mdc-button--raised mdc-button--primary mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>

<button class="mdc-button mdc-button--accent mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>

<button class="mdc-button mdc-button--raised mdc-button--accent mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>
```

```css
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--primary::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--primary::after {
  background-color: rgba(74, 20, 140, .2);  /* 900 */
}

.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--primary::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--primary::after {
  background-color: rgba(243, 229, 245, .2);  /* 50 */
}

.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--accent::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--accent::after {
  background-color: rgba(0, 77, 64, .2);  /* 900 */
}

.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--accent::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--accent::after {
  background-color: rgba(224, 242, 241, .2);  /* 50 */
}
```
