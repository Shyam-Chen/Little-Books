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

16.
```pug
<!--[if IE]>
p Get Chrome
<![endif]-->
```
:point_up: 編譯前後 :point_down:
```html
<!--[if IE]>
<p>Get Chrome</p><![endif]-->
```

17.
```pug
ul
  li
    a(href='#') foo
  li
    a(href='#') bar
  li
    a(href='#') baz
```
```pug
ul
  li: a(href='#') foo
  li: a(href='#') bar
  li: a(href='#') baz
```
:point_up: 編譯前後 :point_down:
```html
<ul>
  <li><a href="#">foo</a></li>
  <li><a href="#">bar</a></li>
  <li><a href="#">baz</a></li>
</ul>
```

18.
```pug
- let x = 0
case x
  when 0
    p foo
  when 1
    p bar
  default
    p baz
```
:point_up: 編譯前後 :point_down:
```html
<p>foo</p>
```

19.
```pug
a(href='/foo', title='foo') Foo
```
```pug
a(href='/foo' title='foo') Foo
```
```pug
a(
  href='/foo'
  title='foo'
) Foo
```
:point_up: 編譯前後 :point_down:
```html
<a href="/foo" title="foo">Foo</a>
```

20.
```pug
p.
  <div class="foo">
  .bar
```
:point_up: 編譯前後 :point_down:
```html
<p>
  <div class="foo">
  .bar
</p>
```

***

```pug

```
:point_up: 編譯前後 :point_down:
```html

```
