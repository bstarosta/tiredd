import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorConverterService} from "../../services/color-converter.service";

@Component({
  selector: 'trd-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() username: string = "John" // TODO: Remove default value
  userInitial: string;
  backgroundColor: string;

  @Output() userLoggedOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(private colorConverterService: ColorConverterService) {
  }

  ngOnInit() {
    this.userInitial = this.username.charAt(0).toUpperCase()
    this.backgroundColor = this.colorConverterService.backgroundColorFromString(this.username)
  }

  onUserLogout(): void {
    this.userLoggedOut.emit();
  }
}
