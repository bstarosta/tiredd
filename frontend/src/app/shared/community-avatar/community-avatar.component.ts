import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {backgroundColorFromString} from "../../utils/color-converter";

@Component({
  selector: 'trd-community-avatar',
  templateUrl: './community-avatar.component.html',
  styleUrls: ['./community-avatar.component.scss']
})
export class CommunityAvatarComponent implements OnInit, OnChanges {

  @Input() communityName: string
  communityInitial: string
  backgroundColor: string

  private setUserInitialAndColor(): void {
    this.communityInitial = this.communityName.charAt(0).toUpperCase();
    this.backgroundColor = backgroundColorFromString(this.communityName)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setUserInitialAndColor();
  }

  ngOnInit(): void {
    this.setUserInitialAndColor();
  }
}
