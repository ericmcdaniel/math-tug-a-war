import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ExpressionResponse } from '../models/expression-response.model';
import { GameResults } from '../models/game-results.model';
import { ValidatedRequest } from '../models/validation-request.model';
import { ValidatedResponse } from '../models/validation-response.model';

export type Difficulty = 'easy' | 'medium' | 'hard';

@Injectable({
  providedIn: 'root'
})
export class MathLogicService {

  private gameResults$: BehaviorSubject<GameResults>;
  private difficulty$: BehaviorSubject<Difficulty>;

  constructor(private _http: HttpClient) {
    this.gameResults$ = new BehaviorSubject<GameResults>({ correct: 0, questions: [] });
    this.difficulty$ = new BehaviorSubject<Difficulty>('easy');
  }

  public gameResults(): Observable<GameResults> {
    return this.gameResults$.asObservable();
  }

  public generateExpression(): Observable<ExpressionResponse> {
    return this._http.get<ExpressionResponse>(environment.apiUrl + 'generate-equation', { params: { difficulty: this.difficulty$.getValue() } });
  }

  public validateExpression(request: ValidatedRequest): Observable<ValidatedResponse> {
    return this._http.post<ValidatedResponse>(environment.apiUrl + 'validate-answer', request);
  }

  public initialize(): void {
    this.gameResults$ = new BehaviorSubject<GameResults>({ correct: 0, questions: [] });
  }

  public updateScore(): void {
    const currentScore = this.gameResults$.getValue()?.correct || 0;
    this.gameResults$.next({ ...this.gameResults$.getValue(), correct: currentScore + 1 });
  }

  public getDifficulty(): Observable<Difficulty> {
    return this.difficulty$;
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty$.next(difficulty);
  }

}
