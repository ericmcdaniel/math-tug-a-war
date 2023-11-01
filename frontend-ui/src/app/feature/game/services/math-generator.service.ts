import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ExpressionResponse } from '../models/expression-response.model';
import { GameResults } from '../models/game-results.model';
import { ValidatedRequest } from '../models/validation-request.model';
import { ValidatedResponse } from '../models/validation-response.model';

@Injectable({
  providedIn: 'root'
})
export class MathGeneratorService {

  public gameResults$ = new BehaviorSubject<GameResults>({ correct: 0, questions: [] });

  constructor(private _http: HttpClient) { }

  public generateExpression(difficulty: string): Observable<ExpressionResponse> {
    return this._http.get<ExpressionResponse>(environment.apiUrl + 'generate-equation', { params: { difficulty } });
  }

  public validateExpression(request: ValidatedRequest): Observable<ValidatedResponse> {
    return this._http.post<ValidatedResponse>(environment.apiUrl + 'validate-answer', {
      request
    });
  }

  public initialize() {
    this.gameResults$ = new BehaviorSubject<GameResults>({ correct: 0, questions: [] });
  }

  public updateScore() {
    const currentScore = this.gameResults$.getValue()?.correct || 0;
    this.gameResults$.next({ ...this.gameResults$.getValue(), correct: currentScore + 1 });
  }
}
