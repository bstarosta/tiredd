import {AbstractControl} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UrlValidatorService {
  validateHttpUrl(control: AbstractControl) {
    const invalidUrl = {invalidUrl: true}
    try {
      const url = new URL(control.value);
      const isHttp = url.protocol === "http:" || url.protocol === "https:"
      return isHttp ? null : invalidUrl;
    } catch (_) {
      return invalidUrl
    }
  }
}
