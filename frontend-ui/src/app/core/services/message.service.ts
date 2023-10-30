import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameResults } from '../../feature/game/models/game-results.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public errorMsg$ = new BehaviorSubject<string>('');

  public results$ = new BehaviorSubject<GameResults | undefined>(undefined);

  constructor() { }

}
