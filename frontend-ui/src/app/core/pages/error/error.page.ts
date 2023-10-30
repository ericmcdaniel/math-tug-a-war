import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-error',
  template: `<div>
      <p>There was a fatal error:</p>
      <p>{{ (_messageService.errorMsg$.getValue())}}</p>
    </div>`,
  styles: []
})
export class ErrorPage implements OnInit {

  constructor(public _messageService: MessageService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this._messageService.errorMsg$.getValue()) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
}
