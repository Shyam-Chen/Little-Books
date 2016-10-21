## 下一步

### 原質化設計

[Material](https://material.angular.io/) 在這裡筆者指的是 Angular Material，它是 [Material Design](https://material.google.com/) 的實現，是個 UI 元件的函式庫。

Material Design 中文意思是「原質化設計」，不僅擁有極佳的視覺呈現還有極佳的 UX。

```bash
$ npm i @angular2-material/core -S
```

### 後端即服務

[Firebase](https://firebase.google.com/) 是一個 BaaS (Backend as a Service)，主要專為行動應用程式開發者提供整合後端的雲端服務，而在網頁的服務上可以提供網頁開發者開發認證、即時資料庫、存儲和主機的項目，除了這些服務之外，還能使用到 Google Cloud Platform (GCE) 的服務。

除了 Firebase，也能使用 [Meteor](https://github.com/Urigo/angular-meteor) 來做一個全端開發的選項，不過 Meteor 是個框架，沒有像 Firebase 擁有這麼多的服務。

```bash
$ npm i firebase angularfire -S
```
```bash
$ npm i firebase-tools -g
```

### 跨平台應用程式

[Ionic](http://ionicframework.com/)

除了 Ionic，也有 NativeScript 和 React Native 能與 Angular 一起開發，筆者會選擇 Ionic 的原因，最主要是因為 Ionic 的開發就是 Web View。

除此之外，也能透過 [Electron](http://electron.atom.io/) 來開發桌面的應用程式。
