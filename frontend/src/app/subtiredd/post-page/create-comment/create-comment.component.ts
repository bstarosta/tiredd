import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'trd-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  postId: string
  userId$: Observable<string>
  @Input() parentCommentId: string
  commentText: string

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.postId = route.snapshot.paramMap.get("postId")
    this.userId$ = userService.user$.pipe(map(user => user.id))
  }

  ngOnInit(): void {
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
