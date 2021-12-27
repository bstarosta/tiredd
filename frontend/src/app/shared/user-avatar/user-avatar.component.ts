import {Component, Input, OnInit} from '@angular/core';
import {ColorConverterService} from "../../services/color-converter.service";

@Component({
  selector: 'trd-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() userName: string = "john";
  userInitial: string;
  backgroundColor: string;

  constructor(private colorConverterService: ColorConverterService) {
  }

  ngOnInit() {
    this.userInitial = this.userName.charAt(0).toUpperCase()
    this.backgroundColor = this.colorConverterService.backgroundColorFromString(this.userName)
  }
}
