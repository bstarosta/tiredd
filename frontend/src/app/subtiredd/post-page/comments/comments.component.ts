import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PostCommentsService} from "../../../services/post-comments.service";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../interfaces/comment";

@Component({
  selector: 'trd-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  commentsList$: Observable<Comment[]>

  constructor(private route: ActivatedRoute, private postCommentsService: PostCommentsService) {
    const postId = route.snapshot.paramMap.get("postId")
    postCommentsService.getCommentsList(postId)
    this.commentsList$ = postCommentsService.commentsList$
  }

  ngOnInit(): void {
  }

}
