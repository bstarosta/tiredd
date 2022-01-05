import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../interfaces/comment";
import {UserService} from "../../../services/user.service";
import {AccountModalMode, AccountModalService} from "../../../services/account-modal.service";

@Component({
  selector: 'trd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  postId: number;
  @Input() commentsList: Comment[];
  isUserLoggedIn$: Observable<Boolean>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private accountModalService: AccountModalService
  ) {
    this.postId = +route.snapshot.paramMap.get("postId");
    this.isUserLoggedIn$ = userService.isUserLoggedIn$;
  }

  openAccountModal(mode: AccountModalMode): void {
    this.accountModalService.openAccountModal(mode);
  }

  onCommentCreated(comment: Comment) {
    this.addComment(comment);
  }

  private addComment(comment: Comment) {
    if (!comment.parentCommentId)
      this.commentsList.unshift(comment)
    else
      this.addCommentToList(comment, this.commentsList);
  }

  addCommentToList(comment: Comment, commentsList: Comment[]) {
    commentsList.forEach(c => {
      if (c.id == comment.parentCommentId)
        c.replies.unshift(comment);
      else
        this.addCommentToList(comment, c.replies);
    })
  }
}
