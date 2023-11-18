import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, filter, fromEvent, interval, map, of, switchMap, take, takeWhile, tap, throttle, timer } from 'rxjs';
import { MessageService } from '../../../../core/services/message.service';
import { NumbersOnlyFormControl } from '../../directives/numbers-only.directive';
import { ExpressionResponse } from '../../models/expression-response.model';
import { ValidatedRequest } from '../../models/validation-request.model';
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
  public expression$ = new BehaviorSubject<ExpressionResponse | undefined>(undefined);
  public questionsCompleted$ = new BehaviorSubject<number>(0);
  public progressTimer$: Observable<number>;
  public questionTimer$: Subscription;

  constructor(
    public mathService: MathLogicService,
    private messageService: MessageService,
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
    if (this.questionsCompleted$.getValue() >= 10) {
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
        takeWhile(() => this.questionsCompleted$.getValue() <= 10),
      )
      .subscribe(
        () => {
          if (this.questionsCompleted$.getValue() >= 10) {
            if (this.input.nativeElement.value !== '') {
              this.validateExpression();
            }
            this.questionsCompleted$.next(0);
            this.questionTimer$.unsubscribe();
            this.displayResults();
            return;
          }
          this.getNewMathExpression();
        });
  }

  displayResults(): void {
    const subscription = this.mathService.score.subscribe(value => this.messageService.score$.next(value));
    this.router.navigate(['../results'], { relativeTo: this.route });
    subscription.unsubscribe();
  }

  userNeedsDirections(): Observable<boolean> {
    if (!this.progressTimer$) return of(false);
    return this.progressTimer$
      .pipe(
        tap((t) => console.log(t)),
        filter(time => (time / 10) > 50),
        switchMap(() => this.mathService.questions.pipe(map(questions => questions.length === 0))),
      );
  }

  handleError(error: unknown) {
    this.questionTimer$.unsubscribe();
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.messageService.errorMsg$.next(error.message + '. This is most likely because the API server is not running.');
      } else {
        this.messageService.errorMsg$.next(`${error.status} ${error.error.error}. ${error.error.message}`);
      }
    } else {
      this.messageService.errorMsg$.next(JSON.stringify(error));
    }
    this.router.navigate(['../../error'], { relativeTo: this.route });
  }

  getNewMathExpression(addNewScore = 1): void {
    this.mathService.generateExpression().pipe(take(1)).subscribe({
      next: (exprResp: ExpressionResponse) => {
        this.questionsCompleted$.next(this.questionsCompleted$.getValue() + addNewScore);
        this.expression$.next(exprResp);
        this.input.nativeElement.value = '';
      },
      error: (error: unknown) => {
        this.handleError(error);
      }
    });
  }

  validateExpression(callbackFn?: () => void): void {
    const userRequestToValidate: ValidatedRequest = { id: this.expression$.getValue()?.id || '', answer: this.input.nativeElement.value };
    this.mathService.validateExpression(userRequestToValidate).pipe(take(1)).subscribe({
      next: (validationResp: ValidatedResponse) => {
        if (validationResp.message === 'Correct answer') {
          this.mathService.updateScore();
        }
        /* the callback is added here because of the quirky asynchronous nature of JS. The final question would
        get successfully validated but the callee (event host listener) wouldn't see the result in time before
        moving on, resetting the timer 0, generating am 11th question, compounding issues. This solution might
        not be the prettiest, but is much better than using setTimeouts. */
        if (callbackFn) callbackFn();
      },
      error: (error: unknown) => {
        this.handleError(error);
      }
    });
  }
}
