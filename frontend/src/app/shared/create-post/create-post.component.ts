import {Component} from '@angular/core';
import {CreatePostModalService} from "../../services/create-post-modal.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'trd-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  constructor(private createPostModalService: CreatePostModalService, private userService: UserService) {
    this.userName$ = userService.user$.pipe(map(user => user.userName));
  }

  userName$: Observable<string>;

  openCreatePostModal(): void {
    this.createPostModalService.openCreatePostModal();
  }
}
