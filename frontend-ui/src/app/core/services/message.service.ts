import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public errorMsg$ = new BehaviorSubject<string>('');

  public score$ = new BehaviorSubject<number>(0);
  public questions$ = new BehaviorSubject<string[] | undefined>(undefined);

  constructor() { }

}
