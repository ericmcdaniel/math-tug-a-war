import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  private responses$: BehaviorSubject<Omit<ValidatedResponse, 'message'>[]>;

  constructor(private http: HttpClient) {
    this.difficulty$ = new BehaviorSubject<Difficulty>('easy');
    this.score$ = new BehaviorSubject<number>(0);
    this.questions$ = new BehaviorSubject<string[]>([]);
    this.responses$ = new BehaviorSubject<Omit<ValidatedResponse, 'message'>[]>([]);
  }

  get score(): Observable<number> {
    return this.score$.asObservable();
  }

  public setScore(): void {
    this.score$.next(this.score$.getValue() + 1);
  }

  get questions(): Observable<string[]> {
    return this.questions$.asObservable();
  }

  public updateQuestions(nextQuestion: string): void {
    this.questions$.next([...this.questions$.getValue(), nextQuestion]);
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
    return this.http.get<ExpressionResponse>(environment.apiUrl + 'generate-equation', { params: { difficulty: this.difficulty$.getValue() } });
  }

  public validateExpression(request: ValidatedRequest): Observable<ValidatedResponse> {
    return this.http.post<ValidatedResponse>(environment.apiUrl + 'validate-answer', request);
  }

  public buildErrorResponse(response: unknown): string {
    let errorMessageForUser: string;
    if (response instanceof HttpErrorResponse) {
      if (response.status === 0) {
        // This is a special case for then the app can't even connect to the API, which HTTPClient interprets
        // the status code as 0.
        errorMessageForUser = response.message + '. This is most likely because the API server is not running.';
      } else {
        console.log(response);
        errorMessageForUser = `${response.status} ${response.error.error}. ${response.error.message}`;
      }
    } else {
      errorMessageForUser = JSON.stringify(response);
    }
    return errorMessageForUser;
  }

  public initialize(): void {
    this.score$ = new BehaviorSubject<number>(0);
    this.questions$ = new BehaviorSubject<string[]>([]);
  }

  public getDifficulty(): Observable<Difficulty> {
    return this.difficulty$;
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.difficulty$.next(difficulty);
  }
}
