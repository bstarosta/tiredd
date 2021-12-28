import {Component} from '@angular/core';
import {AccountModalMode, AccountModalService} from "../../services/account-modal.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../interfaces/user";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'trd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private accountModalService: AccountModalService, private userService: UserService, private router: Router,
              private authService: AuthService) {
    this.isUserLoggedIn$ = userService.isUserLoggedIn$
    this.user$ = this.userService.user$;
  }

  user$: Observable<User>
  isUserLoggedIn$: Observable<Boolean>

  openAccountModal(mode: AccountModalMode): void {
    this.accountModalService.openAccountModal(mode)
  }

  onLogOut(): void {
    this.authService.logoutUser();
  }

  onSubtireddSelected(selectedSubtiredd: SubtireddSelectItem) {
    this.router.navigate([selectedSubtiredd.url]);
  }

}
