import {Component, EventEmitter, Output} from '@angular/core';
import {AccountModalMode} from "../../../services/account-modal.service";
import {AuthService} from "../../../services/auth.service";
import {RegisterFormOutput} from "../../../interfaces/register-form-output";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'trd-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent {

  constructor(private authService: AuthService) {
    this.usernameConflict$ = authService.usernameConflict$;
    authService.userRegistered$.pipe(take(1)).subscribe(_ => this.displaySuccessMessage = true)
  }

  displaySuccessMessage: boolean = false;
  usernameConflict$: Observable<void>;
  @Output() closeClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() logInLinkClick: EventEmitter<AccountModalMode> = new EventEmitter<AccountModalMode>();

  onFormSubmitted(userRegisterData: RegisterFormOutput): void {
    console.log("level-up")
    this.authService.registerUser(userRegisterData);
  }

  onLogInLinkClick(): void {
    this.logInLinkClick.emit("login");
  }

  onCloseClick(): void {
    this.closeClick.emit();
  }

}
