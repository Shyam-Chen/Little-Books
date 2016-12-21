## 全球化

何謂全球化?
國際化 + 本地化 = 全球化

### 國際化

透過 [ng2-translate](https://github.com/ocombe/ng2-translate) 進行翻譯的動作
再搭配 [Intl](https://www.ecma-international.org/ecma-402/1.0/) 物件進行一些格式的處理

### 本地化

透過 [localize-router](https://github.com/Greentube/localize-router) 進行網址的變動

變動前
`http://localhost:3000/`
`http://localhost:3000/about`

變動後
`http://localhost:3000/en/`
`http://localhost:3000/en/about`

`http://localhost:3000/zh/`
`http://localhost:3000/zh/about`
