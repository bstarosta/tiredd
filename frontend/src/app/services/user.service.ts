import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../interfaces/user";
import {AuthService} from "./auth.service";
import {API_BASE_URL} from "../utils/api-base-url";
import {HttpClient} from "@angular/common/http";
import {CommunityMembershipService} from "./community-membership.service";
import {UserSubtireddInfo} from "../interfaces/user-subtiredd-info";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, @Inject(API_BASE_URL) private baseUrl: string,
              private httpClient: HttpClient, private communityMembershipService: CommunityMembershipService) {
    authService.userLoggedIn$.subscribe( _ => this.getUserData());
    authService.userLoggedOut$.subscribe(_ => this.onUserLogout());
    communityMembershipService.communityJoined$.subscribe( subtiredd => this.updateUserOnJoin(subtiredd));
    communityMembershipService.communityLeft$.subscribe( subtiredd => this.updateUserOnLeave(subtiredd));
  }


  private user : BehaviorSubject<User> = new BehaviorSubject<any>(null)
  user$: Observable<User> = this.user.asObservable();
  isUserLoggedIn$: Observable<boolean> = this.user$.pipe(map(u => !!u))

  private onUserLogout(): void {
    this.user.next(null);
  }

  private updateUserOnJoin(joinedCommunity: UserSubtireddInfo) {
    let user = this.user.getValue();
    user.subtiredds.push(joinedCommunity);
    this.user.next(user);
  }

  private updateUserOnLeave(leftCommunity: UserSubtireddInfo) {
    let user = this.user.getValue();
    user.subtiredds = user.subtiredds.filter(s => s.id !== leftCommunity.id);
    this.user.next(user);
  }

  getUserData(): void {
    this.httpClient.get<User>(this.baseUrl + "api/current-user").subscribe(user => {
      this.user.next(user);
    })
  }

}
