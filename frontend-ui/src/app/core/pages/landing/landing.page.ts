import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage implements AfterViewInit {

  displayOp1 = new BehaviorSubject<number>(Math.floor(Math.random() * 10));
  displayOp2 = new BehaviorSubject<number>(Math.floor(Math.random() * 10));

  constructor(private user: UserService) { }

  ngAfterViewInit(): void {
    this.user.getUser().subscribe(user => {
      if (!user) this.user.logInUser();
    });

    // timer(8500).subscribe(() => this.displayOp1.next(Math.floor(Math.random() * 10)));
    // interval(12000).subscribe(() => this.displayOp1.next(Math.floor(Math.random() * 10)));
  }


}
