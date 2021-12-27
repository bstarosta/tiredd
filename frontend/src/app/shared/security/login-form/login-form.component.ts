import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginFormOutput} from "../../../interfaces/login-form-output";
import {Observable, Subscription} from "rxjs";
import {BadCredentialsErrorStateMatcher} from "../BadCredentialsErrorStateMatcher";

const LOGIN_FORM_ERROR_MESSAGE_KEYS: ValidationErrors = {
  username: {
    required: "error.username.required",
  },
  password : {
    required: "error.password.required"
  },
}

@Component({
  selector: 'trd-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy{

  @Input() invalidCredentials$: Observable<void>;
  @Output() formSubmitted: EventEmitter<LoginFormOutput> = new EventEmitter<LoginFormOutput>();

  badCredentialsErrorStateMatcher: BadCredentialsErrorStateMatcher = new BadCredentialsErrorStateMatcher();
  invalidCredentialsSubscription: Subscription;
  formErrorMessageKeys: ValidationErrors = LOGIN_FORM_ERROR_MESSAGE_KEYS;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.formSubmitted.emit(this.form.value)
  }

  ngOnInit() {
    this.invalidCredentialsSubscription = this.invalidCredentials$
      .subscribe(_ => this.form.setErrors({badCredentials: true})
      )
  }

  ngOnDestroy() {
    this.invalidCredentialsSubscription.unsubscribe();
  }

}
