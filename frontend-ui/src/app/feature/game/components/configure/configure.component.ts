import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { Difficulty, MathLogicService } from '../../services/math-logic.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  constructor(private mathService: MathLogicService, public user: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user.getUser().subscribe(user => {
      if (!user) this.user.logInUser();
    });
  }

  difficulty = ['Easy', 'Medium', 'Hard'];
  selectedDifficulty: Difficulty | undefined;

  onSubmit() {
    this.mathService.setDifficulty(this.selectedDifficulty as Difficulty);
    this.router.navigate(['play'], { relativeTo: this.route });
  }

  getDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty.toLowerCase() as Difficulty;
  }
}
