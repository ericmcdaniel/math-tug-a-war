import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, filter, fromEvent, interval, map, of, switchMap, take, takeWhile, tap, throttle, timer } from 'rxjs';
import { NetworkService } from '../../../../core/services/network.service';
import { NumbersOnlyFormControl } from '../../directives/numbers-only.directive';
import { ExpressionResponse } from '../../models/expression-response.model';
import { ValidatedResponse } from '../../models/validation-response.model';
import { MathLogicService } from '../../services/math-logic.service';

@Component({
  selector: 'app-math-game',
  templateUrl: './math-game.component.html',
  styleUrls: ['./math-game.component.css']
})
export class MathGameComponent implements AfterViewInit, OnDestroy {

  // hold a reference to the input only to force focus if user clicks away
  @ViewChild('solution', { static: false }) input: ElementRef<HTMLInputElement>;

  public userInput = new NumbersOnlyFormControl('');
  public progressTimer$: Observable<number>;
  public questionTimer$: Subscription;

  constructor(
    public service: MathLogicService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /*
   * if the user clicks away from the input textbox, automatically refocus on to the element
   */
  @HostListener('document:click', ['$event']) handleClickOnPage(): void {
    this.input.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
    this.startTimer();
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keydown')
      .pipe(
        filter(value => value.code.includes('Enter') || value.code === 'Space'),
        throttle(() => interval(250)),
        map((value) => value.key === 'Enter' ? 'Enter' : 'Space'),
      )
      .subscribe(key => this.handleUserInput(key));
  }

  ngOnDestroy(): void {
    if (this.questionTimer$ && !this.questionTimer$.closed) this.questionTimer$.unsubscribe();
  }

  handleUserInput(input: string): void {
    const enteredInput = this.input.nativeElement.value;
    if (this.service.questionsCompleted() >= 10) {
      this.questionTimer$.unsubscribe();
      if (input === 'Space') {
        this.displayResults();
      } else if (input === 'Enter' && !!enteredInput) {
        this.validateExpression(() => this.displayResults());
      }
      return;
    }
    if (input === 'Space') {
      this.startTimer();
      return;
    }
    if (!enteredInput) return;
    this.startTimer();
    this.validateExpression();
  }

  startTimer(): void {
    if (this.questionTimer$ && !this.questionTimer$.closed) this.questionTimer$.unsubscribe();
    this.questionTimer$ = timer(0, 10000)
      .pipe(
        tap(() => this.progressTimer$ = timer(0, 10)),
        takeWhile(() => this.service.questionsCompleted() <= 10),
      )
      .subscribe(
        () => {
          if (this.service.questionsCompleted() >= 10) {
            if (this.userInput.value !== '') {
              this.validateExpression();
            }
            this.questionTimer$.unsubscribe();
            this.displayResults();
            return;
          }
          this.getNewMathExpression();
        });
  }

  displayResults(): void {
    this.router.navigate(['../results'], { relativeTo: this.route, state: { message: "WORDS WORDS WORDS" } });
  }

  userNeedsDirections(): Observable<boolean> {
    if (!this.progressTimer$) return of(false);
    return this.progressTimer$
      .pipe(
        tap((t) => console.log(t)),
        filter(time => (time / 10) > 50),
        switchMap(() => this.service.questions.pipe(map(questions => questions.length === 0))),
      );
  }

  getNewMathExpression(addNewScore = 1): void {
    this.service.generateExpression().pipe(take(1)).subscribe({
      next: (exprResp: ExpressionResponse) => {
        this.service.updateQuestions(exprResp);
        this.userInput.setValue('');
      },
      error: (error: unknown) => {
        this.questionTimer$.unsubscribe();
        const errorResp = NetworkService.buildErrorResponse(error);
        this.router.navigate(['/error'], { state: { message: errorResp } });
      }
    });
  }

  validateExpression(callbackFn?: () => void): void {
    const userRequestToValidate = this.input.nativeElement.value;
    this.service.validateExpression(userRequestToValidate).pipe(take(1)).subscribe({
      next: (validationResp: ValidatedResponse) => {
        if (validationResp.message === 'correct') {
          this.service.setScore();
        }
        this.service.updateResponses(validationResp);
        /* the callback is added here because of the quirky asynchronous nature of JS. The final question would
        get successfully validated but the callee (event host listener) wouldn't see the result in time before
        moving on, resetting the timer 0, generating am 11th question, compounding issues. This solution might
        not be the prettiest, but is much better than using setTimeouts. */
        if (callbackFn) callbackFn();
      },
      error: (error: unknown) => {
        const errorResp = NetworkService.buildErrorResponse(error);
        this.router.navigate(['/error'], { state: { message: errorResp } });
      }
    });
  }
}
