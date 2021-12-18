import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'trd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  userLoggedIn: boolean = false;

  onLogIn(): void {
    this.userLoggedIn = true
  }

  onLogOut(): void {
    this.userLoggedIn = false
  }

  ngOnInit(): void {
  }

}
