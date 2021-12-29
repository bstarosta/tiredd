import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../interfaces/comment";

@Component({
  selector: 'trd-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  @Input() comments: Comment[]
  showReplyInput: Boolean[]

  constructor() {
  }

  ngOnInit(): void {
    this.showReplyInput = this.comments.map(() => false)
  }

  onReplyToggle(commentIndex: number) {
    this.showReplyInput[commentIndex] = !this.showReplyInput[commentIndex]
  }
}
