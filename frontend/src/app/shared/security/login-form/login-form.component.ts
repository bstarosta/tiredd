import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginFormOutput} from "../../../interfaces/login-form-output";

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
export class LoginFormComponent {


  @Output() formSubmitted: EventEmitter<LoginFormOutput> = new EventEmitter<LoginFormOutput>();

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

}
