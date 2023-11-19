import { Location } from '@angular/common';
import { AfterContentInit, Component } from '@angular/core';

interface ErrorMessage {
  message: string;
};

@Component({
  selector: 'app-error',
  template: `
  <div class="card-container">
    <div class="card-wrapper">
      <h1 class="card-display-title">Yikes!</h1>
      <h2 class="card-display-subtitle">There unfortunately was a fatal error</h2>
      <p>{{ this.errorMessage }}</p>
    </div>
  </div>`
})
export class ErrorPage implements AfterContentInit {

  errorMessage: string;
  constructor(private location: Location) { }

  ngAfterContentInit(): void {
    this.errorMessage = (this.location.getState() as ErrorMessage).message || '';
  }
}
