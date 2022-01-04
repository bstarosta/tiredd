import {Component, Input} from '@angular/core';
import {CreatePostModalService} from "../../services/create-post-modal.service";
import {AccountModalService} from "../../services/account-modal.service";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";

@Component({
  selector: 'trd-about-community',
  templateUrl: './about-community.component.html',
  styleUrls: ['./about-community.component.scss']
})
export class AboutCommunityComponent {

  @Input() isUserLoggedIn: Boolean;
  @Input() isUserJoined: boolean;
  @Input() currentSubtiredd: SubtireddSelectItem;
  @Input() description: string;
  @Input() numberOfMembers: number;
  @Input() createDate: Date;

  constructor(private createPostModalService: CreatePostModalService, private accountModalService: AccountModalService) {
  }


  onCreatePostClick() {
    if (this.isUserLoggedIn)
      this.createPostModalService.openCreatePostModal(this.currentSubtiredd);
    else
      this.accountModalService.openAccountModal("login");
  }

}
