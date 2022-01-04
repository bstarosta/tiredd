import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../interfaces/comment";

@Component({
  selector: 'trd-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent {

  @Input() postId: number
  @Input() parentCommentId: number
  @Output() commentCreated: EventEmitter<Comment> = new EventEmitter<Comment>();
  commentText: string

  constructor(private commentService: CommentService) {
    this.commentService.commentCreated$.subscribe(comment => this.onCommentCreated(comment));
  }

  isCommentEmpty() {
    return !this.commentText
  }

  onAddCommentClicked() {
    this.commentService.createComment({
      text: this.commentText,
      postId: this.postId,
      parentCommentId: this.parentCommentId
    })
  }

  onCommentCreated(comment: Comment) {
    console.log("create-component emits")
    this.commentText = "";
    this.commentCreated.emit(comment)
  }
}
