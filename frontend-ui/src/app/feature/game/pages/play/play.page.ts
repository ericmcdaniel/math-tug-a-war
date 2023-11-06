import { Component, HostListener } from '@angular/core';
import { MathLogicService } from '../../services/math-logic.service';

@Component({
  selector: 'app-play-ui',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.css']
})
export class PlayPage {

  isGettingReady = true;

  constructor(private mathService: MathLogicService) {
    this.mathService.initialize();
  }

  @HostListener('document:keypress', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.isGettingReady = false;
    }
  }
}
