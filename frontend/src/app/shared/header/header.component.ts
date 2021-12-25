import {Component, OnInit} from '@angular/core';
import {AccountModalMode, AccountModalService} from "../../services/account-modal.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../interfaces/user";

@Component({
  selector: 'trd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private accountModalService: AccountModalService, private userService: UserService) {
    this.isUserLoggedIn$ = userService.isUserLoggedIn$
    this.user$ = this.userService.user$;
  }

  user$: Observable<User>
  isUserLoggedIn$: Observable<Boolean>

  openAccountModal(mode: AccountModalMode): void {
    this.accountModalService.openAccountModal(mode)
  }

  onLogOut(): void {
    this.userService.logOutUser();
  }

  ngOnInit(): void {
  }

}
