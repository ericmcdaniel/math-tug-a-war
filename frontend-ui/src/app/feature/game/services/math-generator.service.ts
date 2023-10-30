import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MessageService } from '../../../core/services/message.service';
import { ExpressionResponse } from '../models/expression-response.model';
import { GameResults } from '../models/game-results.model';
import { ValidatedRequest } from '../models/validation-request.model';
import { ValidatedResponse } from '../models/validation-response.model';

@Injectable({
  providedIn: 'root'
})
export class MathGeneratorService {

  public gameResults$ = new BehaviorSubject<GameResults>({ correct: -1, questions: [] });

  constructor(private _http: HttpClient, private _messageService: MessageService) { }

  public generateExpression(difficulty: number): Observable<ExpressionResponse> {
    return this._http.get<ExpressionResponse>(environment.apiUrl + 'generate-equation', { params: { difficulty } });
  }

  public validateExpression(request: ValidatedRequest): Observable<ValidatedResponse> {
    return this._http.post<ValidatedResponse>(environment.apiUrl + 'validate-answer', {
      request
    });
  }

  public updateScore() {
    const currentScore = this.gameResults$.getValue()?.correct || 0;
    this.gameResults$.next({ ...this.gameResults$.getValue(), correct: currentScore + 1 });
  }
}
