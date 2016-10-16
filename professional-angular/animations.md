## 動畫
```ts
import { Component, animate, state, style, transition, trigger } from '@angular/core';

@Component({
  selector: 'name',
  template: `
    <p @openThing="stateExpression">Hello Angular 2</p>
  `,
  styles: [`
  `],
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

淡入淡出
```ts
// fader.component.ts
import { Component, Input, OnChanges, animate, state, style, transition, trigger } from '@angular/core';

@Component({
  selector : 'fader',
  template: `
    <p class="fader" [@visibilityChanged]="visibility">
      Fade In-Out
    </p>
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
      transition('* => *', animate('.5s'))
    ])
  ]
})
export class FaderComponent implements OnChanges {
  public visibility = 'shown';

  @Input() public isVisible: boolean = true;

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }
}
```
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <fader [isVisible]="isVisible"></fader>
    <button (click)="isVisible = !isVisible">Toggle</button>
  `
})
export class AppComponent {
  public isVisible: boolean = true;
}
```
