import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../interfaces/comment";

@Component({
  selector: 'trd-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  @Input() comments: Comment[] = [
    {
      comment: 'Source comment',
      replies: [
        {
          comment: 'Comment reply',
          replies: []
        }
      ]
    },
    {
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      replies: [
        {
          comment: 'Comment reply',
          replies: [
            {
              comment: 'Source comment',
              replies: [
                {
                  comment: 'Comment reply',
                  replies: []
                },
                {
                  comment: 'Comment reply',
                  replies: []
                }
              ]
            },
          ]
        }
      ]
    },
    {
      comment: 'Source comment',
      replies: [
        {
          comment: 'Comment reply',
          replies: []
        }
      ]
    },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
