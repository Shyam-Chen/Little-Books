# Angular

### Table of Contents (目錄)

#### Part 1

* [Getting Started (入門)](./getting-started.md)
  * [Ecosystems (生態系)](./getting-started.md#ecosystems-生態系)
  * [Environment Settings (環境設置)](./getting-started.md#environment-settings-環境設置)
* [Modules (模組)](./modules.md)
  * [Basic operations (基本應用)](./modules.md#基本應用)
  * Core Feature Module (核心功能模組)
  * [Feature Modules (功能模組)](./modules.md#功能模組)
  * [Shared Feature Module (共享功能模組)](./modules.md#共用模組)
* [Components (元件)](./components.md)
  * [Basic operations (基本應用)](./components.md#基本應用)
    * [Templates (模板)](./components.md#模板)
    * [Style (樣式)](./components.md#樣式)
    * [Module identification (模組識別)](./components.md#模組識別)
  * [檢視層](./components.md#檢視層)
    * [渲染模板](./components.md#渲染模板)
    * [雙向綁定](./components.md#雙向綁定)
    * [事件綁定](./components.md#事件綁定)
    * [屬性綁定](./components.md#屬性綁定)
    * [區域變數](./components.md#區域變數)
  * [內容投射](./components.md#內容投射)
    * [單一投射](./components.md#單一投射)
    * [選擇投射](./components.md#選擇投射)
  * [相互溝通](./components.md#相互溝通)
    * [@Input() 與 @Output()](./components.md#input-與-output)
    * [@ContentChild() 與 @ContentChildren()](./components.md#contentchild-與-contentchildren)
    * [@ViewChild() 與 @ViewChildren()](./components.md#viewchild-與-viewchildren)
  * 繼承
  * [隔離樣式](./components.md#隔離樣式)
  * [變化檢測](./components.md#變化檢測)
    * NgZone
    * [OnPush](./components.md#onpush)
    * [Default](./components.md#default)
    * [Immutable](./components.md#immutable)
    * ChangeDetectorRef
  * [生命週期掛鉤](./components.md#生命週期掛鉤)
* [Forms (表單)](./forms.md)
  * [Basic operations (基本應用)](./forms.md#基本應用)
  * [Template-driven (模板驅動)](./forms.md#模板驅動)
  * [Reactive forms (反應式表單)](./forms.md#模型驅動)
* [Routing (路由)](./routing.md)
  * [Basic operations (基本應用)](./routing.md#基本應用)
  * [巢狀路由](./routing.md#巢狀路由)
  * [URL 參數](./routing.md#url-參數)
  * [非同步路由](./routing.md#非同步路由)
  * 路由事件
  * 路由守衛
  * RouteReuseStrategy
* [Directives (指令)](./directives.md)
  * [內建屬性型指令](./directives.md#內建屬性型指令)
    * [ngStyle](./directives.md#ng-style)
    * [ngClass](./directives.md#ng-class)
  * [內建結構型指令](./directives.md#內建結構型指令)
    * [ngIf](./directives.md#ng-if)
    * ng-container
    * [ngSwitch](./directives.md#ng-switch)
    * [ngFor](./directives.md#ng-for)
    * [ngPlural](./directives.md#ng-plural)
    * [ngTemplateOutlet](./directives.md#ng-template-outlet)
    * ngComponentOutlet
    * View Containers
    * Embedded Views
  * [自訂指令](./directives.md#自訂指令)
    * [實體變數 (ElementRef & Renderer)](./directives.md#實體變數)
    * [屬性型指令 (@Attribute(), HostBinding(), & @HostListener())](./directives.md#屬性型指令)
    * [結構型指令](./directives.md#結構型指令)
* [Services (服務)](./services.md)
  * [可注入的服務](./services.md#可注入的服務)
  * [服務的相依性](./services.md#服務的相依性)
    * [useClass](./services.md#useclass)
    * [useExisting](./services.md#useexisting)
    * [useValue](./services.md#usevalue)
    * [multi](./services.md#multi)
    * [useFactory](./services.md#usefactory)
    * [deps](./services.md#deps)
  * [層疊注入器](./services.md#層疊注入器)
  * [控制相依性](./services.md#控制相依性)
    * [@Optional() 與 @Host()](./services.md#optional-與-host)
    * [@Self() 與 @SkipSelf()](./services.md#self-與-skipself)
  * [內建服務](./services.md#內建服務)
    * [Title](./services.md#title)
    * [Meta](./services.md#meta)
* [Observables (可觀察)](./observables.md)
* [HTTP (伺服器通訊)](./http.md)
  * [Get](./http.md#get)
  * [Post](./http.md#post)
  * [Put](./http.md#put)
  * [Delete](./http.md#delete)
  * [JSONP](./http.md#jsonp)
  * [攔截器](./http.md#攔截器)
  * 進度事件
* [Pipes (管道)](./pipes.md)
  * [Built-in Pipes (內建管道)](./pipes.md#built-in-pipes-內建管道)
    * [Uppercase (大寫)](./pipes.md#uppercase-大寫)
    * [Lowercase (小寫)](./pipes.md#lowercase-小寫)
    * [Titlecase (首字母大寫)](./pipes.md#titlecase-首字母大寫)
    * [Date (日期)](./pipes.md#date-日期)
    * [Async (非同步)](./pipes.md#async-非同步)
    * [Number (數值)](./pipes.md#number-數值)
    * [Percent (百分比)](./pipes.md#percent-百分比)
    * [Currency (貨幣)](./pipes.md#currency-貨幣)
    * [JSON](./pipes.md#json)
    * [KeyValue (鍵值組)](./pipes.md#keyvalue-鍵值組)
    * [Slice (裁切)](./pipes.md#slice-裁切)
    * [I18nSelect (國際化選擇值)](./pipes.md#i18nselect-國際化選擇值)
    * [I18nPlural (國際化複數值)](./pipes.md#i18nplural-國際化複數值)
  * [Custom Pipes (自訂管道)](./pipes.md#custom-pipes-自訂管道)
    * [Pipe Interface (管道介面)](./pipes.md#pipe-interface-管道介面)
    * [Hands-on Construction (動手打造)](./pipes.md#hands-on-construction-動手打造)
* [Animations (動畫)](./animations.md)
  * [Basic operations (基本應用)](./animations.md#基本應用)
  * 觸發動畫
  * [動畫狀態](./animations.md#動畫狀態)
  * [動畫漸變](./animations.md#動畫漸變)
  * [動畫時間](./animations.md#動畫時間)
  * 動畫關鍵影格
  * 平行動畫
  * 動畫回呼

#### Part 2

* [GraphQL (資料查詢語言)](./graphql.md)
  * Query (查詢)
  * Mutation (變動)
* [WebSockets (雙向通訊)](./websockets.md)
  * Socket.IO
  * GraphQL Subscriptions
* [Internationalization (國際化)](./internationalization.md)
* [Data visualization (資料視覺化)](./data-visualization.md)
* [Analysis (追蹤分析)](./analysis.md)
  * 深度追蹤
  * 離線追蹤
* [State container (狀態容器)](./state-container.md)
  * NGXS
  * NgRx
  * Redux
  * MobX
* [Material design (原質化設計)](./material.md)
  * Components
  * CDK
* [Firebase app (後端雲端服務)](./firebase.md)
  * Authentication (憑證)
  * Database (資料庫)
  * Storage
* [Cross-platform app (跨平台應用)](./cross-platform.md)
  * Mobile Apps (行動應用)
  * Desktop Apps (桌面應用)
* [Testing (測試)](./testing.md)
  * [測試原則](./testing.md#測試原則)
  * [靜態分析](./testing.md#靜態分析)
  * [測試入門](./testing.md#測試入門)
  * [單元測試](./testing.md#單元測試)
    * 測試元件
    * 測試指令
    * 測試服務
    * [測試管道](./testing.md#測試管道)
    * 測試動畫
  * [端對端測試](./testing.md#端對端測試)
    * 測試使用者介面
    * 測試表單
    * 測試路由
* [Security (安全)](./security.md)
  * Sanitizer (信任安全值)
  * [XSS (跨站指令碼)](./security.md#跨站指令碼)
  * XSRF (跨站請求偽造)
  * XSSI (跨站指令碼包含漏洞)
  * JWT (跨域驗證)
* 伺服端渲染
* 離線存儲
* [Tools (工具)](./tools.md)
  * [除錯和剖析](./tools.md#除錯和剖析)
  * 效能分析 (Lighthouse)
