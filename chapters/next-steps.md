## 下一步

### 原質化設計

[Material](https://material.angular.io/) 在這裡筆者指的是 Angular Material，它是 [Material Design](https://material.google.com/) 的實現，是個 UI 元件的函式庫。

Material Design 中文意思是「原質化設計」，不僅擁有極佳的視覺呈現還有極佳的 UX。

```bash
$ npm i @angular2-material/core -S
```

### 後端即服務

[Firebase](https://firebase.google.com/) 是一個 BaaS (Backend as a Service)，主要專為行動應用程式開發者提供整合後端的雲端服務，而在網頁的服務上可以提供網頁開發者開發雲端訊息、認證 (包含第三方的)、即時資料庫 (NoSQL 的)、存儲和主機的項目，除了這些服務之外，還能使用到 Google Cloud Platform (GCE) 的服務。

```bash
$ npm i firebase angularfire -S
```
```bash
$ npm i firebase-tools -g
```

### RxJS

### NgRx

### Immutable

### Redux

### 國際化



### 流量分析

[Angulartics](http://angulartics.github.io/)

傳統的 Google Analytics 不利於 Single-page application (SPA)，不過我們可以使用 Angulartics 來解這個問題，還可以追蹤不同的事物。

### 資料視覺化

[Highcharts](http://www.highcharts.com/)

Highcharts 不僅僅只有一般圖表，還提供股市和地圖的進階的圖表。

### 行動應用

[NativeScript](https://www.nativescript.org/) 可以讓 Web 開發者使用 HTML/CSS/JS 來開發手機的原生應用程式，而且不必先學習任何 JS 的框架，相較於 React Native (也能與 Angular 一起使用，不過布怎麼推薦)，NativeScript 的門檻就大幅降低了，最後 NativeScript 也有提供 Angular 和 TypeScript 的支持。

[Ionic](http://ionicframework.com/) 是建構在 Angular 和 Cordova 之上的。

先來介紹一下 Cordova，Cordova 跟 NativeScript 一樣，能讓 Web 開發者使用 HTML/CSS/JS 來開發手機應用，不同之處，Cordova 是將直接 HTML/CSS/JS 封裝成手機的應用，所以在 iOS 和 Android 上看的話，畫面是長一樣的，這屬於混合型的行動應用，不過 Cordova 的入門門檻又比 NativeScript 更為簡單，因為在開發的時候，就是 Web View。

乍看之下，Ionic 確實是混合型的，不過 Ionic 團隊讓此框架與原生擁有極高的相似度，所以 Ionic 也是原生型的行動應用。

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

### 桌面應用

[Electron](http://electron.atom.io/)

### 結論
