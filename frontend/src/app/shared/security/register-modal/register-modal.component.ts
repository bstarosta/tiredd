import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountModalMode} from "../../../services/account-modal.service";

@Component({
  selector: 'trd-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  constructor() { }

  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() logInLinkClick: EventEmitter<AccountModalMode> = new EventEmitter<AccountModalMode>();

  onLogInLinkClick() {
    this.logInLinkClick.emit("login");
  }

  onCloseClick(): void {
    this.closeClick.emit();
  }

  ngOnInit(): void {
  }

}
