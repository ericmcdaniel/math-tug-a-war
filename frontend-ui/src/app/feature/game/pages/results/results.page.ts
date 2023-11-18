import { Component } from '@angular/core';

@Component({
  selector: 'app-results-ui',
  template: `
  <div class="card-container">
    <div class="card-wrapper">
      <h1 class="card-display-title">Results</h1>
      <app-results></app-results>
      <div class="return-link-container">
        <a class="return-link" routerLink="../">Play again?</a>
        <a class="return-link" routerLink="../../">Go back home</a>
      </div>
    </div>
  </div>
  `,
})
export class ResultsPage { }
