## 路由

### 基本應用

```ts
// src/app/main.ts
import { bootstrap } from '@angular/platform-browser-dynamic';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  { provide: APP_BASE_HREF, useValue: '' },
  { provide: LocationStrategy, useClass: HashLocationStrategy }
]);
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  template: `
    <nav>
      <a [routerLink]="['/home']">Home</a>
      <a [routerLink]="['/about']">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent { }
```
```ts
// src/app/app.routes.ts
import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```
```ts
// src/app/home.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <p>Home Page</p>
  `
})
export class HomeComponent { }
```
```ts
//  src/app/about.component.ts
import { Component } from '@angular/core';

@Component({
  template: `
    <p>About Page</p>
  `
})
export class AboutComponent { }
```

### 巢狀路由
```ts
[...]

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/:id', component: LinkComponent, children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'essential', component: EssentialComponent }
  ]}
];

[...]
```

### URL 參數
```ts
// src/app/app.routes.ts
import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { LinkComponent } from './link.component';

const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/:id', component: LinkComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
```
```ts
//  src/app/about.component.ts
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  template: `
    <p>About Page</p>
    <ul *ngFor="let id of links">
      <li>
        <a [routerLink]="[id]">Link {{ id }}</a>
      </li>
    </ul>
  `,
  directives: [ROUTER_DIRECTIVES]
})
export class AboutComponent {
  public links: number[] = [1, 2, 3];
}
```
```ts
//  src/app/link.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  template: `
    <p>About Page - Link {{ id | async }}</p>
  `
})
export class LinkComponent {
  public id: Observable<string>;

  constructor(activatedRoute: ActivatedRoute) {
    this.id = activatedRoute
      .params
      .map(activatedRoute => activatedRoute.id);
  }
}
```

### 前後關係

### 非同步路由
