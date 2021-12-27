import {Inject, Injectable} from '@angular/core';
import {LoginFormOutput} from "../interfaces/login-form-output";
import {RegisterFormOutput} from "../interfaces/register-form-output";
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "../utils/api-base-url";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLoggedIn: Subject<void> = new Subject<void>();
  private userLoggedOut: Subject<void> = new Subject<void>();

  userLoggedIn$: Observable<void> = this.userLoggedIn.asObservable();
  userLoggedOut$: Observable<void> = this.userLoggedOut.asObservable();

  constructor(private httpClient: HttpClient, @Inject(API_BASE_URL) private baseUrl: string) {}


  registerUser(registerUserData: RegisterFormOutput): void{
    this.httpClient.post(this.baseUrl + 'auth/register', registerUserData).subscribe();
  }


  loginUser(loginUserData: LoginFormOutput): void {
    this.httpClient.post(this.baseUrl + 'auth/login', loginUserData, {withCredentials: true}).subscribe( _ => {
      this.userLoggedIn.next();
    });
  }

  logoutUser(): void {
    this.httpClient.post(this.baseUrl + 'auth/logout', null, {withCredentials: true}).subscribe( _ => {
      this.userLoggedOut.next();
    });
  }
}
