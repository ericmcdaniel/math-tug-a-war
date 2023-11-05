import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: BehaviorSubject<boolean>;

  constructor(private _http: HttpClient) {
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
      error: (error) => { throw new Error(error); }
    });
  }
}
