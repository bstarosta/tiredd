import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PostCommentsService} from "../../../services/post-comments.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../interfaces/comment";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'trd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  commentsList$: Observable<Comment[]>
  isUserLoggedIn$: Observable<Boolean>

  constructor(
    private route: ActivatedRoute,
    private postCommentsService: PostCommentsService,
    private userService: UserService
  ) {
    const postId = route.snapshot.paramMap.get("postId")
    postCommentsService.getCommentsList(postId)
    this.commentsList$ = postCommentsService.commentsList$
    this.isUserLoggedIn$ = userService.isUserLoggedIn$
  }

  ngOnInit(): void {
  }

}
