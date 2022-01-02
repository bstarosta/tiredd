import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {PostCommentsService} from "../../../services/post-comments.service";
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

  postId: number
  commentsList$: Observable<Comment[]>
  isUserLoggedIn$: Observable<Boolean>

  constructor(
    private route: ActivatedRoute,
    private postCommentsService: PostCommentsService,
    private userService: UserService,
    private accountModalService: AccountModalService
  ) {
    this.postId = +route.snapshot.paramMap.get("postId")
    postCommentsService.getCommentsList(this.postId)
    this.commentsList$ = postCommentsService.commentsList$
    this.isUserLoggedIn$ = userService.isUserLoggedIn$
  }

  openAccountModal(mode: AccountModalMode): void {
    this.accountModalService.openAccountModal(mode)
  }
}
