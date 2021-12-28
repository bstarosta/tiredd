import {Component, EventEmitter, Output} from '@angular/core';
import {AccountModalMode} from "../../../services/account-modal.service";
import {LoginFormOutput} from "../../../interfaces/login-form-output";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'trd-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  constructor(private authService: AuthService) {
    this.invalidCredentials$ = authService.invalidCredentials$;
    this.authService.userLoggedIn$.pipe(take(1)).subscribe(_ => this.loginSuccess.emit())
  }

  invalidCredentials$: Observable<void>
  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() signUpLinkClick: EventEmitter<AccountModalMode> = new EventEmitter<AccountModalMode>();
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  loginUser(userCredentials: LoginFormOutput): void {
    this.authService.loginUser(userCredentials);
  }

  onCloseClick(): void {
    this.closeClick.emit();
  }

  onSignUpLinkClick(): void {
    this.signUpLinkClick.emit("register");
  }

}
