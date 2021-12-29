import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'trd-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  postId: string
  @Input() parentCommentId: string
  commentText: string

  constructor(private route: ActivatedRoute) {
    this.postId = route.snapshot.paramMap.get("postId")
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
