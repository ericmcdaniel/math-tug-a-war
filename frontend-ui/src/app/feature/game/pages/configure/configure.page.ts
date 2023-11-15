import { Component } from '@angular/core';

@Component({
  selector: 'app-configure-ui',
  template: `
  <div class="game-container">
    <div class="game-wrapper">
      <h1 class="title">Single Player Game</h1>
      <app-configure></app-configure>
    </div>
  </div>
`,
  styles: [`
  .title {
    font-size: 1.6rem;
    font-weight: 400;
    text-shadow: 1px 1px 3px #00000070;
    text-align: center;
    margin-top: 0;
  }
`]
})
export class ConfigurePage { }
