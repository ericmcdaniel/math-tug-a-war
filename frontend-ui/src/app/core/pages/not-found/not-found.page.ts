import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <div class="card-container">
    <div class="card-wrapper">
      <h1 class="card-display-title">Feeling lost?</h1>
      <h2 class="card-display-subtitle">The page you are looking for could not be found</h2>
      <div class="return-link-container">
        <a class="return-link" routerLink="/">Go back home</a>   
      </div>
    </div>
  </div>
  `
})
export class NotFoundPage { }
