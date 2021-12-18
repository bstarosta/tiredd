import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'trd-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor() { }

  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>()

  onCloseClick(): void {
    this.closeClick.emit();
  }

  ngOnInit(): void {
  }

}
