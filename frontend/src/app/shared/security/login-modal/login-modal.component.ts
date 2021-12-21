import {Component, EventEmitter, Output} from '@angular/core';
import {AccountModalMode} from "../../../services/account-modal.service";
import {UserService} from "../../../services/user.service";
import {LoginFormOutput} from "../../../interfaces/login-form-output";

@Component({
  selector: 'trd-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  constructor(private userService: UserService) { }

  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() signUpLinkClick: EventEmitter<AccountModalMode> = new EventEmitter<AccountModalMode>();
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  loginUser(userCredentials: LoginFormOutput): void {
    this.userService.logInUser()
    this.loginSuccess.emit();
  }

  onCloseClick(): void {
    this.closeClick.emit();
  }

  onSignUpLinkClick(): void {
    this.signUpLinkClick.emit("register");
  }

}
