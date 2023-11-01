import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../core/services/message.service';

@Component({
  selector: 'app-results',
  template: '<p>You got {{ msgService.results$.getValue()?.correct }} correct!</p>',
})
export class ResultsComponent implements OnInit {

  constructor(public msgService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.msgService.results$.getValue()) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
}