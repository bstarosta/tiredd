import {Component, Input} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'trd-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent {

  @Input() postId: string
  @Input() parentCommentId: string
  userId$: Observable<string>
  commentText: string

  constructor(private userService: UserService) {
    this.userId$ = userService.user$.pipe(map(user => user.id))
  }

  isCommentEmpty() {
    return !this.commentText
  }

  onAddCommentClicked() {
    console.log('Comment for post [id: ' +
      this.postId +
      '] and parent comment [id: ' +
      this.parentCommentId +
      ']: ' +
      this.commentText)
  }
}
