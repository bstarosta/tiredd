import {Component} from '@angular/core';
import {CreatePostModalService} from "../../services/create-post-modal.service";

@Component({
  selector: 'trd-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  constructor(private createPostModalService: CreatePostModalService) {
  }

  openCreatePostModal(): void {
    this.createPostModalService.openAccountModal();
  }
}
