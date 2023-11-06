import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../core/services/message.service';

@Component({
  selector: 'app-results',
  template: `
  <div class="results-container">
    <p>You got {{ msgService.results$.getValue()?.correct }} correct!</p>
    <ol>
      <li *ngFor="let question of msgService.results$.getValue()?.questions">{{ question }}</li>
    </ol>
    <small>Future work: rendering which questions were correct/incorrect.</small>
  </div>
  `,
  styles: [
    `.results-container {
      margin-bottom: 1rem;
    }`
  ]
})
export class ResultsComponent implements OnInit {

  constructor(public msgService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.msgService.results$.getValue()) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
}