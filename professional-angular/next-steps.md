## 下一步

### 響應式網頁應用程式

[Material](https://material.angular.io/) 在這裡筆者指的是 Angular Material，它是 [Material Design](https://material.google.com/) 的實現，是個 UI 元件的函式庫。

Material Design 中文意思是「原質化設計」，不僅擁有極佳的視覺呈現還有極佳的 UX。

```bash
$ npm i @angular2-material/core -S
```

### 混合型行動應用程式

[Ionic](http://ionicframework.com/) 是建構在 Angular 和 Cordova 之上的，乍看之下，Ionic 確實是混合型的，不過 Ionic 團隊讓此框架與原生擁有極高的相似度

```bash
$ npm i ionic cordova -g
```

```bash
# 建立 Ionic 的空白專案
$ ionic start <PROJECT_NAME> blank --v2
```

```bash
# 執行應用程式
$ ionic serve
```

### 後端雲端服務平台

[Firebase](https://firebase.google.com/) 是一個 BaaS (Backend as a Service)，主要專為行動應用程式開發者提供整合後端的雲端服務，而在網頁的服務上可以提供網頁開發者開發雲端訊息、認證 (包含第三方的)、即時資料庫 (NoSQL 的)、存儲和主機的項目，除了這些服務之外，還能使用到 Google Cloud Platform (GCE) 的服務。

```bash
$ npm i firebase angularfire -S
```
```bash
$ npm i firebase-tools -g
```

### 國際化

### 流量分析

傳統的 Google Analytics 不利於 Single-page application (SPA)，不過我們可以使用 Angulartics 來解這個問題。

### 資料視覺化

### 結論

在行動開發的部分，除了 Ionic之外，也有像是 NativeScript 和 React Native，它們也能透過 Angular 一起應用，筆者會推薦 Ionic 的原因，最主要是因為 Ionic 的開發就是 Web View，不像 NativeScript 和 React Native 屬於原生型的。

除了 Firebase，也能使用 [Meteor](https://github.com/Urigo/angular-meteor) 來做一個全端開發的選項，不過 Meteor 是個框架，沒有像 Firebase 擁有這麼多的服務。

除此之外，也能透過 [Electron](http://electron.atom.io/) 來開發桌面的應用程式。
