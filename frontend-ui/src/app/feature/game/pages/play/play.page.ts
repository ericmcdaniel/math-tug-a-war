import { Component, HostListener } from '@angular/core';
import { MathGeneratorService } from '../../services/math-generator.service';

@Component({
  selector: 'app-play-ui',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.css']
})
export class PlayPage {

  isGettingReady = true;

  constructor(private mathService: MathGeneratorService) {
    this.mathService.initialize();
  }

  @HostListener('document:keypress', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.isGettingReady = false;
    }
  }
}
