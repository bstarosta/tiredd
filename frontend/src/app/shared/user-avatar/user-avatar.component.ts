import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'trd-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent{


  @Input() userInitial: string = "A";
  @Output() userLoggedOut: EventEmitter<void> = new EventEmitter<void>();

  onUserLogout(): void {
    this.userLoggedOut.emit();
  }

}
