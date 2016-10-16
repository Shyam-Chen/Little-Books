## 表單

### 基本表單

#### 啟動表單
```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // 導入 ReactiveFormsModule

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule  // 將 ReactiveFormsModule 註冊到 AppModule 裡
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <form>
      <!-- ... -->
    </form>
  `
})
export class AppComponent { }
```

#### 表單方法
```ts
// 指令
ngControl
ngFormControl
ngModel
ngFormModel
ngControlGroup

// 服務
Control()
ControlGroup()
ControlArray()
FormBuilder
Validators
```

### 模板驅動

#### 基本模板驅動
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <form #atForm="ngForm">
      <div ngControlGroup="user">
        <div>
          <label for="name1">中文名:</label>
          <input type="text" id="name1"
            ngControl="name1" [(ngModel)]="account.user.name1" #name1="ngForm"
          >
        </div>
        <br>
        <div>
          <label for="name2">英文名:</label>
          <input type="text" id="name2"
            ngControl="name2" [(ngModel)]="account.user.name2" #name2="ngForm"
          >
        </div>
      </div>
    </form>
    <hr>
    <pre>{{ atForm.value | json }}</pre>
    <p>{{ name1.value }} - {{ name2.value }}</p>
  `
})
export class AppComponent {
  public account = {
    user: {
      name1: '陳彥澄',
      name2: 'Chen Yen-Cheng'
    }     
  }
}
```

#### 驗證綁定
```html
<!-- 就是使用 HTML5 的表單屬性 -->
<input ...>

<!-- 必填欄位 -->
<input ... required>

<!-- 匹配欄位 -->
<input ... pattern="...">
```

### 模型驅動

#### 基本模型驅動

(1)
```ts
import { Component } from '@angular/core';
import { ControlGroup, Control } from '@angular/common';

@Component({
  selector: 'app',
  template: `
    <form [ngFormModel]="form">
      <div ngControlGroup="user">
        <label for="name">姓名:</label>
        <input type="text" id="name"
          ngControl="name" #name="ngForm"
        >
      </div>
    </form>
    <hr>
    <p>{{ name.value }}</p>
  `
})
export class AppComponent {
  public form = new ControlGroup({
    user: new ControlGroup({
      name: new Control('陳彥澄')
    })
  });
}
```

(2)
```ts
import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app',
  template: `
    <form [formGroup]="atForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">姓名:</label>
        <input type="text" id="name" [formControl]="name">
      </div>
      <div>
        <label for="email">郵箱:</label>
        <input type="email" id="email" [formControl]="email">
      </div>
      <button type="submit">送出</button>
    </form>
    <p>{{ message1 }} {{ message2 }}</p>
  `,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class AppComponent {
  public atForm: FormGroup;
  public name: FormControl;
  public email: FormControl;

  constructor(formBuilder: FormBuilder) {
    this.name = new FormControl('陳彥澄');
    this.email = new FormControl('chenyencheng@gmail.com');

    this.atForm = formBuilder.group({
      name: this.name,
      email: this.email
    });
  }

  public onSubmit(): void {
    this.message1 = this.atForm.value.name;
    this.message2 = this.atForm.value.email;
  }
}
```

#### 驗證表單
```ts
import { Component } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app',
  template: `
    <form [formGroup]="atForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">姓名:</label>
        <input type="text" id="name" [formControl]="name">
        <span class="has-error" [hidden]="name.valid || name.untouched">
          <span [hidden]="!name.hasError('required')">必填欄位</span>
          <span [hidden]="!name.hasError('minlength')">最小輸入 2 個字</span>
          <span [hidden]="!name.hasError('maxlength')">最多輸入 4 個字</span>
        </span>
      </div>
      <div>
        <label for="email">郵箱:</label>
        <input type="email" id="email" [formControl]="email">
        <span class="has-error" [hidden]="email.valid || email.untouched">
          <span [hidden]="!email.hasError('required')">必填欄位</span>
          <span [hidden]="!email.hasError('pattern')">格式不正確</span>
        </span>
      </div>
      <button type="submit" [disabled]="!atForm.valid">送出</button>
    </form>
    <p>{{ message1 }} {{ message2 }}</p>
  `,
  styles: [`
    .has-error {
      color: #F44336;
    }
  `],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class AppComponent {
  public atForm: FormGroup;
  public name: FormControl;
  public email: FormControl;

  constructor(formBuilder: FormBuilder) {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9_]+@[a-zA-Z0-9._]+')
    ]);

    this.atForm = formBuilder.group({
      name: this.name,
      email: this.email
    });
  }

  public onSubmit(): void {
    this.message1 = this.atForm.value.name;
    this.message2 = this.atForm.value.email;
  }
}
```

#### 自訂驗證
```ts
[...]

@Component({
  [...]
})
export class AppComponent {
  [...]

  constructor(formBuilder: FormBuilder) {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(4)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9_]+@[a-zA-Z0-9._]+'),
      this.customValidation
    ]);

    this.atForm = formBuilder.group({
      name: this.name,
      email: this.email
    });
  }
  
  public customValidation(): any {
    // ...
    return // ...
  }

  [...]
}
```
