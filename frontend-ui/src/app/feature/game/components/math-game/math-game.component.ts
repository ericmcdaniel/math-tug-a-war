import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription, take, takeWhile, timer } from 'rxjs';
import { MessageService } from '../../../../core/services/message.service';
import { ExpressionResponse } from '../../models/expression-response.model';
import { MathGeneratorService } from '../../services/math-generator.service';

@Component({
  selector: 'app-math-game',
  templateUrl: './math-game.component.html',
  styleUrls: ['./math-game.component.css']
})
export class MathGameComponent {


  public expression$ = new BehaviorSubject<ExpressionResponse | undefined>(undefined);
  public remaining$ = new BehaviorSubject<number>(0);
  public timer$: Subscription;
  @ViewChild('solution', { static: false }) inputElement: ElementRef<HTMLInputElement>;
  @ViewChild('playGame', { static: false }) divElement: ElementRef<HTMLDivElement>;

  constructor(
    public mathService: MathGeneratorService,
    private _messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  @HostListener('document:keypress', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (this.remaining$.getValue() === 0) {
      this.divElement.nativeElement.classList.remove('non-playable-game');
      this.divElement.nativeElement.classList.add('playable-game');
    }
    if (this.remaining$.getValue() >= 10) {
      this._messageService.results$.next(this.mathService.gameResults$.getValue());
      this.router.navigate(['../results'], { relativeTo: this.route });
    }
    this.inputElement.nativeElement.focus();
    if (event.code === 'Space') {
      this.startTimer();
      this.getNewMathExpression(0);
      return;
    }
    if (event.key !== 'Enter') return;

    this.startTimer();
    this.mathService.updateScore();
    // this.mathService.validateExpression();
  }

  @HostListener('document:click', ['$event'])
  handleClickOnPage(event: PointerEvent): void {
    console.log(event);
    this.inputElement.nativeElement.focus();
  }

  startTimer(): void {
    if (this.timer$ && !this.timer$.closed) this.timer$.unsubscribe();
    this.timer$ = timer(0, 4000).pipe(takeWhile(() => this.remaining$.getValue() <= 10)).subscribe(
      (time) => { // placeholder for getting the exact millisecond for progress bar
        // if (time % 25 === 0) {
        if (this.remaining$.getValue() >= 10) {
          this._messageService.results$.next(this.mathService.gameResults$.getValue());
          this.router.navigate(['../results'], { relativeTo: this.route });
        } else {
          this.getNewMathExpression();
        }
        // }
      });
  }

  getNewMathExpression(addNewScore = 1): void {
    this.mathService.generateExpression(3).pipe(take(1)).subscribe({
      next: (exprResp: ExpressionResponse) => {
        this.remaining$.next(this.remaining$.getValue() + addNewScore);
        this.expression$.next(exprResp);
        this.inputElement.nativeElement.value = '';
      },
      error: (error: unknown) => {
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
    });
  }
}
