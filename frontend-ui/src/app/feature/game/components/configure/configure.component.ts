import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  constructor(public user: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user.getUser().subscribe(user => {
      if (!user) this.user.logInUser();
    });
  }

  difficulty = ['Easy', 'Medium', 'Hard'];
  selectedDifficulty = '--';

  onSubmit(form: NgForm) {
    this.router.navigate(['play'], { relativeTo: this.route });
  }

}
