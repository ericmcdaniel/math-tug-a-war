import { Component } from '@angular/core';

@Component({
  selector: 'app-results-ui',
  template: `
  <div>
    <app-results></app-results>
    <a routerLink="../">Play again?</a>
    <a routerLink="../../">Go home</a>
  </div>
  `,
  styles: [`
    div {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class ResultsPage { }
