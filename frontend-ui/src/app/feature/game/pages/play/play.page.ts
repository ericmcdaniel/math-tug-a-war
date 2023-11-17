import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Difficulty, MathLogicService } from '../../services/math-logic.service';

@Component({
  selector: 'app-play-ui',
  templateUrl: './play.page.html',
  styles: [
    `.game-links {
      display: flex;
      justify-content: space-around;
      margin-top: 2rem;
    }`,
    `.game-start {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 400;
      margin: 2.5rem 0 3.5rem;
    }`,
    `.game-controls li {
      font-size: 0.9rem;
    }`,
    `.game-controls > p {
      font-size: 1rem;
      text-align: center;
      font-style: italic;
      margin: 0;
    }`
  ]
})
export class PlayPage implements OnInit {

  isGettingReady = true;
  difficulty: Observable<Difficulty>;

  constructor(private mathService: MathLogicService) { }

  ngOnInit(): void {
    this.mathService.initialize();
    this.difficulty = this.mathService.getDifficulty();
  }

  @HostListener('document:keypress', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.isGettingReady = false;
    }
  }
}
