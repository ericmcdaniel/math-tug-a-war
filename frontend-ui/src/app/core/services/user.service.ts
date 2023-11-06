import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: BehaviorSubject<boolean>;

  constructor(private _messageService: MessageService, private _http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.user$ = new BehaviorSubject<boolean>(false);
  }

  getUser(): Observable<boolean> {
    return this.user$.asObservable();
  }

  logInUser(): void {
    this._http.get<{ status: string; }>(environment.apiUrl + 'health-test').subscribe({
      next: response => {
        if (response.status === 'OK')
          this.user$.next(true);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this._messageService.errorMsg$.next(error.message + '. This is most likely because the API server is not running.');
          } else {
            this._messageService.errorMsg$.next(`${error.status} ${error.error.error}. ${error.error.message}`);
          }
        } else {
          this._messageService.errorMsg$.next(JSON.stringify(error));
        }
        this.router.navigate(['/error'], { relativeTo: this.route });
      }
    });
  }
}
