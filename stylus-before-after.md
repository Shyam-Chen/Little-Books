# Stylus 前後

1.
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

2.
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

3.
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

4.
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

5.
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

6.
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

7.
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

```
:point_up: 編譯前後 :point_down:
```css

```
