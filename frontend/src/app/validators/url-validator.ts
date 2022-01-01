import {AbstractControl, ValidationErrors} from "@angular/forms";

export function httpUrlValidator(control: AbstractControl): ValidationErrors | null {
  const invalidUrl = {invalidUrl: true}
  try {
    const url = new URL(control.value);
    const isHttp = url.protocol === "http:" || url.protocol === "https:"
    return isHttp ? null : invalidUrl;
  } catch (_) {
    return invalidUrl
  }
}
