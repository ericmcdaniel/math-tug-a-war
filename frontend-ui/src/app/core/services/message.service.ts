import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public errorMsg$ = new BehaviorSubject<string>('');

  constructor() { }

}
