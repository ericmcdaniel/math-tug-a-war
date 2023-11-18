import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
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
  private questions$: BehaviorSubject<string[]>;

  constructor(private http: HttpClient) {
    this.score$ = new BehaviorSubject<number>(0);
    this.questions$ = new BehaviorSubject<string[]>([]);
    this.difficulty$ = new BehaviorSubject<Difficulty>('easy');
  }

  get score(): Observable<number> {
    return this.score$.asObservable();
  }

  get questions(): Observable<string[]> {
    return this.questions$.asObservable();
  }

  public generateExpression(): Observable<ExpressionResponse> {
    return this.http.get<ExpressionResponse>(environment.apiUrl + 'generate-equation', { params: { difficulty: this.difficulty$.getValue() } });
  }

  public validateExpression(request: ValidatedRequest): Observable<ValidatedResponse> {
    return this.http.post<ValidatedResponse>(environment.apiUrl + 'validate-answer', request);
  }

  public initialize(): void {
    this.score$ = new BehaviorSubject<number>(0);
    this.questions$ = new BehaviorSubject<string[]>([]);
  }

  public updateScore(): void {
    this.score$.next(this.score$.getValue() + 1);
  }

  public getDifficulty(): Observable<Difficulty> {
    return this.difficulty$;
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty$.next(difficulty);
  }
}
