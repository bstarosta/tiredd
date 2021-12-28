import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'trd-header-user-avatar',
  templateUrl: './header-user-avatar.component.html',
  styleUrls: ['./header-user-avatar.component.scss']
})
export class HeaderUserAvatarComponent {

  @Output() userLoggedOut: EventEmitter<void> = new EventEmitter<void>();
  @Input() userName: string;

  onUserLogout(): void {
    this.userLoggedOut.emit();
  }

}
