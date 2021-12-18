import {Component, OnInit} from '@angular/core';
import {AccountModalMode, AccountModalService} from "../../services/account-modal.service";

@Component({
  selector: 'trd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private accountModalService: AccountModalService) {
  }

  userLoggedIn: boolean = false;

  openAccountModal(mode: AccountModalMode): void {
    this.accountModalService.openAccountModal(mode)
  }

  onLogIn(): void {
    this.userLoggedIn = true
  }

  onLogOut(): void {
    this.userLoggedIn = false
  }

  ngOnInit(): void {
  }

}
