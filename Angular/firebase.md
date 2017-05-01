## 後端雲端服務

[angularfire2](https://github.com/angular/angularfire2)

```bash
$ npm i angularfire2 firebase -S
```

```ts
// src/app/firebase.config.ts
export const FIREBASE_CONFIG = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...'
};
```

```ts
// src/app/app.module.ts
[...]

import { AngularFireModule } from 'angularfire2';

[...]

import { FIREBASE_CONFIG } from './firebase.config'

[...]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  template: `
    <div class="firebase">
      <button (click)="login()" *ngIf="!name">Anonymous Login</button>
      <input type="text" id="message" placeholder="What is it that you do?"
        *ngIf="name" (keyup.enter)="Send($event.target.value)" [(ngModel)]="msgVal">
      <div id="details-container">
          <p *ngFor="let item of items | async">{{ item.message }}</p>
      </div>
    </div>
  `
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  msgVal = '';

  constructor(public af: AngularFire) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 50
      }
    });

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });
  }

  login(): void {
   this.af.auth.login({
     provider: AuthProviders.Anonymous,
     method: AuthMethods.Anonymous
   });
  }

  Send(message: string): void {
    this.items.push({ message });
    this.msgVal = '';
  }
}
```
