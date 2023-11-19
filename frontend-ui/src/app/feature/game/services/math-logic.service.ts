import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { NetworkService } from '../../../core/services/network.service';
import { ExpressionResponse } from '../models/expression-response.model';
import { ValidatedRequest } from '../models/validation-request.model';
import { ValidatedResponse } from '../models/validation-response.model';

export type Difficulty = 'easy' | 'medium' | 'hard';

@Injectable({
  providedIn: 'root'
})
export class MathLogicService {

  private difficulty$: BehaviorSubject<Difficulty>;
  private score$: BehaviorSubject<number>;
  private questions$: BehaviorSubject<ExpressionResponse[]>;
  private currentExpression$: BehaviorSubject<ExpressionResponse | undefined>;
  private responses$: BehaviorSubject<Omit<ValidatedResponse, 'message'>[]>;

  constructor(private network: NetworkService) {
    this.difficulty$ = new BehaviorSubject<Difficulty>('easy');
    this.score$ = new BehaviorSubject<number>(0);
    this.questions$ = new BehaviorSubject<ExpressionResponse[]>([]);
    this.currentExpression$ = new BehaviorSubject<ExpressionResponse | undefined>(undefined);
    this.responses$ = new BehaviorSubject<Omit<ValidatedResponse, 'message'>[]>([]);
  }

  get score(): Observable<number> {
    return this.score$.asObservable();
  }

  public setScore(): void {
    this.score$.next(this.score$.getValue() + 1);
  }

  get questions(): Observable<ExpressionResponse[]> {
    return this.questions$.asObservable();
  }

  public updateQuestions(nextQuestion: ExpressionResponse): void {
    this.currentExpression$.next(nextQuestion);
    this.questions$.next([...this.questions$.getValue(), nextQuestion]);
  }

  public questionsCompleted(): number {
    return this.questions$.getValue().length;
  }

  get currentQuestion(): Observable<ExpressionResponse | undefined> {
    return this.currentExpression$.asObservable();
  }

  get responses(): Observable<Omit<ValidatedResponse, 'message'>[]> {
    return this.responses$.asObservable();
  }

  public updateResponses(response: ValidatedResponse): void {
    const responseWithoutMessage: Omit<ValidatedResponse, 'message'> = {
      actual: response.actual,
      received: response.received
    };
    this.responses$.next([...this.responses$.getValue(), responseWithoutMessage]);
  }

  public generateExpression(): Observable<ExpressionResponse> {
    return this.network.generateExpression(this.difficulty$.getValue());
  }

  public validateExpression(request: string): Observable<ValidatedResponse> {
    const userRequestToValidate: ValidatedRequest = {
      id: this.currentExpression$.getValue()?.id || '',
      answer: request
    };
    return this.network.validateExpression(userRequestToValidate);
  }

  public initialize(): void {
    this.score$ = new BehaviorSubject<number>(0);
    this.questions$ = new BehaviorSubject<ExpressionResponse[]>([]);
  }

  public getDifficulty(): Observable<Difficulty> {
    return this.difficulty$;
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty$.next(difficulty);
  }
}
