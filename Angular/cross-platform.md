## 跨平台

行動應用程式
* Cordova
* React Native
* NativeScript

如果直接看預設的效能: NativeScript > React Native >> Cordova

由於 Cordova 是將 HTML/CSS/JavaScript 封裝變成原生的應用程式，對其應用程式來說預設的效能並不是很好。

再來看 NativeScript vs React Native，比較明顯的是 NativeScript 比 React Native 更為原生，NativeScript 是直接透過 JavaScript 直接對手機原生的 API 做呼叫。

如果要選用 Cordova 來做行動開發的選擇，可以直接選用 Ionic，Ionic 就是以 Angular 和 Cordova 為底的，而如果是選 React Native，老實講，很少人會選擇它，主要原因都是充滿著 React 的教學，再來看 NativeScript，NativeScript 一開始就是以 Angular 作為底的，之後才有 Vanilla 的方案，所以基本上會是 Ionic 和 NativeScript 的選擇，選擇 Ionic 有一個好處，就是比 NativeScript 多了各種平台，NativeScript 只能做 Android 和 iOS，其實也不算是好處，畢竟 Android 和 iOS 市佔率就接近 9 成了。

桌面應用程式
* Electron
* NW

桌面的開發在 Angular 不外乎會是 Electron，Electron 和 Cordova 很像，都是將 HTML/CSS/JavaScript 封裝變成原生的應用程式，而 NW 是以 HTML/CSS/JavaScript 和 WebGL
