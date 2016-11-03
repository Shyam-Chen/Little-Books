## 最佳實踐

### 樹搖優化

Tree-shaking (樹搖優化) 的目的是要將未使用到的程式碼從打捆中移除。現在支援樹搖優化的工具有 Rollup 和 Webpack 2 等等。

如果專案是 Angular CLI 生產的 (Angular CLI 的模組整合工具是 Webpack 2)，可以透過 `ng build --prod` 來執行樹搖優化的動作。

底下範例將帶領讀者使用 Rollup 進行樹搖優化的動作。

首先在全域下安裝 Rollup。
```bash
$ npm i rollup -g
```

建立 `rollup.config.js` 檔案
```bash
$ touch rollup.config.js
```
