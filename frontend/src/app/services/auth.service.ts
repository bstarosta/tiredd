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
  private userRegistered: Subject<void> = new Subject<void>();
  private usernameConflict: Subject<void> = new Subject<void>();
  private invalidCredentials: Subject<void> = new Subject<void>();

  userLoggedIn$: Observable<void> = this.userLoggedIn.asObservable();
  userLoggedOut$: Observable<void> = this.userLoggedOut.asObservable();
  userRegistered$: Observable<void> = this.userRegistered.asObservable();
  usernameConflict$: Observable<void> = this.usernameConflict.asObservable();
  invalidCredentials$: Observable<void> = this.invalidCredentials.asObservable();

  constructor(private httpClient: HttpClient, @Inject(API_BASE_URL) private baseUrl: string) {}


  registerUser(registerUserData: RegisterFormOutput): void{
    this.httpClient.post(this.baseUrl + 'auth/register', registerUserData).
    subscribe( _ => this.userRegistered.next(), error => {
      if(error.status === 409) {
        this.usernameConflict.next();
      }
    });
  }



  loginUser(loginUserData: LoginFormOutput): void {
    this.httpClient.post(this.baseUrl + 'auth/login', loginUserData).subscribe( _ => {
      this.userLoggedIn.next();
    }, _ => this.invalidCredentials.next());
  }

  logoutUser(): void {
    this.httpClient.post(this.baseUrl + 'auth/logout', null).subscribe( _ => {
      this.userLoggedOut.next();
    });
  }
}
