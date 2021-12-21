import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {matchPasswordsValidator} from "../validators/match-password-validator";
import {ParentErrorStateMatcher} from "../parent-error-state-matcher";

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
export class RegisterFormComponent implements OnInit {

  constructor() { }


  passwordErrorStateMatcher: ParentErrorStateMatcher = new ParentErrorStateMatcher();
  defaultFormErrorKeys: ValidationErrors = REGISTER_FORM_ERROR_MESSAGE_KEYS;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [matchPasswordsValidator])
  });

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

  ngOnInit(): void {
  }

}
