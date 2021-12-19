import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'trd-community-avatar',
  templateUrl: './community-avatar.component.html',
  styleUrls: ['./community-avatar.component.scss']
})
export class CommunityAvatarComponent implements OnInit {

  @Input() communityName: string
  communityInitial: string
  backgroundColor: string

  constructor() {
  }

  ngOnInit(): void {
    this.communityInitial = this.communityName.charAt(0).toUpperCase();
    this.backgroundColor = this.calculateBackgroundColor(this.communityName)
  }

  // TODO: Move somewhere else, use also for user avatar
  calculateBackgroundColor(stringInput: string) {
    const stringUniqueHash = [...stringInput].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    console.log(stringInput, stringUniqueHash)
    return `hsl(${stringUniqueHash % 360}, 100%, 50%)`;
  }
}
