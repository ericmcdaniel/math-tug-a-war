import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.user$ = new BehaviorSubject<boolean>(false);
  }

  getUser(): Observable<boolean> {
    return this.user$.asObservable();
  }

  logInUser(): void {
    this.http.get<{ status: string; }>(environment.apiUrl + 'health-test').subscribe({
      next: response => {
        if (response.status === 'OK')
          this.user$.next(true);
      },
      error: (error: unknown) => {
        const errorResp = this.buildErrorResponse(error);
        this.router.navigate(['/error'], { relativeTo: this.route, state: { message: errorResp } });
      }
    });
  }

  public buildErrorResponse(response: unknown): string {
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
