# Stylus 前後對照

```styl
.foo
  color #F44336
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

```styl
.foo, .bar
  color #F44336
```
```styl
.foo
.bar
  color #F44336
```
:point_up: 編譯前後 :point_down:
```css
.foo,
.bar {
  color: #f44336;
}
```

***

```styl
.foo
  border 1px solid #eee
  > .bar
    color #F44336
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  border: 1px solid #eee;
}
.foo > .bar {
  color: #f44336;
}
```

***

```styl
.foo
  &-a
    color #F44336
  &-b
    color #E91E63
```
:point_up: 編譯前後 :point_down:
```css
.foo-a {
  color: #f44336;
}
.foo-b {
  color: #e91e63;
}
```

***

```styl
.foo
  position fixed
  &-bar
    color #F44336
    ~ .foo-baz
      color #E91E63
```
```styl
.foo
  position fixed
  &-bar
    color #F44336
    & ~ ^[0]-baz
      color #E91E63
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  position: fixed;
}
.foo-bar {
  color: #f44336;
}
.foo-bar ~ .foo-baz {
  color: #e91e63;
}
```

***

```styl
bar = #F44336

.foo
  color bar
```
```styl
$bar = #F44336

.foo
  color $bar
```
```styl
BAR = #F44336

.foo
  color BAR
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

```styl
.foo
  width: 150px
  height: 100px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  width: 150px;
  height: 100px;
  margin-left: -75px;
  margin-top: -50px;
}
```

***

```styl
bar()
  color #F44336

.foo
  bar()
```
```styl
bar(x)
  color x

.foo
  bar(#F44336)
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

```styl
position()
  position arguments
  z-index 1 unless @z-index

.foo
  position absolute
  z-index 2

.bar
  position absolute
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  position: absolute;
  z-index: 2;
}
.bar {
  position: absolute;
  z-index: 1;
}
```

***

```styl
$some-selectors = '.foo, .bar, .baz'

{$some-selectors}
  color: #F44336
```
:point_up: 編譯前後 :point_down:
```css
.foo,
.bar,
.baz {
  color: #f44336;
}
```

***

```styl
// foo
.foo
  color #f44336  // red-500
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

```styl
foo = {
  color: #F44336,
  '&:hover': {
    padding: 0
  }
}

.bar
  {foo}
```
```styl
foo =
  color: #F44336
  &:hover
    padding: 0

.bar
  {foo}
```
:point_up: 編譯前後 :point_down:
```css
.bar {
  color: #f44336;
}
.bar:hover {
  padding: 0;
}
```

***

```styl
if overload-padding = true
  padding(x)
    margin x

.foo
  padding 5px
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  margin: 5px;
}
```

***

```styl
colors = #F44336 #E91E63

.foo
  color colors[0]
```
```styl
colors()
  #F44336 #E91E63

.foo
  color colors[0]
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

```styl
add(x, y)
  unit(x + y, px)

plus = add

.foo
  width plus(1, 2)
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  width: 3px;
}
```

***

```styl
.widget
  padding 10px
  @media screen and (min-width: 600px)
    padding 20px
```
:point_up: 編譯前後 :point_down:
```css
.widget {
  padding: 10px;
}
@media screen and (min-width: 600px) {
  .widget {
    padding: 20px;
  }
}
```

***

```styl
foo()
  .bar
    {block}

+foo()
  color #F44336
```
:point_up: 編譯前後 :point_down:
```css
.bar {
  color: #f44336;
}
```

***

```styl
a()
  display inline

b()
  a()
  > .bar
    color #F44336

.foo
  b()
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  display: inline;
}
.foo > .bar {
  color: #f44336;
}
```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```
