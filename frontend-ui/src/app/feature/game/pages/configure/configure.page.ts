import { Component } from '@angular/core';

@Component({
  selector: 'app-configure-ui',
  template: `
  <div class="game-container">
    <div class="game-wrapper">
      <h1 class="title">Single Player Game</h1>
      <app-configure></app-configure>
      <a class="return-link" routerLink="../">Go back home</a>
    </div>
  </div>
`,
  styles: [`.title {
    font-size: 2rem;
    font-weight: 400;
    text-shadow: 1px 1px 3px #00000070;
    text-align: center;
    margin: 0;
  }
`, `.return-link {
  font-size: 0.9rem;
  margin-top: 2rem;
  text-align: center;
  display: block;
}`]
})
export class ConfigurePage { }
