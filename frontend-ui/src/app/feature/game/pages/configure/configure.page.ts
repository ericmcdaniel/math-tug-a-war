import { Component } from '@angular/core';

@Component({
  selector: 'app-configure-ui',
  template: `
  <div class="card-container">
    <div class="card-wrapper">
      <h1 class="card-display-title">Single Player Game</h1>
      <app-configure></app-configure>
      <div class="return-link-container">
        <a class="return-link" routerLink="../">Go back home</a>   
      </div>
    </div>
  </div>
`
})
export class ConfigurePage { }
