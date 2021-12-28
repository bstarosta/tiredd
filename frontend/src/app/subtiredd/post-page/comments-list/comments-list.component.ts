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
      id: '1',
      author: 'Mike',
      timestamp: new Date("2021-12-18T18:21:00Z"),
      text: 'Source comment',
      replies: [
        {
          id: '2',
          author: 'Paul',
          timestamp: new Date("2021-12-18T19:12:00Z"),
          text: 'Comment reply',
          replies: []
        }
      ]
    },
    {
      id: '3',
      author: 'Jenny',
      timestamp: new Date("2021-12-19T21:52:00Z"),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      replies: [
        {
          id: '4',
          author: 'Adam',
          timestamp: new Date("2021-12-20T11:22:00Z"),
          text: 'Comment reply',
          replies: [
            {
              id: '5',
              author: 'Jenny',
              timestamp: new Date("2021-12-20T13:29:00Z"),
              text: 'Comment reply',
              replies: [
                {
                  id: '6',
                  author: 'Adam',
                  timestamp: new Date("2021-12-20T15:39:00Z"),
                  text: 'Comment reply',
                  replies: []
                },
                {
                  id: '7',
                  author: 'John',
                  timestamp: new Date("2021-12-20T19:21:00Z"),
                  text: 'Comment reply',
                  replies: []
                }
              ]
            },
          ]
        },
        {
          id: '10',
          author: 'Karsten',
          timestamp: new Date("2021-12-23T19:11:00Z"),
          text: 'Comment reply',
          replies: []
        }
      ]
    },
    {
      id: '8',
      author: 'Josh',
      timestamp: new Date("2021-12-21T09:18:00Z"),
      text: 'Source comment',
      replies: [
        {
          id: '9',
          author: 'Kim',
          timestamp: new Date("2021-12-21T11:26:00Z"),
          text: 'Comment reply',
          replies: []
        }
      ]
    },
  ]
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
