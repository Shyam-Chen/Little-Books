# Pug 前後

1.
```pug
doctype html
```
:point_up: 編譯前後 :point_down:
```html
<!DOCTYPE html>
```

2.
```pug
html
```
:point_up: 編譯前後 :point_down:
```html
<html></html>
```

3.
```pug
p
```
:point_up: 編譯前後 :point_down:
```html
<p></p>
```

4.
```pug
div#foo
```
:point_up: 編譯前後 :point_down:
```html
<div id="foo"></div>
```

5.
```pug
#foo
```
:point_up: 編譯前後 :point_down:
```html
<div id="foo"></div>
```

6.
```pug
.foo
```
:point_up: 編譯前後 :point_down:
```html
<div class="foo"></div>
```

7.
```pug
#foo.bar
```
:point_up: 編譯前後 :point_down:
```html
<div id="foo" class="bar"></div>
```

8.
```pug
p foo
```
:point_up: 編譯前後 :point_down:
```html
<p>foo</p>
```

9.
```pug
p
  | foo
  | bar
  | baz
```
:point_up: 編譯前後 :point_down:
```html
<p>
  foo
  bar
  baz
</p>
```

10.
```pug
p.
  foo
  bar
  baz
```
:point_up: 編譯前後 :point_down:
```html
<p>
  foo
  bar
  baz
</p>
```

11.
```pug
// foo
//- bar
//
  baz
//
  foo
  bar
  baz
```
:point_up: 編譯前後 :point_down:
```html
<!-- foo-->
<!--baz
-->
<!--
foo
bar
baz
-->
```

12.
```pug
p \#{foo}
p \!{bar}
```
:point_up: 編譯前後 :point_down:
```html
<p>#{foo}</p>
<p>!{bar}</p>
```

13.
```pug
- let foo = 'foo'
p #{foo}
```
```pug
- const foo = 'foo'
p #{foo}
```
:point_up: 編譯前後 :point_down:
```html
<p>foo</p>
```

15.
```pug
- let foo = '<p>foo</p>'
!{foo}
```
```pug
- const foo = '<p>foo</p>'
!{foo}
```
:point_up: 編譯前後 :point_down:
```html
<p>foo</p>
```

***

```pug

```
:point_up: 編譯前後 :point_down:
```html

```
