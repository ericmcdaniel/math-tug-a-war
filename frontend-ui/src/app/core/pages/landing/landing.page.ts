import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.getUser().subscribe(user => {
      if (!user) this.user.logInUser();
    });
  }
}
