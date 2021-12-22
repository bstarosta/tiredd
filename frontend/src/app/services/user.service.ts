import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../interfaces/user";

const MOCK_USER: User = {
  username: "user"
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  private user : BehaviorSubject<User> = new BehaviorSubject<any>(null)
  user$: Observable<User> = this.user.asObservable();
  isUserLoggedIn$: Observable<boolean> = this.user$.pipe(map(u => !!u))

  logInUser(): void {
    this.user.next(MOCK_USER);
  }

  logOutUser(): void {
    this.user.next(null);
  }
}
