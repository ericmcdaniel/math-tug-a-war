import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ExpressionResponse } from '../../feature/game/models/expression-response.model';
import { ValidatedRequest } from '../../feature/game/models/validation-request.model';
import { ValidatedResponse } from '../../feature/game/models/validation-response.model';
import { Difficulty } from '../../feature/game/services/math-logic.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  public generateExpression(difficulty: Difficulty): Observable<ExpressionResponse> {
    return this.http.get<ExpressionResponse>(environment.apiUrl + 'generate-equation', { params: { difficulty } });
  }

  public validateExpression(request: ValidatedRequest): Observable<ValidatedResponse> {
    return this.http.post<ValidatedResponse>(environment.apiUrl + 'validate-answer', request);
  }

  public healthTestServer(): Observable<boolean> {
    return this.http.get<{ status: string; }>(environment.apiUrl + 'health-test')
      .pipe(map(response => response.status === 'OK'));
  }

  public static buildErrorResponse(response: unknown): string {
    let errorMessageForUser: string;
    if (response instanceof HttpErrorResponse) {
      if (response.status === 0) {
        // This is a special case for then the app can't even connect to the API, which HTTPClient interprets
        // the status code as 0.
        errorMessageForUser = response.message + '. This is most likely because the API server is not running.';
      } else {
        errorMessageForUser = `${response.status} ${response.error.error}. ${response.error.message}`;
      }
    } else {
      errorMessageForUser = JSON.stringify(response);
    }
    return errorMessageForUser;
  }
}
