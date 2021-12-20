import {Component, Input, OnInit} from '@angular/core';
import {ColorConverterService} from "../../services/color-converter.service";

@Component({
  selector: 'trd-community-avatar',
  templateUrl: './community-avatar.component.html',
  styleUrls: ['./community-avatar.component.scss']
})
export class CommunityAvatarComponent implements OnInit {

  @Input() communityName: string
  communityInitial: string
  backgroundColor: string

  constructor(private colorConverterService: ColorConverterService) {
  }

  ngOnInit(): void {
    this.communityInitial = this.communityName.charAt(0).toUpperCase();
    this.backgroundColor = this.colorConverterService.calculateBackgroundColor(this.communityName)
  }
}
