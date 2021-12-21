import {AbstractControl, ValidationErrors} from "@angular/forms";

export function matchPasswordsValidator(group: AbstractControl):  ValidationErrors | null  {
  let pass = group.get('password').value;
  let confirmPass = group.get('confirmPassword').value
  return pass === confirmPass || !confirmPass ? null : { differentPasswords: true }
}
