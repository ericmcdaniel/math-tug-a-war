import { Component } from '@angular/core';

@Component({
  selector: 'app-results-ui',
  template: `
  <app-results></app-results>
  <a routerLink="../">Play again?</a>
  `
})
export class ResultsPage { }
