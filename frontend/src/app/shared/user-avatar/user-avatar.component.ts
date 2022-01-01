import {Component, Input, OnInit} from '@angular/core';
import {backgroundColorFromString} from "../../utils/color-converter";

@Component({
  selector: 'trd-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() userName: string = "john";
  userInitial: string;
  backgroundColor: string;

  ngOnInit() {
    this.userInitial = this.userName.charAt(0).toUpperCase()
    this.backgroundColor = backgroundColorFromString(this.userName)
  }
}
