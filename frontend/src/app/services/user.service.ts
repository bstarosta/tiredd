import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../interfaces/user";
import {AuthService} from "./auth.service";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, @Inject(API_BASE_URL) private baseUrl: string,
              private httpClient: HttpClient) {
    authService.userLoggedIn$.subscribe( _ => this.getUserData());
    authService.userLoggedOut$.subscribe(_ => this.onUserLogout());
  }


  private user : BehaviorSubject<User> = new BehaviorSubject<any>(null)
  user$: Observable<User> = this.user.asObservable();
  isUserLoggedIn$: Observable<boolean> = this.user$.pipe(map(u => !!u))

  private onUserLogout(): void {
    this.user.next(null);
  }

  getUserData(): void {
    this.httpClient.get<User>(this.baseUrl + "api/currentUser", {withCredentials: true}).subscribe(user => {
      this.user.next(user);
    })
  }

}
