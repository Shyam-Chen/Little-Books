## 原質化設計

[material2](https://github.com/angular/material2)

安裝 `@angular/material`

```bsah
$ npm i @angular/material -S
```

導入 Angular 動畫模組

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```

導入 Material 的元件模組

```ts
import { MdButtonModule } from '@angular/material';
```

```ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
