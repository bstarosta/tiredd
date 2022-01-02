import {Component, Input} from '@angular/core';
import {CreatePostModalService} from "../../services/create-post-modal.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";
import {SubtireddSelectItem} from "../../interfaces/subtiredd-select-item";

@Component({
  selector: 'trd-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  constructor(private createPostModalService: CreatePostModalService, private userService: UserService) {
    this.userName$ = userService.user$.pipe(
      filter(user => !!user),
      map(user => user.userName));
  }

  @Input() currentSubtiredd: SubtireddSelectItem
  userName$: Observable<string>;

  openCreatePostModal(): void {
    this.createPostModalService.openCreatePostModal(this.currentSubtiredd);
  }
}
