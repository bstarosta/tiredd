import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'trd-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  commentText: string

  constructor() {
  }

  ngOnInit(): void {
  }

  isCommentEmpty() {
    return !this.commentText
  }

  onAddCommentClicked() {
    console.log(this.commentText)
  }
}
