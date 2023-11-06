import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, take, takeWhile, timer } from 'rxjs';
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
export class MathGameComponent implements AfterViewInit {

  @ViewChild('solution', { static: false }) input: ElementRef<HTMLInputElement>;
  public userInput = new NumbersOnlyFormControl('');
  public expression$ = new BehaviorSubject<ExpressionResponse | undefined>(undefined);
  public questionsCompleted$ = new BehaviorSubject<number>(0);
  public timer$: Subscription;

  constructor(
    public mathService: MathLogicService,
    private _messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @HostListener('document:keypress', ['$event'])
  handleUserInput(event: KeyboardEvent): void {
    const enteredInput = this.input.nativeElement.value;
    if (this.questionsCompleted$.getValue() >= 10) {
      this.timer$.unsubscribe();
      if (event.code === 'Space') {
        this.displayResults();
      } else if (event.key === 'Enter' && !!enteredInput) {
        this.validateExpression(() => this.displayResults());
      }
      return;
    }
    this.input.nativeElement.focus();
    if (event.code === 'Space') {
      this.startTimer();
      return;
    }
    if (event.key !== 'Enter') return;
    if (!enteredInput) return;
    this.startTimer();
    this.validateExpression();
  }

  /*
   * if the user clicks away from the input textbox, automatically refocus on to the element
   */
  @HostListener('document:click', ['$event'])
  handleClickOnPage(): void {
    this.input.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
    this.startTimer();
  }

  startTimer(): void {
    if (this.timer$ && !this.timer$.closed) this.timer$.unsubscribe();
    this.timer$ = timer(0, 10000).pipe(takeWhile(() => this.questionsCompleted$.getValue() <= 10)).subscribe(
      (time) => { // placeholder for getting the exact millisecond for progress bar
        // if (time % 25 === 0) {
        if (this.questionsCompleted$.getValue() >= 10) {
          if (this.input.nativeElement.value !== '') {
            this.validateExpression();
          }
          this.questionsCompleted$.next(0);
          this.timer$.unsubscribe();
          this.displayResults();
          return;
        } else {
          this.getNewMathExpression();
        }
        // }
      });
  }

  displayResults(): void {
    const subscription = this.mathService.gameResults().subscribe(value => this._messageService.results$.next(value));
    this.router.navigate(['../results'], { relativeTo: this.route });
    subscription.unsubscribe();
  }

  handleError(error: unknown) {
    this.timer$.unsubscribe();
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this._messageService.errorMsg$.next(error.message + '. This is most likely because the API server is not running.');
      } else {
        this._messageService.errorMsg$.next(`${error.status} ${error.error.error}. ${error.error.message}`);
      }
    } else {
      this._messageService.errorMsg$.next(JSON.stringify(error));
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
