import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../core/services/message.service';
import { MathLogicService } from '../../services/math-logic.service';

@Component({
  selector: 'app-results',
  template: `
  <div class="results-container">
    <p>You got {{ mathService.score | async }} correct!</p>
    <ol>
      <li *ngFor="let question of (mathService.questions | async)">{{ question }}</li>
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

  constructor(public mathService: MathLogicService, public msgService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.mathService.questions.subscribe(questions => {
      if (questions.length === 0) {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      }
    });
  }
}