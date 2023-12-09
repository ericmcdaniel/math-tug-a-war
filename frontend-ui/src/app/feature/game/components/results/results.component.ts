import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MathLogicService } from '../../services/math-logic.service';

interface ScoreMessage {
  message: string;
};

/**
 * Render the results to the user after their game expires
 */
@Component({
  selector: 'app-results',
  template: `
  <div class="results-container">
    <p>You scored {{ score }} points!</p>
    <ol>
      <li *ngFor="let question of (mathService.questions | async)">{{ removeLatex(question.equation) }}</li>
    </ol>
  </div>
  `,
  styles: [
    `.results-container {
      margin-bottom: 1rem;
    }`
  ]
})
export class ResultsComponent implements OnInit {

  score: number;

  constructor(public mathService: MathLogicService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.mathService.questions.subscribe(questions => {
      if (questions.length === 0) {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      }
    });
  }

  ngAfterContentInit(): void {
    this.score = Number((this.location.getState() as ScoreMessage).message || 0);
  }

  removeLatex(equation: string): string {
    return equation.replaceAll('\\times', '×')
      .replaceAll('\\div', '÷')
      .replaceAll('\\big(', '(')
      .replaceAll('\\bigg(', '(')
      .replaceAll('\\Big(', '(')
      .replaceAll('\\Bigg(', '(')
      .replaceAll('\\big)', ')')
      .replaceAll('\\bigg)', ')')
      .replaceAll('\\Big)', ')')
      .replaceAll('\\Bigg)', ')');
  }
}