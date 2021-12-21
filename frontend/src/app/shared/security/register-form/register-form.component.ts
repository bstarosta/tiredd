import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {matchPasswordsValidator} from "../validators/match-password-validator";
import {ParentErrorStateMatcher} from "../parent-error-state-matcher";
import {RegisterFormOutput} from "../../../interfaces/register-form-output";

const REGISTER_FORM_ERROR_MESSAGE_KEYS: ValidationErrors = {
  username: {
    required: "error.username.required",
  },
  email: {
    required: "error.email.required",
    email: "error.email.email"
  },
  password : {
    required: "error.password.required"
  },
  confirmPassword: {
    required: "error.confirmPassword.required"
  }
}

@Component({
  selector: 'trd-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {


  @Output() formSubmitted: EventEmitter<RegisterFormOutput> = new EventEmitter<RegisterFormOutput>()

  passwordErrorStateMatcher: ParentErrorStateMatcher = new ParentErrorStateMatcher();
  formErrorMessageKeys: ValidationErrors = REGISTER_FORM_ERROR_MESSAGE_KEYS;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [matchPasswordsValidator])
  });

  onSubmit(): void {
    const userRegistrationData: RegisterFormOutput = {
      ...this.form.value,
      password: this.password.value
    }
    this.formSubmitted.emit(userRegistrationData);
  }

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get passwordGroup() {
    return this.form.get('password');
  }

  get password() {
    return this.form.get('password.password');
  }

  get confirmPassword() {
    return this.form.get('password.confirmPassword');
  }

}
