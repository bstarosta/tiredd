import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ColorConverterService} from "../../services/color-converter.service";

@Component({
  selector: 'trd-community-avatar',
  templateUrl: './community-avatar.component.html',
  styleUrls: ['./community-avatar.component.scss']
})
export class CommunityAvatarComponent implements OnInit, OnChanges {

  @Input() communityName: string
  communityInitial: string
  backgroundColor: string

  constructor(private colorConverterService: ColorConverterService) {
  }

  private setUserInitialAndColor(): void {
    this.communityInitial = this.communityName.charAt(0).toUpperCase();
    this.backgroundColor = this.colorConverterService.backgroundColorFromString(this.communityName)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setUserInitialAndColor();
  }

  ngOnInit(): void {
    this.setUserInitialAndColor();
  }
}
