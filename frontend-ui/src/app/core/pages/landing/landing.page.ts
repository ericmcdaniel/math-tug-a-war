import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, delay, interval, tap } from 'rxjs';
import { UserService } from '../../services/user.service';

const ANIMATION_TIME = 1500;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css'],
  animations: [
    // This animation is tightly coupled with the TS logic of changing the Operand number
    // on screen, which is why it's rendered by Angular and not pre CSS.
    trigger('ctaDisplayProblem', [
      transition('show => hide', [
        animate(`${ANIMATION_TIME}ms cubic-bezier(0.87, 0, 0.13, 1)`, keyframes([
          style({
            opacity: 1,
            transform: 'translateY(0)',
            offset: 0
          }),
          style({
            opacity: 0,
            transform: 'translateY(50%)',
            offset: 0.07
          }),
          style({
            opacity: 0,
            transform: 'translateY(50%)',
            offset: 0.93
          }),
          style({
            opacity: 1,
            transform: 'translateY(0)',
            offset: 1
          })
        ]))
      ]),
    ]),
  ]
})
export class LandingPage implements AfterViewInit, OnDestroy {
  shouldShowLeft = true;
  shouldShowRight = true;
  operatorLeft = new BehaviorSubject<number>(this.randNumber());
  operatorRight = new BehaviorSubject<number>(this.randNumber());

  operSubLeft$: Subscription;
  operSubRight$: Subscription;

  constructor(private user: UserService) { }

  ngAfterViewInit(): void {
    this.user.getUser().subscribe(user => {
      if (!user) this.user.logInUser();
    });

    this.operSubLeft$ = this.swapCtaDisplayNumbers({ totalTime: 8537, isLeftOp: true }).subscribe();
    this.operSubRight$ = this.swapCtaDisplayNumbers({ totalTime: 11273, isLeftOp: false }).subscribe();
  }

  swapCtaDisplayNumbers({ totalTime, isLeftOp }: { totalTime: number, isLeftOp: boolean; }): Observable<number> {
    return interval(totalTime)
      .pipe(
        tap(() => this.toggleOpDisplay(isLeftOp)),
        delay(ANIMATION_TIME / 2),
        tap(() => this.setOperator(isLeftOp)),
        delay(ANIMATION_TIME),
        tap(() => this.toggleOpDisplay(isLeftOp)));
  }

  toggleOpDisplay(useLeftOp: boolean): void {
    if (useLeftOp) {
      this.shouldShowLeft = !this.shouldShowLeft;
    } else {
      this.shouldShowRight = !this.shouldShowRight;
    }
  }

  setOperator(isLeftOp: boolean): void {
    if (isLeftOp) {
      const prevValue = this.operatorLeft.getValue();
      this.operatorLeft.next(this.randNumber(prevValue));
      return;
    }
    const prevValue = this.operatorRight.getValue();
    this.operatorRight.next(this.randNumber(prevValue));
    return;
  }

  /*
   * Ensure that the randomly generated number is always unique. This was made after
   * seeing 5, 5, 5, 5 one too many times.
   */
  randNumber(removeElement?: number): number {
    const choices = Array(10).fill(-1).map((_, idx) => idx);
    if (removeElement) {
      choices.splice(removeElement, 1);
    }
    return choices[Math.floor(Math.random() * choices.length)];
  }

  ngOnDestroy(): void {
    // close open subscriptions to prevent memory leaks
    if (this.operSubLeft$ && !this.operSubLeft$.closed) this.operSubLeft$.unsubscribe();
    if (this.operSubRight$ && !this.operSubRight$.closed) this.operSubRight$.unsubscribe();
  }
}
