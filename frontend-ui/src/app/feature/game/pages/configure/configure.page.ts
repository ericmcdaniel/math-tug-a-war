import { Component } from '@angular/core';

@Component({
  selector: 'app-configure-ui',
  template: `
  <div class="game-container">
    <div class="game-wrapper">
      <h1>Single Player Game Mode</h1>
      <app-configure></app-configure>
    </div>
  </div>
`,
})
export class ConfigurePage {

}
