import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$: BehaviorSubject<boolean>;

  constructor(private network: NetworkService, private router: Router, private route: ActivatedRoute) {
    this.user$ = new BehaviorSubject<boolean>(false);
  }

  getUser(): Observable<boolean> {
    return this.user$.asObservable();
  }

  logInUser(): void {
    this.network.healthTestServer().subscribe({
      next: response => this.user$.next(response),
      error: (error: unknown) => {
        const errorResp = NetworkService.buildErrorResponse(error);
        this.router.navigate(['/error'], { state: { message: errorResp } });
      }
    });
  }
}
