import {Component, Input} from '@angular/core';
import {CreatePostModalService} from "../../services/create-post-modal.service";
import {AccountModalService} from "../../services/account-modal.service";

@Component({
  selector: 'trd-about-community',
  templateUrl: './about-community.component.html',
  styleUrls: ['./about-community.component.scss']
})
export class AboutCommunityComponent {

  @Input() isUserLoggedIn: Boolean;
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  numberOfMembers = 1000;
  createDate = new Date("2021-12-18T18:21:00Z");

  constructor(private createPostModalService: CreatePostModalService, private accountModalService: AccountModalService) {
  }

  onCreatePostClick() {
    if (this.isUserLoggedIn)
      this.createPostModalService.openAccountModal();
    else
      this.accountModalService.openAccountModal("register");
  }

}
