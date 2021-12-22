import {AccountModalMode, AccountModalService} from "../../services/account-modal.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../interfaces/user";
import {Component} from '@angular/core';
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {Router} from "@angular/router";

@Component({
  selector: 'trd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private accountModalService: AccountModalService, private userService: UserService, private router: Router) {
    this.isUserLoggedIn$ = userService.isUserLoggedIn$
    this.user$ = this.userService.user$;
  }

  subtireddSelectItems: SubtireddSelectItem[] = [
    {name: "Home", url: "/home"},
    {name: "t/awww", url: "/t/awww"},
    {name: "t/whatswrongwithyourdog", url: "/t/whatswrongwithyourdog"},
    {name: "t/dachschund", url: "/t/dachschund"},
    {name: "t/corgi", url: "/t/corgi"},
    {name: "t/dogs", url: "/t/dogs"},
  ]
  user$: Observable<User>
  isUserLoggedIn$: Observable<Boolean>

  openAccountModal(mode: AccountModalMode): void {
    this.accountModalService.openAccountModal(mode)
  }

  onLogOut(): void {
    this.userService.logOutUser();
  }

  onSubtireddSelected(selectedSubtiredd: SubtireddSelectItem) {
    this.router.navigate([selectedSubtiredd.url]);
  }

}
