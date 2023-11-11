import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval, switchMap, take, tap } from 'rxjs';
import { UserService } from '../../services/user.service';

const ANIMATION_TIME = 1500;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css'],
  animations: [
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
  displayOpLeft = new BehaviorSubject<number>(this.randNumber());
  displayOpRight = new BehaviorSubject<number>(this.randNumber());

  operatorLeft$: Subscription;
  operatorRight$: Subscription;

  constructor(private user: UserService) { }

  ngAfterViewInit(): void {
    this.user.getUser().subscribe(user => {
      if (!user) this.user.logInUser();
    });

    this.operatorLeft$ = this.swapCtaDisplayNumbers({ totalTime: 8533, isLeftOperand: true }).subscribe();
    this.operatorRight$ = this.swapCtaDisplayNumbers({ totalTime: 11273, isLeftOperand: false }).subscribe();
  }



  swapCtaDisplayNumbers({ totalTime, isLeftOperand }: { totalTime: number, isLeftOperand: boolean; }): Observable<number> {
    return interval(totalTime)
      .pipe(
        tap(() => (isLeftOperand) ? (this.shouldShowLeft = false) : (this.shouldShowRight = false)),
        switchMap(() => {
          return interval(ANIMATION_TIME / 2).pipe(take(1), tap(() => {
            if (isLeftOperand) {
              this.displayOpLeft.next(this.randNumber());
            } else {
              this.displayOpRight.next(this.randNumber());
            }
          }));
        })).pipe(switchMap(() => {
          return interval(ANIMATION_TIME)
            .pipe(
              take(1),
              tap(() => (isLeftOperand) ? (this.shouldShowLeft = true) : (this.shouldShowRight = true)));
        }));
  }

  randNumber(): number {
    return Math.floor(Math.random() * 10);
  }

  ngOnDestroy(): void {
    // close open subscriptions to prevent memory leaks
    if (this.operatorLeft$ && !this.operatorLeft$.closed) this.operatorLeft$.unsubscribe();
    if (this.operatorRight$ && !this.operatorRight$.closed) this.operatorRight$.unsubscribe();
  }
}
