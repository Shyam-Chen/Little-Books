# Pug 項目實踐

### 目錄

***

```pug
doctype html
```
:point_up: 編譯前後 :point_down:
```html
<!DOCTYPE html>
```

***

```pug
div
```
:point_up: 編譯前後 :point_down:
```html
<div></div>
```

***

```pug
div
  div
```
:point_up: 編譯前後 :point_down:
```html
<div>
  <div></div>
</div>
```

***

```pug
div#foo
```
:point_up: 編譯前後 :point_down:
```html
<div id="foo"></div>
```

***

```pug
#foo
```
:point_up: 編譯前後 :point_down:
```html
<div id="foo"></div>
```

***

```pug
.foo
```
:point_up: 編譯前後 :point_down:
```html
<div class="foo"></div>
```

***

```pug
#foo.bar
```
:point_up: 編譯前後 :point_down:
```html
<div id="foo" class="bar"></div>
```

***

```pug
p foo
```
:point_up: 編譯前後 :point_down:
```html
<p>foo</p>
```

***

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

***

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

***

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

***

```pug
p \${foo}
p \!{bar}
```
:point_up: 編譯前後 :point_down:
```html
<p>${foo}</p>
<p>!{bar}</p>
```

***

```pug
- let foo = 'foo'
p ${foo}
```
```pug
- const foo = 'foo'
p ${foo}
```
:point_up: 編譯前後 :point_down:
```html
<p>foo</p>
```

***

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
<!--[if IE]>
p Get Chrome
<![endif]-->
```
:point_up: 編譯前後 :point_down:
```html
<!--[if IE]>
<p>Get Chrome</p><![endif]-->
```

***

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

***

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

***

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

***

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
- let x = true
p(class=x ? 'foo' : 'bar')
```
:point_up: 編譯前後 :point_down:
```html
<p class="foo"></p>
```

***

```pug
p(style={ color: 'red', 'background-color': 'green' })
```
:point_up: 編譯前後 :point_down:
```html
<p style="color:red;background-color:green"></p>
```

***

```pug
p(data-foo='foo')&attributes({ 'data-bar': 'bar' })
```
:point_up: 編譯前後 :point_down:
```html
<p data-foo="foo" data-bar="bar"></p>
```

***

```pug
- for (let x = 0; x < 3; x++)
  p ${x + 1}. item
```
:point_up: 編譯前後 :point_down:
```html
<p>1. item</p>
<p>2. item</p>
<p>3. item</p>
```

***

```pug
- const list = ['foo', 'bar', 'baz']
each item in list
  p= item
```
:point_up: 編譯前後 :point_down:
```html
<p>foo</p>
<p>bar</p>
<p>baz</p>
```

***

```pug
.foo= '<p>foo</p>'
```
:point_up: 編譯前後 :point_down:
```html
<div class="foo">&lt;p&gt;foo&lt;/p&gt;</div>
```

***

```pug
.foo!= '<p>foo</p>'
```
:point_up: 編譯前後 :point_down:
```html
<div class="foo"><p>foo</p></div>
```

***

```pug
//- layout.pug
doctype html
html
  head
    block title
      title 預設標題
  body
    block content
```
```pug
//- index.pug
extends ./layout.pug

block title
  title 首頁

block content
  h1 首頁
```
:point_up: 編譯前後 :point_down:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>首頁</title>
  </head>
  <body>
    <h1>首頁</h1>
  </body>
</html>
```

***

```pug

```
:point_up: 編譯前後 :point_down:
```html

```
