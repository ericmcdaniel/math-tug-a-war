import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  difficulty = ['Easy', 'Medium', 'Hard'];
  selectedDifficulty = '--';


  onSubmit(form: NgForm) {
    this.router.navigate(['play'], { relativeTo: this.route });
  }

}
