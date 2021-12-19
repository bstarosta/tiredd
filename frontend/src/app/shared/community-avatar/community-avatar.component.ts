import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'trd-community-avatar',
  templateUrl: './community-avatar.component.html',
  styleUrls: ['./community-avatar.component.scss']
})
export class CommunityAvatarComponent implements OnInit {

  @Input() communityInitial: string = "A";

  constructor() {
  }

  ngOnInit(): void {
  }

}
