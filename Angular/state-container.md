## 狀態容器

Redux 是負責管理狀態的，所有的狀態都會透過 Redux 來操作，就是個狀態容器。

在 Redux 中會有這三個概念：Action、Reducer 和 Store，
而額外的 Effects 是透過 Redux Observable，在 Redux Observable 中稱作 Epic。

### 基本應用

這裡透過 [@ngrx/store](https://github.com/ngrx/store) 來實現 Redux，
以及 [@ngrx/effects](https://github.com/ngrx/effects) 來實現 Redux Observable。

```bash
$ npm i @ngrx/core @ngrx/store @ngrx/effects -S
```
