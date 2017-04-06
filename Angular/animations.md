## 動畫

### 基本應用

底下是動畫主要基本使用構造。

```ts
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'name',
  template: `
    <p @openThing="stateExpression">Hello Angular</p>
  `,
  styles: [``],
  animations: [
    trigger('openThing', [
      // ...
    ])
  ]
})
export class NameComponent {
  public stateExpression: string;
  // ...
}
```

實作一個簡單的淡入淡出。

```ts
// fader.component.ts
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector : 'app-fader',
  template: `
    <p class="fader" [@visibilityChanged]="visibility">淡入淡出</p>
  `,
  styles: [`
    .fader {
      width: 7rem;
      padding: .4rem 0;
      text-align: center;
      background: #F44336;
      color: #FFFFFF;
    }
  `]
  ,
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.5s'))  // 表示狀態 shown 到 hidden 或 hidden 到 shown 都是五百毫秒
    ])
  ]
})
export class FaderComponent implements OnChanges {
  public visibility: string = 'shown';

  @Input() public isVisible: boolean = true;

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }
}
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <fader [isVisible]="isVisible"></fader>
    <button (click)="isVisible = !isVisible">Toggle</button>
  `
})
export class AppComponent {
  public isVisible: boolean = true;
}
```
