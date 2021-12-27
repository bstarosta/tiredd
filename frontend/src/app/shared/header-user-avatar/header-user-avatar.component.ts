import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'trd-header-user-avatar',
  templateUrl: './header-user-avatar.component.html',
  styleUrls: ['./header-user-avatar.component.scss']
})
export class HeaderUserAvatarComponent implements OnInit {

  @Output() userLoggedOut: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onUserLogout(): void {
    this.userLoggedOut.emit();
  }

}
